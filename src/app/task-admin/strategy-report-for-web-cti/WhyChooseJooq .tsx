import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// 헤더 컴포넌트
const Header = () => (
    <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            그래도 JOOQ를 선택해야 하는 이유
        </h1>
        <p className="text-lg text-gray-600 mb-2">생산성과 혁신을 위한 현명한 선택</p>
        <p className="text-sm text-gray-500">복잡함보다는 명확함을, 학습보다는 실행을</p>
    </div>
);

// 탭 네비게이션 컴포넌트
type Tab = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

type TabNavigationProps = {
    activeTab: string;
    setActiveTab: (id: string) => void;
    tabs: Tab[];
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, tabs }) => (
    <div className="flex justify-center gap-3 mb-8">
        {tabs.map((tab) => (
            <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? "default" : "outline"}
                className={`${activeTab === tab.id
                    ? "bg-gradient-to-r from-green-600 to-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                    } transition-all duration-200 px-6 py-3`}
            >
                <span className="mr-2 text-lg">{tab.icon}</span>
                {tab.label}
            </Button>
        ))}
    </div>
);

// 문제점 카드 컴포넌트
type Problem = {
    icon: React.ReactNode;
    title: string;
    description: string;
    codeExample: string;
    impact: string;
};

const ProblemCard: React.FC<{ problem: Problem }> = ({ problem }) => (
    <Card className="border-2 border-red-200 bg-red-50 hover:shadow-lg transition-all">
        <CardHeader className="bg-red-100">
            <CardTitle className="text-red-800 flex items-center">
                <span className="mr-2 text-2xl">{problem.icon}</span>
                {problem.title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <p className="text-red-700 mb-4 text-sm leading-relaxed">{problem.description}</p>
            <div className="bg-white p-4 rounded-lg border border-red-200">
                <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
                    {problem.codeExample}
                </pre>
            </div>
            <p className="text-red-600 text-xs mt-3 font-medium italic">{problem.impact}</p>
        </CardContent>
    </Card>
);

// JOOQ 장점 카드 컴포넌트
type Advantage = {
    icon: React.ReactNode;
    title: string;
    description: string;
    codeExample: string;
    impact: string;
};

const JooqAdvantageCard: React.FC<{ advantage: Advantage }> = ({ advantage }) => (
    <Card className="border-2 border-green-200 bg-green-50 hover:shadow-lg transition-all">
        <CardHeader className="bg-green-100">
            <CardTitle className="text-green-800 flex items-center">
                <span className="mr-2 text-2xl">{advantage.icon}</span>
                {advantage.title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <p className="text-green-700 mb-4 text-sm leading-relaxed">{advantage.description}</p>
            <div className="bg-white p-4 rounded-lg border border-green-200">
                <pre className="text-xs text-gray-800 overflow-x-auto whitespace-pre-wrap">
                    {advantage.codeExample}
                </pre>
            </div>
            <p className="text-green-600 text-xs mt-3 font-medium italic">{advantage.impact}</p>
        </CardContent>
    </Card>
);

// 일상 시나리오 컴포넌트
type DayScenarioProps = {
    scenario: {
        title: string;
        timeline: { time: string; activity: string }[];
    };
    type: 'jpa' | 'jooq';
};

const DayScenario: React.FC<DayScenarioProps> = ({ scenario, type }) => (
    <Card className={`border-2 ${type === 'jpa' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
        <CardHeader className={type === 'jpa' ? 'bg-red-100' : 'bg-green-100'}>
            <CardTitle className={`${type === 'jpa' ? 'text-red-800' : 'text-green-800'} text-xl`}>
                {scenario.title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <div className="space-y-3">
                {scenario.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                            {item.time}
                        </Badge>
                        <p className={`text-sm ${type === 'jpa' ? 'text-red-700' : 'text-green-700'}`}>
                            {item.activity}
                        </p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// 철학 비교 컴포넌트
const PhilosophyComparison = () => (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-6 text-center text-xl">
            🧠 리누스 토발즈의 철학과 일치하는 JOOQ
        </h3>

        <div className="bg-white p-6 rounded-lg border border-purple-200 mb-6">
            <blockquote className="text-lg italic text-gray-700 text-center mb-4">
                "C++는 끔찍한 언어다. 이 말이 충격적이라면, 내가 프로그래밍을 더 많이 해봤기 때문이다."
            </blockquote>
            <p className="text-center text-sm text-gray-500">- 리누스 토발즈</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-l-red-500">
                <h4 className="font-bold text-red-700 mb-3">🔴 복잡성의 문제</h4>
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="font-semibold text-gray-800">C++:</p>
                        <p className="text-gray-600">다중 상속, 템플릿, 연산자 오버로딩...</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">JPA + QueryDSL:</p>
                        <p className="text-gray-600">엔티티 매핑, 연관관계, 프록시, 지연로딩...</p>
                    </div>
                    <p className="text-red-600 font-medium">→ 같은 일을 하는 방법이 너무 많고, 코드 읽기가 어려움</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-l-green-500">
                <h4 className="font-bold text-green-700 mb-3">🟢 단순함의 힘</h4>
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="font-semibold text-gray-800">Linux Kernel (C):</p>
                        <p className="text-gray-600">명확하고 직관적인 코드</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">JOOQ:</p>
                        <p className="text-gray-600">SQL 그대로, 타입 안전성 보장</p>
                    </div>
                    <p className="text-green-600 font-medium">→ 한 가지 방법으로 명확하게, 코드가 곧 문서</p>
                </div>
            </div>
        </div>
    </div>
);

// 토스 성공 사례 컴포넌트
const TossSuccessStory = () => (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-6 text-center text-xl">
            🚀 토스가 증명한 JOOQ의 힘
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-blue-500">
                <h4 className="font-bold text-blue-700 mb-3 text-lg">⚡ 생산성 우선주의</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                    "빠르게 만들고, 빠르게 검증하고, 빠르게 개선" -
                    JOOQ는 SQL 지식만 있으면 <strong>즉시 생산성 극대화</strong>
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-green-500">
                <h4 className="font-bold text-green-700 mb-3 text-lg">💰 금융 데이터 처리</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                    복잡한 금융 거래 분석, 실시간 정산, 위험 관리 등
                    <strong>미션 크리티컬한 데이터 처리</strong>를 완벽 수행
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-l-purple-500">
                <h4 className="font-bold text-purple-700 mb-3 text-lg">🔥 혁신 속도</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                    국내 최고 수준의 <strong>빠른 기능 개발과 배포</strong>를 통해
                    금융 혁신을 선도하는 기업으로 성장
                </p>
            </div>
        </div>

        <div className="mt-6 bg-white p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm text-center font-medium">
                💡 "가장 열심히 일하기로 유명한 기업"이 선택한 기술엔 이유가 있다
            </p>
        </div>
    </div>
);

// 핵심 선택 기준 컴포넌트
const CoreSelectionCriteria = () => (
    <div className="bg-yellow-50 p-8 rounded-xl border-2 border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-6 text-center text-xl">
            🎯 JOOQ 선택의 핵심 4가지
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg border-l-4 border-l-green-500">
                    <h4 className="font-bold text-green-700 mb-2">1️⃣ SQL 지식 = 즉시 생산성</h4>
                    <p className="text-sm text-gray-600">
                        기존 SQL 지식을 그대로 활용하여 학습 시간 없이 바로 개발 가능
                    </p>
                </div>

                <div className="bg-white p-5 rounded-lg border-l-4 border-l-blue-500">
                    <h4 className="font-bold text-blue-700 mb-2">2️⃣ 코드 가독성 = 유지보수성</h4>
                    <p className="text-sm text-gray-600">
                        SQL과 거의 동일한 문법으로 누구나 쉽게 이해하고 수정 가능
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white p-5 rounded-lg border-l-4 border-l-purple-500">
                    <h4 className="font-bold text-purple-700 mb-2">3️⃣ 타입 안정성 = 품질 보장</h4>
                    <p className="text-sm text-gray-600">
                        컴파일 타임에 오류를 잡아내어 런타임 버그를 원천 차단
                    </p>
                </div>

                <div className="bg-white p-5 rounded-lg border-l-4 border-l-red-500">
                    <h4 className="font-bold text-red-700 mb-2">4️⃣ 성능 투명성 = 최적화 용이</h4>
                    <p className="text-sm text-gray-600">
                        실행되는 SQL을 정확히 알 수 있어 성능 튜닝이 직관적
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// 메인 컴포넌트
const WhyChooseJooq = () => {
    const [activeTab, setActiveTab] = useState('problems');

    const tabs = [
        { id: 'problems', label: '😤 JPA의 문제', icon: '⚠️' },
        { id: 'solutions', label: '✨ JOOQ의 해답', icon: '🚀' },
        { id: 'reality', label: '🎯 현실적 비교', icon: '💼' },
        { id: 'conclusion', label: '🏆 최종 결론', icon: '✅' }
    ];

    const jpaProblems = [
        {
            icon: "📚",
            title: "학습 곡선의 지옥",
            description: "간단한 조회 하나 하려면 엔티티 매핑, 연관관계, 프록시, 지연로딩, 더티체킹 등 수많은 개념을 숙지해야 함",
            codeExample: `@Entity
@Table(name = "campaign")
public class Campaign {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY) // 언제 LAZY? 언제 EAGER?
    @JoinColumn(name = "team_id")
    private Team team; // N+1 폭탄 대기중...
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, 
               orphanRemoval = true, fetch = FetchType.LAZY)
    @BatchSize(size = 20) // 이것도 알아야 하고...
    private List<Call> calls = new ArrayList<>();
}`,
            impact: "이거 다 배우는데 몇 달? 😰"
        },
        {
            icon: "🤯",
            title: "복잡한 조회의 악몽",
            description: "QueryDSL로 복잡한 통계를 작성하면 SQL이 무엇인지 한눈에 알아보기 어려워짐",
            codeExample: `List<CampaignStatsDto> result = queryFactory
    .select(Projections.constructor(CampaignStatsDto.class,
        campaign.id,
        campaign.name,
        call.count().as("totalCalls"),
        call.duration.avg().as("avgDuration"),
        new CaseBuilder()
            .when(call.status.eq("SUCCESS")).then(1)
            .otherwise(0).sum().as("successCount"),
        team.name
    ))
    .from(campaign)
    .leftJoin(campaign.calls, call)
    .leftJoin(campaign.team, team)
    .where(campaign.createdAt.between(startDate, endDate)
        .and(team.datacenter.id.eq(datacenterId)))
    .groupBy(campaign.id, campaign.name, team.name)
    .having(call.count().gt(10))
    .orderBy(call.count().desc())
    .fetch();`,
            impact: "이게 SQL로 뭔지 한눈에 안 보임! 🤢"
        }
    ];

    const jooqAdvantages = [
        {
            icon: "⚡",
            title: "SQL 그대로의 명쾌함",
            description: "SQL을 아는 사람이라면 누구나 즉시 이해할 수 있는 직관적인 문법으로 생산성 극대화",
            codeExample: `List<CampaignStatsRecord> result = create
    .select(
        CAMPAIGN.ID,
        CAMPAIGN.NAME,
        count(CALL.ID).as("total_calls"),
        avg(CALL.DURATION).as("avg_duration"),
        sum(case_().when(CALL.STATUS.eq("SUCCESS"), 1).otherwise(0)).as("success_count"),
        TEAM.NAME.as("team_name")
    )
    .from(CAMPAIGN)
    .leftJoin(CALL).on(CALL.CAMPAIGN_ID.eq(CAMPAIGN.ID))
    .leftJoin(TEAM).on(TEAM.ID.eq(CAMPAIGN.TEAM_ID))
    .where(CAMPAIGN.CREATED_AT.between(startDate, endDate)
        .and(TEAM.DATACENTER_ID.eq(datacenterId)))
    .groupBy(CAMPAIGN.ID, CAMPAIGN.NAME, TEAM.NAME)
    .having(count(CALL.ID).gt(10))
    .orderBy(count(CALL.ID).desc())
    .fetch();`,
            impact: "SQL 그대로! 한눈에 이해 가능! ✨"
        },
        {
            icon: "💰",
            title: "금융급 데이터 처리",
            description: "토스가 실제로 사용하는 복잡한 금융 데이터 조회도 직관적이고 안전하게 처리",
            codeExample: `// 토스 같은 금융 데이터 조회
create.select(
    ACCOUNT.USER_ID,
    sum(TRANSACTION.AMOUNT).as("total_amount"),
    count().filterWhere(TRANSACTION.TYPE.eq("DEPOSIT")).as("deposit_count"),
    percentileCont(0.95).withinGroupOrderBy(TRANSACTION.AMOUNT).as("p95_amount")
)
.from(ACCOUNT)
.join(TRANSACTION).on(TRANSACTION.ACCOUNT_ID.eq(ACCOUNT.ID))
.where(TRANSACTION.CREATED_AT.ge(LocalDateTime.now().minusMonths(1)))
.groupBy(ACCOUNT.USER_ID)
.having(sum(TRANSACTION.AMOUNT).gt(BigDecimal.valueOf(1000000)))`,
            impact: "이런 걸 JPA로? 상상만 해도... 🤯"
        }
    ];

    const dayScenarios = {
        jpa: {
            title: "😩 JPA 팀의 하루",
            timeline: [
                { time: "09:00", activity: "LazyInitializationException이 또..." },
                { time: "10:30", activity: "N+1 쿼리가 1000개나 나가네요" },
                { time: "11:00", activity: "이 연관관계 매핑이 맞나요?" },
                { time: "14:00", activity: "QueryDSL 빌드 에러..." },
                { time: "15:30", activity: "결국 네이티브 쿼리로..." }
            ]
        },
        jooq: {
            title: "😊 JOOQ 팀의 하루",
            timeline: [
                { time: "09:00", activity: "어제 짠 SQL 그대로 JOOQ로 바꿔볼까요" },
                { time: "09:30", activity: "컴파일 에러로 오타 잡혔네요" },
                { time: "10:00", activity: "성능 튜닝도 SQL 경험 그대로" },
                { time: "10:30", activity: "새 기능 구현 완료!" },
                { time: "11:00", activity: "다음 스프린트 계획 세우기" }
            ]
        }
    };

    const renderProblems = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                😤 JPA + QueryDSL의 현실적 문제들
            </h2>

            <div className="grid lg:grid-cols-1 gap-8">
                {jpaProblems.map((problem, index) => (
                    <ProblemCard key={index} problem={problem} />
                ))}
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
                <h3 className="font-bold text-red-800 mb-2">🚨 핵심 문제</h3>
                <p className="text-red-700 text-sm">
                    <strong>생산성과 혁신이 최우선</strong>인 상황에서
                    복잡한 학습과 난해한 코드는 명백한 <strong>안티패턴</strong>
                </p>
            </div>
        </div>
    );

    const renderSolutions = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                ✨ JOOQ가 제시하는 명확한 해답
            </h2>

            <div className="grid lg:grid-cols-1 gap-8">
                {jooqAdvantages.map((advantage, index) => (
                    <JooqAdvantageCard key={index} advantage={advantage} />
                ))}
            </div>

            <PhilosophyComparison />
        </div>
    );

    const renderReality = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                🎯 개발팀의 현실적 일상 비교
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
                <DayScenario scenario={dayScenarios.jpa} type="jpa" />
                <DayScenario scenario={dayScenarios.jooq} type="jooq" />
            </div>

            <TossSuccessStory />

            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4 text-center text-xl">💡 현실적 인사이트</h3>
                <div className="text-center">
                    <p className="text-gray-700 leading-relaxed">
                        <strong className="text-blue-600">복잡한 걸 배우느라 시간 쓸 바에</strong>,
                        명확하고 직관적인 도구로 <strong className="text-green-600">비즈니스 가치 창출에 집중</strong>하는 게
                        훨씬 현명한 선택입니다.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderConclusion = () => (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                🏆 혁신과 생산성을 위한 최종 선택
            </h2>

            <CoreSelectionCriteria />

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
                <h3 className="font-bold text-green-800 mb-6 text-center text-xl">
                    🎯 JOOQ를 선택해야 하는 결정적 이유
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h4 className="font-bold text-green-700 text-lg">✅ 즉시 효과</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">▶</span>
                                <span className="text-sm">SQL 지식으로 바로 생산성</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">▶</span>
                                <span className="text-sm">컴파일 타임 오류 검증</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-green-600">▶</span>
                                <span className="text-sm">명확한 성능 최적화</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-bold text-blue-700 text-lg">🚀 장기적 가치</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">▶</span>
                                <span className="text-sm">유지보수 비용 절감</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">▶</span>
                                <span className="text-sm">팀원 온보딩 시간 단축</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">▶</span>
                                <span className="text-sm">비즈니스 혁신 가속화</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
                <h3 className="font-bold text-purple-800 mb-4 text-xl">🌟 최종 메시지</h3>
                <p className="text-lg text-purple-700 leading-relaxed mb-4">
                    <strong>"가장 열심히 일하기로 유명한"</strong> 토스가 선택한 JOOQ
                </p>
                <p className="text-sm text-purple-600">
                    복잡함보다는 <strong>명확함</strong>을, 학습보다는 <strong>실행</strong>을,
                    이론보다는 <strong>결과</strong>를 중시하는 개발팀이라면
                    <strong className="text-purple-800">JOOQ가 정답</strong>입니다.
                </p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <Header />

            <TabNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                tabs={tabs}
            />

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                {activeTab === 'problems' && renderProblems()}
                {activeTab === 'solutions' && renderSolutions()}
                {activeTab === 'reality' && renderReality()}
                {activeTab === 'conclusion' && renderConclusion()}
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
                <p>💡 생산성과 혁신을 위한 현명한 기술 선택이 성공의 열쇠입니다</p>
            </div>
        </div>
    );
};

export default WhyChooseJooq;