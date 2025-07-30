"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp, Phone, Video, Globe, Database, Shield, Zap, Network, Code, Monitor, Cpu, Headphones, Users } from 'lucide-react'

interface Props { }

const StudyForCallCenterCore = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const coreStudyItems = [
        // Telecom & VoIP Systems (8종)
        {
            id: 1,
            category: 'telecom',
            title: "SIP Protocol & VoIP Foundation",
            description: "SIP 프로토콜 기반 VoIP 시스템 구축",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["SIP", "RTP/RTCP", "SDP", "C/C++", "FreeSWITCH", "Asterisk"],
            detailItems: [
                "SIP 프로토콜 상세 분석 및 구현",
                "RTP/RTCP 미디어 스트리밍",
                "SDP 세션 기술 프로토콜",
                "UAC/UAS 구현 (User Agent)",
                "SIP Proxy Server 개발",
                "Registration/Authentication",
                "Call Setup/Teardown 처리",
                "NAT Traversal (STUN/TURN)",
                "Codec 협상 및 변환",
                "C++ SIP 스택 라이브러리"
            ]
        },
        {
            id: 2,
            category: 'telecom',
            title: "WebRTC & Browser Integration",
            description: "WebRTC 기반 웹 전화 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "15-20일",
            techStack: ["WebRTC", "JavaScript", "C++", "Signaling Server", "ICE", "DTLS"],
            detailItems: [
                "WebRTC PeerConnection API",
                "Signaling Server 구현",
                "ICE Candidate 교환",
                "DTLS 보안 협상",
                "MediaStream 처리",
                "화면 공유 및 녹화",
                "Echo Cancellation",
                "Bandwidth Adaptation",
                "Multi-party Conference",
                "Mobile WebRTC 최적화"
            ]
        },
        {
            id: 3,
            category: 'telecom',
            title: "Video Conference System",
            description: "화상 회의 및 화상 상담 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "25-30일",
            techStack: ["H.264/H.265", "VP8/VP9", "MCU/SFU", "FFmpeg", "GStreamer", "C++"],
            detailItems: [
                "비디오 코덱 (H.264/H.265) 처리",
                "MCU (Multipoint Control Unit) 구현",
                "SFU (Selective Forwarding Unit)",
                "실시간 비디오 스트리밍",
                "Adaptive Bitrate Streaming",
                "비디오 컴포지팅 및 레이아웃",
                "화면 공유 및 주석",
                "녹화 및 재생 시스템",
                "모바일 비디오 최적화",
                "AI 기반 노이즈 제거"
            ]
        },
        {
            id: 4,
            category: 'telecom',
            title: "CTI (Computer Telephony Integration)",
            description: "CTI 시스템 통합 및 구현",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "22-28일",
            techStack: ["TAPI", "TSAPI", "JTAPI", "C/C++", "COM/DCOM", "Socket Programming"],
            detailItems: [
                "TAPI (Telephony API) 구현",
                "TSAPI (Telephony Server API)",
                "First Party/Third Party Call Control",
                "CRM 시스템 연동",
                "Screen Pop 기능",
                "Call Routing 엔진",
                "ACD (Automatic Call Distribution)",
                "IVR (Interactive Voice Response)",
                "Call Recording 통합",
                "Skill-based Routing"
            ]
        },
        {
            id: 5,
            category: 'telecom',
            title: "Audio Processing & DSP",
            description: "오디오 처리 및 디지털 신호 처리",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["DSP", "Audio Codecs", "Noise Reduction", "Echo Cancellation", "C/C++", "FFTW"],
            detailItems: [
                "PCM/G.711/G.729 코덱 구현",
                "Echo Cancellation 알고리즘",
                "Noise Reduction 및 Suppression",
                "Automatic Gain Control (AGC)",
                "DTMF (Dual Tone Multi Frequency) 감지",
                "Audio Mixing 및 Conference",
                "Voice Activity Detection",
                "Jitter Buffer 관리",
                "Real-time Audio Processing",
                "SIMD 최적화 (SSE/AVX)"
            ]
        },
        {
            id: 6,
            category: 'telecom',
            title: "Unified Communications",
            description: "통합 커뮤니케이션 플랫폼",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["SIP", "XMPP", "WebRTC", "Presence", "IM", "File Transfer"],
            detailItems: [
                "Presence 서버 구현",
                "Instant Messaging 시스템",
                "파일 전송 프로토콜",
                "Contact List 관리",
                "통합 주소록",
                "Multi-device Synchronization",
                "Push Notification",
                "오프라인 메시지 저장",
                "그룹 채팅 및 채널",
                "Enterprise Directory 연동"
            ]
        },
        {
            id: 7,
            category: 'telecom',
            title: "SS7 & PSTN Integration",
            description: "SS7 및 PSTN 네트워크 연동",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "25-30일",
            techStack: ["SS7", "ISUP", "TCAP", "SCCP", "C", "Linux Drivers"],
            detailItems: [
                "SS7 프로토콜 스택 구현",
                "ISUP (ISDN User Part) 처리",
                "TCAP (Transaction Capabilities)",
                "SCCP (Signaling Connection Control)",
                "MTP (Message Transfer Part)",
                "PSTN Gateway 구현",
                "E1/T1 인터페이스",
                "Signaling System 모니터링",
                "Call Detail Record (CDR)",
                "Billing 시스템 연동"
            ]
        },
        {
            id: 8,
            category: 'telecom',
            title: "Mobile Network Integration",
            description: "모바일 네트워크 연동 (LTE/5G)",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["LTE", "5G", "VoLTE", "RCS", "IMS", "SIP-I"],
            detailItems: [
                "VoLTE (Voice over LTE) 구현",
                "IMS (IP Multimedia Subsystem)",
                "RCS (Rich Communication Services)",
                "SIP-I 프로토콜",
                "Diameter 프로토콜",
                "HSS (Home Subscriber Server) 연동",
                "P-CSCF/I-CSCF/S-CSCF",
                "Emergency Call 처리",
                "Quality of Service (QoS)",
                "Network Function Virtualization"
            ]
        },
        // Core Systems Programming (6종)
        {
            id: 9,
            category: 'core',
            title: "C Systems Programming",
            description: "C 시스템 프로그래밍 마스터",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "15-20일",
            techStack: ["C", "POSIX", "System Calls", "Memory Management", "Process/Thread", "IPC"],
            detailItems: [
                "메모리 관리 및 포인터 마스터",
                "시스템 콜 프로그래밍",
                "프로세스 및 스레드 관리",
                "IPC (파이프, 메시지 큐, 공유 메모리)",
                "Signal 처리 및 비동기 프로그래밍",
                "파일 I/O 및 디렉토리 조작",
                "네트워크 소켓 프로그래밍",
                "메모리 누수 및 디버깅",
                "성능 최적화 기법",
                "Cross-platform 개발"
            ]
        },
        {
            id: 10,
            category: 'core',
            title: "C++ Advanced Programming",
            description: "C++ 고급 프로그래밍 및 최적화",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["C++17/20", "STL", "Template", "RAII", "Smart Pointers", "Concurrency"],
            detailItems: [
                "Modern C++ (C++17/20) 기능",
                "STL 컨테이너 및 알고리즘",
                "Template 메타프로그래밍",
                "RAII 및 Resource Management",
                "스마트 포인터 활용",
                "Move Semantics 및 Perfect Forwarding",
                "멀티스레딩 및 동시성",
                "Lock-free 프로그래밍",
                "성능 프로파일링",
                "메모리 최적화 기법"
            ]
        },
        {
            id: 11,
            category: 'core',
            title: "Rust Systems Programming",
            description: "Rust 시스템 프로그래밍 및 안전성",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["Rust", "Ownership", "Borrowing", "Unsafe", "Async/Await", "FFI"],
            detailItems: [
                "Ownership 및 Borrowing 시스템",
                "Lifetime 및 타입 시스템",
                "Pattern Matching 및 Enum",
                "Trait 및 Generic Programming",
                "Error Handling (Result/Option)",
                "Async/Await 비동기 프로그래밍",
                "Unsafe Rust 및 FFI",
                "WebAssembly 컴파일",
                "성능 최적화 및 Zero-cost Abstractions",
                "Cargo 및 패키지 관리"
            ]
        },
        {
            id: 12,
            category: 'core',
            title: "Network Programming",
            description: "네트워크 프로그래밍 및 소켓",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["TCP/IP", "UDP", "Socket Programming", "epoll/kqueue", "SSL/TLS", "HTTP/2"],
            detailItems: [
                "TCP/UDP 소켓 프로그래밍",
                "Non-blocking I/O 및 Event Loop",
                "epoll/kqueue 활용",
                "SSL/TLS 보안 통신",
                "HTTP/1.1 및 HTTP/2 구현",
                "WebSocket 프로토콜",
                "Raw Socket 및 Packet Capture",
                "Network Address Translation",
                "Load Balancing 구현",
                "Network Performance Tuning"
            ]
        },
        {
            id: 13,
            category: 'core',
            title: "Real-time Systems",
            description: "실시간 시스템 프로그래밍",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["Real-time OS", "RTOS", "Scheduling", "Priority Inversion", "Deadlock", "Timing"],
            detailItems: [
                "실시간 스케줄링 알고리즘",
                "Priority Inversion 해결",
                "Deadlock 방지 및 감지",
                "Interrupt 처리 최적화",
                "Timer 및 Clock 관리",
                "Memory Pool 관리",
                "Deterministic 메모리 할당",
                "Jitter 최소화 기법",
                "Real-time Communication",
                "성능 측정 및 분석"
            ]
        },
        {
            id: 14,
            category: 'core',
            title: "Embedded Systems",
            description: "임베디드 시스템 개발",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["ARM", "Microcontroller", "Device Drivers", "Hardware Interface", "FreeRTOS", "Bare Metal"],
            detailItems: [
                "ARM Cortex-M 프로그래밍",
                "Device Driver 개발",
                "GPIO/UART/SPI/I2C 인터페이스",
                "Interrupt Service Routine",
                "DMA (Direct Memory Access)",
                "Power Management",
                "FreeRTOS 활용",
                "Bare Metal 프로그래밍",
                "Hardware Abstraction Layer",
                "Debugging 및 Profiling"
            ]
        },
        // Legacy Integration (5종)
        {
            id: 15,
            category: 'legacy',
            title: "Enterprise Service Bus (ESB)",
            description: "기업 서비스 버스 구축 및 연동",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["ESB", "Message Transformation", "Routing", "Protocol Adaptation", "C++", "XML/JSON"],
            detailItems: [
                "메시지 라우팅 엔진",
                "프로토콜 어댑터 구현",
                "데이터 변환 및 매핑",
                "서비스 오케스트레이션",
                "Transaction 관리",
                "Error Handling 및 Retry",
                "Load Balancing 및 Failover",
                "Monitoring 및 Logging",
                "Configuration Management",
                "Security 및 Authentication"
            ]
        },
        {
            id: 16,
            category: 'legacy',
            title: "Message Queue Systems",
            description: "메시지 큐 시스템 구현",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Message Queue", "AMQP", "MQTT", "ZeroMQ", "C++", "Persistent Storage"],
            detailItems: [
                "메시지 큐 아키텍처 설계",
                "AMQP 프로토콜 구현",
                "Message Persistence",
                "Queue 관리 및 모니터링",
                "Dead Letter Queue",
                "Message Ordering 보장",
                "Clustering 및 Replication",
                "Flow Control 및 Backpressure",
                "Security 및 Access Control",
                "Performance Optimization"
            ]
        },
        {
            id: 17,
            category: 'legacy',
            title: "Database Connectivity",
            description: "데이터베이스 연결 및 최적화",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["ODBC", "JDBC", "Connection Pooling", "SQL", "C/C++", "Database Drivers"],
            detailItems: [
                "ODBC/JDBC 드라이버 구현",
                "Connection Pool 관리",
                "Prepared Statement 최적화",
                "Transaction 관리",
                "Batch Processing",
                "Stored Procedure 호출",
                "Result Set 처리",
                "Database 메타데이터",
                "Error Handling",
                "Performance Monitoring"
            ]
        },
        {
            id: 18,
            category: 'legacy',
            title: "File Format Processing",
            description: "다양한 파일 형식 처리",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["CSV", "XML", "JSON", "Binary Formats", "C/C++", "Parser"],
            detailItems: [
                "CSV 파싱 및 생성",
                "XML DOM/SAX 파서",
                "JSON 파싱 라이브러리",
                "바이너리 파일 처리",
                "대용량 파일 스트리밍",
                "인코딩 변환 (UTF-8/UTF-16)",
                "스키마 검증",
                "메모리 효율적 파싱",
                "Error Recovery",
                "Performance Benchmarking"
            ]
        },
        {
            id: 19,
            category: 'legacy',
            title: "Protocol Bridges",
            description: "프로토콜 브리지 및 게이트웨이",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Protocol Conversion", "Gateway", "Adapter Pattern", "C++", "Network Programming"],
            detailItems: [
                "프로토콜 변환 엔진",
                "Legacy 시스템 어댑터",
                "Protocol Multiplexing",
                "State Machine 구현",
                "Buffer Management",
                "Timeout 및 Retry 처리",
                "Configuration 관리",
                "Monitoring 및 Metrics",
                "Testing Framework",
                "Documentation 자동화"
            ]
        },
        // Security & Encryption (4종)
        {
            id: 20,
            category: 'security',
            title: "Cryptography & Security",
            description: "암호화 및 보안 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["OpenSSL", "Cryptography", "PKI", "Hash Functions", "Digital Signature", "C/C++"],
            detailItems: [
                "대칭/비대칭 암호화 구현",
                "Hash 함수 및 HMAC",
                "Digital Signature 검증",
                "PKI (Public Key Infrastructure)",
                "Certificate 관리",
                "Key Exchange 프로토콜",
                "Secure Random Number Generation",
                "Side-channel Attack 방어",
                "Cryptographic Protocol Design",
                "Hardware Security Module"
            ]
        },
        {
            id: 21,
            category: 'security',
            title: "Authentication & Authorization",
            description: "인증 및 권한 관리 시스템",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["OAuth 2.0", "SAML", "JWT", "LDAP", "Kerberos", "Multi-factor Auth"],
            detailItems: [
                "OAuth 2.0 서버 구현",
                "SAML Identity Provider",
                "JWT 토큰 처리",
                "LDAP 디렉토리 서비스",
                "Kerberos 인증",
                "Multi-factor Authentication",
                "Single Sign-On (SSO)",
                "Role-based Access Control",
                "Session Management",
                "Audit Logging"
            ]
        },
        {
            id: 22,
            category: 'security',
            title: "Network Security",
            description: "네트워크 보안 및 방화벽",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Firewall", "IDS/IPS", "VPN", "TLS/SSL", "Network Monitoring", "C/C++"],
            detailItems: [
                "방화벽 룰 엔진",
                "Intrusion Detection System",
                "VPN 터널링",
                "TLS/SSL 프로토콜",
                "Packet Filtering",
                "DDoS 방어 메커니즘",
                "Network Traffic Analysis",
                "Threat Intelligence",
                "Incident Response",
                "Forensic Analysis"
            ]
        },
        {
            id: 23,
            category: 'security',
            title: "Secure Communications",
            description: "보안 통신 프로토콜",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["SRTP", "DTLS", "IPSec", "Signal Protocol", "End-to-End Encryption"],
            detailItems: [
                "SRTP (Secure RTP) 구현",
                "DTLS for WebRTC",
                "IPSec VPN 구현",
                "Signal Protocol (Double Ratchet)",
                "End-to-End 암호화",
                "Perfect Forward Secrecy",
                "Key Rotation 메커니즘",
                "Secure Group Communication",
                "Message Authentication",
                "Anti-replay Protection"
            ]
        },
        // Performance & Optimization (4종)
        {
            id: 24,
            category: 'performance',
            title: "High-Performance Computing",
            description: "고성능 컴퓨팅 및 최적화",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "20-25일",
            techStack: ["SIMD", "Multi-threading", "NUMA", "Cache Optimization", "Vectorization", "C/C++"],
            detailItems: [
                "SIMD 명령어 최적화 (SSE/AVX)",
                "Multi-threading 및 병렬 처리",
                "NUMA 아키텍처 최적화",
                "CPU Cache 효율성",
                "벡터화 및 Loop 최적화",
                "Memory Alignment",
                "False Sharing 방지",
                "Lock-free 데이터 구조",
                "Profiling 및 성능 분석",
                "Compiler 최적화 활용"
            ]
        },
        {
            id: 25,
            category: 'performance',
            title: "Memory Management",
            description: "메모리 관리 및 최적화",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Memory Pool", "Garbage Collection", "Memory Mapping", "Virtual Memory", "C/C++"],
            detailItems: [
                "Memory Pool 구현",
                "Custom Allocator 개발",
                "Garbage Collection 알고리즘",
                "Memory Mapping (mmap)",
                "Virtual Memory 관리",
                "Memory Leak Detection",
                "Fragmentation 방지",
                "RAII 패턴 활용",
                "Smart Pointer 구현",
                "Memory Profiling Tools"
            ]
        },
        {
            id: 26,
            category: 'performance',
            title: "Concurrency & Parallelism",
            description: "동시성 및 병렬 처리",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["Thread Pool", "Actor Model", "CSP", "Lock-free", "Async I/O", "C++/Rust"],
            detailItems: [
                "Thread Pool 구현",
                "Actor Model 패턴",
                "CSP (Communicating Sequential Processes)",
                "Lock-free 프로그래밍",
                "Async I/O 처리",
                "Event Loop 구현",
                "Work Stealing Queue",
                "Coroutine 구현",
                "Synchronization Primitives",
                "Race Condition 방지"
            ]
        },
        {
            id: 27,
            category: 'performance',
            title: "Real-time Processing",
            description: "실시간 데이터 처리",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Stream Processing", "Ring Buffer", "Low Latency", "RDMA", "Kernel Bypass"],
            detailItems: [
                "스트림 처리 엔진",
                "Ring Buffer 구현",
                "Low Latency 최적화",
                "RDMA (Remote Direct Memory Access)",
                "Kernel Bypass 기법",
                "Zero-copy 네트워킹",
                "Real-time Scheduling",
                "Jitter 최소화",
                "High-frequency Trading 기법",
                "Performance Monitoring"
            ]
        },
        // Mini Projects (8종)
        {
            id: 28,
            category: 'projects',
            title: "Mini SIP Server (C++)",
            description: "간단한 SIP 서버 구현",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["C++17", "Socket Programming", "SIP Protocol", "Multi-threading"],
            detailItems: [
                "SIP 메시지 파싱 라이브러리",
                "Registration Server 구현",
                "Call Routing 기본 로직",
                "Transaction Layer 구현",
                "Multi-client 동시 처리",
                "Configuration 파일 지원",
                "Logging 시스템",
                "Basic Authentication",
                "NAT Traversal 기초",
                "Unit Test 작성"
            ]
        },
        {
            id: 29,
            category: 'projects',
            title: "WebRTC Signaling Server (Rust)",
            description: "Rust로 구현하는 WebRTC 시그널링",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Rust", "Tokio", "WebSocket", "JSON", "Async/Await"],
            detailItems: [
                "WebSocket 서버 구현",
                "Signaling 메시지 교환",
                "Room 관리 시스템",
                "ICE Candidate 중계",
                "SDP Offer/Answer 처리",
                "User Management",
                "Error Handling",
                "Concurrent Connection 처리",
                "Configuration Management",
                "Docker Containerization"
            ]
        },
        {
            id: 30,
            category: 'projects',
            title: "Audio Codec Library (C)",
            description: "오디오 코덱 라이브러리 구현",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["C", "DSP", "G.711", "G.729", "Audio Processing"],
            detailItems: [
                "G.711 μ-law/A-law 코덱",
                "G.729 압축 알고리즘",
                "PCM 형식 변환",
                "Sample Rate 변환",
                "Audio Buffer 관리",
                "Real-time Encoding/Decoding",
                "SIMD 최적화",
                "Cross-platform 지원",
                "API Documentation",
                "Performance Benchmarking"
            ]
        },
        {
            id: 31,
            category: 'projects',
            title: "Message Queue Broker (C++)",
            description: "메시지 큐 브로커 구현",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["C++", "AMQP", "Multi-threading", "Persistent Storage"],
            detailItems: [
                "AMQP 프로토콜 서버",
                "Queue 관리 엔진",
                "Message Persistence",
                "Producer/Consumer 처리",
                "Exchange Routing",
                "Dead Letter Queue",
                "Clustering 기초",
                "Monitoring Interface",
                "Configuration System",
                "Load Testing Tools"
            ]
        },
        {
            id: 32,
            category: 'projects',
            title: "Network Monitor Tool (Rust)",
            description: "네트워크 모니터링 도구",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["Rust", "Packet Capture", "Network Analysis", "CLI"],
            detailItems: [
                "Packet Capture 라이브러리",
                "Protocol 분석 엔진",
                "Real-time Statistics",
                "Network Flow 추적",
                "CLI 인터페이스",
                "Export 기능 (CSV/JSON)",
                "Filter 및 Search",
                "Performance Metrics",
                "Configuration File",
                "Cross-platform 지원"
            ]
        },
        {
            id: 33,
            category: 'projects',
            title: "CTI Simulator (C++)",
            description: "CTI 시스템 시뮬레이터",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["C++", "TAPI", "COM", "GUI", "Multi-threading"],
            detailItems: [
                "TAPI 인터페이스 시뮬레이션",
                "가상 전화 디바이스",
                "Call Control 시뮬레이션",
                "Event 생성 엔진",
                "GUI 모니터링 도구",
                "Script 기반 시나리오",
                "Performance Testing",
                "Log 분석 도구",
                "Configuration Management",
                "Remote Control API"
            ]
        },
        {
            id: 34,
            category: 'projects',
            title: "Crypto Library (C)",
            description: "암호화 라이브러리 구현",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "18-22일",
            techStack: ["C", "Cryptography", "OpenSSL", "Assembly"],
            detailItems: [
                "AES 암호화 구현",
                "RSA 공개키 암호화",
                "SHA 해시 함수",
                "HMAC 메시지 인증",
                "Random Number Generator",
                "Key Derivation Functions",
                "Constant-time 구현",
                "Assembly 최적화",
                "Side-channel 공격 방어",
                "FIPS 140-2 준수"
            ]
        },
        {
            id: 35,
            category: 'projects',
            title: "Real-time Data Processor (Rust)",
            description: "실시간 데이터 처리 엔진",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["Rust", "Stream Processing", "Async", "Performance"],
            detailItems: [
                "Stream Processing Engine",
                "Event-driven 아키텍처",
                "Async Pipeline 구현",
                "Backpressure 처리",
                "Windowing Functions",
                "Aggregation 연산",
                "State Management",
                "Fault Tolerance",
                "Metrics Collection",
                "Integration Tests"
            ]
        }
    ]

    const categories = [
        { id: 'all', label: '전체', icon: <Monitor className="h-4 w-4" /> },
        { id: 'telecom', label: '통신/VoIP', icon: <Phone className="h-4 w-4" /> },
        { id: 'core', label: 'C/C++/Rust', icon: <Code className="h-4 w-4" /> },
        { id: 'legacy', label: '기간계 연동', icon: <Database className="h-4 w-4" /> },
        { id: 'security', label: '보안/암호화', icon: <Shield className="h-4 w-4" /> },
        { id: 'performance', label: '성능 최적화', icon: <Zap className="h-4 w-4" /> },
        { id: 'projects', label: '미니 프로젝트', icon: <Cpu className="h-4 w-4" /> }
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
        ? coreStudyItems
        : coreStudyItems.filter(item => item.category === selectedCategory)

    const highPriority = filteredItems.filter(item => item.priority === 'High')
    const mediumPriority = filteredItems.filter(item => item.priority === 'Medium')
    const lowPriority = filteredItems.filter(item => item.priority === 'Low')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">📞 콜센터 코어 시스템 종합 스터디</h1>
                <p className="text-xl text-gray-600">VoIP/CTI/기간계 연동부터 C/C++/Rust 시스템 프로그래밍까지</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 35개 학습 영역
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 12-18개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        350+ 핵심 기술
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
                    <div className="text-2xl font-bold text-gray-600">500+</div>
                    <div className="text-sm text-gray-600">총 학습일</div>
                </div>
            </div>

            {/* High Priority Section */}
            {highPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                        <Star className="h-6 w-6" />
                        <span>High Priority (핵심 필수) - {highPriority.length}개</span>
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
                                            <h4 className="font-semibold mb-3 text-gray-800">🔧 핵심 학습 항목</h4>
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
                                            <h4 className="font-semibold mb-3 text-gray-800">🔧 핵심 학습 항목</h4>
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
                    <h2 className="text-2xl font-bold text-green-600">Low Priority (전문 심화) - {lowPriority.length}개</h2>
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
                                            <h4 className="font-semibold mb-3 text-gray-800">🔧 핵심 학습 항목</h4>
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

            {/* Core Technology Architecture */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🏗️ 콜센터 코어 시스템 아키텍처</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">통신 계층</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• SIP/RTP 프로토콜 스택</li>
                                <li>• WebRTC 실시간 통신</li>
                                <li>• CTI 시스템 통합</li>
                                <li>• SS7/PSTN 연동</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">코어 시스템</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• C/C++/Rust 네이티브 성능</li>
                                <li>• 실시간 오디오/비디오 처리</li>
                                <li>• 고성능 메모리 관리</li>
                                <li>• 병렬/동시성 처리</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">기간계 연동</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• ESB 메시지 라우팅</li>
                                <li>• 레거시 시스템 어댑터</li>
                                <li>• 데이터베이스 연동</li>
                                <li>• 프로토콜 변환 게이트웨이</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Development Roadmap */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">🗺️ 학습 로드맵 (2025)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">C/C++ 시스템 프로그래밍 기초</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">네트워크 프로그래밍 및 프로토콜</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">VoIP/SIP 시스템 구축</span>
                            <span className="text-sm text-gray-500">(3-4개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">WebRTC 및 화상 시스템</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">Rust 및 고성능 최적화</span>
                            <span className="text-sm text-gray-500">(2-3개월)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">기간계 연동 및 통합 프로젝트</span>
                            <span className="text-sm text-gray-500">(1-2개월)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Mini Projects Showcase */}
            <Card className="border-2 border-green-200">
                <CardHeader className="bg-green-50">
                    <CardTitle className="text-xl text-green-900">🛠️ 실습 프로젝트 하이라이트</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">기초 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Mini SIP Server (C++)</li>
                                <li>• WebRTC Signaling Server (Rust)</li>
                                <li>• Audio Codec Library (C)</li>
                                <li>• Network Monitor Tool (Rust)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-green-800">고급 프로젝트</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Message Queue Broker (C++)</li>
                                <li>• CTI Simulator (C++)</li>
                                <li>• Crypto Library (C)</li>
                                <li>• Real-time Data Processor (Rust)</li>
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
                            <span className="text-sm text-gray-500">0/35 완료 (총 350+ 핵심 기술)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            콜센터 코어 시스템 마스터 여정을 시작하여 통신 전문가가 되어보세요! 📞
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForCallCenterCore