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
    ExternalLink
} from 'lucide-react';

type TabId =
    | 'overview'
    | 'backend'
    | 'security'
    | 'cache'
    | 'data'
    | 'ai'
    | 'realtime'
    | 'frontend'
    | 'desktop'
    | 'dwh'
    | 'devops'
    | 'bonus'
    | 'references';

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: '개요', icon: BookOpen },
    { id: 'backend', label: 'Backend (WebFlux)', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'cache', label: 'Redis', icon: Zap },
    { id: 'data', label: 'Data Layer', icon: Database },
    { id: 'ai', label: 'AI/RAG', icon: Sparkles },
    { id: 'realtime', label: '실시간', icon: Network },
    { id: 'frontend', label: 'Frontend', icon: Code },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'dwh', label: 'DWH/리포팅', icon: BarChart3 },
    { id: 'devops', label: 'DevOps/Obs', icon: Wrench },
    { id: 'bonus', label: '보너스', icon: Sparkles },
    { id: 'references', label: '참고 자료', icon: ExternalLink }
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
            className={`px-4 sm:px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
        >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{children}</span>
        </button>
    );
}

function Card({
    title,
    icon: Icon,
    children,
    subtitle
}: {
    title?: string;
    icon?: React.ComponentType<{ className?: string }>;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200">
            {(title || subtitle) && (
                <div className="px-6 pt-5">
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="w-5 h-5 text-slate-500" />}
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-slate-900">Modern Dev Report</h1>
                    <p className="text-slate-600 mt-2">
                        하단 요약 기준으로 엔드투엔드 아키텍처를 정리한 실무 보고서
                    </p>

                    {/* Tabs */}
                    <nav className="mt-6">
                        <div
                            role="tablist"
                            aria-label="Modern Dev Report Sections"
                            className="flex gap-2 overflow-x-auto"
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
                            title="요약"
                            subtitle="Spring Boot + WebFlux, Security, Redis, JPA+jOOQ, RAG, 실시간, Next.js, Tauri, DWH, DevOps/Obs"
                            icon={BookOpen}
                        >
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>• 고동시성 백엔드: Spring WebFlux로 논블로킹 I/O</li>
                                <li>• 엔터프라이즈 보안: JWT/OAuth2/RBAC, 멀티 테넌시/감사로그/정책</li>
                                <li>• 상태/이벤트 백본: Redis Streams/Hash/SortedSet</li>
                                <li>• 데이터 레이어: JPA(쓰기) + jOOQ(읽기/난쿼리)로 CQRS/DDD</li>
                                <li>• AI/RAG: Spring AI + pgvector(+ STT/TTS)로 요약/QA/FAQ 자동화</li>
                                <li>• 실시간 전송: WebSocket/SSE로 상담/알림/프레즌스 실시간</li>
                                <li>• 프론트: Next.js 또는 Vite + Tailwind + TanStack Query + shadcn — 에이전트/관리 UI</li>
                                <li>• 데스크톱: Tauri — 개인화 툴·유틸리티(경량/배포 쉬움)</li>
                                <li>• 리포팅: ClickHouse/PG/BigQuery + ETL</li>
                                <li>• DevOps & Obs: Docker/K8s, CI/CD, IaC, OpenTelemetry + Prometheus/Grafana + EFK</li>
                            </ul>
                        </Card>
                        <Card title="핵심 의사결정" icon={Wrench}>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>• Throughput/Latency 목표에 따라 WebFlux 채택</li>
                                <li>• 보안/거버넌스: RBAC/정책/감사 이벤트 표준화</li>
                                <li>• CQRS로 읽기 성능과 난쿼리 유지보수성 확보</li>
                                <li>• RAG로 문서지식 기반 자동응대/지식관리</li>
                                <li>• Observability “3신성”: Trace/Metric/Log 일원화</li>
                            </ul>
                        </Card>
                    </div>
                )}

                {active === 'backend' && (
                    <Card title="Spring Boot + WebFlux" subtitle="논블로킹 고동시성 백엔드의 심장" icon={Settings}>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• Netty 기반 논블로킹 I/O, Backpressure로 안정적 처리</li>
                            <li>• Flux/Mono로 스트리밍 API 구성, SSE로 프론트 연결</li>
                            <li>• 블로킹 호출(외부 DB/HTTP)은 전용 스케줄러 격리</li>
                            <li>• 성능 지표: p95 latency, RPS, event loop starvation 감시</li>
                        </ul>
                    </Card>
                )}

                {active === 'security' && (
                    <Card
                        title="Spring Security"
                        subtitle="JWT/OAuth2/RBAC — 멀티 테넌시/감사로그/정책"
                        icon={Shield}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• JWT + Refresh 토큰, 키 롤링(KMS/Keystore)</li>
                            <li>• OAuth2/OIDC 연동(기업 IdP), 멀티 테넌시 컨텍스트 분리</li>
                            <li>• RBAC/정책 엔진(ABAC 확장)과 감사 이벤트 표준화</li>
                            <li>• 감사로그 보존/검색: ClickHouse/ELK 연계</li>
                        </ul>
                    </Card>
                )}

                {active === 'cache' && (
                    <Card
                        title="Redis (Streams/Hash/SortedSet)"
                        subtitle="상태/대기열/이벤트 백본"
                        icon={Zap}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• 세션/토큰/레이트리밋: Hash + TTL</li>
                            <li>• 이벤트 스트림/워크큐: Streams + 컨슈머 그룹</li>
                            <li>• 랭킹/지표 스냅샷: SortedSet</li>
                            <li>• 장애 대비: Sentinel/Cluster, AOF 정책</li>
                        </ul>
                    </Card>
                )}

                {active === 'data' && (
                    <Card
                        title="Data Layer: JPA + jOOQ"
                        subtitle="CQRS/DDD — 쓰기/읽기 분리 + 난쿼리 해결사"
                        icon={Database}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• 쓰기 모델: JPA/엔티티 라이프사이클, 도메인 이벤트</li>
                            <li>• 읽기 모델: jOOQ로 복잡 SQL, Projection 최적화</li>
                            <li className="flex items-center gap-2">• 패턴: <GitBranch className="w-4 h-4" /> CQRS + Event Sourcing(선택)</li>
                            <li>• 트랜잭션/락 전략과 인덱싱 가이드</li>
                        </ul>
                    </Card>
                )}

                {active === 'ai' && (
                    <Card
                        title="AI/RAG 스택"
                        subtitle="Spring AI + pgvector(+ STT/TTS) — 요약/QA/FAQ 자동화"
                        icon={Sparkles}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• 임베딩 저장: PostgreSQL + pgvector(1536/3072 차원)</li>
                            <li>• Retrieval: 코사인/점수 임계값 + 하이브리드 검색(메타필터)</li>
                            <li>• 프롬프트 가드레일: 역할/제약/산출물/예시 구조</li>
                            <li>• 음성 입출력: STT/TTS 모듈로 콜센터/상담 자동화</li>
                        </ul>
                    </Card>
                )}

                {active === 'realtime' && (
                    <Card title="실시간 전송" subtitle="WebSocket/SSE — 상담/알림/프레즌스 실시간" icon={Network}>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• 채팅/상담: WebSocket 다중 룸 + Presence</li>
                            <li>• 스트리밍 응답: SSE로 토큰 단위 전송</li>
                            <li>• 역압/재연결/드랍 처리 전략</li>
                            <li>• SLA 기반 알림 지연/손실 모니터링</li>
                        </ul>
                    </Card>
                )}

                {active === 'frontend' && (
                    <Card
                        title="Frontend"
                        subtitle="Next.js 또는 Vite + Tailwind + TanStack Query + shadcn — 에이전트/관리 UI"
                        icon={Code}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• App Router/SSR/ISR 전략 수립</li>
                            <li>• Query 캐시/동시성 제어, 옵티미스틱 업데이트</li>
                            <li>• 디자인 시스템: shadcn/ui 기반 컴포넌트</li>
                            <li>• 접근성/성능: a11y, Core Web Vitals</li>
                            <li>• 에이전트/관리 UI 구성 패턴</li>
                        </ul>
                    </Card>
                )}

                {active === 'desktop' && (
                    <Card title="Desktop" subtitle="Tauri — 개인화 툴·유틸리티(경량/배포 쉬움)" icon={Monitor}>
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• Rust 코어 + Web 프론트로 리소스 절감</li>
                            <li>• 자동 업데이트/서명/권한 모델</li>
                            <li>• 파일/시스템 통합 유틸 제작에 적합</li>
                            <li>• 멀티 플랫폼 배포 파이프라인</li>
                        </ul>
                    </Card>
                )}

                {active === 'dwh' && (
                    <Card
                        title="DWH/리포팅"
                        subtitle="ClickHouse/PG/BigQuery(ETL 포함) — 지표/분석/대시보드"
                        icon={BarChart3}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• 이벤트/감사/지표 적재 파이프라인</li>
                            <li>• ClickHouse로 초고속 집계, BigQuery로 ML/조인</li>
                            <li>• dbt/Airflow 등으로 변환/스케줄링</li>
                            <li>• BI/대시보드 표준 정의 및 SLO 리포트</li>
                        </ul>
                    </Card>
                )}

                {active === 'devops' && (
                    <Card
                        title="DevOps & Observability"
                        subtitle="Docker/K8s, CI/CD, IaC, OpenTelemetry + Prometheus/Grafana + EFK"
                        icon={Wrench}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• GitOps(Argo CD)와 Progressive Delivery(Flagger)</li>
                            <li>• IaC(Terraform)로 환경 표준화</li>
                            <li>• OTel Trace + Prom Metrics + EFK Logs 일원화</li>
                            <li>• 비용/가용성/성능 지표로 SLO 관리</li>
                        </ul>
                    </Card>
                )}

                {active === 'bonus' && (
                    <Card
                        title="보너스(확장 옵션)"
                        subtitle="선택적/규모별 적용"
                        icon={Sparkles}
                    >
                        <ul className="text-sm text-slate-700 space-y-2">
                            <li>• NestJS Gateway/BFF(프론트 접점 최적화)</li>
                            <li>• Kafka(대형/리플레이/장기보관 필요 시)</li>
                            <li>• SQL 튜닝·데이터 수집 파이프라인 강화</li>
                            <li>• GPT/Claude · Figma · IDE/MCP는 생산성 부스터로 탑재</li>
                        </ul>
                    </Card>
                )}

                {active === 'references' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card title="백엔드/보안/실시간" icon={ExternalLink}>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>
                                    • Spring WebFlux
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://docs.spring.io/spring-framework/reference/web/webflux.html" target="_blank" rel="noreferrer">docs.spring.io/webflux</a>
                                </li>
                                <li>
                                    • Spring Security
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://docs.spring.io/spring-security/reference/" target="_blank" rel="noreferrer">docs.spring.io/spring-security</a>
                                </li>
                                <li>
                                    • Redis Streams
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://redis.io/docs/latest/data-types/streams/" target="_blank" rel="noreferrer">redis.io/streams</a>
                                </li>
                                <li>
                                    • Server-Sent Events
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://html.spec.whatwg.org/multipage/server-sent-events.html" target="_blank" rel="noreferrer">WHATWG SSE</a>
                                </li>
                            </ul>
                        </Card>
                        <Card title="데이터/AI/프론트/DevOps" icon={ExternalLink}>
                            <ul className="text-sm text-slate-700 space-y-2">
                                <li>
                                    • jOOQ
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://www.jooq.org/learn/" target="_blank" rel="noreferrer">jooq.org/learn</a>
                                </li>
                                <li>
                                    • pgvector
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://github.com/pgvector/pgvector" target="_blank" rel="noreferrer">github.com/pgvector/pgvector</a>
                                </li>
                                <li>
                                    • Spring AI
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://docs.spring.io/spring-ai/reference/" target="_blank" rel="noreferrer">docs.spring.io/spring-ai</a>
                                </li>
                                <li>
                                    • Next.js
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">nextjs.org/docs</a>
                                </li>
                                <li>
                                    • TanStack Query
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://tanstack.com/query/latest/docs/react/overview" target="_blank" rel="noreferrer">tanstack.com/query</a>
                                </li>
                                <li>
                                    • shadcn/ui
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://ui.shadcn.com" target="_blank" rel="noreferrer">ui.shadcn.com</a>
                                </li>
                                <li>
                                    • Tauri
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://tauri.app" target="_blank" rel="noreferrer">tauri.app</a>
                                </li>
                                <li>
                                    • ClickHouse
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://clickhouse.com/docs" target="_blank" rel="noreferrer">clickhouse.com/docs</a>
                                </li>
                                <li>
                                    • BigQuery
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://cloud.google.com/bigquery/docs" target="_blank" rel="noreferrer">cloud.google.com/bigquery</a>
                                </li>
                                <li>
                                    • OpenTelemetry
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://opentelemetry.io/docs/" target="_blank" rel="noreferrer">opentelemetry.io/docs</a>
                                </li>
                                <li>
                                    • Prometheus
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://prometheus.io/docs/introduction/overview/" target="_blank" rel="noreferrer">prometheus.io/docs</a>
                                </li>
                                <li>
                                    • Grafana
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://grafana.com/docs/" target="_blank" rel="noreferrer">grafana.com/docs</a>
                                </li>
                                <li>
                                    • EFK(Elastic/Fluentd/Kibana)
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://www.elastic.co/guide/index.html" target="_blank" rel="noreferrer">elastic.co/guide</a>
                                </li>
                                <li>
                                    • Kafka
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://kafka.apache.org/documentation/" target="_blank" rel="noreferrer">kafka.apache.org</a>
                                </li>
                                <li>
                                    • NestJS
                                    {' — '}
                                    <a className="text-blue-600 hover:underline" href="https://docs.nestjs.com" target="_blank" rel="noreferrer">docs.nestjs.com</a>
                                </li>
                            </ul>
                        </Card>
                    </div>
                )}
            </main>