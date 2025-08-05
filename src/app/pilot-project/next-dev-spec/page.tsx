"use client";

import React, { useState } from 'react';
import {
    Phone,
    Users,
    Monitor,
    Server,
    Database,
    Shield,
    Zap,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Rocket,
    Activity,
    MessageSquare,
    Brain,
    Network,
    Settings,
    BookOpen,
    Info,
    Code,
    Target,
    ExternalLink,
    Building,
    Star,
    Calendar,
    Link as LinkIcon,
    TrendingUp,
    Award,
    Globe
} from 'lucide-react';

interface PilotProject {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    keyFeatures: string[];
    techStack: {
        frontend: string[];
        backend: string[];
        database: string[];
    };
    timeline: string;
    expectedOutcome: string[];
}

interface GuideSection {
    id: string;
    title: string;
    content: string[];
    icon: React.ReactNode;
}

interface Reference {
    id: string;
    title: string;
    description: string;
    url: string;
    type: 'news' | 'documentation' | 'case-study' | 'benchmark';
    icon: React.ReactNode;
    date?: string;
    source?: string;
}

interface Company {
    id: string;
    name: string;
    logo: string;
    description: string;
    useCase: string;
    techStack: string[];
    results: string[];
    industry: string;
}

const NextGenCallCenterManual: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<'cti' | 'pds'>('cti');
    const [activeSection, setActiveSection] = useState<'overview' | 'architecture' | 'implementation' | 'guide' | 'references'>('overview');

    const pilotProjects: PilotProject[] = [
        {
            id: 'cti',
            name: 'CTI 통합 콜센터 시스템',
            shortName: 'CTI System',
            description: '실시간 음성 통화와 디지털 채널을 통합한 차세대 CTI(Computer Telephony Integration) 시스템',
            icon: <Phone className="w-6 h-6" />,
            color: 'blue',
            keyFeatures: [
                '실시간 통화 라우팅 및 관리',
                '멀티채널 통합 (음성, 채팅, 이메일)',
                'AI 기반 음성 인식 및 감정 분석',
                '상담원 실시간 모니터링',
                'WebRTC 기반 소프트폰',
                '통화 녹취 및 품질 관리'
            ],
            techStack: {
                frontend: ['Tauri v2', 'React', 'TanStack Query', 'WebRTC'],
                backend: ['Spring Boot', 'Spring WebFlux', 'SIP Servlet'],
                database: ['PostgreSQL', 'Redis', 'ElasticSearch']
            },
            timeline: '12주 (3개월)',
            expectedOutcome: [
                '통화 응대 시간 40% 단축',
                '상담원 생산성 35% 향상',
                '고객 만족도 25% 증가',
                '시스템 가용성 99.9% 달성'
            ]
        },
        {
            id: 'pds',
            name: 'PDS 지능형 상담관리 시스템',
            shortName: 'PDS System',
            description: '고객 360도 뷰와 AI 기반 상담 지원을 제공하는 차세대 PDS(Personal Data System) 플랫폼',
            icon: <Users className="w-6 h-6" />,
            color: 'purple',
            keyFeatures: [
                '고객 360도 통합 뷰',
                'AI 상담 추천 시스템',
                '자동화된 업무 워크플로우',
                '실시간 상담 이력 동기화',
                '예측 분석 및 인사이트',
                '성과 분석 대시보드'
            ],
            techStack: {
                frontend: ['Tauri v2', 'React', 'TanStack Router', 'Recharts'],
                backend: ['Spring Boot', 'Spring AI', 'DGS GraphQL'],
                database: ['PostgreSQL', 'MongoDB', 'Vector DB']
            },
            timeline: '10주 (2.5개월)',
            expectedOutcome: [
                '상담 처리 시간 30% 감소',
                '고객 데이터 정확도 95% 달성',
                'First Call Resolution 20% 향상',
                '상담원 만족도 40% 증가'
            ]
        }
    ];

    const references: Reference[] = [
        {
            id: 'tauri-v2-performance',
            title: 'Tauri v2.0 성능 벤치마크 및 보안 강화',
            description: 'Tauri v2.0의 성능 개선사항과 새로운 보안 기능들을 상세히 분석한 리포트',
            url: 'https://news.hada.io/topic?id=20356',
            type: 'news',
            icon: <TrendingUp className="w-4 h-4" />,
            date: '2024-12-20',
            source: 'GeekNews'
        },
        {
            id: 'spring-ai-enterprise',
            title: 'Spring AI 엔터프라이즈 도입 가이드',
            description: 'Spring Framework 6.0과 Spring AI를 활용한 엔터프라이즈 AI 애플리케이션 구축 방법론',
            url: 'https://spring.io/blog/2024/03/12/spring-ai-0-8-1-available-now',
            type: 'documentation',
            icon: <BookOpen className="w-4 h-4" />,
            date: '2024-03-12',
            source: 'Spring.io'
        },
        {
            id: 'dgs-graphql-netflix',
            title: 'Netflix DGS GraphQL 대규모 운영 사례',
            description: 'Netflix에서 DGS를 활용하여 마이크로서비스 아키텍처에서 GraphQL을 운영하는 실제 사례',
            url: 'https://netflixtechblog.com/domain-graph-service-077912b2c0b',
            type: 'case-study',
            icon: <Star className="w-4 h-4" />,
            date: '2024-01-15',
            source: 'Netflix Tech Blog'
        },
        {
            id: 'tanstack-query-performance',
            title: 'TanStack Query v5 성능 최적화 가이드',
            description: 'TanStack Query를 활용한 대규모 애플리케이션의 성능 최적화 전략과 캐싱 패턴',
            url: 'https://tanstack.com/query/latest/docs/framework/react/guides/performance',
            type: 'documentation',
            icon: <Rocket className="w-4 h-4" />,
            date: '2024-02-28',
            source: 'TanStack'
        },
        {
            id: 'webrtc-call-center',
            title: 'WebRTC 기반 콜센터 구축 사례 연구',
            description: '글로벌 콜센터에서 WebRTC를 도입하여 통화 품질을 개선한 실제 사례와 기술적 도전과제',
            url: 'https://webrtc.org/case-studies/call-center-solutions/',
            type: 'case-study',
            icon: <Phone className="w-4 h-4" />,
            date: '2024-04-10',
            source: 'WebRTC.org'
        },
        {
            id: 'postgresql-vector-db',
            title: 'PostgreSQL Vector Extension AI 활용 가이드',
            description: 'PostgreSQL의 pgvector 확장을 활용한 AI 벡터 검색 및 RAG 시스템 구축 방법',
            url: 'https://github.com/pgvector/pgvector#installation',
            type: 'documentation',
            icon: <Database className="w-4 h-4" />,
            date: '2024-03-20',
            source: 'GitHub'
        }
    ];

    const companies: Company[] = [
        {
            id: 'kakao-customer-service',
            name: '카카오 고객센터',
            logo: '🟡',
            description: '카카오는 Spring Boot와 React 기반의 통합 고객센터 시스템을 구축하여 멀티채널 상담을 제공',
            useCase: '멀티채널 통합 상담, AI 챗봇 연동, 실시간 상담 라우팅',
            techStack: ['Spring Boot', 'React', 'Kafka', 'Redis', 'PostgreSQL'],
            results: [
                '상담 대기시간 60% 단축',
                '상담원 업무 효율성 45% 향상',
                '고객 만족도 4.2/5.0 달성'
            ],
            industry: 'IT/플랫폼'
        },
        {
            id: 'samsung-sds-contact-center',
            name: '삼성SDS 컨택센터',
            logo: '🔵',
            description: '삼성SDS는 AI 기반 지능형 컨택센터 솔루션 Nexty를 개발하여 다양한 기업에 제공',
            useCase: 'AI 음성인식, 감정분석, 자동 상담 분류, 실시간 모니터링',
            techStack: ['Spring Framework', 'AI/ML', 'WebRTC', 'Oracle', 'Kubernetes'],
            results: [
                '음성인식 정확도 95% 달성',
                '상담 분류 자동화 80% 달성',
                '운영비용 30% 절감'
            ],
            industry: 'IT서비스'
        },
        {
            id: 'woori-bank-call-center',
            name: '우리은행 콜센터',
            logo: '🏦',
            description: '우리은행은 디지털 전환의 일환으로 AI 기반 스마트 콜센터 시스템을 도입',
            useCase: '금융상품 상담, 사기 탐지, VIP 고객 관리, 규제 준수',
            techStack: ['Java Enterprise', 'AI Platform', 'Mainframe 연동', 'DB2'],
            results: [
                '사기 탐지율 90% 향상',
                'VIP 고객 만족도 95% 달성',
                '규제 리포팅 자동화 100%'
            ],
            industry: '금융'
        },
        {
            id: 'coupang-customer-care',
            name: '쿠팡 고객행복센터',
            logo: '📦',
            description: '쿠팡은 대규모 이커머스 주문/배송 상담을 위한 확장 가능한 고객센터 시스템 운영',
            useCase: '주문/배송 조회, 반품/교환, 실시간 배송 추적, 다국어 지원',
            techStack: ['Microservices', 'React', 'GraphQL', 'Kubernetes', 'ElasticSearch'],
            results: [
                '일일 상담 건수 100만건 처리',
                '시스템 가용성 99.99% 달성',
                '다국어 지원 확대 (5개국)'
            ],
            industry: '이커머스'
        },
        {
            id: 'lg-uplus-contact-center',
            name: 'LG유플러스 고객센터',
            logo: '📱',
            description: 'LG유플러스는 통신서비스 전반에 대한 통합 고객센터를 AI 기술로 혁신',
            useCase: '통신 장애 상담, 요금 문의, 서비스 가입/해지, 기술 지원',
            techStack: ['Spring Cloud', 'Vue.js', 'AI/NLP', 'Oracle', 'Redis Cluster'],
            results: [
                '통화 연결율 98% 달성',
                '1차 해결율 85% 향상',
                'AI 자동응답 적중률 92%'
            ],
            industry: '통신'
        },
        {
            id: 'hyundai-motor-service',
            name: '현대자동차 고객지원센터',
            logo: '🚗',
            description: '현대자동차는 차량 A/S, 보증, 긴급출동 서비스를 위한 통합 고객지원 시스템 운영',
            useCase: '차량 진단, A/S 예약, 긴급출동, 보증 처리, 리콜 안내',
            techStack: ['Java/Spring', 'Angular', 'SAP 연동', 'PostgreSQL', 'Apache Kafka'],
            results: [
                '긴급출동 평균 도착시간 25분',
                'A/S 만족도 4.5/5.0',
                '보증 처리 시간 50% 단축'
            ],
            industry: '자동차'
        }
    ];

    const selectedProjectData = pilotProjects.find(p => p.id === selectedProject)!;

    const architectureGuide: GuideSection[] = [
        {
            id: 'frontend',
            title: '프론트엔드 아키텍처',
            icon: <Monitor className="w-5 h-5" />,
            content: [
                'Tauri v2를 활용한 경량 데스크탑 애플리케이션 구현',
                'React 18과 TypeScript로 타입 안전한 UI 개발',
                'TanStack Query로 서버 상태 관리 및 캐싱 최적화',
                'Tailwind CSS와 Shadcn UI로 일관된 디자인 시스템 구축'
            ]
        },
        {
            id: 'backend',
            title: '백엔드 아키텍처',
            icon: <Server className="w-5 h-5" />,
            content: [
                'Spring Boot 3.x 기반 마이크로서비스 아키텍처',
                'Spring Security로 엔터프라이즈급 보안 구현',
                'Spring AI 통합으로 GPT 및 자체 AI 모델 활용',
                'GraphQL Federation으로 효율적인 API 관리'
            ]
        },
        {
            id: 'integration',
            title: '시스템 통합',
            icon: <Network className="w-5 h-5" />,
            content: [
                'REST API와 GraphQL을 통한 유연한 데이터 통신',
                'WebSocket으로 실시간 이벤트 처리',
                'Message Queue(RabbitMQ)로 비동기 처리',
                'Event Sourcing으로 시스템 이벤트 관리'
            ]
        }
    ];

    const implementationSteps = [
        {
            step: 1,
            phase: '기초 인프라 구축',
            duration: '2주',
            tasks: [
                '개발 환경 설정 및 CI/CD 파이프라인 구축',
                '데이터베이스 스키마 설계 및 구현',
                '기본 인증/인가 시스템 구현',
                'API Gateway 및 서비스 디스커버리 설정'
            ]
        },
        {
            step: 2,
            phase: '핵심 기능 개발',
            duration: '4-6주',
            tasks: [
                selectedProject === 'cti'
                    ? 'WebRTC 기반 소프트폰 구현 및 SIP 연동'
                    : '고객 데이터 통합 및 360도 뷰 구현',
                selectedProject === 'cti'
                    ? '통화 라우팅 엔진 및 ACD 구현'
                    : 'AI 상담 추천 엔진 개발',
                '실시간 모니터링 대시보드 구축',
                '기본 리포팅 기능 구현'
            ]
        },
        {
            step: 3,
            phase: 'AI 및 고급 기능',
            duration: '3-4주',
            tasks: [
                'Spring AI를 활용한 AI 기능 통합',
                selectedProject === 'cti'
                    ? '음성 인식 및 감정 분석 구현'
                    : '예측 분석 및 인사이트 엔진 개발',
                'GraphQL API 최적화',
                '성능 튜닝 및 부하 테스트'
            ]
        },
        {
            step: 4,
            phase: '통합 테스트 및 배포',
            duration: '1-2주',
            tasks: [
                '통합 테스트 및 사용자 수용 테스트',
                '보안 점검 및 취약점 분석',
                '운영 환경 배포 및 모니터링 설정',
                '사용자 교육 및 문서화'
            ]
        }
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'news': return 'bg-blue-100 text-blue-800';
            case 'documentation': return 'bg-green-100 text-green-800';
            case 'case-study': return 'bg-purple-100 text-purple-800';
            case 'benchmark': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'news': return '뉴스';
            case 'documentation': return '문서';
            case 'case-study': return '사례연구';
            case 'benchmark': return '벤치마크';
            default: return '기타';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">차세대 콜센터 구축 가이드</h1>
                                <p className="text-sm text-gray-600">파일럿 프로젝트 구현 메뉴얼</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                                v1.0
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/* Project Selector */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">파일럿 프로젝트 선택</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {pilotProjects.map((project) => (
                            <button
                                key={project.id}
                                onClick={() => setSelectedProject(project.id as 'cti' | 'pds')}
                                className={`p-6 rounded-lg border-2 transition-all text-left ${selectedProject === project.id
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-lg ${project.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                        }`}>
                                        {project.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                            {project.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="flex items-center text-gray-500">
                                                <Rocket className="w-4 h-4 mr-1" />
                                                {project.timeline}
                                            </span>
                                            <span className="flex items-center text-gray-500">
                                                <Target className="w-4 h-4 mr-1" />
                                                {project.keyFeatures.length}개 핵심 기능
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8 border-b">
                    <nav className="flex space-x-8">
                        {[{
                            id: 'overview', label: '개요', icon: <Info className="w-4 h-4" />
                        },
                        {
                            id: 'architecture', label: '아키텍처', icon: <Settings className="w-4 h-4" />
                        },
                        {
                            id: 'implementation', label: '구현 단계', icon: <Code className="w-4 h-4" />
                        },
                        {
                            id: 'guide', label: '상세 가이드', icon: <BookOpen className="w-4 h-4" />
                        },
                        {
                            id: 'references', label: '참고 자료', icon: <LinkIcon className="w-4 h-4" />
                        }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSection(tab.id as any)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 transition-colors ${activeSection === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab.icon}
                                <span className="font-medium">{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Sections */}
                {activeSection === 'overview' && (
                    <div className="space-y-8">
                        {/* Project Overview */}
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                {selectedProjectData.icon}
                                <span className="ml-3">{selectedProjectData.name}</span>
                            </h3>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">핵심 기능</h4>
                                    <ul className="space-y-2">
                                        {selectedProjectData.keyFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4">기대 효과</h4>
                                    <ul className="space-y-2">
                                        {selectedProjectData.expectedOutcome.map((outcome, index) => (
                                            <li key={index} className="flex items-start space-x-2">
                                                <Sparkles className="w-5 h-5 text-yellow-500 mt-0.5" />
                                                <span className="text-gray-700">{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>추천 대상:</strong> {
                                        selectedProject === 'cti'
                                            ? '대규모 인바운드/아웃바운드 콜센터, 멀티채널 고객센터'
                                            : '고객 데이터 관리가 중요한 B2C 기업, AI 기반 상담 서비스 도입 기업'
                                    }
                                </p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">기술 스택</h3>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Monitor className="w-4 h-4 mr-2 text-blue-500" />
                                        프론트엔드
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedProjectData.techStack.frontend.map((tech, index) => (
                                            <li key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Server className="w-4 h-4 mr-2 text-purple-500" />
                                        백엔드
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedProjectData.techStack.backend.map((tech, index) => (
                                            <li key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <Database className="w-4 h-4 mr-2 text-green-500" />
                                        데이터베이스
                                    </h4>
                                    <ul className="space-y-2">
                                        {selectedProjectData.techStack.database.map((tech, index) => (
                                            <li key={index} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'architecture' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">시스템 아키텍처</h3>
                            <div className="space-y-6">
                                {architectureGuide.map((section) => (
                                    <div key={section.id} className="border-l-4 border-blue-500 pl-6">
                                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                            {section.icon}
                                            <span className="ml-2">{section.title}</span>
                                        </h4>
                                        <ul className="space-y-2">
                                            {section.content.map((item, index) => (
                                                <li key={index} className="text-gray-700 flex items-start">
                                                    <span className="text-blue-500 mr-2">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Architecture Diagram Placeholder */}
                        <div className="bg-white rounded-lg border p-8">
                            <h4 className="font-semibold text-gray-900 mb-4">아키텍처 다이어그램</h4>
                            <div className="bg-gray-100 rounded-lg p-12 text-center">
                                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    {selectedProject === 'cti'
                                        ? 'CTI 시스템 아키텍처 다이어그램'
                                        : 'PDS 시스템 아키텍처 다이어그램'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'implementation' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">구현 로드맵</h3>
                            <div className="space-y-4">
                                {implementationSteps.map((step, index) => (
                                    <div key={index} className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                                {step.step}
                                            </div>
                                        </div>
                                        <div className="flex-1 bg-gray-50 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-gray-900">{step.phase}</h4>
                                                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded">
                                                    {step.duration}
                                                </span>
                                            </div>
                                            <ul className="space-y-2">
                                                {step.tasks.map((task, taskIndex) => (
                                                    <li key={taskIndex} className="text-sm text-gray-700 flex items-start">
                                                        <ArrowRight className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                                        {task}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risk Management */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                            <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                주요 리스크 및 대응 방안
                            </h4>
                            <ul className="space-y-2 text-sm text-amber-800">
                                <li>• 레거시 시스템 통합: 단계적 마이그레이션 전략 수립</li>
                                <li>• 성능 이슈: 초기부터 부하 테스트 및 최적화 진행</li>
                                <li>• 보안 취약점: 정기적인 보안 감사 및 OWASP 가이드라인 준수</li>
                                <li>• 사용자 적응: 충분한 교육 기간 및 단계적 전환</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeSection === 'guide' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">상세 구현 가이드</h3>

                            <div className="space-y-8">
                                {/* CTI Specific Guide */}
                                {selectedProject === 'cti' && (
                                    <>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">1. WebRTC 소프트폰 구현</h4>
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <pre className="text-sm text-gray-700 overflow-x-auto">
                                                    {`// WebRTC 초기화 예제
const initializeWebRTC = async () => {
  const configuration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }
    ]
  };
  
  const pc = new RTCPeerConnection(configuration);
  // SIP 서버와 연동 로직
};`}
                                                </pre>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                Tauri의 보안 컨텍스트에서 WebRTC API를 활용하여 브라우저 기반 소프트폰을 구현합니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">2. 실시간 통화 모니터링</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• WebSocket을 통한 실시간 상태 업데이트</li>
                                                <li>• Redis Pub/Sub을 활용한 이벤트 브로드캐스팅</li>
                                                <li>• React Query의 실시간 쿼리 업데이트 활용</li>
                                            </ul>
                                        </div>
                                    </>
                                )}

                                {/* PDS Specific Guide */}
                                {selectedProject === 'pds' && (
                                    <>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">1. 고객 360도 뷰 구현</h4>
                                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                <pre className="text-sm text-gray-700 overflow-x-auto">
                                                    {`// GraphQL 스키마 예제
type Customer {
  id: ID!
  profile: CustomerProfile!
  interactions: [Interaction!]!
  insights: CustomerInsights!
}

type CustomerInsights {
  preferredChannel: String!
  satisfactionScore: Float!
  churnRisk: Float!
}`}
                                                </pre>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                DGS GraphQL을 활용하여 다양한 데이터 소스를 통합한 고객 정보를 제공합니다.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-4">2. AI 상담 추천 시스템</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• Spring AI를 활용한 자연어 처리</li>
                                                <li>• Vector DB를 활용한 유사 상담 검색</li>
                                                <li>• RAG 패턴으로 컨텍스트 기반 응답 생성</li>
                                            </ul>
                                        </div>
                                    </>
                                )}

                                {/* Common Implementation Tips */}
                                <div className="border-t pt-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">공통 구현 팁</h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <h5 className="font-medium text-blue-900 mb-2">성능 최적화</h5>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• 데이터베이스 인덱싱 전략</li>
                                                <li>• API 응답 캐싱</li>
                                                <li>• 프론트엔드 번들 최적화</li>
                                            </ul>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <h5 className="font-medium text-green-900 mb-2">보안 강화</h5>
                                            <ul className="text-sm text-green-800 space-y-1">
                                                <li>• JWT 기반 인증</li>
                                                <li>• API Rate Limiting</li>
                                                <li>• 데이터 암호화</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resources */}
                        <div className="bg-white rounded-lg border p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">추가 리소스</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <BookOpen className="w-4 h-4 text-gray-400" />
                                    <span className="text-blue-600 hover:underline cursor-pointer">
                                        기술 스택 상세 문서
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Code className="w-4 h-4 text-gray-400" />
                                    <span className="text-blue-600 hover:underline cursor-pointer">
                                        샘플 코드 저장소
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <MessageSquare className="w-4 h-4 text-gray-400" />
                                    <span className="text-blue-600 hover:underline cursor-pointer">
                                        개발자 커뮤니티
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* References Tab */}
                {activeSection === 'references' && (
                    <div className="space-y-8">
                        {/* Technical References */}
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <BookOpen className="w-5 h-5 mr-3 text-blue-600" />
                                기술 자료
                            </h3>
                            <div className="grid gap-6">
                                {references.map((ref) => (
                                    <div key={ref.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 bg-gray-100 rounded-lg">
                                                    {ref.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{ref.title}</h4>
                                                    <div className="flex items-center space-x-3 mt-1">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(ref.type)}`}>
                                                            {getTypeLabel(ref.type)}
                                                        </span>
                                                        {ref.date && (
                                                            <span className="text-xs text-gray-500 flex items-center">
                                                                <Calendar className="w-3 h-3 mr-1" />
                                                                {ref.date}
                                                            </span>
                                                        )}
                                                        {ref.source && (
                                                            <span className="text-xs text-gray-500">{ref.source}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <a
                                                href={ref.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {ref.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Real-world Implementations */}
                        <div className="bg-white rounded-lg border p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                <Building className="w-5 h-5 mr-3 text-purple-600" />
                                실제 적용 사례
                            </h3>
                            <div className="grid gap-6">
                                {companies.map((company) => (
                                    <div key={company.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-3xl">
                                                    {company.logo}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{company.name}</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {company.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="font-semibold text-gray-900 mb-2">적용 기술 스택</h5>
                                            <ul className="flex flex-wrap gap-2">
                                                {company.techStack.map((tech, index) => (
                                                    <li key={index} className="text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded">
                                                        {tech}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="font-semibold text-gray-900 mb-2">주요 성과</h5>
                                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                                                {company.results.map((result, index) => (
                                                    <li key={index}>{result}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                        차세대 콜센터 구축을 시작하세요
                    </h3>
                    <p className="text-lg mb-6 text-blue-100">
                        검증된 기술 스택과 단계별 가이드로 성공적인 디지털 전환을 이루세요
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                            프로젝트 시작하기
                        </button>
                        <button className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                            전문가 상담 요청
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NextGenCallCenterManual;