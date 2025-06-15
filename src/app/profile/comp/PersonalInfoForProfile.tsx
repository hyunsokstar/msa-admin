'use client';

import React, { useState } from 'react';

interface TabData {
    id: string;
    title: string;
    content: React.ReactNode;
}

const PersonalInfoForProfile: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('memo');

    // 탭 데이터 정의
    const tabs: TabData[] = [
        {
            id: 'memo',
            title: '기본 메모장',
            content: (
                <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h3 className="font-semibold text-yellow-800 mb-2">오늘의 할 일</h3>
                        <ul className="text-sm text-yellow-700 space-y-1">
                            <li>• 프로젝트 기획서 검토</li>
                            <li>• 클라이언트 미팅 준비</li>
                            <li>• 코드 리뷰 완료</li>
                        </ul>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="font-semibold text-blue-800 mb-2">중요 메모</h3>
                        <p className="text-sm text-blue-700">
                            다음 주 월요일까지 데모 버전 완성 필요
                        </p>
                    </div>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                        rows={4}
                        placeholder="새로운 메모를 작성하세요..."
                    />
                </div>
            )
        },
        {
            id: 'bookmarks',
            title: '즐겨찾기',
            content: (
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">G</span>
                            </div>
                            <div>
                                <h4 className="font-medium">GitHub</h4>
                                <p className="text-xs text-gray-500">github.com</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">S</span>
                            </div>
                            <div>
                                <h4 className="font-medium">Supabase</h4>
                                <p className="text-xs text-gray-500">supabase.com</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">N</span>
                            </div>
                            <div>
                                <h4 className="font-medium">Next.js Docs</h4>
                                <p className="text-xs text-gray-500">nextjs.org/docs</p>
                            </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        </button>
                    </div>

                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                        + 새 즐겨찾기 추가
                    </button>
                </div>
            )
        },
        {
            id: 'archive',
            title: '자료실',
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">PDF</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">프로젝트 기획서.pdf</h4>
                                    <p className="text-xs text-gray-500">2.3MB</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">2025.06.15</span>
                                <button className="text-blue-600 hover:text-blue-800 text-xs">다운로드</button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">XLS</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">일정 관리표.xlsx</h4>
                                    <p className="text-xs text-gray-500">1.1MB</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">2025.06.14</span>
                                <button className="text-blue-600 hover:text-blue-800 text-xs">다운로드</button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">DOC</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">회의록 템플릿.docx</h4>
                                    <p className="text-xs text-gray-500">856KB</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">2025.06.13</span>
                                <button className="text-blue-600 hover:text-blue-800 text-xs">다운로드</button>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">ZIP</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">디자인 리소스.zip</h4>
                                    <p className="text-xs text-gray-500">15.2MB</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-400">2025.06.12</span>
                                <button className="text-blue-600 hover:text-blue-800 text-xs">다운로드</button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-3 text-sm">폴더</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                                        <span className="text-white text-xs">📁</span>
                                    </div>
                                    <span className="font-medium text-sm">프로젝트 문서</span>
                                </div>
                                <span className="text-xs text-gray-500">12개 파일</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                                        <span className="text-white text-xs">📁</span>
                                    </div>
                                    <span className="font-medium text-sm">참고 자료</span>
                                </div>
                                <span className="text-xs text-gray-500">8개 파일</span>
                            </div>
                        </div>
                    </div>

                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                        + 파일 업로드
                    </button>
                </div>
            )
        },
        {
            id: 'study',
            title: '학습 일지',
            content: (
                <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-green-800">React Data Grid 학습</h3>
                            <span className="text-xs text-gray-500">2025.06.15</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                            react-data-grid를 사용한 테이블 구현 방법 학습.
                            컬럼 고정, 리사이즈, 셀 커스터마이징 등의 기능 습득.
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">DataGrid</span>
                        </div>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-blue-800">Supabase 연동</h3>
                            <span className="text-xs text-gray-500">2025.06.14</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                            Next.js 프로젝트에 Supabase를 연동하여 실시간 데이터베이스 구축.
                            인증 및 CRUD 작업 구현.
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Supabase</span>
                            <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Database</span>
                        </div>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-yellow-800">TypeScript 고급 문법</h3>
                            <span className="text-xs text-gray-500">2025.06.13</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                            제네릭, 유니온 타입, 인터섹션 타입 등 TypeScript의 고급 기능들을
                            실제 프로젝트에 적용하는 방법 학습.
                        </p>
                        <div className="flex space-x-2 mt-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">TypeScript</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">고급문법</span>
                        </div>
                    </div>

                    <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                        + 새 학습 기록 추가
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
            {/* 탭 헤더 */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            <div className="p-4 h-96 overflow-y-auto">
                {tabs.find(tab => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default PersonalInfoForProfile;