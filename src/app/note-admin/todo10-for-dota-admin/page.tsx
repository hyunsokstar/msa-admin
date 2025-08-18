import React from 'react'

type RoadmapItem = {
    id: number
    title: string
    purpose: string
    backend: string
    frontend: string
    ac: string[]
}

const items: RoadmapItem[] = [
    {
        id: 1,
        title: '회원가입 실시간 알림',
        purpose: '새로운 유저 가입 시 전체/관리자에게 즉시 브로드캐스트',
        backend:
            'XADD app.signups * userId ...; ConsumerGroup: signups-web; WebFlux(SSE)로 push; 재시도용 DLQ: app.signups.dlq',
        frontend: '알림 토스트(shadcn/toast), “최근 이벤트” 패널',
        ac: ['가입 후 1초 내 알림 노출', '이벤트 ID 기반 멱등 처리로 중복 수신 없음'],
    },
    {
        id: 2,
        title: '공지사항 실시간 푸시',
        purpose: '운영자가 등록한 공지를 대상 유저에게 스트리밍',
        backend: 'app.notices 스트림, 역할/테넌트별 라우팅 key, 만료 TTL 필드',
        frontend: '공지 모달 + 벨 아이콘 배지',
        ac: ['대상자에게만 표시', '읽음 처리/숨김 상태 유지'],
    },
    {
        id: 3,
        title: '시스템 이벤트 타임라인(감사 로그)',
        purpose: '가입/로그인/권한변경/비밀번호 변경/세션만료 등 핵심 이벤트 한눈에',
        backend: 'app.audit 스트림(표준 스키마: type, actorId, targetId, ts, meta)',
        frontend: '필터(기간/타입/유저), 무한 스크롤 타임라인',
        ac: ['주요 액션 100% 기록', '검색/필터 < 1초'],
    },
    {
        id: 4,
        title: '다중 채널 알림 라우터 (웹/SMS/카카오·이메일)',
        purpose: '같은 이벤트를 채널 우선순위에 따라 발송',
        backend:
            '라우터 워커 app.notify.route → 채널 큐(app.notify.sms, app.notify.kakao, app.notify.email)로 분기',
        frontend: '알림 환경설정 페이지(채널 on/off, 조용한 시간)',
        ac: ['채널 실패 시 폴백', '사용자 선호 반영'],
    },
    {
        id: 5,
        title: '운영자 대시보드(실시간 메트릭)',
        purpose: '가입 속도, 활성 세션, 알림 전송 성공률/지연시간 모니터',
        backend:
            '집계 워커가 10초 간격으로 app.metrics 업데이트(또는 RedisTimeSeries/ClickHouse)',
        frontend:
            '카드 위젯(가입/분), 라인차트(지연 p50/p95), 게이지(성공률)',
        ac: ['5~10초 내 지표 반영', '오류율 임계치 초과 시 배지 경고'],
    },
    {
        id: 6,
        title: '역할·권한 변경 실시간 반영',
        purpose: 'RBAC 수정 시 유저 UI 즉시 업데이트',
        backend:
            'app.rbac.changed 이벤트 발행, 세션 인validation 또는 capability 패치',
        frontend: '권한 바뀌면 메뉴/버튼 즉시 토글(Zustand store)',
        ac: ['변경 후 3초 내 UI 반영', '새로고침 없이 동작'],
    },
    {
        id: 7,
        title: '중요 공지 “필독” 워크플로우',
        purpose: '특정 공지에 대해 읽음 확인/미확인 추적',
        backend:
            'app.notice.required 발행 → ack 스트림 app.notice.ack 수집, 미응답 N분 후 리마인드',
        frontend: '블로킹 모달 + “동의/확인” 체크',
        ac: ['응답률 집계', '미응답 자동 재알림'],
    },
    {
        id: 8,
        title: '레이트 리미팅 & 안티 스팸 알림',
        purpose: '동일 이벤트 폭주 시 묶음(throttle/batch) 전달',
        backend:
            '사용자별 키로 토큰 버킷, N건 묶음 배치 후 5초 간격 전달',
        frontend: '“새로 N건” 압축 토스트, 클릭 시 상세 열람',
        ac: ['스파이크에도 UI 과부하 없음', '손실 없이 요약'],
    },
    {
        id: 9,
        title: '인앱 채팅형 알림 피드(읽음/핀고정/보류)',
        purpose: '알림을 메시지처럼 관리(핀, 보류, 아카이브)',
        backend:
            '알림 문서 저장(읽음 상태), app.notify.interactions로 상호작용 이벤트 기록',
        frontend: 'Inbox 스타일 피드(검색/필터/핀), 배지 카운트',
        ac: ['상태 동기화 지연 < 1초', '새 기기에서도 상태 유지'],
    },
    {
        id: 10,
        title: '헬스체크 & 자가복구(Dead Letter 처리)',
        purpose: '알림 실패/소비자 지연 자동 감지·치유',
        backend:
            'DLQ 모니터링 워커, 재처리 정책(최대 M회, backoff), 장애 알림 app.ops.alerts',
        frontend: '운영 탭 “실패 이벤트” 그리드 + 재처리 버튼',
        ac: ['장애 시 운영자 알림 < 30초', '1클릭 재처리 OK'],
    },
]

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-6xl px-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">파일럿 10가지 기능 로드맵 리포트</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Redis Streams + WebFlux 기반의 실시간 알림/이벤트 처리 로드맵. 각 항목은 목적, 백엔드/프론트 전략, 수용 기준(AC)을 포함합니다.
                    </p>
                </header>

                <section className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">목차</h2>
                    <ol className="list-decimal pl-5 text-gray-700 text-sm grid md:grid-cols-2 gap-y-1">
                        {items.map((it) => (
                            <li key={it.id}>
                                <a className="hover:underline" href={`#item-${it.id}`}>
                                    {it.id}. {it.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="space-y-6">
                    {items.map((it) => (
                        <article
                            key={it.id}
                            id={`item-${it.id}`}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {it.id}. {it.title}
                                </h3>
                                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                                    AC 포함
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">
                                <span className="font-medium text-gray-900">목적: </span>
                                {it.purpose}
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">백엔드</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-line">{it.backend}</p>
                                </div>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-1">프론트</h4>
                                    <p className="text-sm text-gray-700 whitespace-pre-line">{it.frontend}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-1">수용 기준 (AC)</h4>
                                <ul className="list-disc pl-5 text-sm text-gray-700">
                                    {it.ac.map((a, i) => (
                                        <li key={i}>{a}</li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">기술 스택 제안</h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">프론트</h3>
                            <ul className="list-disc pl-5">
                                <li>Next.js 15 + Tailwind + shadcn/ui</li>
                                <li>TanStack Query + Zustand</li>
                                <li>WebFlux SSE 구독 훅</li>
                            </ul>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">백엔드</h3>
                            <ul className="list-disc pl-5">
                                <li>Spring Boot(WebFlux) + Redis Streams(Consumer Group, DLQ)</li>
                                <li>Spring Security(JWT)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">표준/운영 지침</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">표준 이벤트 스키마</h3>
                            <p>eventId, type, ts, actor, target, channel, payload, traceId</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">멱등성</h3>
                            <p>XADD 시 eventId 포함, 소비자 측 processed:{'{eventId}'} 키로 체크</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">관측성</h3>
                            <p>traceId 전파(Log/Metric), 실패는 DLQ에 원인코드 저장</p>
                        </div>
                    </div>
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Streams 키/그룹 네이밍 예</h2>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                        <li>app.signups / CG: signups-web / DLQ: app.signups.dlq</li>
                        <li>app.notices / app.audit / app.metrics</li>
                        <li>app.notify.route → app.notify.sms|kakao|email</li>
                        <li>app.rbac.changed / app.notice.required / app.notice.ack</li>
                        <li>app.ops.alerts</li>
                    </ul>
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">단계별 진행(2주 스프린트 가정)</h2>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">스프린트 1</h3>
                            <p>(1)(2)(3) + 공통 SSE 구독 훅 제작</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">스프린트 2</h3>
                            <p>(5)(7)(8) 대시보드·필독·배치</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">스프린트 3</h3>
                            <p>(4)(6)(9)(10) 채널 라우팅·RBAC 실시간·Inbox·운영툴</p>
                        </div>
                    </div>
                </section>

                <footer className="text-xs text-gray-500 mt-10">
                    필요하면 1번 기능 백엔드/프론트 샘플 코드를 추가해 드립니다.
                </footer>
            </div>
        </div>
    )
}