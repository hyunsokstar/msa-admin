'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
    ChevronDown, ChevronRight, Search, X,
    Brain, Zap, Rocket, TrendingUp, Moon, Sun,
    Code, Database, GitBranch, Cpu, Share2,
    Building2, Briefcase, Award, Target, Download,
    Lightbulb, AlertCircle, BarChart, ChevronUp,
    Users, Shield, Heart, School, Menu, BookOpen,
    DollarSign, Gavel, FileText, Home, Filter,
    Package, Globe, Calculator, Factory, Layers,
    Clock, CheckCircle, XCircle, ArrowRight,
    Sparkles, Activity, Gauge, PieChart
} from 'lucide-react';

interface SectionProps {
    id: string;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onToggle?: () => void;
}

interface NavItem {
    id: string;
    title: string;
    icon: React.ReactNode;
}

const CollapsibleSection: React.FC<SectionProps> = ({
    id, title, icon, children, isOpen = false, onToggle
}) => {
    return (
        <div id={id} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 flex items-center justify-between hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800 dark:hover:to-pink-800 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-purple-600 dark:text-purple-300">{icon}</div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
                </div>
                {isOpen ? (
                    <ChevronDown className="text-gray-600 dark:text-gray-300" />
                ) : (
                    <ChevronRight className="text-gray-600 dark:text-gray-300" />
                )}
            </button>
            <div className={`transition-all duration-300 ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-6 py-4 text-gray-700 dark:text-gray-300">{children}</div>
            </div>
        </div>
    );
};

const ProgressBar: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(value), 100);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className={`${color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; trend?: string }> = ({
    icon, title, value, trend
}) => {
    return (
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="text-purple-600 dark:text-purple-400">{icon}</div>
                {trend && (
                    <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <h3 className="text-sm text-gray-600 dark:text-gray-400">{title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
        </div>
    );
};

export default function ParadigmShiftReport() {
    const [searchQuery, setSearchQuery] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        'paradigm': true,
        'reasons': false,
        'services': false,
        'summary': false,
        'action': false,
        'stats': false,
        'future': false,
        'resources': false
    });

    const navItems: NavItem[] = [
        { id: 'paradigm', title: '핵심 패러다임 변화', icon: <Brain className="w-4 h-4" /> },
        { id: 'reasons', title: '산업 재창조의 필요성', icon: <Zap className="w-4 h-4" /> },
        { id: 'services', title: '리디자인 가능한 서비스', icon: <Rocket className="w-4 h-4" /> },
        { id: 'stats', title: '시장 현황 & 통계', icon: <BarChart className="w-4 h-4" /> },
        { id: 'future', title: '미래 전망', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'summary', title: '핵심 요약', icon: <Target className="w-4 h-4" /> },
        { id: 'action', title: '액션 아이템', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'resources', title: '참고 자료', icon: <BookOpen className="w-4 h-4" /> }
    ];

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const toggleAllSections = (open: boolean) => {
        const newState: Record<string, boolean> = {};
        navItems.forEach(item => {
            newState[item.id] = open;
        });
        setOpenSections(newState);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setShowNav(false);
        }
    };

    const shareReport = () => {
        if (navigator.share) {
            navigator.share({
                title: '시대적 패러다임 변화 종합 보고서',
                text: '개발자 중심 시대의 도래와 산업 재창조의 기회',
                url: window.location.href
            });
        } else {
            // Fallback
            alert('공유 기능이 지원되지 않는 브라우저입니다.');
        }
    };

    const downloadPDF = () => {
        alert('PDF 다운로드 기능이 준비 중입니다.');
    };

    // 검색 필터링된 섹션들
    const filteredSections = useMemo(() => {
        if (!searchQuery) return navItems;

        return navItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300`}>
            {/* Floating Navigation */}
            <div className={`fixed left-4 top-20 z-40 transition-all duration-300 ${showNav ? 'translate-x-0' : '-translate-x-64'} lg:translate-x-0`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-56">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-sm">목차</h3>
                    <nav className="space-y-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="w-full text-left px-3 py-2 rounded hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors flex items-center gap-2 text-sm"
                            >
                                <span className="text-purple-600 dark:text-purple-400">{item.icon}</span>
                                <span className="text-gray-700 dark:text-gray-300">{item.title}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Nav Toggle */}
            <button
                onClick={() => setShowNav(!showNav)}
                className="fixed left-4 top-4 z-50 lg:hidden bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg"
            >
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-4 lg:pl-72">
                {/* Header */}
                <div className="mb-8">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => toggleAllSections(true)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <ChevronDown className="w-4 h-4" />
                                모두 열기
                            </button>
                            <button
                                onClick={() => toggleAllSections(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <ChevronUp className="w-4 h-4" />
                                모두 닫기
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={shareReport}
                                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                                title="공유하기"
                            >
                                <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={downloadPDF}
                                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                                title="PDF 다운로드"
                            >
                                <Download className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            </button>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
                                title="다크모드 토글"
                            >
                                {darkMode ? (
                                    <Sun className="w-5 h-5 text-yellow-500" />
                                ) : (
                                    <Moon className="w-5 h-5 text-gray-700" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="보고서 내용 검색..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm focus:shadow-md transition-shadow outline-none text-gray-700 dark:text-gray-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>

                    {/* Title Section */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                                <Brain className="text-white w-8 h-8" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                시대적 패러다임 변화 종합 보고서
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                            개발자 중심 시대의 도래와 산업 재창조의 기회
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            기술과 실행력이 만드는 새로운 비즈니스 패러다임 | 2025년 6월 업데이트
                        </p>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            <StatCard icon={<TrendingUp className="w-6 h-6" />} title="재창조 가능 산업" value="90%" trend="+15%" />
                            <StatCard icon={<Building2 className="w-6 h-6" />} title="디지털 전환율" value="23%" trend="+8%" />
                            <StatCard icon={<Code className="w-6 h-6" />} title="개발자 수요" value="400%" trend="+120%" />
                            <StatCard icon={<Rocket className="w-6 h-6" />} title="스타트업 성공률" value="45%" trend="+23%" />
                        </div>
                    </div>
                </div>

                {/* Sections */}
                {(!searchQuery || filteredSections.some(item => item.id === 'paradigm')) && (
                    <CollapsibleSection
                        id="paradigm"
                        title="🧠 핵심 패러다임 변화"
                        icon={<Brain className="w-6 h-6" />}
                        isOpen={openSections['paradigm']}
                        onToggle={() => toggleSection('paradigm')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
                                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3">과거 vs 현재/미래 패러다임</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b-2 border-purple-200 dark:border-purple-700">
                                                <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">과거 패러다임</th>
                                                <th className="text-center py-2 px-4">→</th>
                                                <th className="text-left py-2 px-4 text-gray-700 dark:text-gray-300">현재/미래 패러다임</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                                                <td className="py-3 px-4">창의력, 감각</td>
                                                <td className="text-center">
                                                    <ArrowRight className="w-4 h-4 text-purple-500 inline" />
                                                </td>
                                                <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-300">아키텍처 설계 + 데이터 활용 능력</td>
                                            </tr>
                                            <tr className="border-b border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                                                <td className="py-3 px-4">열정, 근성</td>
                                                <td className="text-center">
                                                    <ArrowRight className="w-4 h-4 text-purple-500 inline" />
                                                </td>
                                                <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-300">레거시 분석 + API 설계력</td>
                                            </tr>
                                            <tr className="border-b border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                                                <td className="py-3 px-4">시장 예측</td>
                                                <td className="text-center">
                                                    <ArrowRight className="w-4 h-4 text-purple-500 inline" />
                                                </td>
                                                <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-300">구조적 헛점 리버스 엔지니어링</td>
                                            </tr>
                                            <tr className="border-b border-purple-100 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                                                <td className="py-3 px-4">경영 천재</td>
                                                <td className="text-center">
                                                    <ArrowRight className="w-4 h-4 text-purple-500 inline" />
                                                </td>
                                                <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-300">개발자 + Infra 이해력</td>
                                            </tr>
                                            <tr className="hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                                                <td className="py-3 px-4">수작업 고도화</td>
                                                <td className="text-center">
                                                    <ArrowRight className="w-4 h-4 text-purple-500 inline" />
                                                </td>
                                                <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-300">자동화 기반 최적화</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                                    <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        변화의 속도
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                                        <li>• 기술 발전 속도: 18개월마다 2배</li>
                                        <li>• 산업 디지털화: 연 25% 성장</li>
                                        <li>• AI 도입률: 매년 40% 증가</li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                                    <h4 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                                        <Gauge className="w-5 h-5" />
                                        핵심 역량 변화
                                    </h4>
                                    <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                                        <li>• 문제 정의 능력 {'>'} 문제 해결 능력</li>
                                        <li>• 시스템 사고 {'>'} 단편적 사고</li>
                                        <li>• 실행 속도 {'>'} 완벽한 계획</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-800 rounded-lg">
                                <p className="text-purple-800 dark:text-purple-200 font-medium flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    핵심 인사이트: "코드를 짜는 기획자"와 "구조를 이해하는 개발자"의 시대
                                </p>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'reasons')) && (
                    <CollapsibleSection
                        id="reasons"
                        title="💥 기존 산업의 90%가 재창조되어야 하는 이유"
                        icon={<Zap className="w-6 h-6" />}
                        isOpen={openSections['reasons']}
                        onToggle={() => toggleSection('reasons')}
                    >
                        <div className="space-y-4">
                            <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4">
                                <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">1. "기술 미적용" vs "기술 난독증"</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>대부분의 산업은 아직도 <strong>수기 + 엑셀 + 전화</strong>로 운영됨</li>
                                    <li>이미 존재하는 기술조차 적용 못함 (예: RPA, OCR, 검색엔진 최적화)</li>
                                    <li>디지털 전환이 아닌 '디지털 흉내'에 그치는 현실</li>
                                    <li>기술 도입 실패율 70% - 원인은 기술이 아닌 실행력 부족</li>
                                </ul>

                                <div className="mt-4">
                                    <ProgressBar value={77} label="수작업 의존도" color="bg-red-600" />
                                    <ProgressBar value={23} label="디지털화 완료" color="bg-green-600" />
                                </div>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
                                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-2">2. 제도권이 만든 무의미한 벽</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>심사, 평가, 공공 행정은 절차 위주 → GPT 하나면 자동화 가능</li>
                                    <li>회계, 보험, 세무까지 GPT로 80% 자동 처리 가능</li>
                                    <li>규제의 디지털화 부재로 인한 비효율 극대화</li>
                                    <li>연간 불필요한 행정 비용: 100조원 추정</li>
                                </ul>

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-600">80%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">자동화 가능 업무</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-red-600">15%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">실제 자동화율</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">3. 데이터는 있지만, 모델이 없음</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>병원, 학교, 물류, 지자체… 데이터는 계속 쌓임</li>
                                    <li><strong>의사결정 보조, 분석, 시뮬레이션</strong>은 전혀 적용되지 않음</li>
                                    <li>데이터 활용 인력과 인프라의 절대적 부족</li>
                                    <li>빅데이터의 90%가 분석되지 않은 채 방치</li>
                                </ul>

                                <div className="mt-4 bg-yellow-100 dark:bg-yellow-800 rounded p-3">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                        <strong>사례:</strong> 한 대형병원, 10년간 환자 데이터 5TB 보유 → 활용률 0.1%
                                    </p>
                                </div>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-2">4. 혁신 저항의 심리학</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-gray-700 dark:text-gray-300">"우리는 특별해서 기술로 대체 불가능"</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-gray-700 dark:text-gray-300">"지금까지 잘 해왔는데 왜 바꿔?"</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <XCircle className="w-5 h-5 text-red-500" />
                                        <span className="text-gray-700 dark:text-gray-300">"기술은 믿을 수 없어"</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                        <span className="text-gray-700 dark:text-gray-300 font-semibold">실제: 이미 검증된 기술, 적용만 하면 됨</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'services')) && (
                    <CollapsibleSection
                        id="services"
                        title="🔥 리디자인 가능한 AI/IT 서비스"
                        icon={<Rocket className="w-6 h-6" />}
                        isOpen={openSections['services']}
                        onToggle={() => toggleSection('services')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-4">
                                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">개발자 + 투자 + 규제 완화만 갖추면?</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    진짜로 <strong>A4 한 장에 회사 100개 이름 쓸 수 있음</strong> (그리고 그 중 10개는 상장감)
                                </p>
                            </div>

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Filter className="w-5 h-5 text-purple-600" />
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">산업별 혁신 가능성</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-800 rounded-full text-sm text-purple-700 dark:text-purple-200">전체</span>
                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-200">법률/세무</span>
                                    <span className="px-3 py-1 bg-green-100 dark:bg-green-800 rounded-full text-sm text-green-700 dark:text-green-200">헬스케어</span>
                                    <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 rounded-full text-sm text-yellow-700 dark:text-yellow-200">교육</span>
                                    <span className="px-3 py-1 bg-red-100 dark:bg-red-800 rounded-full text-sm text-red-700 dark:text-red-200">제조/물류</span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                            <th className="text-left py-3 px-4 font-bold">산업</th>
                                            <th className="text-left py-3 px-4 font-bold">리디자인 가능한 AI/IT 서비스</th>
                                            <th className="text-center py-3 px-4 font-bold">시장규모</th>
                                            <th className="text-center py-3 px-4 font-bold">혁신도</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Gavel className="w-4 h-4 text-blue-600" />
                                                <strong>법률</strong>
                                            </td>
                                            <td className="py-3 px-4">GPT 판례 분석 + 자동 소송 생성기</td>
                                            <td className="text-center py-3 px-4">15조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★★</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Calculator className="w-4 h-4 text-green-600" />
                                                <strong>세무</strong>
                                            </td>
                                            <td className="py-3 px-4">법인 세금 GPT 챗봇 + 자동 신고 SaaS</td>
                                            <td className="text-center py-3 px-4">8조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★☆</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Package className="w-4 h-4 text-yellow-600" />
                                                <strong>주류 유통</strong>
                                            </td>
                                            <td className="py-3 px-4">도매상 → 소매 → 매장 자동화 및 유통 예측 플랫폼</td>
                                            <td className="text-center py-3 px-4">12조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★☆☆</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Home className="w-4 h-4 text-red-600" />
                                                <strong>부동산</strong>
                                            </td>
                                            <td className="py-3 px-4">토지 개발 제안서 자동화 + 인공지능 감정 평가</td>
                                            <td className="text-center py-3 px-4">25조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★★</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-purple-600" />
                                                <strong>공공 정책</strong>
                                            </td>
                                            <td className="py-3 px-4">민원 분석 + 정책 우선순위 자동 리포트</td>
                                            <td className="text-center py-3 px-4">5조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★☆</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <School className="w-4 h-4 text-indigo-600" />
                                                <strong>학교</strong>
                                            </td>
                                            <td className="py-3 px-4">GPT가 설계한 학기별 교육과정 + AI 상담 선생님</td>
                                            <td className="text-center py-3 px-4">20조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★★</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Heart className="w-4 h-4 text-pink-600" />
                                                <strong>병원</strong>
                                            </td>
                                            <td className="py-3 px-4">병원 메타 검색 + AI로 환자 리마인드/후속관리</td>
                                            <td className="text-center py-3 px-4">30조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★★</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Shield className="w-4 h-4 text-cyan-600" />
                                                <strong>보험</strong>
                                            </td>
                                            <td className="py-3 px-4">GPT가 작성한 리스크 프로파일 기반 상품 추천</td>
                                            <td className="text-center py-3 px-4">18조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★☆</span>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Factory className="w-4 h-4 text-gray-600" />
                                                <strong>제조</strong>
                                            </td>
                                            <td className="py-3 px-4">IoT 센서 + AI 품질 분석 리포트 자동화</td>
                                            <td className="text-center py-3 px-4">40조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★☆☆</span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <td className="py-3 px-4 flex items-center gap-2">
                                                <Users className="w-4 h-4 text-orange-600" />
                                                <strong>정치</strong>
                                            </td>
                                            <td className="py-3 px-4">지역구 민심 요약 + 자동 공약 매칭 툴</td>
                                            <td className="text-center py-3 px-4">3조원</td>
                                            <td className="text-center py-3 px-4">
                                                <span className="text-yellow-500">★★★★☆</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">176조원</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">총 시장 규모</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-300">85%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">디지털 전환 가능성</div>
                                </div>
                                <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">3-5년</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">평균 ROI 달성 기간</div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'stats')) && (
                    <CollapsibleSection
                        id="stats"
                        title="📊 시장 현황 & 통계"
                        icon={<BarChart className="w-6 h-6" />}
                        isOpen={openSections['stats']}
                        onToggle={() => toggleSection('stats')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 rounded-lg p-4">
                                <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-4">2025년 글로벌 디지털 전환 시장 현황</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">지역별 디지털 전환율</h4>
                                        <ProgressBar value={87} label="북미" color="bg-blue-600" />
                                        <ProgressBar value={82} label="유럽" color="bg-green-600" />
                                        <ProgressBar value={75} label="중국" color="bg-yellow-600" />
                                        <ProgressBar value={68} label="일본" color="bg-purple-600" />
                                        <ProgressBar value={45} label="한국" color="bg-red-600" />
                                        <ProgressBar value={32} label="동남아" color="bg-orange-600" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">산업별 AI 도입률 (2025)</h4>
                                        <ProgressBar value={94} label="IT/소프트웨어" color="bg-blue-600" />
                                        <ProgressBar value={81} label="금융" color="bg-green-600" />
                                        <ProgressBar value={72} label="제조" color="bg-yellow-600" />
                                        <ProgressBar value={60} label="헬스케어" color="bg-purple-600" />
                                        <ProgressBar value={47} label="교육" color="bg-red-600" />
                                        <ProgressBar value={35} label="공공" color="bg-orange-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <PieChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">$4.0T</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">글로벌 DT 시장 (2027)</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">27.6%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">DT 시장 CAGR</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">400만명</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">개발자 부족 (2025)</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <Rocket className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">71%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">GenAI 사용 기업</div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">한국 시장 특이점 (2025년 기준)</h3>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span><strong>세계 최고 수준의 IT 인프라:</strong> 5G 보급률 1위, 인터넷 속도 2위</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                        <span><strong>높은 교육 수준:</strong> 대졸자 비율 OECD 1위</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                        <span><strong>낮은 디지털 전환율:</strong> 기업 DX 추진율 30.6%, 전담조직 2.1%</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                                        <span><strong>AI 투자 순위 하락:</strong> 6위→9위 (민간 투자 부족)</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg p-4">
                                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">2025년 주요 성과 지표</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">글로벌 AI 시장</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• 시장 규모: <strong>$190B</strong> (38% 성장)</li>
                                            <li>• 2030년 예상: <strong>$826.7B</strong></li>
                                            <li>• 기업 AI 도입: <strong>90%+</strong></li>
                                            <li>• GenAI 가치 창출: <strong>$434B</strong></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">한국 시장</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• AI 시장: <strong>10조원+</strong></li>
                                            <li>• 스타트업 투자: <strong>20% 감소</strong></li>
                                            <li>• AI 분야 집중도: <strong>70%+</strong></li>
                                            <li>• 디지털 성숙도: <strong>2단계</strong> (5단계 중)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'future')) && (
                    <CollapsibleSection
                        id="future"
                        title="✨ 미래 전망"
                        icon={<Sparkles className="w-6 h-6" />}
                        isOpen={openSections['future']}
                        onToggle={() => toggleSection('future')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900 dark:to-indigo-900 rounded-lg p-4">
                                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3">2025-2030 기술 트렌드 예측</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">단기 (1-2년)</h4>
                                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                                            <li>• GPT 기반 업무 자동화 보편화</li>
                                            <li>• No-code/Low-code 플랫폼 대중화</li>
                                            <li>• API 이코노미 본격 성장</li>
                                            <li>• 실시간 데이터 분석 표준화</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">중장기 (3-5년)</h4>
                                        <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                                            <li>• AGI 수준 AI 등장</li>
                                            <li>• 완전 자동화 기업 출현</li>
                                            <li>• 메타버스 업무 환경 정착</li>
                                            <li>• 양자 컴퓨팅 상용화</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3">산업별 미래 시나리오</h3>

                                <div className="space-y-3">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">금융</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            AI 자산관리사가 인간 펀드매니저 대체, 블록체인 기반 국경 없는 금융 시스템
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">의료</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            AI 진단 정확도 99% 돌파, 개인 맞춤형 치료제 3D 프린팅
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">교육</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            AI 튜터 1:1 맞춤 교육, VR/AR 기반 체험형 학습 보편화
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300">제조</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            완전 무인 공장 50% 달성, 수요 예측 기반 실시간 생산
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg p-4">
                                <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    위험 요소 & 대응 전략
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">리스크</h4>
                                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                                            <li>• 기술 격차 심화</li>
                                            <li>• 일자리 대량 소멸</li>
                                            <li>• 사이버 보안 위협 증가</li>
                                            <li>• AI 윤리 문제</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">대응 방안</h4>
                                        <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                                            <li>• 전 국민 디지털 교육</li>
                                            <li>• 재교육/전직 지원 확대</li>
                                            <li>• 보안 인프라 대규모 투자</li>
                                            <li>• AI 규제 프레임워크 구축</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'summary')) && (
                    <CollapsibleSection
                        id="summary"
                        title="✍️ 핵심 요약"
                        icon={<Target className="w-6 h-6" />}
                        isOpen={openSections['summary']}
                        onToggle={() => toggleSection('summary')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6">
                                <h3 className="font-bold text-indigo-800 dark:text-indigo-200 mb-4 text-lg">시대적 전환의 핵심 포인트</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">1</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">개발자의 역할 확대</p>
                                            <p className="text-gray-600 dark:text-gray-400">지금은 <strong>"코드를 짜는 기획자"</strong>, <strong>"구조를 이해하는 개발자"</strong>의 시대</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">2</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">실행력의 중요성</p>
                                            <p className="text-gray-600 dark:text-gray-400">창업은 아이디어보다 <strong>아키텍처와 실행력이 90%</strong></p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white font-bold text-sm">3</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 dark:text-gray-100">기회의 풍부함</p>
                                            <p className="text-gray-600 dark:text-gray-400">혁신이 부족한 게 아니라, <strong>적용할 사람이 부족한 것</strong></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4 text-center">
                                    <Layers className="w-8 h-8 text-blue-600 dark:text-blue-300 mx-auto mb-2" />
                                    <h4 className="font-bold text-blue-800 dark:text-blue-200">기술 스택</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        풀스택 + 클라우드 + AI
                                    </p>
                                </div>

                                <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4 text-center">
                                    <GitBranch className="w-8 h-8 text-green-600 dark:text-green-300 mx-auto mb-2" />
                                    <h4 className="font-bold text-green-800 dark:text-green-200">개발 방법론</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        애자일 + DevOps + MLOps
                                    </p>
                                </div>

                                <div className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4 text-center">
                                    <Database className="w-8 h-8 text-purple-600 dark:text-purple-300 mx-auto mb-2" />
                                    <h4 className="font-bold text-purple-800 dark:text-purple-200">핵심 자산</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        데이터 + API + 자동화
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-800 dark:to-orange-800 rounded-lg border-l-4 border-orange-500">
                                <p className="text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                    기술과 실행력을 갖춘 개발자가 산업을 재정의하는 시대가 도래했습니다.
                                </p>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'action')) && (
                    <CollapsibleSection
                        id="action"
                        title="🚀 액션 아이템"
                        icon={<Briefcase className="w-6 h-6" />}
                        isOpen={openSections['action']}
                        onToggle={() => toggleSection('action')}
                    >
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                                        <Code className="w-5 h-5" />
                                        개발자를 위한 체크리스트
                                    </h3>
                                    <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            레거시 시스템 분석 능력 강화
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            API 설계 및 아키텍처 역량 개발
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            비즈니스 도메인 지식 습득
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            자동화 도구 활용 능력 향상
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            클라우드 네이티브 기술 마스터
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                                    <h3 className="font-bold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5" />
                                        창업가를 위한 체크리스트
                                    </h3>
                                    <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            산업별 구조적 헛점 파악
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            기술 적용 가능성 검토
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            MVP 빠른 구축 및 검증
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            규제 환경 분석 및 대응
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            자금 조달 전략 수립
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                                    <Lightbulb className="w-5 h-5" />
                                    즉시 시작 가능한 분야
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">B2B SaaS</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• 중소기업 업무 자동화</li>
                                            <li>• 산업별 맞춤 CRM</li>
                                            <li>• 워크플로우 최적화 도구</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">AI 솔루션</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• GPT 기반 고객 상담봇</li>
                                            <li>• 문서 자동 분석 시스템</li>
                                            <li>• 예측 분석 대시보드</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">데이터 플랫폼</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• 실시간 분석 대시보드</li>
                                            <li>• 데이터 통합 솔루션</li>
                                            <li>• BI 자동화 도구</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">API 서비스</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• 결제 통합 게이트웨이</li>
                                            <li>• 인증/보안 서비스</li>
                                            <li>• 데이터 변환 API</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900 rounded-lg p-4">
                                <h3 className="font-bold text-red-800 dark:text-red-200 mb-3">⏱️ 실행 타임라인</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 text-sm font-semibold text-gray-600 dark:text-gray-400">1주차</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded p-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">시장 조사 & 기회 발굴</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 text-sm font-semibold text-gray-600 dark:text-gray-400">2-4주</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded p-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">MVP 개발 & 프로토타입</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 text-sm font-semibold text-gray-600 dark:text-gray-400">5-8주</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded p-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">파일럿 테스트 & 피드백</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 text-sm font-semibold text-gray-600 dark:text-gray-400">3개월+</div>
                                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded p-2">
                                            <p className="text-sm text-gray-700 dark:text-gray-300">본격 출시 & 스케일업</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {(!searchQuery || filteredSections.some(item => item.id === 'resources')) && (
                    <CollapsibleSection
                        id="resources"
                        title="📚 참고 자료 & 추가 학습"
                        icon={<BookOpen className="w-6 h-6" />}
                        isOpen={openSections['resources']}
                        onToggle={() => toggleSection('resources')}
                    >
                        <div className="space-y-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-4">
                                <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-3">필독 도서</h3>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>📖 <strong>The Lean Startup</strong> - Eric Ries</li>
                                    <li>📖 <strong>Platform Revolution</strong> - Geoffrey Parker</li>
                                    <li>📖 <strong>Zero to One</strong> - Peter Thiel</li>
                                    <li>📖 <strong>The Innovator's Dilemma</strong> - Clayton Christensen</li>
                                    <li>📖 <strong>Designing Data-Intensive Applications</strong> - Martin Kleppmann</li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 rounded-lg p-4">
                                <h3 className="font-bold text-green-800 dark:text-green-200 mb-3">온라인 학습 플랫폼</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">기술 학습</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• Coursera - ML/AI 특화</li>
                                            <li>• Udacity - 나노디그리</li>
                                            <li>• Fast.ai - 실전 AI</li>
                                            <li>• AWS Training - 클라우드</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">비즈니스 학습</h4>
                                        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                            <li>• Y Combinator - 스타트업</li>
                                            <li>• MasterClass - 리더십</li>
                                            <li>• LinkedIn Learning</li>
                                            <li>• Harvard Online</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg p-4">
                                <h3 className="font-bold text-purple-800 dark:text-purple-200 mb-3">커뮤니티 & 네트워킹</h3>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>🌐 <strong>GitHub:</strong> 오픈소스 프로젝트 참여</li>
                                    <li>🌐 <strong>Stack Overflow:</strong> 기술 Q&A 커뮤니티</li>
                                    <li>🌐 <strong>Product Hunt:</strong> 신규 제품 트렌드</li>
                                    <li>🌐 <strong>Hacker News:</strong> 기술 뉴스 & 토론</li>
                                    <li>🌐 <strong>IndieHackers:</strong> 부트스트랩 창업가 커뮤니티</li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4">
                                <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">투자 & 지원 프로그램</h3>
                                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                                    <li>💰 <strong>TIPS 프로그램:</strong> 정부 지원 스타트업 프로그램</li>
                                    <li>💰 <strong>K-Startup:</strong> 창업 지원 포털</li>
                                    <li>💰 <strong>엑셀러레이터:</strong> 프라이머, 스파크랩스, 매쉬업엔젤스</li>
                                    <li>💰 <strong>글로벌 프로그램:</strong> Y Combinator, Techstars</li>
                                </ul>
                            </div>
                        </div>
                    </CollapsibleSection>
                )}

                {/* Footer */}
                <div className="mt-8 p-4 bg-gradient-to-r from-gray-100 to-purple-100 dark:from-gray-800 dark:to-purple-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        본 보고서는 2025년 6월 기준 최신 데이터를 반영한 시대적 패러다임 변화 분석입니다.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-2">
                        출처: IDC, Gartner, McKinsey, Statista, WalkMe, Backlinko 등 글로벌 리서치 기관 |
                        KDI, SPRi, THE VC, 한국생산성본부 등 국내 연구기관
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
                        "The best way to predict the future is to invent it." - Alan Kay
                    </p>
                    <div className="flex justify-center gap-4 mt-3">
                        <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                            피드백 보내기
                        </button>
                        <span className="text-xs text-gray-400">|</span>
                        <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                            업데이트 구독
                        </button>
                        <span className="text-xs text-gray-400">|</span>
                        <button className="text-xs text-purple-600 dark:text-purple-400 hover:underline">
                            전체 버전 다운로드
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}