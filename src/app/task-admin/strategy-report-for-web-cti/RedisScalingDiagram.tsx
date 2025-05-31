// components/RedisScalingDiagram.tsx
"use client";

import React from "react";

const RedisScalingDiagram: React.FC = () => {
    return (
        <div className="w-full p-4 bg-gray-50 space-y-6">
            {/* 1) Redis 확장 시나리오 다이어그램 */}
            <svg
                viewBox="0 0 1400 450"
                className="w-full h-auto border rounded-lg shadow-lg bg-white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* 단계별 블록 채우기용 그라데이션 */}
                    <linearGradient id="singleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fef3c7" stopOpacity="1" />
                        <stop offset="100%" stopColor="#fde68a" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="sentinelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
                        <stop offset="100%" stopColor="#bfdbfe" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="clusterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#dcfce7" stopOpacity="1" />
                        <stop offset="100%" stopColor="#bbf7d0" stopOpacity="1" />
                    </linearGradient>

                    {/* 약간의 그림자 필터 */}
                    <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
                    </filter>

                    {/* 화살표 마커 */}
                    <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                    </marker>
                </defs>

                {/* 제목 */}
                <text
                    x="700"
                    y="30"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="20"
                    fontWeight="bold"
                    fill="#1e293b"
                >
                    Redis 확장 시나리오
                </text>

                {/* 1단계: Single Redis 인스턴스 */}
                <rect
                    x="100"
                    y="60"
                    width="280"
                    height="140"
                    fill="url(#singleGrad)"
                    stroke="#fde047"
                    strokeWidth="2"
                    rx="8"
                    filter="url(#shadow2)"
                />
                <text
                    x="240"
                    y="95"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#92400e"
                >
                    1) Single Redis
                </text>
                <text
                    x="240"
                    y="120"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#6b7280"
                >
                    • Redis Master (단일 인스턴스)
                </text>
                <text
                    x="240"
                    y="140"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#6b7280"
                >
                    • Spring Boot “Redis Pub/Sub 서비스” 연결
                </text>
                <text
                    x="240"
                    y="160"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#6b7280"
                >
                    • 장애 시 수동 복구 필요
                </text>

                {/* 단계 이동 화살표 A */}
                <path
                    d="M 380 130 L 460 130"
                    stroke="#6b7280"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow2)"
                />
                <text
                    x="430"
                    y="115"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#475569"
                >
                    확장 대상 → Sentinel
                </text>

                {/* 2단계: Redis Master-Replica (Sentinel) */}
                <rect
                    x="480"
                    y="60"
                    width="340"
                    height="140"
                    fill="url(#sentinelGrad)"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    rx="8"
                    filter="url(#shadow2)"
                />
                <text
                    x="650"
                    y="95"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#1e40af"
                >
                    2) Redis Master-Replica
                </text>
                <text
                    x="650"
                    y="120"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#374151"
                >
                    • Redis Master (Pub/Sub 전용)
                </text>
                <text
                    x="650"
                    y="140"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#374151"
                >
                    • Redis Replica (읽기 전용, 장애 대비)
                </text>
                <text
                    x="650"
                    y="160"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#374151"
                >
                    • Sentinel → 자동 페일오버 지원
                </text>
                <text
                    x="650"
                    y="180"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#374151"
                >
                    • Spring Boot 서비스는 Master 주소만 바라봄
                </text>

                {/* 단계 이동 화살표 B */}
                <path
                    d="M 820 130 L 900 130"
                    stroke="#6b7280"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow2)"
                />
                <text
                    x="860"
                    y="115"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#475569"
                >
                    처리량 한계 도달 → Cluster
                </text>

                {/* 3단계: Redis Cluster (샤딩) */}
                <rect
                    x="960"
                    y="60"
                    width="340"
                    height="200"
                    fill="url(#clusterGrad)"
                    stroke="#10b981"
                    strokeWidth="2"
                    rx="8"
                    filter="url(#shadow2)"
                />
                <text
                    x="1130"
                    y="95"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#065f46"
                >
                    3) Redis Cluster (샤딩)
                </text>
                <text
                    x="1130"
                    y="120"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#065f46"
                >
                    • Shard Node A (Slot 0–5000)
                </text>
                <text
                    x="1130"
                    y="140"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#065f46"
                >
                    • Shard Node B (Slot 5001–10000)
                </text>
                <text
                    x="1130"
                    y="160"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#065f46"
                >
                    • Shard Node C (Slot 10001–16384)
                </text>
                <text
                    x="1130"
                    y="180"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fill="#065f46"
                >
                    • 각 샤드마다 Master+Replica 구성 가능
                </text>
                <text
                    x="1130"
                    y="200"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="11"
                    fill="#065f46"
                >
                    • 채널 네이밍 패턴: chat:{`{roomId}`} → 해시 슬롯 분산
                </text>
                <text
                    x="1130"
                    y="220"
                    textAnchor="middle"
                    fontFamily="Arial, sans-serif"
                    fontSize="11"
                    fill="#065f46"
                >
                    • Spring Boot Pub/Sub 서비스는 Cluster 엔드포인트 사용
                </text>

                {/* 왼쪽–오른쪽 확장 순서 표시 (Legend 역할) */}
                <rect x="50" y="300" width="300" height="130" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" rx="5" />
                <text
                    x="60"
                    y="320"
                    fontFamily="Arial, sans-serif"
                    fontSize="12"
                    fontWeight="bold"
                    fill="#475569"
                >
                    Legend:
                </text>
                <rect x="60" y="330" width="12" height="12" fill="#fde047" />
                <text x="80" y="340" fontFamily="Arial, sans-serif" fontSize="11" fill="#475569">
                    Single Redis (단일 Master)
                </text>
                <rect x="60" y="350" width="12" height="12" fill="#bfdbfe" />
                <text x="80" y="360" fontFamily="Arial, sans-serif" fontSize="11" fill="#475569">
                    Redis Master-Replica (Sentinel)
                </text>
                <rect x="60" y="370" width="12" height="12" fill="#bbf7d0" />
                <text x="80" y="380" fontFamily="Arial, sans-serif" fontSize="11" fill="#475569">
                    Redis Cluster (샤딩)
                </text>
                <circle cx="60" cy="405" r="6" fill="#6b7280" />
                <text x="80" y="408" fontFamily="Arial, sans-serif" fontSize="11" fill="#475569">
                    확장 방향 화살표
                </text>
            </svg>

            {/* 2) 보충 설명 */}
            <div className="bg-white p-4 rounded-lg border space-y-3">
                <h3 className="text-lg font-semibold">보충 설명</h3>
                <p className="text-gray-700 text-sm">
                    위 다이어그램은 Redis Pub/Sub 인프라만 확장하는 과정을 보여줍니다. <strong>기존의 전체
                        아키텍처(클라이언트 → API Gateway → 각 서비스 → 데이터베이스)는 전혀 변경하지 않아도</strong>,
                    Redis 부분만 단계별로 확장할 수 있습니다.
                </p>
                <h4 className="font-medium text-gray-800">왜 아키텍처를 그대로 둘 수 있나요?</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>
                        Spring Boot “Redis Pub/Sub 서비스”는 단일 엔드포인트(또는 클러스터 엔드포인트) 주소만 바라봅니다.
                    </li>
                    <li>
                        Sentinel 구성 시에도, 클라이언트는 Sentinel이 관리하는 마스터 주소로만 연결하면 되므로
                        애플리케이션 코드를 수정할 필요가 없습니다.
                    </li>
                    <li>
                        Cluster(샤딩)로 전환해도, 클러스터 엔드포인트(예: “redis-cluster.example.com:6379”) 하나만 바라보면
                        슬롯 분산 및 장애 복구가 내부적으로 이루어집니다.
                    </li>
                    <li>
                        따라서 API Gateway, Chat/Call/Notification 서비스, 클라이언트, DB 등 다른 컴포넌트는
                        Redis 연결 설정만 바꿔주면 동작 방식이나 코드 구조를 바꿀 필요가 없습니다.
                    </li>
                </ul>
                <h4 className="font-medium text-gray-800">확장했을 때 얻을 수 있는 효과</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    <li>
                        <strong>가용성(Availability) 증가:</strong> Sentinel 페일오버나 Cluster 내 Replica 장애 복구를 통해
                        마스터 장애 시에도 서비스가 계속 유지됩니다.
                    </li>
                    <li>
                        <strong>복원력(Resilience) 향상:</strong> 장애 발생 시 자동 페일오버 됨으로써
                        수동 개입 시간을 최소화합니다.
                    </li>
                    <li>
                        <strong>처리량(Throughput) 증가:</strong> 단일 Redis 한계에 도달하면 Cluster
                        샤딩을 통해 슬롯 단위로 Pub/Sub 채널을 분산시켜 초당 수만 건 이상의 메시지를 처리할 수 있습니다.
                    </li>
                    <li>
                        <strong>수평 확장(Scalability) 가능:</strong> 샤드를 추가하거나 제거하면서
                        트래픽 변화에 따라 클러스터 크기를 유연하게 조절할 수 있습니다.
                    </li>
                    <li>
                        <strong>유지보수(Maintainability) 편의:</strong> Redis 설정(엔드포인트 변경)만으로 확장이 가능하여,
                        다른 서비스 코드를 건드릴 필요가 없습니다.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RedisScalingDiagram;
