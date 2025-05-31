// components/SummaryX86Architecture.tsx
"use client";

import React from "react";

const SummaryX86Architecture = () => {
    return (
        <section className="space-y-6 p-4">
            <h2 className="text-2xl font-bold">x86, 국가급 스펙의 기술 아키텍처</h2>

            <p>
                우리가 흔히 쓰는 컴퓨터, 서버, 게임기, 스마트폰의 핵심엔 <strong>x86이나 ARM</strong>과 같은
                <span className="text-blue-600 font-semibold">ISA (명령어 집합 구조)</span>가 있습니다.
            </p>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">📌 x86이란?</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Intel이 개발한 <strong>명령어 집합(Instruction Set Architecture)</strong></li>
                    <li>전 세계 데스크탑/서버 CPU 시장을 수십 년간 지배</li>
                    <li>운영체제(OS), 컴파일러, 하드웨어 펌웨어까지 이 구조에 맞춰 설계</li>
                    <li>지금도 수십억 개의 장비가 x86 위에서 실행 중</li>
                </ul>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">🚫 진입 장벽이 높은 이유</h3>
                <ul className="list-disc list-inside">
                    <li>x86은 단순한 언어가 아니라 <strong>수십 년 누적된 복잡한 기술 스펙</strong></li>
                    <li>하위 호환성, 캐시 설계, 분기 예측 등 아키텍처적으로 극단적으로 최적화</li>
                    <li>리버스 엔지니어링, 보안, 커널 개발 등에서 독점적 위치</li>
                </ul>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">💡 x86 vs RISC-V</h3>
                <table className="table-auto w-full text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">항목</th>
                            <th className="p-2 text-left">x86</th>
                            <th className="p-2 text-left">RISC-V</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td className="p-2">출신</td><td className="p-2">Intel (1978)</td><td className="p-2">UC Berkeley (2010)</td></tr>
                        <tr><td className="p-2">특허</td><td className="p-2">상업용 독점</td><td className="p-2">오픈소스 ISA</td></tr>
                        <tr><td className="p-2">시장</td><td className="p-2">서버/PC 시장 장악</td><td className="p-2">AI, IoT, 교육용 분야 확장 중</td></tr>
                        <tr><td className="p-2">목표</td><td className="p-2">고성능 범용 CPU</td><td className="p-2">모듈성, 커스터마이징</td></tr>
                    </tbody>
                </table>
            </div>

            <p>
                x86은 단순한 기술이 아니라 <strong>미국의 국가 전략</strong>이기도 합니다.
                <span className="text-red-600">EUV, F-22 전투기</span>처럼 극단적 고도화가 된 기술이며,
                아직까지는 진정한 대체제가 없습니다.
            </p>

            <h3 className="text-xl font-semibold">📦 LLVM, RISC-V, ARM은 어떤 관계?</h3>
            <ul className="list-disc list-inside space-y-1">
                <li><strong>LLVM</strong>: 중간언어(IR)를 통해 다양한 ISA로 최종 번역 가능하게 해주는 컴파일러 프레임워크</li>
                <li><strong>ARM</strong>: 모바일/임베디드에서 강세, Apple M 시리즈 등에서 강력한 퍼포먼스</li>
                <li><strong>RISC-V</strong>: ISA 자체를 오픈화 → 누구나 설계 가능 → 생태계 확장 기대</li>
            </ul>

            <div className="p-4 rounded-xl bg-yellow-100 border border-yellow-300">
                <p className="font-medium">🔥 요약</p>
                <p>
                    x86은 단순한 명령어 셋이 아니라 “<strong>산업 패권</strong>의 본체”입니다.<br />
                    이 생태계 위에 우리가 쓰는 모든 운영체제, 컴파일러, 고급 언어가 얹혀 있습니다.
                </p>
            </div>
        </section>
    );
};

export default SummaryX86Architecture;
