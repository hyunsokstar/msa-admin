// src/app/code-architecture/ParadigmAndStructureSummary.tsx
import React from "react";

export const ParadigmAndStructureSummary: React.FC = () => {
    return (
        <section className="mb-16 p-6 bg-white rounded-2xl shadow">
            <h2 className="text-3xl font-bold mb-4 text-blue-700 border-b pb-2">
                코드 구조화, 명확성 & 패러다임 총정리
            </h2>
            <ul className="list-disc pl-6 space-y-6 text-lg">
                <li>
                    <b>C (포인터 기반):</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>모든 코드/데이터 흐름이 명시적(explicit)으로 드러난다.</li>
                        <li>메모리 직접 제어, 복잡한 추상화 거의 없음. (직접적, 한눈에 파악 가능)</li>
                        <li>
                            <b>장점:</b> 코드 한 줄 한 줄의 동작이 명확, 성능 최적화, 예측 가능한 결과
                        </li>
                        <li>
                            <b>단점:</b> 큰 프로젝트에서 코드 분산·중복 관리가 어렵고, 생산성/확장성은 낮음
                        </li>
                    </ul>
                </li>
                <li>
                    <b>OOP (객체지향):</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            <b>캡슐화/추상화/상속/다형성</b>으로 현실 세계의 복잡한 구조를 모델링
                        </li>
                        <li>복잡한 코드를 객체로 나누고, 역할 분리와 재사용에 강점</li>
                        <li>
                            <b>장점:</b> 대규모 시스템, 협업, 유지보수, 확장성에 유리
                        </li>
                        <li>
                            <b>단점:</b> 추상화가 심할 경우 “실제 동작”을 한눈에 파악하기 어려움
                        </li>
                    </ul>
                </li>
                <li>
                    <b>FP (함수형 프로그래밍):</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            <b>순수 함수, 불변성, 고차 함수, 선언형 코드</b>로 데이터 흐름을 통제
                        </li>
                        <li>
                            명령(절차)보다는 <b>“무엇을 원하는가”</b>를 코드로 표현
                        </li>
                        <li>
                            <b>장점:</b> 병렬 처리, 테스트, 디버깅 용이. 코드 예측 가능성↑
                        </li>
                        <li>
                            <b>단점:</b> 실전에서는 절차적/객체지향과 혼합되므로, 순수 FP 스타일을 유지하기 어려움.
                            추상화로 인해 “실제 데이터 흐름”이 코드상에서 감춰질 수 있음
                        </li>
                    </ul>
                </li>
                <li>
                    <b>공통점과 균형:</b>
                    <ul className="list-disc pl-8 mt-2 space-y-1 text-base">
                        <li>
                            <b>구조화의 핵심은 “명확성”</b>: 누구나 코드를 읽고 의도를 쉽게 파악할 수 있어야 한다.
                        </li>
                        <li>
                            <b>추상화(캡슐화, 함수, 모듈, 컴포넌트)는 생산성/확장성을 위한 도구</b>이지만,
                            <b>“설계/네이밍/주석/책임 분리”로 명확성을 유지</b>하는 것이 중요하다.
                        </li>
                        <li>
                            <b>실력자는 복잡한 구조에서도 “명확한 흐름”을 설계한다.</b>
                        </li>
                    </ul>
                </li>
                <li>
                    <b>결론:</b>
                    <ul className="list-disc pl-8 mt-2 text-base">
                        <li>
                            <b>C처럼 한 줄 한 줄이 의미 있는 코드</b>를 지향하면서,
                            <b>OOP/FP의 장점도 적절히 활용</b>하는 것이 실전에서 최고의 코드 구조화다.
                        </li>
                        <li>
                            <b>명확성 + 생산성 + 확장성</b>의 균형이 진짜 실력!
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    );
};

export default ParadigmAndStructureSummary;
