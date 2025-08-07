"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Brain, Zap, Shield, Code, Target, Users, GitBranch, Layers, Settings, AlertTriangle, BookOpen, ExternalLink, TrendingUp, Globe, Cpu, Network, Sparkles } from 'lucide-react';

const AIDevelopmentManual = () => {
    const [activeSection, setActiveSection] = useState('principles');
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpanded = (key) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const devPrinciples = [
        {
            id: 1,
            icon: <Brain className="w-6 h-6" />,
            title: "핵심 원리 완벽 이해",
            subtitle: "Mastery of Core Principles",
            warning: "대충 구현하면 그냥 개망함",
            description: "AI 도구를 사용하더라도 기본기가 없으면 기술 부채만 늘어납니다",
            details: [
                "알고리즘과 자료구조의 깊은 이해 필수",
                "프레임워크가 아닌 원리 중심의 학습",
                "AI가 생성한 코드의 작동 원리 완벽 파악",
                "보안 취약점과 성능 이슈 자체 진단 능력"
            ],
            stats: "AI 생성 코드의 30-50%는 수정이 필요",
            color: "red"
        },
        {
            id: 2,
            icon: <Layers className="w-6 h-6" />,
            title: "아키텍처 설계 역량",
            subtitle: "Architecture Design Capability",
            warning: "아키텍처 모르면 기능 확장 불가",
            description: "견고한 아키텍처 없이는 AI가 생성한 코드도 무용지물입니다",
            details: [
                "마이크로서비스 아키텍처 필수 이해",
                "도메인 주도 설계(DDD) 원칙 적용",
                "이벤트 기반 아키텍처 설계 능력",
                "확장성과 유지보수성 고려한 설계"
            ],
            stats: "85%의 기업이 마이크로서비스 채택",
            color: "blue"
        },
        {
            id: 3,
            icon: <Shield className="w-6 h-6" />,
            title: "비용 대비 가치 최적화",
            subtitle: "Cost-Value Optimization",
            warning: "좋은 건 다 비싸서 못씀",
            description: "엔터프라이즈 솔루션의 높은 비용과 러닝커브를 고려한 선택",
            details: [
                "오픈소스와 상용 솔루션의 균형",
                "클라우드 비용 최적화 전략",
                "기술 부채 vs 빠른 개발 균형",
                "MVP 접근법과 점진적 개선"
            ],
            stats: "클라우드 비용 최적화로 30% 절감 가능",
            color: "green"
        },
        {
            id: 4,
            icon: <GitBranch className="w-6 h-6" />,
            title: "모듈화된 개발 관리",
            subtitle: "Modular Development",
            warning: "개발 스펙트럼 넓어짐",
            description: "프론트엔드부터 AI/ML까지 전체 스택의 모듈화 관리",
            details: [
                "컴포넌트 기반 개발 전략",
                "재사용 가능한 코드 라이브러리 구축",
                "CI/CD 파이프라인 자동화",
                "모노레포 vs 멀티레포 전략"
            ],
            stats: "모듈화로 개발 속도 72% 향상",
            color: "indigo"
        },
        {
            id: 5,
            icon: <TrendingUp className="w-6 h-6" />,
            title: "최신 아키텍처 = 상식",
            subtitle: "Modern Architecture as Common Sense",
            warning: "힙한게 아니라 구구단임",
            description: "2025년 현재, 모던 아키텍처는 선택이 아닌 필수입니다",
            details: [
                "서버리스와 엣지 컴퓨팅",
                "이벤트 드리븐 아키텍처",
                "GraphQL과 gRPC 활용",
                "옵저버빌리티와 분산 추적"
            ],
            stats: "모던 아키텍처 미적용시 5배 느린 개발",
            color: "purple"
        }
    ];

    const vibeCoding = {
        title: "Vibe Coding - AI 협업 개발의 새로운 패러다임",
        description: "개발자가 코드를 직접 작성하는 대신 AI를 가이드하는 '코드 디렉터'로 진화",
        benefits: [
            { label: "생산성 향상", value: "81%", icon: <Zap /> },
            { label: "작업 속도", value: "55%", icon: <TrendingUp /> },
            { label: "완료 시간 단축", value: "26%", icon: <Target /> }
        ],
        practices: [
            {
                title: "Intent-Driven Development",
                desc: "자연어로 의도를 전달하고 AI가 코드 생성",
                tools: ["GitHub Copilot", "Claude Code", "Cursor"]
            },
            {
                title: "AI as Team Member",
                desc: "AI를 팀원으로 대하며 코드 리뷰와 아키텍처 제안 수렴",
                tools: ["Amazon Q Developer", "Tabnine", "Kite"]
            },
            {
                title: "Human Oversight",
                desc: "AI 생성 코드의 보안, 성능, 비즈니스 로직 검증",
                tools: ["DeepCode", "Snyk", "SonarQube"]
            }
        ]
    };

    const modernStack = [
        {
            category: "AI/ML Integration",
            icon: <Cpu className="w-5 h-5" />,
            technologies: ["LangChain", "Vector DB", "OpenAI API", "Hugging Face", "TensorFlow", "PyTorch"],
            trend: "2025년 80% 프로젝트가 AI 도구 통합"
        },
        {
            category: "Microservices & Cloud",
            icon: <Network className="w-5 h-5" />,
            technologies: ["Kubernetes", "Docker", "Service Mesh", "API Gateway", "Serverless", "Edge Computing"],
            trend: "마이크로서비스 시장 연 22.7% 성장"
        },
        {
            category: "Real-time Communication",
            icon: <Zap className="w-5 h-5" />,
            technologies: ["WebSocket", "gRPC", "GraphQL", "Redis Pub/Sub", "Apache Kafka", "Event Streaming"],
            trend: "실시간 처리 요구 300% 증가"
        },
        {
            category: "DevOps & Automation",
            icon: <Settings className="w-5 h-5" />,
            technologies: ["GitHub Actions", "ArgoCD", "Terraform", "Prometheus", "Grafana", "GitOps"],
            trend: "CI/CD 자동화로 배포 시간 80% 단축"
        }
    ];

    const collaborationPrinciples = [
        {
            title: "감정은 집에, 머리만 회사에",
            icon: "🧠",
            description: "데이터 기반 의사결정과 객관적 피드백",
            practices: [
                "코드 리뷰는 코드에 대한 것, 사람에 대한 것이 아님",
                "건설적 비판과 개선 제안 중심",
                "에고 없는 프로그래밍 문화"
            ]
        },
        {
            title: "빠른 실패와 학습",
            icon: "⚡",
            description: "MVP 접근법과 지속적 개선",
            practices: [
                "2주 스프린트 사이클",
                "A/B 테스팅과 데이터 검증",
                "실패를 학습 기회로 전환"
            ]
        },
        {
            title: "지식 공유 = 팀 성장",
            icon: "📚",
            description: "개인의 성장이 팀의 성장",
            practices: [
                "주간 기술 세미나",
                "페어 프로그래밍 세션",
                "내부 기술 블로그 운영"
            ]
        }
    ];

    const references = [
        {
            category: "AI-Driven Development",
            items: [
                {
                    title: "AI-Driven Development: Revolutionizing Software In 2025",
                    source: "Groove Technology",
                    insight: "AI 도구 사용으로 수동 코딩 시간 30-50% 감소, 2025년까지 80% 프로젝트가 AI 통합 예상",
                    url: "https://groovetechnology.com/blog/software-development/ai-driven-development/"
                },
                {
                    title: "The Vibe Coding Shift in 2025",
                    source: "Upskillist",
                    insight: "개발자의 역할이 코더에서 AI 협업자로 전환, 81% 생산성 향상 달성",
                    url: "https://www.upskillist.com/blog/ai-driven-revolution-in-software-development"
                },
                {
                    title: "AI-Driven Development Life Cycle",
                    source: "AWS DevOps Blog",
                    insight: "AI를 중심 협업자로 포지셔닝, 인간 감독과 동적 팀 협업 강조",
                    url: "https://aws.amazon.com/blogs/devops/ai-driven-development-life-cycle/"
                }
            ]
        },
        {
            category: "Microservices Architecture",
            items: [
                {
                    title: "Microservices Architecture in 2025",
                    source: "Nucamp",
                    insight: "적절한 컨테이너화로 99.9% 가동시간 달성, 배포 시간 80% 단축",
                    url: "https://www.nucamp.co/blog/microservices-architecture-in-2025"
                },
                {
                    title: "Microservices Architecture Guide",
                    source: "vFunction",
                    insight: "독립적 배포와 확장, 기술 다양성, 장애 격리의 핵심 이점",
                    url: "https://vfunction.com/blog/microservices-architecture-guide/"
                },
                {
                    title: "Java Microservices Best Practices",
                    source: "Medium - Harsh Shah",
                    insight: "도메인 주도 설계와 팀 자율성의 중요성, Conway's Law 적용",
                    url: "https://medium.com/@shahharsh172/java-microservices-architecture-guide"
                }
            ]
        },
        {
            category: "Team Collaboration",
            items: [
                {
                    title: "7 Collaboration Methods in 2025",
                    source: "OpenArc",
                    insight: "공통 목표를 가진 팀이 5배 높은 성과, 투명성과 일관된 프로세스가 핵심",
                    url: "https://www.openarc.net/software-development-teams-collaboration-methods-2025/"
                },
                {
                    title: "Software Team Collaboration Best Practices",
                    source: "GitLab",
                    insight: "비동기 커뮤니케이션과 자동화 도구로 개발자 시간 5-10% 절약",
                    url: "https://about.gitlab.com/topics/version-control/software-team-collaboration/"
                },
                {
                    title: "Why Team Collaboration is Vital",
                    source: "DX",
                    insight: "360도 피드백과 회고 미팅으로 지속적 개선 문화 구축",
                    url: "https://getdx.com/blog/software-collaboration/"
                }
            ]
        }
    ];

    const learningResources = [
        {
            topic: "AI & ML for Developers",
            level: "필수",
            resources: [
                { name: "Andrej Karpathy's LLM Tutorial", type: "Video", duration: "1시간" },
                { name: "LangChain Documentation", type: "Docs", duration: "지속 학습" },
                { name: "Hugging Face Course", type: "Course", duration: "8주" }
            ]
        },
        {
            topic: "Microservices Architecture",
            level: "필수",
            resources: [
                { name: "Microservices.io Patterns", type: "Guide", duration: "2주" },
                { name: "Spring Boot Microservices", type: "Course", duration: "4주" },
                { name: "Kubernetes in Action", type: "Book", duration: "3주" }
            ]
        },
        {
            topic: "DevOps & CI/CD",
            level: "필수",
            resources: [
                { name: "GitHub Actions Mastery", type: "Course", duration: "1주" },
                { name: "Terraform Up & Running", type: "Book", duration: "2주" },
                { name: "GitOps Principles", type: "Guide", duration: "1주" }
            ]
        }
    ];

    const summaryInsights = {
        title: "AI 바이브 코딩 시대의 역설",
        key: "정통파가 되지 못할 바에야 개발을 그만두는게 나음",
        insights: [
            {
                icon: "🚀",
                title: "생산성 = 화력",
                desc: "모던 개발 패러다임을 통한 생산성 확대는 전쟁에서의 화력만큼 중요"
            },
            {
                icon: "👥",
                title: "협업 > 개인",
                desc: "협업 제대로 못하는 조직은 뛰어난 개인에도 미치지 못함"
            },
            {
                icon: "📈",
                title: "지속적 학습",
                desc: "AI 시대에는 도구가 아닌 원리를 배우는 자가 살아남음"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Header */}
            <header className="relative overflow-hidden border-b border-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
                <div className="relative max-w-7xl mx-auto px-8 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            AI 시대 개발 원칙
                        </h1>
                        <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            2025년, 정통파만이 살아남는 개발 생태계 가이드
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <div className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                <AlertTriangle className="inline w-5 h-5 mr-2 text-red-400" />
                                <span className="text-red-300">대충하면 망함</span>
                            </div>
                            <div className="px-6 py-3 bg-green-500/20 border border-green-500/50 rounded-lg">
                                <TrendingUp className="inline w-5 h-5 mr-2 text-green-400" />
                                <span className="text-green-300">제대로하면 성공</span>
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
                            { key: 'principles', label: '5대 원칙', icon: <Brain className="w-4 h-4" /> },
                            { key: 'vibe', label: 'Vibe Coding', icon: <Sparkles className="w-4 h-4" /> },
                            { key: 'stack', label: '모던 스택', icon: <Layers className="w-4 h-4" /> },
                            { key: 'collaboration', label: '협업 문화', icon: <Users className="w-4 h-4" /> },
                            { key: 'references', label: '참고자료', icon: <BookOpen className="w-4 h-4" /> }
                        ].map(({ key, label, icon }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${activeSection === key
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
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

            <div className="max-w-7xl mx-auto px-8 py-16">
                {/* 5대 원칙 Section */}
                {activeSection === 'principles' && (
                    <section className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">AI 시대 개발 5대 원칙</h2>
                            <p className="text-xl text-gray-400">역설적으로 기본기가 더 중요해진 시대</p>
                        </div>

                        <div className="grid gap-6">
                            {devPrinciples.map((principle) => (
                                <div
                                    key={principle.id}
                                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-br from-${principle.color}-500/20 to-${principle.color}-600/20 border border-${principle.color}-500/50`}>
                                                    {principle.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-white mb-1">
                                                        {principle.id}. {principle.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 uppercase tracking-wider">{principle.subtitle}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleExpanded(`principle-${principle.id}`)}
                                                    className="text-gray-400 hover:text-white transition-colors p-2"
                                                >
                                                    {expandedItems[`principle-${principle.id}`] ?
                                                        <ChevronDown className="w-6 h-6" /> :
                                                        <ChevronRight className="w-6 h-6" />
                                                    }
                                                </button>
                                            </div>

                                            <div className="mb-4">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 mb-3">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    <span className="font-semibold">{principle.warning}</span>
                                                </div>
                                                <p className="text-gray-300 text-lg">{principle.description}</p>
                                            </div>

                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
                                                <TrendingUp className="w-4 h-4" />
                                                <span className="text-sm">{principle.stats}</span>
                                            </div>

                                            {expandedItems[`principle-${principle.id}`] && (
                                                <div className="mt-6 pt-6 border-t border-gray-700 space-y-3">
                                                    {principle.details.map((detail, idx) => (
                                                        <div key={idx} className="flex items-start gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2"></div>
                                                            <span className="text-gray-300">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Vibe Coding Section */}
                {activeSection === 'vibe' && (
                    <section className="space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">{vibeCoding.title}</h2>
                            <p className="text-xl text-gray-400 max-w-3xl mx-auto">{vibeCoding.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {vibeCoding.benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-700 text-center">
                                    <div className="text-blue-400 mb-4 flex justify-center">{benefit.icon}</div>
                                    <div className="text-4xl font-bold text-white mb-2">{benefit.value}</div>
                                    <div className="text-gray-400">{benefit.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-6">핵심 실천 방법</h3>
                            {vibeCoding.practices.map((practice, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <h4 className="text-xl font-semibold text-white mb-3">{practice.title}</h4>
                                    <p className="text-gray-300 mb-4">{practice.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {practice.tools.map((tool, toolIdx) => (
                                            <span key={toolIdx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Modern Stack Section */}
                {activeSection === 'stack' && (
                    <section className="space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">2025 필수 기술 스택</h2>
                            <p className="text-xl text-gray-400">모던 아키텍처는 선택이 아닌 필수</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {modernStack.map((stack, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                                            {stack.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold">{stack.category}</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {stack.technologies.map((tech, techIdx) => (
                                            <span key={techIdx} className="px-3 py-1 bg-gray-700/50 rounded-lg text-gray-300 text-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-sm text-blue-400 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" />
                                        {stack.trend}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Collaboration Section */}
                {activeSection === 'collaboration' && (
                    <section className="space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">협업 문화 원칙</h2>
                            <p className="text-xl text-gray-400">개인보다 강한 팀의 시너지</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {collaborationPrinciples.map((principle, idx) => (
                                <div key={idx} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                                    <div className="text-4xl mb-4 text-center">{principle.icon}</div>
                                    <h3 className="text-xl font-bold mb-3 text-center">{principle.title}</h3>
                                    <p className="text-gray-400 mb-6 text-center">{principle.description}</p>
                                    <div className="space-y-2">
                                        {principle.practices.map((practice, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>
                                                <span className="text-sm text-gray-300">{practice}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-bold mb-6">핵심 통찰</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {summaryInsights.insights.map((insight, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-3xl mb-3">{insight.icon}</div>
                                        <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
                                        <p className="text-gray-400 text-sm">{insight.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* References Section */}
                {activeSection === 'references' && (
                    <section className="space-y-12">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">검증된 참고자료</h2>
                            <p className="text-xl text-gray-400">2025년 최신 연구와 실무 사례</p>
                        </div>

                        {references.map((category, idx) => (
                            <div key={idx} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                                <h3 className="text-2xl font-bold mb-6 text-blue-400">{category.category}</h3>
                                <div className="space-y-4">
                                    {category.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                                            <div className="flex items-start justify-between mb-3">
                                                <h4 className="text-lg font-semibold text-white flex-1">{item.title}</h4>
                                                <ExternalLink className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <p className="text-sm text-gray-500 mb-2">{item.source}</p>
                                            <p className="text-gray-300 mb-4">{item.insight}</p>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                                            >
                                                자세히 보기 <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                            <h3 className="text-2xl font-bold mb-6 text-purple-400">학습 리소스</h3>
                            <div className="space-y-6">
                                {learningResources.map((resource, idx) => (
                                    <div key={idx} className="border-l-4 border-purple-500 pl-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h4 className="text-lg font-semibold">{resource.topic}</h4>
                                            <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-purple-400 text-xs">
                                                {resource.level}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {resource.resources.map((res, resIdx) => (
                                                <div key={resIdx} className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                                                    <div className="font-medium text-white text-sm mb-1">{res.name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {res.type} · {res.duration}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Summary Box */}
                <div className="mt-16 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-2xl p-8 border border-red-500/30">
                    <div className="text-center">
                        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-4">{summaryInsights.title}</h3>
                        <p className="text-xl text-red-300 mb-6">{summaryInsights.key}</p>
                        <div className="flex justify-center gap-4">
                            <a href="https://nexus-task-master.shop/pilot-project/vibe-coding-conecpt"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors inline-flex items-center gap-2">
                                Vibe Coding 자세히 보기 <ExternalLink className="w-4 h-4" />
                            </a>
                            <a href="https://nexus-task-master.shop/pilot-project/automatic-consulting-system"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors inline-flex items-center gap-2">
                                자동 컨설팅 시스템 <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIDevelopmentManual;