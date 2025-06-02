// components/FrontendTechTable.tsx
'use client';

import React from 'react';

const techList = [
    {
        category: '기본 언어/환경',
        tech: 'JavaScript / TypeScript',
        description: '모던 웹 개발의 핵심 언어이며, 타입 안정성과 유지보수에 강점이 있는 TypeScript가 선호됩니다.',
        alternatives: 'Pure JS, Dart',
        link: 'https://www.typescriptlang.org/',
        summary: '프론트엔드 개발 기본 언어',
        tip: 'TS 5.x 이상 사용 권장',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '프레임워크',
        tech: 'Next.js',
        description: 'React 기반의 메타 프레임워크로, 서버 컴포넌트, SSR/SSG 및 App Router 지원.',
        alternatives: 'Remix, Nuxt.js (Vue)',
        link: 'https://nextjs.org/',
        summary: 'React 기반 통합 솔루션',
        tip: 'App Router 기반 프로젝트 구조 권장',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '스타일링',
        tech: 'Tailwind CSS, shadcn/ui, headless/ui',
        description: '클래스 유틸리티 기반 스타일링 (Tailwind)과 접근성 고려된 UI 컴포넌트(headless, shadcn).',
        alternatives: 'Chakra UI, MUI, Emotion',
        link: 'https://tailwindcss.com/',
        summary: '실무에서 널리 사용되는 스타일링 조합',
        tip: 'shadcn/ui는 CLI로 설치 후 직접 import 방식 사용',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '상태 관리',
        tech: 'Zustand',
        description: '작고 강력한 전역 상태 관리 라이브러리로 보일러플레이트가 적고 사용이 직관적입니다.',
        alternatives: 'Redux Toolkit, Recoil, Jotai',
        link: 'https://zustand-demo.pmnd.rs/',
        summary: '가볍고 유연한 상태관리',
        tip: 'persist, middleware 패턴 적극 활용',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '데이터 패칭',
        tech: 'TanStack Query',
        description: '서버 상태를 캐싱/관리하고 자동 리페치, 오류 처리 등을 지원하는 비동기 관리 라이브러리입니다.',
        alternatives: 'SWR, React Query (이전 명칭)',
        link: 'https://tanstack.com/query/latest',
        summary: '서버 상태 관리 표준',
        tip: 'Zustand와 함께 사용하는 패턴이 유행',
        learningCurve: 3,
        importance: 5,
        required: true,
    }
    // 15개 이상 이어서 추가 가능
];

const FrontendTechTable = () => {
    return (
        <div className="w-full overflow-x-auto py-10">
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100 text-gray-900">
                    <tr>
                        <th className="border px-4 py-2">분류</th>
                        <th className="border px-4 py-2">기술</th>
                        <th className="border px-4 py-2">설명</th>
                        <th className="border px-4 py-2">대안</th>
                        <th className="border px-4 py-2">공식 문서</th>
                        <th className="border px-4 py-2">요약</th>
                        <th className="border px-4 py-2">팁</th>
                        <th className="border px-4 py-2">러닝 커브</th>
                        <th className="border px-4 py-2">중요도</th>
                        <th className="border px-4 py-2">필수 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {techList.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 whitespace-nowrap">{item.category}</td>
                            <td className="border px-4 py-2 font-medium text-gray-800">{item.tech}</td>
                            <td className="border px-4 py-2 text-gray-700">{item.description}</td>
                            <td className="border px-4 py-2 text-gray-600">{item.alternatives}</td>
                            <td className="border px-4 py-2">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    링크
                                </a>
                            </td>
                            <td className="border px-4 py-2 text-gray-700">{item.summary}</td>
                            <td className="border px-4 py-2 text-gray-700">{item.tip}</td>
                            <td className="border px-4 py-2 text-center">{item.learningCurve}</td>
                            <td className="border px-4 py-2 text-center">{item.importance}</td>
                            <td className="border px-4 py-2 text-center">
                                {item.required ? '✅ 필수' : '⚪ 비필수'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FrontendTechTable;
