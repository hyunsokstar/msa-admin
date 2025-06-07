import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Server, Shield, Database, Zap, Settings, Network } from 'lucide-react';

const CTIPilotReport = () => {
    const projectPhases = [
        {
            id: 'basic1',
            title: 'Basic CRUD Server',
            subtitle: 'BackEnd Server Basic1',
            icon: <Database className="h-6 w-6" />,
            progress: 85,
            status: 'In Progress',
            techStack: ['Spring Boot', 'Netflix DGS (GraphQL)', 'JPA', 'jOOQ', 'Next.js'],
            features: [
                '회원 가입 시스템',
                '유저 목록 조회',
                '유저 검색 기능',
                '유저 관리 게시판 (CRUD)'
            ],
            conventions: ['CQRS', 'DDD'],
            priority: 'High'
        },
        {
            id: 'basic2',
            title: 'Authentication & Authorization',
            subtitle: 'BackEnd Server Basic2',
            icon: <Shield className="h-6 w-6" />,
            progress: 70,
            status: 'Planning',
            techStack: ['Spring Boot', 'Netflix DGS', 'JPA', 'jOOQ', 'Spring Security', 'Next.js'],
            features: [
                '사용자 인증 (로그인/로그아웃)',
                '사용자 권한 및 역할 관리',
                'JWT 토큰 관리',
                '세션 관리',
                '보안 정책 적용'
            ],
            conventions: ['CQRS', 'DDD', 'Security Pattern'],
            priority: 'High'
        },
        {
            id: 'basic3',
            title: 'Advanced Query & Documentation',
            subtitle: 'BackEnd Server Basic3',
            icon: <Server className="h-6 w-6" />,
            progress: 45,
            status: 'Design',
            techStack: ['Spring Boot', 'Netflix DGS', 'JPA', 'jOOQ', 'Next.js', 'Swagger/OpenAPI'],
            features: [
                '복잡한 조회 로직 구현',
                '실시간 데이터 모니터링',
                'API 문서화 (Swagger)',
                '시스템 성능 모니터링',
                '대시보드 구성'
            ],
            conventions: ['CQRS', 'DDD', 'API Documentation'],
            priority: 'Medium'
        },
        {
            id: 'basic4',
            title: 'Event-Driven Architecture',
            subtitle: 'BackEnd Server Basic4',
            icon: <Zap className="h-6 w-6" />,
            progress: 25,
            status: 'Research',
            techStack: ['Spring Boot', 'Netflix DGS', 'Spring WebFlux', 'Redis', 'Kafka', 'Next.js'],
            features: [
                '실시간 이벤트 기반 서비스',
                '비동기 처리 시스템',
                '이벤트 스트림 처리',
                '메시지 큐 구현',
                '고성능 실시간 데이터 처리'
            ],
            conventions: ['CQRS', 'DDD', 'Event Sourcing', 'Reactive Programming'],
            priority: 'High'
        },
        {
            id: 'basic5',
            title: 'MSA Gateway & Enhanced Auth',
            subtitle: 'BackEnd Server Basic5',
            icon: <Network className="h-6 w-6" />,
            progress: 0,
            status: 'Planned',
            techStack: ['Spring Cloud Gateway', 'Eureka', 'Hystrix', 'OAuth 2.0', 'OpenID Connect'],
            features: [
                'API Gateway 구현',
                '마이크로서비스 라우팅',
                '로드 밸런싱',
                '서킷 브레이커 패턴',
                '분산 인증 시스템',
                'Rate Limiting',
                'API 버전 관리'
            ],
            conventions: ['MSA', 'API Gateway Pattern', 'Circuit Breaker', 'Service Discovery'],
            priority: 'High'
        },
        {
            id: 'basic6',
            title: 'DevOps & CI/CD Pipeline',
            subtitle: 'BackEnd Server Basic6',
            icon: <Settings className="h-6 w-6" />,
            progress: 15,
            status: 'Planning',
            techStack: ['Docker', 'Kubernetes', 'Jenkins/GitHub Actions', 'Prometheus', 'Grafana'],
            features: [
                'CI/CD 파이프라인 구축',
                '컨테이너화 및 오케스트레이션',
                '자동화된 배포 시스템',
                '로그 관리 및 모니터링',
                '성능 지표 수집 및 분석'
            ],
            conventions: ['DevOps', 'Infrastructure as Code', 'GitOps'],
            priority: 'Medium'
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

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Backend Pilot For Next CTI</h1>
                <p className="text-xl text-gray-600">차기 콜센터 상담 관리 및 CTI 파일럿 프로젝트 계획서</p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>프로젝트 기간: 2024년 1분기 - 2024년 4분기</span>
                </div>
            </div>

            {/* Project Overview */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-2xl text-blue-900">프로젝트 개요</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-3">프로젝트 목표</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>기술 스택 및 설계 패턴의 단계별 도입으로 유지보수성 및 확장성 확보</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>명확한 책임 구분 및 효율적 서비스 구축</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>실시간 처리 능력과 안정성 확보</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    <span>마이크로서비스 아키텍처 기반 확장 가능한 시스템 구축</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3">핵심 아키텍처</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">CQRS</Badge>
                                    <span className="text-sm text-gray-600">Command Query Responsibility Segregation</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">DDD</Badge>
                                    <span className="text-sm text-gray-600">Domain-Driven Design</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">MSA</Badge>
                                    <span className="text-sm text-gray-600">Microservices Architecture</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Badge variant="secondary">Event-Driven</Badge>
                                    <span className="text-sm text-gray-600">Event-Driven Architecture</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Project Phases */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">프로젝트 구성 단계</h2>

                <div className="grid gap-6">
                    {projectPhases.map((phase, index) => (
                        <Card key={phase.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            {phase.icon}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{index + 1}. {phase.title}</CardTitle>
                                            <p className="text-sm text-gray-500">{phase.subtitle}</p>
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

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">기술 스택</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {phase.techStack.map((tech, idx) => (
                                                <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">주요 기능</h4>
                                        <ul className="text-sm space-y-1">
                                            {phase.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="text-gray-600">• {feature}</li>
                                            ))}
                                            {phase.features.length > 3 && (
                                                <li className="text-gray-500 text-xs">+ {phase.features.length - 3}개 추가</li>
                                            )}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2 text-gray-800">설계 패턴</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {phase.conventions.map((convention, idx) => (
                                                <Badge key={idx} variant="secondary" className="text-xs">{convention}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Timeline Summary */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-2xl text-green-900">프로젝트 타임라인</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">Q1 2024</div>
                            <div className="text-sm text-gray-600">Basic 1-2 완료</div>
                            <div className="text-xs text-gray-500">CRUD & 인증 시스템</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">Q2 2024</div>
                            <div className="text-sm text-gray-600">Basic 3-4 개발</div>
                            <div className="text-xs text-gray-500">고급 조회 & 이벤트</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">Q3 2024</div>
                            <div className="text-sm text-gray-600">Basic 5 구축</div>
                            <div className="text-xs text-gray-500">MSA Gateway</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">Q4 2024</div>
                            <div className="text-sm text-gray-600">Basic 6 & 통합</div>
                            <div className="text-xs text-gray-500">DevOps & 운영 배포</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">기대 효과</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">기술적 효과</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• 마이크로서비스 아키텍처를 통한 서비스 독립성 확보</li>
                                <li>• 이벤트 드리븐 아키텍처로 실시간 처리 성능 향상</li>
                                <li>• CI/CD 파이프라인으로 배포 안정성 및 속도 개선</li>
                                <li>• API Gateway를 통한 통합된 서비스 관리</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">비즈니스 효과</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• CTI 시스템의 확장성 및 유지보수성 향상</li>
                                <li>• 콜센터 상담 효율성 증대</li>
                                <li>• 시스템 안정성 향상으로 서비스 품질 개선</li>
                                <li>• 향후 추가 기능 개발 시 개발 속도 향상</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CTIPilotReport;