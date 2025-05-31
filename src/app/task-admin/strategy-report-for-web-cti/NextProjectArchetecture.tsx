import React from 'react';

const NextGenerationArchitecture = () => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <svg viewBox="0 0 1400 1000" className="w-full h-auto border rounded-lg shadow-lg bg-white">
        <defs>
          {/* Gradients */}
          <linearGradient id="electronGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#47848f", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#2c5f6a", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="nestjsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#e10098", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#b7007a", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#6DB33F", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#4a7c32", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="goGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00ADD8", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#007d9c", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="redisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#DC382D", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#a82920", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#336791", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#254670", stopOpacity: 1 }} />
          </linearGradient>

          {/* Shadow Filter */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.2" />
          </filter>

          {/* Arrow Markers */}
          <marker id="grpcArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
          </marker>

          <marker id="graphqlArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e10098" />
          </marker>

          <marker id="redisArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#DC382D" />
          </marker>

          <marker id="sseArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="1400" height="1000" fill="#f8fafc" />

        {/* Title */}
        <text x="700" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1e293b">
          차세대 프로젝트 아키텍처
        </text>
        <text x="700" y="65" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill="#64748b">
          Next Generation Project Architecture
        </text>

        {/* Client Layer */}
        <rect x="500" y="100" width="400" height="120" fill="url(#electronGrad)" stroke="#47848f" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="700" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          Client (Electron + Next.js)
        </text>
        <text x="700" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#e2e8f0">
          Desktop Application with Modern Web Technologies
        </text>
        <text x="700" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          GraphQL over HTTP/WebSocket
        </text>
        <text x="700" y="200" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          Real-time UI Updates & Chat Interface
        </text>

        {/* API Gateway */}
        <rect x="450" y="270" width="500" height="120" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="700" y="305" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          API Gateway (NestJS GraphQL Server)
        </text>
        <text x="700" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fce7f3">
          GraphQL Federation • gRPC Client • SSE/WebSocket Relay
        </text>
        <text x="700" y="350" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          Authentication • Rate Limiting • Request Routing
        </text>
        <text x="700" y="370" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          Real-time Event Broadcasting (SSE/WebSocket)
        </text>

        {/* Protocol Labels */}
        <rect x="580" y="240" width="80" height="20" fill="#e10098" rx="10" />
        <text x="620" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">GraphQL</text>

        <rect x="680" y="240" width="80" height="20" fill="#f59e0b" rx="10" />
        <text x="720" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">WebSocket</text>

        {/* Microservices Layer */}
        <text x="700" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          Microservices Layer (gRPC Communication)
        </text>

        {/* User Service */}
        <rect x="100" y="480" width="200" height="140" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="200" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          User Service
        </text>
        <text x="200" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fce7f3">
          NestJS
        </text>
        <text x="200" y="555" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 사용자 인증/인가
        </text>
        <text x="200" y="570" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 프로필 관리
        </text>
        <text x="200" y="585" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 권한 관리
        </text>
        <text x="200" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 조직 구조
        </text>

        {/* Message Service */}
        <rect x="350" y="480" width="200" height="140" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="450" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Message Service
        </text>
        <text x="450" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="450" y="555" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 채팅 메시지
        </text>
        <text x="450" y="570" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 메시지 히스토리
        </text>
        <text x="450" y="585" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 파일 첨부
        </text>
        <text x="450" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 메시지 검색
        </text>

        {/* Call Service */}
        <rect x="600" y="480" width="200" height="140" fill="url(#goGrad)" stroke="#00ADD8" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="700" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Call Service
        </text>
        <text x="700" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#cffafe">
          Go
        </text>
        <text x="700" y="555" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • VoIP 통화 관리
        </text>
        <text x="700" y="570" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 라우팅
        </text>
        <text x="700" y="585" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 고성능 미디어 처리
        </text>
        <text x="700" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • WebRTC 지원
        </text>

        {/* Notification Service */}
        <rect x="850" y="480" width="200" height="140" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="950" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Notification Service
        </text>
        <text x="950" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="950" y="555" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 알림
        </text>
        <text x="950" y="570" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 푸시 알림
        </text>
        <text x="950" y="585" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 이메일/SMS
        </text>
        <text x="950" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 알림 설정 관리
        </text>

        {/* Protocol Labels for gRPC */}
        <rect x="150" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="170" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="400" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="420" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="650" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="670" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="900" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="920" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        {/* Redis Pub/Sub */}
        <rect x="1100" y="480" width="220" height="140" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1210" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Redis Pub/Sub
        </text>
        <text x="1210" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fecaca">
          Event Message Broker
        </text>
        <text x="1210" y="555" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 채팅 이벤트 전파
        </text>
        <text x="1210" y="570" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 상태 변경
        </text>
        <text x="1210" y="585" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 알림 큐
        </text>
        <text x="1210" y="600" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 세션 상태 동기화
        </text>

        {/* Real-time Data Flow Section */}
        <rect x="300" y="680" width="800" height="100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="15" filter="url(#shadow)" />
        <text x="700" y="710" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#92400e">
          Real-time Event Flow (SSE/WebSocket)
        </text>
        <text x="700" y="735" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#a16207">
          Chat Events • Call Status • Notifications → API Gateway → Client
        </text>
        <text x="700" y="755" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#a16207">
          Bidirectional real-time communication for instant updates
        </text>

        {/* Database Layer */}
        <text x="700" y="830" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          Persistent Storage Layer
        </text>

        <rect x="100" y="850" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="190" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          User DB
        </text>
        <text x="190" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="190" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#cbd5e1">
          사용자, 권한, 조직
        </text>

        <rect x="320" y="850" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="410" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          Message DB
        </text>
        <text x="410" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
          MongoDB
        </text>
        <text x="410" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#cbd5e1">
          채팅, 메시지, 히스토리
        </text>

        <rect x="540" y="850" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="630" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          Call DB
        </text>
        <text x="630" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="630" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#cbd5e1">
          통화기록, CDR
        </text>

        <rect x="760" y="850" width="180" height="100" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="850" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          Cache & Session
        </text>
        <text x="850" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fecaca">
          Redis
        </text>
        <text x="850" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#fecaca">
          세션, 캐시, 상태
        </text>

        <rect x="980" y="850" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1070" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          Analytics DB
        </text>
        <text x="1070" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#e2e8f0">
          ClickHouse
        </text>
        <text x="1070" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="#cbd5e1">
          로그, 분석, 통계
        </text>

        {/* Arrows and Connections */}

        {/* Client to Gateway */}
        <path d="M 700 220 L 700 270" stroke="#e10098" strokeWidth="3" fill="none" markerEnd="url(#graphqlArrow)" />

        {/* Gateway to Services */}
        <path d="M 500 390 L 250 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 580 390 L 420 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 700 390 L 700 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 820 390 L 900 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />

        {/* Services to Redis */}
        <path d="M 800 550 L 1100 550" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 550 550 L 1100 570" stroke="#DC382D" strokeWidth="1.5" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1050 550 L 1100 550" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />

        {/* Redis to Gateway (SSE) */}
        <path d="M 1100 520 Q 1000 450 950 350" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#sseArrow)" strokeDasharray="5,5" />

        {/* Gateway to Client (SSE) */}
        <path d="M 750 270 Q 850 200 750 220" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#sseArrow)" strokeDasharray="5,5" />

        {/* Services to Databases */}
        <path d="M 200 620 L 190 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 450 620 L 410 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 700 620 L 630 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 950 620 L 1070 850" stroke="#336791" strokeWidth="1.5" fill="none" />

        {/* Cache connections */}
        <path d="M 700 620 L 850 850" stroke="#DC382D" strokeWidth="1.5" fill="none" />
        <path d="M 950 620 L 850 850" stroke="#DC382D" strokeWidth="1.5" fill="none" />

        {/* Legend */}
        <rect x="50" y="20" width="300" height="60" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="5" />
        <text x="60" y="40" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#475569">Legend:</text>
        <line x1="60" y1="50" x2="80" y2="50" stroke="#10b981" strokeWidth="2" markerEnd="url(#grpcArrow)" />
        <text x="85" y="55" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">gRPC</text>
        <line x1="60" y1="65" x2="80" y2="65" stroke="#e10098" strokeWidth="2" markerEnd="url(#graphqlArrow)" />
        <text x="85" y="70" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">GraphQL</text>
        <line x1="160" y1="50" x2="180" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#sseArrow)" />
        <text x="185" y="55" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">SSE/WebSocket</text>
        <line x1="160" y1="65" x2="180" y2="65" stroke="#DC382D" strokeWidth="2" markerEnd="url(#redisArrow)" />
        <text x="185" y="70" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">Redis Pub/Sub</text>
      </svg>
    </div>
  );
};

export default NextGenerationArchitecture;