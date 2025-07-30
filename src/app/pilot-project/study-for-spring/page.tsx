'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp } from 'lucide-react'

interface Props { }

const StudyForSi = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const springMasterCertifications = [
        {
            id: 1,
            title: "Spring Security Master",
            description: "인증/인가 및 보안 아키텍처 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "7-10일",
            techStack: ["JWT", "OAuth 2.1", "OIDC", "Spring Security 6.x", "WebAuthn"],
            detailItems: [
                "JWT 토큰 기반 인증 시스템 구축",
                "OAuth 2.1 + PKCE 플로우 구현",
                "Spring Security 6.x 필터 체인 커스터마이징",
                "CORS 정책 설정 및 preflight 처리",
                "Method-level 보안 애노테이션 활용",
                "세션 관리 및 동시 로그인 제어",
                "WebAuthn 생체인증 연동",
                "Security Test 작성 및 취약점 진단",
                "Redis 기반 세션 클러스터링",
                "Rate Limiting 및 DDoS 방어"
            ]
        },
        {
            id: 2,
            title: "Spring MSA Master",
            description: "마이크로서비스 아키텍처 설계 및 운영 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-21일",
            techStack: ["Spring Cloud 2023.x", "Gateway", "Config Server", "Eureka", "Feign", "Resilience4j"],
            detailItems: [
                "Spring Cloud Gateway 라우팅 및 필터링",
                "Service Discovery (Eureka/Consul) 구성",
                "Config Server 중앙화된 설정 관리",
                "OpenFeign 선언적 HTTP 클라이언트",
                "Circuit Breaker 패턴 (Resilience4j)",
                "분산 트레이싱 (Micrometer + Zipkin)",
                "API Gateway 인증/인가 통합",
                "Service Mesh (Istio) 기초",
                "Event-driven 마이크로서비스 패턴",
                "Blue-Green 배포 전략"
            ]
        },
        {
            id: 3,
            title: "Spring ORM Master",
            description: "데이터 접근 계층 및 영속성 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["JPA 3.1", "Hibernate 6.x", "jOOQ", "QueryDSL", "Spring Data"],
            detailItems: [
                "JPA 3.1 + Hibernate 6.x 고급 매핑",
                "QueryDSL 타입 안전 쿼리 작성",
                "jOOQ를 활용한 복잡한 SQL 쿼리",
                "N+1 문제 해결 전략 (Batch Size, Fetch Join)",
                "2차 캐시 (Ehcache/Redis) 활용",
                "트랜잭션 전파 레벨 및 격리 수준",
                "Spring Data JPA Custom Repository",
                "Database Migration (Flyway/Liquibase)",
                "읽기 전용 Replica DB 분리 전략",
                "JPA Audit 및 Soft Delete 구현"
            ]
        },
        {
            id: 4,
            title: "Spring AI Master",
            description: "AI/ML 통합 및 벡터 데이터베이스 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-21일",
            techStack: ["Spring AI", "OpenAI GPT-4", "Vector DB", "LangChain4j", "Embedding"],
            detailItems: [
                "Spring AI + OpenAI GPT-4o 연동",
                "Text Embedding 및 Vector 검색",
                "RAG (Retrieval Augmented Generation) 구조",
                "Pinecone/Weaviate 벡터 DB 연동",
                "LangChain4j Spring Boot 통합",
                "Prompt Engineering 및 Template 관리",
                "Function Calling 및 Tool Integration",
                "AI 응답 스트리밍 처리",
                "토큰 사용량 모니터링 및 비용 최적화",
                "AI 기반 코드 리뷰 시스템 구축"
            ]
        },
        {
            id: 5,
            title: "Spring DDD Master",
            description: "도메인 주도 설계 및 클린 아키텍처 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-21일",
            techStack: ["DDD", "Hexagonal Architecture", "CQRS", "Event Sourcing", "Aggregate"],
            detailItems: [
                "도메인 모델링 및 Bounded Context 설계",
                "Aggregate Root 및 Entity 설계 패턴",
                "Domain Service vs Application Service 분리",
                "Hexagonal Architecture (Port & Adapter) 구현",
                "CQRS (Command Query Responsibility Segregation)",
                "Event Sourcing 패턴 구현",
                "Domain Event 발행 및 처리",
                "Repository 패턴 및 DIP 구현",
                "Specification 패턴 활용",
                "Anti-Corruption Layer 구현"
            ]
        },
        {
            id: 6,
            title: "Spring WebSocket Master",
            description: "실시간 통신 및 양방향 메시징 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "7-10일",
            techStack: ["WebSocket", "STOMP", "SockJS", "Server-Sent Events", "Reactor"],
            detailItems: [
                "WebSocket + STOMP 프로토콜 구현",
                "SockJS fallback 처리",
                "실시간 채팅 서버 구축",
                "Message Broker (RabbitMQ/ActiveMQ) 연동",
                "사용자별 개인 채널 구성",
                "WebSocket Security 및 인증",
                "Server-Sent Events (SSE) 구현",
                "Connection Pool 관리",
                "메시지 순서 보장 및 중복 처리",
                "실시간 알림 시스템"
            ]
        },
        {
            id: 7,
            title: "Spring Redis Pub/Sub Master",
            description: "Redis 기반 이벤트 브로드캐스팅 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Redis", "Pub/Sub", "Redis Streams", "Lettuce", "JSON"],
            detailItems: [
                "Redis Pub/Sub 패턴 구현",
                "채널 기반 메시지 브로드캐스팅",
                "JSON 메시지 직렬화/역직렬화",
                "Redis Streams를 활용한 메시지 큐",
                "Pattern-based 구독 처리",
                "Redis Cluster 환경에서의 Pub/Sub",
                "메시지 TTL 및 백프레셔 처리",
                "Lettuce 비동기 클라이언트 활용",
                "Redis Sentinel 고가용성 구성",
                "실시간 상태 동기화 시스템"
            ]
        },
        {
            id: 8,
            title: "Spring Kafka Master",
            description: "Apache Kafka 이벤트 스트리밍 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Apache Kafka", "Spring Kafka", "Schema Registry", "Avro", "Streams"],
            detailItems: [
                "Kafka Producer/Consumer 구성",
                "토픽 파티셔닝 및 리밸런싱",
                "멀티 컨슈머 그룹 처리",
                "Schema Registry + Avro 스키마 관리",
                "Kafka Streams 실시간 처리",
                "정확히 한 번 (Exactly Once) 보장",
                "Dead Letter Queue 처리",
                "Kafka Connect 활용",
                "메시지 순서 보장 전략",
                "Kafka 모니터링 및 성능 튜닝"
            ]
        },
        {
            id: 9,
            title: "Spring TDD Master",
            description: "테스트 주도 개발 및 품질 보증 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "7-10일",
            techStack: ["JUnit 5", "Mockito", "TestContainers", "WireMock", "AssertJ"],
            detailItems: [
                "JUnit 5 고급 기능 (Dynamic Tests, Parameterized)",
                "Mockito 모킹 전략 및 Spy 활용",
                "Spring Boot Test Slices (@WebMvcTest, @DataJpaTest)",
                "TestContainers 통합 테스트 환경",
                "WireMock을 활용한 외부 API 모킹",
                "BDD 스타일 테스트 (Given-When-Then)",
                "테스트 커버리지 관리 (JaCoCo)",
                "Contract Testing (Spring Cloud Contract)",
                "Performance Testing (JMeter 연동)",
                "Mutation Testing으로 테스트 품질 검증"
            ]
        },
        {
            id: 10,
            title: "Spring GraphQL Master",
            description: "GraphQL API 설계 및 Federation 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Spring GraphQL", "Netflix DGS", "GraphQL Federation", "DataLoader", "Subscription"],
            detailItems: [
                "Netflix DGS 프레임워크 활용",
                "Schema-First vs Code-First 접근법",
                "DataFetcher 및 Resolver 구현",
                "N+1 문제 해결 (DataLoader 패턴)",
                "GraphQL Subscription 실시간 처리",
                "Federation을 통한 마이크로서비스 통합",
                "Query Complexity Analysis",
                "GraphQL Security (Query Depth, Introspection)",
                "Persisted Queries 최적화",
                "GraphQL 모니터링 및 성능 분석"
            ]
        }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const highPriority = springMasterCertifications.filter(cert => cert.priority === 'High')
    const mediumPriority = springMasterCertifications.filter(cert => cert.priority === 'Medium')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">🏆 Spring 마스터 인증 10종</h1>
                <p className="text-xl text-gray-600">NEXUS 사내 개발 인증 커리큘럼 (2025 최신 트렌드)</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 10개 인증
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 3-6개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        100+ 세부 학습 항목
                    </span>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
                    <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
                    <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">완료</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">99-147</div>
                    <div className="text-sm text-gray-600">총 학습일</div>
                </div>
            </div>

            {/* High Priority Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                    <Star className="h-6 w-6" />
                    <span>High Priority (우선 학습)</span>
                </h2>
                <div className="space-y-4">
                    {highPriority.map((cert) => (
                        <Card key={cert.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        {cert.completed ?
                                            <CheckCircle className="h-5 w-5 text-green-600" /> :
                                            <Circle className="h-5 w-5 text-gray-400" />
                                        }
                                        <span>{cert.title}</span>
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getPriorityColor(cert.priority)}>{cert.priority}</Badge>
                                        <button
                                            onClick={() => toggleCard(cert.id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            {expandedCards[cert.id] ?
                                                <ChevronUp className="h-4 w-4" /> :
                                                <ChevronDown className="h-4 w-4" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600">{cert.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">난이도: {cert.difficulty}</span>
                                    <span className="text-blue-600 font-medium">{cert.estimatedDays}</span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {cert.techStack.map((tech, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                    ))}
                                </div>

                                {expandedCards[cert.id] && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-3 text-gray-800">📚 세부 학습 항목</h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {cert.detailItems.map((item, idx) => (
                                                <div key={idx} className="flex items-start space-x-2 text-sm">
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Medium Priority Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-yellow-600">Medium Priority (2차 학습)</h2>
                <div className="space-y-4">
                    {mediumPriority.map((cert) => (
                        <Card key={cert.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                        {cert.completed ?
                                            <CheckCircle className="h-5 w-5 text-green-600" /> :
                                            <Circle className="h-5 w-5 text-gray-400" />
                                        }
                                        <span>{cert.title}</span>
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <Badge className={getPriorityColor(cert.priority)}>{cert.priority}</Badge>
                                        <button
                                            onClick={() => toggleCard(cert.id)}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            {expandedCards[cert.id] ?
                                                <ChevronUp className="h-4 w-4" /> :
                                                <ChevronDown className="h-4 w-4" />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-600">{cert.description}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">난이도: {cert.difficulty}</span>
                                    <span className="text-blue-600 font-medium">{cert.estimatedDays}</span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                    {cert.techStack.map((tech, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                    ))}
                                </div>

                                {expandedCards[cert.id] && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-semibold mb-3 text-gray-800">📚 세부 학습 항목</h4>
                                        <div className="grid md:grid-cols-2 gap-2">
                                            {cert.detailItems.map((item, idx) => (
                                                <div key={idx} className="flex items-start space-x-2 text-sm">
                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Learning Path Recommendation */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">📚 추천 학습 순서 (2025 업데이트)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">Spring Security + ORM Master</span>
                            <span className="text-sm text-gray-500">(보안 기초 + 데이터 접근 - 20일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">Spring TDD Master</span>
                            <span className="text-sm text-gray-500">(테스트 기반 개발 문화 - 10일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">Spring DDD Master</span>
                            <span className="text-sm text-gray-500">(도메인 중심 설계 - 20일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">Spring Kafka Master</span>
                            <span className="text-sm text-gray-500">(이벤트 스트리밍 - 14일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">Spring MSA Master</span>
                            <span className="text-sm text-gray-500">(마이크로서비스 아키텍처 - 21일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">WebSocket + Redis + GraphQL + AI</span>
                            <span className="text-sm text-gray-500">(실시간 + API + AI 통합 - 40일)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 2025 Trends */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🚀 2025 Spring 생태계 트렌드</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">AI/ML 통합</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Spring AI 프레임워크 정식 출시</li>
                                <li>• Vector DB 네이티브 지원</li>
                                <li>• LangChain4j 공식 연동</li>
                                <li>• AI 기반 코드 생성 도구</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">성능 & 관찰가능성</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Virtual Threads (Project Loom)</li>
                                <li>• Micrometer Observation API</li>
                                <li>• Native Image 최적화</li>
                                <li>• Distributed Tracing 강화</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">클라우드 네이티브</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Kubernetes 네이티브 지원</li>
                                <li>• Cloud Events 표준 지원</li>
                                <li>• Serverless 최적화</li>
                                <li>• Multi-cloud 배포 전략</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle>🎯 학습 진행 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>전체 진행률</span>
                            <span className="text-sm text-gray-500">0/10 완료 (총 100+ 학습 항목)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            완료된 인증이 없습니다. 학습을 시작해보세요! 💪
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForSi