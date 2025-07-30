"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, Star, ChevronDown, ChevronUp, Smartphone, Layout, Shield, Database, Zap, TestTube, FileText, Settings } from 'lucide-react'

interface Props { }

const StudyForFrontend = (props: Props) => {
    const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({})
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const toggleCard = (id: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const frontendMasterCertifications = [
        // Next.js & Core (6종)
        {
            id: 1,
            category: 'core',
            title: "Next.js 15 App Router Master",
            description: "Next.js 15 App Router 및 React 19 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-14일",
            techStack: ["Next.js 15", "React 19", "App Router", "Server Components", "Turbopack"],
            detailItems: [
                "App Router vs Pages Router 마이그레이션",
                "Server Components vs Client Components",
                "Server Actions 및 Form 처리",
                "Route Handlers API 구현",
                "Dynamic Routes 및 Catch-all Routes",
                "Parallel Routes 및 Intercepting Routes",
                "Streaming SSR 및 Suspense",
                "Metadata API 및 SEO 최적화",
                "Image 최적화 및 Font 최적화",
                "Turbopack 번들러 활용"
            ]
        },
        {
            id: 2,
            category: 'core',
            title: "React 19 Advanced Master",
            description: "React 19 고급 패턴 및 최적화 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["React 19", "React Compiler", "Concurrent Features", "Hooks", "Context"],
            detailItems: [
                "React Compiler 자동 최적화",
                "use() Hook 및 Promise 처리",
                "Concurrent Features (Suspense, Transitions)",
                "Custom Hooks 고급 패턴",
                "Context API 성능 최적화",
                "React DevTools Profiler 활용",
                "Memo, useMemo, useCallback 최적화",
                "Error Boundaries 고급 처리",
                "Ref 패턴 및 forwardRef",
                "Higher-Order Components 패턴"
            ]
        },
        {
            id: 3,
            category: 'core',
            title: "TypeScript Advanced Master",
            description: "TypeScript 5.x 고급 타입 시스템 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["TypeScript 5.x", "Type Guards", "Generic", "Utility Types", "Decorators"],
            detailItems: [
                "Advanced Generic 패턴",
                "Conditional Types 및 Mapped Types",
                "Template Literal Types",
                "Type Guards 및 Discriminated Unions",
                "Utility Types (Pick, Omit, Record 등)",
                "Module Augmentation 및 Declaration Merging",
                "Decorators 및 Metadata",
                "Brand Types 및 Nominal Typing",
                "Type-safe API 클라이언트 생성",
                "TypeScript ESLint 고급 규칙"
            ]
        },
        {
            id: 4,
            category: 'state',
            title: "Zustand Advanced Master",
            description: "Zustand 상태 관리 아키텍처 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Zustand", "Immer", "Persist", "DevTools", "Middleware"],
            detailItems: [
                "Store 설계 패턴 및 분리 전략",
                "Immer 미들웨어 활용",
                "Persist 미들웨어로 상태 영속화",
                "DevTools 미들웨어 디버깅",
                "Subscription 패턴",
                "Computed Values 구현",
                "Store 간 통신 패턴",
                "TypeScript와 타입 안전 Store",
                "SSR 환경에서의 Zustand",
                "Performance 최적화 패턴"
            ]
        },
        {
            id: 5,
            category: 'state',
            title: "TanStack Query v5 Master",
            description: "서버 상태 관리 및 캐싱 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-12일",
            techStack: ["TanStack Query v5", "React Query", "Infinite Queries", "Optimistic Updates", "Suspense"],
            detailItems: [
                "Query 및 Mutation 고급 패턴",
                "Infinite Queries 무한 스크롤",
                "Optimistic Updates 구현",
                "Query Invalidation 전략",
                "Parallel Queries 및 Dependent Queries",
                "Suspense Mode 활용",
                "Error Handling 및 Retry 로직",
                "Cache 관리 및 Background Updates",
                "Offline Support 구현",
                "DevTools 활용 및 디버깅"
            ]
        },
        {
            id: 6,
            category: 'ui',
            title: "Tailwind CSS Advanced Master",
            description: "Tailwind CSS 고급 커스터마이징 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Tailwind CSS", "HeadlessUI", "JIT", "Plugins", "Design Tokens"],
            detailItems: [
                "Custom Design System 구축",
                "Tailwind Config 고급 설정",
                "Custom Plugins 개발",
                "JIT 컴파일러 최적화",
                "Component Variants 패턴",
                "Dark Mode 구현 전략",
                "Responsive Design 고급 패턴",
                "Animation 및 Transition",
                "CSS-in-JS와 통합",
                "Performance 최적화"
            ]
        },
        // UI/UX (8종)
        {
            id: 7,
            category: 'ui',
            title: "Shadcn/UI Master",
            description: "Shadcn/UI 컴포넌트 시스템 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Shadcn/UI", "Radix UI", "CVA", "Tailwind Variants", "Lucide Icons"],
            detailItems: [
                "Shadcn/UI CLI 및 컴포넌트 설치",
                "Custom 컴포넌트 개발",
                "Radix UI Primitives 활용",
                "Class Variance Authority (CVA)",
                "Theme 커스터마이징",
                "Compound Components 패턴",
                "Accessibility 최적화",
                "Form Components 통합",
                "Data Table 고급 구현",
                "Animation 및 Transition"
            ]
        },
        {
            id: 8,
            category: 'ui',
            title: "Framer Motion Master",
            description: "고급 애니메이션 및 인터랙션 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Framer Motion", "Layout Animations", "Gestures", "SVG Animations", "3D"],
            detailItems: [
                "Layout Animations 및 Shared Layout",
                "Gesture 인터랙션 (드래그, 스와이프)",
                "Scroll-triggered Animations",
                "SVG Path 애니메이션",
                "Page Transitions 구현",
                "AnimatePresence 활용",
                "Motion Values 및 Transform",
                "3D Transforms 및 Perspective",
                "Performance 최적화",
                "Custom Variants 패턴"
            ]
        },
        {
            id: 9,
            category: 'forms',
            title: "React Hook Form + Zod Master",
            description: "폼 관리 및 유효성 검사 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["React Hook Form", "Zod", "Hookform Resolvers", "Controller", "DevTools"],
            detailItems: [
                "Complex Form 설계 패턴",
                "Zod Schema 기반 유효성 검사",
                "Dynamic Fields 및 Field Arrays",
                "Controller를 통한 외부 컴포넌트 통합",
                "Conditional Fields 구현",
                "File Upload 처리",
                "Multi-step Forms",
                "Form State 관리 최적화",
                "Error Handling 전략",
                "DevTools 디버깅"
            ]
        },
        {
            id: 10,
            category: 'ui',
            title: "Figma to Code Master",
            description: "Figma 디자인 시스템 코드 변환 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "7-9일",
            techStack: ["Figma API", "Design Tokens", "Figma Plugins", "Storybook", "Chromatic"],
            detailItems: [
                "Figma API를 통한 디자인 데이터 추출",
                "Design Tokens 자동 생성",
                "Component Variants 매핑",
                "Auto Layout to Flexbox/Grid",
                "Figma Plugins 개발",
                "Storybook 연동",
                "Design System 문서화",
                "Version Control 통합",
                "Collaboration Workflow",
                "Automated Testing 연동"
            ]
        },
        // Security & Auth (4종)
        {
            id: 11,
            category: 'security',
            title: "NextAuth.js v5 Master",
            description: "Next.js 인증 시스템 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["NextAuth.js v5", "OAuth", "JWT", "Session", "Adapters"],
            detailItems: [
                "NextAuth.js v5 마이그레이션",
                "Multiple OAuth Providers 설정",
                "Custom Providers 개발",
                "JWT vs Database Sessions",
                "Role-based Access Control",
                "Database Adapters 구성",
                "Middleware 인증 보호",
                "CSRF Protection",
                "Session 관리 최적화",
                "Security Best Practices"
            ]
        },
        {
            id: 12,
            category: 'security',
            title: "JWT & Security Master",
            description: "프론트엔드 보안 및 토큰 관리 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "7-9일",
            techStack: ["JWT", "Refresh Tokens", "XSS Protection", "CSRF", "Cookie Security"],
            detailItems: [
                "JWT 토큰 구조 및 서명 검증",
                "Refresh Token 자동 갱신",
                "XSS 공격 방어 전략",
                "CSRF Token 구현",
                "Secure Cookie 설정",
                "Token 저장소 보안 (httpOnly)",
                "API Rate Limiting 클라이언트",
                "Content Security Policy",
                "HTTPS 및 HSTS 설정",
                "Security Headers 구성"
            ]
        },
        // Real-time & Communication (4종)
        {
            id: 13,
            category: 'realtime',
            title: "WebSocket & SSE Master",
            description: "실시간 통신 구현 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["WebSocket", "Server-Sent Events", "Socket.io", "WebRTC", "Broadcast Channel"],
            detailItems: [
                "WebSocket 연결 관리 및 재연결",
                "Server-Sent Events 구현",
                "Socket.io 클라이언트 고급 기능",
                "Message Queue 패턴",
                "Connection Pool 관리",
                "Heartbeat 및 Connection Health",
                "Broadcast Channel API",
                "WebRTC 기초 구현",
                "Error Handling 및 Fallback",
                "Performance 모니터링"
            ]
        },
        {
            id: 14,
            category: 'realtime',
            title: "GraphQL Client Master",
            description: "GraphQL 클라이언트 최적화 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Apollo Client", "GraphQL Codegen", "Subscriptions", "Cache", "Optimistic UI"],
            detailItems: [
                "Apollo Client 3.x 고급 설정",
                "GraphQL Code Generator 활용",
                "Subscriptions 실시간 업데이트",
                "Normalized Cache 최적화",
                "Optimistic UI 구현",
                "Error Link 및 Retry Logic",
                "Fragment Composition",
                "Local State Management",
                "Batch Queries 최적화",
                "DevTools 활용"
            ]
        },
        // Visualization & Data (4종)
        {
            id: 15,
            category: 'data',
            title: "Chart.js & Recharts Master",
            description: "데이터 시각화 및 차트 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Chart.js", "Recharts", "D3.js", "React-vis", "Plotly"],
            detailItems: [
                "Chart.js 4.x 고급 설정",
                "Recharts Composed Charts",
                "Custom Chart Components",
                "Interactive Tooltips & Legends",
                "Animation 및 Transition",
                "Responsive Charts",
                "Real-time Data Updates",
                "Export 기능 (PNG, SVG, PDF)",
                "Performance 최적화",
                "Accessibility 준수"
            ]
        },
        {
            id: 16,
            category: 'data',
            title: "Data Grid & Table Master",
            description: "고성능 데이터 테이블 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["TanStack Table", "React Window", "AG Grid", "Material Table", "Virtualization"],
            detailItems: [
                "TanStack Table v8 고급 기능",
                "Virtual Scrolling 구현",
                "Column Sorting & Filtering",
                "Row Selection & Bulk Actions",
                "Inline Editing 구현",
                "Export 기능 (CSV, Excel)",
                "Pagination 최적화",
                "Performance Monitoring",
                "Accessibility 최적화",
                "Custom Cell Renderers"
            ]
        },
        // Testing (4종)
        {
            id: 17,
            category: 'testing',
            title: "Vitest & Testing Library Master",
            description: "프론트엔드 테스팅 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "7-9일",
            techStack: ["Vitest", "Testing Library", "MSW", "Playwright", "Jest"],
            detailItems: [
                "Vitest 설정 및 최적화",
                "React Testing Library 고급 패턴",
                "Mock Service Worker (MSW) 활용",
                "Component Testing 전략",
                "Integration Testing",
                "Snapshot Testing",
                "Custom Render 함수",
                "Test Utils 라이브러리",
                "Coverage Reports",
                "CI/CD Testing Pipeline"
            ]
        },
        {
            id: 18,
            category: 'testing',
            title: "Storybook Advanced Master",
            description: "컴포넌트 문서화 및 테스팅 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Storybook 8.x", "Addon-docs", "Chromatic", "Interaction Testing", "Visual Testing"],
            detailItems: [
                "Storybook 8.x 고급 설정",
                "Stories 작성 패턴",
                "Addon-docs 문서 자동화",
                "Args & Controls 활용",
                "Interaction Testing",
                "Visual Regression Testing",
                "Chromatic 배포",
                "Design System Integration",
                "Custom Addons 개발",
                "Performance Monitoring"
            ]
        },
        // Performance & Optimization (4종)
        {
            id: 19,
            category: 'performance',
            title: "Web Performance Master",
            description: "웹 성능 최적화 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "10-12일",
            techStack: ["Lighthouse", "Web Vitals", "Bundle Analyzer", "Performance API", "DevTools"],
            detailItems: [
                "Core Web Vitals 최적화",
                "Lighthouse CI 구성",
                "Bundle Size 분석 및 최적화",
                "Code Splitting 전략",
                "Image 최적화 (WebP, AVIF)",
                "Lazy Loading 구현",
                "Service Worker 캐싱",
                "Resource Hints (preload, prefetch)",
                "Performance Budget 설정",
                "Real User Monitoring (RUM)"
            ]
        },
        {
            id: 20,
            category: 'performance',
            title: "PWA & Offline Master",
            description: "Progressive Web App 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["PWA", "Service Worker", "Web App Manifest", "Push Notifications", "Background Sync"],
            detailItems: [
                "Web App Manifest 설정",
                "Service Worker 라이프사이클",
                "Cache Strategies 구현",
                "Offline First Architecture",
                "Push Notifications API",
                "Background Sync",
                "App Install Prompts",
                "Update Notifications",
                "Network Status Handling",
                "PWA Testing 전략"
            ]
        },
        // Developer Experience (6종)
        {
            id: 21,
            category: 'devtools',
            title: "ESLint & Prettier Master",
            description: "코드 품질 및 포매팅 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐",
            estimatedDays: "4-6일",
            techStack: ["ESLint 9.x", "Prettier", "Husky", "Lint-staged", "TypeScript ESLint"],
            detailItems: [
                "ESLint 9.x Flat Config",
                "Custom ESLint Rules 개발",
                "Prettier 통합 설정",
                "Pre-commit Hooks (Husky)",
                "Lint-staged 최적화",
                "TypeScript ESLint 고급 규칙",
                "Import 순서 자동 정렬",
                "Code Quality Metrics",
                "CI/CD Linting Pipeline",
                "Team Coding Standards"
            ]
        },
        {
            id: 22,
            category: 'devtools',
            title: "Webpack & Vite Master",
            description: "모던 빌드 도구 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "8-10일",
            techStack: ["Vite 5.x", "Webpack 5", "Rollup", "SWC", "esbuild"],
            detailItems: [
                "Vite 5.x 고급 설정",
                "Custom Vite Plugins 개발",
                "Webpack 5 Module Federation",
                "SWC vs Babel 성능 비교",
                "Tree Shaking 최적화",
                "Dynamic Imports 전략",
                "Build 캐싱 최적화",
                "Development Server 설정",
                "Production Build 최적화",
                "Monorepo Build 전략"
            ]
        },
        {
            id: 23,
            category: 'devtools',
            title: "Git & GitHub Advanced Master",
            description: "버전 관리 및 협업 워크플로우 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "5-7일",
            techStack: ["Git", "GitHub Actions", "Semantic Release", "Conventional Commits", "GitFlow"],
            detailItems: [
                "Advanced Git 워크플로우",
                "Interactive Rebase 활용",
                "Conflict Resolution 전략",
                "GitHub Actions 자동화",
                "Semantic Versioning",
                "Conventional Commits",
                "Branch Protection Rules",
                "PR Templates & Reviews",
                "Release Automation",
                "Monorepo Git 전략"
            ]
        },
        // Advanced Topics (7종)
        {
            id: 24,
            category: 'advanced',
            title: "Micro Frontend Master",
            description: "마이크로 프론트엔드 아키텍처 전문가",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["Module Federation", "Single-SPA", "Qiankun", "Piral", "Web Components"],
            detailItems: [
                "Module Federation 5.x 구현",
                "Shell Application 설계",
                "Micro App Routing",
                "Shared Dependencies 관리",
                "Inter-app Communication",
                "Deployment 전략",
                "Performance Monitoring",
                "Error Isolation",
                "A/B Testing 구현",
                "Micro Frontend Governance"
            ]
        },
        {
            id: 25,
            category: 'advanced',
            title: "WebAssembly & Rust Master",
            description: "WebAssembly 통합 및 성능 최적화 전문가",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "14-18일",
            techStack: ["WebAssembly", "Rust", "wasm-pack", "wasm-bindgen", "AssemblyScript"],
            detailItems: [
                "Rust to WebAssembly 컴파일",
                "JavaScript-WASM 바인딩",
                "Memory Management",
                "Performance Benchmarking",
                "Web Workers 통합",
                "Streaming Compilation",
                "WASM Package 배포",
                "Browser Compatibility",
                "Debug Tools 활용",
                "Production Optimization"
            ]
        },
        {
            id: 26,
            category: 'advanced',
            title: "Web3 & Blockchain Master",
            description: "Web3 dApp 개발 전문가",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐⭐",
            estimatedDays: "16-20일",
            techStack: ["ethers.js", "wagmi", "Web3Modal", "MetaMask", "IPFS"],
            detailItems: [
                "Ethereum 지갑 연동",
                "Smart Contract 인터랙션",
                "Transaction 처리",
                "Web3Modal 통합",
                "IPFS 파일 저장",
                "DeFi Protocol 연동",
                "NFT Marketplace 구현",
                "Gas 최적화 전략",
                "Multi-chain 지원",
                "Security Best Practices"
            ]
        },
        {
            id: 27,
            category: 'mobile',
            title: "React Native Master",
            description: "크로스 플랫폼 모바일 앱 전문가",
            priority: "Low",
            completed: false,
            difficulty: "⭐⭐⭐⭐",
            estimatedDays: "12-16일",
            techStack: ["React Native", "Expo", "Native Modules", "React Navigation", "AsyncStorage"],
            detailItems: [
                "React Native CLI vs Expo",
                "Navigation 고급 패턴",
                "Platform-specific Code",
                "Native Modules 개발",
                "Push Notifications",
                "AsyncStorage 최적화",
                "Performance Optimization",
                "Testing Strategy",
                "App Store 배포",
                "CodePush 업데이트"
            ]
        },
        {
            id: 28,
            category: 'deployment',
            title: "Vercel & Deployment Master",
            description: "모던 배포 플랫폼 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["Vercel", "Netlify", "AWS Amplify", "Docker", "CI/CD"],
            detailItems: [
                "Vercel 고급 설정",
                "Edge Functions 구현",
                "Custom Domains & SSL",
                "Environment Variables",
                "Preview Deployments",
                "Performance Analytics",
                "A/B Testing",
                "CDN 최적화",
                "Monitoring & Alerting",
                "Cost Optimization"
            ]
        },
        {
            id: 29,
            category: 'accessibility',
            title: "Web Accessibility Master",
            description: "웹 접근성 전문가",
            priority: "High",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "7-9일",
            techStack: ["ARIA", "WCAG 2.1", "Screen Readers", "Lighthouse", "axe-core"],
            detailItems: [
                "WCAG 2.1 AA 준수",
                "ARIA 속성 활용",
                "Keyboard Navigation",
                "Screen Reader 최적화",
                "Color Contrast 검증",
                "Focus Management",
                "Accessible Forms",
                "Live Regions",
                "Testing Tools 활용",
                "Accessibility Audits"
            ]
        },
        {
            id: 30,
            category: 'i18n',
            title: "Internationalization Master",
            description: "다국어 지원 및 현지화 전문가",
            priority: "Medium",
            completed: false,
            difficulty: "⭐⭐⭐",
            estimatedDays: "6-8일",
            techStack: ["next-intl", "react-i18next", "Format.js", "ICU MessageFormat", "Crowdin"],
            detailItems: [
                "next-intl 고급 설정",
                "Dynamic Locale Switching",
                "ICU MessageFormat",
                "Number & Date Formatting",
                "RTL Language 지원",
                "Translation Management",
                "Lazy Loading Translations",
                "SEO 다국어 최적화",
                "Cultural Adaptation",
                "A/B Testing 다국어"
            ]
        }
    ]

    const categories = [
        { id: 'all', label: '전체', icon: <Layout className="h-4 w-4" /> },
        { id: 'core', label: '핵심 프레임워크', icon: <Zap className="h-4 w-4" /> },
        { id: 'state', label: '상태 관리', icon: <Database className="h-4 w-4" /> },
        { id: 'ui', label: 'UI/UX', icon: <Layout className="h-4 w-4" /> },
        { id: 'forms', label: '폼 관리', icon: <FileText className="h-4 w-4" /> },
        { id: 'security', label: '보안/인증', icon: <Shield className="h-4 w-4" /> },
        { id: 'realtime', label: '실시간/통신', icon: <Zap className="h-4 w-4" /> },
        { id: 'data', label: '데이터/시각화', icon: <Database className="h-4 w-4" /> },
        { id: 'testing', label: '테스팅', icon: <TestTube className="h-4 w-4" /> },
        { id: 'performance', label: '성능 최적화', icon: <Zap className="h-4 w-4" /> },
        { id: 'devtools', label: '개발 도구', icon: <Settings className="h-4 w-4" /> },
        { id: 'mobile', label: '모바일', icon: <Smartphone className="h-4 w-4" /> },
        { id: 'advanced', label: '고급 주제', icon: <Star className="h-4 w-4" /> },
        { id: 'deployment', label: '배포', icon: <Settings className="h-4 w-4" /> },
        { id: 'accessibility', label: '접근성', icon: <Shield className="h-4 w-4" /> },
        { id: 'i18n', label: '국제화', icon: <Layout className="h-4 w-4" /> }
    ]

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800'
            case 'Medium': return 'bg-yellow-100 text-yellow-800'
            case 'Low': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredCertifications = selectedCategory === 'all'
        ? frontendMasterCertifications
        : frontendMasterCertifications.filter(cert => cert.category === selectedCategory)

    const highPriority = filteredCertifications.filter(cert => cert.priority === 'High')
    const mediumPriority = filteredCertifications.filter(cert => cert.priority === 'Medium')
    const lowPriority = filteredCertifications.filter(cert => cert.priority === 'Low')

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">🚀 Frontend 마스터 인증 30종</h1>
                <p className="text-xl text-gray-600">NEXUS 프론트엔드 개발 커리큘럼 (2025 최신 트렌드)</p>
                <div className="flex justify-center space-x-4 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        총 30개 인증
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        예상 기간: 6-12개월
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                        300+ 세부 학습 항목
                    </span>
                </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-colors ${selectedCategory === category.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {category.icon}
                        <span>{category.label}</span>
                    </button>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{highPriority.length}</div>
                    <div className="text-sm text-gray-600">High Priority</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{mediumPriority.length}</div>
                    <div className="text-sm text-gray-600">Medium Priority</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{lowPriority.length}</div>
                    <div className="text-sm text-gray-600">Low Priority</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600">완료</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">220-340</div>
                    <div className="text-sm text-gray-600">총 학습일</div>
                </div>
            </div>

            {/* High Priority Section */}
            {highPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
                        <Star className="h-6 w-6" />
                        <span>High Priority (우선 학습) - {highPriority.length}개</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {highPriority.map((cert) => (
                            <Card key={cert.id} className="hover:shadow-md transition-shadow border-l-4 border-l-red-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {cert.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{cert.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(cert.priority)}>{cert.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(cert.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[cert.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{cert.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {cert.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{cert.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {cert.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[cert.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">📚 세부 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {cert.detailItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Medium Priority Section */}
            {mediumPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-yellow-600">Medium Priority (2차 학습) - {mediumPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {mediumPriority.map((cert) => (
                            <Card key={cert.id} className="hover:shadow-md transition-shadow border-l-4 border-l-yellow-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {cert.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{cert.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(cert.priority)}>{cert.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(cert.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[cert.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{cert.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {cert.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{cert.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {cert.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[cert.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">📚 세부 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {cert.detailItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Low Priority Section */}
            {lowPriority.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-green-600">Low Priority (선택 학습) - {lowPriority.length}개</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {lowPriority.map((cert) => (
                            <Card key={cert.id} className="hover:shadow-md transition-shadow border-l-4 border-l-green-500">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center space-x-2">
                                            {cert.completed ?
                                                <CheckCircle className="h-5 w-5 text-green-600" /> :
                                                <Circle className="h-5 w-5 text-gray-400" />
                                            }
                                            <span>{cert.title}</span>
                                        </CardTitle>
                                        <div className="flex items-center space-x-2">
                                            <Badge className={getPriorityColor(cert.priority)}>{cert.priority}</Badge>
                                            <button
                                                onClick={() => toggleCard(cert.id)}
                                                className="p-1 hover:bg-gray-100 rounded"
                                            >
                                                {expandedCards[cert.id] ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600">{cert.description}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500">난이도: {cert.difficulty}</span>
                                        <span className="text-blue-600 font-medium">{cert.estimatedDays}</span>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {cert.techStack.map((tech, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>
                                        ))}
                                    </div>

                                    {expandedCards[cert.id] && (
                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                            <h4 className="font-semibold mb-3 text-gray-800">📚 세부 학습 항목</h4>
                                            <div className="grid md:grid-cols-1 gap-2">
                                                {cert.detailItems.map((item, idx) => (
                                                    <div key={idx} className="flex items-start space-x-2 text-sm">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* 2025 Frontend Trends */}
            <Card className="border-2 border-purple-200">
                <CardHeader className="bg-purple-50">
                    <CardTitle className="text-xl text-purple-900">🚀 2025 Frontend 생태계 트렌드</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">React 19 & Next.js 15</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• React Compiler 자동 최적화</li>
                                <li>• Server Actions 안정화</li>
                                <li>• Turbopack 기본 적용</li>
                                <li>• Concurrent Features 강화</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">State & Data Fetching</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Zustand 경량 상태관리 표준화</li>
                                <li>• TanStack Query v5 강화</li>
                                <li>• Server State vs Client State</li>
                                <li>• GraphQL Federation 확산</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-purple-800">Developer Experience</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Shadcn/UI 생태계 확장</li>
                                <li>• Vitest 테스팅 표준</li>
                                <li>• TypeScript 5.x 고도화</li>
                                <li>• AI 기반 코드 생성</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Learning Path Recommendation */}
            <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                    <CardTitle className="text-xl text-blue-900">📚 추천 학습 경로 (2025)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            <span className="font-medium">Next.js 15 + React 19 + TypeScript</span>
                            <span className="text-sm text-gray-500">(핵심 프레임워크 - 30일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            <span className="font-medium">Zustand + TanStack Query + Shadcn/UI</span>
                            <span className="text-sm text-gray-500">(상태관리 + UI - 20일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            <span className="font-medium">React Hook Form + NextAuth.js + JWT</span>
                            <span className="text-sm text-gray-500">(폼 + 보안 - 15일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                            <span className="font-medium">Vitest + Storybook + Web Accessibility</span>
                            <span className="text-sm text-gray-500">(테스팅 + 접근성 - 20일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                            <span className="font-medium">Performance + PWA + i18n</span>
                            <span className="text-sm text-gray-500">(최적화 + 확장 - 25일)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6</div>
                            <span className="font-medium">고급 주제 (선택적 학습)</span>
                            <span className="text-sm text-gray-500">(Micro Frontend, WebAssembly, Web3 등)</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
                <CardHeader>
                    <CardTitle>🎯 학습 진행 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>전체 진행률</span>
                            <span className="text-sm text-gray-500">0/30 완료 (총 300+ 학습 항목)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                        <div className="text-center text-sm text-gray-500">
                            완료된 인증이 없습니다. 프론트엔드 마스터 여정을 시작해보세요! 🚀
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StudyForFrontend