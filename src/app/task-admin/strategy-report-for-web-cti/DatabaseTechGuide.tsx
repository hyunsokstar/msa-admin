import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DatabaseTechGuide: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: '🎯 핵심 비교', icon: '⚡' },
        { id: 'decision', label: '🤔 언제 뭘?', icon: '🗺️' },
        { id: 'examples', label: '💼 실제 사례', icon: '📊' }
    ];

    const coreComparison = {
        jpa: {
            title: "JPA + QueryDSL",
            subtitle: "객체지향 + 편리함",
            color: "border-blue-500 bg-blue-50",
            headerColor: "text-blue-700",
            percentage: "80%",
            strength: "비즈니스 로직 중심",
            pros: [
                "엔티티 자동 매핑",
                "Spring 완벽 통합",
                "팀 대부분 숙련",
                "빠른 프로토타이핑",
                "객체지향적 설계"
            ],
            cons: [
                "복잡한 쿼리 한계",
                "윈도우 함수 제약",
                "N+1 문제 주의"
            ],
            bestFor: "CRUD 중심의 일반적인 웹서비스",
            examples: "쇼핑몰, 블로그, 커뮤니티, SaaS"
        },
        jooq: {
            title: "jOOQ",
            subtitle: "데이터 중심 + SQL 파워",
            color: "border-green-500 bg-green-50",
            headerColor: "text-green-700",
            percentage: "15%",
            strength: "데이터 관리 중심",
            pros: [
                "SQL 완벽한 직관성",
                "모든 DB 기능 활용",
                "뛰어난 성능 최적화",
                "타입 안전한 쿼리",
                "Database First 설계"
            ],
            cons: [
                "학습 자료 상대적 부족",
                "Database First 제약",
                "초기 설정 필요"
            ],
            bestFor: "데이터 분석과 관리가 핵심인 시스템",
            examples: "BI 대시보드, 분석 플랫폼, 관리자 시스템"
        }
    };

    const decisionCriteria = [
        {
            title: "📊 프로젝트 성격",
            scenarios: [
                {
                    icon: "🏢",
                    condition: "비즈니스 로직이 복잡하고 데이터는 단순",
                    recommendation: "JPA + QueryDSL",
                    reason: "객체지향 설계와 관계 매핑이 유리",
                    color: "bg-blue-100 text-blue-800"
                },
                {
                    icon: "📈",
                    condition: "데이터 분석, 리포팅, 복잡한 집계가 핵심",
                    recommendation: "jOOQ",
                    reason: "SQL의 모든 기능을 활용한 최적화 가능",
                    color: "bg-green-100 text-green-800"
                }
            ]
        },
        {
            title: "👥 팀 역량",
            scenarios: [
                {
                    icon: "☕",
                    condition: "Java/Spring 중심, ORM 경험 풍부",
                    recommendation: "JPA + QueryDSL",
                    reason: "기존 지식과 경험을 최대한 활용",
                    color: "bg-blue-100 text-blue-800"
                },
                {
                    icon: "💾",
                    condition: "SQL 전문성, 데이터베이스 중심 사고",
                    recommendation: "jOOQ",
                    reason: "SQL 직관성으로 즉시 생산성 확보",
                    color: "bg-green-100 text-green-800"
                }
            ]
        },
        {
            title: "⚡ 성능 요구사항",
            scenarios: [
                {
                    icon: "🚀",
                    condition: "개발 속도 우선, 적당한 성능",
                    recommendation: "JPA + QueryDSL",
                    reason: "자동화된 기능으로 빠른 개발",
                    color: "bg-blue-100 text-blue-800"
                },
                {
                    icon: "🔥",
                    condition: "최고 성능, 복잡한 쿼리 최적화 필요",
                    recommendation: "jOOQ",
                    reason: "직접적인 SQL 제어로 극한 최적화",
                    color: "bg-green-100 text-green-800"
                }
            ]
        }
    ];

    const realWorldExamples = {
        jpa: [
            {
                type: "💼 E-commerce",
                description: "상품, 주문, 회원 관리",
                why: "엔티티 관계가 명확하고 CRUD 중심",
                complexity: "중간"
            },
            {
                type: "📱 SaaS 플랫폼",
                description: "사용자 관리, 구독, 결제",
                why: "비즈니스 로직 복잡, 데이터는 단순",
                complexity: "높음"
            },
            {
                type: "🌐 커뮤니티",
                description: "게시판, 댓글, 회원 시스템",
                why: "표준적인 웹 패턴, 빠른 개발",
                complexity: "낮음"
            }
        ],
        jooq: [
            {
                type: "📊 BI 대시보드",
                description: "실시간 데이터 집계와 분석",
                why: "복잡한 집계 쿼리, 윈도우 함수 필수",
                complexity: "높음"
            },
            {
                type: "🏦 금융 리포팅",
                description: "거래 분석, 위험 관리, 규제 보고",
                why: "정확한 SQL 제어, 성능 최적화 필요",
                complexity: "매우 높음"
            },
            {
                type: "🎯 관리자 시스템",
                description: "사용자 행동 분석, 시스템 모니터링",
                why: "다양한 데이터 소스, 복잡한 조인",
                complexity: "높음"
            }
        ]
    };

    const renderOverview = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    🎯 두 강력한 기술의 명확한 차이
                </h2>
                <p className="text-gray-600">
                    각각의 고유한 영역에서 최고의 성능을 발휘
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {Object.entries(coreComparison).map(([key, tech]) => (
                    <Card key={key} className={`border-2 ${tech.color} hover:shadow-xl transition-all duration-300`}>
                        <CardHeader className="text-center pb-4">
                            <CardTitle className={`${tech.headerColor} text-2xl mb-2`}>
                                {tech.title}
                            </CardTitle>
                            <p className="text-gray-600 font-medium">{tech.subtitle}</p>
                            <div className="flex justify-center gap-2 mt-3">
                                <Badge variant="secondary">시장 점유율 {tech.percentage}</Badge>
                                <Badge className={key === 'jpa' ? 'bg-blue-500' : 'bg-green-500'}>
                                    {tech.strength}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <div>
                                <h4 className="font-bold text-green-600 mb-3 flex items-center">
                                    <span className="mr-2">✨</span>핵심 강점
                                </h4>
                                <div className="space-y-2">
                                    {tech.pros.map((pro, index) => (
                                        <div key={index} className="flex items-center bg-white p-2 rounded border-l-4 border-l-green-500">
                                            <span className="text-green-500 mr-2">●</span>
                                            <span className="text-sm text-gray-700">{pro}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-orange-600 mb-3 flex items-center">
                                    <span className="mr-2">⚠️</span>고려사항
                                </h4>
                                <div className="space-y-2">
                                    {tech.cons.map((con, index) => (
                                        <div key={index} className="flex items-center bg-gray-50 p-2 rounded border-l-4 border-l-orange-400">
                                            <span className="text-orange-400 mr-2">●</span>
                                            <span className="text-sm text-gray-600">{con}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-3 border-t border-gray-200">
                                <h4 className="font-bold text-gray-700 mb-2">🎯 최적 활용</h4>
                                <p className="text-sm text-gray-600 mb-2">{tech.bestFor}</p>
                                <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded italic">
                                    예시: {tech.examples}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200">
                <h3 className="font-bold text-indigo-800 mb-4 text-center text-xl">🔑 핵심 메시지</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-blue-500">
                        <h4 className="font-bold text-blue-700 mb-3 text-lg">🏢 비즈니스 중심</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            객체지향 설계와 빠른 개발이 우선이고,
                            <strong className="text-blue-600"> 엔티티 관계 매핑의 편리함</strong>을
                            최대한 활용하고 싶다면 <strong>JPA + QueryDSL</strong>
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-green-500">
                        <h4 className="font-bold text-green-700 mb-3 text-lg">📊 데이터 중심</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            <strong className="text-green-600">데이터 관리와 분석이 프로젝트의 핵심</strong>이고,
                            SQL의 모든 기능을 활용한 최적화가 필요하다면 <strong>jOOQ</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDecision = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                🤔 어떤 기술을 선택할까?
            </h2>

            <div className="space-y-8">
                {decisionCriteria.map((criterion, index) => (
                    <Card key={index} className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
                        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                            <CardTitle className="text-xl text-gray-800">{criterion.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {criterion.scenarios.map((scenario, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-200">
                                        <div className="flex items-start gap-3 mb-4">
                                            <span className="text-2xl">{scenario.icon}</span>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                                                    {scenario.condition}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Badge className={`${scenario.color} text-sm px-3 py-1`}>
                                                ✅ {scenario.recommendation}
                                            </Badge>
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                <strong>이유:</strong> {scenario.reason}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-yellow-50 p-8 rounded-xl border-2 border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-4 text-center text-xl">🎯 간단한 결정 가이드</h3>
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-l-4 border-l-blue-500">
                        <h4 className="font-bold text-blue-700 mb-2">📝 질문 1: 프로젝트의 핵심이 무엇인가?</h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 font-bold">→</span>
                                <span><strong>비즈니스 로직</strong> → JPA + QueryDSL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-bold">→</span>
                                <span><strong>데이터 분석/관리</strong> → jOOQ</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-l-4 border-l-green-500">
                        <h4 className="font-bold text-green-700 mb-2">🧑‍💻 질문 2: 팀의 강점이 무엇인가?</h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600 font-bold">→</span>
                                <span><strong>Java/Spring 중심</strong> → JPA + QueryDSL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600 font-bold">→</span>
                                <span><strong>SQL/DB 중심</strong> → jOOQ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderExamples = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                💼 실제 프로젝트 사례
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardHeader className="bg-blue-100">
                        <CardTitle className="text-blue-800 text-xl">
                            🏢 JPA + QueryDSL 프로젝트
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {realWorldExamples.jpa.map((example, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-blue-700">{example.type}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            복잡도: {example.complexity}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                                    <p className="text-xs text-blue-600">
                                        <strong>선택 이유:</strong> {example.why}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2 border-green-200 bg-green-50">
                    <CardHeader className="bg-green-100">
                        <CardTitle className="text-green-800 text-xl">
                            📊 jOOQ 프로젝트
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {realWorldExamples.jooq.map((example, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-green-700">{example.type}</h4>
                                        <Badge variant="outline" className="text-xs">
                                            복잡도: {example.complexity}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{example.description}</p>
                                    <p className="text-xs text-green-600">
                                        <strong>선택 이유:</strong> {example.why}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-6 text-center text-xl">📈 실제 도입 시나리오</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border-l-4 border-l-blue-500">
                        <h4 className="font-bold text-blue-700 mb-3">🚀 스타트업 신규 서비스</h4>
                        <div className="space-y-2 text-sm">
                            <p><strong>상황:</strong> MVP 빠른 출시, CRUD 중심</p>
                            <p><strong>선택:</strong> JPA + QueryDSL로 시작</p>
                            <p><strong>결과:</strong> 2개월 만에 서비스 런칭 성공</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg border-l-4 border-l-green-500">
                        <h4 className="font-bold text-green-700 mb-3">📊 기업 BI 시스템</h4>
                        <div className="space-y-2 text-sm">
                            <p><strong>상황:</strong> 복잡한 데이터 분석, 리포팅</p>
                            <p><strong>선택:</strong> jOOQ로 처음부터 구축</p>
                            <p><strong>결과:</strong> 복잡한 쿼리 최적화로 성능 80% 향상</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                <h4 className="font-bold text-indigo-800 mb-3">💡 핵심 인사이트</h4>
                <p className="text-sm text-indigo-700 leading-relaxed">
                    두 기술 모두 각자의 영역에서 <strong>최고의 성능</strong>을 발휘합니다.
                    <br />
                    중요한 것은 <strong>프로젝트 목적과 팀 역량에 맞는 올바른 선택</strong>입니다.
                </p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-3">
                    JPA vs jOOQ
                </h1>
                <p className="text-lg text-gray-600 mb-2">두 강력한 기술의 명확한 선택 가이드</p>
                <p className="text-sm text-gray-500">각각의 영역에서 최고 성능을 발휘하는 독립적 솔루션</p>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-3 mb-8">
                {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        variant={activeTab === tab.id ? "default" : "outline"}
                        className={`${activeTab === tab.id
                                ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } transition-all duration-200 px-6 py-3`}
                    >
                        <span className="mr-2 text-lg">{tab.icon}</span>
                        {tab.label}
                    </Button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                {activeTab === 'overview' && renderOverview()}
                {activeTab === 'decision' && renderDecision()}
                {activeTab === 'examples' && renderExamples()}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-sm text-gray-500">
                <p>💡 각 기술은 고유한 영역에서 독보적인 강점을 가진 완전한 솔루션입니다</p>
            </div>
        </div>
    );
};

export default DatabaseTechGuide;