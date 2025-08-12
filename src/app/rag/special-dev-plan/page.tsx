'use client';

import React, { useState } from 'react';
import {
    MessageCircle,
    Bot,
    BarChart3,
    MessageSquare,
    Phone,
    Brain,
    Smartphone,
    Globe,
    Palette,
    Layers,
    ShoppingCart,
    GraduationCap,
    Database,
    Code,
    Gamepad2,
    Target,
    Clock,
    Users,
    ExternalLink,
    CheckCircle2,
    Star,
    Calendar,
    Award
} from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    difficulty: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
    duration: string;
    priority: 'High' | 'Medium' | 'Low';
    techStack: string[];
    deliverables: string[];
    references: { name: string; url: string }[];
    prerequisites: string[];
    learningGoals: string[];
    isPilot?: boolean; // 추가
}

const projects: Project[] = [
    {
        id: 1,
        title: "실시간 채팅 시스템",
        description: "WebSocket 기반 실시간 채팅 기능 구현",
        icon: MessageCircle,
        difficulty: "Basic",
        duration: "2-3주",
        priority: "High",
        techStack: ["Spring WebFlux", "WebSocket", "Redis", "React", "Socket.io"],
        deliverables: [
            "실시간 메시징 API",
            "채팅 UI 컴포넌트",
            "메시지 히스토리 저장",
            "온라인 상태 표시"
        ],
        prerequisites: ["Spring Boot 기초", "React 기초", "WebSocket 개념"],
        learningGoals: [
            "실시간 통신 프로토콜 이해",
            "상태 관리 패턴 학습",
            "백프레셔 처리 방법"
        ],
        references: [
            { name: "Spring WebSocket Guide", url: "https://docs.spring.io/spring-framework/reference/web/websocket.html" },
            { name: "Socket.io Documentation", url: "https://socket.io/docs/v4/" },
            { name: "Redis Pub/Sub", url: "https://redis.io/docs/latest/develop/interact/pubsub/" }
        ]
    },
    {
        id: 2,
        title: "통합 상담 솔루션",
        description: "채팅, 대시보드, 상담사 관리, RAG 연동을 포함한 종합 상담 시스템",
        icon: Bot,
        difficulty: "Advanced",
        duration: "8-10주",
        priority: "High",
        techStack: ["Spring AI", "RAG", "WebSocket", "PostgreSQL", "pgvector", "Redis Streams"],
        deliverables: [
            "상담사 대시보드",
            "실시간 상담 큐 관리",
            "AI 지원 응답 시스템",
            "상담 품질 분석 도구",
            "지식베이스 관리"
        ],
        prerequisites: ["프로젝트 1 완료", "RAG 기본 이해", "데이터베이스 설계"],
        learningGoals: [
            "복잡한 실시간 시스템 설계",
            "AI/ML 파이프라인 구축",
            "업무 흐름 자동화"
        ],
        references: [
            { name: "Spring AI Reference", url: "https://docs.spring.io/spring-ai/reference/" },
            { name: "LangChain Guide", url: "https://python.langchain.com/docs/get_started/introduction" },
            { name: "pgvector Tutorial", url: "https://github.com/pgvector/pgvector" }
        ]
    },
    {
        id: 3,
        title: "비즈니스 리포팅 도구",
        description: "ClickHouse/BigQuery 기반 실시간 분석 대시보드",
        icon: BarChart3,
        difficulty: "Intermediate",
        duration: "4-5주",
        priority: "Medium",
        techStack: ["ClickHouse", "Grafana", "Apache Superset", "dbt", "Airflow"],
        deliverables: [
            "ETL 파이프라인",
            "실시간 대시보드",
            "커스텀 리포트 빌더",
            "알림 시스템"
        ],
        prerequisites: ["SQL 고급", "데이터 모델링", "Docker"],
        learningGoals: [
            "OLAP 시스템 설계",
            "데이터 파이프라인 구축",
            "시각화 베스트 프랙티스"
        ],
        references: [
            { name: "ClickHouse Documentation", url: "https://clickhouse.com/docs" },
            { name: "dbt Tutorial", url: "https://docs.getdbt.com/tutorial/getting-started" },
            { name: "Apache Superset", url: "https://superset.apache.org/docs/intro" }
        ]
    },
    {
        id: 4,
        title: "팀 메신저 플랫폼",
        description: "Slack/Discord 스타일의 팀 협업 메신저",
        icon: MessageSquare,
        difficulty: "Intermediate",
        duration: "6-7주",
        priority: "Medium",
        techStack: ["NestJS", "GraphQL", "React", "Electron", "WebRTC"],
        deliverables: [
            "멀티 채널 메신저",
            "파일 공유 시스템",
            "화상/음성 통화",
            "봇 통합 API"
        ],
        prerequisites: ["프로젝트 1 완료", "GraphQL 기초", "Electron 기초"],
        learningGoals: [
            "대규모 실시간 시스템",
            "P2P 통신 구현",
            "플러그인 아키텍처"
        ],
        references: [
            { name: "NestJS GraphQL", url: "https://docs.nestjs.com/graphql/quick-start" },
            { name: "WebRTC Guide", url: "https://webrtc.org/getting-started/" },
            { name: "Electron Documentation", url: "https://www.electronjs.org/docs/latest/" }
        ]
    },
    {
        id: 5,
        title: "엔터프라이즈 콜센터 플랫폼",
        description: "대기업급 옴니채널 콜센터 - Genesys/Avaya 스타일 통합 솔루션",
        icon: Phone,
        difficulty: "Expert",
        duration: "14-16주",
        priority: "High",
        techStack: ["FreeSWITCH", "Kamailio", "Spring Boot", "OpenAI Whisper", "Azure Speech", "Redis Cluster", "PostgreSQL", "Kafka"],
        deliverables: [
            "SIP 기반 VoIP 인프라",
            "ACD (Automatic Call Distribution)",
            "IVR (Interactive Voice Response)",
            "CTI (Computer Telephony Integration)",
            "실시간 통화 녹음/분석",
            "상담사 스킬 기반 라우팅",
            "Workforce Management",
            "Real-time Dashboard & Analytics"
        ],
        prerequisites: ["SIP 프로토콜", "VoIP 아키텍처", "대용량 시스템 설계", "텔레포니 기초"],
        learningGoals: [
            "엔터프라이즈 VoIP 아키텍처",
            "SIP/RTP 프로토콜 마스터",
            "대용량 동시 통화 처리",
            "통신사 연동 (SIP Trunk)",
            "컴플라이언스 및 보안 (HIPAA/PCI)",
            "고가용성 통신 시스템"
        ],
        references: [
            { name: "FreeSWITCH Documentation", url: "https://freeswitch.org/confluence/" },
            { name: "Kamailio SIP Server", url: "https://www.kamailio.org/w/documentation/" },
            { name: "RFC 3261 - SIP Protocol", url: "https://tools.ietf.org/html/rfc3261" },
            { name: "Genesys Architecture Guide", url: "https://docs.genesys.com/" },
            { name: "Enterprise VoIP Design", url: "https://www.cisco.com/c/en/us/solutions/enterprise/design-zone-collaboration/index.html" }
        ]
    },
    {
        id: 6,
        title: "Spring AI 생태계 활용",
        description: "Spring AI를 활용한 다양한 AI 응용 프로그램",
        icon: Brain,
        difficulty: "Intermediate",
        duration: "5-6주",
        priority: "High",
        techStack: ["Spring AI", "Ollama", "Vector DB", "Retrieval QA", "Function Calling"],
        deliverables: [
            "문서 QA 시스템",
            "코드 생성 도구",
            "이미지 분석 API",
            "멀티모달 챗봇"
        ],
        prerequisites: ["Spring Boot", "RAG 개념", "프롬프트 엔지니어링"],
        learningGoals: [
            "AI 모델 통합 패턴",
            "벡터 검색 최적화",
            "AI 응용 서비스 설계"
        ],
        references: [
            { name: "Spring AI Samples", url: "https://github.com/spring-projects/spring-ai" },
            { name: "Ollama Documentation", url: "https://ollama.ai/docs" },
            { name: "Retrieval QA Guide", url: "https://python.langchain.com/docs/use_cases/question_answering" }
        ]
    },
    {
        id: 7,
        title: "Tauri 크로스플랫폼 앱",
        description: "Rust + Web 기술로 경량 데스크톱/모바일 앱",
        icon: Smartphone,
        difficulty: "Intermediate",
        duration: "4-6주",
        priority: "Medium",
        techStack: ["Tauri", "Rust", "React", "SQLite", "Tauri Mobile"],
        deliverables: [
            "개인 생산성 도구",
            "파일 관리 유틸리티",
            "시스템 모니터링 앱",
            "모바일 컴패니언 앱"
        ],
        prerequisites: ["Rust 기초", "React", "네이티브 앱 개념"],
        learningGoals: [
            "Rust/Web 하이브리드 개발",
            "크로스플랫폼 빌드",
            "네이티브 시스템 통합"
        ],
        references: [
            { name: "Tauri Guide", url: "https://tauri.app/v1/guides/" },
            { name: "Rust Book", url: "https://doc.rust-lang.org/book/" },
            { name: "Tauri Mobile", url: "https://tauri.app/blog/tauri-mobile-alpha/" }
        ]
    },
    {
        id: 8,
        title: "WebRTC 미디어 스트리밍",
        description: "P2P 영상/음성 통신 및 스트리밍 플랫폼",
        icon: Globe,
        difficulty: "Advanced",
        duration: "8-9주",
        priority: "Low",
        techStack: ["WebRTC", "Janus Gateway", "FFmpeg", "HLS", "DASH"],
        deliverables: [
            "P2P 화상회의",
            "라이브 스트리밍",
            "화면 공유 도구",
            "미디어 처리 API"
        ],
        prerequisites: ["네트워킹 기초", "미디어 코덱", "실시간 통신"],
        learningGoals: [
            "P2P 네트워킹",
            "미디어 스트리밍 프로토콜",
            "실시간 미디어 처리"
        ],
        references: [
            { name: "WebRTC for Beginners", url: "https://webrtcforthecurious.com/" },
            { name: "Janus WebRTC Server", url: "https://janus.conf.meetecho.com/docs/" },
            { name: "FFmpeg Documentation", url: "https://ffmpeg.org/documentation.html" }
        ]
    },
    {
        id: 9,
        title: "3D 웹 인터랙티브 UI",
        description: "Three.js, Framer Motion을 활용한 고급 프론트엔드",
        icon: Palette,
        difficulty: "Intermediate",
        duration: "4-5주",
        priority: "Low",
        techStack: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP", "WebGL"],
        deliverables: [
            "3D 제품 쇼케이스",
            "인터랙티브 데이터 시각화",
            "애니메이션 라이브러리",
            "VR/AR 웹 체험"
        ],
        prerequisites: ["React", "CSS 애니메이션", "3D 그래픽 기초"],
        learningGoals: [
            "3D 웹 그래픽스",
            "성능 최적화",
            "UX 애니메이션 설계"
        ],
        references: [
            { name: "Three.js Manual", url: "https://threejs.org/manual/" },
            { name: "React Three Fiber", url: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction" },
            { name: "Framer Motion", url: "https://www.framer.com/motion/" }
        ]
    },
    {
        id: 10,
        title: "API Gateway & BFF",
        description: "NestJS 기반 마이크로서비스 게이트웨이",
        icon: Layers,
        difficulty: "Advanced",
        duration: "6-7주",
        priority: "High",
        techStack: ["NestJS", "GraphQL Federation", "OpenAPI", "Kong", "Istio"],
        deliverables: [
            "통합 API 게이트웨이",
            "BFF 패턴 구현",
            "API 문서화",
            "로드밸런싱/캐싱"
        ],
        prerequisites: ["마이크로서비스 아키텍처", "GraphQL", "Kubernetes"],
        learningGoals: [
            "API 설계 패턴",
            "서비스 메시 아키텍처",
            "분산 시스템 관리"
        ],
        references: [
            { name: "NestJS Microservices", url: "https://docs.nestjs.com/microservices/basics" },
            { name: "GraphQL Federation", url: "https://www.apollographql.com/docs/federation/" },
            { name: "Kong Gateway", url: "https://docs.konghq.com/gateway/" }
        ]
    },
    {
        id: 11,
        title: "이커머스 플랫폼",
        description: "결제, 주문관리, 커뮤니티를 포함한 통합 상거래 사이트",
        icon: ShoppingCart,
        difficulty: "Advanced",
        duration: "10-12주",
        priority: "Medium",
        techStack: ["Spring Boot", "Stripe API", "Redis", "Elasticsearch", "Next.js"],
        deliverables: [
            "상품 카탈로그",
            "결제 시스템",
            "주문 관리",
            "사용자 커뮤니티",
            "추천 엔진"
        ],
        prerequisites: ["웹 개발 전반", "결제 시스템", "검색 엔진"],
        learningGoals: [
            "전자상거래 패턴",
            "결제 보안",
            "추천 알고리즘"
        ],
        references: [
            { name: "Stripe Documentation", url: "https://stripe.com/docs" },
            { name: "Elasticsearch Guide", url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html" },
            { name: "E-commerce Patterns", url: "https://microservices.io/patterns/" }
        ]
    },
    {
        id: 12,
        title: "교육 플랫폼",
        description: "LMS, 화상강의, 평가시스템을 포함한 종합 교육 플랫폼",
        icon: GraduationCap,
        difficulty: "Advanced",
        duration: "8-10주",
        priority: "Medium",
        techStack: ["Spring Boot", "WebRTC", "FFmpeg", "Canvas API", "Chart.js"],
        deliverables: [
            "LMS 시스템",
            "화상 강의실",
            "온라인 평가 도구",
            "학습 분석 대시보드",
            "모바일 학습앱"
        ],
        prerequisites: ["교육 도메인 이해", "영상 처리", "데이터 분석"],
        learningGoals: [
            "에듀테크 솔루션",
            "학습 데이터 분석",
            "접근성 고려사항"
        ],
        references: [
            { name: "Moodle Architecture", url: "https://docs.moodle.org/dev/Overview" },
            { name: "xAPI Specification", url: "https://github.com/adlnet/xAPI-Spec" },
            { name: "Canvas LTI", url: "https://canvas.instructure.com/doc/api/tools_intro.html" }
        ]
    },
    {
        id: 13,
        title: "AI Native 데이터 분석",
        description: "SLM 커스터마이징 및 오픈소스 기여를 통한 AI 전문성 구축",
        icon: Database,
        difficulty: "Expert",
        duration: "12-16주",
        priority: "High",
        techStack: ["PyTorch", "Transformers", "MLflow", "DVC", "Weights & Biases"],
        deliverables: [
            "커스텀 SLM 모델",
            "파인튜닝 파이프라인",
            "모델 서빙 시스템",
            "오픈소스 기여",
            "논문 작성"
        ],
        prerequisites: ["머신러닝 기초", "Python", "딥러닝 프레임워크"],
        learningGoals: [
            "모델 커스터마이징",
            "ML 엔지니어링",
            "오픈소스 기여 방법"
        ],
        references: [
            { name: "Hugging Face Course", url: "https://huggingface.co/course" },
            { name: "MLOps Guide", url: "https://mlops-guide.github.io/" },
            { name: "Papers With Code", url: "https://paperswithcode.com/" }
        ]
    },
    {
        id: 14,
        title: "멀티랭귀지 아키텍처 마스터리",
        description: "Clean Architecture와 TDD를 적용한 다언어 프로젝트",
        icon: Code,
        difficulty: "Expert",
        duration: "8-10주",
        priority: "Medium",
        techStack: ["Java/Spring", "TypeScript/Node.js", "Rust", "Go", "Python"],
        deliverables: [
            "다언어 마이크로서비스",
            "공통 아키텍처 패턴",
            "TDD 베스트 프랙티스",
            "성능 벤치마크",
            "아키텍처 가이드"
        ],
        prerequisites: ["소프트웨어 아키텍처", "여러 프로그래밍 언어", "TDD"],
        learningGoals: [
            "언어별 특성 이해",
            "아키텍처 패턴 적용",
            "테스트 전략 수립"
        ],
        references: [
            { name: "Clean Architecture", url: "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html" },
            { name: "TDD by Example", url: "https://www.oreilly.com/library/view/test-driven-development/0321146530/" },
            { name: "Architecture Patterns", url: "https://martinfowler.com/architecture/" }
        ]
    },
    {
        id: 15,
        title: "게임 엔진 개발",
        description: "Rust 기반 2D/3D 게임 엔진 프로토타입",
        icon: Gamepad2,
        difficulty: "Expert",
        duration: "16-20주",
        priority: "Low",
        techStack: ["Rust", "WebGPU", "ECS", "Physics Engine", "Audio"],
        deliverables: [
            "렌더링 엔진",
            "물리 시뮬레이션",
            "오디오 시스템",
            "에디터 도구",
            "샘플 게임"
        ],
        prerequisites: ["Rust 고급", "3D 그래픽스", "게임 개발 이론"],
        learningGoals: [
            "저수준 그래픽스 프로그래밍",
            "엔진 아키텍처 설계",
            "성능 최적화"
        ],
        references: [
            { name: "Bevy Engine", url: "https://bevyengine.org/learn/" },
            { name: "Real-Time Rendering", url: "https://www.realtimerendering.com/" },
            { name: "Game Engine Architecture", url: "https://www.gameenginebook.com/" }
        ]
    },
    {
        id: 16,
        title: "Nexus Call Hub - 통합 콜센터 데스크톱",
        description: "Tauri + Spring Boot + Spring Security를 활용한 엔터프라이즈급 콜센터 데스크톱 애플리케이션",
        icon: Phone,
        difficulty: "Expert",
        duration: "16-20주",
        priority: "High",
        techStack: ["Tauri", "Rust", "React", "Spring Boot", "Spring Security", "WebSocket", "PostgreSQL", "JWT", "OAuth2"],
        deliverables: [
            "크로스플랫폼 콜센터 데스크톱 앱",
            "Spring Security 기반 인증/인가 시스템",
            "실시간 통화 상태 모니터링",
            "상담사 워크플로우 관리",
            "고객 정보 통합 뷰",
            "통화 기록 및 분석 도구",
            "오프라인 모드 지원",
            "자동 업데이트 시스템"
        ],
        prerequisites: ["Rust 중급", "Spring Boot", "Spring Security", "Tauri 기초", "데스크톱 앱 아키텍처"],
        learningGoals: [
            "Hybrid 앱 아키텍처 설계",
            "네이티브-웹 브릿지 최적화",
            "엔터프라이즈 보안 패턴",
            "멀티스레드 실시간 처리",
            "크로스플랫폼 배포 전략",
            "시스템 리소스 최적화"
        ],
        references: [
            { name: "Nexus Call Hub Repository", url: "https://github.com/hyunsokstar/nexus-call-hub/releases" },
            { name: "Spring Security Study", url: "https://github.com/hyunsokstar/study-spring-security.git" },
            { name: "Tauri Security Guide", url: "https://tauri.app/v1/guides/building/app-security/" },
            { name: "Spring Boot Desktop Integration", url: "https://spring.io/guides/gs/serving-web-content/" },
            { name: "Rust-Java Interop", url: "https://github.com/jni-rs/jni-rs" },
            { name: "Enterprise Desktop Apps", url: "https://www.electronjs.org/docs/latest/tutorial/security" }
        ]
    }
];

const difficultyColors = {
    Basic: "bg-green-100 text-green-800 border-green-200",
    Intermediate: "bg-blue-100 text-blue-800 border-blue-200",
    Advanced: "bg-orange-100 text-orange-800 border-orange-200",
    Expert: "bg-red-100 text-red-800 border-red-200"
};

const priorityColors = {
    High: "bg-red-50 border-red-200",
    Medium: "bg-yellow-50 border-yellow-200",
    Low: "bg-gray-50 border-gray-200"
};

export default function SpecialDevPlanPage() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<'all' | 'Basic' | 'Intermediate' | 'Advanced' | 'Expert' | 'pilot'>('all');

    const filteredProjects = filter === 'all'
        ? projects
        : filter === 'pilot'
            ? projects.filter(p => p.isPilot)
            : projects.filter(p => p.difficulty === filter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">특별 개발 계획</h1>
                            <p className="text-slate-600">16개 파일럿 프로젝트로 구성된 종합 개발 로드맵</p>
                        </div>
                    </div>

                    {/* 필터 */}
                    <div className="flex gap-2 flex-wrap">
                        {[
                            { key: 'all', label: '전체' },
                            { key: 'Basic', label: 'Basic' },
                            { key: 'Intermediate', label: 'Intermediate' },
                            { key: 'Advanced', label: 'Advanced' },
                            { key: 'Expert', label: 'Expert' },
                            { key: 'pilot', label: '🚀 대표 파일럿' }
                        ].map((level) => (
                            <button
                                key={level.key}
                                onClick={() => setFilter(level.key as any)}
                                className={`px-4 py-2 rounded-lg border transition-colors ${filter === level.key
                                        ? level.key === 'pilot'
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600'
                                            : 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                                    } ${level.key === 'pilot' ? 'font-semibold shadow-lg' : ''}`}
                            >
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* 프로젝트 목록 */}
                    <div className="lg:col-span-2 space-y-4">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className={`bg-white rounded-xl border p-6 cursor-pointer transition-all hover:shadow-md ${priorityColors[project.priority]
                                    } ${selectedProject?.id === project.id ? 'ring-2 ring-blue-500' : ''} ${project.isPilot ? 'ring-2 ring-purple-300 bg-gradient-to-r from-purple-50 to-blue-50' : ''
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${project.isPilot ? 'bg-purple-100' : 'bg-slate-100'}`}>
                                        <project.icon className="w-6 h-6 text-slate-600" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full border ${difficultyColors[project.difficulty]}`}>
                                                {project.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 mb-3">{project.description}</p>
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {project.duration}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4" />
                                                {project.priority}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 프로젝트 상세 */}
                    <div className="space-y-6">
                        {selectedProject ? (
                            <>
                                <div className="bg-white rounded-xl border border-slate-200 p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <selectedProject.icon className="w-6 h-6 text-blue-600" />
                                        <h2 className="text-xl font-bold text-slate-900">{selectedProject.title}</h2>
                                    </div>
                                    <p className="text-slate-600 mb-4">{selectedProject.description}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <p className="text-sm text-slate-500 mb-1">난이도</p>
                                            <span className={`px-2 py-1 text-xs rounded-full border ${difficultyColors[selectedProject.difficulty]}`}>
                                                {selectedProject.difficulty}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 mb-1">예상 기간</p>
                                            <p className="text-sm font-medium">{selectedProject.duration}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">기술 스택</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techStack.map((tech, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">주요 결과물</h3>
                                        <ul className="space-y-1">
                                            {selectedProject.deliverables.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">선행 요구사항</h3>
                                        <ul className="space-y-1">
                                            {selectedProject.prerequisites.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Award className="w-4 h-4 text-orange-500" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">학습 목표</h3>
                                        <ul className="space-y-1">
                                            {selectedProject.learningGoals.map((goal, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Brain className="w-4 h-4 text-purple-500" />
                                                    {goal}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-2">참고 자료</h3>
                                        <ul className="space-y-1">
                                            {selectedProject.references.map((ref, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={ref.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                        {ref.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">프로젝트를 선택하세요</h3>
                                <p className="text-slate-600">좌측 목록에서 프로젝트를 클릭하면 상세 정보를 확인할 수 있습니다.</p>
                            </div>
                        )}

                        {/* 통계 카드 */}
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-semibold text-slate-900 mb-4">전체 계획 요약</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">총 프로젝트</span>
                                    <span className="font-semibold">{projects.length}개</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">High Priority</span>
                                    <span className="font-semibold text-red-600">{projects.filter(p => p.priority === 'High').length}개</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">Expert 레벨</span>
                                    <span className="font-semibold text-orange-600">{projects.filter(p => p.difficulty === 'Expert').length}개</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">예상 총 기간</span>
                                    <span className="font-semibold text-blue-600">12-18개월</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}