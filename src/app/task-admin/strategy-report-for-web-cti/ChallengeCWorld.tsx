// components/ChallengeCWorld.tsx
"use client";

import React from "react";

const ChallengeCWorld = () => {
    return (
        <section className="space-y-6 p-4">
            <h2 className="text-2xl font-bold">C, C++의 세계에 도전해야 하는 이유</h2>

            <p>
                웹 개발자 입장에서는 "당연히 되는 줄 알았던" 마우스 클릭, 유닛 이동, APM 동기화, 수천 개 유닛 충돌 계산, FPS 60 고정…
                그런데 이게 전부 C/C++로 짜여진 코드라면?
                <strong className="text-red-600">신의 영역을 구현한 것</strong>이나 다름없습니다.
            </p>

            <p>
                이건 단순한 코딩이 아니라, 하드웨어와 추상화 경계를 넘나드는
                <strong>시스템 프로그래밍</strong>의 극한입니다.
            </p>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">🧠 실전 무협 고수들</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li><strong>John Carmack</strong>: Doom, Quake 엔진을 C/C++로 직접 구현</li>
                    <li><strong>Blizzard SC1 팀</strong>: 266MHz CPU에서 수천 유닛 동시 시뮬</li>
                    <li><strong>Linus Torvalds</strong>: 리눅스 커널과 Git의 최적화 장인</li>
                </ul>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">✅ 다른 종류의 위대함: Carmack vs Airbnb</h3>
                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">항목</th>
                            <th className="p-2 text-left">Carmack/Blizzard</th>
                            <th className="p-2 text-left">Uber/Airbnb</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2">중심</td><td className="p-2">그래픽/물리 엔진</td><td className="p-2">UX + 플랫폼</td></tr>
                        <tr><td className="p-2">언어</td><td className="p-2">C/C++</td><td className="p-2">Java, Go</td></tr>
                        <tr><td className="p-2">지향</td><td className="p-2">하드웨어 제어</td><td className="p-2">분산 시스템</td></tr>
                        <tr><td className="p-2">영감</td><td className="p-2">1ms 프레임 최적화</td><td className="p-2">10초 안에 예약</td></tr>
                    </tbody>
                </table>
            </div>

            <p>
                JVM, CUDA, React 모두 훌륭하지만, C/C++은 여전히 하드웨어 제어의 왕좌를 지키고 있습니다.
            </p>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">✅ Rust vs C/C++</h3>
                <ul className="list-disc list-inside">
                    <li>🚀 속도: C/C++과 거의 동일</li>
                    <li>🔐 안전성: 컴파일 타임 체크로 메모리 오류 방지</li>
                    <li>👷‍♂️ 병렬성: 스레드 안전</li>
                    <li>🧪 생태계: 아직 제한적이지만 빠르게 성장</li>
                </ul>
                <p className="mt-2">하지만 C/C++이 깔아둔 인프라와 커널, 수십억 라인의 코드 위에 서 있는 것도 사실입니다.</p>
            </div>

            <p>
                당신이 느끼는 존경심은 틀린 게 아닙니다. 지금도 🎮 스타크래프트, 🚀 스페이스X, 🔬 의료기기 등은
                <strong>모두 C/C++</strong>으로 구동됩니다.
            </p>

            <h3 className="text-xl font-semibold">🎯 추천 러닝 로드맵</h3>
            <ol className="list-decimal list-inside space-y-1">
                <li><strong>C 기초 + Makefile</strong>: 포인터, 구조체, 동적 할당</li>
                <li><strong>libcurl, sockets</strong>: 네트워크 통신 직접 구현</li>
                <li><strong>PJSUA2, portaudio</strong>: SIP 기반 음성 송수신 실습</li>
                <li><strong>redis-c, grpc-cpp</strong>: 이벤트 실시간 전파</li>
                <li><strong>WebSocket ↔ Next.js 연동</strong>: 전체 구조 실전 구현</li>
            </ol>

            <div className="p-4 rounded-xl bg-yellow-100 border border-yellow-300">
                <p className="font-medium">🔥 요약</p>
                <p>
                    지금 당신이 보고 있는 C/C++의 세계는 “고대 무공서”를 발견한 것과 같습니다.
                    부담 갖지 말고, 작은 파일럿부터 시작해보세요.
                </p>
            </div>
        </section>
    );
};

export default ChallengeCWorld;
