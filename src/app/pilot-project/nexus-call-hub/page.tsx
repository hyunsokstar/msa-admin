import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Phone, Users, BarChart3, Shield, Settings, Zap, Database, CheckCircle } from 'lucide-react';

const NexusCallHubManual = () => {
    const developmentPhases = [
        {
            id: 'phase1',
            title: '인증 & 기반 시스템 구축',
            subtitle: 'Authentication & Core Infrastructure',
            icon: <Shield className="h-6 w-6" />,
            progress: 100,
            status: 'Completed',
            duration: '8-12일',
            techStack: ['React Hook Form', 'Zod', 'Zustand', 'SQLite', 'Tauri Secure Storage'],
            features: [
                'JWT 토큰 기반 인증 시스템',
                '자동 로그인 (Remember Me)',
                '사용자 프로필 관리',
                '권한 시스템 (Agent/Supervisor/Admin)',
                '라우터 가드 및 접근 제어'
            ],
            deliverables: ['로그인/로그아웃 기능', 'SQLite 데이터베이스', '사용자 권한 관리', '보안 라우팅'],
            priority: 'Critical'
        },
        {
            id: 'phase2',
            title: '통화 시스템 구축',
            subtitle: 'Call System & WebRTC Integration',
            icon: <Phone className="h-6 w-6" />,
            progress: 15,
            status: 'In Progress',
            duration: '16-22일',
            techStack: ['WebRTC API', 'getUserMedia', 'RTCPeerConnection', 'shadcn/ui', 'Recharts'],
            features: [
                'WebRTC 엔진 구축',
                '통화 UI 컴포넌트 (다이얼패드)',
                '통화 상태 관리 (발신/수신)',
                '오디오 장치 관리',
                'DTMF & 통화 제어 기능'
            ],
            deliverables: ['통화 연결/종료', '음성 품질 모니터링', '멀티 통화 지원', '통화 제어 인터페이스'],
            priority: 'Critical'
        },
        {
            id: 'phase3',
            title: '실시간 대시보드 & 모니터링',
            subtitle: 'Real-time Dashboard & Monitoring',
            icon: <Users className="h-6 w-6" />,
            progress: 0,
            status: 'Planned',
            duration: '11-15일',
            techStack: ['React Dashboard', 'WebSocket', 'Tauri Notification', 'Audio API'],
            features: [
                '상담사 실시간 대시보드',
                '통화 기록 자동 저장',
                '실시간 알림 시스템',
                '팀 모니터링 기능',
                '대기 통화 큐 관리'
            ],
            deliverables: ['실시간 상태 표시', '통화 히스토리', '데스크톱 알림', '팀 현황 모니터링'],
            priority: 'Critical'
        },
        {
            id: 'phase4',
            title: '통계 & 분석 시스템',
            subtitle: 'Statistics & Analytics',
            icon: <BarChart3 className="h-6 w-6" />,
            progress: 0,
            status: 'Design',
            duration: '15-20일',
            techStack: ['Recharts', '통계 알고리즘', '데이터 마이닝', '파일 내보내기 라이브러리'],
            features: [
                '통계 대시보드 (일/주/월별)',
                '개인별 성과 분석',
                '고급 분석 기능',
                'CSV/Excel/PDF 리포트',
                '예측 분석 (AI/ML)'
            ],
            deliverables: ['성과 분석 차트', '리포트 시스템', '데이터 내보내기', '예측 모델'],
            priority: 'Important'
        },
        {
            id: 'phase5',
            title: '고급 기능 & 통합',
            subtitle: 'Advanced Features & Integration',
            icon: <Zap className="h-6 w-6" />,
            progress: 0,
            status: 'Research',
            duration: '16-20일',
            techStack: ['고객 DB', '스크립트 엔진', '음성 녹음 API', 'API 클라이언트'],
            features: [
                'CRM 연동 시스템',
                '상담 스크립트 팝업',
                '통화 녹음 & 품질관리',
                '외부 API 통합',
                'Webhook 시스템'
            ],
            deliverables: ['고객 정보 관리', '스크립트 가이드', '음성 파일 관리', 'PBX 연동'],
            priority: 'Nice to Have'
        },
        {
            id: 'phase6',
            title: '배포 & 운영 최적화',
            subtitle: 'Deployment & Production Optimization',
            icon: <Settings className="h-6 w-6" />,
            progress: 5,
            status: 'Planning',
            duration: '18-23일',
            techStack: ['Tauri Builder', 'Auto Updater', 'CI/CD', 'Vitest', 'Playwright'],
            features: [
                '성능 최적화',
                '보안 강화',
                '멀티 플랫폼 배포',
                '모니터링 & 로깅',
                '테스트 & 품질관리'
            ],
            deliverables: ['배포 패키지', '자동 업데이트', '성능 모니터링', 'E2E 테스트'],
            priority: 'Important'
        }
    ];

    const currentTechStack = {
        frontend: [
            'Tauri 2.0',
            'Vite',
            'React 18 + TypeScript',
            'TanStack Router',
            'Tailwind CSS',
            'shadcn/ui',
            'Zustand',
            'React Hook Form'
        ],
        backend: [
            'Rust',
            'SQLite',
            'sqlx',
            'Tauri Commands',
            'Secure Storage',
            'File System API'
        ],
        communication: [
            'WebRTC API',
            'Tauri IPC',
            'WebSocket (planned)',
            'REST API (planned)'
        ]
    };

    const milestones = [
        {
            phase: 'MVP 출시',
            timeline: '7주 후',
            description: 'Phase 1-3 완료 시 기본 콜센터 기능',
            features: ['로그인/사용자 관리', '기본 통화 기능', '실시간 대시보드', '통화 기록']
        },
        {
            phase: '완전 기능 버전',
            timeline: '13주 후',
            description: 'Phase 1-5 완료 시 고급 기능 포함',
            features: ['모든 통화 기능', '통계/분석', 'CRM 연동', '고급 관리 기능']
        },
        {
            phase: '프로덕션 배포',
            timeline: '16주 후',
            description: 'Phase 1-6 완료 시 상용 서비스',
            features: ['안정성 보장', '자동 업데이트', '모니터링', '24/7 운영 가능']
        }
    ];

    const riskFactors = [
        {
            risk: 'WebRTC 호환성 문제',
            probability: 'High',
            impact: 'High',
            mitigation: 'SIP.js 백업 솔루션 준비'
        },
        {
            risk: '성능 이슈 (대용량 데이터)',
            probability: 'Medium',
            impact: 'High',
            mitigation: '가상화 & 페이징 조기 적용'
        },
        {
            risk: '음성 품질 문제',
            probability: 'Medium',
            impact: 'High',
            mitigation: '네트워크 진단 도구 내장'
        },
        {
            risk: '크로스 플랫폼 호환성',
            probability: 'Low',
            impact: 'Medium',
            mitigation: 'Tauri 공식 가이드 준수'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
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
            case 'Critical': return 'bg-red-100 text-red-800';
            case 'Important': return 'bg-orange-100 text-orange-800';
            case 'Nice to Have': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">🏢 Nexus Call Hub</h1>
                <p className="text-xl text-gray-600">콜센터 상담 시스템 개발 계획 메뉴얼</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>프로젝트 기간: 12-16주 (약 3-4개월)</span>
                </div>
            </div>

            {/* Current Status */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                        <CheckCircle className="h-6 w-6" />
                        현재 완료 상황
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-green-700">✅ 완료된 기능</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>Tauri + Vite + React + Tailwind + shadcn/ui 기본 셋업</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>TanStack Router 라우팅 시스템</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>멀티 윈도우 매니저 (window.rs)</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>런처 UI 및 기본 네비게이션</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-blue-700">🔄 다음 단계</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <div className="font-medium text-blue-800">Phase 1: 인증 시스템</div>
                                    <div className="text-sm text-blue-600">로그인/사용자 관리 구축</div>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <div className="font-medium text-purple-800">Phase 2: 통화 시스템</div>
                                    <div className="text-sm text-purple-600">WebRTC 기반 통화 기능</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tech Stack Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Database className="h-6 w-6" />
                        기술 스택 현황
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-blue-700">Frontend</h3>
                            <div className="space-y-2">
                                {currentTechStack.frontend.map((tech, idx) => (
                                    <Badge key={idx} variant="outline" className="mr-1 mb-1">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-green-700">Backend</h3>
                            <div className="space-y-2">
                                {currentTechStack.backend.map((tech, idx) => (
                                    <Badge key={idx} variant="outline" className="mr-1 mb-1">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-purple-700">Communication</h3>
                            <div className="space-y-2">
                                {currentTechStack.communication.map((tech, idx) => (
                                    <Badge key={idx} variant="outline" className="mr-1 mb-1">{tech}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Development Phases */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">📋 개발 단계별 계획</h2>

                <div className="grid gap-6">
                    {developmentPhases.map((phase, index) => (
                        <Card key={phase.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            {phase.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">Phase {index + 1}: {phase.title}</CardTitle>
                                            <p className="text-sm text-gray-500">{phase.subtitle}</p>
                                            <p className="text-xs text-blue-600 font-medium">예상 소요 시간: {phase.duration}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getPriorityColor(phase.priority)}>{phase.priority}</Badge>
                                        <Badge className={getStatusColor(phase.status)}>{phase.status}</Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">진행률</span>
                                        <span className="text-sm text-gray-500">{phase.progress}%</span>
                                    </div>
                                    <Progress value={phase.progress} className="h-2" />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold mb-2 text-gray-800">🛠 기술 스택</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {phase.techStack.map((tech, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">{tech}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-gray-800">⚡ 주요 기능</h4>
                                            <ul className="text-sm space-y-1">
                                                {phase.features.map((feature, idx) => (
                                                    <li key={idx} className="text-gray-600 flex items-start space-x-1">
                                                        <span className="text-blue-500 mt-1">•</span>
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">📦 주요 산출물</h4>
                                        <ul className="text-sm space-y-1">
                                            {phase.deliverables.map((deliverable, idx) => (
                                                <li key={idx} className="text-gray-600 flex items-start space-x-1">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    <span>{deliverable}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Milestones */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-2xl text-green-900">🎯 프로젝트 마일스톤</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        {milestones.map((milestone, idx) => (
                            <div key={idx} className="text-center p-4 border rounded-lg">
                                <div className="text-xl font-bold text-blue-600 mb-2">{milestone.phase}</div>
                                <div className="text-lg text-gray-800 mb-2">{milestone.timeline}</div>
                                <div className="text-sm text-gray-600 mb-3">{milestone.description}</div>
                                <div className="space-y-1">
                                    {milestone.features.map((feature, featureIdx) => (
                                        <div key={featureIdx} className="text-xs text-gray-500">• {feature}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                    <CardTitle className="text-2xl text-orange-900">⚠️ 위험 요소 & 대응 방안</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-semibold">위험 요소</th>
                                    <th className="text-center py-3 px-4 font-semibold">발생 확률</th>
                                    <th className="text-center py-3 px-4 font-semibold">영향도</th>
                                    <th className="text-left py-3 px-4 font-semibold">대응 방안</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riskFactors.map((risk, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-800">{risk.risk}</td>
                                        <td className="py-3 px-4 text-center">
                                            <Badge className={getRiskColor(risk.probability)} variant="secondary">
                                                {risk.probability}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <Badge className={getRiskColor(risk.impact)} variant="secondary">
                                                {risk.impact}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{risk.mitigation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">💡 기대 효과</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-800">🔧 기술적 효과</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>Tauri 기반 네이티브 성능의 데스크톱 앱</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>WebRTC를 통한 실시간 음성 통신</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>멀티 윈도우 시스템으로 효율적인 UI/UX</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>TypeScript + React로 유지보수성 향상</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-800">💼 비즈니스 효과</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>콜센터 상담 효율성 극대화</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>실시간 모니터링으로 서비스 품질 향상</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>데이터 기반 의사결정 지원</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>확장 가능한 시스템 아키텍처</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center py-8 border-t">
                <p className="text-gray-500">
                    📞 Nexus Call Hub - 차세대 콜센터 상담 시스템 | 개발 기간: 12-16주
                </p>
            </div>
        </div>
    );
};

export default NexusCallHubManual;