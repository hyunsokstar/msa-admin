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

                        {/* 현재 상황 분석 */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">현재 상황 분석</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-yellow-800 mb-2">기존 기술 스택</h3>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• React (프론트엔드)</li>
                                        <li>• FastAPI + Python (백엔드)</li>
                                        <li>• MySQL (데이터베이스)</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-red-800 mb-2">개선 필요 사항</h3>
                                    <ul className="text-sm text-red-700 space-y-1">
                                        <li>• 아키텍처 점검</li>
                                        <li>• 코드 리팩토링</li>
                                        <li>• 보안 강화</li>
                                        <li>• 성능 최적화</li>
                                        <li>• 전역 상태 관리</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">추가 요구사항</h3>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• 하이브리드 모바일 앱</li>
                                        <li>• API 보안 강화</li>
                                        <li>• 반응형 웹</li>
                                        <li>• 대시보드 구현</li>
                                    </ul>
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
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-green-700 mb-2">✅ 장점</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 팀원 모두 JS/TS 활용 가능</li>
                                            <li>• 코드 공유 및 재사용 용이</li>
                                            <li>• 빠른 개발 속도</li>
                                            <li>• 통합된 개발 환경</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-700 mb-2">🎯 목표</h4>
                                        <ul className="text-sm text-gray-600 space-y-1">
                                            <li>• 15주 내 MVP 완성</li>
                                            <li>• 확장 가능한 아키텍처</li>
                                            <li>• 높은 코드 품질</li>
                                            <li>• 모바일 퍼스트 설계</li>
                                        </ul>
                                    </div>
                                </div>
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

                            {/* 아키텍처 개선 방안 */}
                            <div className="mt-8 bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">아키텍처 개선 방안</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">보안 강화</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• JWT 기반 인증/인가</li>
                                            <li>• API Rate Limiting</li>
                                            <li>• 개인정보 암호화</li>
                                            <li>• HTTPS 전용 통신</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">성능 최적화</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• Redis 캐싱 시스템</li>
                                            <li>• CDN 활용</li>
                                            <li>• 이미지 최적화</li>
                                            <li>• 코드 스플리팅</li>
                                        </ul>
                                    </div>
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

                            {/* 마일스톤 */}
                            <div className="mt-8 bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">주요 마일스톤</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="w-5 h-5 text-blue-600" />
                                            <span className="font-semibold">6주차</span>
                                        </div>
                                        <p className="text-sm text-gray-600">웹 플랫폼 MVP 완성</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Smartphone className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold">13주차</span>
                                        </div>
                                        <p className="text-sm text-gray-600">모바일 앱 베타 테스트</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <TrendingUp className="w-5 h-5 text-purple-600" />
                                            <span className="font-semibold">15주차</span>
                                        </div>
                                        <p className="text-sm text-gray-600">정식 서비스 런칭</p>
                                    </div>
                                </div>
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

                            {/* 협업 방식 */}
                            <div className="mt-8 bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">협업 방식</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">개발 프로세스</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• 애자일 스크럼 방식</li>
                                            <li>• 2주 단위 스프린트</li>
                                            <li>• 일일 스탠드업 미팅</li>
                                            <li>• 코드 리뷰 필수</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-3">소통 도구</h4>
                                        <ul className="space-y-2 text-sm text-gray-600">
                                            <li>• Slack/Discord 실시간 소통</li>
                                            <li>• GitHub 코드 관리</li>
                                            <li>• Notion 문서화</li>
                                            <li>• Figma 디자인 협업</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 비용 산출 */}
                {activeTab === 'cost' && (
                    <div className="space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">비용 산출</h2>

                            {/* 인건비 */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">인건비 (15주 기준)</h3>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">시니어 개발자 (현석) × 15주</span>
                                            <span className="font-semibold">3,000만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">백엔드 개발자 (우진) × 15주</span>
                                            <span className="font-semibold">2,250만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">프론트엔드 개발자 (성렬) × 15주</span>
                                            <span className="font-semibold">2,250만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">PM (이사님) × 15주 (파트타임)</span>
                                            <span className="font-semibold">750만원</span>
                                        </div>
                                        <hr className="border-gray-300" />
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>인건비 소계</span>
                                            <span className="text-blue-600">8,250만원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 기타 비용 */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">기타 비용</h3>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">인프라 구축 (AWS, 도메인 등)</span>
                                            <span className="font-semibold">200만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">앱스토어 등록 및 배포</span>
                                            <span className="font-semibold">100만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">디자인 라이센스 (아이콘, 폰트 등)</span>
                                            <span className="font-semibold">50만원</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">보안 인증서, 외부 API</span>
                                            <span className="font-semibold">100만원</span>
                                        </div>
                                        <hr className="border-gray-300" />
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <span>기타 비용 소계</span>
                                            <span className="text-green-600">450만원</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                            {/* 결제 조건 */}
                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div className="bg-green-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-green-800 mb-3">결제 조건</h4>
                                    <ul className="space-y-2 text-sm text-green-700">
                                        <li>• 계약 체결 시: 30%</li>
                                        <li>• 웹 MVP 완성 시: 40%</li>
                                        <li>• 최종 납품 시: 30%</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-blue-800 mb-3">포함 서비스</h4>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                        <li>• 소스코드 원본 제공</li>
                                        <li>• 기술 문서 및 매뉴얼</li>
                                        <li>• 6개월 무상 기술 지원</li>
                                        <li>• 배포 및 운영 가이드</li>
                                    </ul>
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

export default EduPlatformProposal;