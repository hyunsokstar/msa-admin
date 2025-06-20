import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Bell,
    FolderOpen,
    Monitor,
    Copy,
    MessageSquare,
    Menu,
    Link,
    Shield,
    Settings,
    Zap,
    Eye,
    Smartphone
} from 'lucide-react';

interface Props { }

const ReferenceForCti = (props: Props) => {
    const nativeFeatures = [
        {
            icon: <Settings className="h-6 w-6" />,
            title: "시스템 트레이",
            description: "작업표시줄 상주 및 상태 표시",
            benefits: "상담사 실시간 상태(통화 중, 휴식, 대기) 아이콘으로 표시",
            color: "blue",
            implementation: "상담사 상태를 아이콘 색상/텍스트로 간략 표시, 클릭 시 미니 창 제공"
        },
        {
            icon: <Bell className="h-6 w-6" />,
            title: "네이티브 알림",
            description: "데스크톱 시스템 알림",
            benefits: "새 업무 할당, 상태 변경, 목표 달성 시 즉각적 알림",
            color: "green",
            implementation: "중요 공지나 업무 변경사항을 사용자에게 즉시 전달"
        },
        {
            icon: <FolderOpen className="h-6 w-6" />,
            title: "파일 시스템 접근",
            description: "로컬 파일 저장/로드",
            benefits: "설정 저장, 로그 관리, 데이터 캐싱으로 성능 향상",
            color: "purple",
            implementation: "API 키, 환경설정, 활동 로그를 안전하게 로컬 저장"
        },
        {
            icon: <Monitor className="h-6 w-6" />,
            title: "윈도우 관리",
            description: "창 제어 및 표시 옵션",
            benefits: "항상 위 표시, 투명도 조절로 작업 흐름 방해 최소화",
            color: "orange",
            implementation: "고객 정보나 상담 스크립트를 다른 앱 위에 표시"
        },
        {
            icon: <Copy className="h-6 w-6" />,
            title: "클립보드 접근",
            description: "시스템 클립보드 제어",
            benefits: "고객 정보, 전화번호, 상담 스크립트 원클릭 복사",
            color: "teal",
            implementation: "반복적인 정보 입력 작업을 줄여 생산성 향상"
        },
        {
            icon: <MessageSquare className="h-6 w-6" />,
            title: "IPC 통신",
            description: "프론트엔드-백엔드 통신",
            benefits: "웹 기술의 유연성과 네이티브 기능의 강력함 결합",
            color: "red",
            implementation: "웹뷰에서 버튼 클릭 시 Rust 백엔드 함수 호출"
        },
        {
            icon: <Menu className="h-6 w-6" />,
            title: "네이티브 메뉴",
            description: "데스크톱 애플리케이션 메뉴",
            benefits: "익숙한 인터페이스로 사용법 학습 곡선 감소",
            color: "indigo",
            implementation: "파일, 편집, 환경설정, 도움말 등 전통적인 메뉴 제공"
        },
        {
            icon: <Link className="h-6 w-6" />,
            title: "프로토콜 핸들러",
            description: "사용자 정의 URI 스킴",
            benefits: "웹과 데스크톱 앱 간 심리스한 연동",
            color: "pink",
            implementation: "ctiapp://call?number=12345 형태로 외부 링크 연동"
        }
    ];

    const additionalFeatures = [
        {
            icon: <Shield className="h-6 w-6" />,
            title: "생체 인증",
            description: "Biometric Plugin",
            benefits: "보안 강화된 로그인 및 인증",
            color: "emerald"
        },
        {
            icon: <Smartphone className="h-6 w-6" />,
            title: "모바일 연동",
            description: "Cross-platform Support",
            benefits: "iOS/Android 앱과 데이터 동기화",
            color: "violet"
        }
    ];

    const getColorClasses = (color: string) => {
        const colorMap: { [key: string]: { bg: string; text: string; border: string; icon: string } } = {
            blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-l-blue-500", icon: "bg-blue-100" },
            green: { bg: "bg-green-50", text: "text-green-700", border: "border-l-green-500", icon: "bg-green-100" },
            purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-l-purple-500", icon: "bg-purple-100" },
            orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-l-orange-500", icon: "bg-orange-100" },
            teal: { bg: "bg-teal-50", text: "text-teal-700", border: "border-l-teal-500", icon: "bg-teal-100" },
            red: { bg: "bg-red-50", text: "text-red-700", border: "border-l-red-500", icon: "bg-red-100" },
            indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-l-indigo-500", icon: "bg-indigo-100" },
            pink: { bg: "bg-pink-50", text: "text-pink-700", border: "border-l-pink-500", icon: "bg-pink-100" },
            emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-l-emerald-500", icon: "bg-emerald-100" },
            violet: { bg: "bg-violet-50", text: "text-violet-700", border: "border-l-violet-500", icon: "bg-violet-100" }
        };
        return colorMap[color] || colorMap.blue;
    };

    return (
        <section className="mt-24 p-4 bg-white rounded-2xl shadow">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                        <Zap className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-blue-700">네이티브 활용</h2>
                        <p className="text-gray-600 mt-1">CTI 상담사 애플리케이션을 위한 데스크톱 네이티브 기능 가이드</p>
                    </div>
                </div>

                {/* 개요 */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-700 leading-relaxed">
                        <strong className="text-blue-700">Tauri</strong>는 웹 기술(HTML, CSS, JavaScript/TypeScript)로 데스크톱 애플리케이션을 개발하면서
                        Rust 백엔드를 통해 다양한 네이티브 시스템 기능에 접근할 수 있게 합니다.
                        상담사 상태 및 실적 관리 UI 애플리케이션 개발에 유용한 핵심 기능들을 정리했습니다.
                    </p>
                </div>
            </div>

            {/* 핵심 네이티브 기능들 */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye className="h-6 w-6 text-blue-600" />
                    핵심 네이티브 기능
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nativeFeatures.map((feature, index) => {
                        const colors = getColorClasses(feature.color);
                        return (
                            <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border} ${colors.bg}`}>
                                <CardHeader className="pb-3">
                                    <CardTitle className={`flex items-center gap-3 ${colors.text}`}>
                                        <div className={`p-2 ${colors.icon} rounded-lg`}>
                                            {feature.icon}
                                        </div>
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className={colors.text}>
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="bg-white/70 rounded-lg p-3">
                                            <h4 className="font-medium text-sm text-gray-800 mb-1">🎯 활용 방안</h4>
                                            <p className="text-sm text-gray-700">{feature.benefits}</p>
                                        </div>
                                        {feature.implementation && (
                                            <div className="bg-white/70 rounded-lg p-3">
                                                <h4 className="font-medium text-sm text-gray-800 mb-1">⚡ 구현 예시</h4>
                                                <p className="text-sm text-gray-700">{feature.implementation}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* 추가 고려사항 */}
            <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">추가 고려사항</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {additionalFeatures.map((feature, index) => {
                        const colors = getColorClasses(feature.color);
                        return (
                            <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border} ${colors.bg}`}>
                                <CardHeader className="pb-3">
                                    <CardTitle className={`flex items-center gap-3 ${colors.text}`}>
                                        <div className={`p-2 ${colors.icon} rounded-lg`}>
                                            {feature.icon}
                                        </div>
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className={colors.text}>
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-white/70 rounded-lg p-3">
                                        <p className="text-sm text-gray-700">{feature.benefits}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* 결론 */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Badge className="bg-green-500">결론</Badge>
                    CTI 애플리케이션 개발 방향
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    이러한 Tauri의 네이티브 기능들을 적절히 활용하면, 단순히 웹 페이지를 보여주는 것을 넘어
                    <strong className="text-blue-700"> 사용자 경험이 뛰어난 강력한 데스크톱 상담 애플리케이션</strong>을 구축할 수 있습니다.
                    특히 시스템 트레이, 네이티브 알림, 윈도우 관리 기능을 통해 상담사의 업무 효율성을 크게 향상시킬 수 있을 것입니다.
                </p>
            </div>
        </section>
    );
};

export default ReferenceForCti;