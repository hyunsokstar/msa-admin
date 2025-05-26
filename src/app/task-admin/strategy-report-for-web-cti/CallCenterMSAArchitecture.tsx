import React from 'react';

const CallCenterMSAArchitecture = () => {
  return (
    <div className="w-full p-4">
      <svg viewBox="0 0 1200 800" className="w-full h-auto border rounded-lg shadow-lg bg-white">
        <defs>
          <linearGradient id="nestjsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#e10098", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#b7007a", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="springGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#6DB33F", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#4a7c32", stopOpacity:1}} />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor:"#336791", stopOpacity:1}} />
            <stop offset="100%" style={{stopColor:"#254670", stopOpacity:1}} />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="3" dy="3" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
           refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
          </marker>
        </defs>
        
        {/* Background */}
        <rect width="1200" height="800" fill="#f8fafc"/>
        
        {/* Title */}
        <text x="600" y="40" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#1e293b">
          콜센터 상담 관리 MSA 아키텍처
        </text>
        
        {/* Client Layer */}
        <rect x="50" y="80" width="1100" height="80" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="600" y="105" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#475569">
          Client Layer
        </text>
        <text x="150" y="130" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
          웹 클라이언트
        </text>
        <text x="350" y="130" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
          모바일 앱
        </text>
        <text x="550" y="130" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
          상담원 데스크톱
        </text>
        <text x="750" y="130" fontFamily="Arial, sans-serif" fontSize="14" fill="#64748b">
          관리자 콘솔
        </text>
        
        {/* API Gateway */}
        <rect x="350" y="200" width="500" height="100" fill="url(#nestjsGrad)" stroke="#e10098" strokeWidth="3" rx="15" filter="url(#shadow)"/>
        <text x="600" y="235" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="white">
          NestJS GraphQL Gateway
        </text>
        <text x="600" y="255" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="white">
          통합 API 게이트웨이 &amp; 인증/인가
        </text>
        <text x="600" y="275" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="#fce7f3">
          GraphQL Schema Federation
        </text>
        
        {/* Real-time Communication Service */}
        <rect x="50" y="350" width="350" height="150" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="225" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          실시간 통신 서비스
        </text>
        <text x="225" y="400" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="white">
          Spring Boot + JPA
        </text>
        
        <rect x="70" y="420" width="100" height="25" fill="#4ade80" stroke="#22c55e" rx="5"/>
        <text x="120" y="437" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">WebSocket</text>
        
        <rect x="190" y="420" width="80" height="25" fill="#4ade80" stroke="#22c55e" rx="5"/>
        <text x="230" y="437" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">SSE</text>
        
        <rect x="290" y="420" width="80" height="25" fill="#4ade80" stroke="#22c55e" rx="5"/>
        <text x="330" y="437" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">Pub/Sub</text>
        
        <text x="225" y="465" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 실시간 메신저
        </text>
        <text x="225" y="480" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 알림 서비스
        </text>
        
        {/* Business Services */}
        <rect x="450" y="350" width="250" height="150" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="575" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          상담 관리 서비스
        </text>
        <text x="575" y="400" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fill="white">
          Spring Boot + JPA
        </text>
        <text x="575" y="430" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 상담 세션 관리
        </text>
        <text x="575" y="445" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 고객 정보 관리
        </text>
        <text x="575" y="460" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 상담 이력 관리
        </text>
        <text x="575" y="475" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          • 큐 관리
        </text>
        
        <rect x="750" y="350" width="180" height="70" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="840" y="375" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          사용자 관리 서비스
        </text>
        <text x="840" y="390" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          Spring Boot
        </text>
        <text x="840" y="405" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          인증/권한/조직관리
        </text>
        
        <rect x="750" y="430" width="180" height="70" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="840" y="455" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          통계/분석 서비스
        </text>
        <text x="840" y="470" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          Spring Boot
        </text>
        <text x="840" y="485" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          리포트/대시보드
        </text>
        
        <rect x="980" y="350" width="170" height="150" fill="url(#springGrad)" stroke="#6DB33F" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="1065" y="380" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          외부 연동 서비스
        </text>
        <text x="1065" y="395" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          Spring Boot
        </text>
        <text x="1065" y="420" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • CRM 연동
        </text>
        <text x="1065" y="435" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • VoIP 시스템
        </text>
        <text x="1065" y="450" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 이메일/SMS
        </text>
        <text x="1065" y="465" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 파일 서버
        </text>
        <text x="1065" y="480" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="white">
          • 결제 시스템
        </text>
        
        {/* Message Queue */}
        <rect x="250" y="550" width="700" height="60" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="600" y="575" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="white">
          Message Queue (Redis/RabbitMQ/Kafka)
        </text>
        <text x="600" y="595" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          서비스 간 비동기 통신 &amp; 이벤트 스트리밍
        </text>
        
        {/* Database Layer */}
        <rect x="50" y="650" width="250" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="175" y="680" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          실시간 통신 DB
        </text>
        <text x="175" y="700" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          PostgreSQL/MySQL
        </text>
        <text x="175" y="720" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          메시지, 알림 데이터
        </text>
        
        <rect x="350" y="650" width="250" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="475" y="680" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          상담 관리 DB
        </text>
        <text x="475" y="700" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          PostgreSQL/MySQL
        </text>
        <text x="475" y="720" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          고객, 상담, 이력 데이터
        </text>
        
        <rect x="650" y="650" width="200" height="100" fill="#dc2626" stroke="#b91c1c" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="750" y="680" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          캐시 &amp; 세션
        </text>
        <text x="750" y="700" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          Redis
        </text>
        <text x="750" y="720" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#fecaca">
          실시간 상태, 세션
        </text>
        
        <rect x="900" y="650" width="250" height="100" fill="url(#dbGrad)" stroke="#336791" strokeWidth="2" rx="10" filter="url(#shadow)"/>
        <text x="1025" y="680" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" fill="white">
          분석 &amp; 로그 DB
        </text>
        <text x="1025" y="700" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="12" fill="white">
          MongoDB/Elasticsearch
        </text>
        <text x="1025" y="720" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fill="#e2e8f0">
          통계, 로그, 분석 데이터
        </text>
        
        {/* Arrows */}
        {/* Client to Gateway */}
        <path d="M 600 160 L 600 200" stroke="#475569" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        
        {/* Gateway to Services */}
        <path d="M 450 300 L 225 350" stroke="#e10098" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 600 300 L 575 350" stroke="#e10098" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 650 300 L 840 350" stroke="#e10098" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 750 300 L 1065 350" stroke="#e10098" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        
        {/* Services to Message Queue */}
        <path d="M 225 500 L 400 550" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 575 500 L 600 550" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 840 500 L 750 550" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 1065 500 L 800 550" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        
        {/* Services to Databases */}
        <path d="M 175 500 L 175 650" stroke="#6DB33F" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 575 500 L 475 650" stroke="#6DB33F" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 840 500 L 750 650" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
        <path d="M 1065 500 L 1025 650" stroke="#6DB33F" strokeWidth="1.5" fill="none" markerEnd="url(#arrowhead)"/>
      </svg>
    </div>
  );
};

export default CallCenterMSAArchitecture;