'use client';

import React, { useState, ReactNode } from 'react';
import {
    ChevronDown, ChevronRight,
    Code, Users, Layers, GitBranch,
    Cloud, Rocket, Terminal, Database, Zap,
    BookOpen, Building2, ExternalLink
} from 'lucide-react';

interface SectionProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({
    title, icon, children, defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    return (
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="text-green-600">{icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                </div>
                {isOpen ? (
                    <ChevronDown className="text-gray-600" />
                ) : (
                    <ChevronRight className="text-gray-600" />
                )}
            </button>
            {isOpen && <div className="px-6 py-4">{children}</div>}
        </div>
    );
};

export default function DanggeunReportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            당근마켓 개발문화 & 기술 현황 보고서
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        "스스로 주도, 빠른 실험, 투명한 공유" 중심의 하이퍼로컬 플랫폼
                    </p>
                </div>

                {/* 기업 문화 */}
                <CollapsibleSection title="🏡 기업 문화 & 조직" icon={<Users className="w-6 h-6" />} defaultOpen>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>스스로 판단하고 주도적으로 일하는 문화</li>
                        <li>빠르게 실험하고 사용자의 목소리에 기반한 신속한 피드백 주기</li>
                        <li>솔직하고 신뢰 있는 커뮤니케이션, 기록 기반 투명성 강조</li>
                    </ul>
                </CollapsibleSection>

                {/* 기술 스택 */}
                <CollapsibleSection title="💻 기술 스택 & 아키텍처" icon={<Code className="w-6 h-6" />}>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Go, Node.js, Kotlin 등 서버 언어 혼용 운영</li>
                        <li>하이퍼로컬 기반 공통 서비스 아키텍처 (이미지, 위치, 인증 등)</li>
                        <li>운영개발팀의 모니터링 자동화와 abuser 대응 시스템 도입</li>
                    </ul>
                </CollapsibleSection>

                {/* 현재 상황 */}
                <CollapsibleSection title="📈 현재 상황 & 성과" icon={<Zap className="w-6 h-6" />}>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>"당근 팀은 성장의 과도기에 진입" — 기술 부채 해결과 속도 최적화 병행 중</li>
                        <li>하이퍼로컬 서비스 기반 사용자 수 확대 중</li>
                        <li>2023년 약 9,450만 USD 매출·첫 흑자 달성</li>
                    </ul>
                </CollapsibleSection>

                {/* 참고 자료 */}
                <CollapsibleSection title="📚 참고 자료 및 출처" icon={<BookOpen className="w-6 h-6" />}>
                    <div className="space-y-2">
                        <a
                            href="https://about.daangn.com/culture/"
                            className="text-blue-600 hover:underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            당근 팀문화
                        </a>
                        <a
                            href="https://about.daangn.com/blog/archive/당근마켓-개발자-10문-10답"
                            className="text-blue-600 hover:underline break-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            당근 개발자 10문 10답
                        </a>
                    </div>
                </CollapsibleSection>

                {/* Footer */}
                <div className="mt-8 text-sm text-gray-500 text-center">
                    본 보고서는 2025년 6월 기준, 당근마켓 공식 블로그 및 외부 분석 자료를 종합해 작성되었습니다.
                </div>
            </div>
        </div>
    );
}
