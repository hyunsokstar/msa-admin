import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Monitor, Palette, Database, TestTube, Figma, Play, Globe, Menu, Cloud } from 'lucide-react';

const NextGenFrontendArchitecture = () => {
    const projectItems = [
        {
            id: 'electron-desktop',
            title: 'Electron Desktop Application',
            subtitle: 'Electron + Next.js + Tailwind CSS + Shadcn UI',
            icon: <Monitor className="h-6 w-6" />,
            progress: 20,
            status: 'Planning',
            techStack: ['Electron', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'TypeScript'],
            features: [
                'Desktop CTI 관리 애플리케이션',
                'Backend 파일럿 프로젝트 연동',
                '네이티브 데스크톱 기능 활용',
                '윈도우 상태 관리',
                '시스템 트레이 통합'
            ],
            goals: ['크로스 플랫폼 데스크톱 앱', 'Native OS 통합', 'Backend API 연동'],
            priority: 'High'
        },
        {
            id: 'tauri-app',
            title: 'Tauri Lightweight Application',
            subtitle: 'Tauri + Next.js + Tailwind CSS + Shadcn UI',
            icon: <Monitor className="h-6 w-6" />,
            progress: 15,
            status: 'Planning',
            techStack: ['Tauri', 'Next.js', 'Tailwind CSS', 'Shadcn UI', 'Rust'],
            features: [
                '경량화된 데스크톱 애플리케이션',
                'Rust 백엔드 성능 활용',
                'Backend 파일럿 프로젝트 연동',
                '보안 강화된 데스크톱 앱',
                '작은 번들 사이즈'
            ],
            goals: ['고성능 데스크톱 앱', 'Rust 생태계 활용', '메모리 효율성'],
            priority: 'Medium'
        },
        {
            id: 'canvas-drawing',
            title: 'Canvas Drawing Board',
            subtitle: 'HTML5 Canvas + Interactive Graphics',
            icon: <Palette className="h-6 w-6" />,
            progress: 10,
            status: 'Research',
            techStack: ['HTML5 Canvas', 'Fabric.js', 'Konva.js', 'React', 'TypeScript'],
            features: [
                '그림판 기능 구현',
                '레이어 관리 시스템',
                '브러시 및 도구 다양화',
                '이미지 내보내기/가져오기',
                '실시간 협업 그리기'
            ],
            goals: ['Canvas API 마스터', '인터랙티브 그래픽', '실시간 협업'],
            priority: 'Low'
        },
        {
            id: 'project-management',
            title: 'Project Manual & Customer Management',
            subtitle: 'Next.js + Prisma + SQLite',
            icon: <Database className="h-6 w-6" />,
            progress: 30,
            status: 'Design',
            techStack: ['Next.js', 'Prisma', 'SQLite', 'TypeScript', 'Tailwind CSS'],
            features: [
                '프로젝트 메뉴얼 시스템',
                '고객 관리 CRM',
                '문서 버전 관리',
                '검색 및 필터링',
                '사용자 권한 관리'
            ],
            goals: ['Full-stack 개발', 'Database 설계', 'CRUD 마스터'],
            priority: 'High'
        },
        {
            id: 'e2e-testing',
            title: 'End-to-End Testing Suite',
            subtitle: 'Playwright Test Automation',
            icon: <TestTube className="h-6 w-6" />,
            progress: 25,
            status: 'Planning',
            techStack: ['Playwright', 'TypeScript', 'Jest', 'GitHub Actions', 'Docker'],
            features: [
                'E2E 테스트 자동화',
                '크로스 브라우저 테스트',
                'Visual Regression 테스트',
                'CI/CD 파이프라인 통합',
                '테스트 리포트 생성'
            ],
            goals: ['테스트 자동화', '품질 보증', 'CI/CD 통합'],
            priority: 'High'
        },
        {
            id: 'figma-integration',
            title: 'Figma MCP Integration',
            subtitle: 'Design System & UI Workflow',
            icon: <Figma className="h-6 w-6" />,
            progress: 5,
            status: 'Research',
            techStack: ['Figma API', 'Figma MCP', 'Design Tokens', 'Storybook', 'React'],
            features: [
                'Figma 디자인 자동 변환',
                'Design Token 동기화',
                'UI 컴포넌트 자동 생성',
                '디자인 시스템 관리',
                'Storybook 연동'
            ],
            goals: ['Design-to-Code 자동화', 'Design System 구축', 'UI 작업 효율화'],
            priority: 'Medium'
        },
        {
            id: 'animation-libraries',
            title: 'Animation & Interaction Libraries',
            subtitle: 'Framer Motion + DnD Kit + React Data Grid',
            icon: <Play className="h-6 w-6" />,
            progress: 40,
            status: 'In Progress',
            techStack: ['Framer Motion', 'DnD Kit', 'React Data Grid', 'React Spring', 'Lottie'],
            features: [
                '고급 애니메이션 구현',
                'Drag & Drop 인터랙션',
                '복잡한 데이터 그리드',
                '마이크로 인터랙션',
                '성능 최적화된 애니메이션'
            ],
            goals: ['UX 향상', '인터랙션 디자인', '성능 최적화'],
            priority: 'Medium'
        },
        {
            id: 'state-management',
            title: 'Modern State Management',
            subtitle: 'TanStack Query + Zustand + React Hook Form + Zod',
            icon: <Database className="h-6 w-6" />,
            progress: 60,
            status: 'In Progress',
            techStack: ['TanStack Query', 'Zustand', 'React Hook Form', 'Zod', 'TypeScript'],
            features: [
                '관리자 페이지 구축',
                '서버 상태 관리',
                '폼 유효성 검증',
                '전역 상태 관리',
                '타입 안전성 보장'
            ],
            goals: ['상태 관리 마스터', '타입 안전성', '개발자 경험 향상'],
            priority: 'High'
        },
        {
            id: 'complex-menus',
            title: 'Complex Menu Systems',
            subtitle: '복잡한 네비게이션 & 레이아웃 구현',
            icon: <Menu className="h-6 w-6" />,
            progress: 35,
            status: 'Design',
            techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Headless UI', 'Radix UI'],
            features: [
                '트리 메뉴 구조',
                '다단계 네비게이션',
                '복잡한 레이아웃 관리',
                '패널 시스템',
                '반응형 메뉴 시스템'
            ],
            goals: ['복잡한 UI 패턴', '사용자 경험', '접근성 준수'],
            priority: 'Medium'
        },
        {
            id: 'deployment',
            title: 'Production Deployment',
            subtitle: 'Vercel + AWS 배포 전략',
            icon: <Cloud className="h-6 w-6" />,
            progress: 20,
            status: 'Planning',
            techStack: ['Vercel', 'AWS', 'Docker', 'GitHub Actions', 'Cloudflare'],
            features: [
                'Vercel 자동 배포',
                'AWS 인프라 구축',
                'CDN 최적화',
                '환경별 배포 전략',
                '모니터링 및 로깅'
            ],
            goals: ['DevOps 이해', '배포 자동화', '인프라 관리'],
            priority: 'High'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Planning': return 'bg-yellow-100 text-yellow-800';
            case 'Design': return 'bg-purple-100 text-purple-800';
            case 'Research': return 'bg-orange-100 text-orange-800';
            case 'Planned': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-green-100 text-green-800';
            case 'Low': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const overallProgress = Math.round(projectItems.reduce((sum, item) => sum + item.progress, 0) / projectItems.length);

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">차세대 프론트엔드 학습 로드맵</h1>
                <p className="text-xl text-gray-600">Next-Generation Frontend Development Journey</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>학습 기간: 2024년 1분기 - 2024년 4분기</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>전체 진행률: {overallProgress}%</span>
                    </div>
                </div>
            </div>

            {/* Overall Progress */}
            <Card className="border-2 border-indigo-200">
                <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-2xl text-indigo-900">학습 개요</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-medium">전체 학습 진행률</span>
                                <span className="text-lg text-gray-600">{overallProgress}%</span>
                            </div>
                            <Progress value={overallProgress} className="h-3" />
                        </div>
                        <div className="grid md:grid-cols-3 gap-6 mt-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-3">핵심 목표</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start space-x-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>모던 프론트엔드 기술 스택 완전 정복</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>실무 프로젝트 구현 능력 향상</span>
                                    </li>
                                    <li className="flex items-start space-x-2">
                                        <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>Backend 파일럿 프로젝트와의 완벽한 통합</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">학습 방법</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• 이론 학습 + 실습 프로젝트 병행</li>
                                    <li>• 단계별 난이도 상승</li>
                                    <li>• 실제 서비스 수준의 품질 구현</li>
                                    <li>• 테스트 및 배포까지 완주</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">기대 성과</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• 풀스택 개발 역량 확보</li>
                                    <li>• 현대적 개발 워크플로우 습득</li>
                                    <li>• 고품질 코드 작성 능력</li>
                                    <li>• DevOps 및 배포 경험</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Project Items */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">구현 프로젝트 목록</h2>

                <div className="grid gap-6">
                    {projectItems.map((item, index) => (
                        <Card key={item.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-indigo-100 rounded-lg">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{index + 1}. {item.title}</CardTitle>
                                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">진행률</span>
                                        <span className="text-sm text-gray-500">{item.progress}%</span>
                                    </div>
                                    <Progress value={item.progress} className="h-2" />
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">기술 스택</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {item.techStack.map((tech, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">구현 기능</h4>
                                        <ul className="text-sm space-y-1">
                                            {item.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="text-gray-600">• {feature}</li>
                                            ))}
                                            {item.features.length > 3 && (
                                                <li className="text-gray-500 text-xs">+ {item.features.length - 3}개 추가</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">학습 목표</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {item.goals.map((goal, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">{goal}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Learning Timeline */}
            <Card className="border-2 border-emerald-200">
                <CardHeader className="bg-emerald-50">
                    <CardTitle className="text-2xl text-emerald-900">학습 타임라인</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">Q1 2024</div>
                            <div className="text-sm text-gray-600">Foundation Projects</div>
                            <div className="text-xs text-gray-500">Desktop Apps & State Management</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">Q2 2024</div>
                            <div className="text-sm text-gray-600">Advanced Features</div>
                            <div className="text-xs text-gray-500">Animation & Complex UI</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">Q3 2024</div>
                            <div className="text-sm text-gray-600">Full-Stack Projects</div>
                            <div className="text-xs text-gray-500">Database & Testing</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">Q4 2024</div>
                            <div className="text-sm text-gray-600">Production Ready</div>
                            <div className="text-xs text-gray-500">Deployment & Integration</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">성공 지표</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">기술적 성과</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 10개 프로젝트 완전 구현 및 배포</li>
                                <li>• Modern Frontend Stack 완전 정복</li>
                                <li>• End-to-End 테스트 커버리지 80% 이상</li>
                                <li>• Production-Ready 코드 품질 달성</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">실무 역량</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• Backend API 연동 능력 확보</li>
                                <li>• 복잡한 상태 관리 패턴 이해</li>
                                <li>• UI/UX 최적화 기법 습득</li>
                                <li>• DevOps 파이프라인 구축 경험</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default NextGenFrontendArchitecture;