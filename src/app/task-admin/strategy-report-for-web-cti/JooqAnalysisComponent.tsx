import React, { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, AlertCircle, XCircle, ArrowRight, Database, Code, Settings, Zap } from 'lucide-react';

type SectionKey = 'advantages' | 'disadvantages' | 'setup' | 'workflow';

const JooqAnalysisComponent = () => {
    const [expandedSections, setExpandedSections] = useState<Record<SectionKey, boolean>>({
        advantages: false,
        disadvantages: false,
        setup: false,
        workflow: false
    });

    const toggleSection = (section: SectionKey) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const advantages = [
        {
            title: "Type-Safe 쿼리 작성",
            desc: "컴파일 타임에 SQL 오류를 잡아내어 런타임 에러 방지",
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
        },
        {
            title: "IDE 자동완성 지원",
            desc: "테이블명, 컬럼명 자동완성으로 개발 생산성 향상",
            icon: <Code className="w-5 h-5 text-blue-500" />
        },
        {
            title: "복잡한 쿼리 표현 가능",
            desc: "서브쿼리, 윈도우 함수, CTE 등 복잡한 SQL을 Java 코드로 표현",
            icon: <Database className="w-5 h-5 text-purple-500" />
        },
        {
            title: "N+1 문제 해결 용이",
            desc: "명시적 JOIN 작성으로 쿼리 최적화가 직관적",
            icon: <Zap className="w-5 h-5 text-yellow-500" />
        },
        {
            title: "다양한 DB 지원",
            desc: "MySQL, PostgreSQL, Oracle 등 여러 데이터베이스 지원",
            icon: <Settings className="w-5 h-5 text-gray-500" />
        }
    ];

    const disadvantages = [
        {
            title: "초기 설정 복잡성",
            desc: "build.gradle 설정, DSL 생성 등 초기 세팅이 복잡함",
            severity: "high"
        },
        {
            title: "러닝 커브",
            desc: "QueryDSL과 다른 문법으로 인한 학습 비용 발생",
            severity: "medium"
        },
        {
            title: "코드 생성 의존성",
            desc: "테이블 변경 시마다 DSL 재생성 필요",
            severity: "medium"
        },
        {
            title: "디버깅 어려움",
            desc: "생성된 SQL을 직접 확인하기 어려울 수 있음",
            severity: "low"
        }
    ];

    const setupChallenges = [
        {
            issue: "설정이 길다",
            desc: "build.gradle에 설정할 게 많음",
            icon: <AlertCircle className="w-4 h-4 text-orange-500" />
        },
        {
            issue: "테이블 존재 여부에 따라 실패함",
            desc: "DB에 테이블이 없으면 DSL 생성 안 됨",
            icon: <XCircle className="w-4 h-4 text-red-500" />
        },
        {
            issue: "DSL 생성은 수동 실행 필요",
            desc: "generateJooq를 별도 명령어로 실행해야 함",
            icon: <AlertCircle className="w-4 h-4 text-orange-500" />
        },
        {
            issue: "인텔리제이에서 소스 루트 지정 필요",
            desc: "src/main/generated 인식 안 되면 빨간 줄 생김",
            icon: <AlertCircle className="w-4 h-4 text-orange-500" />
        }
    ];

    const workflowSteps = [
        "원하는 쿼리를 jooq DSL로 작성",
        "Service 클래스에 메서드로 정의",
        "DTO에 매핑",
        "GraphQL Resolver에 연결",
        "schema.graphqls에 쿼리 타입 정의",
        "Altair 또는 API 테스트"
    ];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    QueryDSL의 대체자 jOOQ
                </h1>
                <p className="text-xl text-gray-600 mb-2">장단점 집중 분석 for 실무</p>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* 장점 섹션 */}
                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
                    <button
                        onClick={() => toggleSection('advantages')}
                        className="flex items-center justify-between w-full text-left mb-4"
                    >
                        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6" />
                            jOOQ의 장점
                        </h2>
                        {expandedSections.advantages ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>

                    {expandedSections.advantages && (
                        <div className="space-y-4">
                            {advantages.map((advantage, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                                    <div className="flex items-start gap-3">
                                        {advantage.icon}
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{advantage.title}</h3>
                                            <p className="text-gray-600 text-sm">{advantage.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 단점 섹션 */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-100">
                    <button
                        onClick={() => toggleSection('disadvantages')}
                        className="flex items-center justify-between w-full text-left mb-4"
                    >
                        <h2 className="text-2xl font-bold text-red-800 flex items-center gap-2">
                            <XCircle className="w-6 h-6" />
                            jOOQ의 단점
                        </h2>
                        {expandedSections.disadvantages ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>

                    {expandedSections.disadvantages && (
                        <div className="space-y-4">
                            {disadvantages.map((disadvantage, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-red-100">
                                    <div className="flex items-start gap-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(disadvantage.severity)}`}>
                                            {disadvantage.severity === 'high' ? '높음' : disadvantage.severity === 'medium' ? '보통' : '낮음'}
                                        </span>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 mb-1">{disadvantage.title}</h3>
                                            <p className="text-gray-600 text-sm">{disadvantage.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 설정 어려움 섹션 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200 mb-8">
                <button
                    onClick={() => toggleSection('setup')}
                    className="flex items-center justify-between w-full text-left mb-4"
                >
                    <h2 className="text-2xl font-bold text-orange-800 flex items-center gap-2">
                        <Settings className="w-6 h-6" />
                        왜 jOOQ 설정이 어렵게 느껴지는가?
                    </h2>
                    {expandedSections.setup ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>

                {expandedSections.setup && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200 mb-4">
                            <p className="text-gray-700 font-medium">
                                개념이 어렵다기보다 <span className="text-orange-600 font-bold">"절차가 번거롭다"</span>는 느낌이 강합니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {setupChallenges.map((challenge, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-yellow-100">
                                    <div className="flex items-start gap-3">
                                        {challenge.icon}
                                        <div>
                                            <h3 className="font-semibold text-gray-800 mb-1">{challenge.issue}</h3>
                                            <p className="text-gray-600 text-sm">{challenge.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 개발 워크플로우 섹션 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <button
                    onClick={() => toggleSection('workflow')}
                    className="flex items-center justify-between w-full text-left mb-4"
                >
                    <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                        <ArrowRight className="w-6 h-6" />
                        이후 개발 흐름
                    </h2>
                    {expandedSections.workflow ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>

                {expandedSections.workflow && (
                    <div>
                        <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-green-800 font-semibold text-center">
                                ✅ 한 번 DSL만 잘 생성해두면, 이후부터는 매우 쉽습니다.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {workflowSteps.map((step, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700">{step}</p>
                                    {index < workflowSteps.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 결론 */}
            <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">실무 관점에서의 결론</h3>
                    <p className="text-blue-100">
                        초기 설정의 복잡함을 극복하면, QueryDSL보다 더 강력하고 안전한 쿼리 작성이 가능합니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JooqAnalysisComponent;