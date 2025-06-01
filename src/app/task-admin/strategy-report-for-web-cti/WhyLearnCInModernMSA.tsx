// src/app/code-architecture/WhyLearnCInModernMSA.tsx
import React from "react";

export const WhyLearnCInModernMSA: React.FC = () => {
    return (
        <section className="mb-16 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-3xl font-bold mb-4 text-blue-700 border-b pb-2">
                왜 아직도 C 언어를 배우는가? (MSA, 빅테크, 미래 기술 관점)
            </h2>
            <ul className="list-disc pl-6 space-y-6 text-lg">
                <li>
                    <b>진짜 “기계”와 연결되는 핵심 언어:</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            서버, 네트워크, IoT, 자동차, 로봇, 위성, 우주선 등 <b>실제 하드웨어/기기 연동</b>은 여전히 C/C++이 “표준”이자 “레퍼런스”.
                        </li>
                        <li>
                            <b>수십 년간 쌓인 실전 사례, 수많은 라이브러리, 검증된 성능/안정성</b>이 압도적.
                        </li>
                        <li>
                            <b>Rust, Go</b>도 성장 중이지만, “진짜 하드웨어·실시간 임베디드” 분야에서는 C/C++의 입지가 아직도 압도적.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>MSA(마이크로서비스 아키텍처)와 빅테크 환경에서도 C의 가치:</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            최상위 MSA·클라우드 기업(Google, AWS, 네이버, 카카오 등)의 “핵심 인프라” <b>DB 엔진, OS, 통신, 컨테이너 런타임</b>은 대부분 C/C++로 구현.
                        </li>
                        <li>
                            새로운 언어(Rust, Go 등)는 혁신과 안정성에서 점점 영향력을 키우고 있지만,
                            <b>기존 C/C++ 코드베이스와 완전한 대체는 현실적으로 느리거나 제한적</b>.
                        </li>
                        <li>
                            <b>결국, 진짜 실무에서는 “새로운 기술+전통적 핵심 레퍼런스”를 모두 다룰 수 있어야 한다.</b>
                        </li>
                    </ul>
                </li>
                <li>
                    <b>C를 배운다는 것은?</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            <b>컴퓨터/기계의 “진짜 원리”</b>를 직접 체험한다는 뜻:
                            <br />
                            - 메모리, 포인터, 하드웨어 제어 등 <b>실전 컴퓨팅의 “바닥부터”</b> 이해
                        </li>
                        <li>
                            <b>현대 언어(Go, Rust, Java, Python)의 원리와 한계, 추상화가 왜 필요한지 본질적으로 체득</b>
                        </li>
                        <li>
                            <b>최적화·성능·디버깅·시스템 안정성</b> 등 “실력 있는 개발자”의 기반 역량이 됨
                        </li>
                        <li>
                            <b>게임, 임베디드, IoT, 시스템 프로그래밍, 빅테크 인프라, OSS 기여 등</b>
                            <br />
                            <b>모든 미래 개발의 기본 체력!</b>
                        </li>
                    </ul>
                </li>
                <li>
                    <b>결론:</b>
                    <ul className="list-disc pl-8 mt-2 text-base">
                        <li>
                            <b>진짜 프로/아키텍트가 되고 싶다면?</b>
                            <br />
                            <b>C를 제대로 배워놓으면, 새로운 언어/트렌드가 와도 “본질”을 놓치지 않는다.</b>
                        </li>
                        <li>
                            <b>MSA, 웹, AI, 데이터, 시스템 개발…</b>
                            <br />
                            <b>적재적소의 “최적 언어/기술”을 제대로 판단할 수 있는 감각이 생긴다.</b>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    );
};

export default WhyLearnCInModernMSA;
