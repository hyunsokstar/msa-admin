// C:\Users\terec\msa-admin\src\app\pilot-project\next-dev-spec\page.tsx
"use client";

import React, { useState } from 'react';
import {
    Brain,
    Code,
    Database,
    Zap,
    Shield,
    Layers,
    Cpu,
    Globe,
    GitBranch,
    Star,
    Rocket,
    Target,
    CheckCircle,
    ArrowRight,
    Crown,
    Trophy,
    Gem,
    Sparkles,
    Settings,
    Monitor,
    Server,
    Network,
    Lock,
    Search,
    BarChart3,
    MessageSquare,
    Phone,
    Users,
    TrendingUp,
    Activity
} from 'lucide-react';

interface TechStack {
    id: string;
    name: string;
    description: string;
    category: 'frontend' | 'backend' | 'database' | 'ai' | 'graphics';
    level: 'core' | 'advanced' | 'premium';
    icon: React.ReactNode;
    features: string[];
    version?: string;
    status: 'stable' | 'latest' | 'cutting-edge';
}

interface UseCase {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    difficulty: 'easy' | 'medium' | 'hard';
    features: string[];
}

interface TabItem {
    id: 'overview' | 'frontend' | 'backend' | 'usecases';
    name: string;
    icon: React.ReactNode;
}

interface Benefit {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Phase {
    phase: string;
    title: string;
    duration: string;
    items: string[];
}

const NextDevSpec: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'frontend' | 'backend' | 'usecases'>('overview');
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const techStacks: TechStack[] = [
        // Frontend Stack
        {
            id: 'tauri',
            name: 'Tauri v2',
            description: '데스크탑 앱 개발의 혁신, 네이티브 성능과 웹 기술의 완벽한 조합',
            category: 'frontend',
            level: 'premium',
            icon: <Monitor className="w-4 h-4" />,
            features: ['크로스 플랫폼 데스크탑', '네이티브 성능', '작은 번들 사이즈', '보안 강화'],
            version: 'v2.0',
            status: 'cutting-edge'
        },
        {
            id: 'vite',
            name: 'Vite',
            description: '초고속 빌드 도구, 개발 경험의 혁신',
            category: 'frontend',
            level: 'core',
            icon: <Zap className="w-4 h-4" />,
            features: ['HMR 초고속', 'ESM 기반', '플러그인 생태계', '최적화된 빌드'],
            status: 'stable'
        },
        {
            id: 'react',
            name: 'React',
            description: '사용자 인터페이스 구축의 표준, 컴포넌트 기반 아키텍처',
            category: 'frontend',
            level: 'core',
            icon: <Code className="w-4 h-4" />,
            features: ['컴포넌트 기반', 'Virtual DOM', '풍부한 생태계', 'TypeScript 지원'],
            status: 'stable'
        },
        {
            id: 'tailwind',
            name: 'Tailwind CSS',
            description: '유틸리티 우선 CSS 프레임워크, 빠른 UI 개발',
            category: 'frontend',
            level: 'core',
            icon: <Layers className="w-4 h-4" />,
            features: ['유틸리티 클래스', '커스터마이징', 'JIT 컴파일', '반응형 디자인'],
            status: 'stable'
        },
        {
            id: 'tanstack-router',
            name: 'TanStack Router',
            description: '타입 안전한 라우터, React Router의 차세대 대안',
            category: 'frontend',
            level: 'advanced',
            icon: <GitBranch className="w-4 h-4" />,
            features: ['타입 안전성', '코드 스플리팅', '중첩 라우팅', '검색 파라미터'],
            status: 'latest'
        },
        {
            id: 'tanstack-query',
            name: 'TanStack Query',
            description: '서버 상태 관리의 끝판왕, 캐싱과 동기화의 완벽한 솔루션',
            category: 'frontend',
            level: 'advanced',
            icon: <Database className="w-4 h-4" />,
            features: ['스마트 캐싱', '백그라운드 업데이트', '낙관적 업데이트', 'DevTools'],
            status: 'stable'
        },
        {
            id: 'shadcn',
            name: 'Shadcn UI',
            description: 'Radix 기반 컴포넌트 시스템, 접근성과 커스터마이징의 완벽한 조화',
            category: 'frontend',
            level: 'premium',
            icon: <Gem className="w-4 h-4" />,
            features: ['Radix 기반', '접근성', '커스터마이징', '다크 모드'],
            status: 'latest'
        },

        // Backend Stack
        {
            id: 'spring-boot',
            name: 'Spring Boot',
            description: '엔터프라이즈 급 백엔드 개발의 정석',
            category: 'backend',
            level: 'core',
            icon: <Server className="w-4 h-4" />,
            features: ['자동 설정', '내장 서버', '프로덕션 준비', '마이크로서비스'],
            status: 'stable'
        },
        {
            id: 'spring-security',
            name: 'Spring Security',
            description: '보안 인증/인가의 완벽한 솔루션',
            category: 'backend',
            level: 'core',
            icon: <Shield className="w-4 h-4" />,
            features: ['OAuth2', 'JWT', 'RBAC', '메소드 보안'],
            status: 'stable'
        },
        {
            id: 'jpa',
            name: 'JPA',
            description: 'Java 영속성 표준, ORM의 기본',
            category: 'backend',
            level: 'core',
            icon: <Database className="w-4 h-4" />,
            features: ['엔티티 매핑', 'JPQL', '캐싱', '트랜잭션'],
            status: 'stable'
        },
        {
            id: 'jooq',
            name: 'jOOQ',
            description: '타입 안전한 SQL 빌더, 복잡한 쿼리의 완벽한 해결책',
            category: 'backend',
            level: 'advanced',
            icon: <Search className="w-4 h-4" />,
            features: ['타입 안전 SQL', '코드 생성', '복잡 쿼리', 'DB 특화 기능'],
            status: 'stable'
        },
        {
            id: 'spring-ai',
            name: 'Spring AI',
            description: 'AI 통합의 새로운 표준, GPT부터 HuggingFace까지',
            category: 'ai',
            level: 'premium',
            icon: <Brain className="w-4 h-4" />,
            features: ['GPT 통합', 'Vector DB', 'RAG 구현', 'AI 체인'],
            status: 'cutting-edge'
        },
        {
            id: 'dgs',
            name: 'DGS GraphQL',
            description: '넷플릭스가 만든 Spring 기반 GraphQL 서버 프레임워크',
            category: 'backend',
            level: 'premium',
            icon: <Network className="w-4 h-4" />,
            features: ['타입 안전성', '동적 쿼리', 'Federation', 'Subscription'],
            status: 'cutting-edge'
        },
        {
            id: 'postgresql',
            name: 'PostgreSQL',
            description: '고성능 오픈소스 관계형 데이터베이스',
            category: 'database',
            level: 'core',
            icon: <Database className="w-4 h-4" />,
            features: ['ACID 준수', 'JSON 지원', '확장성', '고급 인덱싱'],
            status: 'stable'
        }
    ];

    const useCases: UseCase[] = [
        {
            id: 'cti-system',
            title: 'CTI 콜센터 시스템',
            description: '실시간 상담 관리, 통화 라우팅, 상담원 모니터링',
            icon: <Phone className="w-5 h-5" />,
            difficulty: 'hard',
            features: ['실시간 통화 관리', '상담원 대시보드', '통화 녹음/분석', 'SIP 프로토콜']
        },
        {
            id: 'pds-system',
            title: 'PDS 상담관리 시스템',
            description: '고객 정보 관리, 상담 이력, 업무 프로세스 자동화',
            icon: <Users className="w-5 h-5" />,
            difficulty: 'medium',
            features: ['고객 360도 뷰', '상담 히스토리', '업무 자동화', '성과 분석']
        },
        {
            id: 'crm-platform',
            title: '통합 CRM 플랫폼',
            description: '고객 관계 관리, 마케팅 자동화, 영업 파이프라인',
            icon: <TrendingUp className="w-5 h-5" />,
            difficulty: 'hard',
            features: ['리드 관리', '마케팅 자동화', '영업 파이프라인', 'ROI 분석']
        },
        {
            id: 'ai-analytics',
            title: 'AI 상담 분석 시스템',
            description: '음성/텍스트 분석, 감정 분석, 인사이트 도출',
            icon: <Brain className="w-5 h-5" />,
            difficulty: 'hard',
            features: ['음성 인식', '감정 분석', '키워드 추출', '트렌드 분석']
        },
        {
            id: 'realtime-monitor',
            title: '실시간 모니터링 대시보드',
            description: '시스템 상태, 성능 지표, 알림 관리',
            icon: <Activity className="w-5 h-5" />,
            difficulty: 'medium',
            features: ['실시간 메트릭', '알람 시스템', '성능 분석', '자동 리포팅']
        },
        {
            id: 'messenger-integration',
            title: '멀티채널 메신저',
            description: '카카오톡, 웹채팅, 이메일 통합 상담',
            icon: <MessageSquare className="w-5 h-5" />,
            difficulty: 'medium',
            features: ['멀티채널 통합', '자동 라우팅', '채팅봇 연동', '이력 통합']
        }
    ];

    const tabs: TabItem[] = [
        {
            id: 'overview',
            name: '개요',
            icon: <Target className="w-4 h-4" />
        },
        {
            id: 'frontend',
            name: '프론트엔드',
            icon: <Monitor className="w-4 h-4" />
        },
        {
            id: 'backend',
            name: '백엔드',
            icon: <Server className="w-4 h-4" />
        },
        {
            id: 'usecases',
            name: '활용 사례',
            icon: <Sparkles className="w-4 h-4" />
        }
    ];

    const benefits: Benefit[] = [
        {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: '개발 속도',
            description: 'Vite의 초고속 빌드와 TanStack의 강력한 도구들로 개발 생산성 극대화'
        },
        {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: '타입 안전성',
            description: 'TypeScript + jOOQ + GraphQL로 프론트엔드부터 백엔드까지 완벽한 타입 안전성'
        },
        {
            icon: <Rocket className="w-8 h-8 text-blue-500" />,
            title: '확장성',
            description: 'Spring Boot의 마이크로서비스 아키텍처와 GraphQL Federation으로 무한 확장'
        }
    ];

    const phases: Phase[] = [
        {
            phase: 'Phase 1',
            title: '기본 인프라 구축',
            duration: '2-3주',
            items: ['Tauri 앱 셋업', 'Spring Boot API', 'PostgreSQL 구성']
        },
        {
            phase: 'Phase 2',
            title: '핵심 기능 개발',
            duration: '4-6주',
            items: ['사용자 인증', '기본 CRUD', 'TanStack Query 연동']
        },
        {
            phase: 'Phase 3',
            title: 'AI & GraphQL 통합',
            duration: '3-4주',
            items: ['Spring AI 연동', 'DGS GraphQL', 'AI 분석 기능']
        },
        {
            phase: 'Phase 4',
            title: '고급 기능 & 최적화',
            duration: '2-3주',
            items: ['실시간 기능', '성능 최적화', '모니터링']
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'stable': return 'bg-green-100 text-green-800';
            case 'latest': return 'bg-blue-100 text-blue-800';
            case 'cutting-edge': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'core': return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'advanced': return 'bg-purple-50 border-purple-200 text-purple-700';
            case 'premium': return 'bg-amber-50 border-amber-200 text-amber-700';
            default: return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const frontendStacks = techStacks.filter(tech => tech.category === 'frontend');
    const backendStacks = techStacks.filter(tech => ['backend', 'database', 'ai'].includes(tech.category));

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                            <Crown className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">SS급 개발 스펙</h1>
                            <p className="text-sm text-muted-foreground">레알 마드리드 + 바르셀로나 조합</p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <Trophy className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium">Galácticos급</span>
                        </div>
                        <div className="rounded-md bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 text-sm font-medium text-purple-800">
                            SS급 스펙
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold tracking-tight mb-4">
                            현시점 최강 개발 스펙
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            콜센터 CTI부터 AI 상담 분석까지, 엔터프라이즈급 시스템을 구축하는
                            <span className="font-semibold text-primary"> 완전체 기술 스택</span>
                        </p>
                    </div>

                    <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="h-4 w-4 text-amber-500" />
                            <span>최신 기술 스택</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>엔터프라이즈급</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Rocket className="h-4 w-4 text-blue-500" />
                            <span>고성능 & 확장성</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-border">
                        <nav className="-mb-px flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                                        }`}
                                >
                                    {tab.icon}
                                    <span>{tab.name}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Architecture Overview */}
                        <div className="rounded-lg border bg-card p-8">
                            <h3 className="text-2xl font-bold mb-6 flex items-center">
                                <Cpu className="w-6 h-6 mr-3 text-primary" />
                                아키텍처 개요
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
                                        <Monitor className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <h4 className="font-semibold text-blue-900">Frontend Stack</h4>
                                            <p className="text-sm text-blue-700">Tauri + React + TanStack 조합</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 p-4 rounded-lg bg-purple-50 border border-purple-200">
                                        <Server className="w-8 h-8 text-purple-600" />
                                        <div>
                                            <h4 className="font-semibold text-purple-900">Backend Stack</h4>
                                            <p className="text-sm text-purple-700">Spring Boot + AI + GraphQL</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50">
                                        <div className="flex items-center space-x-2 mb-3">
                                            <Crown className="w-5 h-5 text-amber-600" />
                                            <h4 className="font-bold text-amber-900">SS급 완전체</h4>
                                        </div>
                                        <p className="text-sm text-amber-800 leading-relaxed">
                                            DGS GraphQL까지 추가하면 현시점 최강의 엔터프라이즈 개발 스택이 완성됩니다.
                                            콜센터부터 AI 분석까지 모든 요구사항을 충족하는 완벽한 조합입니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Benefits */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="rounded-lg border bg-card p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        {benefit.icon}
                                    </div>
                                    <h4 className="font-semibold mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Frontend Tab */}
                {activeTab === 'frontend' && (
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <Monitor className="w-5 h-5 mr-2 text-primary" />
                                프론트엔드 스택
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                현대적인 데스크탑 앱 개발을 위한 최고의 기술 조합
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {frontendStacks.map((tech) => (
                                <div
                                    key={tech.id}
                                    className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                                    onMouseEnter={() => setHoveredTech(tech.id)}
                                    onMouseLeave={() => setHoveredTech(null)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-md ${getLevelColor(tech.level)}`}>
                                                {tech.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{tech.name}</h4>
                                                {tech.version && (
                                                    <span className="text-xs text-muted-foreground">{tech.version}</span>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tech.status)}`}>
                                            {tech.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        {tech.description}
                                    </p>

                                    <div className="space-y-2">
                                        <h5 className="text-sm font-medium">주요 기능</h5>
                                        <div className="flex flex-wrap gap-1">
                                            {tech.features.map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Backend Tab */}
                {activeTab === 'backend' && (
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <Server className="w-5 h-5 mr-2 text-primary" />
                                백엔드 스택
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                엔터프라이즈급 백엔드 시스템을 위한 검증된 기술 스택
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {backendStacks.map((tech) => (
                                <div
                                    key={tech.id}
                                    className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                                    onMouseEnter={() => setHoveredTech(tech.id)}
                                    onMouseLeave={() => setHoveredTech(null)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-md ${getLevelColor(tech.level)}`}>
                                                {tech.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{tech.name}</h4>
                                                {tech.version && (
                                                    <span className="text-xs text-muted-foreground">{tech.version}</span>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(tech.status)}`}>
                                            {tech.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        {tech.description}
                                    </p>

                                    <div className="space-y-2">
                                        <h5 className="text-sm font-medium">주요 기능</h5>
                                        <div className="flex flex-wrap gap-1">
                                            {tech.features.map((feature, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Special Highlight for DGS */}
                        <div className="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <Crown className="w-6 h-6 text-purple-600" />
                                <h4 className="text-lg font-bold text-purple-900">DGS GraphQL - 최종 퍼즐</h4>
                            </div>
                            <p className="text-purple-800 mb-4">
                                넷플릭스가 개발한 Spring 기반 GraphQL 서버 프레임워크입니다.
                                이 기술을 추가하면 현재 스택이 SS급 완전체가 됩니다.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-medium text-purple-900 mb-2">핵심 장점</h5>
                                    <ul className="text-sm text-purple-800 space-y-1">
                                        <li>• Spring과 완벽 통합</li>
                                        <li>• 타입 안전한 GraphQL</li>
                                        <li>• Federation 지원</li>
                                        <li>• Subscription 실시간 업데이트</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-medium text-purple-900 mb-2">콜센터 활용</h5>
                                    <ul className="text-sm text-purple-800 space-y-1">
                                        <li>• 동적 상담 데이터 쿼리</li>
                                        <li>• 실시간 상태 업데이트</li>
                                        <li>• 복합 통계 데이터 조회</li>
                                        <li>• 효율적인 API 통신</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Use Cases Tab */}
                {activeTab === 'usecases' && (
                    <div className="space-y-6">
                        <div className="rounded-lg border bg-card p-6">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                                활용 사례
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                이 기술 스택으로 구현 가능한 엔터프라이즈급 시스템들
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {useCases.map((usecase) => (
                                <div key={usecase.id} className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                                {usecase.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{usecase.title}</h4>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(usecase.difficulty)}`}>
                                                    {usecase.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                        {usecase.description}
                                    </p>

                                    <div className="space-y-2">
                                        <h5 className="text-sm font-medium">구현 기능</h5>
                                        <div className="space-y-1">
                                            {usecase.features.map((feature, index) => (
                                                <div key={index} className="flex items-center space-x-2 text-xs">
                                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Implementation Timeline */}
                        <div className="rounded-lg border bg-card p-6">
                            <h4 className="text-lg font-bold mb-4 flex items-center">
                                <Target className="w-5 h-5 mr-2 text-primary" />
                                구현 로드맵
                            </h4>
                            <div className="space-y-4">
                                {phases.map((phase, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-secondary/30">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h5 className="font-semibold">{phase.title}</h5>
                                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                                    {phase.duration}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {phase.items.map((item, itemIndex) => (
                                                    <span key={itemIndex} className="text-xs bg-background px-2 py-1 rounded border">
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer CTA */}
                <div className="mt-12 rounded-lg border bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                            <Trophy className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-4">
                        SS급 개발 스펙으로 시작하세요
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                        현시점 최강의 기술 스택으로 엔터프라이즈급 시스템을 구축하고,
                        경쟁사보다 한 발 앞선 솔루션을 제공하세요.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-amber-500" />
                            <span>검증된 엔터프라이즈 기술</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Rocket className="w-4 h-4 text-blue-500" />
                            <span>최신 AI 기술 통합</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Shield className="w-4 w-4 text-green-500" />
                            <span>확장 가능한 아키텍처</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NextDevSpec;