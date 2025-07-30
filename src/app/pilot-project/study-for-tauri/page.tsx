"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp, Monitor, Code, Shield, Zap, Package, Settings, FileText, Smartphone, Globe, Database, Network, Bell } from 'lucide-react'

interface Props { }

const StudyForTauri = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const tauriStudyItems = [
        // Tauri Fundamentals (4종)
        {
            id: 1,
            category: 'fundamentals',
            title: "Tauri v2 Setup & Configuration",
            description: "Tauri v2 환경 설정 및 기본 구조 이해",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐",
            estimatedDays: "3-5일",
            techStack: ["Tauri v2", "Rust", "Node.js", "Cargo", "npm/yarn"],
            detailItems: [
                "Tauri CLI 설치 및 설정",
                "프로젝트 초기화 및 구조 이해",
                "tauri.conf.json 설정 파일",
                "Cargo.toml 의존성 관리",
                "Frontend 번들러 연동 (Vite, Webpack)",
                "개발 서버 실행 및 Hot Reload",
                "디버깅 환경 설정",
                "VSCode 확장 및 툴링",
                "Cross-platform 개발 환경",
                "첫 번째 Hello World 앱"
            ]
        },
        {
            id: 2,
            category: 'fundamentals',
            title: "Tauri Architecture & Core Concepts",
            description: "Tauri 아키텍처 및 핵심 개념",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Tauri Core", "WebView", "IPC", "Command", "Event System"],
            detailItems: [
                "Tauri 아키텍처 이해 (Core + WebView)",
                "Frontend와 Backend 통신 구조",
                "Command 시스템 동작 원리",
                "Event 시스템 및 메시지 전달",
                "Context Isolation 보안 모델",
                "WebView 엔진 이해 (WebKit, Chromium)",
                "Process 관리 및 멀티윈도우",
                "Lifecycle Hooks",
                "Error Handling 패턴",
                "Performance Considerations"
            ]
        },
        {
            id: 3,
            category: 'fundamentals',
            title: "Rust Backend Development",
            description: "Tauri Rust 백엔드 개발",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Rust", "Tauri Commands", "State Management", "Async/Await", "Serde"],
            detailItems: [
                "Tauri Command 함수 작성",
                "State Management (Mutex, RwLock)",
                "Async/Await 비동기 처리",
                "JSON 직렬화/역직렬화 (Serde)",
                "Error 타입 정의 및 처리",
                "Custom Return Types",
                "Context와 AppHandle 활용",
                "Database 연동 (SQLite, PostgreSQL)",
                "HTTP 클라이언트 (reqwest)",
                "Background Tasks 관리"
            ]
        },
        {
            id: 4,
            category: 'fundamentals',
            title: "Frontend Integration",
            description: "프론트엔드 프레임워크 통합",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["React", "Vue", "Svelte", "Next.js", "@tauri-apps/api"],
            detailItems: [
                "@tauri-apps/api 라이브러리 활용",
                "React/Vue/Svelte 통합 설정",
                "invoke() 함수로 Rust 호출",
                "listen() 이벤트 구독",
                "Frontend State와 Backend 동기화",
                "TypeScript 타입 정의",
                "Component 라이브러리 통합",
                "Routing 설정 (React Router, Vue Router)",
                "Build 최적화",
                "HMR (Hot Module Replacement)"
            ]
        },
        // Native APIs (5종)
        {
            id: 5,
            category: 'native',
            title: "File System Operations",
            description: "파일 시스템 접근 및 조작",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["@tauri-apps/api/fs", "File API", "Path API", "Rust std::fs"],
            detailItems: [
                "파일 읽기/쓰기 (텍스트, 바이너리)",
                "디렉토리 생성/삭제/탐색",
                "파일 메타데이터 조회",
                "Path 조작 및 검증",
                "파일 다이얼로그 (open, save)",
                "Drag & Drop 파일 처리",
                "대용량 파일 스트리밍",
                "File Watcher 구현",
                "권한 및 보안 처리",
                "Cross-platform Path 처리"
            ]
        },
        {
            id: 6,
            category: 'native',
            title: "Window Management",
            description: "윈도우 관리 및 제어",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "4-6일",
            techStack: ["@tauri-apps/api/window", "Window API", "Monitor API"],
            detailItems: [
                "멀티 윈도우 생성 및 관리",
                "윈도우 크기/위치 제어",
                "윈도우 상태 (최소화, 최대화, 전체화면)",
                "윈도우 이벤트 처리",
                "Modal 및 Dialog 윈도우",
                "윈도우 간 통신",
                "Monitor 정보 조회",
                "윈도우 테마 및 스타일링",
                "Always on Top 설정",
                "윈도우 생명주기 관리"
            ]
        },
        {
            id: 7,
            category: 'native',
            title: "System Tray & Notifications",
            description: "시스템 트레이 및 알림 시스템",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "4-6일",
            techStack: ["System Tray", "Notifications", "Context Menu", "Icons"],
            detailItems: [
                "시스템 트레이 아이콘 설정",
                "트레이 컨텍스트 메뉴",
                "트레이 이벤트 처리",
                "네이티브 알림 시스템",
                "커스텀 알림 UI",
                "Badge 및 카운터 표시",
                "아이콘 애니메이션",
                "트레이 툴팁",
                "앱 숨기기/보이기 토글",
                "OS별 트레이 동작 차이"
            ]
        },
        {
            id: 8,
            category: 'native',
            title: "HTTP Client & Network",
            description: "HTTP 클라이언트 및 네트워크 통신",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["@tauri-apps/api/http", "reqwest", "WebSocket", "Network API"],
            detailItems: [
                "HTTP GET/POST/PUT/DELETE 요청",
                "Request/Response 헤더 처리",
                "JSON/Form 데이터 전송",
                "File Upload/Download",
                "Authentication (Bearer, Basic)",
                "Certificate Pinning",
                "Proxy 설정",
                "WebSocket 연결",
                "네트워크 상태 감지",
                "CORS 및 보안 처리"
            ]
        },
        {
            id: 9,
            category: 'native',
            title: "Hardware & System Info",
            description: "하드웨어 정보 및 시스템 통합",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "4-6일",
            techStack: ["System Info", "Hardware API", "Process API", "Registry"],
            detailItems: [
                "시스템 정보 조회 (OS, CPU, Memory)",
                "하드웨어 사양 정보",
                "프로세스 목록 및 관리",
                "환경 변수 접근",
                "Registry 읽기/쓰기 (Windows)",
                "시스템 이벤트 감지",
                "Power Management",
                "Screen Resolution 정보",
                "Clipboard 접근",
                "Keyboard/Mouse Hook"
            ]
        },
        // Security & Permissions (3종)
        {
            id: 10,
            category: 'security',
            title: "Security Model & Permissions",
            description: "보안 모델 및 권한 관리",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Security Policy", "CSP", "Permissions", "Allowlist"],
            detailItems: [
                "Tauri 보안 모델 이해",
                "Content Security Policy (CSP) 설정",
                "API 권한 및 Allowlist",
                "Context Isolation 활용",
                "Dangerous APIs 제한",
                "Code Signing 인증서",
                "Secure Communication",
                "Input Validation",
                "XSS 방지 전략",
                "Security Audit 체크리스트"
            ]
        },
        {
            id: 11,
            category: 'security',
            title: "Data Encryption & Storage",
            description: "데이터 암호화 및 안전한 저장",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Encryption", "Keyring", "SQLite", "Secure Storage"],
            detailItems: [
                "로컬 데이터 암호화",
                "Keyring 시스템 활용",
                "SQLite 데이터베이스 암호화",
                "환경별 설정 관리",
                "민감 정보 처리",
                "Key Derivation Functions",
                "Secure Random 생성",
                "Password Hashing",
                "Token 관리",
                "GDPR/보안 컴플라이언스"
            ]
        },
        {
            id: 12,
            category: 'security',
            title: "Authentication & User Management",
            description: "인증 및 사용자 관리",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["OAuth", "JWT", "Biometric", "Session Management"],
            detailItems: [
                "OAuth 2.0 플로우 구현",
                "JWT 토큰 처리",
                "Biometric 인증 (지문, 얼굴)",
                "Multi-factor Authentication",
                "Session 관리",
                "SSO (Single Sign-On)",
                "User Profile 관리",
                "Role-based Access Control",
                "Device Registration",
                "Logout 및 세션 정리"
            ]
        },
        // Advanced Features (4종)
        {
            id: 13,
            category: 'advanced',
            title: "Auto-Update System",
            description: "자동 업데이트 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Updater", "Release Management", "Delta Updates", "Rollback"],
            detailItems: [
                "Updater 설정 및 구성",
                "Release Server 구축",
                "Version Check 로직",
                "Delta Updates 최적화",
                "업데이트 다운로드 진행률",
                "Silent vs Interactive Update",
                "Rollback 메커니즘",
                "업데이트 검증 및 서명",
                "A/B Testing 업데이트",
                "오프라인 업데이트 처리"
            ]
        },
        {
            id: 14,
            category: 'advanced',
            title: "Plugin System & Extensions",
            description: "플러그인 시스템 및 확장성",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Plugin Architecture", "WASM", "Dynamic Loading", "API Design"],
            detailItems: [
                "Plugin 아키텍처 설계",
                "Dynamic Library Loading",
                "WASM 플러그인 지원",
                "Plugin API 인터페이스",
                "Plugin 생명주기 관리",
                "Plugin 간 통신",
                "Sandboxing 및 격리",
                "Plugin Marketplace",
                "Hot Plugging/Unplugging",
                "Plugin 보안 검증"
            ]
        },
        {
            id: 15,
            category: 'advanced',
            title: "Custom WebView & Browser Engine",
            description: "커스텀 WebView 및 브라우저 엔진",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["WebView Customization", "CEF", "Browser Engine", "JavaScript Bridge"],
            detailItems: [
                "WebView 엔진 커스터마이징",
                "CEF (Chromium Embedded Framework)",
                "JavaScript Bridge 구현",
                "Custom Protocol Handler",
                "DOM Manipulation from Rust",
                "WebView Performance 최적화",
                "Developer Tools 통합",
                "WebView 이벤트 처리",
                "Memory Management",
                "Multi-WebView 관리"
            ]
        },
        {
            id: 16,
            category: 'advanced',
            title: "Performance Optimization",
            description: "성능 최적화 및 모니터링",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Performance Monitoring", "Memory Management", "Bundle Optimization", "Profiling"],
            detailItems: [
                "앱 시작 시간 최적화",
                "Memory 사용량 모니터링",
                "CPU 사용률 최적화",
                "Bundle Size 최소화",
                "Lazy Loading 구현",
                "Tree Shaking 적용",
                "Code Splitting",
                "Performance Profiling",
                "Resource Preloading",
                "Background Task 최적화"
            ]
        },
        // Build & Deployment (3종)
        {
            id: 17,
            category: 'deployment',
            title: "Cross-Platform Building",
            description: "크로스 플랫폼 빌드 및 배포",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["GitHub Actions", "Docker", "Cross Compilation", "Native Dependencies"],
            detailItems: [
                "Windows/macOS/Linux 빌드",
                "GitHub Actions CI/CD",
                "Docker 기반 빌드 환경",
                "Cross Compilation 설정",
                "Native Dependencies 관리",
                "Code Signing 자동화",
                "Release Artifact 생성",
                "Multi-architecture 빌드",
                "Build Cache 최적화",
                "Error Handling in CI"
            ]
        },
        {
            id: 18,
            category: 'deployment',
            title: "App Distribution & Packaging",
            description: "앱 배포 및 패키징",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Installer", "DMG", "MSI", "AppImage", "Store Distribution"],
            detailItems: [
                "Windows Installer (MSI, NSIS)",
                "macOS DMG 및 PKG",
                "Linux AppImage/Snap/Flatpak",
                "App Store 배포 (Mac App Store)",
                "Windows Store 배포",
                "Self-hosted Distribution",
                "Installer 커스터마이징",
                "Update Channel 관리",
                "License 및 EULA",
                "Analytics 및 Crash Reporting"
            ]
        },
        {
            id: 19,
            category: 'deployment',
            title: "Monitoring & Analytics",
            description: "모니터링 및 분석",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Telemetry", "Crash Reporting", "Usage Analytics", "Error Tracking"],
            detailItems: [
                "Telemetry 데이터 수집",
                "Crash Report 시스템",
                "Usage Analytics 구현",
                "Error Tracking 및 Logging",
                "Performance Metrics",
                "User Behavior 분석",
                "A/B Testing 프레임워크",
                "Privacy-compliant Analytics",
                "Real-time Monitoring",
                "Alert 시스템"
            ]
        },
        // Testing & Debugging (2종)
        {
            id: 20,
            category: 'testing',
            title: "Testing Strategies",
            description: "테스팅 전략 및 구현",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Unit Testing", "Integration Testing", "E2E Testing", "WebDriver"],
            detailItems: [
                "Rust Unit Testing",
                "Frontend Component Testing",
                "Integration Testing",
                "E2E Testing (WebDriver)",
                "Mock Command 구현",
                "Test Fixtures 관리",
                "Cross-platform Testing",
                "Performance Testing",
                "Security Testing",
                "Test Automation Pipeline"
            ]
        },
        {
            id: 21,
            category: 'testing',
            title: "Debugging & Development Tools",
            description: "디버깅 및 개발 도구",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "4-6일",
            techStack: ["Debugging", "DevTools", "Logging", "Profiling"],
            detailItems: [
                "Rust Backend 디버깅",
                "Frontend DevTools 활용",
                "Log 시스템 구축",
                "Error Boundary 구현",
                "Memory Leak 감지",
                "Performance Profiling",
                "Network Request 모니터링",
                "State 변화 추적",
                "Hot Reload 디버깅",
                "Production 디버깅"
            ]
        },
        // Real-world Projects (5종)
        {
            id: 22,
            category: 'projects',
            title: "Desktop Note App",
            description: "데스크톱 메모 앱 개발",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["React", "SQLite", "Rich Text Editor", "File System"],
            detailItems: [
                "Rich Text Editor 통합 (Lexical)",
                "SQLite 데이터베이스 설계",
                "노트 CRUD 기능",
                "Tag 및 Category 시스템",
                "전문 검색 기능",
                "파일 첨부 및 이미지",
                "동기화 기능",
                "다크모드 지원",
                "키보드 단축키",
                "Export 기능 (PDF, Markdown)"
            ]
        },
        {
            id: 23,
            category: 'projects',
            title: "System Monitor Dashboard",
            description: "시스템 모니터링 대시보드",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["System Info", "Charts", "Real-time Updates", "Notifications"],
            detailItems: [
                "실시간 시스템 리소스 모니터링",
                "CPU/Memory/Disk 사용률 차트",
                "프로세스 관리자",
                "네트워크 트래픽 모니터링",
                "알림 시스템 (임계값 초과)",
                "Historical 데이터 저장",
                "Custom 위젯 시스템",
                "다중 서버 모니터링",
                "Report 생성",
                "시스템 트레이 통합"
            ]
        },
        {
            id: 24,
            category: 'projects',
            title: "File Manager Pro",
            description: "고급 파일 관리자",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["File System", "Drag & Drop", "Preview", "Compression"],
            detailItems: [
                "Dual-pane 파일 브라우저",
                "파일 미리보기 (이미지, 텍스트, PDF)",
                "Drag & Drop 파일 이동",
                "압축 파일 처리 (ZIP, RAR)",
                "FTP/SFTP 클라이언트",
                "파일 검색 엔진",
                "Batch 파일 작업",
                "권한 및 속성 관리",
                "북마크 시스템",
                "플러그인 아키텍처"
            ]
        },
        {
            id: 25,
            category: 'projects',
            title: "Chat Application",
            description: "실시간 채팅 애플리케이션",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["WebSocket", "Encryption", "File Transfer", "Notifications"],
            detailItems: [
                "WebSocket 실시간 통신",
                "End-to-End 암호화",
                "파일 및 이미지 전송",
                "그룹 채팅 및 채널",
                "오프라인 메시지 동기화",
                "Push 알림 시스템",
                "이모지 및 스티커",
                "Voice/Video Call 통합",
                "Screen Sharing",
                "Message 검색 및 히스토리"
            ]
        },
        {
            id: 26,
            category: 'projects',
            title: "Development Tools Suite",
            description: "개발자 도구 모음",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Code Editor", "Terminal", "Git", "REST Client"],
            detailItems: [
                "경량 코드 에디터 (Monaco)",
                "통합 터미널",
                "Git GUI 클라이언트",
                "REST API 클라이언트",
                "Database 브라우저",
                "JSON/XML Formatter",
                "Regex Tester",
                "Color Picker 도구",
                "Markdown Preview",
                "Plugin 시스템"
            ]
        }
    ]

    const categories = [
        { id: 'all', label: '전체', icon: <Monitor className="h-4 w-4" /> },
        { id: 'fundamentals', label: '기초 & 설정', icon: <Settings className="h-4 w-4" /> },
        { id: 'native', label: 'Native API', icon: <Code className="h-4 w-4" /> },
        { id: 'security', label: '보안 & 권한', icon: <Shield className="h-4 w-4" /> },
        { id: 'advanced', label: '고급 기능', icon: <Zap className="h-4 w-4" /> },
        { id: 'deployment', label: '빌드 & 배포', icon: <Package className="h-4 w-4" /> },
        { id: 'testing', label: '테스팅 & 디버깅', icon: <FileText className="h-4 w-4" /> },
        { id: 'projects', label: '실습 프로젝트', icon: <Globe className="h-4 w-4" /> }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredItems = selectedCategory === 'all'
        ? tauriStudyItems
        : tauriStudyItems.filter(item => item.category === selectedCategory)

    const highPriority = filteredItems.filter(item => item.priority === 'High')
    const mediumPriority = filteredItems.filter(item => item.priority === 'Medium')
    const lowPriority = filteredItems.filter(item => item.priority === 'Low')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">🦀 Tauri 데스크톱 앱 개발 마스터</h1>
                <p className="text-xl text-gray-600">Rust + Frontend로 크로스 플랫폼 데스크톱 앱 개발</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 26개 학습 영역
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 4-8개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        260+ 실무 기능
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
                    <div className="text-2xl font-bold text-gray-600">180-260</div>
                    <div className="text-sm text-gray-600">총 학습일</div>
                </div>
            </div>

            {/* High Priority Section */}
            {highPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                        <Star className="h-6 w-6" />
                        <span>High Priority (필수 학습) - {highPriority.length}개</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {highPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🛠️ 학습 세부 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
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
                    <h2 className="text-2xl font-bold text-yellow-600">Medium Priority (심화 학습) - {mediumPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mediumPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🛠️ 학습 세부 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
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

            {/* Low Priority Section */}
            {lowPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-green-600">Low Priority (전문 영역) - {lowPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {lowPriority.map((item) => (
                            <Card key={item.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {item.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{item.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(item.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[item.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {item.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{item.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {item.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[item.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">🛠️ 학습 세부 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {item.detailItems.map((detail, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{detail}</span>
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

            {/* Tauri Architecture */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🏗️ Tauri 아키텍처 개요</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Frontend Layer</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• React/Vue/Svelte 지원</li>
                                <li>• WebView 기반 UI</li>
                                <li>• @tauri-apps/api 통신</li>
                                <li>• 모던 웹 기술 활용</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Rust Backend</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Command 시스템</li>
                                <li>• Native API 접근</li>
                                <li>• 메모리 안전성</li>
                                <li>• 고성능 처리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Platform Integration</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Windows/macOS/Linux</li>
                                <li>• System Tray/Notifications</li>
                                <li>• File System Access</li>
                                <li>• Hardware Integration</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Learning Path */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">📚 추천 학습 순서</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">Tauri 기초 & Rust 백엔드</span>
                            <span className="text-sm text-gray-500">(3-4주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">Native API & 파일 시스템</span>
                            <span className="text-sm text-gray-500">(2-3주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">보안 & 권한 관리</span>
                            <span className="text-sm text-gray-500">(2-3주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">빌드 & 배포 시스템</span>
                            <span className="text-sm text-gray-500">(2-3주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">고급 기능 & 최적화</span>
                            <span className="text-sm text-gray-500">(3-4주)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">실습 프로젝트 완성</span>
                            <span className="text-sm text-gray-500">(4-6주)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Project Showcase */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-xl text-green-900">🚀 실습 프로젝트 하이라이트</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">기초 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Desktop Note App (메모장)</li>
                                <li>• System Monitor Dashboard</li>
                                <li>• File Manager Pro</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">고급 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Chat Application (실시간 채팅)</li>
                                <li>• Development Tools Suite</li>
                                <li>• Plugin System 구현</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle>📊 학습 진행 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>전체 진행률</span>
                            <span className="text-sm text-gray-500">0/26 완료 (총 260+ 학습 항목)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            Tauri 마스터 여정을 시작하여 크로스 플랫폼 데스크톱 개발자가 되어보세요! 🦀
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForTauri