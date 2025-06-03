// components/BackendTechTable.tsx
'use client';

import React from 'react';

interface TechItem {
    category: string;
    tech: string;
    description: string;
    alternatives: string;
    link: string;
    summary: string;
    tip: string;
    learningCurve: number;
    importance: number;
    required: boolean;
}

const techList: TechItem[] = [
    // ──────────────── 핵심 필수 기술 (아키텍처 기반) ────────────────
    {
        category: '언어',
        tech: 'Java',
        description: 'Spring Boot 마이크로서비스 개발을 위한 핵심 언어. 안정성과 확장성이 뛰어남',
        alternatives: 'Kotlin, Scala',
        link: 'https://www.oracle.com/java/',
        summary: 'MSA 백엔드 핵심 언어',
        tip: 'Java 17+ LTS 버전 사용 권장',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '언어',
        tech: 'TypeScript',
        description: 'NestJS API Gateway 및 GraphQL 서비스 개발을 위한 타입 안전 언어',
        alternatives: 'JavaScript',
        link: 'https://www.typescriptlang.org/',
        summary: 'API Gateway 개발 언어',
        tip: 'strict 모드 활성화하여 타입 안전성 확보',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '언어',
        tech: 'C/C++',
        description: 'WebRTC Call Service의 고성능 미디어 처리를 위한 시스템 언어',
        alternatives: 'Rust, Go',
        link: 'https://isocpp.org/',
        summary: 'WebRTC 엔진 개발',
        tip: '메모리 관리와 포인터 이해 필수',
        learningCurve: 4,
        importance: 4,
        required: true,
    },

    // ──────────────── 프레임워크 ────────────────
    {
        category: '프레임워크',
        tech: 'Spring Boot',
        description: 'Chat Service, Notification Service 등 Java 마이크로서비스 개발 프레임워크',
        alternatives: 'Micronaut, Quarkus',
        link: 'https://spring.io/projects/spring-boot',
        summary: 'Java MSA 표준 프레임워크',
        tip: 'Spring Cloud와 함께 사용하여 MSA 패턴 구현',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '프레임워크',
        tech: 'NestJS',
        description: 'API Gateway, Auth Service, User Service 등 TypeScript 마이크로서비스 프레임워크',
        alternatives: 'Express, Fastify',
        link: 'https://docs.nestjs.com/',
        summary: 'TS MSA 통합 솔루션',
        tip: 'GraphQL Federation과 gRPC 클라이언트 통합 활용',
        learningCurve: 3,
        importance: 5,
        required: true,
    },

    // ──────────────── 데이터 액세스 ────────────────
    {
        category: 'ORM',
        tech: 'jOOQ',
        description: 'PostgreSQL과의 타입 안전한 SQL 작성을 위한 Java DSL',
        alternatives: 'Hibernate, JDBC Template',
        link: 'https://www.jooq.org/',
        summary: 'SQL 중심 타입 안전 ORM',
        tip: 'PostgreSQL 고급 기능(JSON, CTE, Window Functions) 활용 가능',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: 'ORM',
        tech: 'Mongoose',
        description: 'MongoDB Message DB 접근을 위한 Node.js ODM',
        alternatives: 'MongoDB Driver, Prisma',
        link: 'https://mongoosejs.com/',
        summary: 'MongoDB 스키마 관리',
        tip: '채팅 메시지 스키마 설계 시 인덱스 최적화 중요',
        learningCurve: 2,
        importance: 4,
        required: true,
    },

    // ──────────────── 데이터베이스 ────────────────
    {
        category: '데이터베이스',
        tech: 'PostgreSQL',
        description: 'User DB, Master DB, Call DB를 위한 관계형 데이터베이스',
        alternatives: 'MySQL, MariaDB',
        link: 'https://www.postgresql.org/',
        summary: '메인 관계형 DB',
        tip: '파티셔닝과 인덱스 최적화로 대용량 데이터 처리',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '데이터베이스',
        tech: 'MongoDB',
        description: 'Message DB - 채팅 메시지 저장을 위한 NoSQL 문서 데이터베이스',
        alternatives: 'Cassandra, CouchDB',
        link: 'https://www.mongodb.com/',
        summary: '메시지 저장 전용 DB',
        tip: '샤딩과 레플리카셋으로 고가용성 확보',
        learningCurve: 3,
        importance: 4,
        required: true,
    },
    {
        category: '데이터베이스',
        tech: 'Redis',
        description: 'Cache & Session 관리, Pub/Sub 메시징을 위한 인메모리 DB',
        alternatives: 'Memcached, Hazelcast',
        link: 'https://redis.io/',
        summary: '캐시 및 실시간 통신',
        tip: 'Redis Cluster와 Streams 활용으로 확장성 확보',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '데이터베이스',
        tech: 'ClickHouse',
        description: 'Analytics DB - 실시간 통계 및 분석을 위한 컬럼형 OLAP DB',
        alternatives: 'Apache Druid, TimescaleDB',
        link: 'https://clickhouse.com/',
        summary: '실시간 분석 전용 DB',
        tip: '통화 품질, 사용자 행동 분석 등 대용량 로그 처리에 최적화',
        learningCurve: 4,
        importance: 4,
        required: true,
    },

    // ──────────────── 메시징 & 통신 ────────────────
    {
        category: '메시징',
        tech: 'Kafka',
        description: '마이크로서비스 간 비동기 이벤트 스트리밍 플랫폼',
        alternatives: 'RabbitMQ, Apache Pulsar',
        link: 'https://kafka.apache.org/',
        summary: '이벤트 드리븐 아키텍처 핵심',
        tip: '토픽 파티셔닝 전략과 컨슈머 그룹 설계가 성능의 핵심',
        learningCurve: 4,
        importance: 5,
        required: true,
    },
    {
        category: '통신',
        tech: 'gRPC',
        description: '마이크로서비스 간 고성능 내부 통신 프로토콜',
        alternatives: 'REST, Apache Thrift',
        link: 'https://grpc.io/',
        summary: 'MSA 내부 통신 표준',
        tip: 'Proto 파일 버전 관리와 서비스 디스커버리 필수',
        learningCurve: 4,
        importance: 5,
        required: true,
    },
    {
        category: '통신',
        tech: 'GraphQL',
        description: 'API Gateway에서 클라이언트 요청을 효율적으로 처리하는 쿼리 언어',
        alternatives: 'REST API',
        link: 'https://graphql.org/',
        summary: 'API Gateway 쿼리 언어',
        tip: 'Federation으로 마이크로서비스별 스키마 통합 관리',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '통신',
        tech: 'WebSocket',
        description: '실시간 채팅과 알림을 위한 양방향 통신',
        alternatives: 'SSE, Long Polling',
        link: 'https://developer.mozilla.org/docs/Web/API/WebSockets_API',
        summary: '실시간 통신 프로토콜',
        tip: '연결 관리와 재접속 로직, 메시지 순서 보장 중요',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '통신',
        tech: 'WebRTC',
        description: 'Call Service의 P2P 음성/영상 통화 구현',
        alternatives: 'SIP, Janus',
        link: 'https://webrtc.org/',
        summary: '실시간 미디어 통신',
        tip: 'STUN/TURN 서버와 시그널링 서버 설계 필수',
        learningCurve: 5,
        importance: 4,
        required: true,
    },

    // ──────────────── 인증 & 보안 ────────────────
    {
        category: '인증/보안',
        tech: 'JWT',
        description: 'Stateless 토큰 기반 인증 시스템',
        alternatives: 'Session 기반 인증',
        link: 'https://jwt.io/',
        summary: '토큰 기반 인증',
        tip: 'Access/Refresh Token 전략과 토큰 rotation 구현',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '인증/보안',
        tech: 'OAuth2 / OpenID Connect',
        description: '소셜 로그인 및 API 인증 표준',
        alternatives: 'SAML',
        link: 'https://oauth.net/2/',
        summary: 'API 인증 표준',
        tip: 'PKCE 플로우로 보안 강화 필수',
        learningCurve: 3,
        importance: 4,
        required: true,
    },

    // ──────────────── 인프라 & 배포 ────────────────
    {
        category: '컨테이너',
        tech: 'Docker',
        description: '마이크로서비스 컨테이너화 및 배포',
        alternatives: 'Podman',
        link: 'https://docs.docker.com/',
        summary: '컨테이너 기술',
        tip: 'Multi-stage build로 이미지 크기 최적화',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '오케스트레이션',
        tech: 'Kubernetes',
        description: '마이크로서비스 클러스터 관리 및 자동 확장',
        alternatives: 'Docker Swarm',
        link: 'https://kubernetes.io/',
        summary: '컨테이너 오케스트레이션',
        tip: 'Service Mesh(Istio)와 함께 사용 권장',
        learningCurve: 4,
        importance: 5,
        required: true,
    },
    {
        category: 'API Gateway',
        tech: 'Nginx',
        description: '로드밸런싱, SSL 터미네이션, 리버스 프록시',
        alternatives: 'Kong, Envoy',
        link: 'https://nginx.org/',
        summary: '고성능 프록시 서버',
        tip: 'upstream 설정과 헬스체크로 고가용성 확보',
        learningCurve: 3,
        importance: 4,
        required: true,
    },

    // ──────────────── 모니터링 & 관찰성 ────────────────
    {
        category: '모니터링',
        tech: 'Prometheus',
        description: '마이크로서비스 메트릭 수집 및 모니터링',
        alternatives: 'Datadog, New Relic',
        link: 'https://prometheus.io/',
        summary: '메트릭 수집 시스템',
        tip: 'Custom metrics과 SLI/SLO 정의로 서비스 품질 관리',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '모니터링',
        tech: 'Grafana',
        description: '메트릭 시각화 및 알람 대시보드',
        alternatives: 'Kibana',
        link: 'https://grafana.com/',
        summary: '데이터 시각화',
        tip: 'PromQL 쿼리 최적화와 알람 임계값 설정 중요',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '로깅',
        tech: 'ELK Stack',
        description: '분산 로그 수집, 검색 및 분석 (Elasticsearch + Logstash + Kibana)',
        alternatives: 'Loki + Promtail',
        link: 'https://www.elastic.co/elastic-stack',
        summary: '통합 로그 관리',
        tip: '로그 레벨 표준화와 구조화된 로깅 적용',
        learningCurve: 4,
        importance: 4,
        required: true,
    },

    // ──────────────── 테스트 ────────────────
    {
        category: '테스트',
        tech: 'JUnit 5',
        description: 'Java 마이크로서비스 단위 테스트',
        alternatives: 'TestNG, Spock',
        link: 'https://junit.org/junit5/',
        summary: 'Java 테스트 프레임워크',
        tip: '@TestContainers로 통합 테스트 환경 구성',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '테스트',
        tech: 'Jest',
        description: 'TypeScript/NestJS 서비스 테스트',
        alternatives: 'Mocha, Vitest',
        link: 'https://jestjs.io/',
        summary: 'TS/JS 테스트 프레임워크',
        tip: 'supertest로 API 통합 테스트 작성',
        learningCurve: 2,
        importance: 5,
        required: true,
    },

    // ──────────────── CI/CD ────────────────
    {
        category: 'CI/CD',
        tech: 'GitHub Actions',
        description: '코드 커밋부터 배포까지 자동화 파이프라인',
        alternatives: 'Jenkins, GitLab CI',
        link: 'https://docs.github.com/actions',
        summary: 'Git 기반 CI/CD',
        tip: '마이크로서비스별 독립적인 파이프라인 구성',
        learningCurve: 2,
        importance: 4,
        required: true,
    },

    // ──────────────── 문서화 ────────────────
    {
        category: '문서화',
        tech: 'OpenAPI/Swagger',
        description: 'REST API 문서 자동 생성',
        alternatives: 'Postman, Insomnia',
        link: 'https://swagger.io/',
        summary: 'API 문서화',
        tip: 'GraphQL은 자체 스키마 문서 활용',
        learningCurve: 1,
        importance: 4,
        required: true,
    },

    // ──────────────── 부가 기능 (선택사항) ────────────────
    {
        category: '서비스 메시',
        tech: 'Istio',
        description: '마이크로서비스 간 트래픽 관리, 보안, 관찰성',
        alternatives: 'Linkerd, Consul Connect',
        link: 'https://istio.io/',
        summary: '서비스 메시 플랫폼',
        tip: 'mTLS와 트래픽 정책으로 서비스 간 보안 강화',
        learningCurve: 4,
        importance: 3,
        required: false,
    },
    {
        category: 'API 관리',
        tech: 'Kong',
        description: 'API Gateway 고급 기능 (Rate Limiting, Analytics)',
        alternatives: 'Ambassador, Zuul',
        link: 'https://konghq.com/',
        summary: 'API 게이트웨이 플러그인',
        tip: 'Nginx + Kong 조합으로 성능과 기능 최적화',
        learningCurve: 3,
        importance: 3,
        required: false,
    },
    {
        category: '비밀 관리',
        tech: 'HashiCorp Vault',
        description: '데이터베이스 자격증명, API 키 등 민감 정보 관리',
        alternatives: 'AWS Secrets Manager',
        link: 'https://www.vaultproject.io/',
        summary: '시크릿 중앙 관리',
        tip: '동적 시크릿으로 보안 수준 향상',
        learningCurve: 4,
        importance: 3,
        required: false,
    },
];

const BackendTechTable: React.FC = () => {
    const requiredTechs = techList.filter(item => item.required);
    const optionalTechs = techList.filter(item => !item.required);

    return (
        <div className="w-full overflow-x-auto py-10 space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2">마이크로서비스 아키텍처 기술 스택</h2>
                <p className="text-gray-600 mb-6">실제 운영 환경의 MSA 구조에 기반한 필수 기술 목록</p>
            </div>

            {/* 필수 기술 */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-green-700">🔥 핵심 필수 기술</h3>
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-green-50 text-gray-900">
                        <tr>
                            <th className="border px-4 py-2">분류</th>
                            <th className="border px-4 py-2">기술</th>
                            <th className="border px-4 py-2">설명</th>
                            <th className="border px-4 py-2">대안</th>
                            <th className="border px-4 py-2">공식 문서</th>
                            <th className="border px-4 py-2">요약</th>
                            <th className="border px-4 py-2">실무 팁</th>
                            <th className="border px-4 py-2">난이도</th>
                            <th className="border px-4 py-2">중요도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requiredTechs.map((item, index) => (
                            <tr key={index} className="hover:bg-green-25">
                                <td className="border px-4 py-2 whitespace-nowrap font-medium">{item.category}</td>
                                <td className="border px-4 py-2 font-bold text-green-700">{item.tech}</td>
                                <td className="border px-4 py-2 text-gray-700">{item.description}</td>
                                <td className="border px-4 py-2 text-gray-500 text-xs">{item.alternatives}</td>
                                <td className="border px-4 py-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        📖 문서
                                    </a>
                                </td>
                                <td className="border px-4 py-2 text-gray-600 font-medium">{item.summary}</td>
                                <td className="border px-4 py-2 text-gray-600 text-xs">{item.tip}</td>
                                <td className="border px-4 py-2 text-center">
                                    {'⭐'.repeat(item.learningCurve)}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {'🔥'.repeat(item.importance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 선택 기술 */}
            <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-700">⚡ 부가 기능 (선택사항)</h3>
                <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-blue-50 text-gray-900">
                        <tr>
                            <th className="border px-4 py-2">분류</th>
                            <th className="border px-4 py-2">기술</th>
                            <th className="border px-4 py-2">설명</th>
                            <th className="border px-4 py-2">대안</th>
                            <th className="border px-4 py-2">공식 문서</th>
                            <th className="border px-4 py-2">요약</th>
                            <th className="border px-4 py-2">실무 팁</th>
                            <th className="border px-4 py-2">난이도</th>
                            <th className="border px-4 py-2">중요도</th>
                        </tr>
                    </thead>
                    <tbody>
                        {optionalTechs.map((item, index) => (
                            <tr key={index} className="hover:bg-blue-25">
                                <td className="border px-4 py-2 whitespace-nowrap font-medium">{item.category}</td>
                                <td className="border px-4 py-2 font-bold text-blue-700">{item.tech}</td>
                                <td className="border px-4 py-2 text-gray-700">{item.description}</td>
                                <td className="border px-4 py-2 text-gray-500 text-xs">{item.alternatives}</td>
                                <td className="border px-4 py-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline text-xs"
                                    >
                                        📖 문서
                                    </a>
                                </td>
                                <td className="border px-4 py-2 text-gray-600 font-medium">{item.summary}</td>
                                <td className="border px-4 py-2 text-gray-600 text-xs">{item.tip}</td>
                                <td className="border px-4 py-2 text-center">
                                    {'⭐'.repeat(item.learningCurve)}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {'🔥'.repeat(item.importance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 학습 가이드 */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">📚 학습 로드맵 가이드</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-medium text-green-700 mb-2">1단계: 핵심 기반 기술</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Java/TypeScript 언어 숙련도</li>
                            <li>Spring Boot & NestJS 프레임워크</li>
                            <li>PostgreSQL & MongoDB 데이터베이스</li>
                            <li>Docker 컨테이너 기술</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-medium text-blue-700 mb-2">2단계: MSA 고급 기술</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>gRPC & GraphQL 통신</li>
                            <li>Kafka 이벤트 스트리밍</li>
                            <li>Kubernetes 오케스트레이션</li>
                            <li>Prometheus & Grafana 모니터링</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackendTechTable;