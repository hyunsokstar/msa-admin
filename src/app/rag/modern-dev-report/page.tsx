'use client';

import React, { useState, KeyboardEvent } from 'react';
import {
    BookOpen,
    Settings,
    Shield,
    Network,
    Database,
    GitBranch,
    Sparkles,
    Zap,
    Code,
    Monitor,
    BarChart3,
    Wrench,
    ExternalLink,
    MessageSquare,
    Wifi,
    Server,
    Cloud,
    Layers,
    Palette
} from 'lucide-react';

type TabId =
    | 'overview'
    | 'backend'
    | 'security'
    | 'cache'
    | 'data'
    | 'ai'
    | 'realtime'
    | 'chat'
    | 'frontend'
    | 'desktop'
    | 'dwh'
    | 'devops'
    | 'bonus'
    | 'references';

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: '개요', icon: BookOpen },
    { id: 'backend', label: 'Backend', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'cache', label: 'Cache/Redis', icon: Zap },
    { id: 'data', label: 'Data Layer', icon: Database },
    { id: 'ai', label: 'AI/RAG', icon: Sparkles },
    { id: 'realtime', label: '실시간', icon: Network },
    { id: 'chat', label: '채팅/메신저', icon: MessageSquare },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'dwh', label: 'DWH/리포팅', icon: BarChart3 },
    { id: 'devops', label: 'DevOps', icon: Wrench },
    { id: 'bonus', label: '보너스', icon: Cloud },
    { id: 'references', label: '참고자료', icon: ExternalLink }
];

function TabButton({
    id,
    active,
    onClick,
    icon: Icon,
    children
}: {
    id: TabId;
    active: boolean;
    onClick: (id: TabId) => void;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            role="tab"
            id={`tab-${id}`}
            aria-controls={`panel-${id}`}
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onClick(id)}
            className={`
                w-full justify-center px-3 py-2.5 rounded-lg 
                transition-all duration-200 flex items-center gap-2
                ${active
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
            `}
        >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">{children}</span>
        </button>
    );
}

function Card({
    title,
    icon: Icon,
    children,
    subtitle,
    gradient = false
}: {
    title?: string;
    icon?: React.ComponentType<{ className?: string }>;
    subtitle?: string;
    children: React.ReactNode;
    gradient?: boolean;
}) {
    return (
        <div className={`
            rounded-xl border transition-all duration-200 hover:shadow-lg
            ${gradient
                ? 'bg-gradient-to-br from-white to-blue-50 border-blue-200'
                : 'bg-white border-slate-200'
            }
        `}>
            {(title || subtitle) && (
                <div className="px-6 pt-5">
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className={`w-5 h-5 ${gradient ? 'text-blue-600' : 'text-slate-500'}`} />}
                        {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
                    </div>
                    {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
                </div>
            )}
            <div className={`${title || subtitle ? 'px-6 pb-6 pt-4' : 'p-6'}`}>{children}</div>
        </div>
    );
}

export default function ModernDevReportPage() {
    const [active, setActive] = useState<TabId>('overview');

    const onTabsKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const idx = tabs.findIndex((t) => t.id === active);
        if (e.key === 'ArrowRight') setActive(tabs[(idx + 1) % tabs.length].id);
        if (e.key === 'ArrowLeft') setActive(tabs[(idx - 1 + tabs.length) % tabs.length].id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                            <Layers className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                            Modern Dev Report
                        </h1>
                    </div>
                    <p className="text-slate-600 mt-2">
                        엔터프라이즈급 풀스택 아키텍처 - 실무 중심 기술 스택 가이드
                    </p>

                    {/* Tabs */}
                    <nav className="mt-6">
                        <div
                            role="tablist"
                            aria-label="Modern Dev Report Sections"
                            className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7"
                            onKeyDown={onTabsKeyDown}
                        >
                            {tabs.map((t) => (
                                <TabButton
                                    key={t.id}
                                    id={t.id}
                                    active={active === t.id}
                                    onClick={setActive}
                                    icon={t.icon}
                                >
                                    {t.label}
                                </TabButton>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {active === 'overview' && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        <Card
                            title="아키텍처 요약"
                            subtitle="Spring Boot + WebFlux, Security, Redis, JPA+jOOQ, RAG, 실시간, Next.js, Tauri, DWH, DevOps"
                            icon={BookOpen}
                            gradient={true}
                        >
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li className="flex items-start gap-2">
                                    <Server className="w-4 h-4 mt-0.5 text-blue-500" />
                                    <span><strong>고동시성 백엔드:</strong> Spring WebFlux로 논블로킹 I/O 처리</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Shield className="w-4 h-4 mt-0.5 text-green-500" />
                                    <span><strong>엔터프라이즈 보안:</strong> JWT/OAuth2/RBAC, 멀티 테넌시/감사로그</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Zap className="w-4 h-4 mt-0.5 text-yellow-500" />
                                    <span><strong>캐시/이벤트:</strong> Redis Streams/Hash/SortedSet 백본</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Database className="w-4 h-4 mt-0.5 text-purple-500" />
                                    <span><strong>데이터 레이어:</strong> JPA(쓰기) + jOOQ(읽기) CQRS 패턴</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Sparkles className="w-4 h-4 mt-0.5 text-indigo-500" />
                                    <span><strong>AI/RAG:</strong> Spring AI + pgvector로 지능형 자동화</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MessageSquare className="w-4 h-4 mt-0.5 text-pink-500" />
                                    <span><strong>실시간 채팅:</strong> WebSocket/SSE/Socket.IO 멀티 채널</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Code className="w-4 h-4 mt-0.5 text-cyan-500" />
                                    <span><strong>모던 프론트:</strong> Next.js + Framer Motion + Tailwind</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Monitor className="w-4 h-4 mt-0.5 text-gray-500" />
                                    <span><strong>데스크톱:</strong> Tauri 경량 크로스플랫폼 앱</span>
                                </li>
                            </ul>
                        </Card>
                        <Card title="핵심 의사결정" icon={Wrench}>
                            <ul className="text-sm text-slate-700 space-y-3">
                                <li className="border-l-4 border-blue-500 pl-3">
                                    <strong>성능 최적화:</strong> WebFlux + 가상 스레드로 대규모 동시 처리
                                </li>
                                <li className="border-l-4 border-green-500 pl-3">
                                    <strong>보안 거버넌스:</strong> Zero Trust + RBAC/ABAC 정책 엔진
                                </li>
                                <li className="border-l-4 border-purple-500 pl-3">
                                    <strong>데이터 전략:</strong> CQRS + Event Sourcing으로 확장성 확보
                                </li>
                                <li className="border-l-4 border-indigo-500 pl-3">
                                    <strong>AI 통합:</strong> RAG + 벡터 DB로 컨텍스트 인식 자동화
                                </li>
                                <li className="border-l-4 border-pink-500 pl-3">
                                    <strong>실시간 통신:</strong> 하이브리드 프로토콜로 안정성과 성능 균형
                                </li>
                                <li className="border-l-4 border-orange-500 pl-3">
                                    <strong>관측성:</strong> OpenTelemetry 3-Pillars (Trace/Metric/Log)
                                </li>
                            </ul>
                        </Card>
                    </div>
                )}

                {active === 'backend' && (
                    <Card
                        title="Spring Boot + WebFlux"
                        subtitle="논블로킹 리액티브 백엔드 - 대규모 동시성 처리의 핵심"
                        icon={Settings}
                        gradient={true}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">핵심 기술 스택</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Netty 기반 논블로킹 I/O:</strong> Event Loop 모델로 수만 커넥션 동시 처리</li>
                                    <li>• <strong>Project Reactor:</strong> Flux/Mono 스트림으로 백프레셔 제어</li>
                                    <li>• <strong>R2DBC:</strong> 리액티브 데이터베이스 드라이버로 엔드투엔드 논블로킹</li>
                                    <li>• <strong>Virtual Threads (JDK 21+):</strong> 블로킹 코드와의 브릿지, 레거시 통합</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">성능 최적화 전략</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• 커넥션 풀링: HikariCP 대신 R2DBC Pool 설정 최적화</li>
                                    <li>• 스케줄러 격리: 블로킹 호출은 boundedElastic() 스케줄러로 분리</li>
                                    <li>• 캐시 워밍업: 애플리케이션 시작 시 핫 데이터 프리로딩</li>
                                    <li>• 모니터링: Micrometer + Prometheus로 p95/p99 레이턴시 추적</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'security' && (
                    <Card
                        title="Spring Security + 엔터프라이즈 보안"
                        subtitle="Zero Trust 아키텍처 - JWT/OAuth2/RBAC/멀티테넌시"
                        icon={Shield}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">인증/인가 체계</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>JWT + Refresh Token:</strong> 액세스 토큰 15분, 리프레시 7일 정책</li>
                                    <li>• <strong>OAuth2/OIDC:</strong> Keycloak/Auth0/Okta 엔터프라이즈 IdP 연동</li>
                                    <li>• <strong>MFA/2FA:</strong> TOTP/SMS/Biometric 다중 인증</li>
                                    <li>• <strong>RBAC + ABAC:</strong> 역할 기반 + 속성 기반 접근 제어 하이브리드</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">보안 거버넌스</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>멀티 테넌시:</strong> 테넌트별 데이터 격리, Row Level Security</li>
                                    <li>• <strong>감사 로그:</strong> 모든 API 호출 추적, SIEM 연동</li>
                                    <li>• <strong>암호화:</strong> TLS 1.3, AES-256 저장 암호화</li>
                                    <li>• <strong>API 보안:</strong> Rate Limiting, DDoS 방어, WAF 통합</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'cache' && (
                    <Card
                        title="Redis 엔터프라이즈"
                        subtitle="고성능 캐시 + 이벤트 스트리밍 + 세션 관리"
                        icon={Zap}
                        gradient={true}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">데이터 구조 활용</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Hash:</strong> 세션/토큰 저장, 사용자 프로필 캐싱</li>
                                    <li>• <strong>Streams:</strong> 이벤트 소싱, 실시간 활동 피드</li>
                                    <li>• <strong>SortedSet:</strong> 리더보드, 실시간 랭킹, 시계열 데이터</li>
                                    <li>• <strong>HyperLogLog:</strong> UV 카운팅, 카디널리티 추정</li>
                                    <li>• <strong>Geo:</strong> 위치 기반 서비스, 근접 검색</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">고가용성 설정</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Redis Cluster:</strong> 샤딩으로 수평 확장, 자동 페일오버</li>
                                    <li>• <strong>Sentinel:</strong> 마스터/슬레이브 모니터링 및 자동 전환</li>
                                    <li>• <strong>AOF + RDB:</strong> 하이브리드 지속성, 포인트인타임 복구</li>
                                    <li>• <strong>Redis Modules:</strong> RedisJSON, RediSearch, RedisGraph 확장</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'data' && (
                    <Card
                        title="Data Layer: JPA + jOOQ"
                        subtitle="CQRS 패턴 - 명령과 조회 분리로 최적 성능"
                        icon={Database}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">쓰기 모델 (JPA/Hibernate)</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>도메인 모델:</strong> 풍부한 도메인 객체, 비즈니스 로직 캡슐화</li>
                                    <li>• <strong>Aggregate Root:</strong> DDD 집합체 패턴으로 일관성 경계 관리</li>
                                    <li>• <strong>Event Sourcing:</strong> 도메인 이벤트 발행, 감사 추적</li>
                                    <li>• <strong>Optimistic Locking:</strong> 버전 관리로 동시성 제어</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">읽기 모델 (jOOQ)</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>타입 세이프 SQL:</strong> 컴파일 타임 쿼리 검증</li>
                                    <li>• <strong>복잡한 조회:</strong> 다중 조인, 윈도우 함수, CTE 지원</li>
                                    <li>• <strong>Projection:</strong> DTO 직접 매핑으로 N+1 문제 해결</li>
                                    <li>• <strong>성능 최적화:</strong> 실행 계획 분석, 인덱스 힌트 제공</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'ai' && (
                    <Card
                        title="AI/RAG 스택"
                        subtitle="Spring AI + pgvector + LangChain - 지능형 자동화"
                        icon={Sparkles}
                        gradient={true}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">벡터 데이터베이스 & 임베딩</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>pgvector:</strong> PostgreSQL 확장으로 1536/3072 차원 벡터 저장</li>
                                    <li>• <strong>임베딩 모델:</strong> OpenAI Ada-002, Cohere, 자체 학습 모델</li>
                                    <li>• <strong>하이브리드 검색:</strong> 벡터 유사도 + 키워드 검색 결합</li>
                                    <li>• <strong>청킹 전략:</strong> 슬라이딩 윈도우, 의미 단위 분할</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">RAG 파이프라인</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>문서 수집:</strong> PDF, Word, Web 크롤링 자동화</li>
                                    <li>• <strong>전처리:</strong> OCR, 테이블 추출, 메타데이터 태깅</li>
                                    <li>• <strong>프롬프트 엔지니어링:</strong> Few-shot, Chain-of-Thought</li>
                                    <li>• <strong>가드레일:</strong> 할루시네이션 방지, 응답 검증</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">음성 처리</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>STT:</strong> Whisper, Google Speech-to-Text</li>
                                    <li>• <strong>TTS:</strong> ElevenLabs, Azure Neural TTS</li>
                                    <li>• <strong>실시간 전사:</strong> 스트리밍 음성 인식</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'realtime' && (
                    <Card
                        title="실시간 통신 인프라"
                        subtitle="WebSocket/SSE/gRPC - 저지연 양방향 통신"
                        icon={Network}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">프로토콜 선택 가이드</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>WebSocket:</strong> 양방향 실시간 - 채팅, 협업, 게임</li>
                                    <li>• <strong>SSE:</strong> 서버→클라이언트 단방향 - 알림, 피드</li>
                                    <li>• <strong>gRPC:</strong> 마이크로서비스 간 고성능 통신</li>
                                    <li>• <strong>WebRTC:</strong> P2P 비디오/오디오, 화면 공유</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">스케일링 전략</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Sticky Session:</strong> 로드밸런서 세션 어피니티</li>
                                    <li>• <strong>Redis Pub/Sub:</strong> 서버 간 메시지 브로드캐스팅</li>
                                    <li>• <strong>백프레셔:</strong> 클라이언트 속도 조절</li>
                                    <li>• <strong>연결 풀링:</strong> 리소스 효율적 관리</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'chat' && (
                    <Card
                        title="채팅/메신저 시스템"
                        subtitle="엔터프라이즈급 실시간 커뮤니케이션 플랫폼"
                        icon={MessageSquare}
                        gradient={true}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">코어 기술 스택</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <Wifi className="w-4 h-4 mt-0.5 text-blue-500" />
                                        <span><strong>Socket.IO:</strong> 자동 재연결, 폴백, 룸 관리, 네임스페이스</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Network className="w-4 h-4 mt-0.5 text-green-500" />
                                        <span><strong>WebSocket Gateway:</strong> Spring WebSocket + STOMP 프로토콜</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Database className="w-4 h-4 mt-0.5 text-purple-500" />
                                        <span><strong>메시지 저장:</strong> Cassandra/MongoDB로 시계열 데이터 최적화</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Zap className="w-4 h-4 mt-0.5 text-yellow-500" />
                                        <span><strong>메시지 큐:</strong> RabbitMQ/Kafka로 비동기 처리 및 안정성</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">핵심 기능 구현</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>1:1 & 그룹 채팅:</strong> 다중 채널, 스레드, 멘션 지원</li>
                                    <li>• <strong>Presence 시스템:</strong> 온라인/오프라인/자리비움 상태 실시간 동기화</li>
                                    <li>• <strong>타이핑 인디케이터:</strong> "상대방이 입력 중..." 표시</li>
                                    <li>• <strong>읽음 확인:</strong> 전송/전달/읽음 상태 추적</li>
                                    <li>• <strong>파일 공유:</strong> 이미지/동영상/문서 업로드 및 미리보기</li>
                                    <li>• <strong>음성/화상 통화:</strong> WebRTC + Janus Gateway 통합</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">고급 기능</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>메시지 암호화:</strong> E2EE (End-to-End Encryption) Signal 프로토콜</li>
                                    <li>• <strong>메시지 검색:</strong> Elasticsearch 전문 검색, 필터링</li>
                                    <li>• <strong>번역/요약:</strong> AI 기반 실시간 번역 및 대화 요약</li>
                                    <li>• <strong>봇 & 웹훅:</strong> 챗봇 통합, 외부 서비스 연동</li>
                                    <li>• <strong>푸시 알림:</strong> FCM/APNS 모바일 알림</li>
                                    <li>• <strong>오프라인 동기화:</strong> 오프라인 메시지 큐잉 및 동기화</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">스케일링 & 성능</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>수평 확장:</strong> HAProxy/Nginx로 WebSocket 로드밸런싱</li>
                                    <li>• <strong>Redis 어댑터:</strong> Socket.IO 다중 서버 간 상태 공유</li>
                                    <li>• <strong>메시지 파티셔닝:</strong> 채널별 샤딩으로 부하 분산</li>
                                    <li>• <strong>CDN 통합:</strong> 미디어 파일 전송 최적화</li>
                                    <li>• <strong>모니터링:</strong> 연결 수, 메시지 처리량, 지연시간 대시보드</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'frontend' && (
                    <Card
                        title="모던 프론트엔드"
                        subtitle="Next.js 14 + Tailwind + Framer Motion - 인터랙티브 UI/UX"
                        icon={Code}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">코어 스택</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Next.js 14:</strong> App Router, RSC, Server Actions</li>
                                    <li>• <strong>TypeScript:</strong> 타입 안정성, 자동완성, 리팩토링</li>
                                    <li>• <strong>TanStack Query:</strong> 서버 상태 관리, 캐싱, 동기화</li>
                                    <li>• <strong>Zustand/Jotai:</strong> 클라이언트 상태 관리</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">고급 CSS & 애니메이션</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <Palette className="w-4 h-4 mt-0.5 text-purple-500" />
                                        <span><strong>Tailwind CSS:</strong> JIT 컴파일, 커스텀 플러그인, 다크모드</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Sparkles className="w-4 h-4 mt-0.5 text-pink-500" />
                                        <span><strong>Framer Motion:</strong> 스프링 애니메이션, 제스처, 드래그앤드롭</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Code className="w-4 h-4 mt-0.5 text-blue-500" />
                                        <span><strong>CSS-in-JS:</strong> Emotion/Styled-Components 동적 스타일링</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <Layers className="w-4 h-4 mt-0.5 text-green-500" />
                                        <span><strong>고급 CSS:</strong> Container Queries, Subgrid, CSS Houdini</span>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">인터랙티브 라이브러리</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Three.js/React Three Fiber:</strong> 3D 그래픽, WebGL</li>
                                    <li>• <strong>Lottie:</strong> After Effects 애니메이션 통합</li>
                                    <li>• <strong>GSAP:</strong> 고성능 타임라인 애니메이션</li>
                                    <li>• <strong>React Spring:</strong> 물리 기반 애니메이션</li>
                                    <li>• <strong>Auto-Animate:</strong> 자동 레이아웃 애니메이션</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">UI 컴포넌트 & 디자인 시스템</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>shadcn/ui:</strong> Radix UI + Tailwind 커스터마이징</li>
                                    <li>• <strong>Storybook:</strong> 컴포넌트 문서화, 시각적 테스팅</li>
                                    <li>• <strong>Figma 통합:</strong> Design Tokens, Code Connect</li>
                                    <li>• <strong>접근성:</strong> ARIA, 키보드 네비게이션, 스크린리더</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">성능 최적화</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>번들 최적화:</strong> Code Splitting, Tree Shaking</li>
                                    <li>• <strong>이미지 최적화:</strong> Next/Image, WebP/AVIF</li>
                                    <li>• <strong>폰트 최적화:</strong> Variable Fonts, Font Subsetting</li>
                                    <li>• <strong>Core Web Vitals:</strong> LCP, FID, CLS 모니터링</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'desktop' && (
                    <Card
                        title="Desktop 애플리케이션"
                        subtitle="Tauri + Rust - 경량 크로스플랫폼 네이티브 앱"
                        icon={Monitor}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Tauri 아키텍처</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Rust 백엔드:</strong> 시스템 API, 파일 시스템, 네이티브 기능</li>
                                    <li>• <strong>Web 프론트엔드:</strong> React/Vue/Svelte 재사용</li>
                                    <li>• <strong>IPC 브릿지:</strong> 안전한 프론트-백엔드 통신</li>
                                    <li>• <strong>번들 크기:</strong> ~8MB (Electron 대비 1/10)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">배포 & 업데이트</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>자동 업데이트:</strong> 델타 업데이트, 백그라운드 다운로드</li>
                                    <li>• <strong>코드 서명:</strong> Windows/macOS 인증서</li>
                                    <li>• <strong>MSI/DMG/AppImage:</strong> 플랫폼별 패키징</li>
                                    <li>• <strong>CI/CD:</strong> GitHub Actions 자동 빌드/릴리즈</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'dwh' && (
                    <Card
                        title="데이터 웨어하우스 & 분석"
                        subtitle="ClickHouse + dbt + Superset - 실시간 분석 파이프라인"
                        icon={BarChart3}
                        gradient={true}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">데이터 수집 & 적재</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>CDC (Change Data Capture):</strong> Debezium으로 실시간 동기화</li>
                                    <li>• <strong>ETL/ELT:</strong> Apache Airflow, Dagster 오케스트레이션</li>
                                    <li>• <strong>스트리밍:</strong> Kafka → ClickHouse 실시간 적재</li>
                                    <li>• <strong>배치:</strong> Spark/Flink 대용량 처리</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">분석 & 시각화</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>OLAP 큐브:</strong> 다차원 집계, 드릴다운</li>
                                    <li>• <strong>머신러닝:</strong> Python/R 통합, AutoML</li>
                                    <li>• <strong>대시보드:</strong> Grafana, Superset, Metabase</li>
                                    <li>• <strong>임베디드 분석:</strong> 애플리케이션 내 BI</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'devops' && (
                    <Card
                        title="DevOps & 관측성"
                        subtitle="GitOps + IaC + Observability - 자동화된 운영"
                        icon={Wrench}
                    >
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">CI/CD 파이프라인</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>GitOps:</strong> ArgoCD로 선언적 배포</li>
                                    <li>• <strong>Progressive Delivery:</strong> Flagger로 카나리/블루그린</li>
                                    <li>• <strong>빌드 최적화:</strong> 멀티스테이지 Docker, 캐시 레이어</li>
                                    <li>• <strong>보안 스캔:</strong> Trivy, SonarQube, SAST/DAST</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">Observability Stack</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Tracing:</strong> Jaeger/Tempo 분산 추적</li>
                                    <li>• <strong>Metrics:</strong> Prometheus + VictoriaMetrics</li>
                                    <li>• <strong>Logs:</strong> Loki + Promtail, 구조화 로깅</li>
                                    <li>• <strong>APM:</strong> Datadog/New Relic/Elastic APM</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'bonus' && (
                    <Card
                        title="추가 기술 & 트렌드"
                        subtitle="엔터프라이즈 확장 옵션"
                        icon={Cloud}
                        gradient={true}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">마이크로서비스</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Service Mesh:</strong> Istio/Linkerd</li>
                                    <li>• <strong>API Gateway:</strong> Kong/Zuul</li>
                                    <li>• <strong>서비스 레지스트리:</strong> Consul/Eureka</li>
                                    <li>• <strong>분산 트랜잭션:</strong> Saga 패턴</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-2">엣지 컴퓨팅</h4>
                                <ul className="text-sm text-slate-700 space-y-2">
                                    <li>• <strong>Edge Functions:</strong> Cloudflare Workers</li>
                                    <li>• <strong>CDN:</strong> CloudFront, Fastly</li>
                                    <li>• <strong>IoT Gateway:</strong> AWS Greengrass</li>
                                    <li>• <strong>5G MEC:</strong> 초저지연 서비스</li>
                                </ul>
                            </div>
                        </div>
                    </Card>
                )}

                {active === 'references' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card title="핵심 기술 문서" icon={ExternalLink}>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>
                                    • Spring WebFlux
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://docs.spring.io/spring-framework/reference/web/webflux.html" target="_blank" rel="noreferrer">
                                        docs.spring.io/webflux
                                    </a>
                                </li>
                                <li>
                                    • Socket.IO
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://socket.io/docs/v4/" target="_blank" rel="noreferrer">
                                        socket.io/docs
                                    </a>
                                </li>
                                <li>
                                    • Redis Streams
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://redis.io/docs/data-types/streams/" target="_blank" rel="noreferrer">
                                        redis.io/streams
                                    </a>
                                </li>
                                <li>
                                    • pgvector
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://github.com/pgvector/pgvector" target="_blank" rel="noreferrer">
                                        github.com/pgvector
                                    </a>
                                </li>
                                <li>
                                    • Framer Motion
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://www.framer.com/motion/" target="_blank" rel="noreferrer">
                                        framer.com/motion
                                    </a>
                                </li>
                                <li>
                                    • Tauri
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://tauri.app" target="_blank" rel="noreferrer">
                                        tauri.app
                                    </a>
                                </li>
                            </ul>
                        </Card>
                        <Card title="모니터링 & DevOps" icon={ExternalLink}>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>
                                    • OpenTelemetry
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://opentelemetry.io" target="_blank" rel="noreferrer">
                                        opentelemetry.io
                                    </a>
                                </li>
                                <li>
                                    • ClickHouse
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://clickhouse.com" target="_blank" rel="noreferrer">
                                        clickhouse.com
                                    </a>
                                </li>
                                <li>
                                    • ArgoCD
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://argo-cd.readthedocs.io" target="_blank" rel="noreferrer">
                                        argo-cd.readthedocs.io
                                    </a>
                                </li>
                                <li>
                                    • Prometheus
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://prometheus.io" target="_blank" rel="noreferrer">
                                        prometheus.io
                                    </a>
                                </li>
                                <li>
                                    • Grafana
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://grafana.com" target="_blank" rel="noreferrer">
                                        grafana.com
                                    </a>
                                </li>
                                <li>
                                    • Elastic Stack
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://elastic.co" target="_blank" rel="noreferrer">
                                        elastic.co
                                    </a>
                                </li>
                            </ul>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}