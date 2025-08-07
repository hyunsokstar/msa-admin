'use client';

import React, { useState } from 'react';

export default function VectorDataStrategyPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (section: string | null) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Vector Database 실무 적용 가이드
                            </h1>
                            <p className="mt-2 text-gray-600">RAG 시스템 구축을 위한 벡터 DB 활용 전략 및 실제 사례</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                v2.0
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                Last Updated: 2024.12
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 py-4" aria-label="Tabs">
                        {[
                            { id: 'overview', name: '개요', icon: '📊' },
                            { id: 'cases', name: '실제 사례', icon: '💼' },
                            { id: 'technical', name: '기술 스펙', icon: '⚙️' },
                            { id: 'implementation', name: '구현 가이드', icon: '🚀' },
                            { id: 'bestpractices', name: '베스트 프랙티스', icon: '✨' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    } px-3 py-2 font-medium text-sm transition-colors duration-200 flex items-center gap-2`}
                            >
                                <span>{tab.icon}</span>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* RAG Architecture */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">RAG (Retrieval-Augmented Generation) 아키텍처</h2>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl mb-2">1️⃣</div>
                                        <h3 className="font-semibold text-lg mb-2">Data Ingestion</h3>
                                        <p className="text-gray-600 text-sm">문서 수집 → 청킹 → 임베딩 생성 → 벡터 DB 저장</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl mb-2">2️⃣</div>
                                        <h3 className="font-semibold text-lg mb-2">Retrieval</h3>
                                        <p className="text-gray-600 text-sm">쿼리 임베딩 → 유사도 검색 → 컨텍스트 추출</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="text-3xl mb-2">3️⃣</div>
                                        <h3 className="font-semibold text-lg mb-2">Generation</h3>
                                        <p className="text-gray-600 text-sm">컨텍스트 + 프롬프트 → LLM → 최종 답변</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="text-blue-600 text-2xl font-bold">85%+</div>
                                <div className="text-gray-600 text-sm mt-1">정확도 향상</div>
                                <div className="text-xs text-gray-500 mt-2">RAG 적용 시 평균</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="text-green-600 text-2xl font-bold">60%</div>
                                <div className="text-gray-600 text-sm mt-1">비용 절감</div>
                                <div className="text-xs text-gray-500 mt-2">Fine-tuning 대비</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="text-purple-600 text-2xl font-bold">200ms</div>
                                <div className="text-gray-600 text-sm mt-1">평균 응답시간</div>
                                <div className="text-xs text-gray-500 mt-2">벡터 검색 기준</div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <div className="text-orange-600 text-2xl font-bold">10M+</div>
                                <div className="text-gray-600 text-sm mt-1">처리 가능 문서</div>
                                <div className="text-xs text-gray-500 mt-2">단일 인스턴스</div>
                            </div>
                        </div>

                        {/* Vector DB Strategy */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">벡터 DB 데이터 저장 전략</h2>
                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-500 pl-4 py-2">
                                    <h3 className="font-semibold text-lg">청킹 전략</h3>
                                    <ul className="mt-2 space-y-1 text-gray-600">
                                        <li>• 최적 크기: 200-800 토큰 (한국어 400-1500자)</li>
                                        <li>• 오버랩: 20-30% 적용으로 문맥 유지</li>
                                        <li>• 의미 단위로 분할 (문단, 섹션 기준)</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4 py-2">
                                    <h3 className="font-semibold text-lg">메타데이터 설계</h3>
                                    <ul className="mt-2 space-y-1 text-gray-600">
                                        <li>• 카테고리, 날짜, 우선순위 필수 포함</li>
                                        <li>• 도메인별 특화 필드 추가</li>
                                        <li>• 필터링 성능을 위한 인덱싱</li>
                                    </ul>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4 py-2">
                                    <h3 className="font-semibold text-lg">하이브리드 검색</h3>
                                    <ul className="mt-2 space-y-1 text-gray-600">
                                        <li>• 키워드 검색 (BM25) + 의미 검색 (Vector)</li>
                                        <li>• 메타데이터 필터링 조합</li>
                                        <li>• Re-ranking으로 정확도 향상</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Real Cases Tab */}
                {activeTab === 'cases' && (
                    <div className="space-y-6">
                        {/* Korean Air Case */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    ✈️ 대한항공 고객 서비스 챗봇
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">구현 내용</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>데이터 구성:</strong> 운임규정, 수하물 정책, 마일리지, FAQ 등 15,000+ 문서
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>메타데이터:</strong> 노선별, 클래스별, 시즌별 세분화
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>특별 기능:</strong> 실시간 운항 정보 API 연동
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">성과</h3>
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">78%</div>
                                                    <div className="text-sm text-gray-600">상담 자동 처리율</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-green-600">45%</div>
                                                    <div className="text-sm text-gray-600">상담 시간 단축</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                            <strong>핵심 성공 요인:</strong> 시즌별 프로모션 자동 업데이트 시스템
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Call Center Case */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    📞 금융사 콜센터 AI 어시스턴트
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">구현 내용</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>데이터 구성:</strong> 3년간 상담 로그 200만건 벡터화
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>특화 기능:</strong> 감정 분석 + 우선순위 자동 분류
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>보안:</strong> PII 자동 마스킹, 권한별 접근 제어
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">성과</h3>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-green-600">92%</div>
                                                    <div className="text-sm text-gray-600">상담사 만족도</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-blue-600">3.2초</div>
                                                    <div className="text-sm text-gray-600">평균 답변 검색</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                            <strong>핵심 성공 요인:</strong> 상담사 피드백 실시간 반영 시스템
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* E-commerce Case */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    🛍️ 이커머스 상품 추천 시스템
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">구현 내용</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>데이터 구성:</strong> 상품 100만개 + 리뷰 500만개
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>멀티모달:</strong> 이미지-텍스트 통합 임베딩
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>개인화:</strong> 사용자 행동 패턴 벡터화
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">성과</h3>
                                        <div className="bg-purple-50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-purple-600">34%</div>
                                                    <div className="text-sm text-gray-600">전환율 증가</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-orange-600">2.8x</div>
                                                    <div className="text-sm text-gray-600">체류시간 증가</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                            <strong>핵심 성공 요인:</strong> 실시간 재고 연동 + 개인화 알고리즘
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Manufacturing Case */}
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    🔧 제조업 기술 문서 검색 시스템
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">구현 내용</h3>
                                        <ul className="space-y-2">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>데이터 구성:</strong> 기술 매뉴얼, CAD 도면, 수리 이력
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>특화 기능:</strong> 부품 번호 자동 인식, 호환성 체크
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <div>
                                                    <strong>AR 연동:</strong> 모바일 AR로 실시간 매뉴얼 표시
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3">성과</h3>
                                        <div className="bg-orange-50 rounded-lg p-4">
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div>
                                                    <div className="text-2xl font-bold text-orange-600">65%</div>
                                                    <div className="text-sm text-gray-600">수리 시간 단축</div>
                                                </div>
                                                <div>
                                                    <div className="text-2xl font-bold text-red-600">89%</div>
                                                    <div className="text-sm text-gray-600">첫 수리 성공률</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-gray-50 rounded text-sm">
                                            <strong>핵심 성공 요인:</strong> 다국어 지원 + 도면 OCR 통합
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Technical Specs Tab */}
                {activeTab === 'technical' && (
                    <div className="space-y-6">
                        {/* Database Comparison */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">주요 벡터 DB 비교</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                데이터베이스
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                특징
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                성능
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                가격
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                적합한 사용 사례
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">pgvector</div>
                                                <div className="text-sm text-gray-500">PostgreSQL Extension</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                • PostgreSQL 통합<br />
                                                • ACID 트랜잭션<br />
                                                • SQL 지원
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    중간
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                오픈소스
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                기존 PostgreSQL 사용 환경
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">Pinecone</div>
                                                <div className="text-sm text-gray-500">Managed Service</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                • 완전 관리형<br />
                                                • 자동 스케일링<br />
                                                • 실시간 업데이트
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    높음
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                $0.096/시간~
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                빠른 프로토타이핑, SaaS
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">Weaviate</div>
                                                <div className="text-sm text-gray-500">Open Source</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                • GraphQL API<br />
                                                • 멀티모달 지원<br />
                                                • 모듈화 구조
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    높음
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                오픈소스 / Cloud
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                복잡한 검색 요구사항
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">Milvus</div>
                                                <div className="text-sm text-gray-500">Open Source</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                • 대규모 확장성<br />
                                                • GPU 가속<br />
                                                • 다양한 인덱스
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    매우 높음
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                오픈소스
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                대규모 엔터프라이즈
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* pgVector Details */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">pgVector 상세 스펙</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">기능 사양</h3>
                                    <div className="space-y-3">
                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-medium">지원 벡터 크기</h4>
                                            <p className="text-sm text-gray-600">최대 16,000 차원</p>
                                        </div>
                                        <div className="border-l-4 border-green-500 pl-4">
                                            <h4 className="font-medium">인덱스 타입</h4>
                                            <p className="text-sm text-gray-600">IVFFlat, HNSW (v0.5.0+)</p>
                                        </div>
                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <h4 className="font-medium">거리 메트릭</h4>
                                            <p className="text-sm text-gray-600">L2, 내적, 코사인 유사도</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">설치 및 설정</h3>
                                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                                        <div className="mb-2"># PostgreSQL Extension 설치</div>
                                        <div className="text-gray-400">CREATE EXTENSION vector;</div>
                                        <div className="mt-2"># 테이블 생성</div>
                                        <div className="text-gray-400">CREATE TABLE items (</div>
                                        <div className="text-gray-400 ml-4">id bigserial PRIMARY KEY,</div>
                                        <div className="text-gray-400 ml-4">content text,</div>
                                        <div className="text-gray-400 ml-4">embedding vector(1536)</div>
                                        <div className="text-gray-400">);</div>
                                        <div className="mt-2"># 인덱스 생성</div>
                                        <div className="text-gray-400">CREATE INDEX ON items</div>
                                        <div className="text-gray-400">USING hnsw (embedding vector_cosine_ops);</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Embedding Models */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">임베딩 모델 선택 가이드</h2>
                            <div className="space-y-4">
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-blue-50 px-4 py-2 font-semibold">한국어 특화 모델</div>
                                    <div className="p-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="border-l-4 border-blue-400 pl-3">
                                                <h4 className="font-medium">KoSimCSE-RoBERTa</h4>
                                                <p className="text-sm text-gray-600">차원: 768, 성능: ★★★★☆</p>
                                            </div>
                                            <div className="border-l-4 border-blue-400 pl-3">
                                                <h4 className="font-medium">KoBERT</h4>
                                                <p className="text-sm text-gray-600">차원: 768, 성능: ★★★☆☆</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border rounded-lg overflow-hidden">
                                    <div className="bg-green-50 px-4 py-2 font-semibold">다국어 모델</div>
                                    <div className="p-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="border-l-4 border-green-400 pl-3">
                                                <h4 className="font-medium">multilingual-e5-large</h4>
                                                <p className="text-sm text-gray-600">차원: 1024, 성능: ★★★★★</p>
                                            </div>
                                            <div className="border-l-4 border-green-400 pl-3">
                                                <h4 className="font-medium">OpenAI text-embedding-3</h4>
                                                <p className="text-sm text-gray-600">차원: 1536/3072, 성능: ★★★★★</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Implementation Guide Tab */}
                {activeTab === 'implementation' && (
                    <div className="space-y-6">
                        {/* Step by Step Guide */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">단계별 구현 가이드</h2>

                            {/* Step 1 */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <h3 className="ml-3 text-lg font-semibold">데이터 준비 및 전처리</h3>
                                </div>
                                <div className="ml-13 bg-gray-50 rounded-lg p-4">
                                    <pre className="text-sm overflow-x-auto">
                                        {`# 데이터 전처리 예시
import pandas as pd
from langchain.text_splitter import RecursiveCharacterTextSplitter

def prepare_documents(documents):
    # 텍스트 분할기 설정
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100,
        separators=["\\n\\n", "\\n", ".", " "]
    )
    
    # 메타데이터 추가
    chunks = []
    for doc in documents:
        splits = text_splitter.split_text(doc['content'])
        for i, chunk in enumerate(splits):
            chunks.append({
                'text': chunk,
                'metadata': {
                    'source': doc['source'],
                    'category': doc['category'],
                    'chunk_index': i,
                    'created_at': datetime.now()
                }
            })
    return chunks`}
                                    </pre>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <h3 className="ml-3 text-lg font-semibold">임베딩 생성 및 저장</h3>
                                </div>
                                <div className="ml-13 bg-gray-50 rounded-lg p-4">
                                    <pre className="text-sm overflow-x-auto">
                                        {`# 임베딩 생성 및 pgvector 저장
from sentence_transformers import SentenceTransformer
import psycopg2
from pgvector.psycopg2 import register_vector

# 모델 로드
model = SentenceTransformer('jhgan/ko-sroberta-multitask')

# DB 연결
conn = psycopg2.connect(database="vectordb", user="user", password="pass")
register_vector(conn)

def store_embeddings(chunks):
    cur = conn.cursor()
    for chunk in chunks:
        # 임베딩 생성
        embedding = model.encode(chunk['text'])
        
        # DB 저장
        cur.execute(
            "INSERT INTO documents (content, embedding, metadata) VALUES (%s, %s, %s)",
            (chunk['text'], embedding.tolist(), json.dumps(chunk['metadata']))
        )
    conn.commit()`}
                                    </pre>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="mb-6">
                                <div className="flex items-center mb-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <h3 className="ml-3 text-lg font-semibold">검색 및 응답 생성</h3>
                                </div>
                                <div className="ml-13 bg-gray-50 rounded-lg p-4">
                                    <pre className="text-sm overflow-x-auto">
                                        {`# RAG 검색 및 응답 생성
def search_and_generate(query, k=5):
    # 쿼리 임베딩
    query_embedding = model.encode(query)
    
    # 유사도 검색
    cur.execute("""
        SELECT content, metadata, 
               1 - (embedding <=> %s) as similarity
        FROM documents
        WHERE metadata->>'category' = %s
        ORDER BY embedding <=> %s
        LIMIT %s
    """, (query_embedding.tolist(), category, query_embedding.tolist(), k))
    
    results = cur.fetchall()
    
    # LLM 프롬프트 구성
    context = "\\n".join([r[0] for r in results])
    prompt = f"""
    다음 컨텍스트를 기반으로 질문에 답변해주세요:
    
    컨텍스트: {context}
    
    질문: {query}
    
    답변:
    """
    
    # LLM 호출 (OpenAI, Claude 등)
    response = llm.generate(prompt)
    return response`}
                                    </pre>
                                </div>
                            </div>
                        </div>

                        {/* Architecture Patterns */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">아키텍처 패턴</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🏗️</span> 기본 RAG 패턴
                                    </h3>
                                    <div className="bg-blue-50 rounded p-3 text-sm">
                                        <div>1. 문서 → 청킹 → 임베딩</div>
                                        <div>2. 벡터 DB 저장</div>
                                        <div>3. 쿼리 → 검색 → LLM → 응답</div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">
                                        <strong>적합한 경우:</strong> 단순 Q&A, FAQ 챗봇
                                    </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🔄</span> 하이브리드 검색 패턴
                                    </h3>
                                    <div className="bg-green-50 rounded p-3 text-sm">
                                        <div>1. 키워드 검색 (BM25)</div>
                                        <div>2. 벡터 검색 (Semantic)</div>
                                        <div>3. 결과 통합 및 Re-ranking</div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">
                                        <strong>적합한 경우:</strong> 기술 문서, 법률 문서
                                    </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🎯</span> 멀티 스테이지 패턴
                                    </h3>
                                    <div className="bg-purple-50 rounded p-3 text-sm">
                                        <div>1. Coarse 검색 (카테고리)</div>
                                        <div>2. Fine 검색 (시맨틱)</div>
                                        <div>3. 컨텍스트 확장</div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">
                                        <strong>적합한 경우:</strong> 대규모 문서, 복잡한 도메인
                                    </p>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                        <span className="text-2xl">🔗</span> 에이전트 기반 패턴
                                    </h3>
                                    <div className="bg-orange-50 rounded p-3 text-sm">
                                        <div>1. 쿼리 분석 및 계획</div>
                                        <div>2. 다중 도구 활용</div>
                                        <div>3. 반복적 검색 및 추론</div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">
                                        <strong>적합한 경우:</strong> 복잡한 추론, 멀티턴 대화
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Best Practices Tab */}
                {activeTab === 'bestpractices' && (
                    <div className="space-y-6">
                        {/* Data Strategy */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">데이터 전략 베스트 프랙티스</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: '청킹 최적화',
                                        icon: '✂️',
                                        color: 'blue',
                                        items: [
                                            '의미 단위로 분할 (문단, 섹션)',
                                            '도메인별 최적 크기 실험 (200-800 토큰)',
                                            '오버랩 20-30% 유지로 문맥 보존',
                                            '테이블/리스트는 별도 처리'
                                        ]
                                    },
                                    {
                                        title: '메타데이터 설계',
                                        icon: '🏷️',
                                        color: 'green',
                                        items: [
                                            '필수: source, date, category',
                                            '선택: author, version, language',
                                            '계층 구조 활용 (대분류 > 중분류 > 소분류)',
                                            '필터링 성능을 위한 인덱싱'
                                        ]
                                    },
                                    {
                                        title: '임베딩 품질',
                                        icon: '🎯',
                                        color: 'purple',
                                        items: [
                                            '도메인 특화 모델 선택 또는 파인튜닝',
                                            '다국어 지원 시 unified 모델 사용',
                                            '정기적인 임베딩 재생성 (모델 업데이트 시)',
                                            'A/B 테스트로 모델 성능 비교'
                                        ]
                                    },
                                    {
                                        title: '업데이트 전략',
                                        icon: '🔄',
                                        color: 'orange',
                                        items: [
                                            '증분 업데이트 vs 전체 재색인',
                                            '버전 관리 시스템 구축',
                                            '삭제된 문서 처리 방안',
                                            '실시간 vs 배치 업데이트 선택'
                                        ]
                                    }
                                ].map((section, idx) => (
                                    <div key={idx} className="border-l-4 border-{section.color}-500 pl-4">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            <span className="text-2xl">{section.icon}</span>
                                            {section.title}
                                        </h3>
                                        <ul className="mt-2 space-y-1">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="text-gray-600 flex items-start gap-2">
                                                    <span className="text-green-500 mt-1">✓</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Performance Optimization */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">성능 최적화 전략</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">검색 성능</h3>
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <h4 className="font-medium text-sm mb-1">인덱싱 전략</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• HNSW: 높은 정확도, 메모리 사용 ↑</li>
                                                <li>• IVFFlat: 빠른 속도, 정확도 trade-off</li>
                                                <li>• 하이브리드: 카테고리별 다른 인덱스</li>
                                            </ul>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <h4 className="font-medium text-sm mb-1">캐싱 전략</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• 자주 검색되는 쿼리 캐싱</li>
                                                <li>• 임베딩 결과 Redis 저장</li>
                                                <li>• TTL 설정으로 자동 갱신</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-3">응답 품질</h3>
                                    <div className="space-y-3">
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <h4 className="font-medium text-sm mb-1">Re-ranking</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• Cross-encoder로 정밀 순위 조정</li>
                                                <li>• 메타데이터 가중치 적용</li>
                                                <li>• 사용자 피드백 반영</li>
                                            </ul>
                                        </div>
                                        <div className="bg-orange-50 rounded-lg p-3">
                                            <h4 className="font-medium text-sm mb-1">컨텍스트 최적화</h4>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                <li>• 중복 제거 알고리즘</li>
                                                <li>• 관련성 점수 임계값 설정</li>
                                                <li>• 동적 컨텍스트 크기 조정</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Monitoring & Evaluation */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">모니터링 및 평가</h2>
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <span className="text-xl">📊</span> 핵심 메트릭
                                        </h3>
                                        <ul className="text-sm space-y-1 text-gray-600">
                                            <li>• Precision@K</li>
                                            <li>• Recall@K</li>
                                            <li>• MRR (Mean Reciprocal Rank)</li>
                                            <li>• 응답 시간 (p50, p95, p99)</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <span className="text-xl">🔍</span> 품질 평가
                                        </h3>
                                        <ul className="text-sm space-y-1 text-gray-600">
                                            <li>• 답변 관련성 점수</li>
                                            <li>• 할루시네이션 검출</li>
                                            <li>• 사용자 만족도</li>
                                            <li>• A/B 테스트 결과</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <span className="text-xl">🛠️</span> 운영 모니터링
                                        </h3>
                                        <ul className="text-sm space-y-1 text-gray-600">
                                            <li>• 시스템 리소스 사용률</li>
                                            <li>• 에러율 및 실패 패턴</li>
                                            <li>• 데이터 freshness</li>
                                            <li>• 비용 대비 효과</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Common Pitfalls */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">자주 하는 실수와 해결책</h2>
                            <div className="space-y-4">
                                {[
                                    {
                                        mistake: '너무 큰 청크 사이즈',
                                        impact: '관련 없는 정보 포함, 정확도 저하',
                                        solution: '200-500 토큰으로 시작, A/B 테스트로 최적화'
                                    },
                                    {
                                        mistake: '메타데이터 부족',
                                        impact: '필터링 불가, 컨텍스트 손실',
                                        solution: '처음부터 풍부한 메타데이터 설계'
                                    },
                                    {
                                        mistake: '단일 검색 전략',
                                        impact: '특정 쿼리 타입에서 성능 저하',
                                        solution: '하이브리드 검색 (키워드 + 시맨틱) 구현'
                                    },
                                    {
                                        mistake: '임베딩 모델 미스매치',
                                        impact: '도메인 특성 반영 못함',
                                        solution: '도메인 데이터로 파인튜닝 또는 특화 모델 선택'
                                    },
                                    {
                                        mistake: '업데이트 전략 부재',
                                        impact: '오래된 정보 제공, 일관성 문제',
                                        solution: '정기적 재색인, 버전 관리 시스템'
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                                                !
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-semibold text-red-700">{item.mistake}</h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    <strong>영향:</strong> {item.impact}
                                                </p>
                                                <p className="text-sm text-green-700 mt-1">
                                                    <strong>해결:</strong> {item.solution}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}