"use client";

import React, { useState } from 'react';
import {
    Brain, Bot, Terminal, Code, Sparkles, Zap, Cpu, Database,
    Globe, Palette, MessageSquare, FileText, Video, Layers,
    CheckCircle, Clock, ChevronRight, BookOpen, ExternalLink,
    Target, Star, Play, Award, TrendingUp, ArrowRight, Rocket,
    Settings, Users, Eye, Activity, Server, Shield
} from 'lucide-react';

interface AITopicData {
    id: number;
    icon: React.ReactNode;
    name: string;
    category: string;
    description: string;
    keyFeatures: string[];
    useCases: string[];
    learningPath: {
        beginner: string[];
        intermediate: string[];
        advanced: string[];
    };
    timeframe: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    courses: {
        title: string;
        url: string;
        platform: string;
        price: string;
        instructor?: string;
        students?: string;
        duration?: string;
        rating?: string;
    }[];
    tools: string[];
    projects: { title: string; description: string; difficulty: string; period: string; }[];
}

const AIVibeCodingMastery = () => {
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [activeSection, setActiveSection] = useState<'overview' | 'learning' | 'projects'>('overview');

    const aiTopics: AITopicData[] = [
        {
            id: 1,
            icon: <Brain className="w-6 h-6" />,
            name: "Llama 모델 활용 완전정복",
            category: "Open Source LLM",
            description: "LLM 기초 개념부터 고성능 Llama 2 모델을 Fine-Tuning하는 방법까지 차근차근 학습하는 완전한 로드맵입니다. Meta의 강력한 오픈소스 LLM을 활용하여 나만의 AI 서비스를 구축해보세요.",
            keyFeatures: [
                "Llama 2 Fine-Tuning 실습",
                "LangChain으로 나만의 ChatGPT 구현",
                "Google Gemini API 활용",
                "RAG 시스템 구축",
                "LangGraph AI 에이전트 개발"
            ],
            useCases: [
                "도메인 특화 챗봇 개발",
                "맞춤형 AI 어시스턴트 구축",
                "기업용 지식 검색 시스템",
                "AI 고객센터 서비스",
                "자동화된 콘텐츠 생성"
            ],
            learningPath: {
                beginner: [
                    "LLM 기본 개념과 Llama 2 모델 이해",
                    "Fine-Tuning 환경 설정 및 기초 실습",
                    "간단한 텍스트 생성 모델 구현",
                    "기본적인 프롬프트 엔지니어링 기법"
                ],
                intermediate: [
                    "LangChain 라이브러리 활용한 ChatGPT 구현",
                    "Google Gemini API와 OpenAI API 통합",
                    "Streamlit으로 AI 애플리케이션 개발",
                    "다양한 데이터셋으로 모델 커스터마이징"
                ],
                advanced: [
                    "AI 고객센터 챗봇(AICC) RAG 시스템 구축",
                    "LangGraph를 활용한 복합 AI 에이전트",
                    "프로덕션 환경 배포 및 최적화",
                    "멀티모달 AI 서비스 개발"
                ]
            },
            timeframe: "12-16주",
            difficulty: "Medium",
            courses: [
                {
                    title: "LLM 기초부터 Llama AI 에이전트까지 완전정복 로드맵",
                    url: "https://www.inflearn.com/roadmaps/6886",
                    platform: "인프런",
                    price: "총 6개 강의 ₩88,000 (25% 할인)",
                    instructor: "aischool",
                    students: "269명",
                    duration: "총 약 35시간",
                    rating: "4.6"
                },
                {
                    title: "Llama 2 Fine-Tuning 해보기 (Part 1)",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part1",
                    platform: "인프런",
                    price: "₩88,000",
                    instructor: "aischool",
                    duration: "약 6시간"
                },
                {
                    title: "랭체인(LangChain)으로 나만의 ChatGPT 만들기 (Part 2)",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part2",
                    platform: "인프런",
                    price: "₩66,000",
                    instructor: "aischool",
                    duration: "약 5시간"
                },
                {
                    title: "Google Gemini API로 AI 어플리케이션 만들기 (Part 3)",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part3",
                    platform: "인프런",
                    price: "₩55,000",
                    instructor: "aischool",
                    duration: "약 4시간"
                }
            ],
            tools: ["Python", "Hugging Face", "Transformers", "LangChain", "Streamlit"],
            projects: [
                { title: "Llama 2 한국어 Fine-Tuning", description: "한국어 데이터셋으로 Llama 2 모델을 파인튜닝", difficulty: "초급", period: "3주" },
                { title: "나만의 ChatGPT 구현", description: "LangChain으로 맞춤형 대화형 AI 서비스 개발", difficulty: "중급", period: "4주" },
                { title: "멀티모달 AI 어시스턴트", description: "텍스트와 이미지를 함께 처리하는 AI 서비스", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 2,
            icon: <Database className="w-6 h-6" />,
            name: "RAG 시스템 & AI 고객센터 구축",
            category: "Retrieval-Augmented Generation",
            description: "AI 고객센터 챗봇(AICC)을 만들며 실용적인 RAG 구현 방법을 학습합니다. LangChain 라이브러리를 활용하여 고성능 RAG 시스템을 구축하는 다양한 기법을 배웁니다.",
            keyFeatures: [
                "LangChain 라이브러리 활용한 AICC 구현",
                "고급 RAG 기법 학습",
                "Retrieval-Augmented Generation 다양한 활용법",
                "AI 고객센터 구축 시 고려사항",
                "실무 적용 가능한 RAG 시스템"
            ],
            useCases: [
                "AI 고객센터 챗봇(AICC)",
                "기업 내부 지식 검색 시스템",
                "법률/의료 상담 AI",
                "교육용 Q&A 플랫폼",
                "기술 문서 자동 분석"
            ],
            learningPath: {
                beginner: [
                    "RAG 기본 개념과 아키텍처 이해",
                    "벡터 데이터베이스 기초 활용",
                    "간단한 문서 검색 시스템 구현",
                    "LangChain 기본 사용법"
                ],
                intermediate: [
                    "AI 고객센터 챗봇 핵심 로직 구현",
                    "고급 RAG 기법 적용",
                    "다양한 문서 형식 처리",
                    "검색 성능 최적화"
                ],
                advanced: [
                    "엔터프라이즈급 RAG 시스템 설계",
                    "실시간 지식 업데이트 처리",
                    "멀티턴 대화 컨텍스트 관리",
                    "프로덕션 환경 배포 및 운영"
                ]
            },
            timeframe: "8-10주",
            difficulty: "Medium",
            courses: [
                {
                    title: "모두를 위한 대규모 언어 모델 LLM Part 4 - AI 고객센터 챗봇(AICC)을 만들며 배우는 RAG 구현",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part4",
                    platform: "인프런",
                    price: "₩77,000",
                    instructor: "aischool",
                    students: "269명",
                    duration: "28강 (6시간 45분)",
                    rating: "4.6"
                },
                {
                    title: "테디노트의 RAG 비법노트 - 랭체인을 활용한 GPT부터 로컬 모델까지",
                    url: "https://fastcampus.co.kr/data_online_tedynote_rag",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩990,000",
                    instructor: "테디노트",
                    duration: "약 66시간",
                    rating: "FC AWARD"
                },
                {
                    title: "고성능 RAG를 위한 66가지 최신 RAG 테크닉",
                    url: "https://fastcampus.co.kr/data_online_advanced_rag",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩880,000",
                    duration: "약 23시간"
                }
            ],
            tools: ["LangChain", "OpenAI API", "Pinecone", "Chroma", "FAISS"],
            projects: [
                { title: "AI 고객센터 챗봇", description: "실제 고객 문의를 처리하는 RAG 기반 챗봇 구현", difficulty: "중급", period: "6주" },
                { title: "기업 지식 검색 엔진", description: "사내 문서를 검색하는 지능형 시스템 개발", difficulty: "중급", period: "4주" },
                { title: "멀티모달 RAG 시스템", description: "텍스트, 이미지, 표를 통합 검색하는 고급 시스템", difficulty: "고급", period: "10주" }
            ]
        },
        {
            id: 3,
            icon: <Settings className="w-6 h-6" />,
            name: "MCP 업무 자동화 마스터",
            category: "Model Context Protocol",
            description: "MCP(Model Context Protocol)를 활용한 업무 자동화를 다양한 사례를 통해 학습합니다. Playwright 크롤링, Figma 디자인, Notion 데이터 정리, Excel 데이터 분석 등 실무에 바로 적용 가능한 자동화 기법을 배웁니다.",
            keyFeatures: [
                "LLM-MCP 통합을 통한 업무 자동화",
                "다양한 MCP 서버를 Cursor에 연결하는 방법",
                "MCP(Model Context Protocol) 개념 이해",
                "다양한 워크플로우 자동화 방법",
                "Cursor AI와의 완벽한 통합"
            ],
            useCases: [
                "반복적 업무 자동화",
                "Playwright를 통한 웹 크롤링",
                "Figma 디자인 작업 자동화",
                "Notion 데이터 정리 및 관리",
                "Excel 데이터 분석 자동화"
            ],
            learningPath: {
                beginner: [
                    "MCP 기본 개념과 설치 방법",
                    "Cursor AI와 MCP 연동 설정",
                    "간단한 업무 자동화 스크립트 작성",
                    "기본적인 워크플로우 구성"
                ],
                intermediate: [
                    "다양한 MCP 서버 활용법",
                    "Playwright를 통한 웹 자동화",
                    "Figma API를 활용한 디자인 자동화",
                    "Notion과 Excel 데이터 처리"
                ],
                advanced: [
                    "복합적인 업무 프로세스 자동화",
                    "커스텀 MCP 서버 개발",
                    "엔터프라이즈 환경에서의 MCP 활용",
                    "보안과 권한 관리 체계"
                ]
            },
            timeframe: "6-8주",
            difficulty: "Medium",
            courses: [
                {
                    title: "모두를 위한 MCP를 이용한 업무자동화 - 다양한 사례로 배우는 MCP 활용법",
                    url: "https://www.inflearn.com/course/모두를-위한-mcp를-이용한-업무자동",
                    platform: "인프런",
                    price: "₩66,000",
                    instructor: "aischool",
                    students: "27명",
                    duration: "18강 (4시간 38분)",
                    rating: "4.6"
                },
                {
                    title: "MCP와 A2A로 끝내는 상상도 못할 Multi-Agent 구축",
                    url: "https://fastcampus.co.kr/data_online_mcp_multiagent",
                    platform: "패스트캠퍼스",
                    price: "정가 ₯770,000",
                    duration: "약 25시간"
                },
                {
                    title: "MCP로 엔터프라이즈 환경에서 AI Agent 활용 및 제어",
                    url: "https://fastcampus.co.kr/data_online_mcp_enterprise",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩550,000",
                    duration: "약 8시간"
                }
            ],
            tools: ["MCP", "Cursor AI", "Playwright", "Figma API", "Notion API"],
            projects: [
                { title: "스마트 데이터 수집기", description: "웹사이트에서 자동으로 데이터를 수집하고 정리하는 시스템", difficulty: "초급", period: "3주" },
                { title: "디자인 자동화 봇", description: "Figma에서 반복적인 디자인 작업을 자동화하는 도구", difficulty: "중급", period: "5주" },
                { title: "통합 업무 자동화 플랫폼", description: "여러 도구를 연결한 종합적인 업무 자동화 시스템", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 4,
            icon: <Bot className="w-6 h-6" />,
            name: "LangGraph AI 에이전트 개발",
            category: "Multi-Agent System",
            description: "최신 AI 기술의 총집합체인 AI 에이전트! LangGraph를 이용해 다양한 AI 에이전트들을 구현하면서 나만의 AI 에이전트 구현법을 학습합니다. 복잡한 작업을 자율적으로 수행하는 지능형 시스템을 구축해보세요.",
            keyFeatures: [
                "LangGraph를 이용한 AI 에이전트 구현",
                "AI 에이전트의 개념과 활용 사례",
                "다양한 AI 에이전트 아키텍처",
                "LangGraph로 나만의 AI 에이전트 구축",
                "LangGraph를 통한 고급 RAG 시스템"
            ],
            useCases: [
                "복잡한 문제 해결 에이전트",
                "자동화된 리서치 봇",
                "코드 리뷰 및 분석 시스템",
                "콘텐츠 제작 워크플로우",
                "데이터 분석 자동화"
            ],
            learningPath: {
                beginner: [
                    "AI 에이전트 기본 개념 이해",
                    "LangGraph 기초 사용법",
                    "간단한 에이전트 구현",
                    "기본적인 워크플로우 설계"
                ],
                intermediate: [
                    "복잡한 AI 에이전트 아키텍처 설계",
                    "다중 에이전트 시스템 구축",
                    "외부 도구 및 API 통합",
                    "상태 관리 및 메모리 시스템"
                ],
                advanced: [
                    "프로덕션 레벨 AI 에이전트 개발",
                    "엔터프라이즈 환경 배포",
                    "성능 최적화 및 모니터링",
                    "커스텀 에이전트 프레임워크 개발"
                ]
            },
            timeframe: "10-12주",
            difficulty: "Hard",
            courses: [
                {
                    title: "모두를 위한 대규모 언어 모델 LLM Part 5 - LangGraph로 나만의 AI 에이전트 만들기",
                    url: "https://www.inflearn.com/course/랭그래프-에이전트-part5",
                    platform: "인프런",
                    price: "₩77,000",
                    instructor: "aischool",
                    students: "223명",
                    duration: "65강 (17시간 32분)",
                    rating: "4.6"
                },
                {
                    title: "모두를 위한 대규모 언어 모델 LLM Part 6 - 프로젝트로 배우는 LangGraph AI 에이전트",
                    url: "https://www.inflearn.com/course/랭그래프-활용한-llm에이전트-개발",
                    platform: "인프런",
                    price: "₩77,000",
                    instructor: "aischool",
                    duration: "약 15시간"
                },
                {
                    title: "실전 AI Agent의 모든 것 - 34개 프로젝트로 MCP부터 GraphRAG Agent까지",
                    url: "https://fastcampus.co.kr/data_online_ai_agent_34",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩990,000",
                    instructor: "공원나연",
                    duration: "약 25시간"
                }
            ],
            tools: ["LangGraph", "LangChain", "Python", "OpenAI API", "Anthropic Claude"],
            projects: [
                { title: "자동 리서치 에이전트", description: "주제를 주면 자동으로 조사해서 보고서를 작성하는 AI", difficulty: "중급", period: "4주" },
                { title: "코드 분석 에이전트", description: "GitHub 코드를 분석하고 개선사항을 제안하는 AI", difficulty: "고급", period: "6주" },
                { title: "멀티모달 콘텐츠 제작봇", description: "텍스트, 이미지, 영상을 종합해서 콘텐츠를 제작하는 AI", difficulty: "고급", period: "10주" }
            ]
        },
        {
            id: 5,
            icon: <Palette className="w-6 h-6" />,
            name: "AI 도구와 Figma 앱 서비스 기획",
            category: "AI-Powered Design",
            description: "이제 AI의 힘으로 누구나 쉽게 앱을 기획하고 UI를 디자인할 수 있습니다! 코딩을 몰라도, UI 경험이 없어도 괜찮습니다. Claude, ChatGPT 같은 AI 도구가 당신의 아이디어를 현실로 만들어드릴 테니까요.",
            keyFeatures: [
                "AI 도구를 활용한 타겟 사용자 분석 및 페르소나 설정",
                "Figma 기초부터 고급 활용까지",
                "IA(정보구조) 설계 및 사용자 여정 최적화",
                "프로토타이핑을 통한 인터랙션 구현 및 테스트",
                "개발자 소통을 위한 기능명세서 작성"
            ],
            useCases: [
                "창업 아이디어를 구체적인 서비스로 기획",
                "기획자로의 커리어 전환",
                "개발자와의 원활한 소통",
                "체계적인 앱 서비스 기획 프로세스",
                "AI 기반 UI 생성 도구 활용"
            ],
            learningPath: {
                beginner: [
                    "AI 도구(Claude, ChatGPT) 기본 활용법",
                    "Figma 인터페이스 및 기본 기능",
                    "타겟 사용자 분석 및 페르소나 작성",
                    "간단한 와이어프레임 설계"
                ],
                intermediate: [
                    "정보구조(IA) 설계 및 사용자 여정 맵핑",
                    "고급 Figma 기능 및 컴포넌트 시스템",
                    "프로토타이핑 및 인터랙션 디자인",
                    "사용자 테스트 및 피드백 반영"
                ],
                advanced: [
                    "AI 기반 UI 자동 생성 도구 마스터",
                    "개발자와의 협업을 위한 기능명세서",
                    "디자인 시스템 구축 및 관리",
                    "서비스 런칭 및 개선 프로세스"
                ]
            },
            timeframe: "6-8주",
            difficulty: "Easy",
            courses: [
                {
                    title: "AI 도구와 피그마를 활용한 앱 서비스 기획",
                    url: "https://www.inflearn.com/course/ai-도구와-피그마를-활용한-앱-서비",
                    platform: "인프런",
                    price: "₩88,000",
                    instructor: "codingai (에이크)",
                    students: "65명",
                    duration: "27강 (4시간 54분)",
                    rating: "4.3"
                },
                {
                    title: "n8n으로 시작하는 RAG/AI Agent 아카데미",
                    url: "https://fastcampus.co.kr/data_online_n8n_rag",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩660,000",
                    duration: "약 19시간"
                },
                {
                    title: "박준의 나만을 위한 AI 서비스 만들기",
                    url: "https://fastcampus.co.kr/data_online_parkjoon_ai",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩440,000",
                    duration: "약 5시간"
                }
            ],
            tools: ["Figma", "Claude", "ChatGPT", "Notion", "Miro"],
            projects: [
                { title: "AI 기반 모바일 앱 기획", description: "아이디어부터 완성된 앱 기획서까지 AI로 생성", difficulty: "초급", period: "3주" },
                { title: "스타트업 서비스 기획서", description: "투자 유치용 완전한 서비스 기획 및 프로토타입", difficulty: "중급", period: "5주" },
                { title: "AI 기반 디자인 시스템", description: "확장 가능한 디자인 시스템 구축", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 6,
            icon: <Globe className="w-6 h-6" />,
            name: "바이브코딩 실전 프로젝트",
            category: "Real-world Application",
            description: "정부 AI 정책 시대에 대응하는 공공데이터 AI 서비스와 Cursor AI를 활용한 재무제표 분석까지! 코딩 경험 없이도 Google AI Studio로 실제 웹 서비스를 만드는 바이브코딩 강의입니다.",
            keyFeatures: [
                "공공데이터 API를 활용한 바이브코딩",
                "PRD 기획부터 배포까지 전체 개발 과정",
                "AI 분석 기능이 포함된 고급 서비스 제작",
                "Cursor AI를 활용한 재무제표 분석 및 시각화",
                "전자공시 사이트(Open DART) 데이터 활용"
            ],
            useCases: [
                "공공 시설 안전 정보 검색 서비스",
                "지도 연동 및 AI 분석 리포트",
                "실시간 전자공시 데이터 분석",
                "재무제표 자동 시각화",
                "정부 정책 대응 AI 서비스"
            ],
            learningPath: {
                beginner: [
                    "Google AI Studio 기본 사용법",
                    "공공데이터 포털 활용 방법",
                    "간단한 API 연동 실습",
                    "기본적인 웹 서비스 구조"
                ],
                intermediate: [
                    "공공 시설 안전 정보 서비스 구축",
                    "Cursor AI와 프롬프트 엔지니어링",
                    "전자공시 데이터 수집 및 처리",
                    "재무제표 분석 로직 구현"
                ],
                advanced: [
                    "AI 분석 기능 통합",
                    "실시간 데이터 업데이트 시스템",
                    "웹 서비스 배포 및 운영",
                    "사용자 맞춤형 대시보드 개발"
                ]
            },
            timeframe: "8-10주",
            difficulty: "Easy",
            courses: [
                {
                    title: "정부 AI 정책 시대 바이브코딩으로 공공 데이터 AI 서비스 만들기",
                    url: "https://www.inflearn.com/course/정부-ai-정책-시대-바이브코딩으로",
                    platform: "인프런",
                    price: "₩99,000",
                    instructor: "roadmap",
                    students: "39명",
                    duration: "10강 (1시간 1분)",
                    rating: "4.9"
                },
                {
                    title: "바이브코딩 재미있는 재무제표 (Cursor AI 활용)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "₩77,000",
                    instructor: "roadmap",
                    students: "624명",
                    duration: "16강 (2시간 7분)",
                    rating: "4.9"
                },
                {
                    title: "코드 한 줄 없이 실전 RAG 구축 가이드",
                    url: "https://fastcampus.co.kr/data_online_nocode_rag",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩550,000",
                    duration: "약 13시간"
                }
            ],
            tools: ["Google AI Studio", "Cursor AI", "Open DART API", "공공데이터 포털", "Python"],
            projects: [
                { title: "공공 시설 안전 정보 서비스", description: "공공데이터를 활용한 시설 안전 정보 검색 및 분석", difficulty: "초급", period: "4주" },
                { title: "AI 재무제표 분석기", description: "전자공시 데이터를 자동 분석하는 웹 서비스", difficulty: "중급", period: "6주" },
                { title: "정부 정책 대응 플랫폼", description: "AI 정책에 맞춘 종합 공공서비스 플랫폼", difficulty: "고급", period: "12주" }
            ]
        },
        {
            id: 7,
            icon: <Terminal className="w-6 h-6" />,
            name: "Cursor AI 마스터 개발",
            category: "AI-Native IDE",
            description: "Cursor AI를 완전히 마스터하여 개발 생산성을 10배 향상시킵니다. 프롬프트만으로 복잡한 재무제표 분석 서비스를 구축하며, AI와 함께하는 페어 프로그래밍의 새로운 패러다임을 경험해보세요.",
            keyFeatures: [
                "Cursor AI를 활용한 바이브코딩",
                "프롬프트만으로 복잡한 재무 분석 자동화",
                "Open DART에서 데이터 수집",
                "재무제표 데이터 분석 및 시각화",
                "나만의 재무제표 웹 서비스 배포"
            ],
            useCases: [
                "코딩 없이 웹 서비스 개발",
                "재무 데이터 자동 수집 및 분석",
                "AI 기반 코드 생성 및 수정",
                "복잡한 데이터 시각화",
                "프로덕션 레벨 서비스 배포"
            ],
            learningPath: {
                beginner: [
                    "Cursor AI 설치 및 기본 설정",
                    "AI 프롬프트 작성 기법",
                    "간단한 웹페이지 생성 실습",
                    "기본적인 데이터 처리"
                ],
                intermediate: [
                    "Open DART API 연동 및 데이터 수집",
                    "재무제표 분석 로직 구현",
                    "데이터 시각화 및 차트 생성",
                    "사용자 인터페이스 개선"
                ],
                advanced: [
                    "복잡한 재무 분석 알고리즘",
                    "실시간 데이터 업데이트",
                    "웹 서비스 배포 및 최적화",
                    "사용자 맞춤형 분석 기능"
                ]
            },
            timeframe: "4-6주",
            difficulty: "Easy",
            courses: [
                {
                    title: "바이브코딩 재미있는 재무제표 (Cursor AI 활용)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "₩77,000",
                    instructor: "roadmap",
                    students: "624명",
                    duration: "16강 (2시간 7분)",
                    rating: "4.9"
                },
                {
                    title: "LLM 모델 개발부터 4개 프로젝트로 완성하는 도메인 특화 파인튜닝",
                    url: "https://fastcampus.co.kr/data_online_llm_finetuning",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩770,000",
                    duration: "약 21시간"
                },
                {
                    title: "노베이스도 일단! 만들면서 시작하는 나만의 AI 서비스 개발",
                    url: "https://fastcampus.co.kr/data_online_nobase_ai",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩660,000",
                    duration: "약 17시간"
                }
            ],
            tools: ["Cursor AI", "Python", "Open DART API", "Chart.js", "HTML/CSS"],
            projects: [
                { title: "AI 재무제표 분석기", description: "Open DART 데이터로 기업 재무 상태를 자동 분석", difficulty: "초급", period: "2주" },
                { title: "투자 의사결정 도구", description: "재무제표 기반 투자 추천 시스템", difficulty: "중급", period: "4주" },
                { title: "종합 재무 분석 플랫폼", description: "실시간 재무 데이터 분석 및 리포팅 서비스", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 8,
            icon: <Database className="w-6 h-6" />,
            name: "고성능 RAG & 벡터 검색 시스템",
            category: "Advanced Vector Search",
            description: "66가지 최신 RAG 테크닉을 활용하여 고성능 검색 및 추천 시스템을 구축합니다. Advanced RAG, Modular RAG부터 벡터 데이터베이스 최적화까지 실무에서 바로 사용할 수 있는 고급 기법들을 학습합니다.",
            keyFeatures: [
                "66가지 최신 RAG 테크닉",
                "Advanced RAG & Modular RAG",
                "벡터 데이터베이스 최적화",
                "LangChain & LlamaIndex 활용",
                "Pinecone을 활용한 유사 상품 추천"
            ],
            useCases: [
                "고성능 검색 엔진 구축",
                "개인화 추천 시스템",
                "기업 지식 관리 시스템",
                "시맨틱 검색 플랫폼",
                "AI 기반 상품 추천"
            ],
            learningPath: {
                beginner: [
                    "RAG 기본 개념과 벡터 검색 이해",
                    "벡터 데이터베이스 기초 (Pinecone, Chroma)",
                    "간단한 문서 검색 시스템 구현",
                    "임베딩과 유사도 계산"
                ],
                intermediate: [
                    "Advanced RAG 패턴 적용",
                    "하이브리드 검색 시스템 구축",
                    "검색 성능 최적화 기법",
                    "실시간 벡터 업데이트 처리"
                ],
                advanced: [
                    "Modular RAG 아키텍처 설계",
                    "대규모 벡터 데이터베이스 운영",
                    "멀티모달 벡터 검색",
                    "엔터프라이즈급 RAG 시스템"
                ]
            },
            timeframe: "10-14주",
            difficulty: "Hard",
            courses: [
                {
                    title: "고성능 RAG를 위한 66가지 최신 RAG 테크닉 (ft. Advanced RAG, Modular RAG)",
                    url: "https://fastcampus.co.kr/data_online_advanced_rag_66",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩880,000",
                    duration: "약 23시간",
                    rating: "FC AWARD"
                },
                {
                    title: "벡터DB로 구현하는 LLM 기반 검색 엔진 & 유사 상품 추천 시스템",
                    url: "https://fastcampus.co.kr/data_online_vector_search",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩990,000",
                    duration: "약 33시간"
                },
                {
                    title: "LlamaIndex로 배우는 실무에 가장 가까운 고성능 RAG 설계",
                    url: "https://fastcampus.co.kr/data_online_llamaindex_rag",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩770,000",
                    duration: "약 18시간"
                }
            ],
            tools: ["Pinecone", "Chroma", "LangChain", "LlamaIndex", "OpenAI Embeddings"],
            projects: [
                { title: "시맨틱 문서 검색 엔진", description: "자연어로 문서를 검색하는 고성능 시스템", difficulty: "중급", period: "5주" },
                { title: "AI 기반 상품 추천 시스템", description: "벡터 검색을 활용한 개인화 추천 엔진", difficulty: "고급", period: "8주" },
                { title: "엔터프라이즈 지식 검색 플랫폼", description: "대기업용 통합 지식 관리 및 검색 시스템", difficulty: "고급", period: "12주" }
            ]
        },
        {
            id: 9,
            icon: <Users className="w-6 h-6" />,
            name: "실전 Multi-Agent 시스템",
            category: "Advanced AI Orchestration",
            description: "34개 프로젝트로 MCP부터 GraphRAG Agent까지 실전 AI Agent의 모든 것을 학습합니다. 단일 에이전트를 넘어 여러 AI 에이전트가 협업하는 복잡한 시스템을 구축하고 운영하는 방법을 배웁니다.",
            keyFeatures: [
                "34개 실전 AI 에이전트 프로젝트",
                "MCP 기반 Multi-Agent 시스템",
                "GraphRAG Agent 구현",
                "에이전트 간 협업 및 통신",
                "엔터프라이즈급 AI 시스템 설계"
            ],
            useCases: [
                "복잡한 업무 자동화 시스템",
                "다중 AI 에이전트 협업",
                "지능형 워크플로우 관리",
                "자율적 문제 해결 시스템",
                "대규모 AI 서비스 운영"
            ],
            learningPath: {
                beginner: [
                    "AI 에이전트 기본 개념과 아키텍처",
                    "단일 에이전트 구현 및 테스트",
                    "간단한 작업 자동화",
                    "에이전트 간 기본 통신"
                ],
                intermediate: [
                    "다중 에이전트 시스템 설계",
                    "에이전트 협업 프로토콜",
                    "복잡한 워크플로우 관리",
                    "상태 공유 및 동기화"
                ],
                advanced: [
                    "GraphRAG 기반 고급 에이전트",
                    "엔터프라이즈 AI 시스템 아키텍처",
                    "대용량 처리 및 확장성",
                    "AI 에이전트 모니터링 및 관리"
                ]
            },
            timeframe: "12-16주",
            difficulty: "Hard",
            courses: [
                {
                    title: "실전 AI Agent의 모든 것 : 34개 프로젝트로 MCP부터 GraphRAG Agent까지",
                    url: "https://fastcampus.co.kr/data_online_ai_agent_34",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩990,000",
                    instructor: "공원나연",
                    duration: "약 25시간"
                },
                {
                    title: "모두의 AI 케인의 LangGraph로 끝내는 멀티 AI Agent",
                    url: "https://fastcampus.co.kr/data_online_multigraph_agent",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩880,000",
                    duration: "약 16시간",
                    rating: "FC AWARD"
                },
                {
                    title: "랭그래프로 한번에 완성하는 복잡한 RAG와 Agent",
                    url: "https://fastcampus.co.kr/data_online_langgraph_complex",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩770,000",
                    duration: "약 17시간"
                }
            ],
            tools: ["LangGraph", "MCP", "GraphRAG", "Python", "OpenAI API"],
            projects: [
                { title: "다중 에이전트 리서치 시스템", description: "여러 AI가 협업하여 종합적인 리서치를 수행", difficulty: "중급", period: "6주" },
                { title: "GraphRAG 기반 지식 관리", description: "그래프 구조의 RAG를 활용한 고급 지식 시스템", difficulty: "고급", period: "8주" },
                { title: "엔터프라이즈 AI 워크플로우", description: "기업 업무를 자동화하는 Multi-Agent 시스템", difficulty: "고급", period: "14주" }
            ]
        },
        {
            id: 10,
            icon: <Server className="w-6 h-6" />,
            name: "LLM 서비스 운영 & MLOps",
            category: "Production AI Systems",
            description: "LLM 애플리케이션 개발부터 운영까지의 전체 로드맵을 학습합니다. 프롬프트 엔지니어링부터 멀티모달 서비스까지, 실제 프로덕션 환경에서 안정적으로 AI 서비스를 운영하는 방법을 배웁니다.",
            keyFeatures: [
                "6개 AI 프로덕트 개발 경험",
                "프롬프트 엔지니어링부터 멀티모달까지",
                "LLM/LMM 서비스 개발의 모든 것",
                "실무 중심의 AI 서비스 구축",
                "프로덕션 환경 배포 및 운영"
            ],
            useCases: [
                "대규모 LLM 서비스 운영",
                "AI 프로덕트 개발 및 런칭",
                "멀티모달 AI 서비스",
                "엔터프라이즈 AI 플랫폼",
                "AI 서비스 모니터링 및 최적화"
            ],
            learningPath: {
                beginner: [
                    "LLM 서비스 기본 아키텍처",
                    "프롬프트 엔지니어링 기초",
                    "간단한 AI 서비스 구축",
                    "기본적인 배포 및 모니터링"
                ],
                intermediate: [
                    "복잡한 AI 프로덕트 개발",
                    "멀티모달 서비스 구현",
                    "성능 최적화 및 스케일링",
                    "사용자 피드백 반영 시스템"
                ],
                advanced: [
                    "엔터프라이즈급 AI 플랫폼",
                    "대용량 트래픽 처리",
                    "AI 서비스 보안 및 거버넌스",
                    "비즈니스 모델 및 수익화"
                ]
            },
            timeframe: "14-18주",
            difficulty: "Hard",
            courses: [
                {
                    title: "6개 AI 프로덕트로 완성하는 LLM/LMM 서비스 개발의 모든 것",
                    url: "https://fastcampus.co.kr/data_online_llm_products_6",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩1,320,000",
                    duration: "약 77시간"
                },
                {
                    title: "프롬프트 엔지니어링으로 시작하는 AI/LLM 서비스 개발: 9개 프로젝트",
                    url: "https://fastcampus.co.kr/data_online_prompt_engineering_9",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩1,100,000",
                    duration: "약 56시간"
                },
                {
                    title: "The RED : Microsoft AI 개발자의 LLM 마스터 클래스",
                    url: "https://fastcampus.co.kr/data_online_microsoft_llm",
                    platform: "패스트캠퍼스",
                    price: "정가 ₩990,000",
                    instructor: "Microsoft AI 개발자 양파",
                    duration: "약 25시간"
                }
            ],
            tools: ["Docker", "Kubernetes", "FastAPI", "PostgreSQL", "Redis"],
            projects: [
                { title: "AI 챗봇 서비스 플랫폼", description: "확장 가능한 엔터프라이즈 챗봇 서비스", difficulty: "중급", period: "8주" },
                { title: "멀티모달 AI 콘텐츠 생성", description: "텍스트, 이미지, 영상을 생성하는 통합 서비스", difficulty: "고급", period: "12주" },
                { title: "AI 서비스 운영 플랫폼", description: "AI 모델의 배포, 모니터링, 관리를 위한 플랫폼", difficulty: "고급", period: "16주" }
            ]
        }
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case '패스트캠퍼스': return 'bg-blue-100 text-blue-800';
            case '인프런': return 'bg-green-100 text-green-800';
            case 'Official': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTotalLearningTime = () => {
        return aiTopics.reduce((total, topic) => {
            const weeks = parseInt(topic.timeframe.split('-')[1] || topic.timeframe.split('주')[0]);
            return total + weeks;
        }, 0);
    };

    const getTotalProjects = () => {
        return aiTopics.reduce((total, topic) => total + topic.projects.length, 0);
    };

    const getTotalCourses = () => {
        return aiTopics.reduce((total, topic) => total + topic.courses.length, 0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
                <div className="relative container max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <Brain className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-medium">실제 강의 기반 AI 바이브 코딩 2025</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                        AI 코딩 도구 10가지 마스터
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                        인프런 + 패스트캠퍼스 실제 강의로 검증된 AI 개발 도구 완전정복 가이드
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Sparkles className="w-4 h-4" />
                            <span>실제 검증된 강의 {getTotalCourses()}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Code className="w-4 h-4" />
                            <span>실전 프로젝트 {getTotalProjects()}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span>총 {getTotalLearningTime()}주 완성 과정</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Award className="w-4 h-4" />
                            <span>평균 평점 4.6+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-white/50">
                <div className="container max-w-6xl mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-indigo-600 mb-2">{getTotalCourses()}</div>
                            <div className="text-sm text-gray-600">실제 검증된 강의</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-2">{getTotalProjects()}</div>
                            <div className="text-sm text-gray-600">실전 프로젝트</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-600 mb-2">{getTotalLearningTime()}</div>
                            <div className="text-sm text-gray-600">총 학습 주수</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">4.6+</div>
                            <div className="text-sm text-gray-600">평균 강의 평점</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-8xl mx-auto">
                    {/* AI Tools Grid */}
                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {aiTopics.map((topic) => (
                            <div
                                key={topic.id}
                                className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${hoveredCard === topic.id ? 'transform translate-y-[-8px] ring-2 ring-indigo-500 ring-offset-2' : ''
                                    }`}
                                onMouseEnter={() => setHoveredCard(topic.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => setSelectedTopic(selectedTopic === topic.id ? null : topic.id)}
                            >
                                {/* 상단 그라데이션 바 */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>

                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                                                {topic.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{topic.name}</h3>
                                                <span className="text-sm font-medium text-indigo-600">{topic.category}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(topic.difficulty)}`}>
                                                {topic.difficulty}
                                            </span>
                                            <span className="text-xs text-gray-500">{topic.timeframe}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                                        {topic.description}
                                    </p>

                                    {/* Key Features */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <Sparkles className="w-4 h-4 text-indigo-500" />
                                            핵심 기능
                                        </h4>
                                        <div className="space-y-2">
                                            {topic.keyFeatures.slice(0, 3).map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                                                    <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Course Preview */}
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-gray-900">실제 강의</h4>
                                            <span className="text-xs text-gray-500">{topic.courses.length}개</span>
                                        </div>
                                        <div className="space-y-2">
                                            {topic.courses.slice(0, 1).map((course, index) => (
                                                <div key={index} className="space-y-1">
                                                    <div className="text-xs text-gray-600 truncate">{course.title}</div>
                                                    <div className="flex items-center justify-between">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(course.platform)}`}>
                                                            {course.platform}
                                                        </span>
                                                        <div className="text-xs text-gray-500">
                                                            {course.students && `${course.students} | `}
                                                            {course.rating && `⭐ ${course.rating}`}
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-semibold text-green-600">
                                                        {course.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Expand Button */}
                                    <div className="mt-6 text-center">
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
                                            실제 강의 + 프로젝트 보기
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed View */}
                    {selectedTopic && (
                        <div className="mt-16 bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 shadow-2xl p-8">
                            {(() => {
                                const topic = aiTopics.find(t => t.id === selectedTopic);
                                if (!topic) return null;

                                return (
                                    <div>
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                                                    {topic.icon}
                                                </div>
                                                <div>
                                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{topic.name}</h2>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-lg font-medium text-indigo-600">{topic.category}</span>
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(topic.difficulty)}`}>
                                                            {topic.difficulty}
                                                        </span>
                                                        <span className="text-sm text-gray-500">{topic.timeframe}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTopic(null)}
                                                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* Tabs */}
                                        <div className="border-b border-gray-200 mb-8">
                                            <nav className="flex space-x-8">
                                                {['overview', 'learning', 'projects'].map((section) => (
                                                    <button
                                                        key={section}
                                                        onClick={() => setActiveSection(section as any)}
                                                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeSection === section
                                                            ? 'border-indigo-500 text-indigo-600'
                                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        {section === 'overview' && '실제 강의 & 개요'}
                                                        {section === 'learning' && '학습 로드맵'}
                                                        {section === 'projects' && '실전 프로젝트'}
                                                    </button>
                                                ))}
                                            </nav>
                                        </div>

                                        {/* Content */}
                                        {activeSection === 'overview' && (
                                            <div className="grid lg:grid-cols-2 gap-8">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-4">실제 강의 ({topic.courses.length}개)</h3>
                                                    <div className="space-y-4">
                                                        {topic.courses.map((course, index) => (
                                                            <a
                                                                key={index}
                                                                href={course.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="block p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all group"
                                                            >
                                                                <div className="flex justify-between items-start gap-4">
                                                                    <div className="flex-1">
                                                                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 leading-tight text-sm">
                                                                            {course.title}
                                                                        </h4>
                                                                        <div className="flex items-center gap-3 mb-2">
                                                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPlatformColor(course.platform)}`}>
                                                                                {course.platform}
                                                                            </span>
                                                                            <span className="text-sm font-semibold text-green-600">
                                                                                {course.price}
                                                                            </span>
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 space-y-1">
                                                                            {course.instructor && <div>강사: {course.instructor}</div>}
                                                                            {course.students && <div>수강생: {course.students}</div>}
                                                                            {course.duration && <div>시간: {course.duration}</div>}
                                                                            {course.rating && <div>평점: ⭐ {course.rating}</div>}
                                                                        </div>
                                                                    </div>
                                                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 flex-shrink-0" />
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-4">핵심 기능</h3>
                                                    <div className="space-y-3 mb-8">
                                                        {topic.keyFeatures.map((feature, index) => (
                                                            <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                                                                <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                                                                <span className="text-gray-700">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 mb-4">활용 사례</h3>
                                                    <div className="space-y-2">
                                                        {topic.useCases.map((useCase, index) => (
                                                            <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                                                <Target className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                                                <span className="text-gray-700">{useCase}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeSection === 'learning' && (
                                            <div className="space-y-8">
                                                {['beginner', 'intermediate', 'advanced'].map((level) => (
                                                    <div key={level} className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6">
                                                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                            <TrendingUp className="w-5 h-5 text-indigo-500" />
                                                            {level === 'beginner' && '🚀 초급 단계 (1-4주)'}
                                                            {level === 'intermediate' && '⚡ 중급 단계 (5-8주)'}
                                                            {level === 'advanced' && '🏆 고급 단계 (9-12주)'}
                                                        </h3>
                                                        <div className="grid md:grid-cols-2 gap-4">
                                                            {topic.learningPath[level as keyof typeof topic.learningPath].map((step, index) => (
                                                                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                                                                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold flex-shrink-0">
                                                                        {index + 1}
                                                                    </div>
                                                                    <span className="text-gray-700">{step}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {activeSection === 'projects' && (
                                            <div className="grid md:grid-cols-3 gap-6">
                                                {topic.projects.map((project, index) => (
                                                    <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${project.difficulty === '초급' ? 'bg-green-100 text-green-800' :
                                                                project.difficulty === '중급' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                {project.difficulty}
                                                            </span>
                                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {project.period}
                                                            </span>
                                                        </div>
                                                        <h4 className="text-lg font-bold text-gray-900 mb-3">{project.title}</h4>
                                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                            {project.description}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <Code className="w-4 h-4 text-indigo-500" />
                                                            <span className="text-sm text-indigo-600 font-medium">프로젝트 시작하기</span>
                                                            <ArrowRight className="w-3 h-3 text-indigo-500" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white py-12">
                <div className="container max-w-6xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">2025년 AI 시대의 최강 개발자가 되세요</h3>
                    <p className="text-indigo-100 mb-6 max-w-3xl mx-auto">
                        실제 검증된 강의와 실전 프로젝트로 AI 도구들을 완전히 마스터하여, 개발 생산성을 10배 향상시키고 미래의 소프트웨어 개발을 선도하는 개발자가 되어보세요
                    </p>
                    <div className="flex items-center justify-center gap-8 text-sm">
                        <span className="flex items-center gap-2">
                            <Brain className="w-4 h-4 text-cyan-400" />
                            10가지 AI 도구
                        </span>
                        <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-green-400" />
                            {getTotalCourses()}개 실제 강의
                        </span>
                        <span className="flex items-center gap-2">
                            <Code className="w-4 h-4 text-purple-400" />
                            {getTotalProjects()}개 실전 프로젝트
                        </span>
                        <span className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            평균 4.6+ 평점
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIVibeCodingMastery;