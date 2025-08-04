"use client";

import React, { useState } from 'react';
import {
    Brain,
    Bot,
    Zap,
    Users,
    Palette,
    Database,
    TrendingUp,
    BarChart3,
    Star,
    Clock,
    Target,
    ChevronRight,
    Lightbulb,
    Rocket,
    Shield,
    Globe,
    Code,
    Filter,
    Settings,
    Network,
    Cpu,
    GitBranch
} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    url: string;
    category: 'AI/ML' | 'Data' | 'Development' | 'Design' | 'Business';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    skills: string[];
    icon: React.ReactNode;
    platform: 'Inflearn' | 'FastCampus';
    instructor?: string;
}

const VibeCodingPlan: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const courses: Course[] = [
        // Inflearn 강의들
        {
            id: 'llama-roadmap',
            title: '라마 활용 로드맵',
            description: 'LLaMA 모델을 활용한 AI 개발 전체 로드맵',
            url: 'https://www.inflearn.com/roadmaps/6886',
            category: 'AI/ML',
            level: 'Intermediate',
            duration: '12주',
            skills: ['LLaMA', 'AI 모델링', 'Python', 'Transformers'],
            icon: <Brain className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'llm-part4',
            title: 'LLM Part 4 - AI 고객센터 챗봇(AICC) RAG 구현',
            description: '대규모 언어 모델을 활용한 실전 RAG 시스템 구축',
            url: 'https://www.inflearn.com/course/대규모-언어모델-llm-part4',
            category: 'AI/ML',
            level: 'Advanced',
            duration: '8주',
            skills: ['RAG', 'ChatBot', 'Vector DB', 'LangChain'],
            icon: <Bot className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'mcp-automation',
            title: 'MCP를 이용한 업무 자동화',
            description: 'Model Context Protocol을 활용한 효율적인 업무 자동화',
            url: 'https://www.inflearn.com/course/모두를-위한-mcp를-이용한-업무자동',
            category: 'Development',
            level: 'Intermediate',
            duration: '6주',
            skills: ['MCP', 'Automation', 'API Integration', 'Workflow'],
            icon: <Zap className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'langgraph-agent',
            title: 'LangGraph로 나만의 AI 에이전트 만들기',
            description: 'LangGraph를 활용한 지능형 AI 에이전트 개발',
            url: 'https://www.inflearn.com/course/랭그래프-에이전트-part5',
            category: 'AI/ML',
            level: 'Advanced',
            duration: '10주',
            skills: ['LangGraph', 'AI Agent', 'Multi-Agent', 'Graph AI'],
            icon: <Users className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'figma-ai',
            title: 'AI 도구와 피그마를 활용한 앱 서비스',
            description: 'AI와 Figma를 결합한 현대적 앱 디자인 및 개발',
            url: 'https://www.inflearn.com/course/ai-도구와-피그마를-활용한-앱-서비',
            category: 'Design',
            level: 'Beginner',
            duration: '5주',
            skills: ['Figma', 'AI Design', 'Prototyping', 'UI/UX'],
            icon: <Palette className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'public-data-ai',
            title: '정부 AI 정책 시대 바이브코딩으로 공공데이터 AI 서비스',
            description: '공공 데이터를 활용한 AI 서비스 개발',
            url: 'https://www.inflearn.com/course/정부-ai-정책-시대-바이브코딩으로',
            category: 'Data',
            level: 'Intermediate',
            duration: '7주',
            skills: ['Public Data', 'Government API', 'Data Processing', 'AI Service'],
            icon: <Database className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'cursor-ai',
            title: '바이브코딩 재미있는 재무제표 with Cursor AI',
            description: 'Cursor AI를 활용한 재무 분석 및 시각화',
            url: 'https://www.inflearn.com/course/바이브코딩-재미있는-재무제표',
            category: 'Data',
            level: 'Beginner',
            duration: '4주',
            skills: ['Cursor AI', 'Financial Analysis', 'Data Visualization', 'Python'],
            icon: <TrendingUp className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'mcp-knowhow',
            title: '랭그래프 활용한 LLM 에이전트 개발 MCP 노하우',
            description: 'LangGraph와 MCP를 결합한 고급 에이전트 개발',
            url: 'https://www.inflearn.com/course/랭그래프-활용한-llm에이전트-개발',
            category: 'AI/ML',
            level: 'Advanced',
            duration: '9주',
            skills: ['LangGraph', 'MCP', 'Agent Development', 'Advanced AI'],
            icon: <Rocket className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        {
            id: 'data-analysis',
            title: '영국MBA ChatGPT 활용 실전 데이터 분석 특강',
            description: 'ChatGPT를 활용한 전문적인 데이터 분석 기법',
            url: 'https://www.inflearn.com/course/영국mba-chatgpt활용-실전데이터분석-특강',
            category: 'Data',
            level: 'Intermediate',
            duration: '6주',
            skills: ['ChatGPT', 'Data Analysis', 'Statistical Analysis', 'Business Intelligence'],
            icon: <BarChart3 className="w-4 h-4" />,
            platform: 'Inflearn'
        },
        
        // FastCampus 기존 강의들
        {
            id: 'fastcampus-nlp',
            title: 'Data Science & NLP 종합 과정',
            description: '자연어 처리와 데이터 사이언스 전문가 과정',
            url: 'https://fastcampus.co.kr/category_online_datasciencenlp',
            category: 'Data',
            level: 'Advanced',
            duration: '16주',
            skills: ['NLP', 'Deep Learning', 'Python', 'Machine Learning'],
            icon: <Brain className="w-4 h-4" />,
            platform: 'FastCampus'
        },
        {
            id: 'fastcampus-rag',
            title: 'AI Tech & RAG 전문가 과정',
            description: 'RAG 시스템과 AI 기술 전문 교육 과정',
            url: 'https://fastcampus.co.kr/category_online_aitechrag',
            category: 'AI/ML',
            level: 'Advanced',
            duration: '20주',
            skills: ['RAG', 'Vector Database', 'LLM', 'AI Engineering'],
            icon: <Shield className="w-4 h-4" />,
            platform: 'FastCampus'
        },

        // 새로 추가된 FastCampus 강의들
        {
            id: 'jo-daeheop-series',
            title: '조대협의 항로 시리즈',
            description: '조대협 강사의 백엔드 개발 전문 과정 시리즈',
            url: 'https://fastcampus.co.kr/search?keyword=조대협의%20항로',
            category: 'Development',
            level: 'Advanced',
            duration: '24주',
            skills: ['Backend', 'Spring', 'MSA', 'Architecture'],
            icon: <Code className="w-4 h-4" />,
            platform: 'FastCampus',
            instructor: '조대협'
        },
        {
            id: 'spring-ai',
            title: 'Spring AI 완전 정복',
            description: 'Spring Framework와 AI를 결합한 차세대 애플리케이션 개발',
            url: 'https://fastcampus.co.kr/dev_online_springai',
            category: 'AI/ML',
            level: 'Intermediate',
            duration: '12주',
            skills: ['Spring AI', 'Java', 'Spring Boot', 'AI Integration'],
            icon: <Bot className="w-4 h-4" />,
            platform: 'FastCampus'
        },
        {
            id: 'codefactory-mcp',
            title: '코드 팩토리 MCP Study',
            description: 'Model Context Protocol 실무 활용 스터디',
            url: 'https://fastcampus.co.kr/biz_online_codefactory',
            category: 'Business',
            level: 'Intermediate',
            duration: '8주',
            skills: ['MCP', 'Business Automation', 'Protocol Design', 'API Development'],
            icon: <Settings className="w-4 h-4" />,
            platform: 'FastCampus'
        },
        {
            id: 'work-automation',
            title: '업무 자동화 마스터 클래스',
            description: 'AI와 자동화 도구를 활용한 업무 효율성 극대화',
            url: 'https://fastcampus.co.kr/biz_online_mcpn8n',
            category: 'Business',
            level: 'Beginner',
            duration: '10주',
            skills: ['N8N', 'Automation', 'Workflow', 'Business Process'],
            icon: <Zap className="w-4 h-4" />,
            platform: 'FastCampus'
        },
        {
            id: 'ai-agent-fullcourse',
            title: 'AI Agent Full Course - GraphRAG',
            description: 'GraphRAG를 활용한 차세대 AI 에이전트 완전 정복',
            url: 'https://fastcampus.co.kr/data_online_graphrag',
            category: 'AI/ML',
            level: 'Advanced',
            duration: '16주',
            skills: ['GraphRAG', 'Knowledge Graph', 'Multi-Agent System', 'Advanced RAG'],
            icon: <Network className="w-4 h-4" />,
            platform: 'FastCampus'
        }
    ];

    const categories = [
        { id: 'all', name: '전체', icon: <Globe className="w-4 h-4" /> },
        { id: 'AI/ML', name: 'AI/ML', icon: <Brain className="w-4 h-4" /> },
        { id: 'Data', name: '데이터', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'Development', name: '개발', icon: <Code className="w-4 h-4" /> },
        { id: 'Design', name: '디자인', icon: <Palette className="w-4 h-4" /> },
        { id: 'Business', name: '비즈니스', icon: <Settings className="w-4 h-4" /> }
    ];

    const filteredCourses = activeCategory === 'all'
        ? courses
        : courses.filter(course => course.category === activeCategory);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-50 text-green-700 border-green-200';
            case 'Intermediate': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Advanced': return 'bg-purple-50 text-purple-700 border-purple-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'Inflearn': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'FastCampus': return 'bg-orange-50 text-orange-700 border-orange-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getCategoryStats = () => {
        const stats = categories.slice(1).map(category => ({
            ...category,
            count: courses.filter(course => course.category === category.id).length
        }));
        return stats;
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <Lightbulb className="h-4 w-4" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">바이브코딩 마스터 플랜</h1>
                            <p className="text-xs text-muted-foreground">AI 시대를 선도하는 개발자 되기</p>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center space-x-2">
                        <div className="rounded-md bg-secondary px-2 py-1 text-xs font-medium">
                            {courses.length}개 코스
                        </div>
                        <div className="rounded-md bg-secondary px-2 py-1 text-xs font-medium">
                            AI 전문가 과정
                        </div>
                    </div>
                </div>
            </header>

            <div className="container py-6">
                {/* Hero Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">AI 전문가 과정</h2>
                    <p className="text-muted-foreground mt-2">
                        LLM부터 RAG, MCP, LangGraph, Spring AI까지 최신 AI 기술을 마스터하고 차세대 AI 전문가로 성장하세요
                    </p>
                </div>

                {/* Enhanced Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex items-center space-x-2">
                            <div className="text-muted-foreground"><Target className="h-4 w-4" /></div>
                            <div className="text-2xl font-bold">{courses.length}+</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">전문 코스</p>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex items-center space-x-2">
                            <div className="text-muted-foreground"><Clock className="h-4 w-4" /></div>
                            <div className="text-2xl font-bold">150+</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">학습 시간</p>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex items-center space-x-2">
                            <div className="text-muted-foreground"><Star className="h-4 w-4" /></div>
                            <div className="text-2xl font-bold">4.9</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">평균 평점</p>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                        <div className="flex items-center space-x-2">
                            <div className="text-muted-foreground"><Users className="h-4 w-4" /></div>
                            <div className="text-2xl font-bold">10K+</div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">수강생</p>
                    </div>
                </div>

                {/* Category Overview */}
                <div className="grid gap-4 md:grid-cols-5 mb-8">
                    {getCategoryStats().map((category) => (
                        <div key={category.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 text-center">
                            <div className="flex justify-center mb-2 text-muted-foreground">
                                {category.icon}
                            </div>
                            <div className="text-lg font-bold">{category.count}</div>
                            <p className="text-xs text-muted-foreground">{category.name}</p>
                        </div>
                    ))}
                </div>

                {/* Category Filter */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <Filter className="h-4 w-4" />
                        <h3 className="text-lg font-semibold">카테고리</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                    activeCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                                        : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                {category.icon}
                                <span className="ml-2">{category.name}</span>
                                {activeCategory !== 'all' && activeCategory === category.id && (
                                    <span className="ml-2 bg-primary-foreground/20 text-xs px-1 py-0.5 rounded">
                                        {filteredCourses.length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="group rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md"
                            onMouseEnter={() => setHoveredCard(course.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-start space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                                        {course.icon}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h3 className="font-semibold leading-none tracking-tight text-sm">
                                            {course.title}
                                        </h3>
                                        {course.instructor && (
                                            <p className="text-xs text-blue-600 font-medium">
                                                {course.instructor} 강사
                                            </p>
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${getPlatformColor(course.platform)}`}>
                                                {course.platform}
                                            </span>
                                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${getLevelColor(course.level)}`}>
                                                {course.level}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 pt-0 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center space-x-1 text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="text-sm font-medium">{course.category}</div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">핵심 스킬</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {course.skills.slice(0, 4).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {course.skills.length > 4 && (
                                            <span className="text-xs text-muted-foreground">
                                                +{course.skills.length - 4}개 더
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <a
                                    href={course.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                                        hoveredCard === course.id ? 'scale-[1.02]' : ''
                                    }`}
                                >
                                    강의 보러가기
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Special Highlights */}
                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    <div className="rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                            <Code className="h-5 w-5 text-blue-600" />
                            <h3 className="text-lg font-semibold text-blue-900">조대협의 항로 시리즈</h3>
                        </div>
                        <p className="text-blue-800 text-sm mb-4">
                            백엔드 개발의 거장 조대협 강사의 실무 중심 시리즈 강의
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-blue-700">
                            <GitBranch className="h-4 w-4" />
                            <span>Spring · MSA · Architecture</span>
                        </div>
                    </div>
                    
                    <div className="rounded-lg border bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                            <Network className="h-5 w-5 text-purple-600" />
                            <h3 className="text-lg font-semibold text-purple-900">GraphRAG 전문가 과정</h3>
                        </div>
                        <p className="text-purple-800 text-sm mb-4">
                            차세대 RAG 기술인 GraphRAG를 마스터하는 고급 AI 과정
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-purple-700">
                            <Cpu className="h-4 w-4" />
                            <span>Knowledge Graph · Multi-Agent</span>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 rounded-lg border bg-card p-8 text-center">
                    <h3 className="text-2xl font-bold tracking-tight">AI 전문가 여정을 시작하세요</h3>
                    <p className="text-muted-foreground mt-2 text-lg">
                        바이브코딩과 함께 미래 기술을 선도하는 개발자가 되어보세요
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4" />
                            <span>실무 중심 프로젝트</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <span>단계별 체계적 학습</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Rocket className="h-4 w-4" />
                            <span>최신 AI 기술 마스터</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t bg-background">
                <div className="container py-8 text-center">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold">바이브코딩 커뮤니티</h4>
                        <p className="text-sm text-muted-foreground">
                            AI 시대를 이끌어갈 개발자들과 함께 성장하세요
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
                        <span>{courses.length}개 전문 과정</span>
                        <span>AI/ML 특화</span>
                        <span>실무 프로젝트</span>
                        <span>커뮤니티 지원</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                            🚀 최신 AI 기술을 활용하여 미래 기술을 선도하는 개발자가 되세요!
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VibeCodingPlan;