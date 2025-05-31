import React from 'react';

const CTIArchitecture = () => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <svg viewBox="0 0 1800 1400" className="w-full h-auto border rounded-lg shadow-lg bg-white">
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

          <linearGradient id="redisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#DC382D", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#a82920", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#336791", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#254670", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="externalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id="websocketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
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

          <marker id="websocketArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
          </marker>

          <marker id="sipArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="1800" height="1400" fill="#f8fafc" />

        {/* Title */}
        <text x="900" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1e293b">
          CTI 시스템 아키텍처 (Spring Boot 기반)
        </text>
        <text x="900" y="65" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill="#64748b">
          Computer Telephony Integration - Real-time WebSocket & Redis Pub/Sub
        </text>

        {/* Client Layer */}
        <rect x="700" y="100" width="400" height="120" fill="url(#electronGrad)" stroke="#47848f" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="900" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          상담원 데스크톱 (Electron + Next.js)
        </text>
        <text x="900" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#e2e8f0">
          Agent Desktop with Real-time Updates
        </text>
        <text x="900" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          GraphQL over HTTP • WebSocket Real-time • CTI Controls
        </text>
        <text x="900" y="200" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          통화 제어 • 채팅 인터페이스 • 조직 정보 실시간 업데이트
        </text>

        {/* API Gateway */}
        <rect x="650" y="270" width="500" height="120" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="900" y="305" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          API Gateway (NestJS GraphQL Server)
        </text>
        <text x="900" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fce7f3">
          GraphQL Federation • gRPC Client • WebSocket Server
        </text>
        <text x="900" y="350" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          인증/권한 • 요청 라우팅 • Redis Pub/Sub 구독
        </text>
        <text x="900" y="370" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          실시간 이벤트 중계 • WebSocket 브로드캐스팅
        </text>

        {/* Protocol Labels */}
        <rect x="760" y="240" width="80" height="20" fill="#e10098" rx="10" />
        <text x="800" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">GraphQL</text>

        <rect x="860" y="240" width="80" height="20" fill="#f59e0b" rx="10" />
        <text x="900" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">WebSocket</text>

        {/* Microservices Layer */}
        <text x="900" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          Spring Boot 마이크로서비스 계층 (gRPC + Redis Pub/Sub)
        </text>

        {/* Row 1 Services */}
        {/* Organization Service */}
        <rect x="50" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="150" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Organization Service
        </text>
        <text x="150" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="150" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 센터/테넌트 관리
        </text>
        <text x="150" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 그룹/팀 관리
        </text>
        <text x="150" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 상담원/스킬 관리
        </text>
        <text x="150" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 계층구조 변경시
        </text>
        <text x="150" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* Auth Service */}
        <rect x="270" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="370" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Auth Service
        </text>
        <text x="370" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="370" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 사용자 인증/권한
        </text>
        <text x="370" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • SSO/OAuth 연동
        </text>
        <text x="370" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • JWT 토큰 관리
        </text>
        <text x="370" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 권한 변경시
        </text>
        <text x="370" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* CTI Service */}
        <rect x="490" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="590" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          CTI Service
        </text>
        <text x="590" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="590" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • PBX/SIP 연동
        </text>
        <text x="590" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 전화기 제어
        </text>
        <text x="590" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 콜 상태 관리
        </text>
        <text x="590" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 이벤트
        </text>
        <text x="590" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* Call Management Service */}
        <rect x="710" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="810" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Call Management
        </text>
        <text x="810" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="810" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • ACD (자동 배분)
        </text>
        <text x="810" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 큐 관리
        </text>
        <text x="810" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 녹음/모니터링
        </text>
        <text x="810" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 라우팅 변경시
        </text>
        <text x="810" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* Row 2 Services */}
        {/* Messenger Service */}
        <rect x="930" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1030" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Messenger Service
        </text>
        <text x="1030" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot + WebSocket
        </text>
        <text x="1030" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 채팅/메신저 관리
        </text>
        <text x="1030" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 메시지 전송
        </text>
        <text x="1030" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 파일 첨부/다운로드
        </text>
        <text x="1030" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 채팅 이벤트
        </text>
        <text x="1030" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* Notification Service */}
        <rect x="1150" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1250" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Notification Service
        </text>
        <text x="1250" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="1250" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 알림/이메일/SMS
        </text>
        <text x="1250" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 팝업 알림 관리
        </text>
        <text x="1250" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 알림 템플릿 관리
        </text>
        <text x="1250" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 알림
        </text>
        <text x="1250" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          Redis Pub/Sub 발행
        </text>

        {/* Event Processing Service */}
        <rect x="1370" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1470" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Event Processing
        </text>
        <text x="1470" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="1470" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 복잡한 이벤트 처리
        </text>
        <text x="1470" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 이벤트 필터링/변환
        </text>
        <text x="1470" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 워크플로우 처리
        </text>
        <text x="1470" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • Redis Pub/Sub 구독
        </text>
        <text x="1470" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • API Gateway 통지
        </text>

        {/* Reporting Service */}
        <rect x="1590" y="480" width="200" height="160" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1690" y="515" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Reporting Service
        </text>
        <text x="1690" y="535" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="1690" y="560" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통계/리포트 생성
        </text>
        <text x="1690" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • KPI 모니터링
        </text>
        <text x="1690" y="590" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 대시보드 데이터
        </text>
        <text x="1690" y="605" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 통계 갱신
        </text>
        <text x="1690" y="620" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 성과 분석
        </text>

        {/* Protocol Labels for gRPC */}
        <rect x="100" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="120" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="320" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="340" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="540" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="560" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="760" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="780" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="980" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1000" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1200" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1220" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1420" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1440" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1640" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1660" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        {/* External Systems */}
        <rect x="300" y="700" width="250" height="100" fill="url(#externalGrad)" stroke="#8b5cf6" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="425" y="730" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          외부 전화 시스템 (PBX)
        </text>
        <text x="425" y="750" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#ede9fe">
          SIP Server / PBX / PSTN Gateway
        </text>
        <text x="425" y="770" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 전화 라우팅 • 외부 통화 연결 • 통화 품질 관리
        </text>
        <text x="425" y="785" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • SIP 프로토콜 • CTI 이벤트 수신
        </text>

        {/* Redis Pub/Sub Infrastructure */}
        <text x="900" y="870" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          Redis Pub/Sub 인프라스트럭처 (실시간 이벤트 브로커)
        </text>

        <rect x="600" y="890" width="600" height="140" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="900" y="925" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white">
          Redis Cluster (Pub/Sub Channels)
        </text>
        <text x="900" y="945" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fecaca">
          Real-time Event Distribution & Caching
        </text>

        {/* Redis Channels */}
        <text x="650" y="970" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">채널 구성:</text>
        <text x="650" y="985" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• org:update - 조직구조 변경</text>
        <text x="650" y="1000" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• agent:status - 상담원 상태</text>
        <text x="650" y="1015" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• call:event - 통화 이벤트</text>

        <text x="950" y="970" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="white">실시간 기능:</text>
        <text x="950" y="985" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• chat:message - 채팅 메시지</text>
        <text x="950" y="1000" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• notification:alert - 알림</text>
        <text x="950" y="1015" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">• system:broadcast - 시스템 공지</text>

        {/* WebSocket Real-time Flow */}
        <rect x="100" y="1080" width="1600" height="100" fill="url(#websocketGrad)" stroke="#f59e0b" strokeWidth="2" rx="15" filter="url(#shadow)" />
        <text x="900" y="1110" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white">
          실시간 WebSocket 플로우
        </text>
        <text x="900" y="1130" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fef3c7">
          Services → Redis Pub/Sub → Event Processing → API Gateway → WebSocket → Client
        </text>
        <text x="900" y="1150" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fef3c7">
          조직 변경, 통화 상태, 채팅 메시지, 알림 등 모든 이벤트가 실시간으로 클라이언트에 전달
        </text>
        <text x="900" y="1170" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#fef3c7">
          센터 &gt; 테넌트 &gt; 그룹 &gt; 팀 &gt; 상담원 &gt; 스킬 구조 변경시 즉시 반영
        </text>

        {/* Database Layer */}
        <text x="900" y="1230" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          데이터 저장소 계층
        </text>

        <rect x="50" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="140" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Organization DB
        </text>
        <text x="140" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="140" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          센터/테넌트/그룹/팀
        </text>
        <text x="140" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          상담원/스킬/권한
        </text>

        <rect x="250" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="340" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Auth DB
        </text>
        <text x="340" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="340" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          사용자/토큰/세션
        </text>
        <text x="340" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          권한/보안정책
        </text>

        <rect x="450" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="540" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          CTI DB
        </text>
        <text x="540" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="540" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          CTI설정/전화기
        </text>
        <text x="540" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          디바이스상태
        </text>

        <rect x="650" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="740" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Call DB
        </text>
        <text x="740" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="740" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          통화기록/CDR
        </text>
        <text x="740" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          큐설정/ACD
        </text>

        <rect x="850" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="940" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Message DB
        </text>
        <text x="940" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          MongoDB
        </text>
        <text x="940" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          채팅메시지/히스토리
        </text>
        <text x="940" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          파일첨부/대화방
        </text>

        <rect x="1050" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1140" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Notification DB
        </text>
        <text x="1140" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="1140" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          알림로그/템플릿
        </text>
        <text x="1140" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          구독설정
        </text>

        <rect x="1250" y="1250" width="180" height="100" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1340" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Cache & Session
        </text>
        <text x="1340" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">
          Redis
        </text>
        <text x="1340" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#fecaca">
          세션/캐시
        </text>
        <text x="1340" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#fecaca">
          상담원상태
        </text>

        <rect x="1450" y="1250" width="180" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1540" y="1280" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Analytics DB
        </text>
        <text x="1540" y="1300" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          ClickHouse
        </text>
        <text x="1540" y="1320" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          이벤트로그/통계
        </text>
        <text x="1540" y="1335" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          리포트데이터
        </text>

        {/* Arrows and Connections */}

        {/* Client to Gateway */}
        <path d="M 900 220 L 900 270" stroke="#e10098" strokeWidth="3" fill="none" markerEnd="url(#graphqlArrow)" />

        {/* Gateway to Services */}
        <path d="M 700 390 L 200 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 750 390 L 350 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 800 390 L 570 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 850 390 L 790 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 900 390 L 1010 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 950 390 L 1230 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 1000 390 L 1450 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 1050 390 L 1670 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />

        {/* CTI to PBX */}
        <path d="M 590 640 L 450 700" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#sipArrow)" />
        <rect x="500" y="655" width="50" height="18" fill="#8b5cf6" rx="9" />
        <text x="525" y="667" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">SIP/API</text>

        {/* Services to Redis Pub/Sub */}
        <path d="M 150 640 L 650 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 370 640 L 720 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 590 640 L 800 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 810 640 L 880 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1030 640 L 950 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1250 640 L 1050 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1690 640 L 1150 890" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />

        {/* Event Processing subscribes from Redis */}
        <path d="M 1200 950 L 1450 640" stroke="#DC382D" strokeWidth="3" fill="none" markerEnd="url(#redisArrow)" strokeDasharray="5,5" />

        {/* Event Processing to Gateway (WebSocket) */}
        <path d="M 1370 520 Q 1200 400 1050 350" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#websocketArrow)" strokeDasharray="5,5" />

        {/* Gateway to Client (WebSocket) */}
        <path d="M 950 270 Q 1050 200 950 220" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#websocketArrow)" strokeDasharray="5,5" />

        {/* Services to Databases */}
        <path d="M 150 640 L 140 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 370 640 L 340 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 590 640 L 540 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 810 640 L 740 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 1030 640 L 940 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 1250 640 L 1140 1250" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 1690 640 L 1540 1250" stroke="#336791" strokeWidth="2" fill="none" />

        {/* Cache connections */}
        <path d="M 370 640 L 1340 1250" stroke="#DC382D" strokeWidth="1.5" fill="none" />
        <path d="M 810 640 L 1340 1250" stroke="#DC382D" strokeWidth="1.5" fill="none" />
        <path d="M 1250 640 L 1340 1250" stroke="#DC382D" strokeWidth="1.5" fill="none" />

        {/* Redis Pub/Sub Connection Labels */}
        <rect x="300" y="800" width="100" height="18" fill="#DC382D" rx="9" />
        <text x="350" y="812" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">Redis Pub/Sub</text>

        <rect x="1300" y="800" width="100" height="18" fill="#DC382D" rx="9" />
        <text x="1350" y="812" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">Redis Subscribe</text>

        <rect x="1200" y="300" width="80" height="18" fill="#f59e0b" rx="9" />
        <text x="1240" y="312" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">WebSocket</text>
      </svg>
    </div>
  );
};

export default CTIArchitecture;