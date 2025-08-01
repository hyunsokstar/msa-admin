import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Phone, Users, BarChart3, Shield, Settings, Zap, Database, CheckCircle, Server, Layers, Globe } from 'lucide-react';

const NexusCallHubManual = () => {
    const systemArchitecture = {
        presentationTier: {
            title: 'Presentation Tier: Tauri + React',
            icon: <Layers className="h-5 w-5" />,
            technologies: ['Tauri 2.0', 'React 18', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'TanStack Router', 'Zustand'],
            responsibilities: [
                '상담사 전용 UI/UX 인터페이스',
                '실시간 데이터 시각화 및 대시보드',
                '데스크톱 네이티브 기능 (알림, 파일 접근)',
                '멀티 윈도우 관리 시스템',
                '오프라인 모드 및 로컬 캐싱'
            ]
        },
        businessTier: {
            title: 'Business Logic Tier: Spring Boot',
            icon: <Server className="h-5 w-5" />,
            technologies: ['Spring Boot 3.x', 'Spring Security', 'Spring WebSocket', 'JPA/Hibernate', 'Redis', 'Apache Kafka'],
            responsibilities: [
                '통화 비즈니스 로직 및 워크플로우',
                '사용자 인증/권한 관리 시스템',
                '실시간 이벤트 처리 및 메시징',
                'API Gateway 및 서비스 오케스트레이션',
                '통화 상태 관리 및 모니터링'
            ]
        },
        dataTier: {
            title: 'Data/Telecom Tier: PBX + Database',
            icon: <Globe className="h-5 w-5" />,
            technologies: ['FreeSWITCH', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'SIP Protocol', 'RTP/RTCP'],
            responsibilities: [
                '실제 음성 통화 처리 및 라우팅',
                'PSTN 게이트웨이 연동',
                '통화 데이터 영구 저장',
                '통화 녹음 및 품질 분석',
                '대용량 로그 데이터 처리'
            ]
        }
    };

    const developmentPhases = [
        {
            id: 'phase1',
            title: '3-Tier 아키텍처 기반 구축',
            subtitle: 'Enterprise Architecture Foundation',
            icon: <Shield className="h-6 w-6" />,
            progress: 25,
            status: 'In Progress',
            duration: '3주',
            techStack: ['Spring Boot 3.x', 'Tauri 2.0', 'PostgreSQL', 'Redis', 'Docker'],
            features: [
                '3-Tier 아키텍처 설계 및 구현',
                'Spring Boot REST API 서버',
                'Tauri 클라이언트 기본 구조',
                '데이터베이스 스키마 설계',
                '인증 및 보안 시스템'
            ],
            deliverables: ['아키텍처 문서', 'API 서버', 'Tauri 앱', 'DB 스키마', '인증 시스템'],
            priority: 'Critical'
        },
        {
            id: 'phase2',
            title: '통화 시스템 & PBX 연동',
            subtitle: 'Call System Integration',
            icon: <Phone className="h-6 w-6" />,
            progress: 0,
            status: 'Planned',
            duration: '4주',
            techStack: ['FreeSWITCH ESL', 'SIP Protocol', 'WebSocket', 'Spring Boot', 'Kafka'],
            features: [
                'FreeSWITCH ESL 연동 모듈',
                '통화 시작/종료 API 개발',
                '실시간 통화 상태 동기화',
                'SIP 프로토콜 처리',
                '통화 큐 관리 시스템'
            ],
            deliverables: ['PBX 연동 모듈', '통화 API', '상태 동기화', 'SIP 핸들러', '큐 관리자'],
            priority: 'Critical'
        },
        {
            id: 'phase3',
            title: '실시간 대시보드 & 모니터링',
            subtitle: 'Real-time Dashboard System',
            icon: <Users className="h-6 w-6" />,
            progress: 0,
            status: 'Design',
            duration: '3주',
            techStack: ['React', 'WebSocket', 'Recharts', 'Spring WebSocket', 'Elasticsearch'],
            features: [
                '상담사 실시간 대시보드',
                '통화 현황 모니터링',
                '팀 성과 실시간 표시',
                '알림 및 이벤트 시스템',
                '관리자 모니터링 콘솔'
            ],
            deliverables: ['실시간 대시보드', '모니터링 시스템', '알림 엔진', '관리자 콘솔', '성과 지표'],
            priority: 'Critical'
        },
        {
            id: 'phase4',
            title: '대용량 데이터 처리 & 분석',
            subtitle: 'Big Data Analytics',
            icon: <BarChart3 className="h-6 w-6" />,
            progress: 0,
            status: 'Research',
            duration: '4주',
            techStack: ['Kafka', 'Elasticsearch', 'Spring Batch', 'MongoDB', 'Apache Spark'],
            features: [
                '대용량 통화 데이터 처리',
                '실시간 분석 및 통계',
                '예측 분석 모델',
                '성과 리포트 자동 생성',
                'AI 기반 품질 분석'
            ],
            deliverables: ['데이터 파이프라인', '분석 엔진', '예측 모델', '리포트 시스템', '품질 분석기'],
            priority: 'Important'
        },
        {
            id: 'phase5',
            title: '확장성 & 고가용성 구축',
            subtitle: 'Scalability & High Availability',
            icon: <Zap className="h-6 w-6" />,
            progress: 0,
            status: 'Planned',
            duration: '3주',
            techStack: ['Kubernetes', 'Docker', 'NGINX', 'Redis Cluster', 'PostgreSQL HA'],
            features: [
                '마이크로서비스 아키텍처 전환',
                '로드 밸런싱 및 오토 스케일링',
                '장애 복구 시스템',
                '데이터베이스 클러스터링',
                '무중단 배포 시스템'
            ],
            deliverables: ['MSA 구조', '스케일링 시스템', '장애 복구', 'DB 클러스터', 'CI/CD 파이프라인'],
            priority: 'Important'
        },
        {
            id: 'phase6',
            title: '운영 최적화 & 모니터링',
            subtitle: 'Production Optimization',
            icon: <Settings className="h-6 w-6" />,
            progress: 0,
            status: 'Planned',
            duration: '2주',
            techStack: ['Prometheus', 'Grafana', 'ELK Stack', 'Jaeger', 'SonarQube'],
            features: [
                '성능 모니터링 시스템',
                '로그 수집 및 분석',
                '분산 추적 시스템',
                '코드 품질 관리',
                '보안 취약점 스캔'
            ],
            deliverables: ['모니터링 대시보드', '로그 시스템', '추적 시스템', '품질 게이트', '보안 스캔'],
            priority: 'Nice to Have'
        }
    ];

    const scalabilityMetrics = [
        {
            metric: '동시 상담사 수',
            current: '100명',
            target: '2,000명',
            strategy: '수평 확장 + 로드 밸런싱'
        },
        {
            metric: '동시 통화 처리',
            current: '50통화',
            target: '1,500통화',
            strategy: 'FreeSWITCH 클러스터링'
        },
        {
            metric: '응답 시간',
            current: '< 100ms',
            target: '< 50ms',
            strategy: 'Redis 캐싱 + CDN'
        },
        {
            metric: '데이터 처리량',
            current: '1GB/일',
            target: '100GB/일',
            strategy: 'Kafka + Elasticsearch'
        }
    ];

    const technologyStack = {
        frontend: {
            title: 'Frontend (Presentation Tier)',
            technologies: [
                { name: 'Tauri 2.0', purpose: '네이티브 데스크톱 래퍼' },
                { name: 'React 18', purpose: 'UI 컴포넌트 프레임워크' },
                { name: 'TypeScript', purpose: '타입 안전성' },
                { name: 'TanStack Router', purpose: '라우팅 관리' },
                { name: 'Zustand', purpose: '상태 관리' },
                { name: 'shadcn/ui', purpose: 'UI 컴포넌트 라이브러리' },
                { name: 'Recharts', purpose: '데이터 시각화' }
            ]
        },
        backend: {
            title: 'Backend (Business Logic Tier)',
            technologies: [
                { name: 'Spring Boot 3.x', purpose: '메인 애플리케이션 프레임워크' },
                { name: 'Spring Security', purpose: '인증 및 보안' },
                { name: 'Spring WebSocket', purpose: '실시간 통신' },
                { name: 'JPA/Hibernate', purpose: 'ORM 및 데이터 접근' },
                { name: 'Apache Kafka', purpose: '이벤트 스트리밍' },
                { name: 'Redis', purpose: '캐싱 및 세션 저장소' },
                { name: 'Swagger', purpose: 'API 문서화' }
            ]
        },
        infrastructure: {
            title: 'Infrastructure (Data/Telecom Tier)',
            technologies: [
                { name: 'FreeSWITCH', purpose: 'PBX 및 통화 처리' },
                { name: 'PostgreSQL', purpose: '주 데이터베이스' },
                { name: 'MongoDB', purpose: '비정형 데이터 저장' },
                { name: 'Elasticsearch', purpose: '로그 검색 및 분석' },
                { name: 'Docker', purpose: '컨테이너화' },
                { name: 'Kubernetes', purpose: '오케스트레이션' },
                { name: 'NGINX', purpose: '로드 밸런서' }
            ]
        }
    };

    const riskAssessment = [
        {
            risk: 'PBX 통합 복잡성',
            probability: 'High',
            impact: 'High',
            mitigation: 'FreeSWITCH 전문가 영입 및 단계적 통합',
            timeline: 'Phase 2'
        },
        {
            risk: '대용량 트래픽 처리',
            probability: 'Medium',
            impact: 'High',
            mitigation: '점진적 스케일링 및 성능 테스트',
            timeline: 'Phase 5'
        },
        {
            risk: '실시간 동기화 이슈',
            probability: 'Medium',
            impact: 'Medium',
            mitigation: 'WebSocket + Kafka 이중화',
            timeline: 'Phase 3'
        },
        {
            risk: '데이터 정합성 문제',
            probability: 'Low',
            impact: 'High',
            mitigation: '트랜잭션 관리 및 데이터 검증',
            timeline: 'Phase 1'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Planned': return 'bg-yellow-100 text-yellow-800';
            case 'Design': return 'bg-purple-100 text-purple-800';
            case 'Research': return 'bg-orange-100 text-orange-800';
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
                <p className="text-xl text-gray-600">대규모 콜센터 상담 시스템 - 엔터프라이즈 아키텍처</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>목표: 2,000명 동시 상담사 지원 | 개발 기간: 19주</span>
                </div>
            </div>

            {/* System Architecture */}
            <Card className="border-2 border-indigo-200">
                <CardHeader className="bg-indigo-50">
                    <CardTitle className="text-2xl text-indigo-900 flex items-center gap-2">
                        <Layers className="h-6 w-6" />
                        엔터프라이즈 3-Tier 아키텍처
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-6">
                        {/* Presentation Tier */}
                        <div className="border rounded-lg p-4 bg-blue-50">
                            <div className="flex items-center gap-3 mb-4">
                                {systemArchitecture.presentationTier.icon}
                                <h3 className="text-lg font-semibold text-blue-800">
                                    {systemArchitecture.presentationTier.title}
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">핵심 기술</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {systemArchitecture.presentationTier.technologies.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">주요 책임</h4>
                                    <ul className="text-sm space-y-1">
                                        {systemArchitecture.presentationTier.responsibilities.slice(0, 3).map((resp, idx) => (
                                            <li key={idx} className="text-gray-600">• {resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-gray-400 text-sm">⬇ REST API + WebSocket ⬇</div>

                        {/* Business Logic Tier */}
                        <div className="border rounded-lg p-4 bg-green-50">
                            <div className="flex items-center gap-3 mb-4">
                                {systemArchitecture.businessTier.icon}
                                <h3 className="text-lg font-semibold text-green-800">
                                    {systemArchitecture.businessTier.title}
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">핵심 기술</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {systemArchitecture.businessTier.technologies.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">주요 책임</h4>
                                    <ul className="text-sm space-y-1">
                                        {systemArchitecture.businessTier.responsibilities.slice(0, 3).map((resp, idx) => (
                                            <li key={idx} className="text-gray-600">• {resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="text-center text-gray-400 text-sm">⬇ PBX Protocol (ESL/AMI) ⬇</div>

                        {/* Data/Telecom Tier */}
                        <div className="border rounded-lg p-4 bg-orange-50">
                            <div className="flex items-center gap-3 mb-4">
                                {systemArchitecture.dataTier.icon}
                                <h3 className="text-lg font-semibold text-orange-800">
                                    {systemArchitecture.dataTier.title}
                                </h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium mb-2">핵심 기술</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {systemArchitecture.dataTier.technologies.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">주요 책임</h4>
                                    <ul className="text-sm space-y-1">
                                        {systemArchitecture.dataTier.responsibilities.slice(0, 3).map((resp, idx) => (
                                            <li key={idx} className="text-gray-600">• {resp}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Scalability Metrics */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-2xl text-green-900">🎯 확장성 목표 지표</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {scalabilityMetrics.map((metric, idx) => (
                            <div key={idx} className="bg-white border rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">{metric.metric}</h3>
                                <div className="space-y-2">
                                    <div className="text-sm">
                                        <span className="text-gray-500">현재: </span>
                                        <span className="font-medium text-blue-600">{metric.current}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500">목표: </span>
                                        <span className="font-medium text-green-600">{metric.target}</span>
                                    </div>
                                    <div className="text-xs text-gray-600">
                                        {metric.strategy}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <Database className="h-6 w-6" />
                        기술 스택 상세
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        {Object.entries(technologyStack).map(([key, stack]) => (
                            <div key={key} className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">{stack.title}</h3>
                                <div className="space-y-3">
                                    {stack.technologies.map((tech, idx) => (
                                        <div key={idx} className="border rounded-lg p-3">
                                            <div className="font-medium text-sm text-gray-800">{tech.name}</div>
                                            <div className="text-xs text-gray-600 mt-1">{tech.purpose}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
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
                                            <p className="text-xs text-blue-600 font-medium">소요 시간: {phase.duration}</p>
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
                                    <th className="text-center py-3 px-4 font-semibold">시점</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riskAssessment.map((risk, idx) => (
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
                                        <td className="py-3 px-4 text-center text-sm text-gray-500">{risk.timeline}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Success Criteria */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-2xl text-purple-900">🏆 성공 기준</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-purple-800">📈 성능 지표</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>2,000명 동시 상담사 지원</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>1,500개 동시 통화 처리</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>응답 시간 50ms 이하 유지</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    <span>99.9% 시스템 가용성</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-blue-800">🔧 기술적 목표</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>마이크로서비스 아키텍처 구현</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>자동 스케일링 시스템</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>실시간 모니터링 구축</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-blue-500 mt-1">•</span>
                                    <span>코드 커버리지 80% 이상</span>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-green-800">💼 비즈니스 목표</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>상담 효율성 30% 향상</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>운영 비용 25% 절감</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>고객 만족도 4.5/5.0 달성</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    <span>시장 출시 6개월 단축</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center py-8 border-t">
                <p className="text-gray-500 mb-2">
                    📞 Nexus Call Hub - 대규모 엔터프라이즈 콜센터 시스템
                </p>
                <p className="text-sm text-gray-400">
                    목표: 2,000명 동시 상담사 | 개발 기간: 19주 | 3-Tier 아키텍처
                </p>
            </div>
        </div>
    );
};

export default NexusCallHubManual;