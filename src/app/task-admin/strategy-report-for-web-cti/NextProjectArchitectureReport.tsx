import React from 'react';
import { CheckCircle, Code, Database, Globe, Layers, TrendingUp, Users, Zap } from 'lucide-react';


const ArchitectureReport = () => {
    return (
        <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-8 bg-blue-600 rounded"></div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        차세대 프로젝트를 위한 아키텍처 전략 제안
                    </h1>
                </div>

                {/* Quote Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
                    <blockquote className="text-lg font-medium text-gray-800 mb-2">
                        "마음은 내려놓고, 머리는 가져와라."
                    </blockquote>
                    <p className="text-sm text-gray-600 mb-3">— 중국 DJI 창업자 프랭크 왕 (Frank Wang)</p>
                    <p className="text-gray-700">
                        감정에 휘둘리지 말고 냉철한 사고로 문제를 해결하라는 뜻입니다. 우리는 빠르게 변화하는 IT 환경 속에서
                        수많은 기술의 유혹을 받습니다. 하지만 <strong>감성적인 기술 선택</strong>이 아닌,
                        <strong>이성적이고 목적 중심적인 설계</strong>가 미래를 만듭니다.
                    </p>
                </div>
            </div>

            {/* Section 1: Core Architecture */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">1. 차세대 아키텍처의 핵심 구성</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Frontend */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Code className="w-5 h-5 text-blue-600" />
                            <h3 className="text-xl font-semibold text-gray-800">프론트엔드</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Next.js 15</h4>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• App Router 기반 SSR/ISR/PPR 지원</li>
                                    <li>• React 19 기반 Server Components</li>
                                    <li>• Turbopack 번들러 & 향상된 성능</li>
                                    <li>• Built-in GraphQL Client 지원</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">React 19 + TailwindCSS + Shadcn UI</h4>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• Server/Client Components 최적화</li>
                                    <li>• 빠른 UI 개발 및 반응형 대응</li>
                                    <li>• 디자인 시스템 통합 가능</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Backend */}
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Database className="w-5 h-5 text-green-600" />
                            <h3 className="text-xl font-semibold text-gray-800">백엔드</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Spring Boot 3.x</h4>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• Jakarta EE 기반 최신 API</li>
                                    <li>• 모듈화, 인증, 트랜잭션, 보안 모두 대응</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">GraphQL (Netflix DGS)</h4>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• 내장 GraphQL Client로 직접 연결</li>
                                    <li>• over-fetching, under-fetching 문제 해결</li>
                                    <li>• 스키마 자동 생성 및 타입 안전성</li>
                                    <li>• Apollo Client 없이도 완전한 GraphQL 지원</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">JPA + jOOQ</h4>
                                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                                    <li>• JPA: CRUD 중심, 도메인 중심 설계</li>
                                    <li>• jOOQ: 복잡한 SQL 최적화, 리포트/통계</li>
                                    <li>• CQRS 패턴으로 분리 적용 → 유연성 확보</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Philosophy */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">2. 아키텍처 전략의 철학</h2>
                </div>

                <div className="space-y-6">
                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-r-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 "왜 Next.js 15 + DGS인가?"</h3>
                        <ul className="text-gray-700 space-y-1">
                            <li>• Next.js 15의 내장 GraphQL Client가 DGS와 완벽 호환</li>
                            <li>• Apollo Client 없이도 Server Components에서 직접 GraphQL 호출</li>
                            <li>• DGS 프레임워크는 <strong>Spring Boot 친화적</strong>이며 Netflix에서 실전 검증됨</li>
                            <li>• 타입스크립트 코드 생성으로 <strong>타입 안전성</strong> 확보</li>
                        </ul>
                    </div>

                    <div className="border-l-4 border-purple-400 bg-purple-50 p-4 rounded-r-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 "왜 JPA + jOOQ인가?"</h3>
                        <ul className="text-gray-700 space-y-1">
                            <li>• JPA로 유지보수성과 데이터 추상화 확보</li>
                            <li>• jOOQ로 성능과 복잡한 쿼리 대응 (통계, 보고서, 대시보드)</li>
                            <li>• JPA의 복잡한 Join/쿼리 한계 → jOOQ로 대체 (읽기 분리)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 3: Value Table */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">3. 차세대 아키텍처의 가치</h2>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">항목</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">가치</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-yellow-500" />
                                        생산성
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">Next.js 15 내장 GraphQL + DGS 통합으로 빠른 피처 개발</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        유지보수성
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">명확한 책임 분리 (API - Query - UI), 모듈화</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                        확장성
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">CQRS, GraphQL Federation 등을 통해 MSA 준비 가능</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-purple-500" />
                                        성능 최적화
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">필요한 데이터만 선택, 복잡한 쿼리도 jOOQ로 대응</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-red-500" />
                                        테스트 용이성
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-700">도메인 중심 테스트 (JPA), SQL 기반 테스트 (jOOQ), GraphQL Mocking</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Section 4: Considerations */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">4. 적용 시 고려사항</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {[
                        { title: '팀 경험', desc: 'JPA와 GraphQL 모두 러닝 커브 존재 – 팀 교육 필요' },
                        { title: '도메인 설계', desc: 'JPA는 엔티티 구조가 탄탄해야 유지보수 가능' },
                        { title: '리포트 기능', desc: 'SQL 복잡한 곳은 jOOQ 적극 활용' },
                        { title: 'API 설계', desc: 'GraphQL 스키마 정의와 문서화 전략 사전 수립' }
                    ].map((item, index) => (
                        <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 5: Architecture Diagram */}
            <section className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-900">5. 추천 아키텍처 구조</h2>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8">
                    <div className="flex flex-col items-center space-y-6">
                        {/* Frontend Layer */}
                        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-blue-300 w-full max-w-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Code className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-gray-800">Next.js 15 (App Router + Server Components)</span>
                            </div>
                            <p className="text-xs text-gray-600">React 19, Turbopack, PPR</p>
                        </div>

                        {/* Arrow Down */}
                        <div className="text-2xl text-gray-400">↓</div>

                        {/* Direct GraphQL Connection */}
                        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-green-300 w-full max-w-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Globe className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-gray-800">Built-in GraphQL Client</span>
                            </div>
                            <p className="text-xs text-gray-600">Apollo Client 불필요, 직접 연결</p>
                        </div>

                        {/* Arrow Down */}
                        <div className="text-2xl text-gray-400">↓</div>

                        {/* GraphQL Server */}
                        <div className="bg-white rounded-lg shadow-md p-4 border-2 border-purple-300 w-full max-w-lg text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Layers className="w-5 h-5 text-purple-600" />
                                <span className="font-semibold text-gray-800">Netflix DGS (GraphQL Server)</span>
                            </div>
                            <p className="text-xs text-gray-600">Spring Boot 3.x 기반</p>
                        </div>

                        {/* Arrows Down to Two Components */}
                        <div className="flex justify-center items-center space-x-8">
                            <div className="text-2xl text-gray-400">↙</div>
                            <div className="text-2xl text-gray-400">↘</div>
                        </div>

                        {/* Backend Components */}
                        <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
                            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-orange-300 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Database className="w-5 h-5 text-orange-600" />
                                    <span className="font-semibold text-gray-800">JPA / Domain</span>
                                </div>
                                <p className="text-xs text-gray-600">CRUD, 트랜잭션 처리</p>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-4 border-2 border-red-300 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Database className="w-5 h-5 text-red-600" />
                                    <span className="font-semibold text-gray-800">jOOQ / Report Query</span>
                                </div>
                                <p className="text-xs text-gray-600">복잡한 쿼리, 통계/리포트</p>
                            </div>
                        </div>

                        {/* CQRS Pattern Note */}
                        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 mt-4">
                            <p className="text-sm font-medium text-gray-800 text-center">
                                📋 CQRS 패턴: Command(JPA) ↔ Query(jOOQ) 분리
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArchitectureReport;