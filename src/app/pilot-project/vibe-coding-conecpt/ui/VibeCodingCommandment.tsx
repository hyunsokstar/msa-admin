"use client";

import React, { useState } from 'react';
import {
    Code, Zap, Bot, Rocket, Share2, Target, DollarSign,
    Battery, Sword, Trophy, CheckCircle, Clock, ChevronRight
} from 'lucide-react';

interface CommandmentData {
    id: number;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    action: string;
    actionPlan: {
        title: string;
        category: string;
        priority: string;
        steps: string[];
        timeframe: string;
        tools: string[];
    };
}

const VibeCodingCommandment = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const commandments: CommandmentData[] = [
        {
            id: 1,
            icon: <Code className="w-6 h-6" />,
            title: "시스템 설계자, 아키텍트 전문가, 풀스택 개발의 시대가 도래",
            subtitle: "한 명이 전체 시스템을 설계하고 구현하는 시대",
            description: "마이크로서비스부터 프론트엔드까지 전체 아키텍처를 설계할 수 있는 풀스택 아키텍트가 필요하다. 단순 코딩이 아닌 시스템 전체를 조망하고, 확장성과 유지보수성을 고려한 설계 능력이 핵심 경쟁력이다.",
            action: "프로젝트 요구사항을 들으면 30분 내로 전체 시스템 아키텍처 설계 완료",
            actionPlan: {
                title: "풀스택 아키텍트 로드맵",
                category: "설계",
                priority: "높음",
                steps: [
                    "마이크로서비스 패턴 12가지 학습 완료",
                    "AWS/K8s 환경에서 3개 프로젝트 배포",
                    "시스템 설계 면접 문제 50개 풀이",
                    "실제 프로젝트 아키텍처 문서 3개 작성"
                ],
                timeframe: "3개월",
                tools: ["AWS", "Kubernetes", "Docker", "Microservices"]
            }
        },
        {
            id: 2,
            icon: <Zap className="w-6 h-6" />,
            title: "속도가 품질을 결정한다: MVP → 반복 → 완성",
            subtitle: "느린 완벽보다 빠른 개선",
            description: "TDD, 핫 리로드, 라이브 코딩으로 피드백 루프를 극단적으로 단축하라. 기능 하나당 설계 10분, 구현 30분, 테스트 10분의 리듬을 만들어라. 속도가 느려지면 아키텍처를 의심하라.",
            action: "기능 요청부터 배포까지 4시간 내 완료 목표",
            actionPlan: {
                title: "스피드 개발 루틴",
                category: "속도",
                priority: "높음",
                steps: [
                    "핫 리로드 개발 환경 구축 (Vite, Next.js)",
                    "CI/CD 파이프라인 자동화 설정",
                    "개발 → 테스트 → 배포 템플릿 구축",
                    "1시간 단위로 개발 속도 측정 및 개선"
                ],
                timeframe: "6주",
                tools: ["GitHub Actions", "Docker", "Vite", "Testing Tools"]
            }
        },
        {
            id: 3,
            icon: <Bot className="w-6 h-6" />,
            title: "AI 협업 마스터: 도구가 아닌 팀원으로 활용",
            subtitle: "AI와 페어 프로그래밍하지 못하면 도태된다",
            description: "GPT-4, Copilot, Cursor를 단순 코드 생성기로 쓰지 마라. 아키텍처 설계, 코드 리뷰, 문서화, 디버깅까지 AI와 협업하라. 인간은 전략과 창의, AI는 반복과 정확성을 담당하는 하이브리드 개발이 새로운 표준이다.",
            action: "코딩 시간의 40%를 AI 협업으로 대체",
            actionPlan: {
                title: "AI 페어 프로그래밍",
                category: "AI",
                priority: "중간",
                steps: [
                    "Claude/GPT-4 프롬프팅 기법 마스터",
                    "Cursor IDE + Copilot 워크플로우 구축",
                    "AI 코드 리뷰 자동화 시스템 구축",
                    "매일 AI와 페어 프로그래밍 2시간 실행"
                ],
                timeframe: "4주",
                tools: ["Claude", "Cursor", "GitHub Copilot", "Custom GPT"]
            }
        },
        {
            id: 4,
            icon: <Rocket className="w-6 h-6" />,
            title: "혁명적 기술 혁신과 진정성 필요",
            subtitle: "기존 방식을 파괴하고 새로운 표준을 만들어라",
            description: "뒤플래시가 DVR을 재정의하고, 피터 틸이 PayPal로 금융을 혁신했듯이, 기존 솔루션에 만족하지 마라. 점진적 개선이 아닌 10배 더 나은 완전히 새로운 접근을 시도하라.",
            action: "기존 솔루션을 10배 개선할 수 있는 근본적 접근 방식 발견",
            actionPlan: {
                title: "10배 혁신 사고",
                category: "혁신",
                priority: "높음",
                steps: [
                    "기존 시장 솔루션 10개 분석 및 한계점 도출",
                    "TRIZ 창의적 문제해결 방법론 학습",
                    "주 1회 브레인스토밍 세션 진행",
                    "MVP 프로토타입 2주 내 제작 후 피드백 수집"
                ],
                timeframe: "지속적",
                tools: ["Figma", "No-code Tools", "User Research", "Analytics"]
            }
        },
        {
            id: 5,
            icon: <Share2 className="w-6 h-6" />,
            title: "보일러플레이트와 기본기 공유를 통한 팀전력 향상",
            subtitle: "개인의 기본기가 팀의 전투력이 된다",
            description: "코드 컨벤션, 아키텍처 패턴, 문제 해결 노하우를 체계적으로 문서화하고 공유하라. 반복 작업은 보일러플레이트로 자동화하고, 개인 노하우는 팀 표준으로 승격시켜라.",
            action: "주 1회 기술 공유 세션, 개인 노하우의 80%를 팀 자산으로 전환",
            actionPlan: {
                title: "팀 지식 허브 구축",
                category: "공유",
                priority: "중간",
                steps: [
                    "Notion/Obsidian 기반 지식 베이스 구축",
                    "코드 스니펫 라이브러리 및 보일러플레이트 제작",
                    "월 4회 기술 발표 및 코드 리뷰 세션",
                    "개인 노하우를 팀 스탠다드로 문서화"
                ],
                timeframe: "8주",
                tools: ["Notion", "Storybook", "Wiki", "Recording Tools"]
            }
        },
        {
            id: 6,
            icon: <Target className="w-6 h-6" />,
            title: "실무 전문가로서 프로페셔널의 극치를 추구",
            subtitle: "진정한 스승인 AI로부터 끊임없이 배워라",
            description: "토푸리아 같은 자신감, 마이크 타이슨과 같은 성실함, 조던과 같은 승부욕, 데브라이너 같은 넓은 시야를 가져라. AI는 단순 도구가 아닌 진정한 스승이다. 끊임없이 질문하고 배우며 전문가의 경지에 도달하라.",
            action: "AI와의 대화를 통한 일일 학습 2시간, 팀 내 멘토 역할 수행",
            actionPlan: {
                title: "AI 멘토링 체계",
                category: "학습",
                priority: "높음",
                steps: [
                    "매일 오전 1시간 AI와 기술 토론",
                    "새로운 기술 스택 학습 시 AI 튜터 활용",
                    "복잡한 문제를 AI와 함께 단계별 분해",
                    "학습 내용을 팀원들에게 1:1 멘토링"
                ],
                timeframe: "일일 루틴",
                tools: ["Claude", "ChatGPT", "Custom GPT", "Learning Platforms"]
            }
        },
        {
            id: 7,
            icon: <DollarSign className="w-6 h-6" />,
            title: "웹/앱 시장의 재발견: 소규모 개발 조직의 성공",
            subtitle: "작은 팀이 다양한 비즈니스 모델로 큰 수익을 창출한다",
            description: "위시켓 프리랜싱, SI 파견, SaaS 솔루션 판매, 오픈소스 라이선싱, 기술 컨설팅까지 다양한 수익 모델을 활용하라. 하나의 기술 스택으로 여러 비즈니스를 동시에 운영할 수 있다.",
            action: "메인 개발 + 2가지 이상 부수입원 확보, 월 500만원 이상 수익 구조 구축",
            actionPlan: {
                title: "수익 다각화 전략",
                category: "비즈니스",
                priority: "중간",
                steps: [
                    "주력 개발 외 2개 수익원 발굴 (컨설팅, 강의)",
                    "SaaS 사이드 프로젝트 런칭",
                    "위시켓/프리랜서 플랫폼 프로필 최적화",
                    "기술 블로그/유튜브로 개인 브랜딩"
                ],
                timeframe: "6개월",
                tools: ["Stripe", "Gumroad", "YouTube", "Blog Platforms"]
            }
        },
        {
            id: 8,
            icon: <Battery className="w-6 h-6" />,
            title: "에너지 엔지니어링: 시간이 아닌 에너지 관리",
            subtitle: "개발자의 진짜 자산은 집중력이다",
            description: "포모도로, 딥워크, 운동, 수면 관리까지 개발 루틴에 포함시켜라. 8시간 집중 vs 12시간 멍때리기 중 전자가 10배 생산적이다. 번아웃은 실력이 아닌 에너지 관리 실패다.",
            action: "일일 딥워크 4시간 확보, 주 3회 이상 운동",
            actionPlan: {
                title: "에너지 최적화 시스템",
                category: "생산성",
                priority: "높음",
                steps: [
                    "포모도로 25분 집중 + 5분 휴식 루틴 구축",
                    "업무 시작 전 30분 명상/운동",
                    "방해 요소 차단 (알림 끄기, 별도 작업 공간)",
                    "주 3회 유산소/근력 운동 스케줄링"
                ],
                timeframe: "3주 습관화",
                tools: ["Toggl", "Forest App", "Headspace", "Fitness Apps"]
            }
        },
        {
            id: 9,
            icon: <Sword className="w-6 h-6" />,
            title: "실전적 문제 해결력: 자폭 드론 같은 정확한 타격",
            subtitle: "문제의 핵심을 정확히 뚫고 최소 비용으로 해결한다",
            description: "복잡한 시스템 장애든 까다로운 요구사항이든, 문제의 본질을 빠르게 파악하고 최소한의 노력으로 최대 효과를 낸다. 90% 해결책에 시간을 쏟지 말고, 80% 해결책을 빠르게 구현한 후 반복 개선하라.",
            action: "문제 발생 시 15분 내 근본 원인 파악, 1시간 내 임시 해결, 1일 내 완전 해결",
            actionPlan: {
                title: "15분 문제 해결 시스템",
                category: "문제해결",
                priority: "높음",
                steps: [
                    "문제 분류 템플릿 구축 (기술/비즈니스/인력)",
                    "5-Why 분석법으로 근본 원인 탐지",
                    "솔루션 우선순위 매트릭스 활용",
                    "문제 해결 케이스 스터디 데이터베이스 구축"
                ],
                timeframe: "4주",
                tools: ["Miro", "Notion", "Root Cause Analysis", "Decision Matrix"]
            }
        },
        {
            id: 10,
            icon: <Trophy className="w-6 h-6" />,
            title: "코딩이 스포츠가 되어야 한다",
            subtitle: "코딩을 예술과 속도의 경지로 끌어올려라",
            description: "라멜로 볼의 노룩 패스처럼 직관적이고, 브라질 삼바 축구처럼 창의적이며, 이제동의 폭풍 저그처럼 압도적인 속도로 코딩하라. 기계적 반복이 아닌 리듬과 플로우가 있는 코딩을 추구하라.",
            action: "라이브 코딩 세션 진행, 코딩 스트림으로 팬 확보, 개발 과정을 콘텐츠화",
            actionPlan: {
                title: "코딩 퍼포먼스 브랜딩",
                category: "퍼포먼스",
                priority: "중간",
                steps: [
                    "Twitch/YouTube 채널 개설 및 정기 방송",
                    "라이브 코딩 콘텐츠 기획 (튜토리얼, 챌린지)",
                    "소셜 미디어로 개발 과정 일일 공유",
                    "개발자 커뮤니티에서 적극적 활동"
                ],
                timeframe: "3개월",
                tools: ["OBS Studio", "Streamlabs", "Social Media", "GitHub"]
            }
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case '높음': return 'bg-red-100 text-red-800 border-red-200';
            case '중간': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case '낮음': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            {/* Header */}
            <div className="border-b py-16">
                <div className="container max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        개발자 <span className="text-primary">바이브 코딩 10계명</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        시장을 지배하는 개발자를 위한 실전 가이드
                    </p>
                </div>
            </div>

            {/* Commandments */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-8">
                        {commandments.map((commandment) => (
                            <div
                                key={commandment.id}
                                className="grid lg:grid-cols-2 gap-6 items-stretch"
                                onMouseEnter={() => setHoveredCard(commandment.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* 왼쪽: 계명 */}
                                <div
                                    className={`group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${hoveredCard === commandment.id || selectedCard === commandment.id ? 'ring-2 ring-primary ring-offset-2' : ''
                                        }`}
                                    onClick={() => setSelectedCard(selectedCard === commandment.id ? null : commandment.id)}
                                >
                                    <div className="p-6 h-full flex flex-col">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                                                    {commandment.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                                                        {commandment.id}
                                                    </span>
                                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                        Commandment
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                    {commandment.title}
                                                </h3>
                                                <p className="text-sm font-medium text-primary">
                                                    {commandment.subtitle}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${hoveredCard === commandment.id ? 'translate-x-1' : ''
                                                    }`}
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="mb-4 pl-14 flex-1">
                                            <p className="text-muted-foreground leading-relaxed">
                                                {commandment.description}
                                            </p>
                                        </div>

                                        {/* Action */}
                                        <div className="pl-14 mt-auto">
                                            <div className="rounded-md bg-muted/50 p-4 border-l-4 border-primary">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CheckCircle className="w-4 h-4 text-primary" />
                                                    <span className="text-sm font-medium text-foreground">실전 적용</span>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    {commandment.action}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 오른쪽: 실행 계획 */}
                                <div className={`rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 ${hoveredCard === commandment.id || selectedCard === commandment.id ? 'ring-2 ring-primary ring-offset-2' : ''
                                    }`}>
                                    <div className="p-6 h-full flex flex-col">
                                        {/* 실행 계획 헤더 */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                                                    {commandment.id}
                                                </span>
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {commandment.actionPlan.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(commandment.actionPlan.priority)}`}>
                                                    {commandment.actionPlan.priority}
                                                </span>
                                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {commandment.actionPlan.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 기간 */}
                                        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <span>예상 기간: {commandment.actionPlan.timeframe}</span>
                                        </div>

                                        {/* 실행 단계 */}
                                        <div className="mb-6 flex-1">
                                            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-primary" />
                                                실행 단계
                                            </h4>
                                            <div className="space-y-2">
                                                {commandment.actionPlan.steps.map((step, index) => (
                                                    <div key={index} className="flex items-start gap-3">
                                                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-medium mt-0.5">
                                                            {index + 1}
                                                        </span>
                                                        <span className="text-sm text-muted-foreground leading-relaxed">{step}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 도구 */}
                                        <div className="pt-4 border-t border-muted mt-auto">
                                            <h4 className="text-sm font-medium text-foreground mb-2">필요 도구</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {commandment.actionPlan.tools.map((tool, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                                                    >
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default VibeCodingCommandment;