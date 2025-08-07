"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, Zap, Shield, Code, Target, Users, GitBranch, Layers, Settings, AlertTriangle, BookOpen, ExternalLink, TrendingUp, Globe, Cpu, Network, Sparkles, Database, Heart, Eye, Star, Award, Gauge } from 'lucide-react';

const AIDevelopmentManual = () => {
    const [activeSection, setActiveSection] = useState('core');
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

    const toggleExpanded = (key: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    // 핵심 3+3 역량 모델
    const coreCompetencies = {
        mustHave: [
            {
                id: 'architecture',
                title: '아키텍처',
                icon: <Layers className="w-8 h-8" />,
                level: '일류 필수',
                color: 'blue',
                skills: [
                    'Microservices & DDD',
                    'Event-Driven Architecture',
                    'System Design at Scale',
                    'Cloud Native Patterns'
                ],
                impact: '잘못된 아키텍처 = 프로젝트 실패',
                benchmark: 'FAANG 수준 설계 능력'
            },
            {
                id: 'data',
                title: '데이터',
                icon: <Database className="w-8 h-8" />,
                level: '일류 필수',
                color: 'green',
                skills: [
                    'Vector DB & Embeddings',
                    'Real-time Streaming',
                    'Data Pipeline Architecture',
                    'ML/AI Data Engineering'
                ],
                impact: '데이터 = 새로운 석유',
                benchmark: 'Petabyte급 처리 설계'
            },
            {
                id: 'devops',
                title: '데브옵스',
                icon: <Settings className="w-8 h-8" />,
                level: '일류 필수',
                color: 'purple',
                skills: [
                    'GitOps & IaC',
                    'K8s Native Operations',
                    'CI/CD Automation',
                    'Observability Stack'
                ],
                impact: '자동화 없음 = 경쟁력 상실',
                benchmark: '배포 주기 < 1시간'
            }
        ],
        differentiators: [
            {
                id: 'passion',
                title: '열정',
                icon: <Heart className="w-8 h-8" />,
                color: 'red',
                description: '기술에 대한 순수한 열정과 끊임없는 학습',
                metrics: '주 10시간+ 자기개발'
            },
            {
                id: 'judgment',
                title: '판단력',
                icon: <Eye className="w-8 h-8" />,
                color: 'yellow',
                description: '비즈니스 가치와 기술적 우수성의 균형',
                metrics: 'ROI 기반 의사결정'
            },
            {
                id: 'ai',
                title: 'AI 활용',
                icon: <Sparkles className="w-8 h-8" />,
                color: 'indigo',
                description: 'AI를 도구로 활용하되 원리 이해 필수',
                metrics: '생산성 3배 향상'
            }
        ]
    };

    // 생존 공식 도식
    const survivalFormula = {
        equation: "(아키텍처 × 데이터 × 데브옵스)^일류 + (열정 + 판단력 + AI활용) = 생존",
        breakdown: [
            { part: "기본 역량", formula: "아키텍처 × 데이터 × 데브옵스", weight: "70%" },
            { part: "차별화 요소", formula: "열정 + 판단력 + AI활용", weight: "30%" },
            { part: "결과", formula: "시장 가치 10배 상승", weight: "100%" }
        ]
    };

    const skillLevels = {
        title: "2025년 개발자 역량 수준",
        levels: [
            {
                level: "Entry (퇴출 위험)",
                description: "AI에 대체됨",
                skills: "단순 코딩, 검색 복붙",
                salary: "3000-4000만",
                survival: "10%"
            },
            {
                level: "Mid (생존 경계)",
                description: "AI와 경쟁",
                skills: "프레임워크 활용, 기본 설계",
                salary: "5000-7000만",
                survival: "40%"
            },
            {
                level: "Senior (안정권)",
                description: "AI를 활용",
                skills: "아키텍처 설계, 데이터 파이프라인",
                salary: "8000-1.2억",
                survival: "70%"
            },
            {
                level: "Expert (독보적)",
                description: "AI를 지휘",
                skills: "3대 역량 일류 + 차별화 요소",
                salary: "1.5억+",
                survival: "95%"
            }
        ]
    };

    const techStack2025 = {
        essential: {
            title: "2025 필수 기술 스택",
            categories: [
                {
                    name: "Architecture",
                    icon: <Layers className="w-5 h-5" />,
                    techs: ["Microservices", "Event Sourcing", "CQRS", "Saga Pattern", "Service Mesh"],
                    tools: ["Spring Cloud", "Istio", "Dapr", "Temporal"]
                },
                {
                    name: "Data & AI",
                    icon: <Database className="w-5 h-5" />,
                    techs: ["Vector DB", "Stream Processing", "Data Mesh", "Feature Store"],
                    tools: ["Pinecone", "Kafka", "Spark", "Feast", "dbt"]
                },
                {
                    name: "DevOps",
                    icon: <Settings className="w-5 h-5" />,
                    techs: ["GitOps", "Progressive Delivery", "Chaos Engineering", "FinOps"],
                    tools: ["ArgoCD", "Flagger", "Litmus", "Kubecost"]
                },
                {
                    name: "AI Integration",
                    icon: <Sparkles className="w-5 h-5" />,
                    techs: ["LLM Ops", "RAG", "Prompt Engineering", "Fine-tuning"],
                    tools: ["LangChain", "LlamaIndex", "Weights & Biases", "MLflow"]
                }
            ]
        }
    };

    const learningPath = {
        phases: [
            {
                phase: "Foundation (3개월)",
                focus: "기본기 다지기",
                topics: [
                    "System Design 인터뷰 준비",
                    "분산 시스템 이론",
                    "데이터베이스 내부 구조",
                    "네트워크 프로토콜 심화"
                ],
                outcome: "원리 이해"
            },
            {
                phase: "Core Skills (6개월)",
                focus: "3대 핵심 역량",
                topics: [
                    "Kubernetes 운영 (CKA 취득)",
                    "클라우드 아키텍처 (SA Pro)",
                    "실시간 데이터 파이프라인",
                    "MLOps 파이프라인 구축"
                ],
                outcome: "실무 역량"
            },
            {
                phase: "Excellence (지속)",
                focus: "일류 도약",
                topics: [
                    "오픈소스 기여",
                    "기술 블로그 운영",
                    "컨퍼런스 발표",
                    "멘토링 & 코칭"
                ],
                outcome: "시장 인정"
            }
        ]
    };

    const realWorldCases = [
        {
            company: "Netflix",
            challenge: "일 10억+ 스트리밍 요청",
            solution: "Microservices + Chaos Engineering",
            techStack: ["Spring Boot", "Cassandra", "Kafka", "Spinnaker"],
            lesson: "복잡도 관리가 핵심"
        },
        {
            company: "Uber",
            challenge: "실시간 매칭 & 가격 책정",
            solution: "Event-Driven + ML Pipeline",
            techStack: ["Go", "Kafka", "Flink", "TensorFlow"],
            lesson: "데이터가 비즈니스 핵심"
        },
        {
            company: "Airbnb",
            challenge: "글로벌 배포 & 실험",
            solution: "Feature Flags + A/B Testing",
            techStack: ["Ruby", "React", "Kubernetes", "Datadog"],
            lesson: "빠른 실험과 학습"
        }
    ];

    const careerAdvice = {
        dos: [
            "매일 1시간 이상 학습",
            "실제 프로덕션 경험 쌓기",
            "오픈소스 기여로 포트폴리오",
            "영어 문서 읽기 습관화",
            "네트워킹과 멘토 찾기"
        ],
        donts: [
            "프레임워크만 배우기",
            "이론만 공부하기",
            "혼자만 일하기",
            "트렌드만 쫓기",
            "기본기 무시하기"
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Header */}
            <header className="relative overflow-hidden border-b border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-blue-600/10 to-purple-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-8 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl mb-6 shadow-2xl">
                            <Star className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
                            AI 시대 개발자 생존 전략
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                            아키텍처 × 데이터 × 데브옵스 = 일류 필수
                        </p>

                        {/* 핵심 공식 */}
                        <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/50 max-w-4xl mx-auto">
                            <div className="text-2xl font-mono font-bold text-yellow-400 mb-4">
                                {survivalFormula.equation}
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                                {survivalFormula.breakdown.map((item, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-gray-400 mb-1">{item.part}</div>
                                        <div className="text-white font-semibold">{item.weight}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-700">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex justify-center gap-2">
                        {[
                            { key: 'core', label: '핵심 역량', icon: <Star className="w-4 h-4" /> },
                            { key: 'levels', label: '역량 수준', icon: <Gauge className="w-4 h-4" /> },
                            { key: 'stack', label: '기술 스택', icon: <Layers className="w-4 h-4" /> },
                            { key: 'path', label: '학습 경로', icon: <TrendingUp className="w-4 h-4" /> },
                            { key: 'cases', label: '실전 사례', icon: <Award className="w-4 h-4" /> }
                        ].map(({ key, label, icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 ${activeSection === key
                                        ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
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
                {/* Core Competencies Section */}
                {activeSection === 'core' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">3+3 핵심 역량 모델</h2>
                            <p className="text-xl text-gray-400">일류 없이는 생존 불가</p>
                        </div>

                        {/* 필수 3대 역량 */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-red-400">
                                <AlertTriangle className="inline w-6 h-6 mr-2" />
                                일류 필수 역량 (하나라도 부족하면 도태)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {coreCompetencies.mustHave.map((comp) => (
                                    <div key={comp.id} className={`bg-gray-800/50 rounded-xl p-6 border-2 border-${comp.color}-500/50 hover:border-${comp.color}-400 transition-all`}>
                                        <div className={`p-3 rounded-xl bg-${comp.color}-500/20 inline-flex mb-4`}>
                                            {comp.icon}
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">{comp.title}</h4>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm mb-4">
                                            {comp.level}
                                        </div>
                                        <p className="text-yellow-400 text-sm font-semibold mb-4">{comp.impact}</p>
                                        <div className="space-y-2 mb-4">
                                            {comp.skills.map((skill, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                                                    <span className="text-sm text-gray-300">{skill}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
                                            기준: {comp.benchmark}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 차별화 요소 */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6 text-green-400">
                                <Zap className="inline w-6 h-6 mr-2" />
                                차별화 요소 (탁월함의 조건)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {coreCompetencies.differentiators.map((diff) => (
                                    <div key={diff.id} className={`bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:bg-gray-800/50 transition-all`}>
                                        <div className={`p-3 rounded-xl bg-${diff.color}-500/20 inline-flex mb-4`}>
                                            {diff.icon}
                                        </div>
                                        <h4 className="text-xl font-bold mb-3">{diff.title}</h4>
                                        <p className="text-gray-300 mb-3">{diff.description}</p>
                                        <div className="text-sm text-blue-400">
                                            <TrendingUp className="inline w-4 h-4 mr-1" />
                                            {diff.metrics}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Skill Levels Section */}
                {activeSection === 'levels' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{skillLevels.title}</h2>
                            <p className="text-xl text-gray-400">당신은 어느 레벨인가?</p>
                        </div>

                        <div className="space-y-6">
                            {skillLevels.levels.map((level, idx) => (
                                <div key={idx} className={`bg-gray-800/50 rounded-xl p-6 border ${idx === 0 ? 'border-red-500/50' :
                                        idx === 1 ? 'border-yellow-500/50' :
                                            idx === 2 ? 'border-blue-500/50' : 'border-green-500/50'
                                    } hover:bg-gray-800/70 transition-all`}>
                                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                                        <div>
                                            <h3 className="text-xl font-bold">{level.level}</h3>
                                            <p className="text-gray-400 text-sm">{level.description}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-sm text-gray-300">{level.skills}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">연봉</p>
                                            <p className="font-semibold">{level.salary}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">생존률</p>
                                            <p className={`font-bold text-lg ${parseInt(level.survival) >= 70 ? 'text-green-400' :
                                                    parseInt(level.survival) >= 40 ? 'text-yellow-400' : 'text-red-400'
                                                }`}>{level.survival}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-bold mb-4">핵심 인사이트</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                                    <span>상위 10%만이 AI 시대에 경쟁력 유지</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                                    <span>3대 핵심 역량 중 하나라도 부족하면 중급 수준 한계</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-yellow-400 mt-0.5" />
                                    <span>차별화 요소가 없으면 AI와 직접 경쟁</span>
                                </li>
                            </ul>
                        </div>
                    </section>
                )}

                {/* Tech Stack Section */}
                {activeSection === 'stack' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">{techStack2025.essential.title}</h2>
                            <p className="text-xl text-gray-400">모르면 뒤처지는 기술들</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {techStack2025.essential.categories.map((cat, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                                            {cat.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold">{cat.name}</h3>
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-2">핵심 기술</p>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.techs.map((tech, techIdx) => (
                                                <span key={techIdx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-2">주요 도구</p>
                                        <div className="flex flex-wrap gap-2">
                                            {cat.tools.map((tool, toolIdx) => (
                                                <span key={toolIdx} className="px-3 py-1 bg-gray-700/50 rounded-lg text-gray-300 text-sm">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Learning Path Section */}
                {activeSection === 'path' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">일류 개발자 학습 경로</h2>
                            <p className="text-xl text-gray-400">체계적 성장 로드맵</p>
                        </div>

                        <div className="space-y-6">
                            {learningPath.phases.map((phase, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 relative">
                                    <div className="absolute -left-3 top-8 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-blue-400">{phase.phase}</h3>
                                            <p className="text-gray-500">{phase.focus}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <ul className="space-y-2">
                                                {phase.topics.map((topic, topicIdx) => (
                                                    <li key={topicIdx} className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
                                                        <span className="text-sm text-gray-300">{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                                                <Target className="w-4 h-4 text-green-400" />
                                                <span className="text-green-400 font-semibold">{phase.outcome}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/30">
                                <h4 className="text-lg font-bold text-green-400 mb-4">✅ 해야 할 것</h4>
                                <ul className="space-y-2">
                                    {careerAdvice.dos.map((item, idx) => (
                                        <li key={idx} className="text-gray-300 text-sm">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
                                <h4 className="text-lg font-bold text-red-400 mb-4">❌ 피해야 할 것</h4>
                                <ul className="space-y-2">
                                    {careerAdvice.donts.map((item, idx) => (
                                        <li key={idx} className="text-gray-300 text-sm">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* Real World Cases Section */}
                {activeSection === 'cases' && (
                    <section className="space-y-12">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold mb-4">실전 아키텍처 사례</h2>
                            <p className="text-xl text-gray-400">글로벌 기업의 기술 전략</p>
                        </div>

                        <div className="space-y-6">
                            {realWorldCases.map((case_, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{case_.company}</h3>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-1">도전과제</p>
                                                <p className="text-yellow-400 font-semibold">{case_.challenge}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500 mb-1">솔루션</p>
                                                <p className="text-green-400">{case_.solution}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mb-4">
                                                <p className="text-sm text-gray-500 mb-2">기술 스택</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {case_.techStack.map((tech, techIdx) => (
                                                        <span key={techIdx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                                                <p className="text-sm text-gray-500 mb-1">핵심 교훈</p>
                                                <p className="text-white font-semibold">{case_.lesson}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <div className="mt-16 bg-gradient-to-r from-red-600/20 to-purple-600/20 rounded-2xl p-10 border border-red-500/30 text-center">
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-4">최종 경고</h3>
                    <p className="text-xl text-red-300 mb-2">
                        아키텍처, 데이터, 데브옵스 - 하나라도 일류가 아니면
                    </p>
                    <p className="text-2xl font-bold text-white mb-8">
                        5년 내 시장에서 퇴출
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-300 font-semibold">지금 시작하지 않으면 늦습니다</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDevelopmentManual;