// components/CtiLearningCurveSummary.tsx

'use client';

import React from 'react';

const CtiLearningCurveSummary = () => {
    return (
        <div className="space-y-8 text-gray-800">
            <div>
                <h2 className="text-2xl font-bold text-blue-700">CTI 프로젝트 기술 습득 러닝 커브 요약</h2>
                <p className="mt-2">아래는 C/C++ 기반 CTI 연동부터 프론트-백 전체 시스템을 아우르는 <strong>현실적 러닝 커브</strong>를 정리한 것입니다.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">✅ C/C++ CTI 연동은 커널/게임엔진급 난이도는 아님</h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>❌</strong> 리눅스 커널, 스타크래프트 렌더링 엔진 수준 아님</li>
                    <li><strong>✅</strong> SIP 연결, 통화 상태 감지, RTP 저장, 이벤트 전파 정도</li>
                    <li>libpjsua2, linphone-sdk, baresip 등 활용 가능</li>
                    <li>GPT/Gemini/Claude 도움으로 진입 장벽 대폭 낮아짐</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">🎯 파일럿 중심 학습 전략 (예상 기간: 약 2~3개월)</h3>
                <table className="w-full border text-sm border-gray-300 mt-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1 text-left">기간</th>
                            <th className="border px-2 py-1 text-left">목표</th>
                            <th className="border px-2 py-1 text-left">파일럿 주제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">1~2주</td>
                            <td className="border px-2 py-1">C/C++ 기본</td>
                            <td className="border px-2 py-1">PJSUA2 기반 Hello SIP</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">2~3주</td>
                            <td className="border px-2 py-1">전화기 상태 연동</td>
                            <td className="border px-2 py-1">통화 시작/종료 시 JSON 출력</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">3~5주</td>
                            <td className="border px-2 py-1">녹취 처리</td>
                            <td className="border px-2 py-1">RTP → PCM/WAV 저장</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">4~6주</td>
                            <td className="border px-2 py-1">Redis 전파</td>
                            <td className="border px-2 py-1">callStatus = "busy" 전송</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">6~8주</td>
                            <td className="border px-2 py-1">Next.js 연동</td>
                            <td className="border px-2 py-1">WebSocket 상태 표시 UI</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">🧠 AI 툴의 활용 가치</h3>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>GPT-4</strong>: PJSIP 함수 예제, gRPC stub 코드 생성</li>
                    <li><strong>Claude</strong>: 구조 설계, 메모리 안정성 설명</li>
                    <li><strong>Gemini</strong>: SIP/WebRTC 구조 설명 최적</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-gray-900">✅ 결론</h3>
                <p className="mt-2">
                    이건 닥치고 부딪히면서 점진적으로 내재화하면 되는 영역입니다. GPT + 파일럿 실습을 꾸준히 하면 <strong>3~5개월 내에 실무 설계자 수준의 구조 이해</strong>가 가능합니다.
                </p>
                <p className="mt-2 text-blue-600 font-medium">
                    "이걸 구현까지 할 수 있다면, CTO 아키텍트급 역량 인증입니다."
                </p>
            </div>
        </div>
    );
};

export default CtiLearningCurveSummary;
