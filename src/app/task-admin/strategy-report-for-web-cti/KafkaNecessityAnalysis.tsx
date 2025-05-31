
// components/KafkaNecessityAnalysis.tsx

'use client';

import React from 'react';

const KafkaNecessityAnalysis = () => {
    return (
        <div className="space-y-8 text-gray-800">
            <div>
                <h2 className="text-2xl font-bold text-blue-700">Kafka가 “필수”가 되는 경우</h2>
                <p className="mt-2">Kafka는 <strong>이벤트 유실이 0%</strong>여야 하며, <strong>전체 이벤트 흐름의 재현과 분석이 중요한 시스템</strong>에서 필수입니다:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>전쟁/작전 시스템</strong> – 작전명령, 지시, 센서 정보 등 유실 불가</li>
                    <li><strong>병원 시스템</strong> – 환자 상태 변화, 처방 기록, 응급호출 등 모두 기록</li>
                    <li><strong>트위치/유튜브/게임 스트리밍</strong> – 수십만 실시간 메시지와 상호작용 분석</li>
                    <li><strong>거대 SaaS 로그 시스템</strong> – ClickHouse, Elastic, BigQuery 등과 연동</li>
                </ul>
                <p className="mt-4 font-semibold">📌 요구사항 키워드:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>“실시간 분석 필요”</li>
                    <li>“이벤트 재처리/리플레이 필요”</li>
                    <li>“한 건도 유실되면 안 됨”</li>
                    <li>“다중 컨슈머 시스템 필요”</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-green-700">Kafka가 필요 없는 경우 (대부분의 일반 CTI 시스템)</h2>
                <p className="mt-2">Kafka는 <strong>단순 이벤트 전파 목적</strong>에는 과도할 수 있습니다:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>상담원 상태 변경 전파</li>
                    <li>채팅 메시지 실시간 전달</li>
                    <li>상담 시작/종료 이벤트 처리</li>
                    <li>통화 종료 후 CDR 저장</li>
                    <li>SSE/WebSocket/Redis PubSub 기반 전파</li>
                    <li>단순 로그 DB 저장</li>
                </ul>
                <p className="mt-4 font-semibold">📌 요구사항 키워드:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>“실시간 전파는 필요하지만 분석은 없음”</li>
                    <li>“유실 가능성은 있지만, 업무 지장 없음”</li>
                    <li>“이벤트 리플레이나 병렬 소비는 없음”</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-purple-700">Kafka는 선택적 옵션 구성</h2>
                <p className="mt-2">해당 아키텍처에서는 Kafka는 <strong>선택적으로 넣고 뺄 수 있는 모듈</strong>입니다.</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>서비스 간 강한 의존성 없음 (loosely coupled)</li>
                    <li>Kafka → 이벤트 브로커 / Redis → 단순 전파</li>
                    <li>Kafka 제거해도 전체 구조 유지 가능</li>
                </ul>
                <p className="mt-2">📌 Kafka만 뺀 구조로도 도식 유지 가능</p>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-700 mt-8">Kafka 필요성 판단 요약</h2>
                <table className="w-full text-sm border border-gray-300 mt-4">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="border px-2 py-1 text-left">구분</th>
                            <th className="border px-2 py-1 text-center">Kafka 불필요</th>
                            <th className="border px-2 py-1 text-center">Kafka 필수</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">실시간 전파만 필요</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">이벤트 유실 허용 가능</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">단일 소비자만 존재</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">통계/분석은 비실시간</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">이벤트 재처리 없음</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">단순 채팅, 상태 변경 정도</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">STT/감정 분석/AI 적용</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">모든 이벤트 기록, 리플레이</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">다중 컨슈머 동시 처리</td>
                            <td className="border px-2 py-1 text-center">❌</td>
                            <td className="border px-2 py-1 text-center">✅</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KafkaNecessityAnalysis;
