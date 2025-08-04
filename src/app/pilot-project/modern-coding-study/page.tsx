"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Layers, Target, Users, Zap, Code, Cloud, Brain, Settings, GitBranch, Monitor, Database, Smartphone } from 'lucide-react';

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
            gradient: "from-blue-500 to-cyan-500"
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
            gradient: "from-emerald-500 to-teal-500"
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
            gradient: "from-purple-500 to-pink-500"
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
            color: "bg-gradient-to-r from-indigo-500 to-purple-600"
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
            color: "bg-gradient-to-r from-rose-500 to-pink-600"
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
            color: "bg-gradient-to-r from-amber-500 to-orange-600"
        }
    ];

    const learningAreas = [
        {
            id: 1,
            title: "콜센터 VoIP 핵심 기술",
            category: "Core Tech",
            icon: <Monitor className="w-5 h-5" />,
            skills: ["SIP Protocol", "WebRTC", "Asterisk", "FreeSWITCH", "Voice Codecs", "QoS"],
            color: "from-blue-400 to-blue-600"
        },
        {
            id: 2,
            title: "실시간 통신 기술",
            category: "Real-time",
            icon: <Zap className="w-5 h-5" />,
            skills: ["WebSocket", "Redis Pub/Sub", "Socket.IO", "SSE", "Message Queue", "Event Streaming"],
            color: "from-green-400 to-green-600"
        },
        {
            id: 3,
            title: "Spring Boot 최신 생태계",
            category: "Backend",
            icon: <Code className="w-5 h-5" />,
            skills: ["Spring Boot 3.x", "Security 6", "Data JPA", "Cloud Gateway", "WebFlux", "GraalVM"],
            color: "from-emerald-400 to-emerald-600"
        },
        {
            id: 4,
            title: "최신 고급 프론트엔드 기술",
            category: "Frontend",
            icon: <Smartphone className="w-5 h-5" />,
            skills: ["React 18+", "Next.js 14", "TypeScript 5", "Tailwind CSS", "Zustand", "TanStack Query"],
            color: "from-cyan-400 to-cyan-600"
        },
        {
            id: 5,
            title: "Tauri 등 데스크톱 앱 기술",
            category: "Desktop",
            icon: <Settings className="w-5 h-5" />,
            skills: ["Tauri", "Electron", "Native APIs", "Cross-platform", "Auto-update", "System Tray"],
            color: "from-purple-400 to-purple-600"
        },
        {
            id: 6,
            title: "AI, ML, DL 등 최신 기술",
            category: "AI/ML",
            icon: <Brain className="w-5 h-5" />,
            skills: ["TensorFlow", "PyTorch", "LangChain", "Vector DB", "Transformers", "OpenAI API"],
            color: "from-pink-400 to-pink-600"
        },
        {
            id: 7,
            title: "클라우드 네이티브 기술",
            category: "Cloud",
            icon: <Cloud className="w-5 h-5" />,
            skills: ["AWS", "Azure", "GCP", "Serverless", "CDN", "Auto Scaling"],
            color: "from-indigo-400 to-indigo-600"
        },
        {
            id: 8,
            title: "Kubernetes, Docker 등 컨테이너 기술",
            category: "Container",
            icon: <Database className="w-5 h-5" />,
            skills: ["Docker", "Kubernetes", "Helm", "Istio", "Harbor", "Podman"],
            color: "from-slate-400 to-slate-600"
        },
        {
            id: 9,
            title: "마이크로서비스 아키텍처",
            category: "Architecture",
            icon: <Layers className="w-5 h-5" />,
            skills: ["Service Mesh", "API Gateway", "Circuit Breaker", "Tracing", "Event Sourcing", "CQRS"],
            color: "from-orange-400 to-orange-600"
        },
        {
            id: 10,
            title: "DevOps, CI/CD 등 최신 개발 방법론",
            category: "DevOps",
            icon: <GitBranch className="w-5 h-5" />,
            skills: ["GitHub Actions", "ArgoCD", "Terraform", "Prometheus", "Grafana", "GitOps"],
            color: "from-red-400 to-red-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
                        <span className="text-3xl">🚀</span>
                    </div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                        MSA Team Manual
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        3 패러다임 · 3 명언 · 10 학습으로 구성된 현대적 팀 가이드라인
                    </p>
                </header>

                <nav className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                        {[
                            { key: 'paradigms', label: '🏗️ 3 패러다임', count: 3 },
                            { key: 'maxims', label: '💎 3 명언', count: 3 },
                            { key: 'learning', label: '📚 10 학습', count: 10 }
                        ].map(({ key, label, count }) => (
                            <button
                                key={key}
                                onClick={() => setActiveSection(key)}
                                className={`px-6 py-3 rounded-xl transition-all duration-300 font-medium ${activeSection === key
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <span>{label}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${activeSection === key ? 'bg-white/20' : 'bg-gray-200'
                                        }`}>
                                        {count}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </nav>

                {activeSection === 'paradigms' && (
                    <section className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">3 패러다임</h2>
                            <p className="text-lg text-gray-600">아키텍처 · 포커싱 · 협력</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {paradigms.map((paradigm) => (
                                <div
                                    key={paradigm.id}
                                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${paradigm.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                                    <div className="relative z-10">
                                        <div className="text-center mb-6">
                                            <div className="text-4xl mb-3">{paradigm.emoji}</div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{paradigm.title}</h3>
                                            <p className="text-sm text-gray-500 uppercase tracking-wider">{paradigm.subtitle}</p>
                                        </div>

                                        <p className="text-gray-600 text-center mb-6 leading-relaxed">{paradigm.description}</p>

                                        <button
                                            onClick={() => toggleExpanded(`paradigm-${paradigm.id}`)}
                                            className="w-full flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
                                        >
                                            <span className="text-sm font-medium">
                                                {expandedItems[`paradigm-${paradigm.id}`] ? '접기' : '자세히 보기'}
                                            </span>
                                            {expandedItems[`paradigm-${paradigm.id}`] ?
                                                <ChevronDown className="w-4 h-4" /> :
                                                <ChevronRight className="w-4 h-4" />
                                            }
                                        </button>

                                        {expandedItems[`paradigm-${paradigm.id}`] && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                                {paradigm.details.map((detail, index) => (
                                                    <div key={index} className="flex items-start space-x-3">
                                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                        <span className="text-gray-700 text-sm">{detail}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === 'maxims' && (
                    <section className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">3 명언</h2>
                            <p className="text-lg text-gray-600">팀원 개인이 지켜야 할 핵심 신조</p>
                        </div>

                        <div className="space-y-6">
                            {maxims.map((maxim) => (
                                <div
                                    key={maxim.id}
                                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className={`absolute left-0 top-0 w-2 h-full ${maxim.color}`}></div>

                                    <div className="p-8 pl-12">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <span className="text-3xl">{maxim.emoji}</span>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                                            {maxim.id}. {maxim.title}
                                                        </h3>
                                                        <p className="text-gray-600 mt-2">{maxim.description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => toggleExpanded(`maxim-${maxim.id}`)}
                                                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-2"
                                            >
                                                {expandedItems[`maxim-${maxim.id}`] ?
                                                    <ChevronDown className="w-5 h-5" /> :
                                                    <ChevronRight className="w-5 h-5" />
                                                }
                                            </button>
                                        </div>

                                        {expandedItems[`maxim-${maxim.id}`] && (
                                            <div className="mt-6 pt-6 border-t border-gray-100 ml-16">
                                                <h4 className="font-semibold text-gray-900 mb-4">실행 가이드라인</h4>
                                                <div className="space-y-3">
                                                    {maxim.details.map((detail, index) => (
                                                        <div key={index} className="flex items-start space-x-3">
                                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-700">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === 'learning' && (
                    <section className="space-y-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">10 학습</h2>
                            <p className="text-lg text-gray-600">기술 역량 향상을 위한 핵심 분야</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {learningAreas.map((area) => (
                                <div
                                    key={area.id}
                                    className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${area.color} text-white`}>
                                                {area.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                        {area.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                                    {area.id}. {area.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => toggleExpanded(`learning-${area.id}`)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                        >
                                            {expandedItems[`learning-${area.id}`] ?
                                                <ChevronDown className="w-4 h-4" /> :
                                                <ChevronRight className="w-4 h-4" />
                                            }
                                        </button>
                                    </div>

                                    {expandedItems[`learning-${area.id}`] && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex flex-wrap gap-2">
                                                {area.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">🚀 학습 가이드라인</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { icon: "📋", title: "우선순위", desc: "프로젝트 요구사항 기반 학습 순서 결정" },
                                    { icon: "🛠️", title: "실습 중심", desc: "이론 + 실제 프로젝트 실습" },
                                    { icon: "🤝", title: "지식 공유", desc: "팀 내 학습 내용 공유 세션" },
                                    { icon: "🔄", title: "지속 업데이트", desc: "트렌드 변화에 따른 계획 수정" }
                                ].map((guide, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-2xl mb-3">{guide.icon}</div>
                                        <h4 className="font-semibold text-gray-900 mb-2">{guide.title}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{guide.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MSAPrinciplesManual;