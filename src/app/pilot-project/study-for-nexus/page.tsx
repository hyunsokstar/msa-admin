'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp, Phone, Users, Bot, Monitor, Shield, Database, Zap, MessageSquare } from 'lucide-react'

interface Props { }

const StudyForNexus = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const nexusProjects = [
        // Core Authentication & Session (3종)
        {
            id: 1,
            category: 'auth',
            title: "Agent Login Next + Spring",
            description: "상담사 로그인 및 세션 관리 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Next.js 15", "Spring Boot", "JWT", "Redis Session", "Spring Security"],
            detailItems: [
                "상담사 전용 로그인 UI/UX 설계",
                "JWT 기반 토큰 인증 시스템",
                "Spring Security 커스텀 필터",
                "Redis 세션 클러스터링",
                "다중 로그인 감지 및 차단",
                "비밀번호 정책 및 2FA 인증",
                "로그인 실패 횟수 제한",
                "세션 타임아웃 관리",
                "SSO(Single Sign-On) 연동",
                "로그인 이력 추적 및 보안 로그"
            ]
        },
        {
            id: 2,
            category: 'auth',
            title: "Redis Single Login",
            description: "중복 로그인 차단 및 세션 동기화",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Redis", "Spring Session", "WebSocket", "Event Driven", "Pub/Sub"],
            detailItems: [
                "Redis 기반 세션 저장소 구축",
                "중복 로그인 감지 로직",
                "기존 세션 강제 종료 처리",
                "세션 충돌 알림 시스템",
                "Grace Period 로그아웃 구현",
                "세션 정보 실시간 동기화",
                "Multi-device 로그인 정책",
                "관리자 강제 로그아웃 기능",
                "세션 모니터링 대시보드",
                "Active Session 통계"
            ]
        },
        {
            id: 3,
            category: 'realtime',
            title: "Redis Agent Status",
            description: "상담사 상태 실시간 전파 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Redis Pub/Sub", "WebSocket", "Event Sourcing", "CQRS", "State Machine"],
            detailItems: [
                "상담사 상태 모델링 (ONLINE, BUSY, BREAK, OFFLINE)",
                "Redis Pub/Sub 채널 설계",
                "State Machine 패턴 구현",
                "상태 변경 이벤트 발행",
                "실시간 상태 브로드캐스팅",
                "상태 히스토리 추적",
                "Heartbeat 기반 생존 확인",
                "자동 상태 전환 로직",
                "상태별 권한 제어",
                "팀장용 상담사 모니터링"
            ]
        },
        // Dashboard & UI (4종)
        {
            id: 4,
            category: 'ui',
            title: "WebSocket Dashboard",
            description: "실시간 상담사 상태판 UI",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["WebSocket", "React 19", "Zustand", "Recharts", "Real-time Grid"],
            detailItems: [
                "실시간 상담사 현황 그리드",
                "WebSocket 연결 관리 컴포넌트",
                "상태별 색상 코딩 시스템",
                "드래그앤드롭 상담사 배치",
                "실시간 통계 차트 (Recharts)",
                "상담사 검색 및 필터링",
                "팀별 그룹화 뷰",
                "알림 토스트 시스템",
                "반응형 대시보드 레이아웃",
                "다크모드 테마 지원"
            ]
        },
        {
            id: 5,
            category: 'ui',
            title: "Campaign Tree Manager",
            description: "캠페인 기반 상담사 관리 UI",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["React Tree", "Drag & Drop", "Context Menu", "Hierarchical Data", "Virtualization"],
            detailItems: [
                "계층형 캠페인 트리 구조",
                "드래그앤드롭 상담사 할당",
                "트리 노드 CRUD 조작",
                "Context Menu 인터랙션",
                "Virtual Scrolling 최적화",
                "트리 검색 및 확장/축소",
                "상담사 배치 이력 관리",
                "권한별 편집 제한",
                "Bulk Operations 지원",
                "트리 구조 백업/복원"
            ]
        },
        {
            id: 6,
            category: 'ui',
            title: "Lexical Editor Note",
            description: "상담 메모 및 노트 에디터",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Lexical Editor", "Rich Text", "Auto Save", "Collaboration", "Template"],
            detailItems: [
                "Lexical 리치 텍스트 에디터",
                "상담 템플릿 시스템",
                "실시간 자동 저장",
                "Markdown 지원",
                "이미지 드래그앤드롭 업로드",
                "텍스트 포매팅 툴바",
                "단축키 지원",
                "협업 편집 기능",
                "버전 히스토리",
                "메모 검색 및 태그"
            ]
        },
        {
            id: 7,
            category: 'desktop',
            title: "Tauri Agent App",
            description: "데스크탑 상담사 클라이언트",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Tauri v2", "Next.js", "Auto Update", "System Tray", "Native API"],
            detailItems: [
                "Tauri v2 데스크탑 앱 구조",
                "Next.js 웹뷰 통합",
                "시스템 트레이 상태 표시",
                "자동 업데이트 시스템",
                "네이티브 알림 처리",
                "파일 시스템 로컬 데이터",
                "창 관리 (최소화, 복원)",
                "Hot Key 글로벌 단축키",
                "인터넷 연결 상태 감지",
                "앱 설정 및 환경 구성"
            ]
        },
        // Real-time Communication (3종)
        {
            id: 8,
            category: 'realtime',
            title: "SSE Agent Notification",
            description: "실시간 알림 수신 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Server-Sent Events", "Event Stream", "Notification API", "Service Worker", "Push"],
            detailItems: [
                "SSE 연결 관리 및 재연결",
                "이벤트 타입별 분기 처리",
                "브라우저 Notification API",
                "Service Worker 백그라운드 알림",
                "알림 권한 요청 플로우",
                "알림 이력 및 읽음 상태",
                "중요도별 알림 분류",
                "소리 및 진동 설정",
                "Do Not Disturb 모드",
                "알림 통계 및 분석"
            ]
        },
        {
            id: 9,
            category: 'realtime',
            title: "WebSocket Real-time Chat",
            description: "실시간 상담 채팅 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["WebSocket", "STOMP", "Message Queue", "File Upload", "Emoji"],
            detailItems: [
                "WebSocket + STOMP 프로토콜",
                "1:1 채팅 및 그룹 채팅",
                "메시지 타입별 처리 (텍스트, 이미지, 파일)",
                "이모지 및 스티커 지원",
                "읽음 확인 및 타이핑 표시",
                "메시지 검색 및 히스토리",
                "파일 드래그앤드롭 업로드",
                "메시지 수정/삭제 기능",
                "채팅방 설정 및 알림",
                "상담 종료 후 채팅 보관"
            ]
        },
        {
            id: 10,
            category: 'data',
            title: "GraphQL Agent Info",
            description: "상담사 프로필 GraphQL API",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Netflix DGS", "GraphQL", "DataLoader", "Schema Federation", "Apollo"],
            detailItems: [
                "상담사 스키마 설계",
                "DataLoader N+1 최적화",
                "Resolver 구현 패턴",
                "GraphQL Subscription",
                "Schema Federation 구성",
                "Apollo Client 통합",
                "Query Complexity Analysis",
                "Persisted Queries",
                "GraphQL Playground",
                "실시간 프로필 업데이트"
            ]
        },
        // AI & Analytics (3종)
        {
            id: 11,
            category: 'ai',
            title: "Agent AI Summary",
            description: "상담 내용 AI 요약 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Spring AI", "OpenAI GPT-4", "RAG", "Vector DB", "Prompt Engineering"],
            detailItems: [
                "상담 전사(Transcript) 처리",
                "GPT-4 기반 자동 요약",
                "RAG 패턴 지식베이스 연동",
                "감정 분석 및 만족도 예측",
                "키워드 추출 및 분류",
                "요약본 템플릿 생성",
                "다국어 요약 지원",
                "요약 품질 평가 시스템",
                "배치 처리 및 스케줄링",
                "요약 결과 피드백 수집"
            ]
        },
        {
            id: 12,
            category: 'ai',
            title: "Voice Recognition System",
            description: "음성 인식 및 전사 시스템",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["OpenAI Whisper", "Web Audio API", "Real-time STT", "Audio Processing", "WebRTC"],
            detailItems: [
                "실시간 음성 인식 (STT)",
                "Whisper API 통합",
                "Web Audio API 오디오 캡처",
                "노이즈 제거 및 전처리",
                "화자 분리 (Speaker Diarization)",
                "실시간 전사 스트리밍",
                "다국어 음성 인식",
                "음성 품질 분석",
                "전사 정확도 측정",
                "오디오 파일 저장 및 관리"
            ]
        },
        {
            id: 13,
            category: 'analytics',
            title: "Agent Performance Analytics",
            description: "상담사 성과 분석 시스템",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-15일",
            techStack: ["Time Series DB", "Kafka Streams", "Recharts", "ETL Pipeline", "Real-time Analytics"],
            detailItems: [
                "상담사 KPI 지표 설계",
                "실시간 성과 대시보드",
                "상담 시간 및 품질 분석",
                "고객 만족도 트래킹",
                "팀별 성과 비교",
                "트렌드 분석 및 예측",
                "개인별 성장 추적",
                "목표 대비 달성률",
                "성과 리포트 자동 생성",
                "데이터 시각화 차트"
            ]
        },
        // Backend Infrastructure (4종)
        {
            id: 14,
            category: 'backend',
            title: "CTI Integration API",
            description: "CTI 시스템 통합 API",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Spring Boot", "CTI SDK", "WebRTC", "SIP Protocol", "Event Sourcing"],
            detailItems: [
                "CTI SDK 통합 및 추상화",
                "전화 상태 이벤트 처리",
                "WebRTC 기반 소프트폰",
                "SIP 프로토콜 통신",
                "통화 라우팅 로직",
                "IVR 시스템 연동",
                "통화 녹음 및 재생",
                "ACD (Automatic Call Distribution)",
                "콜백 스케줄링",
                "통화 이력 관리"
            ]
        },
        {
            id: 15,
            category: 'backend',
            title: "Event Sourcing Architecture",
            description: "이벤트 소싱 기반 아키텍처",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["Event Sourcing", "CQRS", "Axon Framework", "Event Store", "Projection"],
            detailItems: [
                "Event Store 설계 및 구현",
                "Aggregate Root 이벤트 발행",
                "Command/Query 분리 (CQRS)",
                "Event Handler 및 Saga",
                "Projection 뷰 구성",
                "Event Replay 및 시간 여행",
                "스냅샷 최적화",
                "이벤트 버전 관리",
                "분산 시스템 일관성",
                "이벤트 감사 추적"
            ]
        },
        {
            id: 16,
            category: 'backend',
            title: "Kafka Message Streaming",
            description: "Kafka 기반 메시지 스트리밍",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Apache Kafka", "Kafka Streams", "Schema Registry", "Dead Letter Queue", "Monitoring"],
            detailItems: [
                "Kafka 클러스터 구성",
                "토픽 설계 및 파티셔닝",
                "Producer/Consumer 최적화",
                "Kafka Streams 실시간 처리",
                "Schema Registry 스키마 관리",
                "Dead Letter Queue 처리",
                "정확히 한 번 보장",
                "Kafka Connect 데이터 파이프라인",
                "모니터링 및 알림",
                "성능 튜닝 및 스케일링"
            ]
        },
        {
            id: 17,
            category: 'security',
            title: "Security & Compliance",
            description: "보안 및 컴플라이언스 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Spring Security", "OWASP", "Data Encryption", "Audit Log", "GDPR"],
            detailItems: [
                "개인정보 암호화 저장",
                "OWASP Top 10 보안 강화",
                "API Rate Limiting",
                "SQL Injection 방어",
                "XSS/CSRF 보호",
                "감사 로그 시스템",
                "GDPR 개인정보 처리",
                "데이터 마스킹",
                "보안 헤더 설정",
                "취약점 스캔 자동화"
            ]
        },
        // Testing & DevOps (3종)
        {
            id: 18,
            category: 'testing',
            title: "E2E Testing Suite",
            description: "엔드투엔드 테스팅 시스템",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Playwright", "Cypress", "Docker Compose", "Test Data", "CI/CD"],
            detailItems: [
                "Playwright E2E 테스트 설계",
                "상담사 워크플로우 시나리오",
                "Docker Compose 테스트 환경",
                "테스트 데이터 시딩",
                "시각적 회귀 테스팅",
                "API 통합 테스트",
                "성능 부하 테스트",
                "모바일 반응형 테스트",
                "CI/CD 파이프라인 통합",
                "테스트 리포트 생성"
            ]
        },
        {
            id: 19,
            category: 'devops',
            title: "Monitoring & Observability",
            description: "모니터링 및 관찰 가능성",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Prometheus", "Grafana", "ELK Stack", "Jaeger", "Alert Manager"],
            detailItems: [
                "Prometheus 메트릭 수집",
                "Grafana 대시보드 구성",
                "ELK Stack 로그 분석",
                "Jaeger 분산 트레이싱",
                "Alert Manager 알림 설정",
                "Application Performance Monitoring",
                "Business Metrics 추적",
                "장애 대응 Runbook",
                "SLA 모니터링",
                "Capacity Planning"
            ]
        },
        {
            id: 20,
            category: 'devops',
            title: "CI/CD & Deployment",
            description: "지속적 통합 및 배포",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["GitHub Actions", "Docker", "Kubernetes", "ArgoCD", "Helm"],
            detailItems: [
                "GitHub Actions 워크플로우",
                "Multi-stage Docker 빌드",
                "Kubernetes 배포 매니페스트",
                "ArgoCD GitOps 구성",
                "Helm 차트 관리",
                "Blue-Green 배포",
                "Canary 배포 전략",
                "롤백 자동화",
                "보안 스캔 통합",
                "배포 승인 프로세스"
            ]
        }
    ]

    const categories = [
        { id: 'all', label: '전체', icon: <Monitor className="h-4 w-4" /> },
        { id: 'auth', label: '인증/세션', icon: <Shield className="h-4 w-4" /> },
        { id: 'realtime', label: '실시간 통신', icon: <Zap className="h-4 w-4" /> },
        { id: 'ui', label: 'UI/대시보드', icon: <Monitor className="h-4 w-4" /> },
        { id: 'desktop', label: '데스크탑', icon: <Monitor className="h-4 w-4" /> },
        { id: 'ai', label: 'AI/ML', icon: <Bot className="h-4 w-4" /> },
        { id: 'analytics', label: '분석/통계', icon: <Database className="h-4 w-4" /> },
        { id: 'backend', label: '백엔드 인프라', icon: <Database className="h-4 w-4" /> },
        { id: 'data', label: '데이터/API', icon: <Database className="h-4 w-4" /> },
        { id: 'security', label: '보안/컴플라이언스', icon: <Shield className="h-4 w-4" /> },
        { id: 'testing', label: '테스팅', icon: <MessageSquare className="h-4 w-4" /> },
        { id: 'devops', label: 'DevOps', icon: <MessageSquare className="h-4 w-4" /> }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredProjects = selectedCategory === 'all'
        ? nexusProjects
        : nexusProjects.filter(project => project.category === selectedCategory)

    const highPriority = filteredProjects.filter(project => project.priority === 'High')
    const mediumPriority = filteredProjects.filter(project => project.priority === 'Medium')
    const lowPriority = filteredProjects.filter(project => project.priority === 'Low')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">📞 NEXUS 상담사 프로젝트 스터디</h1>
                <p className="text-xl text-gray-600">차세대 CTI 시스템 개발을 위한 20종 보일러플레이트</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 20개 프로젝트
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 6-12개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        200+ 실무 기능
                    </span>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors ${selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category.icon}
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
                    <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
                    <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{lowPriority.length}</div>
                    <div className="text-sm text-gray-600">Low Priority</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">완료</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">200-280</div>
                    <div className="text-sm text-gray-600">총 개발일</div>
                </div>
            </div>

            {/* High Priority Section */}
            {highPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                        <Star className="h-6 w-6" />
                        <span>High Priority (핵심 프로젝트) - {highPriority.length}개</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {highPriority.map((project) => (
                            <Card key={project.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {project.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{project.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(project.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[project.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{project.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {project.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{project.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[project.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🛠️ 구현 기능 목록</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {project.detailItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
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
            )}

            {/* Medium Priority Section */}
            {mediumPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-yellow-600">Medium Priority (확장 프로젝트) - {mediumPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mediumPriority.map((project) => (
                            <Card key={project.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {project.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{project.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(project.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[project.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{project.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {project.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{project.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {project.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[project.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🛠️ 구현 기능 목록</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {project.detailItems.map((item, idx) => (
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
            )}

            {/* CTI Architecture Overview */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🏗️ NEXUS CTI 시스템 아키텍처</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Frontend Layer</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Next.js 15 + React 19 기반</li>
                                <li>• Tauri 데스크탑 클라이언트</li>
                                <li>• WebSocket 실시간 통신</li>
                                <li>• PWA 오프라인 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Backend Layer</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Spring Boot MSA 구조</li>
                                <li>• Event Sourcing + CQRS</li>
                                <li>• Kafka 메시지 스트리밍</li>
                                <li>• Redis 세션 클러스터링</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">AI & Analytics</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• OpenAI GPT-4 상담 요약</li>
                                <li>• Whisper 음성 인식</li>
                                <li>• 실시간 성과 분석</li>
                                <li>• 예측 모델링</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Development Roadmap */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">🗺️ 개발 로드맵 (2025)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">인증 및 세션 관리 (Phase 1)</span>
                            <span className="text-sm text-gray-500">Agent Login + Redis Session (3주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">실시간 통신 기반 구축 (Phase 2)</span>
                            <span className="text-sm text-gray-500">WebSocket + SSE + 상태 관리 (4주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">CTI 통합 및 백엔드 (Phase 3)</span>
                            <span className="text-sm text-gray-500">CTI API + Event Sourcing (6주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">AI 및 분석 시스템 (Phase 4)</span>
                            <span className="text-sm text-gray-500">AI Summary + Analytics (5주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">UI/UX 및 데스크탑 (Phase 5)</span>
                            <span className="text-sm text-gray-500">Dashboard + Tauri App (4주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">테스팅 및 배포 (Phase 6)</span>
                            <span className="text-sm text-gray-500">E2E Testing + CI/CD (3주)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-xl text-green-900">⚡ 핵심 기술 스택</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">Frontend</h4>
                            <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs">Next.js 15</Badge>
                                <Badge variant="secondary" className="text-xs">React 19</Badge>
                                <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                                <Badge variant="secondary" className="text-xs">Zustand</Badge>
                                <Badge variant="secondary" className="text-xs">Shadcn/UI</Badge>
                                <Badge variant="secondary" className="text-xs">Tauri</Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">Backend</h4>
                            <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs">Spring Boot</Badge>
                                <Badge variant="secondary" className="text-xs">Netflix DGS</Badge>
                                <Badge variant="secondary" className="text-xs">Redis</Badge>
                                <Badge variant="secondary" className="text-xs">Kafka</Badge>
                                <Badge variant="secondary" className="text-xs">PostgreSQL</Badge>
                                <Badge variant="secondary" className="text-xs">JWT</Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">AI/ML</h4>
                            <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs">OpenAI GPT-4</Badge>
                                <Badge variant="secondary" className="text-xs">Whisper</Badge>
                                <Badge variant="secondary" className="text-xs">Vector DB</Badge>
                                <Badge variant="secondary" className="text-xs">LangChain</Badge>
                                <Badge variant="secondary" className="text-xs">RAG</Badge>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">DevOps</h4>
                            <div className="flex flex-wrap gap-1">
                                <Badge variant="secondary" className="text-xs">Docker</Badge>
                                <Badge variant="secondary" className="text-xs">Kubernetes</Badge>
                                <Badge variant="secondary" className="text-xs">GitHub Actions</Badge>
                                <Badge variant="secondary" className="text-xs">Prometheus</Badge>
                                <Badge variant="secondary" className="text-xs">Grafana</Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 프로젝트 진행 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>전체 진행률</span>
                            <span className="text-sm text-gray-500">0/20 완료 (총 200+ 구현 기능)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            NEXUS CTI 프로젝트를 시작하여 차세대 상담 시스템을 구축해보세요! 📞
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForNexus