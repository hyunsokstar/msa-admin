"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, Package, ShoppingCart, Cpu, Bot } from 'lucide-react';

const SIMarketSurvey = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const marketData = {
        aiConsulting: {
            title: "AI 상담 시스템",
            icon: <Bot className="w-6 h-6" />,
            marketSize: "약 2조 2,000억원",
            growth: "연평균 25% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "AI 챗봇 고객 문의 자동화",
                        "병원/성형외과 AI 챗봇 서비스",
                        "AI 추천 시스템 구축"
                    ],
                    priceRange: "500만원 ~ 3,000만원"
                },
                {
                    name: "자체 솔루션",
                    projects: [
                        "채널톡 - ALF AI 에이전트",
                        "사이드톡 - 고객지원 AI 에이전트",
                        "삼성SDS - AI 컨택센터"
                    ],
                    priceRange: "월 30만원 ~ 500만원"
                }
            ],
            trends: [
                "24시간 무인 상담 시스템 수요 증가",
                "GPT, Claude 등 LLM 기반 솔루션 확대",
                "정부 복지상담 AI 도입 (101개 시군구)"
            ]
        },
        developerPortfolio: {
            title: "개발자 페이지 / 포트폴리오",
            icon: <Users className="w-6 h-6" />,
            marketSize: "연간 제작 건수 10,000건+",
            growth: "매년 30% 증가",
            platforms: [
                {
                    name: "크몽",
                    projects: [
                        "맞춤형 포트폴리오 웹사이트",
                        "반응형 개발자 페이지",
                        "기업 홈페이지 제작"
                    ],
                    priceRange: "30만원 ~ 500만원"
                },
                {
                    name: "위시켓",
                    projects: [
                        "React/Vue 기반 포트폴리오",
                        "풀스택 개발자 페이지",
                        "디자인 + 개발 통합 서비스"
                    ],
                    priceRange: "100만원 ~ 1,000만원"
                }
            ],
            trends: [
                "노코드/로우코드 플랫폼 활용 증가",
                "Wix, 카페24 빌더 등 템플릿 기반 제작",
                "월 10~15건 평균 제작 (프리랜서 기준)"
            ]
        },
        smartFactory: {
            title: "스마트 팩토리",
            icon: <Package className="w-6 h-6" />,
            marketSize: "글로벌 180억 달러 (2025년)",
            growth: "연평균 15% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "MES/POP 시스템 고도화",
                        "베트남 현지 MES/WMS 구축",
                        "스마트공장 통합 SI"
                    ],
                    priceRange: "3,000만원 ~ 2억원"
                },
                {
                    name: "정부지원사업",
                    projects: [
                        "스마트공장 구축비 50% 지원",
                        "제조실행시스템(MES) 도입",
                        "RFID/IoT 기반 물류관리"
                    ],
                    priceRange: "5,000만원 ~ 3억원"
                }
            ],
            trends: [
                "정부 스마트공장 지원사업 활성화",
                "PCB, 사출 업종 특화 MES 수요",
                "실시간 모니터링 시스템 필수화"
            ]
        },
        ecommerce: {
            title: "쇼핑몰",
            icon: <ShoppingCart className="w-6 h-6" />,
            marketSize: "연간 20,000건+ 제작",
            growth: "코로나 이후 40% 증가",
            platforms: [
                {
                    name: "크몽",
                    projects: [
                        "카페24 쇼핑몰 제작",
                        "메이크샵/고도몰 커스터마이징",
                        "반응형 브랜드 쇼핑몰"
                    ],
                    priceRange: "50만원 ~ 800만원"
                },
                {
                    name: "카페24 디자인센터",
                    projects: [
                        "프리미엄 스킨 개발",
                        "맞춤형 기능 개발",
                        "PG 연동 및 결제 시스템"
                    ],
                    priceRange: "200만원 ~ 2,000만원"
                }
            ],
            trends: [
                "카페24가 국내 쇼핑몰 제작 1위",
                "모바일 우선 반응형 디자인 필수",
                "네이버페이/카카오페이 연동 기본"
            ]
        },
        automation: {
            title: "업무 자동화",
            icon: <Cpu className="w-6 h-6" />,
            marketSize: "RPA 시장 1,800억원",
            growth: "연평균 30% 성장",
            platforms: [
                {
                    name: "크몽",
                    projects: [
                        "파이썬 웹크롤링/스크래핑",
                        "엑셀 VBA 매크로 개발",
                        "업무 자동화 RPA 프로그램"
                    ],
                    priceRange: "20만원 ~ 500만원"
                },
                {
                    name: "위시켓",
                    projects: [
                        "UiPath RPA 구축",
                        "Power Automate 자동화",
                        "파이썬 기반 업무 자동화"
                    ],
                    priceRange: "500만원 ~ 5,000만원"
                }
            ],
            trends: [
                "은행권 RPA 도입으로 125만 시간 절감",
                "UiPath, Power Automate 등 전문 툴 확산",
                "파이썬 크롤링이 가장 인기있는 서비스"
            ]
        }
    };

    const ProjectCard = ({ platform }: { platform: { name: string; projects: string[]; priceRange: string } }) => (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">{platform.name}</h4>
            <div className="space-y-2">
                <div>
                    <p className="text-sm text-gray-600 mb-1">주요 프로젝트:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        {platform.projects.map((project, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>{project}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm">
                        <span className="text-gray-600">예상 비용:</span>
                        <span className="ml-2 font-semibold text-green-600">{platform.priceRange}</span>
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        프리랜서 플랫폼 SI 시장 조사 보고서
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-gray-600">조사 플랫폼</p>
                            <p className="font-semibold text-gray-800">위시켓, 크몽</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-gray-600">조사 기간</p>
                            <p className="font-semibold text-gray-800">2025년 2월</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                            <p className="text-gray-600">총 시장 규모</p>
                            <p className="font-semibold text-gray-800">약 5조원+</p>
                        </div>
                    </div>
                </div>

                {/* Market Sections */}
                <div className="space-y-6">
                    {Object.entries(marketData).map(([key, section]) => (
                        <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Section Header */}
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-colors"
                                onClick={() => toggleSection(key)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {section.icon}
                                        <div>
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                            <div className="flex items-center space-x-4 mt-2 text-sm">
                                                <span className="bg-white/20 px-3 py-1 rounded-full">
                                                    시장 규모: {section.marketSize}
                                                </span>
                                                <span className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    {section.growth}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedSections[key] ?
                                        <ChevronDown className="w-6 h-6" /> :
                                        <ChevronRight className="w-6 h-6" />
                                    }
                                </div>
                            </div>

                            {/* Section Content */}
                            {expandedSections[key] && (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                        {section.platforms.map((platform, idx) => (
                                            <ProjectCard key={idx} platform={platform} />
                                        ))}
                                    </div>

                                    {/* Trends */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                                            시장 트렌드
                                        </h4>
                                        <ul className="space-y-2">
                                            {section.trends.map((trend, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-700">
                                                    <span className="text-indigo-500 mr-2 mt-0.5">▸</span>
                                                    <span>{trend}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">시장 분석 요약</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">🔥 가장 활발한 분야</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 쇼핑몰 제작 (카페24 중심)</li>
                                    <li>• 파이썬 기반 업무 자동화</li>
                                    <li>• AI 챗봇 상담 시스템</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">💰 평균 프로젝트 규모</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 소규모: 50~300만원</li>
                                    <li>• 중규모: 500~2,000만원</li>
                                    <li>• 대규모: 3,000만원~2억원</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">📈 성장 전망</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• RPA/자동화 시장 30% 성장</li>
                                    <li>• AI 상담 시스템 25% 성장</li>
                                    <li>• 스마트팩토리 정부지원 확대</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">🎯 주요 기회</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 중소기업 디지털 전환 수요</li>
                                    <li>• 정부 지원사업 활용</li>
                                    <li>• AI/자동화 기술 도입 확산</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIMarketSurvey;