"use client";

import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    Users,
    DollarSign,
    Briefcase,
    Code,
    BarChart3,
    Calendar,
    ChevronRight,
    Globe,
    Cpu,
    Building2,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

// 플랫폼 인터페이스 정의
interface Platform {
    id: string;
    name: string;
    freelancers?: string;
    companies?: string;
    projects?: string;
    totalAmount?: string;
    avgResponse?: string;
    services?: string;
    categories?: string;
    minPrice?: string;
    experience?: string;
    reorderRate?: string;
    responseTime?: string;
    features: string[];
    color: string;
}

// 개발자 단가 타입 정의
interface DeveloperRate {
    rate: number;
    change: number;
}

interface DeveloperRates {
    junior: DeveloperRate;
    mid: DeveloperRate;
    senior: DeveloperRate;
}

// 프로젝트 트렌드 타입 정의
interface ProjectTrend {
    name: string;
    growth: number;
    demand: 'very-high' | 'high' | 'medium' | 'low';
}

// AI 트렌드 타입 정의
interface AITrend {
    trend: string;
    description: string;
    impact: number;
}

// 정부지원 카테고리 타입 정의
interface GovCategory {
    name: string;
    amount: string;
    projects: number;
}

interface GovSupport {
    total: string;
    change: number;
    categories: GovCategory[];
}

const ITBusinessPlanPage = () => {
    const [selectedTab, setSelectedTab] = useState<string>('overview');
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

    // 플랫폼 데이터
    const platforms: Platform[] = [
        {
            id: 'wishket',
            name: '위시켓',
            freelancers: '11만',
            companies: '10만',
            projects: '5만+',
            totalAmount: '9,000억원',
            avgResponse: '2시간',
            features: ['24시간 매니저 상담', '안심 계약 시스템', '정부지원사업 전문'],
            color: 'blue'
        },
        {
            id: 'kmong',
            name: '크몽',
            freelancers: '100만+',
            companies: '6,800+',
            services: '62,949개',
            categories: '700+',
            minPrice: '5,000원',
            features: ['Prime 서비스', '엔터프라이즈', '노코드 플랫폼'],
            color: 'green'
        },
        {
            id: 'elancer',
            name: '이랜서',
            experience: '26년',
            reorderRate: '98%',
            responseTime: '24시간',
            features: ['높은 재의뢰율', '빠른 매칭', '축적된 노하우'],
            color: 'purple'
        },
        {
            id: 'wantedgigs',
            name: '원티드긱스',
            features: ['1:1 매칭매니저', '법률 지원', '고급 인재풀'],
            responseTime: '1일',
            color: 'orange'
        }
    ];

    // 개발자 단가 데이터
    const developerRates: Record<string, DeveloperRates> = {
        frontend: {
            junior: { rate: 425, change: 5.2 },
            mid: { rate: 533, change: -2.1 },
            senior: { rate: 758, change: 12.5 }
        },
        backend: {
            junior: { rate: 410, change: 3.8 },
            mid: { rate: 570, change: 4.2 },
            senior: { rate: 750, change: 8.1 }
        },
        fullstack: {
            junior: { rate: 391, change: 6.5 },
            mid: { rate: 561, change: 2.3 },
            senior: { rate: 750, change: 0 }
        }
    };

    // 프로젝트 트렌드
    const projectTrends: ProjectTrend[] = [
        { name: 'AI 챗봇 개발', growth: 185, demand: 'very-high' },
        { name: '플랫폼 개발', growth: 42, demand: 'high' },
        { name: 'ERP/CRM 시스템', growth: 28, demand: 'high' },
        { name: '이커머스', growth: 35, demand: 'medium' },
        { name: '블록체인', growth: -12, demand: 'low' },
        { name: 'AI 자동화', growth: 220, demand: 'very-high' }
    ];

    // 2025 AI 트렌드
    const aiTrends: AITrend[] = [
        { trend: 'AI 에이전트', description: '자율적 업무 수행 AI', impact: 95 },
        { trend: '온디바이스 AI', description: '클라우드 독립적 AI', impact: 88 },
        { trend: '멀티모달 AI', description: '다중 입력 처리 AI', impact: 82 },
        { trend: 'AI 코딩 어시스턴트', description: '개발 생산성 향상', impact: 90 }
    ];

    // 정부지원사업 현황
    const govSupport: GovSupport = {
        total: '3조 2,940억원',
        change: -13.2,
        categories: [
            { name: '융자', amount: '1조 5,552억원', projects: 12 },
            { name: '사업화', amount: '7,666억원', projects: 169 },
            { name: '기술개발', amount: '6,292억원', projects: 8 },
            { name: '시설·공간', amount: '1,501억원', projects: 123 },
            { name: '글로벌진출', amount: '1,233억원', projects: 21 }
        ]
    };

    const getDemandColor = (demand: string): string => {
        switch (demand) {
            case 'very-high': return 'text-red-600';
            case 'high': return 'text-orange-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-gray-600';
            default: return 'text-gray-600';
        }
    };

    const getChangeIcon = (change: number): JSX.Element | null => {
        if (change > 0) return <ArrowUpRight className="w-4 h-4 text-green-500" />;
        if (change < 0) return <ArrowDownRight className="w-4 h-4 text-red-500" />;
        return null;
    };

    const getDemandText = (demand: string): string => {
        switch (demand) {
            case 'very-high': return '매우 높음';
            case 'high': return '높음';
            case 'medium': return '보통';
            case 'low': return '낮음';
            default: return '보통';
        }
    };

    const getLevelText = (level: string): string => {
        switch (level) {
            case 'junior': return '주니어 (1-3년)';
            case 'mid': return '미드 (3-6년)';
            case 'senior': return '시니어 (6년+)';
            default: return level;
        }
    };

    const getTypeText = (type: string): string => {
        switch (type) {
            case 'frontend': return '프론트엔드';
            case 'backend': return '백엔드';
            case 'fullstack': return '풀스택';
            default: return type;
        }
    };

    const getTabText = (tab: string): string => {
        switch (tab) {
            case 'overview': return '개요';
            case 'platforms': return '플랫폼';
            case 'rates': return '개발자 단가';
            case 'trends': return '트렌드';
            case 'government': return '정부지원';
            default: return tab;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        IT Business Plan Dashboard 2025
                    </h1>
                    <p className="text-gray-600">실시간 IT 프로젝트 시장 분석 및 트렌드 리포트</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-200">
                    {['overview', 'platforms', 'rates', 'trends', 'government'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`pb-4 px-2 font-medium transition-colors ${selectedTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {getTabText(tab)}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {selectedTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Users className="w-10 h-10 text-blue-500" />
                                <span className="text-sm text-green-600 font-medium">+23%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">250만+</h3>
                            <p className="text-gray-600 mt-1">활동 프리랜서</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Briefcase className="w-10 h-10 text-green-500" />
                                <span className="text-sm text-green-600 font-medium">+42%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">15만+</h3>
                            <p className="text-gray-600 mt-1">진행 프로젝트</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <DollarSign className="w-10 h-10 text-purple-500" />
                                <span className="text-sm text-green-600 font-medium">+15%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">2.5조원</h3>
                            <p className="text-gray-600 mt-1">연간 거래액</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <TrendingUp className="w-10 h-10 text-orange-500" />
                                <span className="text-sm text-green-600 font-medium">+185%</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">AI 프로젝트</h3>
                            <p className="text-gray-600 mt-1">최고 성장률</p>
                        </div>
                    </div>
                )}

                {/* Platforms Tab */}
                {selectedTab === 'platforms' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {platforms.map((platform) => (
                            <div
                                key={platform.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => setSelectedPlatform(platform)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {platform.freelancers && (
                                        <div>
                                            <p className="text-sm text-gray-600">프리랜서</p>
                                            <p className="text-lg font-semibold">{platform.freelancers}</p>
                                        </div>
                                    )}
                                    {platform.companies && (
                                        <div>
                                            <p className="text-sm text-gray-600">기업</p>
                                            <p className="text-lg font-semibold">{platform.companies}</p>
                                        </div>
                                    )}
                                    {platform.projects && (
                                        <div>
                                            <p className="text-sm text-gray-600">프로젝트</p>
                                            <p className="text-lg font-semibold">{platform.projects}</p>
                                        </div>
                                    )}
                                    {platform.services && (
                                        <div>
                                            <p className="text-sm text-gray-600">서비스</p>
                                            <p className="text-lg font-semibold">{platform.services}</p>
                                        </div>
                                    )}
                                    {platform.experience && (
                                        <div>
                                            <p className="text-sm text-gray-600">경력</p>
                                            <p className="text-lg font-semibold">{platform.experience}</p>
                                        </div>
                                    )}
                                    {platform.reorderRate && (
                                        <div>
                                            <p className="text-sm text-gray-600">재의뢰율</p>
                                            <p className="text-lg font-semibold">{platform.reorderRate}</p>
                                        </div>
                                    )}
                                    {platform.totalAmount && (
                                        <div>
                                            <p className="text-sm text-gray-600">총 거래액</p>
                                            <p className="text-lg font-semibold">{platform.totalAmount}</p>
                                        </div>
                                    )}
                                    {platform.avgResponse && (
                                        <div>
                                            <p className="text-sm text-gray-600">평균 응답</p>
                                            <p className="text-lg font-semibold">{platform.avgResponse}</p>
                                        </div>
                                    )}
                                    {platform.responseTime && (
                                        <div>
                                            <p className="text-sm text-gray-600">응답 시간</p>
                                            <p className="text-lg font-semibold">{platform.responseTime}</p>
                                        </div>
                                    )}
                                    {platform.categories && (
                                        <div>
                                            <p className="text-sm text-gray-600">카테고리</p>
                                            <p className="text-lg font-semibold">{platform.categories}</p>
                                        </div>
                                    )}
                                    {platform.minPrice && (
                                        <div>
                                            <p className="text-sm text-gray-600">최소 가격</p>
                                            <p className="text-lg font-semibold">{platform.minPrice}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    {platform.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rates Tab */}
                {selectedTab === 'rates' && (
                    <div className="space-y-6">
                        {Object.entries(developerRates).map(([type, levels]) => (
                            <div key={type} className="bg-white rounded-xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {getTypeText(type)} 개발자 월 단가
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Object.entries(levels).map(([level, data]) => (
                                        <div key={level} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm font-medium text-gray-600 uppercase">
                                                    {getLevelText(level)}
                                                </span>
                                                <div className="flex items-center">
                                                    {getChangeIcon(data.change)}
                                                    <span className={`text-sm ml-1 ${data.change > 0 ? 'text-green-600' :
                                                        data.change < 0 ? 'text-red-600' : 'text-gray-600'
                                                        }`}>
                                                        {Math.abs(data.change)}%
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {data.rate.toLocaleString()}만원
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Trends Tab */}
                {selectedTab === 'trends' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Project Trends */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">프로젝트 트렌드</h3>
                            <div className="space-y-4">
                                {projectTrends.map((trend, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{trend.name}</p>
                                            <div className="flex items-center mt-1">
                                                <span className={`text-sm ${getDemandColor(trend.demand)}`}>
                                                    {getDemandText(trend.demand)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {trend.growth > 0 ? (
                                                <ArrowUpRight className="w-5 h-5 text-green-500 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="w-5 h-5 text-red-500 mr-1" />
                                            )}
                                            <span className={`font-bold ${trend.growth > 0 ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {trend.growth > 0 ? '+' : ''}{trend.growth}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AI Trends */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">2025 AI 트렌드</h3>
                            <div className="space-y-4">
                                {aiTrends.map((trend, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-medium text-gray-900">{trend.trend}</p>
                                                <p className="text-sm text-gray-600">{trend.description}</p>
                                            </div>
                                            <span className="text-sm font-bold text-blue-600">
                                                {trend.impact}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                                                style={{ width: `${trend.impact}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Government Tab */}
                {selectedTab === 'government' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">2025년 정부지원사업</h3>
                                    <p className="text-3xl font-bold text-blue-600 mt-2">{govSupport.total}</p>
                                </div>
                                <div className="flex items-center">
                                    <ArrowDownRight className="w-5 h-5 text-red-500 mr-1" />
                                    <span className="text-red-600 font-bold">{Math.abs(govSupport.change)}%</span>
                                    <span className="text-sm text-gray-600 ml-2">전년 대비</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {govSupport.categories.map((category, idx) => (
                                    <div key={idx} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                                            <span className="text-sm text-gray-600">{category.projects}개</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{category.amount}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start">
                                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-yellow-800">
                                            <strong>주요 변화:</strong> 융자 예산 5,000억원 감소, 기술개발 및 지자체 예산 확대
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Selected Platform Modal */}
                {selectedPlatform && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedPlatform.name} 상세 정보</h2>
                                    <button
                                        onClick={() => setSelectedPlatform(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(selectedPlatform).map(([key, value]) => {
                                            if (key === 'id' || key === 'name' || key === 'features' || key === 'color') return null;
                                            if (!value) return null;

                                            const labelMap: Record<string, string> = {
                                                freelancers: '프리랜서',
                                                companies: '기업',
                                                projects: '프로젝트',
                                                totalAmount: '총 거래액',
                                                avgResponse: '평균 응답시간',
                                                services: '서비스',
                                                categories: '카테고리',
                                                minPrice: '최소 가격',
                                                experience: '운영 경력',
                                                reorderRate: '재의뢰율',
                                                responseTime: '응답 시간'
                                            };

                                            return (
                                                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                                                    <p className="text-sm text-gray-600">{labelMap[key] || key}</p>
                                                    <p className="font-semibold text-gray-900">{value}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">주요 특징</h3>
                                        <div className="space-y-2">
                                            {selectedPlatform.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Stats */}
                <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl p-8 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">평균 프로젝트 단가</p>
                            <p className="text-2xl font-bold">850만원</p>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm mb-1">평균 개발 기간</p>
                            <p className="text-2xl font-bold">3.5개월</p>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm mb-1">AI 프로젝트 비중</p>
                            <p className="text-2xl font-bold">42%</p>
                        </div>
                        <div>
                            <p className="text-blue-100 text-sm mb-1">원격근무 비율</p>
                            <p className="text-2xl font-bold">78%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITBusinessPlanPage;