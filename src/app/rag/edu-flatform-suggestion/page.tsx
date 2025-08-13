'use client';

import React, { useState } from 'react';
import {
    GraduationCap,
    Users,
    Smartphone,
    Code,
    Clock,
    DollarSign,
    CheckCircle2,
    Target,
    Lightbulb,
    TrendingUp,
    Shield,
    Zap,
    Calendar,
    User,
    Database,
    Globe,
    MessageSquare
} from 'lucide-react';

const EduPlatformProposal = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const techStack = {
        backend: ["NestJS", "TypeScript", "PostgreSQL", "Redis", "JWT"],
        frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "TanStack Query", "Zustand"],
        mobile: ["React Native", "Expo", "TypeScript"],
        auth: ["NextAuth.js", "OAuth 2.0", "카카오/네이버/구글"],
        deployment: ["Docker", "AWS/Vercel", "GitHub Actions"]
    };

    const timeline = [
        { phase: "1단계: 기획 & 설계", duration: "2주", tasks: ["요구사항 분석", "DB 설계", "API 명세", "UI/UX 설계"] },
        { phase: "2단계: 백엔드 개발", duration: "4주", tasks: ["NestJS API 구축", "인증/인가 시스템", "데이터베이스 구현", "AI 추천 로직"] },
        { phase: "3단계: 프론트엔드 개발", duration: "4주", tasks: ["Next.js 웹 구현", "반응형 UI", "상태 관리", "API 연동"] },
        { phase: "4단계: 모바일 앱", duration: "3주", tasks: ["React Native 앱", "네이티브 기능", "앱스토어 배포", "푸시 알림"] },
        { phase: "5단계: 테스트 & 배포", duration: "2주", tasks: ["통합 테스트", "성능 최적화", "보안 강화", "운영 배포"] }
    ];

    const teamMembers = [
        { name: "우진", role: "백엔드 개발자", tasks: ["NestJS API", "데이터베이스", "인증 시스템"] },
        { name: "성렬", role: "프론트엔드 개발자", tasks: ["Next.js 웹", "UI/UX", "상태 관리"] },
        { name: "현석", role: "풀스택 개발자", tasks: ["React Native", "DevOps", "아키텍처"] },
        { name: "이사님", role: "프로젝트 매니저", tasks: ["기획 검토", "품질 관리", "고객 소통"] }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                            <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">교육 매칭 플랫폼 개발 제안서</h1>
                            <p className="text-gray-600">AI 기반 개인화 교육기관 추천 서비스</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', label: '프로젝트 개요', icon: Target },
                            { id: 'tech', label: '기술 제안', icon: Code },
                            { id: 'timeline', label: '개발 일정', icon: Calendar },
                            { id: 'team', label: '팀 구성', icon: Users },
                            { id: 'cost', label: '비용 산출', icon: DollarSign }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 프로젝트 개요 */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* 프로젝트 요약 */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">프로젝트 요약</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">핵심 기능</h3>
                                    <ul className="space-y-2">
                                        {[
                                            "AI 기반 교육기관 매칭",
                                            "학습 성향 분석 설문",
                                            "지역/과목별 검색 필터",
                                            "교육기관 대시보드",
                                            "소셜 로그인 (카카오/네이버/구글)",
                                            "커뮤니티 기능"
                                        ].map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                <span className="text-gray-600">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">대상 사용자</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                            <Users className="w-5 h-5 text-blue-600" />
                                            <span className="text-gray-700">학생 및 학부모</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                            <GraduationCap className="w-5 h-5 text-green-600" />
                                            <span className="text-gray-700">교육기관 (학원, 유치원 등)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 기술 제안 */}
                {activeTab === 'tech' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">기술 스택 제안</h2>

                            {/* 전략적 접근 */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <Lightbulb className="w-6 h-6 text-blue-600" />
                                    <h3 className="text-xl font-semibold text-gray-900">전략적 접근</h3>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    <strong>JavaScript/TypeScript 생태계 통합:</strong> Spring Boot 대신 NestJS를 제안하는 이유는
                                    전체 스택을 하나의 언어로 통일하여 개발 효율성과 유지보수성을 극대화하기 위함입니다.
                                </p>
                            </div>

                            {/* 기술 스택 상세 */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                                        <Database className="w-5 h-5" />
                                        백엔드
                                    </h3>
                                    <ul className="space-y-2">
                                        {techStack.backend.map((tech, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-gray-700">{tech}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                                        <Globe className="w-5 h-5" />
                                        프론트엔드
                                    </h3>
                                    <ul className="space-y-2">
                                        {techStack.frontend.map((tech, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm text-gray-700">{tech}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                        <Smartphone className="w-5 h-5" />
                                        모바일
                                    </h3>
                                    <ul className="space-y-2">
                                        {techStack.mobile.map((tech, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm text-gray-700">{tech}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 개발 일정 */}
                {activeTab === 'timeline' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">개발 일정 (총 15주)</h2>

                            <div className="space-y-6">
                                {timeline.map((phase, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-semibold text-blue-600">{idx + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                        {phase.duration}
                                                    </span>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    {phase.tasks.map((task, taskIdx) => (
                                                        <div key={taskIdx} className="flex items-center gap-2">
                                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                            <span className="text-sm text-gray-600">{task}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {idx < timeline.length - 1 && (
                                            <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-200"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 팀 구성 */}
                {activeTab === 'team' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">팀 구성 및 역할 분담</h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {teamMembers.map((member, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-lg p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                                                <p className="text-sm text-gray-600">{member.role}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-2">담당 업무</h4>
                                            <ul className="space-y-1">
                                                {member.tasks.map((task, taskIdx) => (
                                                    <li key={taskIdx} className="flex items-center gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                        <span className="text-sm text-gray-600">{task}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* 비용 산출 */}
                {activeTab === 'cost' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">비용 산출</h2>

                            {/* 총 비용 */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">총 프로젝트 비용</h3>
                                    <div className="text-4xl font-bold text-blue-600 mb-4">8,700만원</div>
                                    <div className="text-sm text-gray-600">
                                        * VAT 별도 | 유지보수 6개월 무상 지원 포함
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer CTA */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            차별화된 교육 플랫폼을 함께 만들어보세요
                        </h3>
                        <p className="text-gray-600 mb-6">
                            JS/TS 생태계 통합으로 빠르고 안정적인 개발을 제공합니다
                        </p>
                        <div className="flex justify-center gap-4">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                제안서 다운로드
                            </button>
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                상담 요청
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// Next.js 페이지 컴포넌트로 export
export default EduPlatformProposal;