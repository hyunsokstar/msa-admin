import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ExternalLink,
    Figma,
    Github,
    Globe,
    Bug,
    Monitor,
    Link as LinkIcon
} from 'lucide-react';

interface Props { }

const ReferSite = (props: Props) => {
    const referenceLinks = [
        {
            icon: <Figma className="h-6 w-6" />,
            title: "피그마 디자인",
            description: "U-Admin 신버전 디자인 시스템",
            url: "https://www.figma.com/design/Eg8B539TdgtjbgDaCEFj0K/U--Admin-%EC%8B%A0%EB%B2%84%EC%A0%84-?node-id=2551-27453&p=f&t=qDTHzyXjTtMOtH1v-0",
            color: "purple",
            category: "Design"
        },
        {
            icon: <Github className="h-6 w-6" />,
            title: "개인화 Tool Repository",
            description: "Tauri CTI Task Manager 소스코드",
            url: "https://github.com/nexus-aicc-lab/tauri-cti-task-manager",
            color: "gray",
            category: "Source"
        },
        {
            icon: <LinkIcon className="h-6 w-6" />,
            title: "Tauri 네이티브 기능",
            description: "Biometric 플러그인 공식 문서",
            url: "https://v2.tauri.app/plugin/biometric/",
            color: "orange",
            category: "Docs"
        },
        {
            icon: <Globe className="h-6 w-6" />,
            title: "메인 프로젝트",
            description: "운영 중인 CTI 관리 시스템",
            url: "http://121.170.212.213/ipccservice/admin_tab_cti",
            color: "blue",
            category: "Production"
        },
        {
            icon: <Bug className="h-6 w-6" />,
            title: "Jira 이슈 관리",
            description: "CWEB2025-8 프로젝트 관리",
            url: "https://nexuscmty.atlassian.net/browse/CWEB2025-8",
            color: "red",
            category: "Management"
        },
        {
            icon: <Monitor className="h-6 w-6" />,
            title: "개발 사이트",
            description: "개발 환경 Admin 페이지",
            url: "https://webdev-199.nexuscommunity.kr/admin/",
            color: "green",
            category: "Development"
        }
    ];

    const getColorClasses = (color: string) => {
        const colorMap: { [key: string]: { bg: string; text: string; border: string; icon: string; badge: string } } = {
            purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-l-purple-500", icon: "bg-purple-100", badge: "bg-purple-100 text-purple-700" },
            gray: { bg: "bg-gray-50", text: "text-gray-700", border: "border-l-gray-500", icon: "bg-gray-100", badge: "bg-gray-100 text-gray-700" },
            orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-l-orange-500", icon: "bg-orange-100", badge: "bg-orange-100 text-orange-700" },
            blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-l-blue-500", icon: "bg-blue-100", badge: "bg-blue-100 text-blue-700" },
            red: { bg: "bg-red-50", text: "text-red-700", border: "border-l-red-500", icon: "bg-red-100", badge: "bg-red-100 text-red-700" },
            green: { bg: "bg-green-50", text: "text-green-700", border: "border-l-green-500", icon: "bg-green-100", badge: "bg-green-100 text-green-700" }
        };
        return colorMap[color] || colorMap.blue;
    };

    const handleLinkClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="mt-8 p-4 bg-white rounded-2xl shadow">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                        <ExternalLink className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-700">참고 사이트 및 리소스</h2>
                        <p className="text-gray-600 mt-1">프로젝트 관련 주요 링크 및 참고 자료 모음</p>
                    </div>
                </div>

                {/* 개요 */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                    <p className="text-gray-700 leading-relaxed">
                        CTI 고도화 프로젝트와 관련된 <strong className="text-indigo-700">주요 참고 사이트</strong>,
                        소스코드 저장소, 문서, 그리고 개발/운영 환경 링크들을 한 곳에 정리했습니다.
                    </p>
                </div>
            </div>

            {/* 참고 링크들 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {referenceLinks.map((link, index) => {
                    const colors = getColorClasses(link.color);
                    return (
                        <Card
                            key={index}
                            className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${colors.border} ${colors.bg} cursor-pointer group`}
                            onClick={() => handleLinkClick(link.url)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`p-2 ${colors.icon} rounded-lg group-hover:scale-110 transition-transform`}>
                                        {link.icon}
                                    </div>
                                    <Badge className={`${colors.badge} border-none`}>
                                        {link.category}
                                    </Badge>
                                </div>
                                <CardTitle className={`${colors.text} group-hover:text-opacity-80 transition-colors`}>
                                    {link.title}
                                </CardTitle>
                                <CardDescription className={`${colors.text} text-opacity-70`}>
                                    {link.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 truncate font-mono bg-gray-100 rounded px-2 py-1">
                                            {link.url.replace('https://', '').replace('http://', '')}
                                        </p>
                                    </div>
                                    <ExternalLink className={`h-4 w-4 ${colors.text} ml-2 group-hover:translate-x-1 transition-transform`} />
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* 사용 안내 */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Badge className="bg-blue-500">안내</Badge>
                    링크 사용 방법
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                        <span className="font-medium text-blue-700">• 외부 링크:</span> 새 탭에서 자동으로 열립니다
                    </div>
                    <div>
                        <span className="font-medium text-blue-700">• 카테고리:</span> Design, Source, Docs, Production 등으로 구분
                    </div>
                    <div>
                        <span className="font-medium text-blue-700">• 호버 효과:</span> 마우스 오버 시 카드가 확대됩니다
                    </div>
                    <div>
                        <span className="font-medium text-blue-700">• 모바일:</span> 터치로도 링크 접근 가능합니다
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReferSite;