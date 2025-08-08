// C:\Users\terec\msa-admin\src\app\pilot-project\qa-for-rag\page.tsx
"use client";
import React, { useState } from 'react';
import {
    ChevronDown, ChevronRight, Brain, Zap, Shield, Code, Target, Users,
    GitBranch, Layers, Settings, AlertTriangle, BookOpen, ExternalLink,
    TrendingUp, Globe, Cpu, Network, Sparkles, Database, Heart, Eye,
    Star, Award, Gauge, Server, Cloud, FileText, Search, Building2,
    GraduationCap, BarChart3, Rocket, CheckCircle2, XCircle, Info
} from 'lucide-react';

const RAGManual = () => {
    const [activeSection, setActiveSection] = useState('intro');
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

    const toggleExpanded = (key: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // 1. RAG 실시간 & 빅데이터 가능성
    const realTimeCapabilities = {
        title: "RAG의 실시간 정보 처리 & 빅데이터 역량",
        capabilities: [
            {
                id: 'streaming',
                title: '실시간 스트리밍 처리',
                icon: <Zap className="w-8 h-8" />,
                level: '가능',
                color: 'green',
                details: [
                    'Kafka/Flink 연동으로 실시간 데이터 파이프라인',
                    'CDC(Change Data Capture)로 DB 변경사항 즉시 반영',
                    'Event-Driven 아키텍처로 실시간 벡터 업데이트',
                    'Incremental Indexing으로 지속적 데이터 갱신'
                ],
                performance: '초당 10만+ 문서 처리 가능',
                examples: 'Netflix, Uber의 실시간 추천 시스템'
            },
            {
                id: 'bigdata',
                title: '빅데이터 스케일',
                icon: <Database className="w-8 h-8" />,
                level: '대규모 가능',
                color: 'blue',
                details: [
                    'Petabyte급 데이터 처리 (분산 벡터DB 활용)',
                    'Spark/Hadoop 통합으로 대용량 배치 처리',
                    'Multi-tier 캐싱으로 응답속도 최적화',
                    'Federated Learning으로 분산 데이터 활용'
                ],
                performance: '수십억 문서 검색 < 100ms',
                examples: 'Google, Amazon의 제품 검색'
            },
            {
                id: 'reporting',
                title: '동적 리포팅',
                icon: <BarChart3 className="w-8 h-8" />,
                level: '자동화 가능',
                color: 'purple',
                details: [
                    'Real-time Dashboard 생성',
                    'AI 기반 인사이트 자동 추출',
                    '시계열 데이터 분석 및 예측',
                    '자연어 기반 리포트 생성'
                ],
                performance: '리포트 생성 시간 90% 단축',
                examples: 'Bloomberg Terminal, Tableau AI'
            }
        ],
        limitations: [
            { issue: '벡터 연산 비용', solution: 'GPU 클러스터 + 캐싱 전략' },
            { issue: '데이터 일관성', solution: 'Eventual Consistency + Version Control' },
            { issue: '스토리지 비용', solution: 'Tiered Storage + 압축 알고리즘' }
        ]
    };

    // 2. 교육 분야 활용성
    const educationUseCases = {
        title: "교육 분야 RAG 활용 가능성",
        verdict: "🎯 교육 혁신의 게임 체인저",
        applications: [
            {
                name: "개인화 학습 어시스턴트",
                icon: <GraduationCap className="w-6 h-6" />,
                benefits: [
                    "학생 수준별 맞춤 설명",
                    "실시간 질의응답 24/7",
                    "학습 진도 추적 및 분석",
                    "약점 분석 및 보강 자료 제공"
                ],
                impact: "학습 효율 3배 향상"
            },
            {
                name: "지능형 교육 콘텐츠 생성",
                icon: <FileText className="w-6 h-6" />,
                benefits: [
                    "자동 문제 생성 및 해설",
                    "교과서 요약 및 핵심 정리",
                    "다국어 번역 및 현지화",
                    "멀티미디어 학습 자료 생성"
                ],
                impact: "콘텐츠 제작 시간 80% 단축"
            },
            {
                name: "실시간 과제 평가 시스템",
                icon: <CheckCircle2 className="w-6 h-6" />,
                benefits: [
                    "즉각적인 피드백 제공",
                    "표절 검사 및 원본성 확인",
                    "평가 기준 일관성 보장",
                    "학습 패턴 분석"
                ],
                impact: "평가 정확도 95%+"
            }
        ],
        realWorldCases: [
            { company: "Khan Academy", usage: "AI 튜터 Khanmigo", result: "학습 성과 40% 향상" },
            { company: "Duolingo", usage: "개인화 언어 학습", result: "사용자 retention 2배 증가" },
            { company: "Coursera", usage: "자동 과제 평가", result: "평가 시간 90% 감소" }
        ]
    };

    // 3. 벡터 DB 추천
    const vectorDatabases = {
        title: "2025년 실무용 벡터 DB Top 5",
        databases: [
            {
                rank: 1,
                name: "Pinecone",
                logo: "🔷",
                type: "Managed Cloud",
                pros: [
                    "완전 관리형 서비스",
                    "자동 스케일링",
                    "실시간 업데이트",
                    "간편한 API"
                ],
                cons: ["비용이 높음", "벤더 종속성"],
                bestFor: "빠른 프로토타이핑, 스타트업",
                pricing: "$70+/월",
                performance: "10억 벡터, <100ms 응답"
            },
            {
                rank: 2,
                name: "Weaviate",
                logo: "🟢",
                type: "Open Source + Cloud",
                pros: [
                    "하이브리드 검색 지원",
                    "GraphQL API",
                    "모듈식 아키텍처",
                    "다양한 ML 모델 통합"
                ],
                cons: ["학습 곡선 존재", "리소스 사용량 높음"],
                bestFor: "엔터프라이즈, 복잡한 쿼리",
                pricing: "오픈소스 무료 / 클라우드 $250+/월",
                performance: "수십억 벡터 처리"
            },
            {
                rank: 3,
                name: "Qdrant",
                logo: "🔴",
                type: "Open Source + Cloud",
                pros: [
                    "Rust 기반 고성능",
                    "필터링 기능 강력",
                    "온프레미스 가능",
                    "메모리 효율적"
                ],
                cons: ["커뮤니티 상대적 작음", "문서화 개선 필요"],
                bestFor: "고성능 요구, 온프레미스",
                pricing: "오픈소스 무료 / 클라우드 커스텀",
                performance: "메모리 사용량 50% 절감"
            },
            {
                rank: 4,
                name: "PGVector",
                logo: "🐘",
                type: "PostgreSQL Extension",
                pros: [
                    "PostgreSQL 생태계",
                    "ACID 트랜잭션",
                    "기존 인프라 활용",
                    "SQL 쿼리 지원"
                ],
                cons: ["대규모 확장 제한", "전문 벡터DB 대비 기능 부족"],
                bestFor: "PostgreSQL 사용 조직, 중소규모",
                pricing: "PostgreSQL 비용만",
                performance: "수백만 벡터 적합"
            },
            {
                rank: 5,
                name: "Elasticsearch",
                logo: "🟡",
                type: "Search + Vector",
                pros: [
                    "풀텍스트 + 벡터 검색",
                    "성숙한 생태계",
                    "강력한 분석 기능",
                    "대규모 검증됨"
                ],
                cons: ["복잡한 설정", "높은 리소스 요구"],
                bestFor: "하이브리드 검색, 대기업",
                pricing: "오픈소스 무료 / Elastic Cloud $95+/월",
                performance: "페타바이트급 데이터"
            }
        ],
        selectionCriteria: [
            "데이터 규모 (백만 vs 십억 벡터)",
            "응답 시간 요구사항 (<10ms vs <100ms)",
            "예산 (오픈소스 vs 관리형)",
            "팀 역량 (DevOps 가능 여부)",
            "하이브리드 검색 필요성"
        ]
    };

    // 4. Spring AI RAG 기능
    const springAIFeatures = {
        title: "Spring AI의 RAG 지원 기능",
        overview: "Spring 생태계에서 RAG 구현을 위한 완벽한 도구세트",
        coreFeatures: [
            {
                feature: "VectorStore 추상화",
                icon: <Database className="w-6 h-6" />,
                description: "다양한 벡터 DB 통합 인터페이스",
                code: `@Bean
VectorStore vectorStore() {
    return new PineconeVectorStore(
        pineconeApi, 
        embeddingModel
    );
}`,
                supports: ["PGVector", "Redis", "Pinecone", "Weaviate", "Qdrant", "Elasticsearch"]
            },
            {
                feature: "Document 처리 파이프라인",
                icon: <FileText className="w-6 h-6" />,
                description: "자동 문서 분할 및 임베딩 생성",
                code: `List<Document> documents = 
    new TokenTextSplitter()
        .split(pdfReader.read());
        
vectorStore.add(documents);`,
                supports: ["PDF", "Word", "HTML", "JSON", "CSV", "TXT"]
            },
            {
                feature: "RAG Advisor",
                icon: <Brain className="w-6 h-6" />,
                description: "검색 증강 생성 자동화",
                code: `ChatResponse response = ChatClient
    .builder(chatModel)
    .build()
    .prompt()
    .advisors(new QuestionAnswerAdvisor(
        vectorStore, 
        SearchRequest.defaults()
            .withSimilarityThreshold(0.7)
            .withTopK(5)
    ))
    .user(userQuestion)
    .call()
    .chatResponse();`,
                supports: ["컨텍스트 자동 주입", "유사도 기반 검색", "메타데이터 필터링"]
            },
            {
                feature: "Modular RAG 아키텍처",
                icon: <Layers className="w-6 h-6" />,
                description: "고급 RAG 파이프라인 구성",
                code: `RetrievalAugmentationAdvisor.builder()
    .queryTransformer(new CompressionQueryTransformer())
    .documentRetriever(customRetriever)
    .documentPostProcessor(reRanker)
    .build();`,
                supports: ["Query 변환", "Re-ranking", "하이브리드 검색", "캐싱"]
            }
        ],
        advantages: [
            "Spring Boot 자동 설정으로 빠른 시작",
            "의존성 주입으로 테스트 용이",
            "트랜잭션 관리 통합",
            "Spring Security와 통합 가능",
            "Reactive 프로그래밍 지원"
        ]
    };

    // 5. 실무 사례 모음
    const realWorldImplementations = {
        title: "RAG 실무 구현 사례 분석",
        categories: [
            {
                category: "빅테크 기업",
                icon: <Building2 className="w-6 h-6" />,
                color: "blue",
                cases: [
                    {
                        company: "Microsoft",
                        product: "Azure AI Search + Copilot",
                        scale: "밀리초 응답 시간으로 빠른 쿼리",
                        tech: ["Azure Cognitive Search", "OpenAI", "Semantic Kernel"],
                        highlight: "엔터프라이즈 문서 검색 + LLM 통합"
                    },
                    {
                        company: "Google",
                        product: "Vertex AI Search",
                        scale: "페타바이트급 데이터 처리",
                        tech: ["Vertex AI", "Cloud Search", "Gemini"],
                        highlight: "실시간 데이터와 LLM 통합으로 정확도 향상"
                    },
                    {
                        company: "Amazon",
                        product: "Bedrock Knowledge Bases",
                        scale: "수십억 개의 매개 변수로 독창적인 결과 생성",
                        tech: ["SageMaker", "OpenSearch", "Claude"],
                        highlight: "완전 관리형 RAG 서비스"
                    },
                    {
                        company: "Meta",
                        product: "FAISS + LLaMA",
                        scale: "10억+ 벡터 실시간 검색",
                        tech: ["FAISS", "PyTorch", "LLaMA"],
                        highlight: "5줄의 코드로 RAG 구현 가능"
                    }
                ]
            },
            {
                category: "국내 기업",
                icon: <Globe className="w-6 h-6" />,
                color: "green",
                cases: [
                    {
                        company: "삼성SDS",
                        product: "SKE-GPT",
                        scale: "가이드를 통해 자가 해결 가능한 케이스 68%",
                        tech: ["LangChain", "Vector DB", "GPT"],
                        highlight: "쿠버네티스 기술지원 자동화"
                    },
                    {
                        company: "네이버",
                        product: "CLOVA Studio RAG",
                        scale: "일 10억+ 요청 처리",
                        tech: ["HyperCLOVA", "자체 Vector DB"],
                        highlight: "한국어 특화 RAG 솔루션"
                    },
                    {
                        company: "카카오",
                        product: "Karlo + RAG",
                        scale: "실시간 대화형 AI",
                        tech: ["KoGPT", "Elasticsearch"],
                        highlight: "멀티모달 RAG 구현"
                    }
                ]
            },
            {
                category: "산업별 적용",
                icon: <Target className="w-6 h-6" />,
                color: "purple",
                cases: [
                    {
                        industry: "금융",
                        example: "Bloomberg",
                        useCase: "실시간 재무 문서 요약 및 인사이트 추출",
                        impact: "분석 시간 70% 단축"
                    },
                    {
                        industry: "의료",
                        example: "Mayo Clinic",
                        useCase: "의료 진단 및 연구 지원",
                        impact: "진단 정확도 15% 향상"
                    },
                    {
                        industry: "이커머스",
                        example: "Amazon",
                        useCase: "AI 기반 제품 추천 엔진",
                        impact: "매출 35% 증가"
                    },
                    {
                        industry: "교육",
                        example: "Coursera",
                        useCase: "개인화된 학습 경험 제공",
                        impact: "학습 완료율 2배 증가"
                    }
                ]
            }
        ]
    };

    // RAG 아키텍처 패턴
    const architecturePatterns = {
        naive: {
            name: "Naive RAG",
            complexity: "낮음",
            components: ["임베딩", "검색", "생성"],
            useCase: "프로토타입, POC"
        },
        advanced: {
            name: "Advanced RAG",
            complexity: "중간",
            components: ["Pre-retrieval 최적화", "Post-retrieval 재정렬", "Query 변환", "메타데이터 통합"],
            useCase: "프로덕션 초기"
        },
        modular: {
            name: "Modular RAG",
            complexity: "높음",
            components: ["Search 모듈", "Memory 모듈", "RAG Fusion", "자체 개선 루프"],
            useCase: "대규모 엔터프라이즈"
        }
    };

    // 성능 메트릭
    const performanceMetrics = {
        title: "RAG 시스템 성능 지표",
        metrics: [
            {
                metric: "응답 정확도",
                target: ">95%",
                measurement: "Ground Truth 대비"
            },
            {
                metric: "검색 속도",
                target: "<100ms",
                measurement: "P99 레이턴시"
            },
            {
                metric: "처리량",
                target: ">1000 QPS",
                measurement: "동시 요청"
            },
            {
                metric: "비용 효율",
                target: "<$0.01/query",
                measurement: "인프라 + API 비용"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Header */}
            <header className="relative overflow-hidden border-b border-purple-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-8 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                            <Brain className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            RAG 기술 완벽 가이드
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            Retrieval-Augmented Generation: AI의 기억과 지능을 결합하다
                        </p>

                        {/* 핵심 포뮬라 */}
                        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/50 max-w-4xl mx-auto">
                            <div className="text-2xl font-mono font-bold text-purple-400 mb-4">
                                검색(Search) + 맥락(Context) + 생성(Generation) = 정확한 AI
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                <div className="text-center">
                                    <Search className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                                    <div className="text-gray-400">관련 정보 검색</div>
                                    <div className="text-white font-semibold">Vector DB</div>
                                </div>
                                <div className="text-center">
                                    <FileText className="w-6 h-6 mx-auto mb-2 text-green-400" />
                                    <div className="text-gray-400">맥락 주입</div>
                                    <div className="text-white font-semibold">Prompt Engineering</div>
                                </div>
                                <div className="text-center">
                                    <Sparkles className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                                    <div className="text-gray-400">응답 생성</div>
                                    <div className="text-white font-semibold">LLM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-purple-700/50">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex justify-center gap-2 flex-wrap">
                        {[
                            { key: 'intro', label: '개요', icon: <Info className="w-4 h-4" /> },
                            { key: 'realtime', label: '실시간/빅데이터', icon: <Zap className="w-4 h-4" /> },
                            { key: 'education', label: '교육 활용', icon: <GraduationCap className="w-4 h-4" /> },
                            { key: 'vectordb', label: '벡터 DB', icon: <Database className="w-4 h-4" /> },
                            { key: 'springai', label: 'Spring AI', icon: <Code className="w-4 h-4" /> },
                            { key: 'cases', label: '실무 사례', icon: <Building2 className="w-4 h-4" /> }
                        ].map(({ key, label, icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${activeSection === key
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                {icon}
                                <span className="font-semibold">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-8 py-12">
                {/* Introduction Section */}
                {activeSection === 'intro' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">RAG란 무엇인가?</h2>
                            <p className="text-xl text-gray-400">LLM의 한계를 극복하는 혁신적 접근법</p>
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-purple-700/50">
                            <h3 className="text-2xl font-bold mb-6 text-purple-400">핵심 개념</h3>
                            <p className="text-lg text-gray-300 mb-6">
                                RAG(Retrieval-Augmented Generation)는 대규모 언어 모델의 출력을 최적화하여 응답을 생성하기 전에 학습 데이터 소스 외부의 신뢰할 수 있는 지식 베이스를 참조하도록 하는 프로세스입니다.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-slate-900/50 rounded-xl p-6">
                                    <AlertTriangle className="w-8 h-8 text-yellow-400 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">LLM의 한계</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 학습 데이터 시점 제한</li>
                                        <li>• 환각(Hallucination) 문제</li>
                                        <li>• 도메인 특화 지식 부족</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-6">
                                    <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">RAG의 해결책</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 실시간 정보 접근</li>
                                        <li>• 출처 기반 정확성</li>
                                        <li>• 도메인 지식 통합</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900/50 rounded-xl p-6">
                                    <Rocket className="w-8 h-8 text-blue-400 mb-3" />
                                    <h4 className="text-lg font-semibold mb-2">기대 효과</h4>
                                    <ul className="text-sm text-gray-400 space-y-1">
                                        <li>• 정확도 95%+ 달성</li>
                                        <li>• 비용 효율성 10배</li>
                                        <li>• 빠른 구현 가능</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* RAG 아키텍처 패턴 */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-blue-400">RAG 아키텍처 진화</h3>
                            <div className="space-y-4">
                                {Object.entries(architecturePatterns).map(([key, pattern]) => (
                                    <div key={key} className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-xl font-semibold">{pattern.name}</h4>
                                            <span className={`px-3 py-1 rounded-lg text-sm ${pattern.complexity === '낮음' ? 'bg-green-500/20 text-green-400' :
                                                pattern.complexity === '중간' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                                }`}>
                                                복잡도: {pattern.complexity}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500 mb-2">구성 요소</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {Array.isArray(pattern.components) ?
                                                        pattern.components.map((comp, idx) => (
                                                            <span key={idx} className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-300">
                                                                {comp}
                                                            </span>
                                                        )) : pattern.components
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-2">적합한 사용 사례</p>
                                                <p className="text-gray-300">{pattern.useCase}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Real-time & Big Data Section */}
                {activeSection === 'realtime' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{realTimeCapabilities.title}</h2>
                            <p className="text-xl text-gray-400">엔터프라이즈급 성능과 확장성</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {realTimeCapabilities.capabilities.map((cap) => (
                                <div key={cap.id} className={`bg-slate-800/50 rounded-xl p-6 border-2 border-${cap.color}-500/50`}>
                                    <div className={`p-3 rounded-xl bg-${cap.color}-500/20 inline-flex mb-4`}>
                                        {cap.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">{cap.title}</h3>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-${cap.color}-500/20 border border-${cap.color}-500/30 rounded-lg text-${cap.color}-400 text-sm mb-4`}>
                                        {cap.level}
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        {cap.details.map((detail, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5" />
                                                <span className="text-sm text-gray-300">{detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-700 pt-3">
                                        <p className="text-sm text-gray-500 mb-1">성능</p>
                                        <p className="font-semibold text-yellow-400">{cap.performance}</p>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-500 mb-1">실제 사례</p>
                                        <p className="text-gray-300 text-sm">{cap.examples}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/30">
                            <h3 className="text-xl font-bold mb-4 text-red-400">⚠️ 주요 고려사항</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {realTimeCapabilities.limitations.map((limit, idx) => (
                                    <div key={idx} className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-sm text-red-300 mb-2">문제: {limit.issue}</p>
                                        <p className="text-sm text-green-300">해결: {limit.solution}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Education Use Cases Section */}
                {activeSection === 'education' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{educationUseCases.title}</h2>
                            <p className="text-2xl text-green-400 font-semibold">{educationUseCases.verdict}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {educationUseCases.applications.map((app, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-purple-700/50">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                                            {app.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold">{app.name}</h3>
                                    </div>
                                    <ul className="space-y-2 mb-4">
                                        {app.benefits.map((benefit, bidx) => (
                                            <li key={bidx} className="flex items-start gap-2">
                                                <Star className="w-4 h-4 text-yellow-400 mt-0.5" />
                                                <span className="text-sm text-gray-300">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4 border-t border-purple-700/50">
                                        <p className="text-sm text-purple-400 font-semibold">{app.impact}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-800/50 rounded-2xl p-8 border border-green-700/50">
                            <h3 className="text-2xl font-bold mb-6 text-green-400">실제 적용 사례</h3>
                            <div className="space-y-4">
                                {educationUseCases.realWorldCases.map((case_, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-lg">
                                        <div>
                                            <p className="text-sm text-gray-500">기업</p>
                                            <p className="font-semibold text-white">{case_.company}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">활용</p>
                                            <p className="text-gray-300">{case_.usage}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">성과</p>
                                            <p className="text-green-400 font-semibold">{case_.result}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Vector DB Section */}
                {activeSection === 'vectordb' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{vectorDatabases.title}</h2>
                            <p className="text-xl text-gray-400">프로덕션 검증된 벡터 데이터베이스</p>
                        </div>

                        <div className="space-y-6">
                            {vectorDatabases.databases.map((db) => (
                                <div key={db.rank} className={`bg-slate-800/50 rounded-xl p-8 border ${db.rank === 1 ? 'border-yellow-500/50' : 'border-slate-700'
                                    }`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`text-3xl font-bold ${db.rank === 1 ? 'text-yellow-400' :
                                                db.rank === 2 ? 'text-gray-300' :
                                                    db.rank === 3 ? 'text-orange-400' :
                                                        'text-gray-500'
                                                }`}>
                                                #{db.rank}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-3xl">{db.logo}</span>
                                                    <h3 className="text-2xl font-bold">{db.name}</h3>
                                                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                        {db.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">가격</p>
                                            <p className="text-lg font-semibold text-green-400">{db.pricing}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <h4 className="text-sm text-gray-500 mb-2">✅ 장점</h4>
                                            <ul className="space-y-1">
                                                {db.pros.map((pro, idx) => (
                                                    <li key={idx} className="text-sm text-gray-300">• {pro}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-500 mb-2">⚠️ 단점</h4>
                                            <ul className="space-y-1">
                                                {db.cons.map((con, idx) => (
                                                    <li key={idx} className="text-sm text-gray-400">• {con}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-500 mb-2">🎯 적합한 경우</h4>
                                            <p className="text-sm text-gray-300 mb-3">{db.bestFor}</p>
                                            <h4 className="text-sm text-gray-500 mb-2">⚡ 성능</h4>
                                            <p className="text-sm text-yellow-400">{db.performance}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-500/10 rounded-2xl p-6 border border-blue-500/30">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">💡 선택 기준</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {vectorDatabases.selectionCriteria.map((criteria, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm text-gray-300">{criteria}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Spring AI Section */}
                {activeSection === 'springai' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{springAIFeatures.title}</h2>
                            <p className="text-xl text-gray-400">{springAIFeatures.overview}</p>
                        </div>

                        <div className="space-y-8">
                            {springAIFeatures.coreFeatures.map((feature, idx) => (
                                <div key={idx} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold">{feature.feature}</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">{feature.description}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-sm text-gray-500 mb-2">코드 예제</h4>
                                            <pre className="bg-slate-900 rounded-lg p-4 text-xs overflow-x-auto">
                                                <code className="text-green-400">{feature.code}</code>
                                            </pre>
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-500 mb-2">지원 기능</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {feature.supports.map((support, sidx) => (
                                                    <span key={sidx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                        {support}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/30">
                            <h3 className="text-xl font-bold mb-4 text-green-400">Spring AI의 장점</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {springAIFeatures.advantages.map((adv, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                        <span className="text-gray-300">{adv}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Real World Cases Section */}
                {activeSection === 'cases' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{realWorldImplementations.title}</h2>
                            <p className="text-xl text-gray-400">글로벌 기업들의 RAG 구현 전략</p>
                        </div>

                        {realWorldImplementations.categories.map((category, cidx) => (
                            <div key={cidx} className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`p-2 rounded-lg bg-${category.color}-500/20 border border-${category.color}-500/30`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{category.category}</h3>
                                </div>

                                {category.category === "산업별 적용" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {category.cases.map((case_, idx) => (
                                            <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-purple-700/50">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-xl font-bold text-purple-400">{'industry' in case_ ? case_.industry : case_.company}</h4>
                                                    <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 text-sm">
                                                        {'example' in case_ ? case_.example : case_.product}
                                                    </span>
                                                </div>
                                                <div className="space-y-3">
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">활용 사례</p>
                                                        <p className="text-gray-300">{'useCase' in case_ ? case_.useCase : case_.highlight}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mb-1">비즈니스 임팩트</p>
                                                        <p className="text-green-400 font-semibold">{'impact' in case_ ? case_.impact : case_.scale}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {category.cases.map((case_, idx) => (
                                            <div key={idx} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-blue-500/50 transition-all">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-2xl font-bold mb-2">{'company' in case_ ? case_.company : case_.industry}</h4>
                                                        <div className="mb-4">
                                                            <p className="text-sm text-gray-500 mb-1">제품/서비스</p>
                                                            <p className="text-lg text-blue-400 font-semibold">{'product' in case_ ? case_.product : case_.example}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 mb-1">규모</p>
                                                            <p className="text-yellow-400">{'scale' in case_ ? case_.scale : case_.impact}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="mb-4">
                                                            <p className="text-sm text-gray-500 mb-2">기술 스택</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {'tech' in case_ && case_.tech.map((tech, techIdx) => (
                                                                    <span key={techIdx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                                                            <p className="text-sm text-gray-500 mb-1">핵심 차별점</p>
                                                            <p className="text-white">{'highlight' in case_ ? case_.highlight : case_.useCase}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* 성능 메트릭 */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-purple-500/30">
                            <h3 className="text-2xl font-bold mb-6">{performanceMetrics.title}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {performanceMetrics.metrics.map((metric, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl font-bold text-purple-400 mb-2">{metric.target}</div>
                                        <div className="text-lg font-semibold text-white mb-1">{metric.metric}</div>
                                        <div className="text-sm text-gray-400">{metric.measurement}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-10 border border-purple-500/30 text-center">
                    <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">RAG 도입 준비되셨나요?</h3>
                    <p className="text-xl text-purple-300 mb-2">
                        검색 + AI = 무한한 가능성
                    </p>
                    <p className="text-lg text-gray-400 mb-8">
                        지금 시작하면 6개월 내 프로덕션 배포 가능
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/20 border border-purple-500/50 rounded-lg">
                        <Rocket className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-300 font-semibold">POC부터 시작하세요</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RAGManual;