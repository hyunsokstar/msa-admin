// components/NextGenerationArchitectureWithRedisScaling2.tsx

"use client";

import React from "react";

const NextGenerationArchitectureWithRedisScaling2: React.FC = () => {
    return (
        <div className="w-full p-4 bg-gray-50 space-y-8">
            <svg
                viewBox="0 0 1400 950"
                className="w-full h-auto border rounded-lg shadow-lg bg-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Gradients */}
                    <linearGradient id="electronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#47848f" stopOpacity="1" />
                        <stop offset="100%" stopColor="#2c5f6a" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="gatewayGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
                        <stop offset="100%" stopColor="#16a34a" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="blueServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#336791" stopOpacity="1" />
                        <stop offset="100%" stopColor="#254670" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="wsServiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fcd34d" stopOpacity="1" />
                        <stop offset="100%" stopColor="#fbbf24" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="redisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#DC382D" stopOpacity="1" />
                        <stop offset="100%" stopColor="#a82920" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="kafkaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D2691E" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8B4513" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="dbDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1f2937" stopOpacity="1" />
                        <stop offset="100%" stopColor="#111827" stopOpacity="1" />
                    </linearGradient>

                    {/* Shadow Filter */}
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
                    </filter>

                    {/* Arrow Markers */}
                    <marker id="grpcArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                    </marker>
                    <marker id="wsArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
                    </marker>
                    <marker id="redisArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#DC382D" />
                    </marker>
                    <marker id="kafkaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#8B4513" />
                    </marker>
                </defs>

                {/* Background */}
                <rect width="1400" height="950" fill="#f8fafc" />

                {/* Title */}
                <text
                    x="700"
                    y="40"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="28"
                    fontWeight="bold"
                    fill="#1e293b"
                >
                    차세대 프로젝트 아키텍처
                </text>

                {/* Client Layer (y=60) */}
                <rect
                    x="500"
                    y="60"
                    width="400"
                    height="120"
                    fill="url(#electronGrad)"
                    stroke="#47848f"
                    strokeWidth="3"
                    rx="15"
                    filter="url(#shadow)"
                />
                <text x="700" y="95" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
                    Client (Electron + Next.js)
                </text>
                <text x="700" y="120" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#e2e8f0">
                    Desktop Application with Modern Web Technologies
                </text>
                <text x="700" y="140" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    GraphQL over HTTP/WebSocket
                </text>
                <text x="700" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    Real-time Updates &amp; Chat Interface
                </text>

                {/* API Gateway (y=200) */}
                <rect
                    x="450"
                    y="200"
                    width="500"
                    height="100"
                    fill="url(#gatewayGreenGrad)"
                    stroke="#16a34a"
                    strokeWidth="3"
                    rx="15"
                    filter="url(#shadow)"
                />
                <text x="700" y="235" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
                    API Gateway (NestJS GraphQL/WS)
                </text>
                <text x="700" y="255" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
                    Authentication • Rate Limiting • Request Routing
                </text>
                <text x="700" y="275" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
                    GraphQL Federation • gRPC Client • WebSocket Subscribers
                </text>

                {/* Client ↔ API Gateway (WebSocket 양방향) */}
                <path
                    d="M 700 160 L 700 200"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#wsArrow)"
                />
                <path
                    d="M 710 200 L 710 160"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    fill="none"
                    markerEnd="url(#wsArrow)"
                />

                {/* Microservices Layer Title */}
                <text x="700" y="350" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
                    Microservices Layer (gRPC 통신)
                </text>

                {/* Auth Service (y=390) */}
                <rect
                    x="10"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#blueServiceGrad)"
                    stroke="#254670"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="110" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    Auth Service
                </text>
                <text x="110" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
                    NestJS
                </text>
                <text x="110" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • JWT 발급/검증
                </text>
                <text x="110" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • OAuth2/OIDC
                </text>
                <text x="110" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • SSO 통합
                </text>
                <text x="110" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 세션 관리
                </text>

                {/* Master Data Service (y=390) */}
                <rect
                    x="240"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#blueServiceGrad)"
                    stroke="#254670"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="340" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    Master Data Service
                </text>
                <text x="340" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
                    NestJS
                </text>
                <text x="340" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 센터 관리
                </text>
                <text x="340" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 테넌트 관리
                </text>
                <text x="340" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 그룹/팀 관리
                </text>
                <text x="340" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 상담원 관리
                </text>

                {/* User Service (y=390) */}
                <rect
                    x="470"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#blueServiceGrad)"
                    stroke="#254670"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="570" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    User Service
                </text>
                <text x="570" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
                    NestJS
                </text>
                <text x="570" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 프로필 관리
                </text>
                <text x="570" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 권한 관리
                </text>
                <text x="570" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 조직 구조
                </text>
                <text x="570" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 사용자 CRUD
                </text>

                {/* Chat Service (y=390) */}
                <rect
                    x="700"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#wsServiceGrad)"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="800" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1e1e1e">
                    Chat Service
                </text>
                <text x="800" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#1e1e1e">
                    Spring Boot
                </text>
                <text x="800" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • 채팅 메시지
                </text>
                <text x="800" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • 메시지 히스토리
                </text>
                <text x="800" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • 파일 첨부
                </text>
                <text x="800" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • 메시지 검색
                </text>

                {/* Call Service (y=390) */}
                <rect
                    x="930"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#wsServiceGrad)"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="1030" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1e1e1e">
                    Call Service
                </text>
                <text x="1030" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#1e1e1e">
                    C/C++ (WebRTC)
                </text>
                <text x="1030" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • VoIP/Media 관리
                </text>
                <text x="1030" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • WebSocket 시그널링
                </text>
                <text x="1030" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#1e1e1e">
                    • WebRTC Peer Connection
                </text>

                {/* Notification Service (y=390) */}
                <rect
                    x="1160"
                    y="390"
                    width="200"
                    height="120"
                    fill="url(#blueServiceGrad)"
                    stroke="#254670"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="1260" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    Notification Service
                </text>
                <text x="1260" y="440" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
                    Spring Boot
                </text>
                <text x="1260" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 실시간 알림
                </text>
                <text x="1260" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 푸시 알림
                </text>
                <text x="1260" y="490" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 이메일/SMS
                </text>
                <text x="1260" y="505" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    • 알림 설정 관리
                </text>

                {/* API Gateway → 각각 Microservices (gRPC, y:200 → y:390) */}
                <path
                    d="M 600 200 L 110 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />
                <path
                    d="M 650 200 L 340 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />
                <path
                    d="M 700 200 L 570 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />
                <path
                    d="M 750 200 L 800 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />
                <path
                    d="M 800 200 L 1030 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />
                <path
                    d="M 850 200 L 1260 390"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* Redis Pub/Sub (y=550) */}
                <rect
                    x="600"
                    y="550"
                    width="200"
                    height="100"
                    fill="url(#redisGrad)"
                    stroke="#DC382D"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="700" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    Redis Pub/Sub
                </text>
                <text x="700" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
                    (Spring Boot)
                </text>

                {/* Chat/Call/Notification → Redis Pub/Sub (y:390 → y:550) */}
                <path
                    d="M 800 390 L 650 550"
                    stroke="#DC382D"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#redisArrow)"
                />
                <path
                    d="M 1030 390 L 700 550"
                    stroke="#DC382D"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#redisArrow)"
                />
                <path
                    d="M 1260 390 L 750 550"
                    stroke="#DC382D"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#redisArrow)"
                />

                {/* API Gateway ↔ Redis Pub/Sub (y:200 → y:550) */}
                <path
                    d="M 700 300 L 700 550"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#wsArrow)"
                />
                <path
                    d="M 710 550 L 710 300"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#wsArrow)"
                />

                {/* Kafka Cluster (y=690) */}
                <rect
                    x="550"
                    y="690"
                    width="300"
                    height="100"
                    fill="url(#kafkaGrad)"
                    stroke="#8B4513"
                    strokeWidth="2"
                    rx="12"
                    filter="url(#shadow)"
                />
                <text x="700" y="720" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
                    Kafka Cluster
                </text>
                <text x="700" y="740" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#f0e6dc">
                    • 이벤트 스트림
                </text>
                <text x="700" y="755" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#f0e6dc">
                    • 토픽 분산/보존
                </text>
                <text x="700" y="770" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#f0e6dc">
                    • 재처리/리플레이
                </text>

                {/* Chat/Call/Notification → Kafka Cluster (y:390 → y:690) */}
                <path
                    d="M 800 390 L 650 690"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#kafkaArrow)"
                />
                <path
                    d="M 1030 390 L 750 690"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#kafkaArrow)"
                />
                <path
                    d="M 1260 390 L 850 690"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#kafkaArrow)"
                />

                {/* Kafka → Analytics DB (y:690 → y:830) */}
                <path
                    d="M 700 790 L 1370 830"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#kafkaArrow)"
                />

                {/* Persistent Storage Layer Title */}
                <text x="700" y="830" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
                    Persistent Storage Layer
                </text>

                {/* User DB (y=830) */}
                <rect
                    x="10"
                    y="830"
                    width="200"
                    height="90"
                    fill="url(#dbDarkGrad)"
                    stroke="#111827"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="110" y="855" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    User DB
                </text>
                <text x="110" y="875" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    PostgreSQL
                </text>
                <text x="110" y="895" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8">
                    사용자, 권한, 조직
                </text>

                {/* Master DB (y=830) */}
                <rect
                    x="240"
                    y="830"
                    width="200"
                    height="90"
                    fill="url(#dbDarkGrad)"
                    stroke="#111827"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="340" y="855" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    Master DB
                </text>
                <text x="340" y="875" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    PostgreSQL
                </text>
                <text x="340" y="895" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8">
                    마스터 데이터
                </text>

                {/* Message DB (y=830) */}
                <rect
                    x="470"
                    y="830"
                    width="200"
                    height="90"
                    fill="url(#dbDarkGrad)"
                    stroke="#111827"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="570" y="855" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    Message DB
                </text>
                <text x="570" y="875" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    MongoDB
                </text>
                <text x="570" y="895" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8">
                    채팅, 메시지, 히스토리
                </text>

                {/* Call DB (y=830) */}
                <rect
                    x="700"
                    y="830"
                    width="200"
                    height="90"
                    fill="url(#dbDarkGrad)"
                    stroke="#111827"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="800" y="855" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    Call DB
                </text>
                <text x="800" y="875" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    PostgreSQL
                </text>
                <text x="800" y="895" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8">
                    통화기록, CDR
                </text>

                {/* Cache & Session (y=830) */}
                <rect
                    x="930"
                    y="830"
                    width="200"
                    height="90"
                    fill="url(#redisGrad)"
                    stroke="#DC382D"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="1030" y="855" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    Cache &amp; Session
                </text>
                <text x="1030" y="875" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fecaca">
                    Redis
                </text>
                <text x="1030" y="895" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#fecaca">
                    세션, 캐시, 상태
                </text>

                {/* Analytics DB (y=830) */}
                <rect
                    x="1160"
                    y="830"
                    width="280"
                    height="90"
                    fill="url(#dbDarkGrad)"
                    stroke="#111827"
                    strokeWidth="2"
                    rx="10"
                    filter="url(#shadow)"
                />
                <text x="1370" y="855" textAnchor="end" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
                    Analytics DB
                </text>
                <text x="1370" y="875" textAnchor="end" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
                    ClickHouse
                </text>
                <text x="1370" y="895" textAnchor="end" fontFamily="Arial, sans-serif" fontSize="10" fill="#94a3b8">
                    로그, 분석, 통계
                </text>

                {/* Auth → User DB (y:390 → y:830) */}
                <path
                    d="M 110 500 L 110 830"
                    stroke="#1f2937"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* Master Data → Master DB (y:390 → y:830) */}
                <path
                    d="M 340 500 L 340 830"
                    stroke="#1f2937"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* User → Message DB (y:390 → y:830) */}
                <path
                    d="M 570 500 L 570 830"
                    stroke="#1f2937"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* Chat → Message DB (y:390 → y:830) */}
                <path
                    d="M 800 500 L 570 830"
                    stroke="#1f2937"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* Call → Call DB (y:390 → y:830) */}
                <path
                    d="M 1030 500 L 800 830"
                    stroke="#1f2937"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#grpcArrow)"
                />

                {/* Redis Pub/Sub → Cache & Session (y:550 → y:830) */}
                <path
                    d="M 700 650 L 1030 830"
                    stroke="#DC382D"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#redisArrow)"
                />

                {/* Kafka Cluster → Analytics DB (y:690 → y:830) */}
                <path
                    d="M 700 790 L 1370 830"
                    stroke="#8B4513"
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#kafkaArrow)"
                />
            </svg>
        </div>
    );
};

export default NextGenerationArchitectureWithRedisScaling2;
