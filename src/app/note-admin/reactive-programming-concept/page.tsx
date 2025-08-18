'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Tab = 'overview' | 'reactive' | 'compare' | 'examples' | 'ops' | 'refs';

const yamlConfig = String.raw`# application.yml (Redis 연결)
spring:
  data:
    redis:
      host: localhost
      port: 6379
      lettuce:
        pool:
          max-active: 16
          max-idle: 8
          min-idle: 2
`;

const pubsubVsStreams = String.raw`Redis Pub/Sub vs Streams (핵심 감각)
- Pub/Sub: 라디오 방송. "그 순간" 듣고 있어야 함. 기록/재처리 없음. 초간단 알림/채팅에 적합.
- Streams: 유튜브 다시보기. 로그에 남음, 나중에 읽기 가능. Consumer Group, 오프셋 관리, 재처리 가능.
- WebFlux 궁합: 비동기 스트리밍에 강함. Streams를 Flux로 흘려보내면 느린 클라이언트는 스킵하고 빠른 쪽부터 밀어줄 수 있음.
`;

// 리액티브 개념 요약(요청한 설명 반영 + 보완)
const reactiveSummary = String.raw`# 리액티브 WebFlux 개념 요약
- 전통 서블릿 모델: "요청 1개 ↔ 스레드 1개" 바인딩, 블로킹 I/O 동안 스레드는 놀게 됨.
- WebFlux: 소수의 이벤트루프 스레드가 논블로킹 I/O로 수천 연결을 전환 처리. 느린 연결을 붙잡고 기다리지 않음.
- 감각: "빠른 토큰은 곧바로 밀어주고, 느린 연결은 준비되면 이어서 처리" → 분배기처럼 스케줄링.
- Backpressure: 구독자가 처리 가능한 양만 request(n). onBackpressureLatest/Buffer/Drop로 정책 선택.
- CPU/블로킹 주의: JDBC/파일/외부 SDK 등 블로킹은 boundedElastic로 오프로딩하거나 R2DBC/비동기 클라이언트 사용.
- 적합한 곳: I/O 지배적 대량 동시성(SSE/WebSocket/외부 API fan-out). 순수 CPU 지배 업무엔 이점 제한적.
- 요약 판정: 질문자의 설명은 '대체로 정확'. 보완점은 "작은 이벤트루프 풀 + backpressure" 두 키워드 추가.
`;

const reactiveSnippet = String.raw`// 빠른/느린 토큰 스트림을 합쳐도, 준비된 이벤트가 먼저 흘러간다.
Flux<ByteBuffer> out =
  Flux.merge(
    fastTokenFlux,                        // 빠르게 도착
    slowTokenFlux.onBackpressureLatest()  // 느린 구독자 보호
  ).publishOn(Schedulers.parallel());     // CPU 작업은 별 스케줄러
`;

const producerJava = String.raw`// 상태 이벤트 발행 (Producer)
// Gradle: spring-boot-starter-webflux, spring-data-redis-reactive
// Lettuce + ReactiveStringRedisTemplate 사용 예
@Service
@RequiredArgsConstructor
public class StatusEventProducer {

  private final ReactiveStringRedisTemplate redis;
  private static final String STREAM_KEY = "agent-status:tenant:123";

  public Mono<RecordId> publish(AgentStatusEvent evt) {
    Map<String, String> fields = Map.of(
      "eventId", evt.eventId(),
      "agentId", evt.agentId(),
      "state", evt.state(),
      "updatedAt", String.valueOf(evt.updatedAt())
    );
    // Streams에 XADD
    return redis.opsForStream().add(MapRecord.create(STREAM_KEY, fields));
  }
}

public record AgentStatusEvent(String eventId, String agentId, String state, long updatedAt) {}
`;

const consumerJava = String.raw`// Streams 소비 (Consumer Group) + WebFlux로 내보내기 (SSE 예시)
@Component
@RequiredArgsConstructor
public class StatusStreamConsumer implements SmartLifecycle {

  private final ReactiveStringRedisTemplate redis;
  private final Sinks.Many<AgentStatusEvent> sink = Sinks.many().multicast().onBackpressureBuffer();

  private static final String STREAM_KEY = "agent-status:tenant:123";
  private static final String GROUP = "status-svc";
  private static final Duration BLOCK = Duration.ofSeconds(2);

  private Disposable subscription;

  @Override
  public void start() {
    // 그룹 생성 (이미 있으면 무시)
    redis.opsForStream().createGroup(STREAM_KEY, ReadOffset.latest(), GROUP)
        .onErrorResume(e -> Mono.empty())
        .thenMany(loop())
        .subscribe();
  }

  private Flux<MapRecord<String, Object, Object>> readBatch(String consumerName) {
    Consumer consumer = Consumer.from(GROUP, consumerName);
    StreamOffset<String> offset = StreamOffset.create(STREAM_KEY, ReadOffset.lastConsumed());
    // BLOCK 방식의 XREADGROUP (반응형)
    return redis.opsForStream().read(consumer, StreamReadOptions.empty().block(BLOCK), offset);
  }

  private Flux<?> loop() {
    String consumerName = UUID.randomUUID().toString();
    return Flux.defer(() -> readBatch(consumerName))
        .repeat()
        .flatMap(record -> {
          var v = record.getValue();
          AgentStatusEvent evt = new AgentStatusEvent(
            (String)v.get("eventId"),
            (String)v.get("agentId"),
            (String)v.get("state"),
            Long.parseLong((String)v.get("updatedAt"))
          );
          // 다운스트림으로 푸시
          sink.tryEmitNext(evt);
          // ACK
          return redis.opsForStream().acknowledge(STREAM_KEY, GROUP, record.getId());
        })
        .onErrorContinue((e, o) -> { /* 로깅 후 계속 */ });
  }

  @Override public void stop() { if (subscription != null) subscription.dispose(); }

  // SSE 엔드포인트
  @RestController
  @RequestMapping("/sse")
  static class SseController {
    private final Sinks.Many<AgentStatusEvent> sink;
    SseController(StatusStreamConsumer c) { this.sink = c.sink; }

    @GetMapping(value = "/agent-status", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<AgentStatusEvent>> stream() {
      return sink.asFlux()
                 .onBackpressureLatest()                       // 느린 구독자 보호
                 .map(evt -> ServerSentEvent.builder(evt).build());
    }
  }
}
`;

const webfluxHandler = String.raw`// WebFlux Router + Handler 버전 (SSE)
@Configuration
public class Routes {
  @Bean
  RouterFunction<ServerResponse> sseRoutes(StatusStreamConsumer consumer) {
    return RouterFunctions.route()
      .GET("/sse/agent-status", req -> {
        Flux<AgentStatusEvent> flux = consumer.sink().asFlux().onBackpressureLatest();
        return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM).body(flux, AgentStatusEvent.class);
      })
      .build();
  }
}
`;

const backpressureTips = String.raw`// Backpressure/성능 팁 (Project Reactor)
flux
  .publishOn(Schedulers.boundedElastic(), 512) // 큐 크기 조정
  .onBackpressureLatest()                      // 느린 소비자: 최신 값만 유지
  .sample(Duration.ofMillis(100))              // 너무 잦은 이벤트는 샘플링
  .retryWhen(Retry.backoff(5, Duration.ofMillis(200)))
  .doOnError(log::warn);

// Redis Streams 운영 팁
// - 키 파티셔닝: status:tenant:{tenantId}, status:region:{region}
// - XTRIM 정책: 길이 또는 시간 기반 (예: 최근 24h 또는 1,000,000 entries)
// - 중복 대비: eventId(ULID/UUID)로 idempotent 처리
// - 모니터링: PEL 크기, consumer lag, 처리 지연, 메모리 및 evictions
`;

const cliCheatsheet = String.raw`# Redis CLI 치트시트
XADD agent-status:tenant:123 * agentId A001 state READY updatedAt 1734500000
XGROUP CREATE agent-status:tenant:123 status-svc $ MKSTREAM
XREADGROUP GROUP status-svc c1 COUNT 10 BLOCK 2000 STREAMS agent-status:tenant:123 >
XACK agent-status:tenant:123 status-svc 1700000-0
XTRIM agent-status:tenant:123 MAXLEN ~ 1000000
`;

const RedisWebFluxManual: React.FC = () => {
    const [tab, setTab] = useState<Tab>('overview');

    const TabBtn = (id: Tab, label: string) => (
        <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-3 py-2 text-sm rounded-md border ${tab === id ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-6xl px-5 py-10">
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Redis Streams + Spring WebFlux 매뉴얼</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        콜센터 “상담사 상태 전파” 같은 대량 실시간 스트림을 낮은 지연으로 처리하는 방법. Pub/Sub vs Streams 비교, 아키텍처, 핵심 예제, 운영 팁을 담았습니다.
                    </p>
                </header>

                <nav className="mb-6 flex flex-wrap gap-2">
                    {TabBtn('overview', '개요')}
                    {TabBtn('reactive', '리액티브 요약')}
                    {TabBtn('compare', 'Pub/Sub vs Streams')}
                    {TabBtn('examples', '핵심 예제')}
                    {TabBtn('ops', '백프레셔/운영 팁')}
                    {TabBtn('refs', '참고 자료')}
                </nav>

                <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    {tab === 'overview' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">왜 Redis Streams + WebFlux인가?</h2>
                            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                <li>Streams는 “로그형 저장”으로 메시지를 남겨 두고, Consumer Group으로 각자의 진행 위치(오프셋)를 관리합니다.</li>
                                <li>WebFlux는 non-blocking 스트리밍으로 느린 클라이언트를 기다리지 않고, 빠른 구독자부터 밀어줄 수 있습니다.</li>
                                <li>콜센터 상태 전파, 실시간 대시보드, 챗봇 토큰 스트리밍 같이 “유실 없는 스트림”에 적합합니다.</li>
                            </ul>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">Redis 설정 예</h3>
                                <SyntaxHighlighter language="yaml" style={vscDarkPlus} className="rounded-md">
                                    {yamlConfig}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    )}

                    {tab === 'reactive' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">리액티브 WebFlux — 개념 요약</h2>
                            <SyntaxHighlighter language="markdown" style={vscDarkPlus} className="rounded-md">
                                {reactiveSummary}
                            </SyntaxHighlighter>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">토큰 스트리밍 감각 코드</h3>
                                <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md">
                                    {reactiveSnippet}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    )}

                    {tab === 'compare' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">Pub/Sub vs Streams</h2>
                            <SyntaxHighlighter language="markdown" style={vscDarkPlus} className="rounded-md">
                                {pubsubVsStreams}
                            </SyntaxHighlighter>

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-3 text-left">항목</th>
                                            <th className="p-3 text-left">Pub/Sub</th>
                                            <th className="p-3 text-left">Streams</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="p-3 font-medium">전달 방식</td>
                                            <td className="p-3">즉시 방송(그 순간만)</td>
                                            <td className="p-3">로그에 저장 후 소비</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="p-3 font-medium">유실 방지</td>
                                            <td className="p-3">없음</td>
                                            <td className="p-3">있음(오프셋/ACK)</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="p-3 font-medium">소비자 모델</td>
                                            <td className="p-3">구독자 모두 수신</td>
                                            <td className="p-3">Consumer Group(분산 처리)</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="p-3 font-medium">적합 사례</td>
                                            <td className="p-3">가벼운 알림/채팅</td>
                                            <td className="p-3">상태 전파/주문 처리/챗봇 토큰/이력 보관</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {tab === 'examples' && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-gray-900">핵심 코드 예제</h2>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">1) 상태 이벤트 발행 (Producer)</h3>
                                <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md">
                                    {producerJava}
                                </SyntaxHighlighter>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">2) Consumer Group + SSE 스트리밍 (WebFlux)</h3>
                                <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md">
                                    {consumerJava}
                                </SyntaxHighlighter>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">3) 라우터/핸들러 스타일 (선호 시)</h3>
                                <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md">
                                    {webfluxHandler}
                                </SyntaxHighlighter>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-2">4) Redis CLI 치트시트</h3>
                                <SyntaxHighlighter language="bash" style={vscDarkPlus} className="rounded-md">
                                    {cliCheatsheet}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    )}

                    {tab === 'ops' && (
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">Backpressure / 운영 팁</h2>
                            <SyntaxHighlighter language="java" style={vscDarkPlus} className="rounded-md">
                                {backpressureTips}
                            </SyntaxHighlighter>
                            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                                <li>스냅샷 + 증분 이벤트: 최초 접속에 현재 상태를 주고 이후 Streams로 갱신.</li>
                                <li>키 파티셔닝: tenant/region/skill 단위로 나눠 단일 키 과부하 방지.</li>
                                <li>XTRIM으로 보관 정책을 명시하고, 장기 이력은 RDB/OLAP로 ETL.</li>
                                <li>대규모·장기보관·멀티리전이 필요해지면 Kafka를 SoR로, Redis는 실시간 팬아웃 캐시로 병용.</li>
                            </ul>
                        </div>
                    )}

                    {tab === 'refs' && (
                        <div className="space-y-3">
                            <h2 className="text-lg font-semibold text-gray-900">참고 자료</h2>
                            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                <li>Redis Streams 공식 문서: https://redis.io/docs/latest/data-types/streams/</li>
                                <li>Spring Data Redis (Reactive) Reference: https://docs.spring.io/spring-data/redis/reference/redis/stream.html</li>
                                <li>Spring WebFlux Reference: https://docs.spring.io/spring-framework/reference/web/webflux.html</li>
                                <li>Project Reactor (Backpressure, Sinks): https://projectreactor.io/docs/core/release/reference/</li>
                                <li>Lettuce Redis (Reactive driver): https://lettuce.io/</li>
                                <li>Redis CLI X* Commands: https://redis.io/commands/?group=stream</li>
                            </ul>
                            <p className="text-xs text-gray-500">
                                운영 선택 가이드: 중대형(수천~수만 동시 세션)은 Redis Streams + WebFlux로 시작.
                                장기보관/다계열 파이프라인/멀티리전이 중요해지면 Kafka를 SoR로 추가하고 Redis는 초저지연 팬아웃 캐시로 계속 사용.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default RedisWebFluxManual;
