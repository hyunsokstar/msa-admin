// src\app\pilot-project\vibe-coding-plan\page.tsx

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
    ExternalLink,
    Star,
    Clock,
    Target,
    ChevronRight,
    Lightbulb,
    Rocket,
    Shield,
    Globe,
    Code
} from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    url: string;
    category: 'AI/ML' | 'Data' | 'Development' | 'Design';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    skills: string[];
    icon: React.ReactNode;
    platform: 'Inflearn' | 'FastCampus';
}

const VibeCodingPlan: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const courses: Course[] = [
        {
            id: 'llama-roadmap',
            title: '라마 활용 로드맵',
            description: 'LLaMA 모델을 활용한 AI 개발 전체 로드맵',
            url: 'https://www.inflearn.com/roadmaps/6886',
            category: 'AI/ML',
            level: 'Intermediate',
            duration: '12주',
            skills: ['LLaMA', 'AI 모델링', 'Python', 'Transformers'],
            icon: <Brain className="w-6 h-6" />,
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
            icon: <Bot className="w-6 h-6" />,
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
            icon: <Zap className="w-6 h-6" />,
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
            icon: <Users className="w-6 h-6" />,
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
            icon: <Palette className="w-6 h-6" />,
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
            icon: <Database className="w-6 h-6" />,
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
            icon: <TrendingUp className="w-6 h-6" />,
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
            icon: <Rocket className="w-6 h-6" />,
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
            icon: <BarChart3 className="w-6 h-6" />,
            platform: 'Inflearn'
        },
        {
            id: 'fastcampus-nlp',
            title: 'Data Science & NLP 종합 과정',
            description: '자연어 처리와 데이터 사이언스 전문가 과정',
            url: 'https://fastcampus.co.kr/category_online_datasciencenlp',
            category: 'Data',
            level: 'Advanced',
            duration: '16주',
            skills: ['NLP', 'Deep Learning', 'Python', 'Machine Learning'],
            icon: <Brain className="w-6 h-6" />,
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
            icon: <Shield className="w-6 h-6" />,
            platform: 'FastCampus'
        }
    ];

    const categories = [
        { id: 'all', name: '전체', icon: <Globe className="w-4 h-4" /> },
        { id: 'AI/ML', name: 'AI/ML', icon: <Brain className="w-4 h-4" /> },
        { id: 'Data', name: '데이터', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'Development', name: '개발', icon: <Code className="w-4 h-4" /> },
        { id: 'Design', name: '디자인', icon: <Palette className="w-4 h-4" /> }
    ];

    const filteredCourses = activeCategory === 'all'
        ? courses
        : courses.filter(course => course.category === activeCategory);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-blue-100 text-blue-800';
            case 'Advanced': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'Inflearn': return 'bg-emerald-100 text-emerald-800';
            case 'FastCampus': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-white/50 shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mr-3">
                                <Lightbulb className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    바이브코딩 마스터 플랜 2025
                                </h1>
                                <p className="text-sm text-gray-500">AI 시대를 선도하는 개발자 되기</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                11개 코스
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                                AI 전문가 과정
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            AI 혁신의 중심에서
                        </h2>
                        <h3 className="text-3xl md:text-4xl font-bold">
                            미래를 코딩하세요
                        </h3>
                    </div>
                    <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                        LLM부터 RAG, MCP, LangGraph까지 최신 AI 기술을 마스터하고
                        <br />
                        <span className="font-semibold text-blue-600">차세대 AI 전문가</span>로 성장하세요
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { icon: <Target className="w-8 h-8" />, value: '11+', label: '전문 코스', color: 'blue' },
                        { icon: <Clock className="w-8 h-8" />, value: '100+', label: '학습 시간', color: 'green' },
                        { icon: <Star className="w-8 h-8" />, value: '4.9', label: '평균 평점', color: 'yellow' },
                        { icon: <Users className="w-8 h-8" />, value: '5000+', label: '수강생', color: 'purple' }
                    ].map((stat, index) => (
                        <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center border border-white/50 shadow-lg">
                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color}-100 text-${stat.color}-600 rounded-full mb-4`}>
                                {stat.icon}
                            </div>
                            <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Category Filter */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">카테고리별 탐색</h3>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeCategory === category.id
                                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="group bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            onMouseEnter={() => setHoveredCard(course.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            {/* Card Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                                            {course.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                                {course.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getPlatformColor(course.platform)}`}>
                                                    {course.platform}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(course.level)}`}>
                                                    {course.level}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {course.description}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        {course.duration}
                                    </div>
                                    <div className="text-blue-600 font-medium">
                                        {course.category}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2">핵심 스킬</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {course.skills.slice(0, 4).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {course.skills.length > 4 && (
                                            <span className="text-xs text-gray-500">
                                                +{course.skills.length - 4}개 더
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <a
                                    href={course.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium transition-all ${hoveredCard === course.id
                                        ? 'transform scale-105 shadow-lg'
                                        : 'hover:transform hover:scale-105'
                                        }`}
                                >
                                    강의 보러가기
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">AI 전문가 여정을 시작하세요</h3>
                    <p className="text-xl text-blue-100 mb-6">
                        바이브코딩과 함께 미래 기술을 선도하는 개발자가 되어보세요
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="flex items-center gap-2 text-blue-100">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span>실무 중심 프로젝트</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <Target className="w-5 h-5 text-green-400" />
                            <span>단계별 체계적 학습</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-100">
                            <Rocket className="w-5 h-5 text-orange-400" />
                            <span>최신 AI 기술 마스터</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-6">
                        <h4 className="text-2xl font-bold mb-2">바이브코딩 커뮤니티</h4>
                        <p className="text-slate-300">
                            AI 시대를 이끌어갈 개발자들과 함께 성장하세요
                        </p>
                    </div>
                    <div className="flex justify-center items-center gap-8 text-sm text-slate-400">
                        <span>• 11개 전문 과정</span>
                        <span>• AI/ML 특화</span>
                        <span>• 실무 프로젝트</span>
                        <span>• 커뮤니티 지원</span>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-700">
                        <p className="text-slate-400 text-sm">
                            🚀 AI 혁신의 파도를 타고 미래로 나아가세요!
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VibeCodingPlan;