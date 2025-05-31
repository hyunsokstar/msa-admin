import React from 'react';

const CTIArchitecture = () => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <svg viewBox="0 0 1600 1200" className="w-full h-auto border rounded-lg shadow-lg bg-white">
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

          <linearGradient id="ctiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
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

          <marker id="sipArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="1600" height="1200" fill="#f8fafc" />

        {/* Title */}
        <text x="800" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#1e293b">
          CTI 시스템 아키텍처
        </text>
        <text x="800" y="65" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fill="#64748b">
          Computer Telephony Integration System Architecture
        </text>

        {/* Client Layer */}
        <rect x="600" y="100" width="400" height="120" fill="url(#electronGrad)" stroke="#47848f" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="800" y="135" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          상담원 데스크톱 (Electron + Next.js)
        </text>
        <text x="800" y="160" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#e2e8f0">
          Agent Desktop Application with Real-time UI
        </text>
        <text x="800" y="180" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          GraphQL over HTTP/WebSocket • CTI Controls
        </text>
        <text x="800" y="200" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#cbd5e1">
          Call Control • Chat Interface • Real-time Monitoring
        </text>

        {/* API Gateway */}
        <rect x="550" y="270" width="500" height="120" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="3" rx="15" filter="url(#shadow)" />
        <text x="800" y="305" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" fill="white">
          API Gateway (NestJS GraphQL Server)
        </text>
        <text x="800" y="330" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fce7f3">
          GraphQL Federation • gRPC Client • SSE/WebSocket Relay
        </text>
        <text x="800" y="350" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          Authentication • Authorization • Request Routing
        </text>
        <text x="800" y="370" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          Real-time Event Broadcasting • Load Balancing
        </text>

        {/* Protocol Labels */}
        <rect x="680" y="240" width="80" height="20" fill="#e10098" rx="10" />
        <text x="720" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">GraphQL</text>

        <rect x="780" y="240" width="80" height="20" fill="#f59e0b" rx="10" />
        <text x="820" y="253" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white">WebSocket</text>

        {/* Microservices Layer */}
        <text x="800" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          CTI Microservices Layer (gRPC Communication)
        </text>

        {/* Organization Service */}
        <rect x="50" y="480" width="180" height="140" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="140" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Organization Service
        </text>
        <text x="140" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#fce7f3">
          NestJS
        </text>
        <text x="140" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 센터/테넌트 관리
        </text>
        <text x="140" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 그룹/팀/상담원
        </text>
        <text x="140" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 스킬/권한 관리
        </text>
        <text x="140" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 계층 구조
        </text>
        <text x="140" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 조직 변경 이벤트
        </text>

        {/* Auth Service */}
        <rect x="250" y="480" width="180" height="140" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="340" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Auth Service
        </text>
        <text x="340" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="340" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 사용자 인증/권한
        </text>
        <text x="340" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • SSO/OAuth 연동
        </text>
        <text x="340" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 토큰 관리
        </text>
        <text x="340" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 보안 정책
        </text>
        <text x="340" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 세션 관리
        </text>

        {/* CTI Service */}
        <rect x="450" y="480" width="180" height="140" fill="url(#ctiGrad)" stroke="#f59e0b" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="540" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          CTI Service
        </text>
        <text x="540" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#fef3c7">
          Go
        </text>
        <text x="540" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • CTI 연동 (PBX/SIP)
        </text>
        <text x="540" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 전화기 제어
        </text>
        <text x="540" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 콜 상태 관리
        </text>
        <text x="540" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • WebRTC 지원
        </text>
        <text x="540" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 통화 라우팅
        </text>

        {/* Call Management Service */}
        <rect x="650" y="480" width="180" height="140" fill="url(#goGrad)" stroke="#00ADD8" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="740" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Call Management
        </text>
        <text x="740" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#cffafe">
          Go
        </text>
        <text x="740" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • ACD (자동 배분)
        </text>
        <text x="740" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 큐 관리
        </text>
        <text x="740" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 통화 녹음
        </text>
        <text x="740" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 통화 모니터링
        </text>
        <text x="740" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 통화 이력
        </text>

        {/* Messenger Service */}
        <rect x="850" y="480" width="180" height="140" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="940" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Messenger Service
        </text>
        <text x="940" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="940" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 채팅/메신저 관리
        </text>
        <text x="940" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 대화 이력
        </text>
        <text x="940" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 파일 첨부
        </text>
        <text x="940" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 실시간 메시징
        </text>
        <text x="940" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 메시지 검색
        </text>

        {/* Notification Service */}
        <rect x="1050" y="480" width="180" height="140" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1140" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Notification Service
        </text>
        <text x="1140" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#fce7f3">
          NestJS
        </text>
        <text x="1140" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 알림/이메일/SMS
        </text>
        <text x="1140" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 알림 발송/로그
        </text>
        <text x="1140" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 구독 관리
        </text>
        <text x="1140" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 템플릿 관리
        </text>
        <text x="1140" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 실시간 알림
        </text>

        {/* Event Service */}
        <rect x="1250" y="480" width="180" height="140" fill="url(#goGrad)" stroke="#00ADD8" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1340" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Event Service
        </text>
        <text x="1340" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#cffafe">
          Go
        </text>
        <text x="1340" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • Redis PubSub/SSE
        </text>
        <text x="1340" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • Kafka 이벤트 처리
        </text>
        <text x="1340" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 실시간 이벤트 중계
        </text>
        <text x="1340" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 이벤트 동기화
        </text>
        <text x="1340" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 이벤트 스트리밍
        </text>

        {/* Reporting Service */}
        <rect x="1450" y="480" width="180" height="140" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="1540" y="510" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="white">
          Reporting Service
        </text>
        <text x="1540" y="530" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fill="#dcfce7">
          Spring Boot
        </text>
        <text x="1540" y="550" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 통계/리포트 생성
        </text>
        <text x="1540" y="565" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • KPI 모니터링
        </text>
        <text x="1540" y="580" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 대시보드 데이터
        </text>
        <text x="1540" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 성과 분석
        </text>
        <text x="1540" y="610" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fill="white">
          • 실시간 통계
        </text>

        {/* Protocol Labels for gRPC */}
        <rect x="90" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="110" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="290" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="310" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="490" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="510" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="690" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="710" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="890" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="910" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1090" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1110" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1290" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1310" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        <rect x="1490" y="450" width="40" height="18" fill="#10b981" rx="9" />
        <text x="1510" y="462" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">gRPC</text>

        {/* External PBX System */}
        <rect x="300" y="680" width="220" height="100" fill="url(#externalGrad)" stroke="#8b5cf6" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="410" y="710" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          외부 전화 시스템 (PBX)
        </text>
        <text x="410" y="730" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#ede9fe">
          SIP Server / PBX
        </text>
        <text x="410" y="750" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 전화 라우팅 • 외부 통화 연결
        </text>
        <text x="410" y="770" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 통화 품질 관리 • SIP 프로토콜
        </text>

        {/* Message Broker */}
        <rect x="600" y="680" width="400" height="100" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="2" rx="12" filter="url(#shadow)" />
        <text x="800" y="710" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          메시지 브로커 (Redis Pub/Sub + Kafka)
        </text>
        <text x="800" y="730" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#fecaca">
          Event Message Broker & Real-time Communication
        </text>
        <text x="800" y="750" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 실시간 이벤트 전달 • 서비스 간 통신 • 이벤트 스트리밍
        </text>
        <text x="800" y="770" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 메시지 큐 • 통화/채팅 이벤트 • 상태 동기화
        </text>

        {/* Real-time Data Flow Section */}
        <rect x="1050" y="680" width="500" height="100" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" rx="15" filter="url(#shadow)" />
        <text x="1300" y="710" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#92400e">
          실시간 이벤트 플로우 (SSE/WebSocket)
        </text>
        <text x="1300" y="730" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="#a16207">
          통화 이벤트 • 채팅 이벤트 • 상담원 상태 변경
        </text>
        <text x="1300" y="750" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#a16207">
          API Gateway → Client 양방향 실시간 통신
        </text>
        <text x="1300" y="770" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#a16207">
          즉시 업데이트 • 실시간 모니터링 • 이벤트 동기화
        </text>

        {/* Database Layer */}
        <text x="800" y="830" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#475569">
          데이터 저장소 계층
        </text>

        <rect x="50" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="125" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Organization DB
        </text>
        <text x="125" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="125" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          조직, 사용자, 권한
        </text>
        <text x="125" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          스킬, 팀, 그룹
        </text>

        <rect x="220" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="295" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Auth DB
        </text>
        <text x="295" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="295" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          인증, 토큰
        </text>
        <text x="295" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          세션, 보안정책
        </text>

        <rect x="390" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="465" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          CTI DB
        </text>
        <text x="465" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="465" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          CTI 설정, 전화기
        </text>
        <text x="465" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          디바이스 상태
        </text>

        <rect x="560" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="635" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Call DB
        </text>
        <text x="635" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="635" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          통화기록, CDR
        </text>
        <text x="635" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          큐, ACD 설정
        </text>

        <rect x="730" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="805" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Message DB
        </text>
        <text x="805" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          MongoDB
        </text>
        <text x="805" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          채팅, 메시지
        </text>
        <text x="805" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          대화 히스토리
        </text>

        <rect x="900" y="850" width="150" height="100" fill="url(#redisGrad)" stroke="#DC382D" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="975" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Cache & Session
        </text>
        <text x="975" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">
          Redis
        </text>
        <text x="975" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#fecaca">
          세션, 캐시
        </text>
        <text x="975" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#fecaca">
          상담원 상태
        </text>

        <rect x="1070" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1145" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Notification DB
        </text>
        <text x="1145" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          PostgreSQL
        </text>
        <text x="1145" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          알림 로그
        </text>
        <text x="1145" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          템플릿, 구독
        </text>

        <rect x="1240" y="850" width="150" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)" />
        <text x="1315" y="880" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" fill="white">
          Analytics DB
        </text>
        <text x="1315" y="900" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          ClickHouse
        </text>
        <text x="1315" y="920" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          로그, 분석
        </text>
        <text x="1315" y="935" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fill="#cbd5e1">
          통계, 리포트
        </text>

        {/* Arrows and Connections */}

        {/* Client to Gateway */}
        <path d="M 800 220 L 800 270" stroke="#e10098" strokeWidth="3" fill="none" markerEnd="url(#graphqlArrow)" />

        {/* Gateway to Services */}
        <path d="M 600 390 L 180 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 650 390 L 320 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 700 390 L 520 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 750 390 L 720 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 800 390 L 920 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 850 390 L 1120 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 900 390 L 1320 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />
        <path d="M 950 390 L 1520 480" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#grpcArrow)" />

        {/* CTI to PBX */}
        <path d="M 540 620 L 450 680" stroke="#8b5cf6" strokeWidth="3" fill="none" markerEnd="url(#sipArrow)" />
        <rect x="470" y="635" width="50" height="18" fill="#8b5cf6" rx="9" />
        <text x="495" y="647" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="bold" fill="white">SIP/API</text>

        {/* Services to Message Broker */}
        <path d="M 230 550 L 600 720" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 540 620 L 650 680" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 740 620 L 750 680" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 940 620 L 850 680" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1140 620 L 950 680" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />
        <path d="M 1340 620 L 1000 720" stroke="#DC382D" strokeWidth="2" fill="none" markerEnd="url(#redisArrow)" />

        {/* Message Broker to Gateway (SSE) */}
        <path d="M 800 680 Q 1000 600 950 350" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#sseArrow)" strokeDasharray="5,5" />

        {/* Gateway to Client (SSE) */}
        <path d="M 850 270 Q 950 200 850 220" stroke="#f59e0b" strokeWidth="3" fill="none" markerEnd="url(#sseArrow)" strokeDasharray="5,5" />

        {/* Services to Databases */}
        <path d="M 140 620 L 125 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 340 620 L 295 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 540 620 L 465 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 740 620 L 635 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 940 620 L 805 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 1140 620 L 1145 850" stroke="#336791" strokeWidth="2" fill="none" />
        <path d="M 1540 620 L 1315 850" stroke="#336791" strokeWidth="2" fill="none" />

        {/* Cache connections */}
        <path d="M 340 620 L 975 850" stroke="#DC382D" strokeWidth="1.5" fill="none" />
        <path d="M 740 620 L 975 850" stroke="#DC382D" strokeWidth="1.5" fill="none" />
        <path d="M 1140 620 L 975 850" stroke="#DC382D" strokeWidth="1.5" fill="none" />

        {/* Legend */}
        <rect x="50" y="980" width="400" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="5" />
        <text x="60" y="1000" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#475569">범례 (Legend):</text>
        <line x1="60" y1="1015" x2="80" y2="1015" stroke="#10b981" strokeWidth="2" markerEnd="url(#grpcArrow)" />
        <text x="85" y="1020" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">gRPC</text>
        <line x1="60" y1="1030" x2="80" y2="1030" stroke="#e10098" strokeWidth="2" markerEnd="url(#graphqlArrow)" />
        <text x="85" y="1035" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">GraphQL</text>
        <line x1="60" y1="1045" x2="80" y2="1045" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#sseArrow)" />
        <text x="85" y="1050" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">SSE/WebSocket</text>

        <line x1="160" y1="1015" x2="180" y2="1015" stroke="#DC382D" strokeWidth="2" markerEnd="url(#redisArrow)" />
        <text x="185" y="1020" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">Redis Pub/Sub</text>
        <line x1="160" y1="1030" x2="180" y2="1030" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#sipArrow)" />
        <text x="185" y="1035" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">SIP/API</text>
        <line x1="160" y1="1045" x2="180" y2="1045" stroke="#336791" strokeWidth="2" />
        <text x="185" y="1050" fontFamily="Arial, sans-serif" fontSize="10" fill="#475569">Database Connection</text>

        {/* Technology Stack */}
        <rect x="500" y="980" width="300" height="80" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" rx="5" />
        <text x="510" y="1000" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="#475569">기술 스택:</text>
        <rect x="510" y="1010" width="60" height="15" fill="#e10098" rx="7" />
        <text x="540" y="1020" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">NestJS</text>
        <rect x="580" y="1010" width="60" height="15" fill="#6DB33F" rx="7" />
        <text x="610" y="1020" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">Spring</text>
        <rect x="650" y="1010" width="40" height="15" fill="#00ADD8" rx="7" />
        <text x="670" y="1020" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">Go</text>
        <rect x="700" y="1010" width="60" height="15" fill="#f59e0b" rx="7" />
        <text x="730" y="1020" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">CTI</text>

        <rect x="510" y="1030" width="80" height="15" fill="#336791" rx="7" />
        <text x="550" y="1040" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">PostgreSQL</text>
        <rect x="600" y="1030" width="60" height="15" fill="#4ea94b" rx="7" />
        <text x="630" y="1040" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">MongoDB</text>
        <rect x="670" y="1030" width="40" height="15" fill="#DC382D" rx="7" />
        <text x="690" y="1040" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">Redis</text>
        <rect x="720" y="1030" width="70" height="15" fill="#8b5cf6" rx="7" />
        <text x="755" y="1040" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="bold" fill="white">ClickHouse</text>

        <text x="510" y="1055" fontFamily="Arial, sans-serif" fontSize="9" fill="#64748b">실시간 CTI • 높은 처리량 • 확장 가능한 마이크로서비스</text>
      </svg>
    </div>
  );
};

export default CTIArchitecture;