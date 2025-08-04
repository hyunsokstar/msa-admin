"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, Target, Users, Zap, Code, Cloud, Brain, Settings, GitBranch, Monitor, Database, Smartphone, ExternalLink } from 'lucide-react';

const MSAPrinciplesManual = () => {
    const [activeSection, setActiveSection] = useState('paradigms');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpanded = (key: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const paradigms = [
        {
            id: 1,
            title: "아키텍처",
            subtitle: "Architecture",
            description: "체계적이고 확장 가능한 시스템 설계",
            details: [
                "마이크로서비스 아키텍처 기반 설계",
                "확장성과 유지보수성을 고려한 구조",
                "도메인 중심의 모듈화",
                "느슨한 결합과 높은 응집도 추구"
            ],
            emoji: "🏗️",
            color: "slate"
        },
        {
            id: 2,
            title: "포커싱",
            subtitle: "Focusing",
            description: "핵심 가치에 집중하는 선택과 집중",
            details: [
                "비즈니스 임팩트가 높은 영역 우선순위",
                "기술 부채 해결보다 고객 가치 창출",
                "완벽함보다는 빠른 검증과 개선",
                "제한된 자원의 효율적 활용"
            ],
            emoji: "🎯",
            color: "blue"
        },
        {
            id: 3,
            title: "협력",
            subtitle: "Collaboration",
            description: "팀워크와 상호 협력을 통한 시너지 창출",
            details: [
                "개방적 커뮤니케이션과 지식 공유",
                "크로스 펑셔널 팀워크",
                "코드 리뷰와 페어 프로그래밍",
                "집단 지성을 활용한 문제 해결"
            ],
            emoji: "🤝",
            color: "gray"
        }
    ];

    const maxims = [
        {
            id: 1,
            title: "감정은 집에 두고 머리만 가지고 와라",
            description: "객관적이고 논리적인 사고로 업무에 접근",
            details: [
                "개인적 감정보다는 데이터와 근거 기반 의사결정",
                "건설적인 피드백과 비판적 사고 환영",
                "문제 해결 시 감정적 판단 배제",
                "프로페셔널한 커뮤니케이션 유지"
            ],
            emoji: "🧠",
            color: "slate"
        },
        {
            id: 2,
            title: "당위의 혁신 + 고객 중심 주의",
            description: "기존 관습을 재검토하고 고객 가치 최우선",
            details: [
                "기존 방식에 대한 지속적인 의문과 개선",
                "고객의 실제 요구사항과 가치 중심 개발",
                "비즈니스 임팩트를 고려한 우선순위 설정",
                "사용자 경험(UX) 최적화"
            ],
            emoji: "👥",
            color: "blue"
        },
        {
            id: 3,
            title: "많이 만들고 부수기",
            description: "빠른 프로토타이핑과 반복적 개선",
            details: [
                "MVP(Minimum Viable Product) 접근법",
                "빠른 실패와 학습을 통한 개선",
                "지속적인 리팩토링과 코드 개선",
                "실험적 접근과 A/B 테스팅"
            ],
            emoji: "⚡",
            color: "gray"
        }
    ];

    const learningAreas = [
        {
            id: 1,
            title: "콜센터 VoIP 핵심 기술",
            category: "Core Tech",
            icon: <Monitor className="w-5 h-5" />,
            skills: ["SIP Protocol", "WebRTC", "Asterisk", "FreeSWITCH", "Voice Codecs", "QoS"],
            color: "slate"
        },
        {
            id: 2,
            title: "실시간 통신 기술",
            category: "Real-time",
            icon: <Zap className="w-5 h-5" />,
            skills: ["WebSocket", "Redis Pub/Sub", "Socket.IO", "SSE", "Message Queue", "Event Streaming"],
            color: "blue"
        },
        {
            id: 3,
            title: "Spring Boot 최신 생태계",
            category: "Backend",
            icon: <Code className="w-5 h-5" />,
            skills: ["Spring Boot 3.x", "Security 6", "Data JPA", "Cloud Gateway", "WebFlux", "GraalVM"],
            color: "indigo"
        },
        {
            id: 4,
            title: "최신 고급 프론트엔드 기술",
            category: "Frontend",
            icon: <Smartphone className="w-5 h-5" />,
            skills: ["React 18+", "Next.js 14", "TypeScript 5", "Tailwind CSS", "Zustand", "TanStack Query"],
            color: "gray"
        },
        {
            id: 5,
            title: "Tauri 등 데스크톱 앱 기술",
            category: "Desktop",
            icon: <Settings className="w-5 h-5" />,
            skills: ["Tauri", "Electron", "Native APIs", "Cross-platform", "Auto-update", "System Tray"],
            color: "slate"
        },
        {
            id: 6,
            title: "AI, ML, DL 등 최신 기술",
            category: "AI/ML",
            icon: <Brain className="w-5 h-5" />,
            skills: ["TensorFlow", "PyTorch", "LangChain", "Vector DB", "Transformers", "OpenAI API"],
            color: "blue"
        },
        {
            id: 7,
            title: "클라우드 네이티브 기술",
            category: "Cloud",
            icon: <Cloud className="w-5 h-5" />,
            skills: ["AWS", "Azure", "GCP", "Serverless", "CDN", "Auto Scaling"],
            color: "indigo"
        },
        {
            id: 8,
            title: "Kubernetes, Docker 등 컨테이너 기술",
            category: "Container",
            icon: <Database className="w-5 h-5" />,
            skills: ["Docker", "Kubernetes", "Helm", "Istio", "Harbor", "Podman"],
            color: "gray"
        },
        {
            id: 9,
            title: "마이크로서비스 아키텍처",
            category: "Architecture",
            icon: <Layers className="w-5 h-5" />,
            skills: ["Service Mesh", "API Gateway", "Circuit Breaker", "Tracing", "Event Sourcing", "CQRS"],
            color: "slate"
        },
        {
            id: 10,
            title: "DevOps, CI/CD 등 최신 개발 방법론",
            category: "DevOps",
            icon: <GitBranch className="w-5 h-5" />,
            skills: ["GitHub Actions", "ArgoCD", "Terraform", "Prometheus", "Grafana", "GitOps"],
            color: "blue"
        }
    ];

    const references = [
        {
            category: "Microservices Architecture",
            items: [
                {
                    title: "Microservices Pattern: Microservice Architecture pattern",
                    author: "Chris Richardson",
                    url: "https://microservices.io/patterns/microservices.html",
                    description: "마이크로서비스 아키텍처의 기본 패턴과 설계 원칙"
                },
                {
                    title: "Microservices architecture and design: A complete overview",
                    author: "vFunction",
                    url: "https://vfunction.com/blog/microservices-architecture-guide/",
                    description: "마이크로서비스 아키텍처의 완전한 개요와 설계 가이드"
                },
                {
                    title: "13 Microservices Best Practices",
                    author: "Oso",
                    url: "https://www.osohq.com/learn/microservices-best-practices",
                    description: "마이크로서비스 구현을 위한 13가지 핵심 모범 사례"
                }
            ]
        },
        {
            category: "Team Collaboration",
            items: [
                {
                    title: "Software Development Teams Need These 7 Collaboration Methods in 2025",
                    author: "OpenArc",
                    url: "https://www.openarc.net/software-development-teams-need-these-7-collaboration-methods-in-2025/",
                    description: "2025년 소프트웨어 개발팀을 위한 7가지 협업 방법론"
                },
                {
                    title: "Best collaboration practices for software development teams",
                    author: "Shake",
                    url: "https://www.shakebugs.com/blog/software-team-collaboration-best-practices/",
                    description: "소프트웨어 개발팀을 위한 최고의 협업 실천 방안"
                },
                {
                    title: "Why team collaboration is vital in software development",
                    author: "DX",
                    url: "https://getdx.com/blog/software-collaboration/",
                    description: "소프트웨어 개발에서 팀 협업의 중요성과 실무 적용"
                }
            ]
        },
        {
            category: "DevOps & CI/CD",
            items: [
                {
                    title: "Kubernetes CI/CD Pipelines – 8 Best Practices and Tools",
                    author: "Spacelift",
                    url: "https://spacelift.io/blog/kubernetes-ci-cd",
                    description: "Kubernetes 환경에서의 CI/CD 파이프라인 구축 모범 사례"
                },
                {
                    title: "From 2024 to 2025: Reflecting on CI/CD best practices",
                    author: "Nixys",
                    url: "https://medium.com/@nixys_io/from-2024-to-2025-reflecting-on-ci-cd-best-practices-030efa6d58d9",
                    description: "2024-2025년 CI/CD 모범 사례 회고와 전망"
                },
                {
                    title: "20+ Best CI/CD Tools for DevOps in 2025",
                    author: "Spacelift",
                    url: "https://spacelift.io/blog/ci-cd-tools",
                    description: "2025년 DevOps를 위한 20가지 최고의 CI/CD 도구"
                }
            ]
        },
        {
            category: "Software Development Best Practices",
            items: [
                {
                    title: "15 Software Development Best Practices in 2024",
                    author: "VisionX",
                    url: "https://visionx.io/blog/software-development-best-practices/",
                    description: "2024년 소프트웨어 개발을 위한 15가지 핵심 모범 사례"
                },
                {
                    title: "Complete Guide On Building A Software Development Team In 2025",
                    author: "BixbyforTech",
                    url: "https://bixbyfortech.com/complete-guide-on-building-a-software-development-team-in-2024/",
                    description: "2025년 소프트웨어 개발팀 구축을 위한 완전 가이드"
                }
            ]
        }
    ];

    const colorVariants = {
        slate: {
            bg: "bg-slate-50",
            border: "border-slate-200",
            text: "text-slate-700",
            accent: "bg-slate-600",
            hover: "hover:bg-slate-100"
        },
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-700",
            accent: "bg-blue-600",
            hover: "hover:bg-blue-100"
        },
        gray: {
            bg: "bg-gray-50",
            border: "border-gray-200",
            text: "text-gray-700",
            accent: "bg-gray-600",
            hover: "hover:bg-gray-100"
        },
        indigo: {
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            text: "text-indigo-700",
            accent: "bg-indigo-600",
            hover: "hover:bg-indigo-100"
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-8 py-16">
                <header className="text-center mb-20">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-slate-900 rounded-3xl mb-8 shadow-lg">
                        <span className="text-4xl">🚀</span>
                    </div>
                    <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        MSA Team Manual
                    </h1>
                    <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        3 패러다임 · 3 명언 · 10 학습으로 구성된 현대적 팀 가이드라인
                    </p>
                </header>

                <nav className="flex justify-center mb-16">
                    <div className="inline-flex bg-white rounded-3xl p-3 shadow-xl border border-gray-200">
                        {[
                            { key: 'paradigms', label: '🏗️ 3 패러다임', count: 3 },
                            { key: 'maxims', label: '💎 3 명언', count: 3 },
                            { key: 'learning', label: '📚 10 학습', count: 10 },
                            { key: 'references', label: '📖 참고자료', count: 15 }
                        ].map(({ key, label, count }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-8 py-4 rounded-2xl transition-all duration-300 font-bold text-lg ${activeSection === key
                                        ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span>{label}</span>
                                    <span className={`text-sm px-3 py-1 rounded-full ${activeSection === key ? 'bg-white/20 text-white' : 'bg-gray-200 text-slate-600'
                                        }`}>
                                        {count}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </nav>

                {activeSection === 'paradigms' && (
                    <section className="space-y-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">3 패러다임</h2>
                            <p className="text-xl text-slate-600">아키텍처 · 포커싱 · 협력</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {paradigms.map((paradigm) => {
                                const colors = colorVariants[paradigm.color as keyof typeof colorVariants];
                                return (
                                    <div
                                        key={paradigm.id}
                                        className={`group relative bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${colors.border} transform hover:-translate-y-3`}
                                    >
                                        <div className="text-center mb-8">
                                            <div className="text-5xl mb-6">{paradigm.emoji}</div>
                                            <h3 className="text-3xl font-bold text-slate-900 mb-2">{paradigm.title}</h3>
                                            <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">{paradigm.subtitle}</p>
                                        </div>

                                        <p className="text-slate-600 text-center mb-8 leading-relaxed text-lg">{paradigm.description}</p>

                                        <button
                                            onClick={() => toggleExpanded(`paradigm-${paradigm.id}`)}
                                            className="w-full flex items-center justify-center space-x-3 text-slate-500 hover:text-slate-700 transition-colors"
                                        >
                                            <span className="text-base font-semibold">
                                                {expandedItems[`paradigm-${paradigm.id}`] ? '접기' : '자세히 보기'}
                                            </span>
                                            {expandedItems[`paradigm-${paradigm.id}`] ?
                                                <ChevronDown className="w-5 h-5" /> :
                                                <ChevronRight className="w-5 h-5" />
                                            }
                                        </button>

                                        {expandedItems[`paradigm-${paradigm.id}`] && (
                                            <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
                                                {paradigm.details.map((detail, index) => (
                                                    <div key={index} className="flex items-start space-x-4">
                                                        <div className={`w-2 h-2 ${colors.accent} rounded-full mt-3 flex-shrink-0`}></div>
                                                        <span className="text-slate-700 text-base leading-relaxed">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {activeSection === 'maxims' && (
                    <section className="space-y-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">3 명언</h2>
                            <p className="text-xl text-slate-600">팀원 개인이 지켜야 할 핵심 신조</p>
                        </div>

                        <div className="space-y-8">
                            {maxims.map((maxim) => {
                                const colors = colorVariants[maxim.color as keyof typeof colorVariants];
                                return (
                                    <div
                                        key={maxim.id}
                                        className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-l-8 border-l-slate-900"
                                    >
                                        <div className="p-10">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-6 mb-6">
                                                        <span className="text-4xl">{maxim.emoji}</span>
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-3">
                                                                {maxim.id}. {maxim.title}
                                                            </h3>
                                                            <p className="text-slate-600 text-lg">{maxim.description}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => toggleExpanded(`maxim-${maxim.id}`)}
                                                    className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors p-3"
                                                >
                                                    {expandedItems[`maxim-${maxim.id}`] ?
                                                        <ChevronDown className="w-6 h-6" /> :
                                                        <ChevronRight className="w-6 h-6" />
                                                    }
                                                </button>
                                            </div>

                                            {expandedItems[`maxim-${maxim.id}`] && (
                                                <div className="mt-8 pt-8 border-t border-gray-100 ml-20">
                                                    <h4 className="font-bold text-slate-900 mb-6 text-lg">실행 가이드라인</h4>
                                                    <div className="space-y-4">
                                                        {maxim.details.map((detail, index) => (
                                                            <div key={index} className="flex items-start space-x-4">
                                                                <div className="w-2 h-2 bg-slate-600 rounded-full mt-3 flex-shrink-0"></div>
                                                                <span className="text-slate-700 text-base leading-relaxed">{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

                {activeSection === 'learning' && (
                    <section className="space-y-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">10 학습</h2>
                            <p className="text-xl text-slate-600">기술 역량 향상을 위한 핵심 분야</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {learningAreas.map((area) => {
                                const colors = colorVariants[area.color as keyof typeof colorVariants];
                                return (
                                    <div
                                        key={area.id}
                                        className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
                                    >
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center space-x-5">
                                                <div className={`p-4 rounded-2xl ${colors.bg} ${colors.text}`}>
                                                    {area.icon}
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <span className="text-xs font-bold px-3 py-1 bg-gray-100 text-gray-600 rounded-full uppercase tracking-wider">
                                                            {area.category}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                                        {area.id}. {area.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toggleExpanded(`learning-${area.id}`)}
                                                className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                                            >
                                                {expandedItems[`learning-${area.id}`] ?
                                                    <ChevronDown className="w-5 h-5" /> :
                                                    <ChevronRight className="w-5 h-5" />
                                                }
                                            </button>
                                        </div>

                                        {expandedItems[`learning-${area.id}`] && (
                                            <div className="mt-6 pt-6 border-t border-gray-100">
                                                <div className="flex flex-wrap gap-3">
                                                    {area.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-4 py-2 bg-gray-50 text-slate-700 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-16 bg-slate-50 rounded-3xl p-10 border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">🚀 학습 가이드라인</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { icon: "📋", title: "우선순위", desc: "프로젝트 요구사항 기반 학습 순서 결정" },
                                    { icon: "🛠️", title: "실습 중심", desc: "이론 + 실제 프로젝트 실습" },
                                    { icon: "🤝", title: "지식 공유", desc: "팀 내 학습 내용 공유 세션" },
                                    { icon: "🔄", title: "지속 업데이트", desc: "트렌드 변화에 따른 계획 수정" }
                                ].map((guide, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl mb-4">{guide.icon}</div>
                                        <h4 className="font-bold text-slate-900 mb-3 text-lg">{guide.title}</h4>
                                        <p className="text-slate-600 leading-relaxed">{guide.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === 'references' && (
                    <section className="space-y-12">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">📖 참고자료</h2>
                            <p className="text-xl text-slate-600">최신 모범 사례와 기술 가이드</p>
                        </div>

                        <div className="space-y-12">
                            {references.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b border-gray-100">
                                        {section.category}
                                    </h3>

                                    <div className="space-y-6">
                                        {section.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="group hover:bg-slate-50 rounded-2xl p-6 transition-all duration-200">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-3 mb-3">
                                                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                                {item.title}
                                                            </h4>
                                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                        </div>
                                                        <p className="text-sm text-slate-500 mb-2 font-medium">{item.author}</p>
                                                        <p className="text-slate-600 leading-relaxed">{item.description}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
                                                    >
                                                        자세히 보기
                                                        <ExternalLink className="w-3 h-3 ml-2" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 text-white rounded-3xl p-10 text-center">
                            <h3 className="text-2xl font-bold mb-4">💡 더 많은 자료를 찾고 계신가요?</h3>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                위 자료들은 현재 업계에서 가장 널리 인정받는 모범 사례들을 기반으로 선별되었습니다.<br />
                                지속적인 학습과 개선을 위해 정기적으로 업데이트하시기 바랍니다.
                            </p>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MSAPrinciplesManual;