import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    MonitorDot,
    Zap,
    Rocket,
    Target,
    Brain,
    Settings,
    Shield,
    Users,
    BookOpen,
    MapPin,
} from 'lucide-react'

type Strategy = {
    id: number
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    category: string
}

const strategies: Strategy[] = [
    {
        id: 1,
        title: '실시간 전장 정보 시스템',
        subtitle: 'Mission Control 구축',
        description:
            '단순한 업무 관리를 넘어, 프로젝트의 진행 상황, 핵심 지표(KPI), 리소스 배분, 잠재적 리스크를 실시간으로 파악하는 \'중앙 관제 시스템\'을 구축합니다. 이를 통해 PM과 팀원 모두 데이터에 기반한 빠르고 정확한 의사결정을 내릴 수 있습니다.',
        icon: <MonitorDot className="h-6 w-6" />,
        category: '관리',
    },
    {
        id: 2,
        title: '압도적인 화력',
        subtitle: '고품격 아키텍처와 기술 자산',
        description:
            '견고한 아키텍처 설계, 일관된 코딩 컨벤션, 검증된 라이브러리 활용 능력은 팀의 가장 강력한 무기입니다. 이는 개발 속도를 높일 뿐만 아니라, 장기적인 안정성과 확장성을 보장하여 경쟁에서 압도적인 우위를 점하게 합니다.',
        icon: <Zap className="h-6 w-6" />,
        category: '기술',
    },
    {
        id: 3,
        title: '속도와 안정성을 모두 잡는',
        subtitle: 'CI/CD 및 테스트 자동화',
        description:
            '생산성 증가는 반드시 품질 보증과 함께 가야 합니다. 빌드, 테스트, 배포 전 과정을 자동화(CI/CD)하여 빠른 시장 대응 속도를 유지하면서도, 자동화된 테스트로 인간의 실수를 최소화하고 서비스의 견고함을 지킵니다.',
        icon: <Rocket className="h-6 w-6" />,
        category: '자동화',
    },
    {
        id: 4,
        title: '기술 부채는 즉시 제거할',
        subtitle: '최우선 표적',
        description:
            '기술 부채를 방치하는 것은 전투 중 무기를 버리는 것과 같습니다. 부채를 정기적으로 식별, 측정하고, 계획을 세워 빠르게 해결하는 프로세스를 정착시켜야 합니다. 이는 AI 코딩 자동화 시대에 개발팀의 가치를 증명하는 핵심 활동입니다.',
        icon: <Target className="h-6 w-6" />,
        category: '품질',
    },
    {
        id: 5,
        title: 'AI 기술의 전략적 활용',
        subtitle: '및 내재화',
        description:
            'AI를 단순한 유행이 아닌, 생산성을 극대화하는 핵심 도구로 활용합니다. AI 코딩 어시스턴트, 코드 분석, 테스트 자동화 등에 적극적으로 도입하고, 나아가 우리 서비스에 필요한 AI 기술을 직접 개발하고 내재화하여 기술적 해자를 구축합니다.',
        icon: <Brain className="h-6 w-6" />,
        category: 'AI',
    },
    {
        id: 6,
        title: '개발자 경험(DX)을 극대화하는',
        subtitle: '플랫폼 엔지니어링',
        description:
            '최고의 개발자들이 전투에만 집중할 수 있도록, 개발 환경, 테스트, 배포 인프라를 표준화하고 자동화된 플랫폼으로 제공합니다. 이는 개발자의 인지 부하를 줄여 창의성과 생산성을 폭발적으로 증가시킵니다.',
        icon: <Settings className="h-6 w-6" />,
        category: '플랫폼',
    },
    {
        id: 7,
        title: '실패를 두려워하지 않는',
        subtitle: '심리적 안정감',
        description:
            '치열한 전장일수록 팀원 간의 신뢰와 심리적 안정감이 중요합니다. 실패를 비난하지 않고 학습의 기회로 삼는 문화를 통해, 팀원들이 과감하게 도전하고 문제를 해결하며 최고의 성과를 낼 수 있는 환경을 조성합니다.',
        icon: <Users className="h-6 w-6" />,
        category: '문화',
    },
    {
        id: 8,
        title: '개발 전 과정에 보안을 내재화',
        subtitle: 'DevSecOps',
        description:
            '보안은 더 이상 개발 마지막 단계의 점검 항목이 아닙니다. 기획, 설계 단계부터 보안을 고려하고, 개발 파이프라인 전 과정에 보안 테스트를 자동화하여 잠재적인 위협을 사전에 차단하는 \'Shift-Left\' 보안 전략을 채택합니다.',
        icon: <Shield className="h-6 w-6" />,
        category: '보안',
    },
    {
        id: 9,
        title: '살아있는 문서와',
        subtitle: '지식 공유 시스템',
        description:
            '전투 경험과 정보는 빠르게 공유되어야 합니다. 코드와 함께 살아 움직이는 실무 문서(Living Documentation), 명확한 온보딩 프로세스, 정기적인 기술 공유 세션을 통해 팀의 집단 지성을 강화하고 신규 팀원의 빠른 적응을 돕습니다.',
        icon: <BookOpen className="h-6 w-6" />,
        category: '지식',
    },
    {
        id: 10,
        title: '명확한 비전과',
        subtitle: '기술 로드맵 제시',
        description:
            '우리가 왜 싸우고 어디로 가야 하는지에 대한 명확한 비전과 기술 로드맵을 공유합니다. 이는 팀원들에게 동기를 부여하고, 기술 선택과 아키텍처 설계 등 모든 의사결정 과정에서 일관된 방향을 유지하게 하는 나침반이 됩니다.',
        icon: <MapPin className="h-6 w-6" />,
        category: '전략',
    },
]

const categoryColors: Record<string, string> = {
    관리: 'bg-blue-100 text-blue-800 border-blue-200',
    기술: 'bg-purple-100 text-purple-800 border-purple-200',
    자동화: 'bg-green-100 text-green-800 border-green-200',
    품질: 'bg-orange-100 text-orange-800 border-orange-200',
    AI: 'bg-pink-100 text-pink-800 border-pink-200',
    플랫폼: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    문화: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    보안: 'bg-red-100 text-red-800 border-red-200',
    지식: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    전략: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default function ModernDevStrategyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        2025년 개발팀을 위한
                    </h1>
                    <h2 className="mb-6 text-3xl font-semibold text-muted-foreground">10대 핵심 전략</h2>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        현대적인 개발팀이 경쟁력을 유지하고 성공하기 위한 필수 전략들입니다.
                    </p>
                </div>

                <Separator className="mb-12" />

                {/* Strategy Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {strategies.map((strategy, index) => (
                        <Card key={strategy.id} className="group transition-all hover:shadow-lg">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            {strategy.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-muted-foreground">
                                                    전략 {strategy.id}
                                                </span>
                                                <Badge className={categoryColors[strategy.category]} variant="outline">
                                                    {strategy.category}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-xl">{strategy.title}</CardTitle>
                                            <CardDescription className="text-base font-medium text-primary">
                                                {strategy.subtitle}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="leading-relaxed text-muted-foreground">{strategy.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16">
                    <Separator className="mb-8" />
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            이 전략들을 통해 개발팀은 변화하는 시장 환경에서 지속적인 경쟁력을 확보할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}