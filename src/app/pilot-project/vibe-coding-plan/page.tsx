"use client";

import React, { useState } from 'react';
import {
    Brain, Bot, Terminal, Code, Database, Globe, Palette,
    Settings, Users, Server, CheckCircle, Clock, ExternalLink,
    Target, Star, ArrowRight, BookOpen, BarChart
} from 'lucide-react';

interface AITopicData {
    id: number;
    icon: React.ReactNode;
    name: string;
    category: string;
    description: string;
    keyFeatures: string[];
    courses: {
        title: string;
        url: string;
        platform: string;
        price: string;
        students?: string;
        rating?: string;
    }[];
    projects: { title: string; description: string; difficulty: string; }[];
}

const AIVibeCodingMastery = () => {
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

    const aiTopics: AITopicData[] = [
        {
            id: 1,
            icon: <Brain className="w-6 h-6" />,
            name: "Llama 모델 활용 완전정복",
            category: "Open Source LLM",
            description: "LLM 기초 개념부터 고성능 Llama 2 모델을 Fine-Tuning하는 방법까지 차근차근 학습하는 완전한 로드맵입니다.",
            keyFeatures: [
                "Llama 2 Fine-Tuning 실습",
                "LangChain으로 나만의 ChatGPT 구현",
                "Google Gemini API 활용",
                "RAG 시스템 구축"
            ],
            courses: [
                {
                    title: "LLM 기초부터 Llama AI 에이전트까지 완전정복 로드맵",
                    url: "https://www.inflearn.com/roadmaps/6886",
                    platform: "인프런",
                    price: "₩88,000 (25% 할인)",
                    students: "269명",
                    rating: "4.6"
                },
                {
                    title: "LLM 모델 개발부터 4개 프로젝트로 완성하는 도메인 특화 파인튜닝",
                    url: "https://fastcampus.co.kr/category_online_datasciencenlp",
                    platform: "패스트캠퍼스",
                    price: "₩770,000"
                }
            ],
            projects: [
                { title: "Llama 2 한국어 Fine-Tuning", description: "한국어 데이터셋으로 Llama 2 모델을 파인튜닝", difficulty: "초급" },
                { title: "나만의 ChatGPT 구현", description: "LangChain으로 맞춤형 대화형 AI 서비스 개발", difficulty: "중급" },
                { title: "멀티모달 AI 어시스턴트", description: "텍스트와 이미지를 함께 처리하는 AI 서비스", difficulty: "고급" }
            ]
        },
        {
            id: 2,
            icon: <Database className="w-6 h-6" />,
            name: "RAG 시스템 & AI 고객센터 구축",
            category: "Retrieval-Augmented Generation",
            description: "AI 고객센터 챗봇(AICC)을 만들며 실용적인 RAG 구현 방법을 학습합니다. LangChain 라이브러리를 활용하여 고성능 RAG 시스템을 구축합니다.",
            keyFeatures: [
                "LangChain 라이브러리 활용한 AICC 구현",
                "고급 RAG 기법 학습",
                "Retrieval-Augmented Generation 다양한 활용법",
                "실무 적용 가능한 RAG 시스템"
            ],
            courses: [
                {
                    title: "모두를 위한 대규모 언어 모델 LLM Part 4 - AI 고객센터 챗봇(AICC) RAG 구현",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part4",
                    platform: "인프런",
                    price: "₩77,000",
                    students: "269명",
                    rating: "4.6"
                },
                {
                    title: "고성능 RAG를 위한 66가지 최신 RAG 테크닉",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "₩880,000"
                }
            ],
            projects: [
                { title: "AI 고객센터 챗봇", description: "실제 고객 문의를 처리하는 RAG 기반 챗봇 구현", difficulty: "중급" },
                { title: "기업 지식 검색 엔진", description: "사내 문서를 검색하는 지능형 시스템 개발", difficulty: "중급" },
                { title: "멀티모달 RAG 시스템", description: "텍스트, 이미지, 표를 통합 검색하는 고급 시스템", difficulty: "고급" }
            ]
        },
        {
            id: 3,
            icon: <Settings className="w-6 h-6" />,
            name: "MCP 업무 자동화 마스터",
            category: "Model Context Protocol",
            description: "MCP(Model Context Protocol)를 활용한 업무 자동화를 다양한 사례를 통해 학습합니다. Playwright 크롤링, Figma 디자인, Notion 데이터 정리 등 실무 자동화 기법을 배웁니다.",
            keyFeatures: [
                "LLM-MCP 통합을 통한 업무 자동화",
                "다양한 MCP 서버를 Cursor에 연결",
                "MCP(Model Context Protocol) 개념 이해",
                "다양한 워크플로우 자동화 방법"
            ],
            courses: [
                {
                    title: "모두를 위한 MCP를 이용한 업무자동화",
                    url: "https://www.inflearn.com/course/모두를-위한-mcp를-이용한-업무자동",
                    platform: "인프런",
                    price: "₩66,000",
                    students: "27명",
                    rating: "4.6"
                },
                {
                    title: "랭그래프 활용한 LLM 에이전트 개발 (MCP 노하우)",
                    url: "https://www.inflearn.com/course/랭그래프-활용한-llm에이전트-개발",
                    platform: "인프런",
                    price: "₩77,000"
                }
            ],
            projects: [
                { title: "스마트 데이터 수집기", description: "웹사이트에서 자동으로 데이터를 수집하고 정리하는 시스템", difficulty: "초급" },
                { title: "디자인 자동화 봇", description: "Figma에서 반복적인 디자인 작업을 자동화하는 도구", difficulty: "중급" },
                { title: "통합 업무 자동화 플랫폼", description: "여러 도구를 연결한 종합적인 업무 자동화 시스템", difficulty: "고급" }
            ]
        },
        {
            id: 4,
            icon: <Bot className="w-6 h-6" />,
            name: "LangGraph AI 에이전트 개발",
            category: "Multi-Agent System",
            description: "최신 AI 기술의 총집합체인 AI 에이전트! LangGraph를 이용해 다양한 AI 에이전트들을 구현하면서 나만의 AI 에이전트 구현법을 학습합니다.",
            keyFeatures: [
                "LangGraph를 이용한 AI 에이전트 구현",
                "AI 에이전트의 개념과 활용 사례",
                "다양한 AI 에이전트 아키텍처",
                "LangGraph로 나만의 AI 에이전트 구축"
            ],
            courses: [
                {
                    title: "LangGraph로 나만의 AI 에이전트 만들기",
                    url: "https://www.inflearn.com/course/랭그래프-에이전트-part5",
                    platform: "인프런",
                    price: "₩77,000",
                    students: "223명",
                    rating: "4.6"
                },
                {
                    title: "실전 AI Agent의 모든 것 - 34개 프로젝트",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "₩990,000"
                }
            ],
            projects: [
                { title: "자동 리서치 에이전트", description: "주제를 주면 자동으로 조사해서 보고서를 작성하는 AI", difficulty: "중급" },
                { title: "코드 분석 에이전트", description: "GitHub 코드를 분석하고 개선사항을 제안하는 AI", difficulty: "고급" },
                { title: "멀티모달 콘텐츠 제작봇", description: "텍스트, 이미지, 영상을 종합해서 콘텐츠를 제작하는 AI", difficulty: "고급" }
            ]
        },
        {
            id: 5,
            icon: <Palette className="w-6 h-6" />,
            name: "AI 도구와 Figma 앱 서비스 기획",
            category: "AI-Powered Design",
            description: "이제 AI의 힘으로 누구나 쉽게 앱을 기획하고 UI를 디자인할 수 있습니다! Claude, ChatGPT 같은 AI 도구가 당신의 아이디어를 현실로 만들어드립니다.",
            keyFeatures: [
                "AI 도구를 활용한 타겟 사용자 분석",
                "Figma 기초부터 고급 활용까지",
                "IA(정보구조) 설계 및 사용자 여정 최적화",
                "개발자 소통을 위한 기능명세서 작성"
            ],
            courses: [
                {
                    title: "AI 도구와 피그마를 활용한 앱 서비스 기획",
                    url: "https://www.inflearn.com/course/ai-도구와-피그마를-활용한-앱-서비",
                    platform: "인프런",
                    price: "₩88,000",
                    students: "65명",
                    rating: "4.3"
                }
            ],
            projects: [
                { title: "AI 기반 모바일 앱 기획", description: "아이디어부터 완성된 앱 기획서까지 AI로 생성", difficulty: "초급" },
                { title: "스타트업 서비스 기획서", description: "투자 유치용 완전한 서비스 기획 및 프로토타입", difficulty: "중급" },
                { title: "AI 기반 디자인 시스템", description: "확장 가능한 디자인 시스템 구축", difficulty: "고급" }
            ]
        },
        {
            id: 6,
            icon: <Globe className="w-6 h-6" />,
            name: "바이브코딩 실전 프로젝트",
            category: "Real-world Application",
            description: "정부 AI 정책 시대에 대응하는 공공데이터 AI 서비스와 Cursor AI를 활용한 재무제표 분석까지! 코딩 경험 없이도 실제 웹 서비스를 만드는 바이브코딩 강의입니다.",
            keyFeatures: [
                "공공데이터 API를 활용한 바이브코딩",
                "PRD 기획부터 배포까지 전체 개발 과정",
                "AI 분석 기능이 포함된 고급 서비스 제작",
                "Cursor AI를 활용한 재무제표 분석"
            ],
            courses: [
                {
                    title: "정부 AI 정책 시대 바이브코딩으로 공공 데이터 AI 서비스 만들기",
                    url: "https://www.inflearn.com/course/정부-ai-정책-시대-바이브코딩으로",
                    platform: "인프런",
                    price: "₩99,000",
                    students: "39명",
                    rating: "4.9"
                },
                {
                    title: "바이브코딩 재미있는 재무제표 (Cursor AI 활용)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "₩77,000",
                    students: "624명",
                    rating: "4.9"
                }
            ],
            projects: [
                { title: "공공 시설 안전 정보 서비스", description: "공공데이터를 활용한 시설 안전 정보 검색 및 분석", difficulty: "초급" },
                { title: "AI 재무제표 분석기", description: "전자공시 데이터를 자동 분석하는 웹 서비스", difficulty: "중급" },
                { title: "정부 정책 대응 플랫폼", description: "AI 정책에 맞춘 종합 공공서비스 플랫폼", difficulty: "고급" }
            ]
        },
        {
            id: 7,
            icon: <Terminal className="w-6 h-6" />,
            name: "Cursor AI 마스터 개발",
            category: "AI-Native IDE",
            description: "Cursor AI를 완전히 마스터하여 개발 생산성을 10배 향상시킵니다. 프롬프트만으로 복잡한 재무제표 분석 서비스를 구축합니다.",
            keyFeatures: [
                "Cursor AI를 활용한 바이브코딩",
                "프롬프트만으로 복잡한 재무 분석 자동화",
                "Open DART에서 데이터 수집",
                "나만의 재무제표 웹 서비스 배포"
            ],
            courses: [
                {
                    title: "바이브코딩 재미있는 재무제표 (Cursor AI 활용)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "₩77,000",
                    students: "624명",
                    rating: "4.9"
                }
            ],
            projects: [
                { title: "AI 재무제표 분석기", description: "Open DART 데이터로 기업 재무 상태를 자동 분석", difficulty: "초급" },
                { title: "투자 의사결정 도구", description: "재무제표 기반 투자 추천 시스템", difficulty: "중급" },
                { title: "종합 재무 분석 플랫폼", description: "실시간 재무 데이터 분석 및 리포팅 서비스", difficulty: "고급" }
            ]
        },
        {
            id: 8,
            icon: <BarChart className="w-6 h-6" />,
            name: "ChatGPT 실전 데이터 분석",
            category: "Data Analysis with AI",
            description: "영국 MBA 출신 전문가가 알려주는 ChatGPT를 활용한 실전 데이터 분석 특강입니다. 복잡한 데이터 분석을 AI로 쉽고 빠르게 처리하는 방법을 배웁니다.",
            keyFeatures: [
                "ChatGPT를 활용한 데이터 분석 기법",
                "영국 MBA 전문가의 실전 노하우",
                "비즈니스 인사이트 도출 방법",
                "데이터 시각화 및 리포팅"
            ],
            courses: [
                {
                    title: "영국MBA ChatGPT활용 실전데이터분석 특강",
                    url: "https://www.inflearn.com/course/영국mba-chatgpt활용-실전데이터분석-특강",
                    platform: "인프런",
                    price: "₩55,000"
                }
            ],
            projects: [
                { title: "매출 데이터 분석 대시보드", description: "ChatGPT로 매출 트렌드를 분석하고 시각화", difficulty: "초급" },
                { title: "고객 행동 분석 시스템", description: "AI로 고객 패턴을 분석하고 인사이트 도출", difficulty: "중급" },
                { title: "비즈니스 인텔리전스 플랫폼", description: "종합적인 비즈니스 데이터 분석 및 예측 시스템", difficulty: "고급" }
            ]
        },
        {
            id: 9,
            icon: <Users className="w-6 h-6" />,
            name: "실전 Multi-Agent 시스템",
            category: "Advanced AI Orchestration",
            description: "여러 AI 에이전트가 협업하는 복잡한 시스템을 구축하고 운영하는 방법을 배웁니다. MCP부터 GraphRAG Agent까지 실전 AI Agent의 모든 것을 학습합니다.",
            keyFeatures: [
                "Multi-Agent 시스템 구축",
                "에이전트 간 협업 및 통신",
                "GraphRAG Agent 구현",
                "엔터프라이즈급 AI 시스템 설계"
            ],
            courses: [
                {
                    title: "실전 AI Agent의 모든 것 - 34개 프로젝트",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "₩990,000"
                }
            ],
            projects: [
                { title: "다중 에이전트 리서치 시스템", description: "여러 AI가 협업하여 종합적인 리서치를 수행", difficulty: "중급" },
                { title: "GraphRAG 기반 지식 관리", description: "그래프 구조의 RAG를 활용한 고급 지식 시스템", difficulty: "고급" },
                { title: "엔터프라이즈 AI 워크플로우", description: "기업 업무를 자동화하는 Multi-Agent 시스템", difficulty: "고급" }
            ]
        },
        {
            id: 10,
            icon: <Server className="w-6 h-6" />,
            name: "LLM 서비스 운영 & MLOps",
            category: "Production AI Systems",
            description: "LLM 애플리케이션 개발부터 운영까지의 전체 로드맵을 학습합니다. 실제 프로덕션 환경에서 안정적으로 AI 서비스를 운영하는 방법을 배웁니다.",
            keyFeatures: [
                "LLM 서비스 개발 및 배포",
                "프롬프트 엔지니어링부터 멀티모달까지",
                "프로덕션 환경 운영 관리",
                "AI 서비스 모니터링 및 최적화"
            ],
            courses: [
                {
                    title: "LLM 모델 개발부터 4개 프로젝트로 완성하는 도메인 특화 파인튜닝",
                    url: "https://fastcampus.co.kr/category_online_datasciencenlp",
                    platform: "패스트캠퍼스",
                    price: "₩770,000"
                },
                {
                    title: "6개 AI 프로덕트로 완성하는 LLM/LMM 서비스 개발의 모든 것",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "₩1,320,000"
                }
            ],
            projects: [
                { title: "AI 챗봇 서비스 플랫폼", description: "확장 가능한 엔터프라이즈 챗봇 서비스", difficulty: "중급" },
                { title: "멀티모달 AI 콘텐츠 생성", description: "텍스트, 이미지, 영상을 생성하는 통합 서비스", difficulty: "고급" },
                { title: "AI 서비스 운영 플랫폼", description: "AI 모델의 배포, 모니터링, 관리를 위한 플랫폼", difficulty: "고급" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white">
                <div className="container max-w-6xl mx-auto px-6 py-16 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-blue-500 rounded-full">
                        <Brain className="w-4 h-4" />
                        <span className="text-sm">AI 바이브 코딩 2025</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        AI 코딩 도구 10가지 마스터
                    </h1>
                    <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                        인프런 + 패스트캠퍼스 실제 강의로 검증된 AI 개발 완전정복 가이드
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full">
                            <BookOpen className="w-4 h-4" />
                            <span>실제 강의 {aiTopics.reduce((sum, topic) => sum + topic.courses.length, 0)}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full">
                            <Code className="w-4 h-4" />
                            <span>실전 프로젝트 {aiTopics.reduce((sum, topic) => sum + topic.projects.length, 0)}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500 rounded-full">
                            <Star className="w-4 h-4" />
                            <span>평균 평점 4.6+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* AI Tools Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aiTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
                                            {topic.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{topic.name}</h3>
                                            <span className="text-sm text-blue-600">{topic.category}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {topic.description}
                                    </p>

                                    {/* Key Features */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-2">핵심 기능</h4>
                                        <div className="space-y-1">
                                            {topic.keyFeatures.slice(0, 2).map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Course Info */}
                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-semibold text-gray-900">강의 {topic.courses.length}개</span>
                                            {topic.courses[0]?.rating && (
                                                <span className="text-xs text-gray-500">⭐ {topic.courses[0].rating}</span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {topic.courses[0]?.platform} • {topic.courses[0]?.price}
                                        </div>
                                    </div>

                                    {/* View Button */}
                                    <div className="mt-4">
                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                            강의 및 프로젝트 보기
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed View */}
                    {selectedTopic && (
                        <div className="mt-12 bg-white rounded-lg border border-gray-200 shadow-lg p-8">
                            {(() => {
                                const topic = aiTopics.find(t => t.id === selectedTopic);
                                if (!topic) return null;

                                return (
                                    <div>
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-600">
                                                    {topic.icon}
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900">{topic.name}</h2>
                                                    <span className="text-blue-600">{topic.category}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTopic(null)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="grid lg:grid-cols-2 gap-8">
                                            {/* Courses */}
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-4">실제 강의 ({topic.courses.length}개)</h3>
                                                <div className="space-y-4">
                                                    {topic.courses.map((course, index) => (
                                                        <a
                                                            key={index}
                                                            href={course.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
                                                        >
                                                            <div className="flex justify-between items-start gap-4">
                                                                <div className="flex-1">
                                                                    <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600">
                                                                        {course.title}
                                                                    </h4>
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${course.platform === '인프런' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                                            }`}>
                                                                            {course.platform}
                                                                        </span>
                                                                        <span className="text-sm font-semibold text-green-600">
                                                                            {course.price}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-gray-500">
                                                                        {course.students && `수강생: ${course.students}`}
                                                                        {course.rating && ` • 평점: ⭐ ${course.rating}`}
                                                                    </div>
                                                                </div>
                                                                <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-500 flex-shrink-0" />
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Projects */}
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-4">실전 프로젝트 ({topic.projects.length}개)</h3>
                                                <div className="space-y-4">
                                                    {topic.projects.map((project, index) => (
                                                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <h4 className="font-semibold text-gray-900">{project.title}</h4>
                                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${project.difficulty === '초급' ? 'bg-green-100 text-green-800' :
                                                                        project.difficulty === '중급' ? 'bg-yellow-100 text-yellow-800' :
                                                                            'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {project.difficulty}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                                {project.description}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-blue-600 text-white py-8">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-xl font-bold mb-2">2025년 AI 시대의 개발자가 되세요</h3>
                    <p className="text-blue-100 mb-4">
                        실제 검증된 강의와 실전 프로젝트로 AI 도구를 마스터하세요
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <span className="flex items-center gap-2">
                            <Brain className="w-4 h-4" />
                            10가지 AI 도구
                        </span>
                        <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            실제 강의 기반
                        </span>
                        <span className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            30개 실전 프로젝트
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIVibeCodingMastery;