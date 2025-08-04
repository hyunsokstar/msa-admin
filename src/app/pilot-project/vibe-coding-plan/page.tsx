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
    courses: { title: string; url: string; platform: string; price: string; instructor?: string; }[];
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
            name: "Llama 모델 활용 마스터리",
            category: "Open Source LLM",
            description: "Meta의 오픈소스 LLM인 Llama를 활용하여 비용 효율적이고 강력한 AI 서비스를 구축한다. 파인튜닝부터 배포까지 완전한 워크플로우를 마스터하라.",
            keyFeatures: [
                "Llama 2/3 모델 완전 활용",
                "로컬 환경에서 LLM 실행",
                "파인튜닝 및 커스터마이징",
                "비용 효율적 AI 서비스 구축",
                "오픈소스 생태계 활용"
            ],
            useCases: [
                "개인 AI 어시스턴트 구축",
                "도메인 특화 챗봇 개발",
                "코드 생성 도구 제작",
                "문서 요약 및 분석 시스템",
                "다국어 번역 서비스"
            ],
            learningPath: {
                beginner: [
                    "Llama 모델 기본 개념 및 설치",
                    "Hugging Face를 통한 모델 로딩",
                    "간단한 텍스트 생성 실습",
                    "프롬프트 엔지니어링 기초"
                ],
                intermediate: [
                    "Llama 파인튜닝 기법 학습",
                    "LoRA/QLoRA 활용한 효율적 학습",
                    "도메인 특화 데이터셋 구축",
                    "모델 성능 평가 및 최적화"
                ],
                advanced: [
                    "대규모 분산 학습 환경 구축",
                    "프로덕션 환경 배포 전략",
                    "모델 압축 및 양자화 기법",
                    "멀티모달 Llama 활용"
                ]
            },
            timeframe: "8-12주",
            difficulty: "Medium",
            courses: [
                {
                    title: "라마 활용 완전정복",
                    url: "https://www.inflearn.com/roadmaps/6886",
                    platform: "인프런",
                    price: "로드맵 (여러 강의)",
                    instructor: "AI 전문가"
                },
                {
                    title: "패스트캠퍼스 NLP 마스터",
                    url: "https://fastcampus.co.kr/category_online_datasciencenlp",
                    platform: "패스트캠퍼스",
                    price: "990,000원~",
                    instructor: "데이터사이언스 팀"
                },
                {
                    title: "오픈소스 LLM 실전 활용",
                    url: "https://www.inflearn.com/course/llama-practical",
                    platform: "인프런",
                    price: "77,000원",
                    instructor: "김AI"
                }
            ],
            tools: ["Python", "Hugging Face", "PyTorch", "Transformers", "Gradio"],
            projects: [
                { title: "개인 Llama 챗봇", description: "로컬에서 실행되는 개인용 AI 어시스턴트", difficulty: "초급", period: "2주" },
                { title: "도메인 특화 Q&A 시스템", description: "특정 분야에 특화된 질의응답 시스템", difficulty: "중급", period: "4주" },
                { title: "멀티모달 Llama 서비스", description: "텍스트와 이미지를 함께 처리하는 AI 서비스", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 2,
            icon: <Database className="w-6 h-6" />,
            name: "RAG 시스템 구축 (LLM Part 4)",
            category: "Retrieval-Augmented Generation",
            description: "AI 고객센터 챗봇을 만들며 배우는 실전 RAG 구현. 벡터 데이터베이스부터 고급 검색 기법까지 완전 마스터.",
            keyFeatures: [
                "벡터 임베딩 및 유사도 검색",
                "청킹 전략 및 최적화",
                "하이브리드 검색 구현",
                "컨텍스트 관리 및 압축",
                "실시간 지식 업데이트"
            ],
            useCases: [
                "AI 고객센터 챗봇",
                "기업 내부 지식 검색",
                "법률/의료 상담 시스템",
                "교육용 Q&A 플랫폼",
                "기술 문서 분석 도구"
            ],
            learningPath: {
                beginner: [
                    "RAG 기본 개념 및 아키텍처 이해",
                    "OpenAI Embeddings API 활용",
                    "Pinecone/Chroma 벡터 DB 구축",
                    "간단한 문서 검색 시스템 구현"
                ],
                intermediate: [
                    "청킹 전략 및 메타데이터 활용",
                    "하이브리드 검색 (벡터 + 키워드)",
                    "컨텍스트 윈도우 최적화",
                    "검색 품질 평가 메트릭 구축"
                ],
                advanced: [
                    "고급 RAG 패턴 (HyDE, Self-RAG)",
                    "멀티턴 대화 컨텍스트 관리",
                    "대규모 문서 컬렉션 처리",
                    "실시간 지식 그래프 통합"
                ]
            },
            timeframe: "10-14주",
            difficulty: "Medium",
            courses: [
                {
                    title: "모두를 위한 대규모 언어 모델 LLM Part 4 - AI 고객센터 챗봇(AICC)을 만들며 배우는 RAG 구현",
                    url: "https://www.inflearn.com/course/대규모-언어모델-llm-part4",
                    platform: "인프런",
                    price: "110,000원",
                    instructor: "모두의연구소"
                },
                {
                    title: "패스트캠퍼스 AI Tech RAG",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "1,200,000원~",
                    instructor: "AI Tech 팀"
                },
                {
                    title: "실전 RAG 시스템 구축",
                    url: "https://www.inflearn.com/course/rag-system-advanced",
                    platform: "인프런",
                    price: "88,000원",
                    instructor: "데이터사이언스 전문가"
                }
            ],
            tools: ["LangChain", "Pinecone", "Chroma", "FAISS", "Elasticsearch"],
            projects: [
                { title: "AI 고객센터 챗봇", description: "실제 고객 문의를 처리하는 RAG 기반 챗봇", difficulty: "중급", period: "6주" },
                { title: "기업 지식 검색 엔진", description: "사내 문서를 검색하는 지능형 시스템", difficulty: "중급", period: "4주" },
                { title: "멀티모달 RAG 시스템", description: "텍스트, 이미지, 표를 통합 검색하는 고급 시스템", difficulty: "고급", period: "10주" }
            ]
        },
        {
            id: 3,
            icon: <Settings className="w-6 h-6" />,
            name: "MCP 업무 자동화 마스터",
            category: "Model Context Protocol",
            description: "MCP를 활용한 업무 자동화로 반복 작업을 완전히 제거하라. 실무에서 바로 쓸 수 있는 자동화 시스템을 구축한다.",
            keyFeatures: [
                "MCP 프로토콜 완전 이해",
                "다양한 시스템 통합",
                "워크플로우 자동화",
                "실시간 데이터 동기화",
                "확장 가능한 아키텍처"
            ],
            useCases: [
                "이메일 자동 분류 및 답변",
                "일정 관리 자동화",
                "보고서 자동 생성",
                "데이터 수집 및 분석 자동화",
                "소셜미디어 관리 자동화"
            ],
            learningPath: {
                beginner: [
                    "MCP 기본 개념 및 설치",
                    "간단한 업무 자동화 스크립트 작성",
                    "이메일 및 캘린더 연동",
                    "기본 워크플로우 구성"
                ],
                intermediate: [
                    "복잡한 비즈니스 로직 구현",
                    "여러 도구 간 데이터 동기화",
                    "조건부 워크플로우 설계",
                    "에러 처리 및 모니터링"
                ],
                advanced: [
                    "대규모 엔터프라이즈 시스템 통합",
                    "AI 기반 지능형 자동화",
                    "보안 및 권한 관리",
                    "성능 최적화 및 스케일링"
                ]
            },
            timeframe: "6-10주",
            difficulty: "Medium",
            courses: [
                {
                    title: "MCP를 이용한 업무자동화",
                    url: "https://www.inflearn.com/course/모두를-위한-mcp를-이용한-업무자동",
                    platform: "인프런",
                    price: "66,000원",
                    instructor: "업무자동화 전문가"
                },
                {
                    title: "랭그래프 활용한 LLM 에이전트 개발 (MCP)",
                    url: "https://www.inflearn.com/course/랭그래프-활용한-llm에이전트-개발",
                    platform: "인프런",
                    price: "99,000원",
                    instructor: "AI 에이전트 전문가"
                },
                {
                    title: "실무 업무자동화 마스터",
                    url: "https://www.inflearn.com/course/business-automation-master",
                    platform: "인프런",
                    price: "77,000원",
                    instructor: "자동화 컨설턴트"
                }
            ],
            tools: ["Python", "MCP", "Zapier", "Make", "Google Workspace"],
            projects: [
                { title: "스마트 이메일 매니저", description: "이메일을 자동으로 분류하고 중요도를 판단하는 시스템", difficulty: "초급", period: "3주" },
                { title: "업무 보고서 자동화", description: "데이터를 수집해서 자동으로 보고서를 생성하는 시스템", difficulty: "중급", period: "5주" },
                { title: "통합 업무 대시보드", description: "여러 도구의 데이터를 통합해서 보여주는 대시보드", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 4,
            icon: <Bot className="w-6 h-6" />,
            name: "LangGraph AI 에이전트",
            category: "Multi-Agent System",
            description: "LangGraph로 나만의 AI 에이전트를 만들어 복잡한 작업을 자율적으로 수행하는 시스템을 구축한다.",
            keyFeatures: [
                "그래프 기반 워크플로우 설계",
                "다중 에이전트 협업",
                "상태 관리 및 메모리",
                "도구 사용 및 API 연동",
                "조건부 실행 로직"
            ],
            useCases: [
                "복잡한 리서치 에이전트",
                "코드 리뷰 자동화",
                "콘텐츠 제작 파이프라인",
                "데이터 분석 워크플로우",
                "고객 서비스 에이전트"
            ],
            learningPath: {
                beginner: [
                    "LangGraph 기본 개념 및 설치",
                    "간단한 에이전트 워크플로우 구성",
                    "노드와 엣지의 이해",
                    "기본 상태 관리"
                ],
                intermediate: [
                    "복잡한 그래프 구조 설계",
                    "조건부 분기 및 루프",
                    "외부 도구 및 API 통합",
                    "에이전트 간 통신"
                ],
                advanced: [
                    "대규모 멀티에이전트 시스템",
                    "동적 그래프 생성",
                    "성능 최적화 및 병렬 처리",
                    "에이전트 학습 및 적응"
                ]
            },
            timeframe: "8-12주",
            difficulty: "Hard",
            courses: [
                {
                    title: "LangGraph로 나만의 AI 에이전트 만들기",
                    url: "https://www.inflearn.com/course/랭그래프-에이전트-part5",
                    platform: "인프런",
                    price: "132,000원",
                    instructor: "AI 에이전트 전문가"
                },
                {
                    title: "고급 AI 에이전트 시스템",
                    url: "https://www.inflearn.com/course/advanced-ai-agent",
                    platform: "인프런",
                    price: "154,000원",
                    instructor: "머신러닝 엔지니어"
                },
                {
                    title: "멀티에이전트 협업 시스템",
                    url: "https://fastcampus.co.kr/data_online_multiagent",
                    platform: "패스트캠퍼스",
                    price: "1,430,000원",
                    instructor: "AI 시스템 아키텍트"
                }
            ],
            tools: ["LangGraph", "LangChain", "Python", "OpenAI API", "Anthropic Claude"],
            projects: [
                { title: "리서치 AI 에이전트", description: "주제를 주면 자동으로 조사해서 보고서를 작성하는 에이전트", difficulty: "중급", period: "4주" },
                { title: "코드 리뷰 자동화 에이전트", description: "GitHub PR을 자동으로 분석하고 리뷰하는 에이전트", difficulty: "고급", period: "6주" },
                { title: "콘텐츠 제작 파이프라인", description: "아이디어부터 완성된 콘텐츠까지 자동 생성하는 시스템", difficulty: "고급", period: "10주" }
            ]
        },
        {
            id: 5,
            icon: <Palette className="w-6 h-6" />,
            name: "Figma + AI 디자인 혁명",
            category: "AI-Powered Design",
            description: "AI 도구와 Figma를 활용한 앱 서비스 디자인으로 디자인 프로세스를 혁신한다. 더 빠르고 창의적인 디자인 워크플로우를 구축하라.",
            keyFeatures: [
                "AI 기반 디자인 생성",
                "자동 레이아웃 최적화",
                "스마트 색상 팔레트",
                "디자인 시스템 자동화",
                "사용자 테스트 통합"
            ],
            useCases: [
                "모바일 앱 UI/UX 디자인",
                "웹사이트 랜딩페이지",
                "브랜딩 및 로고 디자인",
                "프로토타입 빠른 생성",
                "디자인 시스템 구축"
            ],
            learningPath: {
                beginner: [
                    "Figma 기본 기능 마스터",
                    "AI 디자인 플러그인 활용",
                    "자동 레이아웃 시스템",
                    "기본 프로토타이핑"
                ],
                intermediate: [
                    "AI 기반 색상 및 타이포그래피",
                    "복잡한 인터랙션 설계",
                    "디자인 토큰 시스템",
                    "사용자 테스트 연동"
                ],
                advanced: [
                    "AI 기반 A/B 테스트 디자인",
                    "디자인 자동화 워크플로우",
                    "개발팀과의 협업 시스템",
                    "디자인 데이터 분석"
                ]
            },
            timeframe: "6-8주",
            difficulty: "Easy",
            courses: [
                {
                    title: "AI 도구와 피그마를 활용한 앱 서비스 디자인",
                    url: "https://www.inflearn.com/course/ai-도구와-피그마를-활용한-앱-서비",
                    platform: "인프런",
                    price: "88,000원",
                    instructor: "UX/UI 디자이너"
                },
                {
                    title: "AI 디자인 도구 완전정복",
                    url: "https://www.inflearn.com/course/ai-design-tools",
                    platform: "인프런",
                    price: "77,000원",
                    instructor: "프로덕트 디자이너"
                },
                {
                    title: "피그마 + AI 실무 워크플로우",
                    url: "https://fastcampus.co.kr/design_online_figma_ai",
                    platform: "패스트캠퍼스",
                    price: "770,000원",
                    instructor: "디자인 시스템 전문가"
                }
            ],
            tools: ["Figma", "Midjourney", "DALL-E", "Stable Diffusion", "Adobe Firefly"],
            projects: [
                { title: "AI 생성 모바일 앱 디자인", description: "AI로 아이디어를 생성하고 Figma로 완성하는 앱 디자인", difficulty: "초급", period: "3주" },
                { title: "스마트 디자인 시스템", description: "AI가 일관성을 유지해주는 자동화된 디자인 시스템", difficulty: "중급", period: "5주" },
                { title: "개인화 UI 생성기", description: "사용자 데이터를 기반으로 맞춤형 UI를 생성하는 시스템", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 6,
            icon: <Globe className="w-6 h-6" />,
            name: "바이브코딩 실전 프로젝트",
            category: "Real-world Application",
            description: "공공데이터 AI 서비스와 재무제표 분석 등 실무에서 바로 쓸 수 있는 바이브코딩 프로젝트로 실전 경험을 쌓는다.",
            keyFeatures: [
                "실제 데이터 활용 프로젝트",
                "정부 AI 정책 대응",
                "금융 데이터 분석",
                "사용자 중심 서비스 설계",
                "상용화 가능한 품질"
            ],
            useCases: [
                "공공데이터 분석 서비스",
                "재무제표 자동 분석",
                "정부 정책 정보 서비스",
                "시민 참여 플랫폼",
                "데이터 시각화 대시보드"
            ],
            learningPath: {
                beginner: [
                    "공공데이터 포털 활용법",
                    "기본적인 데이터 전처리",
                    "간단한 웹 서비스 구축",
                    "데이터 시각화 기초"
                ],
                intermediate: [
                    "복잡한 데이터 파이프라인 구축",
                    "AI 모델 통합 및 배포",
                    "사용자 인터페이스 최적화",
                    "성능 모니터링 시스템"
                ],
                advanced: [
                    "대규모 서비스 아키텍처",
                    "실시간 데이터 처리",
                    "보안 및 개인정보 보호",
                    "비즈니스 모델 개발"
                ]
            },
            timeframe: "12-16주",
            difficulty: "Medium",
            courses: [
                {
                    title: "정부 AI 정책 시대 바이브코딩으로 공공 데이터 AI 서비스 만들기",
                    url: "https://www.inflearn.com/course/정부-ai-정책-시대-바이브코딩으로",
                    platform: "인프런",
                    price: "99,000원",
                    instructor: "바이브코딩 전문가"
                },
                {
                    title: "바이브코딩 재미있는 재무제표 (Cursor AI 활용)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "77,000원",
                    instructor: "금융 데이터 분석가"
                },
                {
                    title: "실전 공공서비스 개발",
                    url: "https://www.inflearn.com/course/public-service-development",
                    platform: "인프런",
                    price: "110,000원",
                    instructor: "공공서비스 개발자"
                }
            ],
            tools: ["Python", "Django", "React", "D3.js", "공공데이터포털"],
            projects: [
                { title: "지역별 인구 분석 서비스", description: "공공데이터를 활용한 인구 변화 분석 웹서비스", difficulty: "초급", period: "4주" },
                { title: "기업 재무 건전성 분석기", description: "재무제표를 분석해서 투자 의사결정을 돕는 도구", difficulty: "중급", period: "6주" },
                { title: "스마트시티 데이터 플랫폼", description: "도시 데이터를 통합 분석하는 플랫폼", difficulty: "고급", period: "12주" }
            ]
        },
        {
            id: 7,
            icon: <Terminal className="w-6 h-6" />,
            name: "Cursor AI 마스터 개발",
            category: "AI-Native IDE",
            description: "Cursor AI를 완전히 마스터하여 개발 생산성을 10배 향상시킨다. AI와 함께하는 페어 프로그래밍의 새로운 패러다임을 경험하라.",
            keyFeatures: [
                "AI 기반 코드 생성",
                "컨텍스트 인식 자동완성",
                "자연어 코드 편집",
                "실시간 코드 리뷰",
                "프로젝트 전체 이해"
            ],
            useCases: [
                "빠른 프로토타이핑",
                "레거시 코드 현대화",
                "복잡한 알고리즘 구현",
                "API 통합 자동화",
                "테스트 코드 생성"
            ],
            learningPath: {
                beginner: [
                    "Cursor 설치 및 기본 설정",
                    "AI 명령어 및 단축키",
                    "기본 코드 생성 실습",
                    "프로젝트 구조 이해"
                ],
                intermediate: [
                    "복잡한 요구사항 전달 기법",
                    "코드 리팩토링 자동화",
                    "커스텀 프롬프트 작성",
                    "팀 협업 워크플로우"
                ],
                advanced: [
                    "대규모 프로젝트 관리",
                    "AI 모델 커스터마이징",
                    "워크플로우 자동화",
                    "성능 최적화 기법"
                ]
            },
            timeframe: "4-6주",
            difficulty: "Easy",
            courses: [
                {
                    title: "Cursor AI 활용한 바이브코딩 (재무제표 프로젝트)",
                    url: "https://www.inflearn.com/course/바이브코딩-재미있는-재무제표",
                    platform: "인프런",
                    price: "77,000원",
                    instructor: "바이브코딩 전문가"
                },
                {
                    title: "Cursor AI 완전정복",
                    url: "https://www.inflearn.com/course/cursor-ai-master",
                    platform: "인프런",
                    price: "55,000원",
                    instructor: "AI 개발도구 전문가"
                },
                {
                    title: "AI 페어 프로그래밍 마스터",
                    url: "https://fastcampus.co.kr/dev_online_cursor_ai",
                    platform: "패스트캠퍼스",
                    price: "660,000원",
                    instructor: "풀스택 개발자"
                }
            ],
            tools: ["Cursor", "VS Code", "GitHub Copilot", "TypeScript", "Python"],
            projects: [
                { title: "AI 투두 관리 앱", description: "자연어로 할 일을 관리하는 스마트 앱", difficulty: "초급", period: "2주" },
                { title: "코드 분석 대시보드", description: "프로젝트 코드를 분석해서 인사이트를 제공", difficulty: "중급", period: "4주" },
                { title: "AI 코딩 어시스턴트", description: "팀 전용 코딩 도우미 개발", difficulty: "고급", period: "8주" }
            ]
        },
        {
            id: 8,
            icon: <Database className="w-6 h-6" />,
            name: "Vector Database 고급 활용",
            category: "Advanced Vector Search",
            description: "벡터 데이터베이스의 고급 기능을 마스터하여 차세대 검색 및 추천 시스템을 구축한다.",
            keyFeatures: [
                "고차원 벡터 인덱싱",
                "하이브리드 검색 전략",
                "벡터 압축 및 최적화",
                "실시간 업데이트 처리",
                "분산 벡터 시스템"
            ],
            useCases: [
                "시맨틱 검색 엔진",
                "개인화 추천 시스템",
                "이미지 유사도 검색",
                "코드 검색 플랫폼",
                "지식 그래프 구축"
            ],
            learningPath: {
                beginner: [
                    "벡터 임베딩 기본 개념",
                    "Pinecone/Weaviate 설정",
                    "간단한 유사도 검색",
                    "메타데이터 필터링"
                ],
                intermediate: [
                    "HNSW 알고리즘 이해",
                    "벡터 양자화 기법",
                    "하이브리드 검색 구현",
                    "성능 튜닝 전략"
                ],
                advanced: [
                    "분산 벡터 아키텍처",
                    "실시간 임베딩 업데이트",
                    "멀티모달 벡터 검색",
                    "엔터프라이즈 벡터 플랫폼"
                ]
            },
            timeframe: "8-10주",
            difficulty: "Hard",
            courses: [
                {
                    title: "벡터 데이터베이스 마스터",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "1,200,000원~",
                    instructor: "AI Tech 팀"
                },
                {
                    title: "고급 벡터 검색 시스템",
                    url: "https://www.inflearn.com/course/vector-search-advanced",
                    platform: "인프런",
                    price: "132,000원",
                    instructor: "검색 엔진 전문가"
                },
                {
                    title: "실전 추천 시스템 구축",
                    url: "https://www.inflearn.com/course/recommendation-system",
                    platform: "인프런",
                    price: "99,000원",
                    instructor: "머신러닝 엔지니어"
                }
            ],
            tools: ["Pinecone", "Weaviate", "Chroma", "Qdrant", "Milvus"],
            projects: [
                { title: "시맨틱 코드 검색", description: "자연어로 코드를 검색할 수 있는 엔진", difficulty: "중급", period: "5주" },
                { title: "개인화 콘텐츠 추천", description: "사용자 행동을 학습하는 추천 시스템", difficulty: "고급", period: "8주" },
                { title: "멀티모달 검색 플랫폼", description: "텍스트, 이미지, 음성을 통합 검색", difficulty: "고급", period: "12주" }
            ]
        },
        {
            id: 9,
            icon: <Video className="w-6 h-6" />,
            name: "멀티모달 AI 시스템",
            category: "Multimodal Intelligence",
            description: "텍스트, 이미지, 음성, 비디오를 통합 처리하는 차세대 AI 시스템을 구축한다.",
            keyFeatures: [
                "크로스모달 학습",
                "실시간 멀티미디어 처리",
                "통합 임베딩 공간",
                "모달리티 간 변환",
                "상황 인식 AI"
            ],
            useCases: [
                "AI 비디오 편집 도구",
                "실시간 번역 시스템",
                "의료 영상 진단",
                "교육용 AI 튜터",
                "창작 지원 도구"
            ],
            learningPath: {
                beginner: [
                    "컴퓨터 비전 기초",
                    "음성 처리 기본",
                    "OpenAI CLIP 활용",
                    "간단한 이미지 분석"
                ],
                intermediate: [
                    "멀티모달 트랜스포머",
                    "DALL-E, Stable Diffusion",
                    "Whisper 음성 인식",
                    "실시간 스트림 처리"
                ],
                advanced: [
                    "커스텀 멀티모달 모델",
                    "대규모 멀티미디어 처리",
                    "엣지 디바이스 최적화",
                    "실시간 인터랙션 시스템"
                ]
            },
            timeframe: "12-16주",
            difficulty: "Hard",
            courses: [
                {
                    title: "멀티모달 AI 시스템 구축",
                    url: "https://fastcampus.co.kr/category_online_datasciencenlp",
                    platform: "패스트캠퍼스",
                    price: "990,000원~",
                    instructor: "컴퓨터비전 전문가"
                },
                {
                    title: "AI 비디오 분석 마스터",
                    url: "https://www.inflearn.com/course/ai-video-analysis",
                    platform: "인프런",
                    price: "154,000원",
                    instructor: "미디어 AI 전문가"
                },
                {
                    title: "실시간 멀티모달 처리",
                    url: "https://www.inflearn.com/course/realtime-multimodal",
                    platform: "인프런",
                    price: "110,000원",
                    instructor: "실시간 시스템 개발자"
                }
            ],
            tools: ["OpenCV", "FFmpeg", "Whisper", "CLIP", "Stable Diffusion"],
            projects: [
                { title: "AI 영상 요약기", description: "긴 비디오를 분석해서 핵심 내용을 요약", difficulty: "중급", period: "6주" },
                { title: "실시간 다국어 화상회의", description: "실시간 번역과 자막을 제공하는 시스템", difficulty: "고급", period: "10주" },
                { title: "창작 AI 스튜디오", description: "텍스트로 영상, 음악, 이미지를 생성하는 통합 도구", difficulty: "고급", period: "16주" }
            ]
        },
        {
            id: 10,
            icon: <Server className="w-6 h-6" />,
            name: "AI 서비스 배포 & 운영",
            category: "MLOps & Production",
            description: "AI 모델을 실제 서비스로 배포하고 운영하는 전체 파이프라인을 마스터한다. 확장성과 안정성을 고려한 프로덕션 시스템을 구축하라.",
            keyFeatures: [
                "모델 버전 관리",
                "A/B 테스트 시스템",
                "자동 스케일링",
                "모니터링 및 알람",
                "CI/CD 파이프라인"
            ],
            useCases: [
                "대규모 AI 서비스 운영",
                "모델 성능 모니터링",
                "자동화된 재학습",
                "트래픽 기반 스케일링",
                "비용 최적화"
            ],
            learningPath: {
                beginner: [
                    "Docker 컨테이너화",
                    "기본 API 서버 구축",
                    "클라우드 배포 기초",
                    "간단한 모니터링"
                ],
                intermediate: [
                    "Kubernetes 오케스트레이션",
                    "모델 서빙 최적화",
                    "로드 밸런싱 설정",
                    "성능 메트릭 구축"
                ],
                advanced: [
                    "멀티리전 배포",
                    "자동 장애 복구",
                    "비용 최적화 전략",
                    "엔터프라이즈 보안"
                ]
            },
            timeframe: "10-14주",
            difficulty: "Hard",
            courses: [
                {
                    title: "MLOps 실전 마스터",
                    url: "https://fastcampus.co.kr/category_online_aitechrag",
                    platform: "패스트캠퍼스",
                    price: "1,200,000원~",
                    instructor: "MLOps 엔지니어"
                },
                {
                    title: "AI 서비스 배포 완전정복",
                    url: "https://www.inflearn.com/course/ai-service-deployment",
                    platform: "인프런",
                    price: "143,000원",
                    instructor: "클라우드 아키텍트"
                },
                {
                    title: "프로덕션 AI 시스템 운영",
                    url: "https://www.inflearn.com/course/production-ai-ops",
                    platform: "인프런",
                    price: "120,000원",
                    instructor: "DevOps 전문가"
                }
            ],
            tools: ["Docker", "Kubernetes", "AWS", "MLflow", "Prometheus"],
            projects: [
                { title: "AI API 서비스", description: "확장 가능한 AI 모델 API 서비스 구축", difficulty: "중급", period: "5주" },
                { title: "자동 재학습 파이프라인", description: "데이터 변화를 감지해서 모델을 재학습하는 시스템", difficulty: "고급", period: "8주" },
                { title: "AI 서비스 모니터링 플랫폼", description: "AI 서비스의 성능과 비용을 통합 관리하는 플랫폼", difficulty: "고급", period: "12주" }
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
                        <span className="text-sm font-medium">AI 바이브 코딩 마스터리 2025</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent">
                        AI 코딩 도구 10가지
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                        실제 강의와 실전 프로젝트로 마스터하는 최신 AI 개발 도구 완전정복
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Sparkles className="w-4 h-4" />
                            <span>실제 강의 {getTotalCourses()}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Code className="w-4 h-4" />
                            <span>실전 프로젝트 {getTotalProjects()}개</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span>총 {getTotalLearningTime()}주 과정</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Award className="w-4 h-4" />
                            <span>인프런 + 패스트캠퍼스</span>
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
                            <div className="text-sm text-gray-600">실제 강의</div>
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
                            <div className="text-3xl font-bold text-green-600 mb-2">10</div>
                            <div className="text-sm text-gray-600">핵심 도구</div>
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

                                    {/* Quick Tools */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">주요 도구</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {topic.tools.slice(0, 4).map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                                >
                                                    {tool}
                                                </span>
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
                                            {topic.courses.slice(0, 2).map((course, index) => (
                                                <div key={index} className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs text-gray-600 truncate flex-1 mr-2">{course.title}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getPlatformColor(course.platform)}`}>
                                                            {course.platform}
                                                        </span>
                                                        <span className="text-xs font-semibold text-green-600">
                                                            {course.price}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Projects Preview */}
                                    <div className="border-t border-gray-200 pt-4 mt-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-gray-900">실전 프로젝트</h4>
                                            <span className="text-xs text-gray-500">{topic.projects.length}개</span>
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            {topic.projects[0]?.title} 외 {topic.projects.length - 1}개
                                        </div>
                                    </div>

                                    {/* Expand Button */}
                                    <div className="mt-6 text-center">
                                        <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all">
                                            상세 학습 로드맵
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
                                                        {section === 'overview' && '개요 & 강의'}
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
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div className="flex-1">
                                                                        <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 leading-tight">
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
                                                                        {course.instructor && (
                                                                            <div className="text-xs text-gray-500">
                                                                                강사: {course.instructor}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 flex-shrink-0" />
                                                                </div>
                                                            </a>
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
                        실제 강의와 실전 프로젝트로 검증된 AI 도구들을 마스터하여, 개발 생산성을 10배 향상시키고 미래의 소프트웨어 개발을 선도하는 개발자가 되어보세요
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
                            완전 마스터리
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIVibeCodingMastery;