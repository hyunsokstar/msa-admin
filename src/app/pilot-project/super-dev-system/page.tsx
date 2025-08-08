"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, Package, ShoppingCart, Cpu, Bot, Smartphone, Globe, BarChart3, Shield, Cloud, Gamepad2, Building2, Zap, Heart, Settings, Star, Rocket, Target, Brain, Code, Database, Network } from 'lucide-react';

// 타입 정의
interface SystemComponent {
    title: string;
    icon: React.ReactNode;
    description: string;
    keyFeatures: string[];
    techStack: string[];
    implementation: {
        phase1: string;
        phase2: string;
        phase3: string;
    };
    modules?: {
        [key: string]: string;
    };
}

interface ProjectPhase {
    period: string;
    title: string;
    tasks: string[];
}

interface InvestmentPlan {
    title: string;
    budget: string;
    details: string[];
}

interface RiskManagement {
    risk: string;
    mitigation: string;
}

const SuperDevSystemReport = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const systemComponents: { [key: string]: SystemComponent } = {
        aiIntegration: {
            title: "AI 기반 통합 개발 환경",
            icon: <Brain className="w-6 h-6" />,
            description: "Spring AI와 LLM을 활용한 지능형 개발 시스템",
            keyFeatures: [
                "Spring AI 기반 멀티 모델 지원 (OpenAI, Claude, Google AI)",
                "RAG(Retrieval Augmented Generation) 시스템으로 프로젝트별 지식 베이스",
                "실시간 코드 리뷰 및 개선 제안 AI 어시스턴트",
                "자동화된 문서 생성 및 API 명세서 작성",
                "AI 기반 버그 예측 및 성능 최적화 제안"
            ],
            techStack: ["Spring AI", "OpenAI GPT-4", "Claude Sonnet", "Vector DB", "Elasticsearch"],
            implementation: {
                phase1: "기본 AI 챗봇 및 코드 어시스턴트 구축",
                phase2: "프로젝트별 RAG 시스템 및 지식 베이스 구축",
                phase3: "예측적 분석 및 자동화 시스템 고도화"
            }
        },
        devOpsIntegration: {
            title: "통합 DevOps 플랫폼",
            icon: <Settings className="w-6 h-6" />,
            description: "CI/CD 자동화와 협업을 위한 통합 플랫폼",
            keyFeatures: [
                "Git 기반 소스 관리 + 자동 빌드/테스트/배포",
                "컨테이너 오케스트레이션 (Docker, Kubernetes)",
                "실시간 모니터링 및 로그 분석 시스템",
                "보안 스캔 자동화 (DevSecOps)",
                "멀티 클라우드 배포 지원 (AWS, Azure, GCP)"
            ],
            techStack: ["Jenkins", "GitLab CI/CD", "Docker", "Kubernetes", "Prometheus", "Grafana"],
            implementation: {
                phase1: "기본 CI/CD 파이프라인 구축",
                phase2: "보안 및 품질 게이트 통합",
                phase3: "멀티 클라우드 자동 배포 시스템"
            }
        },
        mentorSystem: {
            title: "업계 리더 멘토링 시스템",
            icon: <Users className="w-6 h-6" />,
            description: "*****, **철 이사 등 업계 리더들의 기술 전수 플랫폼",
            keyFeatures: [
                "1:1 멘토링 매칭 시스템 (F-Lab 방식)",
                "실시간 코드 리뷰 및 피드백",
                "주간 기술 세미나 및 워크샵",
                "프로젝트 기반 협업 학습",
                "커리어 로드맵 및 성장 관리"
            ],
            techStack: ["화상회의 시스템", "멘토링 플랫폼", "학습 관리 시스템", "포트폴리오 관리"],
            implementation: {
                phase1: "멘토 Pool 구성 및 매칭 시스템",
                phase2: "온라인 학습 플랫폼 구축",
                phase3: "AI 기반 개인화 학습 추천"
            }
        },
        businessModules: {
            title: "5대 핵심 비즈니스 모듈",
            icon: <Target className="w-6 h-6" />,
            description: "상담, 의료, 쇼핑몰, 스마트팩토리, 교육 전문 모듈",
            keyFeatures: [
                "모듈별 특화 템플릿 및 컴포넌트",
                "도메인별 AI 어시스턴트 (의료AI, 교육AI 등)",
                "업종별 규제 대응 자동화",
                "표준화된 API 및 마이크로서비스",
                "실시간 성과 분석 대시보드"
            ],
            techStack: ["React", "Spring Boot", "Microservices", "Kafka", "Redis", "PostgreSQL"],
            implementation: {
                phase1: "기본 모듈 프레임워크 구축",
                phase2: "도메인별 AI 어시스턴트 개발",
                phase3: "통합 분석 및 최적화 시스템"
            },
            modules: {
                consulting: "AI 상담 시스템 - 24시간 자동 상담, 감정 분석",
                medical: "의료 시스템 - PACS 연동, 의료 AI 진단 보조",
                ecommerce: "이커머스 - 개인화 추천, 실시간 재고 관리",
                smartFactory: "스마트팩토리 - IoT 센서 연동, 예측 정비",
                education: "교육 플랫폼 - 적응형 학습, 성과 분석"
            }
        },
        collaborationPlatform: {
            title: "통합 협업 플랫폼",
            icon: <Network className="w-6 h-6" />,
            description: "업무, 교육, 비즈니스를 아우르는 통합 협업 환경",
            keyFeatures: [
                "실시간 협업 도구 (Slack 스타일 메신저)",
                "프로젝트 관리 (Jira 스타일 이슈 트래킹)",
                "지식 베이스 및 위키 시스템",
                "화상회의 및 스크린 공유",
                "업무 자동화 워크플로우"
            ],
            techStack: ["React", "WebRTC", "WebSocket", "Redis", "PostgreSQL"],
            implementation: {
                phase1: "기본 메신저 및 프로젝트 관리",
                phase2: "AI 기반 업무 자동화",
                phase3: "전사 지식 관리 시스템"
            }
        }
    };

    const projectTimeline: { [key: string]: ProjectPhase } = {
        phase1: {
            period: "1-3개월",
            title: "기반 시스템 구축",
            tasks: [
                "Spring AI 기반 개발 환경 셋업",
                "기본 CI/CD 파이프라인 구성",
                "멘토 Pool 구성 및 온보딩",
                "5대 모듈 프로토타입 개발",
                "기본 협업 플랫폼 구축"
            ]
        },
        phase2: {
            period: "4-8개월",
            title: "핵심 기능 개발",
            tasks: [
                "AI 어시스턴트 고도화",
                "자동화 시스템 확장",
                "멘토링 플랫폼 오픈",
                "비즈니스 모듈 베타 버전",
                "보안 및 품질 시스템 강화"
            ]
        },
        phase3: {
            period: "9-12개월",
            title: "상용화 및 확장",
            tasks: [
                "정식 서비스 런칭",
                "성과 기반 인센티브 시스템",
                "고객사 프로젝트 수주",
                "해외 진출 준비",
                "차세대 기술 연구개발"
            ]
        }
    };

    const expectedResults = {
        technical: [
            "개발 생산성 300% 향상",
            "코드 품질 90% 이상 자동 검증",
            "배포 시간 95% 단축",
            "버그 발생률 80% 감소",
            "AI 기반 자동화 70% 달성"
        ],
        business: [
            "연간 100개 프로젝트 수주 목표",
            "평균 프로젝트 수익률 25% 이상",
            "고객 만족도 95% 이상",
            "재계약률 85% 이상",
            "신규 시장 5개 분야 진출"
        ],
        organizational: [
            "개발자 역량 평균 40% 향상",
            "멘토링 만족도 90% 이상",
            "조직 내 협업 효율 50% 개선",
            "지식 공유 문화 정착",
            "인재 유지율 95% 이상"
        ]
    };

    const investmentPlan: { [key: string]: InvestmentPlan } = {
        infrastructure: {
            title: "인프라 및 플랫폼",
            budget: "15억원",
            details: [
                "클라우드 인프라 (AWS/Azure)",
                "AI 모델 라이선스 (OpenAI, Claude)",
                "개발 도구 및 라이선스",
                "보안 솔루션",
                "모니터링 시스템"
            ]
        },
        humanResource: {
            title: "인력 및 교육",
            budget: "25억원",
            details: [
                "시니어 개발자 영입 (10명)",
                "업계 리더 멘토 섭외",
                "교육 프로그램 개발",
                "인센티브 시스템 운영",
                "컨설팅 비용"
            ]
        },
        development: {
            title: "시스템 개발",
            budget: "20억원",
            details: [
                "플랫폼 개발비",
                "AI 모델 커스터마이징",
                "UI/UX 디자인",
                "테스트 및 품질보증",
                "운영 및 유지보수"
            ]
        }
    };

    const riskManagement: RiskManagement[] = [
        {
            risk: "기술적 복잡성",
            mitigation: "단계적 개발, 프로토타입 검증, 전문가 자문"
        },
        {
            risk: "인력 확보 어려움",
            mitigation: "경쟁력 있는 보상, 성장 기회 제공, 유연한 근무환경"
        },
        {
            risk: "시장 경쟁 심화",
            mitigation: "차별화된 AI 기술, 전문 도메인 집중, 품질 우선"
        },
        {
            risk: "초기 투자비 부담",
            mitigation: "단계별 투자, 정부지원사업 활용, 전략적 파트너십"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            🚀 두타 슈퍼 개발 시스템
                        </h1>
                        <h2 className="text-2xl text-gray-600 mb-4">
                            AI와 협업이 결합된 차세대 통합 개발 플랫폼
                        </h2>
                        <p className="text-lg text-gray-500">
                            업무 • 교육 • 협업 • 비즈니스 • 유지보수를 하나로 통합하는 혁신적 시스템
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <h3 className="font-semibold text-blue-800 mb-2">목표 시장</h3>
                            <p className="text-blue-600">상담 • 의료 • 쇼핑몰</p>
                            <p className="text-blue-600">스마트팩토리 • 교육</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center">
                            <h3 className="font-semibold text-green-800 mb-2">예상 투자</h3>
                            <p className="text-green-600 text-xl font-bold">60억원</p>
                            <p className="text-green-600">12개월</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4 text-center">
                            <h3 className="font-semibold text-purple-800 mb-2">핵심 기술</h3>
                            <p className="text-purple-600">Spring AI</p>
                            <p className="text-purple-600">DevOps • 멘토링</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 text-center">
                            <h3 className="font-semibold text-orange-800 mb-2">예상 수익</h3>
                            <p className="text-orange-600 text-xl font-bold">연 200억+</p>
                            <p className="text-orange-600">100개 프로젝트</p>
                        </div>
                    </div>
                </div>

                {/* Executive Summary */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Star className="w-6 h-6 mr-2 text-yellow-500" />
                        핵심 요약 (Executive Summary)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">🎯 프로젝트 개요</h3>
                            <p className="text-gray-700 mb-4">
                                Spring AI, 현대화된 DevOps, 업계 리더 멘토링을 결합한 통합 개발 시스템 구축으로
                                5개 전문 분야(상담, 의료, 쇼핑몰, 스마트팩토리, 교육)에서
                                <span className="font-semibold text-blue-600"> 혁신적인 개발 생태계</span>를 만들어
                                지속적인 성장과 수주 확대를 실현합니다.
                            </p>

                            <h3 className="font-semibold text-gray-800 mb-3">🔥 핵심 차별점</h3>
                            <ul className="text-gray-700 space-y-1">
                                <li>• <span className="font-semibold">AI 네이티브 개발환경</span>: Spring AI 기반 지능형 코딩 어시스턴트</li>
                                <li>• <span className="font-semibold">업계 리더 멘토링</span>: *****, **철 이사급 전문가 직접 교육</li>
                                <li>• <span className="font-semibold">성과 기반 인센티브</span>: 수주 실적 연동 보상 시스템</li>
                                <li>• <span className="font-semibold">도메인 특화 모듈</span>: 5개 분야별 최적화된 개발 템플릿</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">📊 기대 효과</h3>
                            <div className="space-y-3">
                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="font-semibold text-blue-800">개발 생산성</div>
                                    <div className="text-blue-600">300% 향상</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="font-semibold text-green-800">연간 수주 목표</div>
                                    <div className="text-green-600">100개 프로젝트</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg">
                                    <div className="font-semibold text-purple-800">개발자 역량</div>
                                    <div className="text-purple-600">평균 40% 향상</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Components */}
                <div className="space-y-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Rocket className="w-6 h-6 mr-2 text-blue-500" />
                        시스템 구성 요소
                    </h2>

                    {Object.entries(systemComponents).map(([key, component]) => (
                        <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 cursor-pointer hover:from-blue-600 hover:to-purple-700 transition-colors"
                                onClick={() => toggleSection(key)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {component.icon}
                                        <div>
                                            <h3 className="text-xl font-bold">{component.title}</h3>
                                            <p className="text-sm opacity-90 mt-1">{component.description}</p>
                                        </div>
                                    </div>
                                    {expandedSections[key] ?
                                        <ChevronDown className="w-6 h-6" /> :
                                        <ChevronRight className="w-6 h-6" />
                                    }
                                </div>
                            </div>

                            {expandedSections[key] && (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3">핵심 기능</h4>
                                            <ul className="space-y-2">
                                                {component.keyFeatures.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start text-sm text-gray-700">
                                                        <span className="text-blue-500 mr-2 mt-0.5">▸</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-3">기술 스택</h4>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {component.techStack.map((tech, idx) => (
                                                    <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <h4 className="font-semibold text-gray-800 mb-3">구현 계획</h4>
                                            <div className="space-y-2 text-sm">
                                                <div><span className="font-medium text-blue-600">1단계:</span> {component.implementation.phase1}</div>
                                                <div><span className="font-medium text-green-600">2단계:</span> {component.implementation.phase2}</div>
                                                <div><span className="font-medium text-purple-600">3단계:</span> {component.implementation.phase3}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {key === 'businessModules' && component.modules && (
                                        <div className="mt-6 pt-6 border-t border-gray-200">
                                            <h4 className="font-semibold text-gray-800 mb-3">5대 비즈니스 모듈</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {Object.entries(component.modules).map(([moduleKey, moduleDesc]) => (
                                                    <div key={moduleKey} className="bg-gray-50 p-4 rounded-lg">
                                                        <div className="text-sm font-medium text-gray-800 mb-1">
                                                            {moduleDesc.split(' - ')[0]}
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            {moduleDesc.split(' - ')[1]}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Project Timeline */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                        프로젝트 로드맵
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(projectTimeline).map(([key, phase]) => (
                            <div key={key} className="border border-gray-200 rounded-lg p-6">
                                <div className="text-center mb-4">
                                    <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-2">
                                        {phase.period}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{phase.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {phase.tasks.map((task, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-gray-700">
                                            <span className="text-green-500 mr-2 mt-0.5">✓</span>
                                            <span>{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Expected Results */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Target className="w-6 h-6 mr-2 text-orange-500" />
                        기대 성과
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-800 mb-4">🛠 기술적 성과</h3>
                            <ul className="space-y-2">
                                {expectedResults.technical.map((result, idx) => (
                                    <li key={idx} className="text-sm text-blue-700">• {result}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-green-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-800 mb-4">💰 비즈니스 성과</h3>
                            <ul className="space-y-2">
                                {expectedResults.business.map((result, idx) => (
                                    <li key={idx} className="text-sm text-green-700">• {result}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-purple-800 mb-4">👥 조직적 성과</h3>
                            <ul className="space-y-2">
                                {expectedResults.organizational.map((result, idx) => (
                                    <li key={idx} className="text-sm text-purple-700">• {result}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Investment Plan */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Database className="w-6 h-6 mr-2 text-purple-500" />
                        투자 계획 (총 60억원)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(investmentPlan).map(([key, plan]) => (
                            <div key={key} className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{plan.title}</h3>
                                <div className="text-2xl font-bold text-blue-600 mb-4">{plan.budget}</div>
                                <ul className="space-y-1">
                                    {plan.details.map((detail, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">• {detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Risk Management */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-red-500" />
                        리스크 관리
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {riskManagement.map((item, idx) => (
                            <div key={idx} className="border border-gray-200 rounded-lg p-6">
                                <h3 className="font-semibold text-red-600 mb-2">{item.risk}</h3>
                                <p className="text-sm text-gray-700">{item.mitigation}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Market Analysis Integration */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <BarChart3 className="w-6 h-6 mr-2 text-indigo-500" />
                        시장 분석 기반 전략
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">📈 시장 기회 분석</h3>
                            <div className="space-y-3">
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <div className="font-medium text-green-800">AI 상담 시스템</div>
                                    <div className="text-sm text-green-600">시장 규모 2.2조원, 연 25% 성장</div>
                                    <div className="text-xs text-gray-600">24시간 무인 상담 시스템 수요 급증</div>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <div className="font-medium text-blue-800">업무 자동화/RPA</div>
                                    <div className="text-sm text-blue-600">시장 규모 1.8조원, 연 30% 성장</div>
                                    <div className="text-xs text-gray-600">파이썬 크롤링이 가장 인기있는 서비스</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <div className="font-medium text-purple-800">스마트팩토리</div>
                                    <div className="text-sm text-purple-600">글로벌 180억달러, 연 15% 성장</div>
                                    <div className="text-xs text-gray-600">정부 지원사업 지속 확대</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-4">🎯 플랫폼별 접근 전략</h3>
                            <div className="space-y-3">
                                <div className="border border-blue-200 p-4 rounded-lg">
                                    <div className="font-medium text-blue-800">위시켓 전략</div>
                                    <div className="text-sm text-gray-700">대규모 프로젝트 중심 (1,000만원+)</div>
                                    <div className="text-xs text-gray-600">기업 고객, 전문성 요구 프로젝트</div>
                                </div>
                                <div className="border border-green-200 p-4 rounded-lg">
                                    <div className="font-medium text-green-800">크몽 전략</div>
                                    <div className="text-sm text-gray-700">소규모 프로젝트 + 빠른 턴어라운드</div>
                                    <div className="text-xs text-gray-600">개인/소상공인 고객 대상</div>
                                </div>
                                <div className="border border-purple-200 p-4 rounded-lg">
                                    <div className="font-medium text-purple-800">정부지원사업</div>
                                    <div className="text-sm text-gray-700">스마트팩토리 구축비 50% 지원</div>
                                    <div className="text-xs text-gray-600">중소기업 디지털 전환 수요</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reference Materials */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <Code className="w-6 h-6 mr-2 text-gray-500" />
                        참고 자료 및 레퍼런스
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">🤖 Spring AI 관련</h3>
                            <ul className="text-sm space-y-1">
                                <li>• <a href="https://spring.io/projects/spring-ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Spring AI 공식 문서 →</a></li>
                                <li>• <a href="https://blog.sionic.ai/spring-ai-series-1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">사이오닉 Spring AI 시리즈 →</a></li>
                                <li>• <a href="https://fastcampus.co.kr/dev_online_springai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">패스트캠퍼스 Spring AI 강의 →</a></li>
                            </ul>

                            <h3 className="font-semibold text-gray-800 mb-3 mt-4">⚙️ DevOps 및 CI/CD</h3>
                            <ul className="text-sm space-y-1">
                                <li>• <a href="https://www.redhat.com/ko/topics/devops/what-is-ci-cd" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Red Hat CI/CD 가이드 →</a></li>
                                <li>• <a href="https://www.samsungsds.com/kr/devops-tools/devops-tools.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">삼성SDS DevOps 도구 →</a></li>
                                <li>• <a href="https://blog.kakaocloud.com/138" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">카카오클라우드 CI/CD 완벽 정리 →</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">👨‍💼 멘토링 시스템</h3>
                            <ul className="text-sm space-y-1">
                                <li>• <a href="https://f-lab.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">F-Lab 상위 1% 개발자 멘토링 →</a></li>
                                <li>• <a href="https://comento.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">코멘토 현직자 멘토링 →</a></li>
                                <li>• <a href="https://www.inflearn.com/mentors" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">인프런 멘토링 플랫폼 →</a></li>
                            </ul>

                            <h3 className="font-semibold text-gray-800 mb-3 mt-4">🏭 현대자동차 SDV 전략</h3>
                            <ul className="text-sm space-y-1">
                                <li>• <a href="https://www.hyundai.co.kr/live/unlock-the-software-age" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">현대차 Unlock the Software Age →</a></li>
                                <li>• <a href="https://www.hyundai.com/worldwide/ko/company/innovation/future-mobility" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">현대차 미래 모빌리티 전략 →</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-3">📊 시장 조사 데이터</h3>
                        <p className="text-sm text-gray-600 mb-3">
                            본 보고서는 위시켓, 크몽 등 주요 프리랜서 플랫폼의 실제 프로젝트 데이터와
                            업계 리더들의 기술 동향을 종합 분석하여 작성되었습니다.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <a href="https://www.wishket.com/" target="_blank" rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-600 transition-colors">
                                위시켓
                            </a>
                            <a href="https://kmong.com/" target="_blank" rel="noopener noreferrer"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-green-600 transition-colors">
                                크몽
                            </a>
                            <a href="https://www.smart-factory.kr/" target="_blank" rel="noopener noreferrer"
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-purple-600 transition-colors">
                                스마트팩토리
                            </a>
                            <a href="https://design.cafe24.com/" target="_blank" rel="noopener noreferrer"
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-orange-600 transition-colors">
                                카페24
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperDevSystemReport;