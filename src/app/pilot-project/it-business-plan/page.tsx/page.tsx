// C:\Users\terec\msa-admin\src\app\pilot-project\it-business-plan\page.tsx\page.tsx
'use client';

import React, { useState } from 'react';

export default function ITBusinessPlanPage() {
    const [activeStrategy, setActiveStrategy] = useState(0);
    const [expandedCase, setExpandedCase] = useState<string | null>(null);
    const [activeTechTab, setActiveTechTab] = useState('overview');
    const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

    const strategies = [
        {
            id: 1,
            title: '엔터프라이즈 생산성 플랫폼',
            subtitle: 'AI 기반 개발 생산성 극대화',
            icon: '🚀',
            color: 'from-blue-600 to-cyan-600',
            frontendStack: ['Next.js 14', 'TanStack Query', 'Framer Motion', 'shadcn/ui']
        },
        {
            id: 2,
            title: '글로벌 SaaS 전환',
            subtitle: '국내 성공 모델의 글로벌 확장',
            icon: '🌍',
            color: 'from-purple-600 to-pink-600',
            frontendStack: ['Vite', 'React-Data-Grid', 'GraphQL', 'Tauri v2']
        },
        {
            id: 3,
            title: '빅테크 솔루션 공급',
            subtitle: 'Google/Meta 파트너십',
            icon: '🤝',
            color: 'from-green-600 to-teal-600',
            frontendStack: ['Next.js', 'Three.js', 'Recharts', 'Figma MCP']
        },
        {
            id: 4,
            title: '산업별 버티컬 SaaS',
            subtitle: '특화 도메인 깊이 파고들기',
            icon: '🎯',
            color: 'from-orange-600 to-red-600',
            frontendStack: ['TanStack Table', 'ag-Grid', 'D3.js', 'Tailwind CSS']
        },
        {
            id: 5,
            title: '오픈소스 기반 플랫폼',
            subtitle: '커뮤니티 주도 성장',
            icon: '🛠️',
            color: 'from-indigo-600 to-purple-600',
            frontendStack: ['Vite', 'Storybook', 'Playwright', 'Claude Code']
        }
    ];

    const frontendTechs = {
        nextjs: {
            name: 'Next.js 14',
            category: 'Framework',
            description: 'Full-stack React Framework with App Router',
            strengths: ['SEO 최적화', 'Server Components', 'Edge Runtime', 'Partial Prerendering'],
            businessValue: '40% 성능 향상, 60% SEO 개선',
            companies: ['Netflix', 'TikTok', 'Hulu', 'Twitch']
        },
        vite: {
            name: 'Vite 5',
            category: 'Build Tool',
            description: '초고속 빌드 도구',
            strengths: ['즉각적인 HMR', 'Native ESM', '빠른 빌드', 'Plugin 생태계'],
            businessValue: '개발 속도 10배 향상',
            companies: ['Laravel', 'Nuxt', 'Astro', 'Storybook']
        },
        tanstack: {
            name: 'TanStack Suite',
            category: 'State & Data',
            description: '강력한 데이터 관리 도구',
            strengths: ['Query/Table/Router/Form', '타입 안정성', '성능 최적화', 'DevTools'],
            businessValue: '데이터 관리 복잡도 70% 감소',
            companies: ['PayPal', 'eBay', 'DocuSign', 'Coinbase']
        },
        framermotion: {
            name: 'Framer Motion',
            category: 'Animation',
            description: '프로덕션급 애니메이션 라이브러리',
            strengths: ['선언적 애니메이션', 'Gesture 지원', 'Layout 애니메이션', 'SVG 지원'],
            businessValue: '사용자 인게이지먼트 35% 증가',
            companies: ['Square', 'Spotify', 'Uber', 'Coinbase']
        },
        threejs: {
            name: 'Three.js + R3F',
            category: '3D Graphics',
            description: 'Web 3D 그래픽스',
            strengths: ['React Three Fiber', 'Drei helpers', 'Performance', 'VR/AR 지원'],
            businessValue: '제품 전환율 2.7배 증가',
            companies: ['BMW', 'Samsung', 'Google', 'NASA']
        },
        tauri: {
            name: 'Tauri v2',
            category: 'Desktop',
            description: 'Rust 기반 데스크톱 앱',
            strengths: ['작은 번들 사이즈', '보안성', '네이티브 성능', '크로스 플랫폼'],
            businessValue: 'Electron 대비 90% 메모리 절약',
            companies: ['1Password', 'Pake', 'Clash Verge', 'DevToys']
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Header */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <div className="flex justify-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-sm">
                                Strategic Report 2024
                            </span>
                            <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-sm">
                                Frontend Excellence
                            </span>
                            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-sm">
                                Global Expansion
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            IT 비즈니스 전략 × 프론트엔드 혁신
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            "돈이 많은 시장과 연결되어야 한다" - 젠슨황, 최태원의 인사이트와
                            <br />최신 프론트엔드 기술로 구현하는 글로벌 진출 전략
                        </p>
                    </div>
                </div>
            </div>

            {/* Key Metrics with Frontend Impact */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
                        <div className="text-3xl mb-3">💰</div>
                        <h3 className="text-lg font-semibold mb-2">Market Size</h3>
                        <p className="text-3xl font-bold text-blue-400">$5.3T</p>
                        <p className="text-sm text-gray-400 mt-1">Global IT Services Market</p>
                        <div className="mt-3 pt-3 border-t border-blue-500/20">
                            <p className="text-xs text-blue-300">Frontend 시장: $180B</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
                        <div className="text-3xl mb-3">⚡</div>
                        <h3 className="text-lg font-semibold mb-2">Dev Speed</h3>
                        <p className="text-3xl font-bold text-purple-400">10x</p>
                        <p className="text-sm text-gray-400 mt-1">AI 도구 활용 생산성</p>
                        <div className="mt-3 pt-3 border-t border-purple-500/20">
                            <p className="text-xs text-purple-300">Cursor + Claude: 47% ↑</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
                        <div className="text-3xl mb-3">🎯</div>
                        <h3 className="text-lg font-semibold mb-2">User Experience</h3>
                        <p className="text-3xl font-bold text-green-400">92%</p>
                        <p className="text-sm text-gray-400 mt-1">모던 UI/UX 만족도</p>
                        <div className="mt-3 pt-3 border-t border-green-500/20">
                            <p className="text-xs text-green-300">Core Web Vitals 달성</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6">
                        <div className="text-3xl mb-3">🚀</div>
                        <h3 className="text-lg font-semibold mb-2">Performance</h3>
                        <p className="text-3xl font-bold text-orange-400">200ms</p>
                        <p className="text-sm text-gray-400 mt-1">평균 페이지 로드</p>
                        <div className="mt-3 pt-3 border-t border-orange-500/20">
                            <p className="text-xs text-orange-300">Next.js PPR 적용</p>
                        </div>
                    </div>
                </div>

                {/* Frontend Technology Navigation */}
                <div className="mb-8">
                    <div className="flex justify-center gap-4 flex-wrap">
                        {['overview', 'frameworks', 'data', 'visual', 'tools', 'integration'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTechTab(tab)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTechTab === tab
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                                    }`}
                            >
                                {tab === 'overview' && '🏠 Overview'}
                                {tab === 'frameworks' && '⚡ Frameworks'}
                                {tab === 'data' && '📊 Data Management'}
                                {tab === 'visual' && '🎨 Visual & UX'}
                                {tab === 'tools' && '🛠️ Dev Tools'}
                                {tab === 'integration' && '🔗 Integration'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Frontend Technology Content */}
                {activeTechTab === 'overview' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-center">프론트엔드 기술 스택 Overview</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(frontendTechs).map(([key, tech]) => (
                                <div
                                    key={key}
                                    className="bg-gray-900/50 rounded-lg p-4 hover:scale-105 transition-transform cursor-pointer"
                                    onClick={() => setSelectedFramework(key)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-lg">{tech.name}</h3>
                                        <span className="text-xs bg-blue-500/20 px-2 py-1 rounded">{tech.category}</span>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">{tech.description}</p>
                                    <div className="text-xs">
                                        <p className="text-green-400 font-semibold mb-1">{tech.businessValue}</p>
                                        <div className="flex flex-wrap gap-1">
                                            {tech.companies.slice(0, 3).map((company) => (
                                                <span key={company} className="bg-gray-800 px-2 py-1 rounded">
                                                    {company}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTechTab === 'frameworks' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">⚡ Core Frameworks 전략</h2>

                        {/* Next.js 14 Deep Dive */}
                        <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">Next.js 14 - Enterprise Ready</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">핵심 기능</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">✓</span>
                                            <div>
                                                <p className="font-medium">App Router & RSC</p>
                                                <p className="text-xs text-gray-400">서버 컴포넌트로 번들 사이즈 75% 감소</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">✓</span>
                                            <div>
                                                <p className="font-medium">Partial Prerendering</p>
                                                <p className="text-xs text-gray-400">정적 + 동적 콘텐츠 최적 조합</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-green-400 mt-1">✓</span>
                                            <div>
                                                <p className="font-medium">Server Actions</p>
                                                <p className="text-xs text-gray-400">폼 처리 단순화, API 라우트 불필요</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">실제 코드 예시</h4>
                                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs">
                                        <pre className="text-green-400">{`// app/products/page.tsx
export default async function ProductsPage() {
  const products = await fetchProducts() // Server
  
  return (
    <Suspense fallback={<Loading />}>
      <ProductGrid products={products} />
      <ClientFilter /> {/* Client Component */}
    </Suspense>
  )
}`}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vite 5 */}
                        <div className="mb-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Vite 5 - Lightning Fast DX</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">왜 Vite인가?</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>즉각적인 시작:</strong> 콜드 스타트 &lt; 300ms</li>
                                        <li>• <strong>번개 같은 HMR:</strong> 수정사항 &lt; 100ms 반영</li>
                                        <li>• <strong>최적화된 빌드:</strong> Rollup 기반 트리쉐이킹</li>
                                        <li>• <strong>Plugin 생태계:</strong> 700+ 공식 플러그인</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">비즈니스 임팩트</h4>
                                    <div className="bg-purple-900/20 rounded-lg p-4">
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-purple-400">87%</p>
                                                <p className="text-xs text-gray-400">개발 속도 향상</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-pink-400">92%</p>
                                                <p className="text-xs text-gray-400">개발자 만족도</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tauri v2 */}
                        <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">Tauri v2 - Next-Gen Desktop Apps</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">vs Electron</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• 번들 크기: 600KB vs 50MB</li>
                                        <li>• 메모리: 15MB vs 180MB</li>
                                        <li>• 시작 시간: 0.3s vs 2s</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">주요 기능</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• Rust 백엔드 보안</li>
                                        <li>• 시스템 트레이</li>
                                        <li>• 자동 업데이트</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">Use Cases</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• 1Password (보안)</li>
                                        <li>• DevToys (개발 도구)</li>
                                        <li>• Pake (웹앱 래퍼)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTechTab === 'data' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">📊 Data Management Excellence</h2>

                        {/* TanStack Suite */}
                        <div className="mb-8 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-green-400">TanStack Suite - 데이터의 모든 것</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">📡 Query</h4>
                                    <p className="text-xs text-gray-400 mb-2">서버 상태 관리</p>
                                    <div className="text-xs space-y-1">
                                        <p>• 자동 캐싱/리페칭</p>
                                        <p>• Optimistic Updates</p>
                                        <p>• 무한 스크롤</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">📋 Table</h4>
                                    <p className="text-xs text-gray-400 mb-2">고성능 테이블</p>
                                    <div className="text-xs space-y-1">
                                        <p>• 100K+ rows 처리</p>
                                        <p>• 가상화/필터링</p>
                                        <p>• 정렬/그룹핑</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">🧭 Router</h4>
                                    <p className="text-xs text-gray-400 mb-2">타입 안전 라우팅</p>
                                    <div className="text-xs space-y-1">
                                        <p>• File-based routing</p>
                                        <p>• Type-safe params</p>
                                        <p>• Nested layouts</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">📝 Form</h4>
                                    <p className="text-xs text-gray-400 mb-2">강력한 폼 관리</p>
                                    <div className="text-xs space-y-1">
                                        <p>• Field-level 검증</p>
                                        <p>• 비동기 validation</p>
                                        <p>• 타입 추론</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                                <pre className="text-xs font-mono text-green-400">{`// TanStack Query 실제 사용
const { data, isLoading } = useQuery({
  queryKey: ['products', filters],
  queryFn: () => fetchProducts(filters),
  staleTime: 5 * 60 * 1000, // 5분간 fresh
  gcTime: 10 * 60 * 1000,   // 10분 후 GC
})`}</pre>
                            </div>
                        </div>

                        {/* GraphQL */}
                        <div className="mb-8 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">GraphQL - API의 미래</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">왜 GraphQL?</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>Over-fetching 제거:</strong> 필요한 데이터만</li>
                                        <li>• <strong>Under-fetching 해결:</strong> 한 번의 요청으로</li>
                                        <li>• <strong>강력한 타입 시스템:</strong> 자동 문서화</li>
                                        <li>• <strong>실시간 구독:</strong> WebSocket 지원</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">기술 스택</h4>
                                    <div className="space-y-2">
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm">Apollo Client</p>
                                            <p className="text-xs text-gray-400">캐싱, Optimistic UI</p>
                                        </div>
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm">urql</p>
                                            <p className="text-xs text-gray-400">경량, 확장 가능</p>
                                        </div>
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm">GraphQL Codegen</p>
                                            <p className="text-xs text-gray-400">타입 자동 생성</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* React Data Grid */}
                        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">Enterprise Data Grids</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">AG-Grid</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• 1M+ rows 처리</li>
                                        <li>• Excel 같은 편집</li>
                                        <li>• 피벗/차트 통합</li>
                                        <li className="text-green-400">엔터프라이즈 선택</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">MUI DataGrid</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• Material Design</li>
                                        <li>• 100K rows 최적</li>
                                        <li>• Pro 기능 풍부</li>
                                        <li className="text-blue-400">중견기업 적합</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">TanStack Table</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• Headless UI</li>
                                        <li>• 완전한 커스터마이징</li>
                                        <li>• 8KB 초경량</li>
                                        <li className="text-purple-400">스타트업 최적</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTechTab === 'visual' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">🎨 Visual Excellence & Motion</h2>

                        {/* Framer Motion */}
                        <div className="mb-8 bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-pink-400">Framer Motion - 애니메이션의 정석</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">핵심 기능</h4>
                                    <div className="space-y-3">
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm mb-1">Layout Animations</p>
                                            <p className="text-xs text-gray-400">자동 레이아웃 전환</p>
                                            <pre className="text-xs mt-2 text-pink-300">{`<motion.div layout />`}</pre>
                                        </div>
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm mb-1">Gesture Recognition</p>
                                            <p className="text-xs text-gray-400">드래그, 호버, 탭 인식</p>
                                            <pre className="text-xs mt-2 text-pink-300">{`whileHover={{ scale: 1.1 }}`}</pre>
                                        </div>
                                        <div className="bg-gray-900/50 rounded p-3">
                                            <p className="font-medium text-sm mb-1">Scroll-triggered</p>
                                            <p className="text-xs text-gray-400">스크롤 기반 애니메이션</p>
                                            <pre className="text-xs mt-2 text-pink-300">{`useScroll() + useTransform()`}</pre>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">비즈니스 임팩트</h4>
                                    <div className="bg-purple-900/20 rounded-lg p-4 mb-4">
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <p className="text-2xl font-bold text-pink-400">35%</p>
                                                <p className="text-xs text-gray-400">체류 시간 증가</p>
                                            </div>
                                            <div>
                                                <p className="text-2xl font-bold text-purple-400">2.7x</p>
                                                <p className="text-xs text-gray-400">인터랙션 증가</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <p>✓ Spotify - 음악 플레이어 전환</p>
                                        <p>✓ Stripe - 결제 플로우 애니메이션</p>
                                        <p>✓ Linear - 이슈 트래커 인터랙션</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3D Graphics */}
                        <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">3D Web Graphics - 몰입형 경험</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Three.js</h4>
                                    <p className="text-xs text-gray-400 mb-2">Low-level 3D 라이브러리</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• WebGL 직접 제어</li>
                                        <li>• 최고 성능</li>
                                        <li>• 복잡한 학습 곡선</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">React Three Fiber</h4>
                                    <p className="text-xs text-gray-400 mb-2">React용 Three.js</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• 선언적 3D</li>
                                        <li>• React 생태계 통합</li>
                                        <li>• Drei 헬퍼 라이브러리</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Spline</h4>
                                    <p className="text-xs text-gray-400 mb-2">No-code 3D 디자인</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• 비개발자 친화적</li>
                                        <li>• 실시간 협업</li>
                                        <li>• React 컴포넌트 export</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
                                <h4 className="font-medium mb-2">성공 사례</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                    <div className="bg-gray-800 rounded p-2">
                                        <p className="font-medium">BMW</p>
                                        <p className="text-gray-400">차량 컨피규레이터</p>
                                    </div>
                                    <div className="bg-gray-800 rounded p-2">
                                        <p className="font-medium">Nike</p>
                                        <p className="text-gray-400">신발 커스터마이징</p>
                                    </div>
                                    <div className="bg-gray-800 rounded p-2">
                                        <p className="font-medium">IKEA</p>
                                        <p className="text-gray-400">가구 AR 배치</p>
                                    </div>
                                    <div className="bg-gray-800 rounded p-2">
                                        <p className="font-medium">NASA</p>
                                        <p className="text-gray-400">우주 시뮬레이션</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Advanced UI/UX */}
                        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">고급 UI/UX 패턴</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">2024 디자인 트렌드</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🌊</span>
                                            <div>
                                                <p className="font-medium text-sm">Bento Grid</p>
                                                <p className="text-xs text-gray-400">Apple 스타일 그리드 레이아웃</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">✨</span>
                                            <div>
                                                <p className="font-medium text-sm">Glassmorphism</p>
                                                <p className="text-xs text-gray-400">반투명 유리 효과</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🎯</span>
                                            <div>
                                                <p className="font-medium text-sm">Micro-interactions</p>
                                                <p className="text-xs text-gray-400">세밀한 피드백 애니메이션</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🌙</span>
                                            <div>
                                                <p className="font-medium text-sm">Dark Mode First</p>
                                                <p className="text-xs text-gray-400">다크 모드 기본 설계</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">성능 최적화</h4>
                                    <div className="bg-purple-900/20 rounded-lg p-4">
                                        <p className="text-sm font-medium mb-2">Core Web Vitals</p>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span>LCP (Loading)</span>
                                                <span className="text-green-400">&lt; 2.5s</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>FID (Interactivity)</span>
                                                <span className="text-green-400">&lt; 100ms</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>CLS (Visual Stability)</span>
                                                <span className="text-green-400">&lt; 0.1</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>INP (New metric)</span>
                                                <span className="text-yellow-400">&lt; 200ms</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTechTab === 'tools' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">🛠️ Development Tools Revolution</h2>

                        {/* AI-Powered Development */}
                        <div className="mb-8 bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-indigo-400">AI 기반 개발 도구</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Cursor</h4>
                                    <p className="text-xs text-gray-400 mb-2">AI-first IDE</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• GPT-4 통합 코딩</li>
                                        <li>• 컨텍스트 인식 자동완성</li>
                                        <li>• 코드 리팩토링 제안</li>
                                        <li className="text-green-400">생산성 300% 향상</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">Claude Code</h4>
                                    <p className="text-xs text-gray-400 mb-2">Anthropic AI Assistant</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• 터미널 기반 코딩</li>
                                        <li>• 프로젝트 전체 이해</li>
                                        <li>• 아키텍처 설계 지원</li>
                                        <li className="text-blue-400">복잡한 로직 구현</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-2">GitHub Copilot</h4>
                                    <p className="text-xs text-gray-400 mb-2">Pair Programming AI</p>
                                    <ul className="text-xs space-y-1">
                                        <li>• VS Code 통합</li>
                                        <li>• 멀티라인 제안</li>
                                        <li>• 테스트 코드 생성</li>
                                        <li className="text-purple-400">40% 코딩 시간 단축</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Figma MCP Integration */}
                        <div className="mb-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">Figma MCP - Design to Code</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-3">Model Context Protocol</h4>
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>자동 컴포넌트 생성:</strong> Figma → React</li>
                                        <li>• <strong>디자인 토큰 동기화:</strong> 실시간 업데이트</li>
                                        <li>• <strong>반응형 레이아웃:</strong> 자동 breakpoint</li>
                                        <li>• <strong>접근성 체크:</strong> WCAG 준수</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3">워크플로우 혁신</h4>
                                    <div className="bg-purple-900/20 rounded-lg p-4">
                                        <div className="space-y-3 text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-600 text-white px-2 py-1 rounded">1</span>
                                                <span>디자이너: Figma 디자인</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-600 text-white px-2 py-1 rounded">2</span>
                                                <span>MCP: 자동 변환</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-600 text-white px-2 py-1 rounded">3</span>
                                                <span>개발자: 로직 추가</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="bg-purple-600 text-white px-2 py-1 rounded">4</span>
                                                <span>배포: 50% 시간 단축</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Development Environment */}
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-green-400">Modern Dev Environment</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">🔧 Build Tools</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• Turbo: Monorepo 빌드</li>
                                        <li>• SWC: Rust 기반 컴파일</li>
                                        <li>• esbuild: 초고속 번들링</li>
                                        <li>• Bun: All-in-one 런타임</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">📦 Package Managers</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• pnpm: 디스크 효율성</li>
                                        <li>• Yarn Berry: PnP 모드</li>
                                        <li>• Bun: 최고속 설치</li>
                                        <li>• ni: 유니버설 설치</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-medium mb-2">🧪 Testing</h4>
                                    <ul className="text-xs space-y-1">
                                        <li>• Vitest: Vite 네이티브</li>
                                        <li>• Playwright: E2E 테스팅</li>
                                        <li>• Testing Library: 유저 중심</li>
                                        <li>• Storybook: 컴포넌트 테스트</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTechTab === 'integration' && (
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold mb-6">🔗 통합 전략 & 실전 적용</h2>

                        {/* Strategy Integration Matrix */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">전략별 기술 스택 매핑</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="text-left p-3">비즈니스 전략</th>
                                            <th className="text-left p-3">핵심 기술</th>
                                            <th className="text-left p-3">예상 ROI</th>
                                            <th className="text-left p-3">타임라인</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-semibold">엔터프라이즈 생산성</p>
                                                    <p className="text-xs text-gray-400">대기업 B2B</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">Next.js</span>
                                                    <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">TanStack</span>
                                                    <span className="bg-blue-500/20 px-2 py-1 rounded text-xs">AG-Grid</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="text-green-400 font-bold">300%</span>
                                            </td>
                                            <td className="p-3">6개월</td>
                                        </tr>
                                        <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-semibold">글로벌 SaaS</p>
                                                    <p className="text-xs text-gray-400">B2C/B2B</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="bg-purple-500/20 px-2 py-1 rounded text-xs">Vite</span>
                                                    <span className="bg-purple-500/20 px-2 py-1 rounded text-xs">Tauri</span>
                                                    <span className="bg-purple-500/20 px-2 py-1 rounded text-xs">GraphQL</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="text-purple-400 font-bold">500%</span>
                                            </td>
                                            <td className="p-3">12개월</td>
                                        </tr>
                                        <tr className="border-b border-gray-700/50 hover:bg-gray-800/50">
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-semibold">빅테크 파트너</p>
                                                    <p className="text-xs text-gray-400">Google/Meta</p>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex flex-wrap gap-1">
                                                    <span className="bg-green-500/20 px-2 py-1 rounded text-xs">Three.js</span>
                                                    <span className="bg-green-500/20 px-2 py-1 rounded text-xs">Framer</span>
                                                    <span className="bg-green-500/20 px-2 py-1 rounded text-xs">Figma MCP</span>
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className="text-green-400 font-bold">800%</span>
                                            </td>
                                            <td className="p-3">18개월</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Real Implementation Cases */}
                        <div className="mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-blue-400">실제 구현 사례</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-3">💳 토스 - 금융 슈퍼앱</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>기술 스택:</strong></p>
                                        <ul className="text-xs space-y-1 ml-4">
                                            <li>• Next.js: 메인 웹 플랫폼</li>
                                            <li>• React Native: 모바일 앱</li>
                                            <li>• Framer Motion: 마이크로 인터랙션</li>
                                            <li>• GraphQL: API Gateway</li>
                                        </ul>
                                        <p className="text-green-400 text-xs mt-2">결과: MAU 1,400만, 기업가치 8조원</p>
                                    </div>
                                </div>
                                <div className="bg-gray-900/50 rounded-lg p-4">
                                    <h4 className="font-semibold mb-3">🥕 당근마켓 - 지역 커뮤니티</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><strong>기술 스택:</strong></p>
                                        <ul className="text-xs space-y-1 ml-4">
                                            <li>• Flutter: 크로스 플랫폼 앱</li>
                                            <li>• Next.js: 웹 버전</li>
                                            <li>• TanStack Query: 상태 관리</li>
                                            <li>• Tailwind CSS: 디자인 시스템</li>
                                        </ul>
                                        <p className="text-orange-400 text-xs mt-2">결과: MAU 2,000만, 글로벌 4개국 진출</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Implementation Roadmap */}
                        <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold mb-4 text-green-400">단계별 구현 로드맵</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold mb-1">Foundation (0-3개월)</h4>
                                        <p className="text-sm text-gray-400 mb-2">기반 기술 스택 구축</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">Next.js 셋업</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">CI/CD 파이프라인</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">디자인 시스템</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold mb-1">MVP Development (3-6개월)</h4>
                                        <p className="text-sm text-gray-400 mb-2">핵심 기능 구현</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">TanStack 통합</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">GraphQL API</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">Framer Motion</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="font-semibold mb-1">Scale & Optimize (6-12개월)</h4>
                                        <p className="text-sm text-gray-400 mb-2">성능 최적화 및 확장</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">Tauri 데스크톱</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">3D 기능 추가</span>
                                            <span className="bg-gray-800 px-2 py-1 rounded text-xs">AI 통합</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5 Strategies with Frontend Integration */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">5대 핵심 전략 + 프론트엔드 시너지</h2>
                    <div className="grid md:grid-cols-5 gap-4 mb-8">
                        {strategies.map((strategy, index) => (
                            <button
                                key={strategy.id}
                                onClick={() => setActiveStrategy(index)}
                                className={`relative p-6 rounded-xl transition-all duration-300 ${activeStrategy === index
                                    ? 'scale-105 shadow-2xl'
                                    : 'hover:scale-102 opacity-80'
                                    }`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${strategy.color} rounded-xl opacity-90`}></div>
                                <div className="relative z-10">
                                    <div className="text-4xl mb-3">{strategy.icon}</div>
                                    <h3 className="font-bold text-lg mb-1">{strategy.title}</h3>
                                    <p className="text-xs text-gray-200 mb-2">{strategy.subtitle}</p>
                                    <div className="mt-3 pt-3 border-t border-white/20">
                                        <p className="text-xs font-semibold">Frontend Stack:</p>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {strategy.frontendStack.slice(0, 2).map((tech) => (
                                                <span key={tech} className="bg-white/20 px-1 py-0.5 rounded text-xs">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Strategy Details with Frontend Focus */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8">
                        {activeStrategy === 0 && (
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-blue-400">
                                    전략 1: 엔터프라이즈 생산성 플랫폼
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">백엔드 + 프론트엔드 통합</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span><strong>Spring AI + Cursor:</strong> AI 기반 코드 생성</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span><strong>Next.js 14 + Spring Boot:</strong> 풀스택 아키텍처</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span><strong>TanStack Query + Kafka:</strong> 실시간 데이터 동기화</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span><strong>AG-Grid + Spring Batch:</strong> 대용량 데이터 처리</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">예상 성과</h4>
                                        <div className="bg-blue-900/30 rounded-lg p-4">
                                            <ul className="space-y-2">
                                                <li>• 개발 생산성 <span className="text-blue-400 font-bold">3배 향상</span></li>
                                                <li>• 페이지 로드 속도 <span className="text-blue-400 font-bold">200ms 달성</span></li>
                                                <li>• 사용자 만족도 <span className="text-blue-400 font-bold">92% 달성</span></li>
                                                <li>• 운영 비용 <span className="text-blue-400 font-bold">40% 절감</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                                    <p className="text-sm">
                                        <strong>핵심 프론트엔드 기술:</strong> Next.js 14 (PPR), TanStack Suite, Framer Motion, shadcn/ui
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeStrategy === 1 && (
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-purple-400">
                                    전략 2: 글로벌 SaaS 전환
                                </h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">크로스 플랫폼 전략</h4>
                                        <div className="space-y-3">
                                            <div className="border-l-4 border-purple-400 pl-4">
                                                <div className="font-medium">Web: Vite + React</div>
                                                <p className="text-sm text-gray-400">초고속 빌드, 최적화된 번들</p>
                                            </div>
                                            <div className="border-l-4 border-purple-400 pl-4">
                                                <div className="font-medium">Desktop: Tauri v2</div>
                                                <p className="text-sm text-gray-400">네이티브 성능, 작은 번들 사이즈</p>
                                            </div>
                                            <div className="border-l-4 border-purple-400 pl-4">
                                                <div className="font-medium">Mobile: Flutter</div>
                                                <p className="text-sm text-gray-400">단일 코드베이스, 네이티브 UI</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-3">글로벌 최적화</h4>
                                        <div className="bg-purple-900/30 rounded-lg p-4">
                                            <ul className="space-y-2">
                                                <li>• <strong>GraphQL Federation:</strong> 멀티리전 API</li>
                                                <li>• <strong>Edge Functions:</strong> 지역별 최적화</li>
                                                <li>• <strong>i18n:</strong> 20개국 언어 지원</li>
                                                <li>• <strong>CDN:</strong> 글로벌 콘텐츠 배포</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 나머지 전략들도 프론트엔드 통합 내용 추가 */}
                    </div>
                </div>

                {/* Success Cases with Tech Stack */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">성공 사례 + 기술 스택 분석</h2>

                    {/* Enhanced Domestic Cases */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">🇰🇷 국내 유니콘 기술 스택</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => setExpandedCase(expandedCase === 'toss' ? null : 'toss')}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30' viewBox='0 0 60 30'%3E%3Ctext x='0' y='20' font-family='Arial' font-size='20' font-weight='bold' fill='%230064FF'%3EToss%3C/text%3E%3C/svg%3E" alt="Toss" />
                                    <span className="text-sm text-gray-400">금융 슈퍼앱</span>
                                </div>
                                <h4 className="font-semibold mb-2">토스 (Toss)</h4>
                                <div className="text-sm text-gray-400 mb-3">
                                    간편송금 → 종합 금융 플랫폼
                                </div>
                                {expandedCase === 'toss' && (
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <div className="space-y-2 text-sm">
                                            <p><strong>Frontend:</strong></p>
                                            <ul className="ml-4 text-xs space-y-1">
                                                <li>• Next.js: 웹 플랫폼</li>
                                                <li>• React Native: 모바일</li>
                                                <li>• Framer Motion: 애니메이션</li>
                                                <li>• Emotion: CSS-in-JS</li>
                                            </ul>
                                            <p className="mt-2"><strong>Backend:</strong> Spring Boot, Kotlin, MSA</p>
                                            <p><strong>성과:</strong> MAU 1,400만, 기업가치 8조원</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 당근마켓, 네이버 케이스도 동일하게 프론트엔드 기술 추가 */}
                        </div>
                    </div>
                </div>

                {/* ROI Projection with Frontend Impact */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">프론트엔드 투자 ROI</h2>
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">프론트엔드 투자 효과</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                        <span>개발 속도</span>
                                        <span className="text-green-400 font-bold">+300%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                        <span>사용자 전환율</span>
                                        <span className="text-blue-400 font-bold">+45%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                        <span>유지보수 비용</span>
                                        <span className="text-purple-400 font-bold">-60%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                        <span>Time to Market</span>
                                        <span className="text-orange-400 font-bold">-50%</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-4">기술별 ROI</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Next.js 14</span>
                                                <span className="text-green-400">280%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '93%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>TanStack Suite</span>
                                                <span className="text-blue-400">220%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: '73%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Framer Motion</span>
                                                <span className="text-purple-400">180%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: '60%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-grow">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>AI Tools (Cursor)</span>
                                                <span className="text-orange-400">320%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400" style={{ width: '100%' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className="text-center py-12">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Frontend Excellence 실행 로드맵</h2>
                        <p className="text-lg mb-6 text-gray-200">
                            "최신 프론트엔드 기술로 생산성 극대화 → 글로벌 사용자 경험 혁신 → 유니콘 Exit"
                        </p>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-2xl mb-2">🚀</div>
                                <div className="font-semibold">Q1 2025</div>
                                <p className="text-xs mt-1">Next.js 14 마이그레이션</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-2xl mb-2">⚡</div>
                                <div className="font-semibold">Q2 2025</div>
                                <p className="text-xs mt-1">AI 도구 전면 도입</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-2xl mb-2">🎨</div>
                                <div className="font-semibold">Q3 2025</div>
                                <p className="text-xs mt-1">3D/Motion 차별화</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                <div className="text-2xl mb-2">🌍</div>
                                <div className="font-semibold">2026</div>
                                <p className="text-xs mt-1">글로벌 플랫폼 런칭</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center gap-4">
                            <button className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:scale-105 transition-transform">
                                상세 전략 다운로드
                            </button>
                            <button className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors">
                                컨설팅 문의
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}