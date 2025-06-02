// components/FrontendTechTable.tsx
'use client';

import React from 'react';

interface TechItem {
    category: string;
    tech: string;
    description: string;
    alternatives: string;
    link: string;
    summary: string;
    tip: string;
    learningCurve: number;
    importance: number;
    required: boolean;
}

const techList: TechItem[] = [
    // ──────────────── 필수(required) 항목 (importance 내림차순) ────────────────
    {
        category: '언어/환경',
        tech: 'JavaScript / TypeScript',
        description:
            '모던 웹 개발의 핵심 언어이며, 타입 안전성과 유지보수에 강점이 있는 TypeScript가 선호됩니다.',
        alternatives: 'Pure JS, Dart',
        link: 'https://www.typescriptlang.org/',
        summary: '프론트엔드 기본 언어',
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
        category: '라우팅',
        tech: 'Next.js App Router',
        description:
            'Next.js 13+ App Router를 이용한 파일 기반 동적 라우팅 및 서버 컴포넌트 지원',
        alternatives: 'React Router (CRA 환경)',
        link: 'https://nextjs.org/docs/app',
        summary: 'Next.js 라우팅 핵심',
        tip: '레이아웃과 페이지 분리 설계 중요',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '인증',
        tech: '인증1: JWT',
        description: 'JSON Web Token 기반 Stateless 인증 방식',
        alternatives: 'Session 기반 인증',
        link: 'https://jwt.io/introduction',
        summary: '토큰 기반 인증',
        tip: 'Access/Refresh Token 분리 전략 권장',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '상태 관리',
        tech: 'Zustand',
        description:
            '가볍고 직관적인 전역 상태 관리 라이브러리로, 보일러플레이트가 적고 사용법이 간단합니다.',
        alternatives: 'Redux Toolkit, Recoil, Jotai',
        link: 'https://zustand-demo.pmnd.rs/',
        summary: '가벼운 상태관리',
        tip: 'persist, middleware 조합 활용 권장',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '데이터 패칭',
        tech: 'TanStack Query',
        description:
            '서버 상태를 캐싱/관리하고 자동 리페치, 오류 처리 등을 지원하는 비동기 라이브러리입니다.',
        alternatives: 'SWR, Apollo Client',
        link: 'https://tanstack.com/query/latest',
        summary: '서버 상태 관리 표준',
        tip: 'queryClient.invalidateQueries() 패턴 익히기',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '스타일링',
        tech: 'Tailwind CSS / shadcn/ui / Headless UI',
        description:
            '유틸리티 퍼스트 Tailwind CSS와, Radix 기반 shadcn/ui, Tailwind 친화 Headless UI를 결합한 스타일링 조합',
        alternatives: 'Chakra UI, MUI, Emotion',
        link: 'https://tailwindcss.com/',
        summary: '실무용 스타일링 통합',
        tip: 'shadcn/ui는 CLI로 설치 후 import 방식으로 사용, Headless UI 접근성 보장',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '디버깅',
        tech: 'DevTools',
        description: '크롬/파이어폭스 등 브라우저 내장 디버깅 툴',
        alternatives: '-',
        link: 'https://developer.chrome.com/docs/devtools/',
        summary: '네트워크·JS 디버깅 필수',
        tip: 'Lighthouse, Performance 탭 활용',
        learningCurve: 1,
        importance: 5,
        required: true,
    },
    {
        category: '인증',
        tech: '인증2: NextAuth',
        description: 'Next.js에 최적화된 인증/세션 관리 라이브러리',
        alternatives: 'Clerk, Auth0',
        link: 'https://next-auth.js.org/',
        summary: 'Next.js 인증 솔루션',
        tip: 'Provider 설정 및 환경변수 관리 주의',
        learningCurve: 2,
        importance: 4,
        required: true,
    },
    {
        category: '테스트',
        tech: 'Playwright',
        description: 'E2E 브라우저 테스트 자동화 프레임워크로 크로스 브라우저 지원',
        alternatives: 'Cypress, Cypress IO',
        link: 'https://playwright.dev/',
        summary: '프론트 E2E 테스트',
        tip: 'GitHub Actions 연동하여 CI 테스트 자동화',
        learningCurve: 3,
        importance: 4,
        required: true,
    },
    {
        category: '툴링',
        tech: 'ESLint / Prettier',
        description:
            '코드 품질(ESLint)과 코드 포맷팅(Prettier)을 자동화하여 협업 품질 유지',
        alternatives: 'biome.sh',
        link: 'https://eslint.org/',
        summary: '자동화 코드 스타일',
        tip: 'CI 파이프라인에 lint 검사 포함 필수',
        learningCurve: 1,
        importance: 4,
        required: true,
    },
    {
        category: '배포',
        tech: 'Vercel',
        description: 'Next.js 최적화 배포 플랫폼. 자동 SSL, CDN, CI 지원',
        alternatives: 'Netlify, AWS Amplify',
        link: 'https://vercel.com/',
        summary: '서버리스 배포 최적화',
        tip: '환경 변수 세팅과 빌드 명령어 관리 중요',
        learningCurve: 1,
        importance: 4,
        required: true,
    },
    // ──────────────── 비필수(non-required) 항목 (importance 내림차순) ────────────────
    {
        category: 'UI 컴포넌트',
        tech: 'Radix UI',
        description: '접근성 보장 Headless UI 컴포넌트 라이브러리',
        alternatives: 'Headless UI, shadcn/ui',
        link: 'https://www.radix-ui.com/',
        summary: 'Headless UI 기본 빌딩 블록',
        tip: 'shadcn/ui 내부 구현 공부 시 유용',
        learningCurve: 3,
        importance: 4,
        required: false,
    },
    {
        category: '에디터',
        tech: 'Lexical',
        description: '페이스북이 개발한 차세대 WYSIWYG 에디터. 커스텀 확장성 뛰어남',
        alternatives: 'Tiptap, Slate',
        link: 'https://lexical.dev/',
        summary: '강력한 웹 에디터',
        tip: 'nodeMap 및 decorator 이해 필수',
        learningCurve: 4,
        importance: 4,
        required: false,
    },
    {
        category: '테스트',
        tech: 'Jest',
        description: '단위(Unit) 테스트 및 스냅샷 테스트 프레임워크',
        alternatives: 'Vitest, Mocha',
        link: 'https://jestjs.io/',
        summary: '로직 검증 유닛 테스트',
        tip: 'React Testing Library와 함께 사용 권장',
        learningCurve: 2,
        importance: 3,
        required: false,
    },
    {
        category: '성능 최적화',
        tech: 'Lighthouse',
        description:
            '웹 성능 측정 및 개선 지표를 자동 분석하는 도구',
        alternatives: 'WebPageTest, GTmetrix',
        link: 'https://developers.google.com/web/tools/lighthouse',
        summary: '웹 성능·접근성 분석',
        tip: 'Core Web Vitals(FCP, LCP, CLS) 개선 포커스',
        learningCurve: 2,
        importance: 4,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'Storybook',
        description:
            '컴포넌트 단위 UI 문서화 및 시각화 도구로 디자인 시스템 QA에 활용',
        alternatives: 'Chromatic',
        link: 'https://storybook.js.org/',
        summary: '컴포넌트 카탈로그',
        tip: 'Addons(Size, Controls, Docs) 활용',
        learningCurve: 2,
        importance: 4,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'Refactoring UI',
        description:
            'UI 디자인 개선 가이드 및 패턴을 제공하는 온라인 서적/리소스',
        alternatives: 'Designing Interfaces',
        link: 'https://refactoringui.com/',
        summary: '디자인 감각 향상',
        tip: '디자인 고민 시 실무 인사이트 제공',
        learningCurve: 2,
        importance: 3,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'Dribbble',
        description: '전 세계 디자이너들이 공유하는 UI/UX 디자인 플랫폼',
        alternatives: 'Behance',
        link: 'https://dribbble.com/',
        summary: '최신 UI 트렌드 참고',
        tip: '구현 가능한 디자인만 참고',
        learningCurve: 1,
        importance: 3,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'Frontend Mentor',
        description:
            'UI 클론 코딩 과제 제공 플랫폼으로, 디자인 파일에 기반한 구현 연습 가능',
        alternatives: 'DevChallenges',
        link: 'https://www.frontendmentor.io/',
        summary: '디자인 구현 연습',
        tip: 'Figma 연동해서 실무 감각 기르기',
        learningCurve: 2,
        importance: 3,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'DevChallenges',
        description:
            '실제 UI/UX 과제를 클론 코딩하며 성장할 수 있는 플랫폼',
        alternatives: 'Frontend Mentor',
        link: 'https://devchallenges.io/',
        summary: '중간 난이도 UI 구현 연습',
        tip: '미션 중심 과제 해결 시 동기 부여 극대화',
        learningCurve: 2,
        importance: 3,
        required: false,
    },
    {
        category: 'UI 디자인',
        tech: 'Designing Interfaces',
        description:
            '패턴 기반 UI 설계 원칙을 설명한 책/자료',
        alternatives: 'Refactoring UI',
        link: 'https://www.oreilly.com/library/view/designing-interfaces-3rd/9781492051958/',
        summary: '복잡 UI 설계 패턴 제공',
        tip: '패턴 중심 사고방식 학습에 도움',
        learningCurve: 3,
        importance: 3,
        required: false,
    },
    {
        category: '시각화',
        tech: 'Canvas 기반 UI 구현',
        description:
            'HTML5 Canvas 혹은 Fabric.js, Konva 등 라이브러리로 고급 UI/그래픽 처리',
        alternatives: 'SVG, WebGL',
        link: 'https://konvajs.org/',
        summary: '정교한 시각적 상호작용 구현',
        tip: '이미지·도형 기반 UI 로직 이해 필수',
        learningCurve: 4,
        importance: 3,
        required: false,
    },
    {
        category: '데스크톱',
        tech: 'Electron / Tauri',
        description:
            '웹 기술 기반 데스크톱 애플리케이션 제작 도구',
        alternatives: 'Neutralino, Flutter (desktop)',
        link: 'https://tauri.app/',
        summary: 'Electron은 무겁지만 기능 풍부, Tauri는 가볍고 보안·성능 장점',
        tip: 'Tauri 사용 시 Rust 빌드 구성 필요',
        learningCurve: 3,
        importance: 3,
        required: false,
    },
    {
        category: '기타',
        tech: 'MCP (Multi-Channel Panel) 도구',
        description:
            '콜센터 멀티 채널 UI 통합을 위한 대시보드·커스터마이징 도구',
        alternatives: '내부 개발 솔루션',
        link: '-',
        summary: '멀티 채널 제어 UI',
        tip: '고객 컨텍스트 동기화 로직 중요',
        learningCurve: 3,
        importance: 4,
        required: false,
    },
];

const FrontendTechTable: React.FC = () => {
    return (
        <div className="w-full overflow-x-auto py-10">
            <h2 className="text-2xl font-bold mb-4">프론트 엔드 스킬 목록</h2>
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
