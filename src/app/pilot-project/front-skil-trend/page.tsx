"use client"
// C:\Users\terec\msa-admin\src\app\pilot-project\front-skil-trend\page.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Code, Database, Palette, Zap, Layout, Globe, Shield, Star, Clock, Target, CheckCircle, ArrowRight, Play, Lightbulb, Award, BookOpen, Download, GitBranch, Rocket, Layers, Activity, Users, ExternalLink, AlertTriangle, Info, Cpu } from 'lucide-react';

const FrontendRoadmap = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpanded = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const sections = [
        { id: 'overview', title: '개요', icon: BookOpen },
        { id: 'roadmap', title: '전체 로드맵', icon: Clock },
        { id: 'nextjs', title: 'Next.js 14+', icon: Rocket },
        { id: 'vite', title: 'Vite & Build Tools', icon: Zap },
        { id: 'styling', title: '고급 CSS & Styling', icon: Palette },
        { id: 'data-ui', title: 'Data Grid & UI', icon: Layout },
        { id: 'animations', title: 'Animations & DnD', icon: Star },
        { id: 'state-data', title: 'State & Data Fetching', icon: Database },
        { id: 'auth-security', title: 'Auth & Security', icon: Shield },
        { id: 'design-tools', title: 'Design & Development', icon: Globe },
        { id: 'projects', title: '실전 프로젝트', icon: Target }
    ];

    const techStack = [
        {
            name: 'Next.js 14',
            version: 'App Router',
            desc: 'React 풀스택 프레임워크',
            weeks: '8주',
            difficulty: 'Intermediate',
            color: 'blue',
            priority: 'High'
        },
        {
            name: 'Vite 5',
            version: 'Latest',
            desc: '초고속 빌드 도구',
            weeks: '3주',
            difficulty: 'Beginner',
            color: 'yellow',
            priority: 'High'
        },
        {
            name: 'CSS Advanced',
            version: 'Modern CSS',
            desc: 'CSS Grid, Container Queries',
            weeks: '6주',
            difficulty: 'Intermediate',
            color: 'pink',
            priority: 'High'
        },
        {
            name: 'React Data Grid',
            version: '2024.2',
            desc: '고성능 데이터 테이블',
            weeks: '4주',
            difficulty: 'Advanced',
            color: 'green',
            priority: 'Medium'
        },
        {
            name: 'Framer Motion',
            version: '11.x',
            desc: 'React 애니메이션',
            weeks: '5주',
            difficulty: 'Intermediate',
            color: 'purple',
            priority: 'Medium'
        },
        {
            name: 'React DnD',
            version: '16.x',
            desc: '드래그 앤 드롭',
            weeks: '3주',
            difficulty: 'Intermediate',
            color: 'orange',
            priority: 'Medium'
        },
        {
            name: 'TanStack Query',
            version: 'v5',
            desc: '서버 상태 관리',
            weeks: '5주',
            difficulty: 'Advanced',
            color: 'red',
            priority: 'High'
        },
        {
            name: 'Zustand',
            version: '4.x',
            desc: '경량 상태 관리',
            weeks: '3주',
            difficulty: 'Beginner',
            color: 'indigo',
            priority: 'High'
        },
        {
            name: 'NextAuth.js',
            version: 'v5',
            desc: '인증 솔루션',
            weeks: '4주',
            difficulty: 'Intermediate',
            color: 'teal',
            priority: 'High'
        },
        {
            name: 'Figma',
            version: 'Latest',
            desc: 'UI/UX 디자인',
            weeks: '6주',
            difficulty: 'Beginner',
            color: 'emerald',
            priority: 'Medium'
        },
        {
            name: 'Claude Code',
            version: 'Latest',
            desc: 'AI 코딩 도구',
            weeks: '2주',
            difficulty: 'Beginner',
            color: 'violet',
            priority: 'Medium'
        }
    ];

    const masterRoadmap = [
        {
            phase: 'Phase 1',
            duration: '1-4주',
            title: '기초 환경 구축',
            focus: 'Foundation Setup',
            technologies: ['Next.js 기초', 'Vite 설정', 'TypeScript', 'Tailwind CSS'],
            projects: ['기본 Next.js 앱', 'Vite React 프로젝트'],
            outcome: '모던 개발 환경 마스터'
        },
        {
            phase: 'Phase 2',
            duration: '5-8주',
            title: '핵심 기술 습득',
            focus: 'Core Technologies',
            technologies: ['고급 CSS', 'Zustand', 'TanStack Query', 'NextAuth'],
            projects: ['상태 관리 앱', '인증 시스템'],
            outcome: '핵심 프론트엔드 기술 확보'
        },
        {
            phase: 'Phase 3',
            duration: '9-12주',
            title: '고급 UI/UX',
            focus: 'Advanced UI/UX',
            technologies: ['Framer Motion', 'React DnD', 'React Data Grid', 'Figma'],
            projects: ['애니메이션 대시보드', '데이터 관리 시스템'],
            outcome: '사용자 경험 전문가'
        },
        {
            phase: 'Phase 4',
            duration: '13-16주',
            title: '실전 프로젝트',
            focus: 'Real-world Projects',
            technologies: ['모든 기술 통합', 'Claude Code 활용', '성능 최적화'],
            projects: ['포트폴리오 사이트', 'SaaS 대시보드', 'E-commerce 플랫폼'],
            outcome: '프로덕션 레디 개발자'
        }
    ];

    const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
        <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                {title}
            </h3>
            {children}
        </div>
    );

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <Section title="🚀 2025 프론트엔드 기술 스택 완전 가이드">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Rocket className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-blue-900">현대적 프론트엔드 개발의 완전 정복</h4>
                                        <p className="text-blue-800 mt-2">
                                            <strong>16주 완주 시</strong> 엔터프라이즈급 프론트엔드 애플리케이션을 설계하고 구현할 수 있는 전문가 수준 달성<br />
                                            Next.js App Router부터 AI 코딩 도구까지, 2025년 최신 기술 스택으로 경쟁력 확보
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📊 기술 스택 개요">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {techStack.map((tech, index) => (
                                    <div key={index} className={`border-2 rounded-lg p-4 hover:shadow-md transition-all ${tech.priority === 'High' ? 'border-red-200 bg-red-50' :
                                        tech.priority === 'Medium' ? 'border-yellow-200 bg-yellow-50' :
                                            'border-gray-200 bg-gray-50'
                                        }`}>
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="font-semibold text-gray-900">{tech.name}</h4>
                                            <div className="flex flex-col items-end space-y-1">
                                                <span className={`text-xs px-2 py-1 rounded ${tech.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                    tech.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {tech.priority}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded ${tech.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                    tech.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-purple-100 text-purple-800'
                                                    }`}>
                                                    {tech.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">{tech.version}</div>
                                        <p className="text-sm text-gray-700 mb-3">{tech.desc}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-900">{tech.weeks}</span>
                                            <div className={`w-3 h-3 rounded-full bg-${tech.color}-500`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="🎯 학습 성과 예측">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Code className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">개발 생산성</h4>
                                    <div className="text-2xl font-bold text-blue-600 mb-1">400%</div>
                                    <p className="text-sm text-gray-600">개발 속도 향상</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">성능 최적화</h4>
                                    <div className="text-2xl font-bold text-green-600 mb-1">90%</div>
                                    <p className="text-sm text-gray-600">로딩 시간 단축</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Star className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">사용자 경험</h4>
                                    <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                                    <p className="text-sm text-gray-600">만족도 향상</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Award className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">취업 경쟁력</h4>
                                    <div className="text-2xl font-bold text-orange-600 mb-1">10배</div>
                                    <p className="text-sm text-gray-600">면접 통과율</p>
                                </div>
                            </div>
                        </Section>

                        <Section title="💼 커리어 패스 및 연봉 전망">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">16주 완주 후 기대 효과</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h5 className="font-medium text-green-900 mb-2">포지션 & 연봉</h5>
                                            <ul className="text-sm text-green-800 space-y-1">
                                                <li>• <strong>Senior Frontend Developer:</strong> 6천만원+</li>
                                                <li>• <strong>Full-stack Developer:</strong> 7천만원+</li>
                                                <li>• <strong>Frontend Architect:</strong> 8천만원+</li>
                                                <li>• <strong>Technical Lead:</strong> 1억원+</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-emerald-900 mb-2">핵심 역량</h5>
                                            <ul className="text-sm text-emerald-800 space-y-1">
                                                <li>• 모던 React 생태계 마스터</li>
                                                <li>• 성능 최적화 전문가</li>
                                                <li>• 사용자 경험 설계</li>
                                                <li>• AI 도구 활용 능력</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'roadmap':
                return (
                    <div className="space-y-6">
                        <Section title="🗺️ 16주 마스터 로드맵 전체 구조">
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <Target className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium text-blue-800">학습 목표</h4>
                                        <p className="text-blue-700 text-sm mt-1">
                                            단계별 체계적 학습을 통해 현대적 프론트엔드 개발의 모든 영역을 커버하고,
                                            실무에서 바로 활용 가능한 고급 스킬 확보
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {masterRoadmap.map((phase, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold mr-4">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-900">{phase.phase}</h4>
                                                    <p className="text-gray-600">{phase.duration} • {phase.title}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${phase.focus === 'Foundation Setup' ? 'bg-green-100 text-green-800' :
                                                phase.focus === 'Core Technologies' ? 'bg-blue-100 text-blue-800' :
                                                    phase.focus === 'Advanced UI/UX' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-orange-100 text-orange-800'
                                                }`}>
                                                {phase.focus}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-3">핵심 기술</h5>
                                                <div className="space-y-2">
                                                    {phase.technologies.map((tech, techIndex) => (
                                                        <div key={techIndex} className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                            {tech}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-3">실습 프로젝트</h5>
                                                <div className="space-y-2">
                                                    {phase.projects.map((project, projectIndex) => (
                                                        <div key={projectIndex} className="flex items-center text-sm text-blue-700 bg-blue-50 p-2 rounded">
                                                            <Rocket className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                                            {project}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-3">학습 성과</h5>
                                                <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                                                    <div className="text-sm font-medium text-gray-900">{phase.outcome}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📈 주차별 상세 일정">
                            <div className="space-y-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주차</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주요 기술</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학습 목표</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">프로젝트</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">난이도</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {[
                                                { week: '1-2주', tech: 'Next.js 14 기초', goal: 'App Router 이해', project: '블로그 사이트', difficulty: 'Beginner' },
                                                { week: '3-4주', tech: 'Vite & TypeScript', goal: '개발 환경 최적화', project: 'React 앱 구축', difficulty: 'Beginner' },
                                                { week: '5-6주', tech: 'CSS Grid & Flexbox', goal: '모던 레이아웃', project: '반응형 대시보드', difficulty: 'Intermediate' },
                                                { week: '7-8주', tech: 'Zustand & TanStack Query', goal: '상태 관리 마스터', project: 'Todo 앱', difficulty: 'Intermediate' },
                                                { week: '9-10주', tech: 'NextAuth.js', goal: '인증 시스템 구현', project: '로그인 시스템', difficulty: 'Intermediate' },
                                                { week: '11-12주', tech: 'Framer Motion', goal: '인터랙티브 애니메이션', project: '포트폴리오 사이트', difficulty: 'Advanced' },
                                                { week: '13-14주', tech: 'React Data Grid', goal: '데이터 시각화', project: '관리자 대시보드', difficulty: 'Advanced' },
                                                { week: '15-16주', tech: '통합 프로젝트', goal: '전체 기술 활용', project: 'SaaS 플랫폼', difficulty: 'Expert' }
                                            ].map((row, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.week}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{row.tech}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.goal}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{row.project}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${row.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                            row.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                                row.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                                                                    'bg-red-100 text-red-800'
                                                            }`}>
                                                            {row.difficulty}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'nextjs':
                return (
                    <div className="space-y-6">
                        <Section title="⚡ Next.js 14+ App Router 완전 정복 (8주)">
                            <div className="bg-gradient-to-r from-black via-gray-900 to-black p-6 rounded-lg border mb-6">
                                <div className="flex items-start">
                                    <Rocket className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Next.js 14 App Router - React의 진화</h4>
                                        <p className="text-gray-300 text-sm mt-2">
                                            Server Components, Streaming, Edge Runtime을 활용한 혁신적인 풀스택 개발<br />
                                            실제 서비스 수준의 성능과 SEO 최적화를 동시에 달성
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('nextjs-week1-2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1-2주차: Next.js 14 기초 & App Router</h4>
                                        {expandedItems['nextjs-week1-2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['nextjs-week1-2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">핵심 개념</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• App Router vs Pages Router 차이점</li>
                                                        <li>• Server Components와 Client Components</li>
                                                        <li>• 새로운 파일 시스템 라우팅</li>
                                                        <li>• Layout, Page, Loading, Error 구조</li>
                                                        <li>• 메타데이터 API와 SEO 최적화</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-green-900 mb-2">실습 과제</h5>
                                                    <ul className="text-sm text-green-800 space-y-1">
                                                        <li>📝 개인 블로그 사이트 구축</li>
                                                        <li>📝 다국어 지원 구현</li>
                                                        <li>📝 동적 라우팅 활용</li>
                                                        <li>📝 SEO 메타데이터 설정</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">코드 예제</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt,
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('nextjs-week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: 데이터 페칭 & 서버 액션</h4>
                                        {expandedItems['nextjs-week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['nextjs-week3-4'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">서버 사이드 기능</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• async Server Components</li>
                                                        <li>• Server Actions (form handling)</li>
                                                        <li>• 캐싱 전략 (revalidate, cache)</li>
                                                        <li>• Streaming UI with Suspense</li>
                                                        <li>• Error Boundaries</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-orange-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-orange-900 mb-2">실전 프로젝트</h5>
                                                    <div className="text-sm text-orange-800">
                                                        🚀 <strong>Todo 관리 시스템</strong><br />
                                                        - Server Actions로 CRUD 구현<br />
                                                        - Optimistic Updates<br />
                                                        - 실시간 데이터 동기화
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('nextjs-week5-6')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">5-6주차: 성능 최적화 & 배포</h4>
                                        {expandedItems['nextjs-week5-6'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['nextjs-week5-6'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                <div className="bg-red-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-red-900 mb-2">성능 최적화</h5>
                                                    <ul className="text-sm text-red-800 space-y-1">
                                                        <li>• Image Optimization</li>
                                                        <li>• Dynamic Imports</li>
                                                        <li>• Bundle Analyzer</li>
                                                        <li>• Core Web Vitals</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-indigo-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-indigo-900 mb-2">배포 전략</h5>
                                                    <ul className="text-sm text-indigo-800 space-y-1">
                                                        <li>• Vercel 배포</li>
                                                        <li>• Docker 컨테이너화</li>
                                                        <li>• CDN 설정</li>
                                                        <li>• 환경 변수 관리</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-teal-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-teal-900 mb-2">모니터링</h5>
                                                    <ul className="text-sm text-teal-800 space-y-1">
                                                        <li>• Analytics 연동</li>
                                                        <li>• Error Tracking</li>
                                                        <li>• Performance Metrics</li>
                                                        <li>• Real User Monitoring</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('nextjs-week7-8')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">7-8주차: 고급 패턴 & 최종 프로젝트</h4>
                                        {expandedItems['nextjs-week7-8'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['nextjs-week7-8'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-purple-900 mb-2">최종 프로젝트: E-commerce 플랫폼</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-purple-800 mb-1">핵심 기능</h6>
                                                        <ul className="text-xs text-purple-700 space-y-1">
                                                            <li>• 상품 목록/상세 페이지</li>
                                                            <li>• 장바구니 (Server Actions)</li>
                                                            <li>• 결제 시스템 (Stripe)</li>
                                                            <li>• 사용자 대시보드</li>
                                                            <li>• 관리자 패널</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-purple-800 mb-1">기술 스택</h6>
                                                        <ul className="text-xs text-purple-700 space-y-1">
                                                            <li>• Next.js 14 App Router</li>
                                                            <li>• Prisma + PostgreSQL</li>
                                                            <li>• NextAuth.js 인증</li>
                                                            <li>• Tailwind CSS</li>
                                                            <li>• TypeScript</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="📊 Next.js 14 주요 업데이트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">새로운 기능</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="font-medium text-blue-900">Turbopack (Stable)</h5>
                                            <p className="text-sm text-blue-800 mt-1">
                                                Webpack보다 700배 빠른 번들러, 개발 환경 혁신
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <h5 className="font-medium text-green-900">Server Actions</h5>
                                            <p className="text-sm text-green-800 mt-1">
                                                클라이언트-서버 경계를 넘나드는 매끄러운 개발 경험
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                            <h5 className="font-medium text-purple-900">Partial Prerendering</h5>
                                            <p className="text-sm text-purple-800 mt-1">
                                                정적과 동적 렌더링의 완벽한 조합
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">성능 개선</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                            <span className="text-sm font-medium text-yellow-900">빌드 시간</span>
                                            <span className="text-sm text-yellow-800">53% 단축</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                            <span className="text-sm font-medium text-red-900">메모리 사용량</span>
                                            <span className="text-sm text-red-800">22% 절약</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                            <span className="text-sm font-medium text-indigo-900">Hot Reload</span>
                                            <span className="text-sm text-indigo-800">90% 빨라짐</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'vite':
                return (
                    <div className="space-y-6">
                        <Section title="⚡ Vite 5 & 최신 빌드 도구 (3주)">
                            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Zap className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Vite 5 - 차세대 빌드 도구</h4>
                                        <p className="text-orange-100 text-sm mt-2">
                                            ES modules 기반의 초고속 개발 서버와 Rollup 기반 프로덕션 빌드<br />
                                            HMR, 플러그인 생태계, 멀티 프레임워크 지원으로 개발 생산성 극대화
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('vite-week1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1주차: Vite 기초 & 프로젝트 설정</h4>
                                        {expandedItems['vite-week1'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['vite-week1'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-yellow-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-yellow-900 mb-2">Vite 핵심 개념</h5>
                                                    <ul className="text-sm text-yellow-800 space-y-1">
                                                        <li>• ES modules 기반 개발 서버</li>
                                                        <li>• 의존성 사전 번들링 (esbuild)</li>
                                                        <li>• HMR (Hot Module Replacement)</li>
                                                        <li>• 플러그인 아키텍처</li>
                                                        <li>• CSS 전처리기 통합</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-orange-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-orange-900 mb-2">프로젝트 템플릿</h5>
                                                    <div className="space-y-2 text-sm text-orange-800">
                                                        <div className="font-mono bg-white p-2 rounded">npm create vite@latest</div>
                                                        <ul className="space-y-1">
                                                            <li>• React + TypeScript</li>
                                                            <li>• Vue 3 + Composition API</li>
                                                            <li>• Svelte + SvelteKit</li>
                                                            <li>• Vanilla + TypeScript</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">실습: React + Vite 프로젝트 구성</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('vite-week2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">2주차: 플러그인 생태계 & 최적화</h4>
                                        {expandedItems['vite-week2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['vite-week2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">필수 플러그인</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• @vitejs/plugin-react</li>
                                                        <li>• vite-plugin-eslint</li>
                                                        <li>• @vitejs/plugin-legacy</li>
                                                        <li>• vite-plugin-pwa</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-green-900 mb-2">개발 도구</h5>
                                                    <ul className="text-sm text-green-800 space-y-1">
                                                        <li>• vite-plugin-mock</li>
                                                        <li>• @storybook/vite</li>
                                                        <li>• vitest (테스팅)</li>
                                                        <li>• vite-bundle-analyzer</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">성능 최적화</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Code Splitting</li>
                                                        <li>• Tree Shaking</li>
                                                        <li>• Dynamic Imports</li>
                                                        <li>• Asset Optimization</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('vite-week3')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3주차: 배포 & CI/CD 통합</h4>
                                        {expandedItems['vite-week3'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['vite-week3'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-indigo-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-indigo-900 mb-3">배포 전략</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-indigo-800 mb-2">정적 호스팅</h6>
                                                        <ul className="text-xs text-indigo-700 space-y-1">
                                                            <li>• Vercel, Netlify</li>
                                                            <li>• GitHub Pages</li>
                                                            <li>• Firebase Hosting</li>
                                                            <li>• AWS S3 + CloudFront</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-indigo-800 mb-2">컨테이너 배포</h6>
                                                        <ul className="text-xs text-indigo-700 space-y-1">
                                                            <li>• Docker 멀티스테이지</li>
                                                            <li>• Nginx 정적 서빙</li>
                                                            <li>• Kubernetes 배포</li>
                                                            <li>• CI/CD 파이프라인</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">GitHub Actions 워크플로우</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run test
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🚀 Vite 5 vs 기존 도구 성능 비교">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">항목</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vite 5</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Webpack 5</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Create React App</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">개선 정도</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">개발 서버 시작</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">0.3초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">8-15초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">12-20초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">97% 빠름</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HMR 반영</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">50ms</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">1-3초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">2-5초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">95% 빠름</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">프로덕션 빌드</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">15-30초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">45-90초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">60-120초</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">70% 빠름</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Section>
                    </div>
                );

            case 'styling':
                return (
                    <div className="space-y-6">
                        <Section title="🎨 고급 CSS & 모던 스타일링 (6주)">
                            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Palette className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">Modern CSS - 디자인 시스템의 진화</h4>
                                        <p className="text-purple-100 text-sm mt-2">
                                            CSS Grid, Container Queries, Custom Properties를 활용한 반응형 디자인<br />
                                            Tailwind CSS, Styled Components, CSS-in-JS까지 모던 스타일링 완전 정복
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('css-week1-2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1-2주차: CSS Grid & Flexbox 마스터</h4>
                                        {expandedItems['css-week1-2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['css-week1-2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">CSS Grid 고급 패턴</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• Grid Template Areas</li>
                                                        <li>• Implicit vs Explicit Grid</li>
                                                        <li>• Subgrid (Firefox, Chrome 117+)</li>
                                                        <li>• Grid Auto-flow 최적화</li>
                                                        <li>• Responsive Grid Layouts</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-green-900 mb-2">Flexbox 실전 활용</h5>
                                                    <ul className="text-sm text-green-800 space-y-1">
                                                        <li>• Flex-grow, Flex-shrink 완전 이해</li>
                                                        <li>• Align-items vs Justify-content</li>
                                                        <li>• Flex-wrap과 반응형 디자인</li>
                                                        <li>• Gap 속성 활용</li>
                                                        <li>• Flexbox vs Grid 선택 기준</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">실습: 반응형 대시보드 레이아웃</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`.dashboard {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 300px;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
  gap: 1rem;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas: 
      "header"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
  
  .sidebar { display: none; }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('css-week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: Tailwind CSS & 유틸리티 퍼스트</h4>
                                        {expandedItems['css-week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['css-week3-4'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-cyan-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-cyan-900 mb-2">Tailwind 고급 기법</h5>
                                                    <ul className="text-sm text-cyan-800 space-y-1">
                                                        <li>• Custom Design System 구축</li>
                                                        <li>• JIT (Just-in-Time) 컴파일</li>
                                                        <li>• Component 기반 스타일 관리</li>
                                                        <li>• Dark Mode 구현</li>
                                                        <li>• 플러그인 생태계 활용</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-teal-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-teal-900 mb-2">최적화 전략</h5>
                                                    <ul className="text-sm text-teal-800 space-y-1">
                                                        <li>• PurgeCSS 자동 최적화</li>
                                                        <li>• 커스텀 유틸리티 생성</li>
                                                        <li>• 프로덕션 빌드 크기 최소화</li>
                                                        <li>• HeadlessUI 컴포넌트 활용</li>
                                                        <li>• Tailwind Intellisense</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">Tailwind Config 고급 설정</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        brand: 'var(--brand-color)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss'),
  ],
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('css-week5-6')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">5-6주차: CSS-in-JS & 스타일드 컴포넌트</h4>
                                        {expandedItems['css-week5-6'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['css-week5-6'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">Styled Components</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Tagged Template Literals</li>
                                                        <li>• Props 기반 동적 스타일링</li>
                                                        <li>• ThemeProvider 활용</li>
                                                        <li>• CSS Helper Functions</li>
                                                        <li>• SSR 최적화</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-rose-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-rose-900 mb-2">Emotion</h5>
                                                    <ul className="text-sm text-rose-800 space-y-1">
                                                        <li>• css prop 활용</li>
                                                        <li>• 성능 최적화 (zero-runtime)</li>
                                                        <li>• Composition 패턴</li>
                                                        <li>• TypeScript 타입 안정성</li>
                                                        <li>• 번들 크기 최적화</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">실습: 디자인 시스템 컴포넌트</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// components/Button.tsx
import styled, { css } from 'styled-components'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = styled.button<ButtonProps>\`
  padding: \${props => 
    props.size === 'sm' ? '0.5rem 1rem' :
    props.size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem'
  };
  
  \${props => {
    switch (props.variant) {
      case 'primary':
        return css\`
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover { transform: translateY(-2px); }
        \`
      case 'danger':
        return css\`
          background: #ef4444;
          color: white;
        \`
      default:
        return css\`
          background: #f1f5f9;
          color: #334155;
        \`
    }
  }}
  
  \${props => props.loading && css\`
    opacity: 0.7;
    cursor: not-allowed;
  \`}
  
  transition: all 0.2s ease;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
\`

export default Button`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🔥 최신 CSS 기능 2025">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3">Container Queries</h4>
                                    <p className="text-sm text-blue-800 mb-3">
                                        요소의 크기에 따른 반응형 디자인 - 미디어 쿼리의 진화
                                    </p>
                                    <pre className="text-xs bg-white p-2 rounded font-mono">
                                        {`.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}`}
                                    </pre>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-900 mb-3">CSS Cascade Layers</h4>
                                    <p className="text-sm text-green-800 mb-3">
                                        명시적 계층 관리로 스타일 우선순위 제어
                                    </p>
                                    <pre className="text-xs bg-white p-2 rounded font-mono">
                                        {`@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; }
}

@layer utilities {
  .text-center { text-align: center; }
}`}
                                    </pre>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-3">CSS :has() Selector</h4>
                                    <p className="text-sm text-purple-800 mb-3">
                                        부모 셀렉터 - CSS로 가능한 새로운 레이아웃 패턴
                                    </p>
                                    <pre className="text-xs bg-white p-2 rounded font-mono">
                                        {`.card:has(.urgent) {
  border-color: red;
  animation: pulse 2s infinite;
}

form:has(:invalid) {
  border: 2px solid red;
}

.sidebar:has(+ main) {
  width: 250px;
}`}
                                    </pre>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'data-ui':
                return (
                    <div className="space-y-6">
                        <Section title="📊 React Data Grid & 고급 UI 컴포넌트 (4주)">
                            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Layout className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">엔터프라이즈급 데이터 UI - 대용량 데이터 처리</h4>
                                        <p className="text-emerald-100 text-sm mt-2">
                                            가상화, 무한 스크롤, 실시간 업데이트를 지원하는 고성능 데이터 그리드<br />
                                            복잡한 비즈니스 로직과 사용자 인터랙션을 매끄럽게 처리하는 UI 컴포넌트 구축
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('data-week1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1주차: React Data Grid 기초</h4>
                                        {expandedItems['data-week1'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['data-week1'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-emerald-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-emerald-900 mb-2">핵심 기능</h5>
                                                    <ul className="text-sm text-emerald-800 space-y-1">
                                                        <li>• 가상화 (Virtualization)</li>
                                                        <li>• 정렬 & 필터링</li>
                                                        <li>• 컬럼 크기 조정 & 재정렬</li>
                                                        <li>• 행/셀 선택</li>
                                                        <li>• 인라인 편집</li>
                                                        <li>• 그룹핑 & 집계</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-teal-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-teal-900 mb-2">라이브러리 비교</h5>
                                                    <div className="space-y-2 text-sm text-teal-800">
                                                        <div className="flex justify-between">
                                                            <span>• AG Grid</span>
                                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Enterprise</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>• TanStack Table</span>
                                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Headless</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>• Material-UI DataGrid</span>
                                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">UI Kit</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>• React Window</span>
                                                            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Virtual</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">AG Grid 기본 설정</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const DataGrid = () => {
  const [columnDefs] = useState([
    { 
      field: 'name', 
      headerName: '이름',
      sortable: true,
      filter: true,
      width: 150
    },
    { 
      field: 'email', 
      headerName: '이메일',
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'department', 
      headerName: '부서',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['개발', '마케팅', '영업', 'HR']
      }
    }
  ])

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    editable: true
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 500 }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={employees}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowSelection="multiple"
        onCellValueChanged={onCellValueChanged}
        onSelectionChanged={onSelectionChanged}
      />
    </div>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('data-week2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">2주차: 고급 기능 & 커스터마이징</h4>
                                        {expandedItems['data-week2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['data-week2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">커스텀 셀 렌더러</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• 이미지 & 아바타 렌더링</li>
                                                        <li>• 프로그레스 바 & 차트</li>
                                                        <li>• 액션 버튼 (편집/삭제)</li>
                                                        <li>• 태그 & 배지 컴포넌트</li>
                                                        <li>• 조건부 스타일링</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">성능 최적화</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Row Buffer 설정</li>
                                                        <li>• 지연 로딩 (Lazy Loading)</li>
                                                        <li>• 메모이제이션 활용</li>
                                                        <li>• 서버사이드 정렬/필터</li>
                                                        <li>• 가상 스크롤링 최적화</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">커스텀 셀 렌더러 예제</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// StatusCellRenderer.tsx
import { ICellRendererParams } from 'ag-grid-community'

const StatusCellRenderer = (params: ICellRendererParams) => {
  const { value } = params
  
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return { 
          color: 'bg-green-100 text-green-800', 
          text: '활성' 
        }
      case 'pending':
        return { 
          color: 'bg-yellow-100 text-yellow-800', 
          text: '대기중' 
        }
      case 'inactive':
        return { 
          color: 'bg-red-100 text-red-800', 
          text: '비활성' 
        }
      default:
        return { 
          color: 'bg-gray-100 text-gray-800', 
          text: '알 수 없음' 
        }
    }
  }

  const config = getStatusConfig(value)

  return (
    <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${config.color}\`}>
      <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
      {config.text}
    </span>
  )
}

// 그리드에서 사용
const columnDefs = [
  {
    field: 'status',
    headerName: '상태',
    cellRenderer: StatusCellRenderer,
    width: 120
  }
]`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('data-week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: 실시간 데이터 & 대시보드 구축</h4>
                                        {expandedItems['data-week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['data-week3-4'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-indigo-900 mb-3">최종 프로젝트: 관리자 대시보드</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-indigo-800 mb-2">핵심 기능</h6>
                                                        <ul className="text-xs text-indigo-700 space-y-1">
                                                            <li>• 실시간 사용자 활동 모니터링</li>
                                                            <li>• 매출 데이터 시각화</li>
                                                            <li>• 인벤토리 관리 그리드</li>
                                                            <li>• 알림 & 이벤트 시스템</li>
                                                            <li>• 데이터 내보내기 (Excel/CSV)</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-indigo-800 mb-2">기술 스택</h6>
                                                        <ul className="text-xs text-indigo-700 space-y-1">
                                                            <li>• AG Grid Enterprise</li>
                                                            <li>• Chart.js / Recharts</li>
                                                            <li>• Socket.io (실시간)</li>
                                                            <li>• TanStack Query</li>
                                                            <li>• Framer Motion</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">실시간 데이터 연동</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// useRealtimeData.ts
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export const useRealtimeData = (endpoint: string) => {
  const [data, setData] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = io('ws://localhost:3001')
    
    socket.on('connect', () => {
      setIsConnected(true)
      socket.emit('subscribe', endpoint)
    })

    socket.on('data-update', (newData) => {
      setData(prevData => {
        const updatedData = [...prevData]
        const index = updatedData.findIndex(item => item.id === newData.id)
        
        if (index >= 0) {
          updatedData[index] = newData
        } else {
          updatedData.push(newData)
        }
        
        return updatedData
      })
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => socket.close()
  }, [endpoint])

  return { data, isConnected }
}

// Dashboard 컴포넌트에서 사용
const Dashboard = () => {
  const { data: salesData, isConnected } = useRealtimeData('sales')
  const gridRef = useRef<AgGridReact>(null)

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.api.setRowData(salesData)
    }
  }, [salesData])

  return (
    <div className="dashboard">
      <div className="status-indicator">
        <span className={\`w-2 h-2 rounded-full \${isConnected ? 'bg-green-500' : 'bg-red-500'}\`} />
        {isConnected ? '실시간 연결됨' : '연결 끊김'}
      </div>
      
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        rowData={salesData}
        animateRows={true}
        getRowId={(params) => params.data.id}
      />
    </div>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="⚡ 데이터 그리드 성능 벤치마크">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">라이브러리</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">10K 행 렌더링</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메모리 사용량</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번들 크기</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">라이선스</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AG Grid</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">16ms</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">45MB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">127KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">MIT/Commercial</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TanStack Table</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">12ms</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">32MB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">28KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">MIT</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Material-UI DataGrid</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">28ms</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">67MB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">245KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">MIT/Commercial</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">React Window</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">8ms</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">18MB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">6KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">MIT</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Section>
                    </div>
                );

            case 'animations':
                return (
                    <div className="space-y-6">
                        <Section title="✨ Framer Motion & React DnD (5주)">
                            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Star className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">인터랙티브 애니메이션 - 사용자 경험의 혁신</h4>
                                        <p className="text-purple-100 text-sm mt-2">
                                            60fps 부드러운 애니메이션과 직관적인 드래그 앤 드롭으로 몰입감 극대화<br />
                                            마이크로 인터랙션부터 복잡한 레이아웃 애니메이션까지 완벽 구현
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('animation-week1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1주차: Framer Motion 기초</h4>
                                        {expandedItems['animation-week1'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['animation-week1'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-violet-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-violet-900 mb-2">핵심 개념</h5>
                                                    <ul className="text-sm text-violet-800 space-y-1">
                                                        <li>• motion 컴포넌트 기본 사용법</li>
                                                        <li>• animate, initial, exit 속성</li>
                                                        <li>• transition 옵션 (duration, ease)</li>
                                                        <li>• variants 시스템</li>
                                                        <li>• AnimatePresence 컴포넌트</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">기본 애니메이션</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Fade In/Out</li>
                                                        <li>• Slide 애니메이션</li>
                                                        <li>• Scale & Rotate</li>
                                                        <li>• Color 변경</li>
                                                        <li>• 조건부 애니메이션</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">기본 애니메이션 예제</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`import { motion, AnimatePresence } from 'framer-motion'

// 기본 애니메이션
const BasicAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut" 
      }}
      className="card"
    >
      Hello, Framer Motion!
    </motion.div>
  )
}

// Variants 시스템
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const StaggeredList = ({ items }) => {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="list"
    >
      {items.map((item, index) => (
        <motion.li
          key={index}
          variants={itemVariants}
          className="list-item"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('animation-week2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">2주차: 고급 애니메이션 & 제스처</h4>
                                        {expandedItems['animation-week2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['animation-week2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-fuchsia-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-fuchsia-900 mb-2">고급 애니메이션</h5>
                                                    <ul className="text-sm text-fuchsia-800 space-y-1">
                                                        <li>• Layout 애니메이션</li>
                                                        <li>• Shared layout transitions</li>
                                                        <li>• Path drawing (SVG)</li>
                                                        <li>• Morphing animations</li>
                                                        <li>• Timeline 기반 애니메이션</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-rose-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-rose-900 mb-2">제스처 & 인터랙션</h5>
                                                    <ul className="text-sm text-rose-800 space-y-1">
                                                        <li>• Drag 이벤트 처리</li>
                                                        <li>• Hover & Tap 애니메이션</li>
                                                        <li>• Pan & Zoom 제스처</li>
                                                        <li>• Scroll-triggered 애니메이션</li>
                                                        <li>• 물리 시뮬레이션 (Spring)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">Layout 애니메이션 예제</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// Layout Animation
const CardGrid = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      className={\`card \${isExpanded ? 'expanded' : 'collapsed'}\`}
      onClick={() => setIsExpanded(!isExpanded)}
      transition={{ 
        layout: { duration: 0.3, ease: "easeInOut" }
      }}
    >
      <motion.h2 layout="position">
        Card Title
      </motion.h2>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>Expanded content here...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Drag with Constraints
const DraggableCard = () => {
  return (
    <motion.div
      drag
      dragConstraints={{ 
        left: -100, 
        right: 100, 
        top: -100, 
        bottom: 100 
      }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, rotate: 5 }}
      className="draggable-card"
    >
      Drag me around!
    </motion.div>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('animation-week3')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3주차: React DnD 구현</h4>
                                        {expandedItems['animation-week3'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['animation-week3'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">React DnD 핵심</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• DndProvider 설정</li>
                                                        <li>• useDrag & useDrop 훅</li>
                                                        <li>• ItemTypes 정의</li>
                                                        <li>• Drag Preview 커스터마이징</li>
                                                        <li>• 드롭 검증 로직</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-green-900 mb-2">실용적 패턴</h5>
                                                    <ul className="text-sm text-green-800 space-y-1">
                                                        <li>• 칸반 보드 구현</li>
                                                        <li>• 파일 업로드 DnD</li>
                                                        <li>• 정렬 가능한 리스트</li>
                                                        <li>• 중첩된 드롭 영역</li>
                                                        <li>• 멀티 선택 드래그</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">칸반 보드 구현</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ItemTypes = {
  CARD: 'card'
}

// 드래그 가능한 카드
const DraggableCard = ({ id, text, moveCard }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  return (
    <div
      ref={drag}
      className={\`card \${isDragging ? 'dragging' : ''}\`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {text}
    </div>
  )
}

// 드롭 가능한 컬럼
const DroppableColumn = ({ title, cards, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div
      ref={drop}
      className={\`column \${isOver ? 'drop-target' : ''}\`}
    >
      <h3>{title}</h3>
      {cards.map((card) => (
        <DraggableCard
          key={card.id}
          id={card.id}
          text={card.text}
        />
      ))}
    </div>
  )
}

// 메인 칸반 보드
const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: []
  })

  const handleDrop = useCallback((item, targetColumn) => {
    setColumns(prev => ({
      ...prev,
      [targetColumn]: [...prev[targetColumn], item]
    }))
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {Object.entries(columns).map(([columnId, cards]) => (
          <DroppableColumn
            key={columnId}
            title={columnId}
            cards={cards}
            onDrop={(item) => handleDrop(item, columnId)}
          />
        ))}
      </div>
    </DndProvider>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('animation-week4-5')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">4-5주차: 통합 프로젝트 - 인터랙티브 대시보드</h4>
                                        {expandedItems['animation-week4-5'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['animation-week4-5'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-purple-900 mb-3">최종 프로젝트: 애니메이션 포트폴리오 사이트</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-purple-800 mb-2">애니메이션 기능</h6>
                                                        <ul className="text-xs text-purple-700 space-y-1">
                                                            <li>• 페이지 전환 애니메이션</li>
                                                            <li>• 스크롤 기반 Parallax</li>
                                                            <li>• 인터랙티브 3D 카드</li>
                                                            <li>• 모프 애니메이션 로고</li>
                                                            <li>• 동적 차트 & 그래프</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-purple-800 mb-2">인터랙션</h6>
                                                        <ul className="text-xs text-purple-700 space-y-1">
                                                            <li>• 드래그 가능한 프로젝트 카드</li>
                                                            <li>• 제스처 기반 네비게이션</li>
                                                            <li>• 실시간 타이핑 애니메이션</li>
                                                            <li>• 마우스 추적 효과</li>
                                                            <li>• 반응형 마이크로 인터랙션</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">고급 애니메이션 패턴</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// 스크롤 기반 애니메이션
import { useScroll, useTransform, motion } from 'framer-motion'

const ScrollBasedAnimation = () => {
  const { scrollYProgress } = useScroll()
  
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <motion.div
      style={{
        scale,
        rotate,
        opacity
      }}
      className="scroll-animated-element"
    >
      Scroll to see magic!
    </motion.div>
  )
}

// 복잡한 시퀀스 애니메이션
const ComplexSequence = () => {
  const controls = useAnimation()

  const startAnimation = async () => {
    await controls.start({
      x: 100,
      transition: { duration: 1 }
    })
    
    await controls.start({
      rotate: 180,
      transition: { duration: 0.5 }
    })
    
    await controls.start({
      scale: 1.5,
      transition: { duration: 0.3 }
    })
  }

  return (
    <motion.div
      animate={controls}
      className="complex-animation"
      onClick={startAnimation}
    >
      Click for sequence
    </motion.div>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🎭 애니메이션 성능 최적화 가이드">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">최적화 기법</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <h5 className="font-medium text-green-900">GPU 가속 활용</h5>
                                            <p className="text-sm text-green-800 mt-1">
                                                transform, opacity 속성 우선 사용
                                            </p>
                                        </div>
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="font-medium text-blue-900">will-change 최적화</h5>
                                            <p className="text-sm text-blue-800 mt-1">
                                                애니메이션 전후 적절한 GPU 레이어 관리
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                            <h5 className="font-medium text-purple-900">Reduce Reflows</h5>
                                            <p className="text-sm text-purple-800 mt-1">
                                                Layout 변경 최소화, Composite 레이어 활용
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">성능 측정</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                            <span className="text-sm font-medium text-yellow-900">목표 FPS</span>
                                            <span className="text-sm text-yellow-800">60 FPS</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                            <span className="text-sm font-medium text-red-900">Frame Budget</span>
                                            <span className="text-sm text-red-800">16.67ms</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                                            <span className="text-sm font-medium text-indigo-900">Layout Thrashing</span>
                                            <span className="text-sm text-indigo-800">&lt; 5ms</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'state-data':
                return (
                    <div className="space-y-6">
                        <Section title="🔄 TanStack Query & Zustand (5주)">
                            <div className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Database className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">차세대 상태 관리 - 서버와 클라이언트의 완벽한 동기화</h4>
                                        <p className="text-rose-100 text-sm mt-2">
                                            TanStack Query v5로 서버 상태를 완벽 관리하고 Zustand로 클라이언트 상태 단순화<br />
                                            캐싱, 동기화, 낙관적 업데이트를 통한 매끄러운 사용자 경험 구현
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('state-week1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1주차: Zustand 클라이언트 상태 관리</h4>
                                        {expandedItems['state-week1'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['state-week1'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-indigo-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-indigo-900 mb-2">Zustand 핵심 특징</h5>
                                                    <ul className="text-sm text-indigo-800 space-y-1">
                                                        <li>• 보일러플레이트 코드 최소화</li>
                                                        <li>• TypeScript 완벽 지원</li>
                                                        <li>• 번들 크기 최적화 (2.9KB)</li>
                                                        <li>• React 외부에서도 사용 가능</li>
                                                        <li>• 미들웨어 시스템</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">고급 패턴</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Slice 패턴으로 스토어 분리</li>
                                                        <li>• Immer 미들웨어 활용</li>
                                                        <li>• Persist 미들웨어</li>
                                                        <li>• DevTools 통합</li>
                                                        <li>• Subscriptions & Selectors</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">Zustand 스토어 구성</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// 타입 정의
interface UserState {
  user: User | null
  theme: 'light' | 'dark'
  notifications: Notification[]
  
  // Actions
  setUser: (user: User) => void
  toggleTheme: () => void
  addNotification: (notification: Notification) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

// 스토어 생성
const useUserStore = create<UserState>()(
  devtools(
    persist(
      immer((set, get) => ({
        user: null,
        theme: 'light',
        notifications: [],

        setUser: (user) => set((state) => {
          state.user = user
        }),

        toggleTheme: () => set((state) => {
          state.theme = state.theme === 'light' ? 'dark' : 'light'
        }),

        addNotification: (notification) => set((state) => {
          state.notifications.push({
            ...notification,
            id: Math.random().toString(36),
            timestamp: Date.now()
          })
        }),

        removeNotification: (id) => set((state) => {
          state.notifications = state.notifications.filter(n => n.id !== id)
        }),

        clearNotifications: () => set((state) => {
          state.notifications = []
        })
      })),
      {
        name: 'user-storage',
        partialize: (state) => ({ 
          user: state.user, 
          theme: state.theme 
        })
      }
    ),
    { name: 'user-store' }
  )
)

// 컴포넌트에서 사용
const Profile = () => {
  const { user, theme, toggleTheme } = useUserStore()
  const addNotification = useUserStore(state => state.addNotification)

  return (
    <div className={\`profile \${theme}\`}>
      <h1>{user?.name}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  )
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('state-week2-3')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">2-3주차: TanStack Query v5 마스터</h4>
                                        {expandedItems['state-week2-3'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['state-week2-3'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-red-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-red-900 mb-2">핵심 기능</h5>
                                                    <ul className="text-sm text-red-800 space-y-1">
                                                        <li>• 자동 백그라운드 업데이트</li>
                                                        <li>• 스마트 캐싱 전략</li>
                                                        <li>• 낙관적 업데이트</li>
                                                        <li>• 무한 쿼리 (Infinite Queries)</li>
                                                        <li>• 병렬 & 종속 쿼리</li>
                                                        <li>• 에러 경계 통합</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-pink-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-pink-900 mb-2">v5 새로운 기능</h5>
                                                    <ul className="text-sm text-pink-800 space-y-1">
                                                        <li>• 향상된 TypeScript 지원</li>
                                                        <li>• Suspense 네이티브 지원</li>
                                                        <li>• 더 나은 DevTools</li>
                                                        <li>• 플러그인 시스템</li>
                                                        <li>• 성능 개선 (30% 빨라짐)</li>
                                                        <li>• 번들 크기 최적화</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">TanStack Query 고급 사용법</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`import { 
  useQuery, 
  useMutation, 
  useQueryClient,
  useInfiniteQuery 
} from '@tanstack/react-query'

// 기본 쿼리
const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000,   // 10분 (구 cacheTime)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}

// 종속 쿼리
const useUserPosts = (userId: string) => {
  return useQuery({
    queryKey: ['users', userId, 'posts'],
    queryFn: () => fetchUserPosts(userId),
    enabled: !!userId, // userId가 있을 때만 실행
  })
}

// 무한 쿼리
const useInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 0 }) => fetchUsers({ page: pageParam }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined
    },
    initialPageParam: 0
  })
}

// 뮤테이션 with 낙관적 업데이트
const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    
    // 낙관적 업데이트
    onMutate: async (newUser) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['users'] })
      
      // 이전 데이터 저장
      const previousUsers = queryClient.getQueryData(['users'])
      
      // 낙관적으로 데이터 업데이트
      queryClient.setQueryData(['users'], (old: User[]) =>
        old?.map(user => 
          user.id === newUser.id ? { ...user, ...newUser } : user
        )
      )
      
      return { previousUsers }
    },
    
    // 성공 시
    onSuccess: (data, variables, context) => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    
    // 에러 시 롤백
    onError: (err, newUser, context) => {
      queryClient.setQueryData(['users'], context?.previousUsers)
    },
    
    // 완료 후 항상 실행
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('state-week4-5')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">4-5주차: 고급 패턴 & 실전 프로젝트</h4>
                                        {expandedItems['state-week4-5'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['state-week4-5'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-rose-900 mb-3">최종 프로젝트: 실시간 협업 도구</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-rose-800 mb-2">핵심 기능</h6>
                                                        <ul className="text-xs text-rose-700 space-y-1">
                                                            <li>• 실시간 문서 편집</li>
                                                            <li>• 사용자 온라인 상태 관리</li>
                                                            <li>• 무한 스크롤 메시지</li>
                                                            <li>• 파일 업로드 with 진행률</li>
                                                            <li>• 오프라인 지원</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-rose-800 mb-2">기술 구현</h6>
                                                        <ul className="text-xs text-rose-700 space-y-1">
                                                            <li>• WebSocket 실시간 동기화</li>
                                                            <li>• Optimistic Updates</li>
                                                            <li>• Background Sync</li>
                                                            <li>• Smart Caching</li>
                                                            <li>• Error Recovery</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">실시간 동기화 패턴</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// WebSocket 실시간 쿼리
const useRealtimeMessages = (roomId: string) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => fetchMessages(roomId),
    
    // WebSocket으로 실시간 업데이트
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    
    // 백그라운드 업데이트 비활성화 (WebSocket 사용)
    refetchInterval: false,
    
    // 컴포넌트에서 실시간 구독 설정
    onSuccess: (data) => {
      // WebSocket 연결 및 메시지 리스너 설정
      const ws = new WebSocket(\`ws://localhost:3001/rooms/\${roomId}\`)
      
      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data)
        
        // 새 메시지를 캐시에 추가
        queryClient.setQueryData(['messages', roomId], (old: Message[]) => 
          [...(old || []), newMessage]
        )
      }
      
      return () => ws.close()
    }
  })
}

// 오프라인 지원 뮤테이션
const useSendMessage = (roomId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: sendMessage,
    
    // 오프라인에서도 낙관적 업데이트
    onMutate: async (newMessage) => {
      const tempId = \`temp-\${Date.now()}\`
      const optimisticMessage = {
        ...newMessage,
        id: tempId,
        status: 'sending',
        timestamp: new Date().toISOString()
      }

      // 즉시 UI에 반영
      queryClient.setQueryData(['messages', roomId], (old: Message[]) =>
        [...(old || []), optimisticMessage]
      )

      return { tempId }
    },

    onSuccess: (data, variables, context) => {
      // 서버에서 받은 실제 메시지로 교체
      queryClient.setQueryData(['messages', roomId], (old: Message[]) =>
        old?.map(msg => 
          msg.id === context?.tempId 
            ? { ...data, status: 'sent' }
            : msg
        )
      )
    },

    onError: (error, variables, context) => {
      // 전송 실패 시 상태 업데이트
      queryClient.setQueryData(['messages', roomId], (old: Message[]) =>
        old?.map(msg => 
          msg.id === context?.tempId 
            ? { ...msg, status: 'failed' }
            : msg
        )
      )
    },

    // 재시도 로직
    retry: (failureCount, error) => {
      // 네트워크 에러인 경우 3번까지 재시도
      return error.name === 'NetworkError' && failureCount < 3
    }
  })
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="📊 상태 관리 라이브러리 비교">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">라이브러리</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">번들 크기</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학습 곡선</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TypeScript</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DevTools</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">추천 용도</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zustand</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">2.9KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">쉬움</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">우수</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">있음</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">중소규모</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Redux Toolkit</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">63KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">보통</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">우수</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">완벽</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">대규모</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TanStack Query</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">37KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">보통</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">우수</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">완벽</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">서버 상태</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recoil</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">45KB</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">어려움</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">보통</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">있음</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">복잡한 상태</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Section>
                    </div>
                );

            case 'auth-security':
                return (
                    <div className="space-y-6">
                        <Section title="🔐 NextAuth.js v5 & 보안 (4주)">
                            <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Shield className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">엔터프라이즈급 인증 & 보안 - Auth.js 에코시스템</h4>
                                        <p className="text-cyan-100 text-sm mt-2">
                                            OAuth, JWT, 다중 인증을 지원하는 완전한 인증 솔루션<br />
                                            CSRF, XSS, Session 보안까지 프로덕션 레벨 보안 구현
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('auth-week1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1주차: NextAuth.js v5 기초</h4>
                                        {expandedItems['auth-week1'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['auth-week1'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-teal-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-teal-900 mb-2">v5 주요 변경사항</h5>
                                                    <ul className="text-sm text-teal-800 space-y-1">
                                                        <li>• 새로운 @auth/core 아키텍처</li>
                                                        <li>• 향상된 TypeScript 지원</li>
                                                        <li>• Edge Runtime 완전 지원</li>
                                                        <li>• 단순화된 설정</li>
                                                        <li>• 개선된 에러 처리</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-cyan-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-cyan-900 mb-2">지원 인증 방식</h5>
                                                    <ul className="text-sm text-cyan-800 space-y-1">
                                                        <li>• OAuth 2.0 / OpenID Connect</li>
                                                        <li>• Email Magic Links</li>
                                                        <li>• Credentials (Username/Password)</li>
                                                        <li>• JWT & Database Sessions</li>
                                                        <li>• Multi-factor Authentication</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">NextAuth.js v5 설정</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// auth.config.ts
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user) return null
        
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        if (!isPasswordValid) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }
    })
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role
      }
      return session
    },
    
    async redirect({ url, baseUrl }) {
      // 리다이렉션 보안 검증
      if (url.startsWith("/")) return \`\${baseUrl}\${url}\`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },
  
  events: {
    async signIn({ user, account, profile }) {
      // 로그인 이벤트 로깅
      console.log(\`User \${user.email} signed in with \${account?.provider}\`)
    }
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('auth-week2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">2주차: 고급 인증 & 보안</h4>
                                        {expandedItems['auth-week2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['auth-week2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-blue-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-blue-900 mb-2">고급 보안 기능</h5>
                                                    <ul className="text-sm text-blue-800 space-y-1">
                                                        <li>• Role-based Access Control</li>
                                                        <li>• JWT Token Rotation</li>
                                                        <li>• Session Security</li>
                                                        <li>• CSRF Protection</li>
                                                        <li>• Rate Limiting</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">미들웨어 보안</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Route Protection</li>
                                                        <li>• API 경로 인증</li>
                                                        <li>• 조건부 리다이렉션</li>
                                                        <li>• 권한 기반 라우팅</li>
                                                        <li>• 세션 검증</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">미들웨어 보안 구현</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // 관리자 페이지 접근 제한
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }

    // API 경로 인증 확인
    if (pathname.startsWith('/api/protected') && !token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // 세션 만료 처리
    if (token && token.exp && Date.now() >= token.exp * 1000) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // 공개 경로는 항상 허용
        if (pathname.startsWith('/public') || pathname === '/') {
          return true
        }
        
        // 인증이 필요한 경로
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
    '/profile/:path*'
  ]
}

// lib/auth-guard.tsx - 컴포넌트 레벨 보안
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string[]
  redirectTo?: string
}

export const AuthGuard = ({ 
  children, 
  requiredRole, 
  redirectTo = '/auth/signin' 
}: AuthGuardProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // 로딩 중

    if (!session) {
      router.replace(redirectTo)
      return
    }

    // 역할 기반 접근 제어
    if (requiredRole && !requiredRole.includes(session.user.role)) {
      router.replace('/unauthorized')
      return
    }
  }, [session, status, router, requiredRole, redirectTo])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  if (requiredRole && !requiredRole.includes(session.user.role)) {
    return null
  }

  return <>{children}</>
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('auth-week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: 실전 프로젝트 - 인증 시스템</h4>
                                        {expandedItems['auth-week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['auth-week3-4'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-blue-900 mb-3">최종 프로젝트: SaaS 인증 플랫폼</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-blue-800 mb-2">인증 기능</h6>
                                                        <ul className="text-xs text-blue-700 space-y-1">
                                                            <li>• 소셜 로그인 (Google, GitHub, Discord)</li>
                                                            <li>• 이메일 인증 & 비밀번호 재설정</li>
                                                            <li>• 2FA (TOTP) 구현</li>
                                                            <li>• 세션 관리 & 디바이스 추적</li>
                                                            <li>• API 키 관리</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-blue-800 mb-2">보안 기능</h6>
                                                        <ul className="text-xs text-blue-700 space-y-1">
                                                            <li>• Rate Limiting (Upstash Redis)</li>
                                                            <li>• 로그인 시도 제한</li>
                                                            <li>• IP 기반 블로킹</li>
                                                            <li>• 감사 로그 (Audit Logs)</li>
                                                            <li>• 보안 헤더 설정</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">2FA 구현 예제</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// lib/2fa.ts
import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export const generate2FASecret = (email: string) => {
  const secret = authenticator.generateSecret()
  const otpauth = authenticator.keyuri(
    email,
    'MyApp',
    secret
  )
  
  return { secret, otpauth }
}

export const generateQRCode = async (otpauth: string) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(otpauth)
    return qrCodeDataURL
  } catch (error) {
    throw new Error('Failed to generate QR code')
  }
}

export const verify2FAToken = (token: string, secret: string) => {
  return authenticator.check(token, secret)
}

// api/auth/2fa/setup.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { generate2FASecret, generateQRCode } from '@/lib/2fa'

export async function POST(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { secret, otpauth } = generate2FASecret(session.user.email)
    const qrCode = await generateQRCode(otpauth)

    // 임시로 secret 저장 (사용자가 확인 후 영구 저장)
    await redis.setex(\`temp-2fa:\${session.user.id}\`, 300, secret)

    return NextResponse.json({
      qrCode,
      secret: secret.replace(/.(?=.{4})/g, '*') // 마스킹된 secret
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to setup 2FA' },
      { status: 500 }
    )
  }
}

// api/auth/2fa/verify.ts
export async function POST(req: NextRequest) {
  const session = await getServerSession()
  const { token } = await req.json()

  if (!session?.user?.id || !token) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    // 임시 secret 가져오기
    const tempSecret = await redis.get(\`temp-2fa:\${session.user.id}\`)
    
    if (!tempSecret) {
      return NextResponse.json({ error: 'Setup expired' }, { status: 400 })
    }

    const isValid = verify2FAToken(token, tempSecret)

    if (isValid) {
      // 2FA 활성화 및 secret 영구 저장
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          twoFactorSecret: tempSecret,
          twoFactorEnabled: true
        }
      })

      // 임시 secret 삭제
      await redis.del(\`temp-2fa:\${session.user.id}\`)

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🛡️ 프론트엔드 보안 체크리스트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">인증 & 세션 보안</h4>
                                    <div className="space-y-2">
                                        {[
                                            'JWT 토큰 안전한 저장 (httpOnly 쿠키)',
                                            'CSRF 토큰 검증',
                                            '세션 타임아웃 관리',
                                            '동시 세션 수 제한',
                                            '로그인 시도 제한 (Rate Limiting)',
                                            '비밀번호 정책 강화',
                                            '2FA/MFA 구현'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                <span className="text-sm text-green-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">데이터 보호 & 통신</h4>
                                    <div className="space-y-2">
                                        {[
                                            'HTTPS 강제 적용',
                                            'Content Security Policy (CSP)',
                                            'XSS 방어 (입력 검증, 출력 인코딩)',
                                            '민감 데이터 암호화',
                                            'API 엔드포인트 보안',
                                            '환경 변수 안전한 관리',
                                            '의존성 취약점 정기 검사'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                                                <span className="text-sm text-blue-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'design-tools':
                return (
                    <div className="space-y-6">
                        <Section title="🎨 Figma & Claude Code 활용 (6주)">
                            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Globe className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">디자인-개발 워크플로우 - AI 시대의 협업</h4>
                                        <p className="text-emerald-100 text-sm mt-2">
                                            Figma에서 디자인 시스템 구축부터 Claude Code로 AI 기반 개발까지<br />
                                            디자인-개발 간격을 좁히고 생산성을 극대화하는 모던 워크플로우
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('design-week1-2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1-2주차: Figma 디자인 시스템</h4>
                                        {expandedItems['design-week1-2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['design-week1-2'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-emerald-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-emerald-900 mb-2">디자인 시스템 구성</h5>
                                                    <ul className="text-sm text-emerald-800 space-y-1">
                                                        <li>• Color Tokens & Semantic Colors</li>
                                                        <li>• Typography Scale & Font Weights</li>
                                                        <li>• Spacing System (4pt/8pt Grid)</li>
                                                        <li>• Component Variants</li>
                                                        <li>• Auto Layout & Constraints</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-teal-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-teal-900 mb-2">고급 기능</h5>
                                                    <ul className="text-sm text-teal-800 space-y-1">
                                                        <li>• Variables & Expressions</li>
                                                        <li>• Component Properties</li>
                                                        <li>• Boolean & Instance Swap</li>
                                                        <li>• Nested Components</li>
                                                        <li>• Figma Dev Mode</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">Design Token 설정</h5>
                                                <div className="space-y-3">
                                                    <div className="bg-white p-3 rounded border">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">Color System</h6>
                                                        <div className="grid grid-cols-5 gap-2">
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-50 rounded mb-1 mx-auto"></div>
                                                                <span className="text-xs">50</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-200 rounded mb-1 mx-auto"></div>
                                                                <span className="text-xs">200</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-500 rounded mb-1 mx-auto"></div>
                                                                <span className="text-xs">500</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-700 rounded mb-1 mx-auto"></div>
                                                                <span className="text-xs">700</span>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="w-8 h-8 bg-blue-900 rounded mb-1 mx-auto"></div>
                                                                <span className="text-xs">900</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded border">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">Typography</h6>
                                                        <div className="space-y-2">
                                                            <div className="text-xs text-gray-600">Heading XL - 48px/52px</div>
                                                            <div className="text-sm text-gray-600">Heading L - 36px/40px</div>
                                                            <div className="text-base text-gray-600">Body L - 18px/28px</div>
                                                            <div className="text-sm text-gray-600">Body M - 16px/24px</div>
                                                            <div className="text-xs text-gray-600">Caption - 12px/16px</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('design-week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: Claude Code AI 개발</h4>
                                        {expandedItems['design-week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['design-week3-4'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <div className="bg-violet-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-violet-900 mb-2">Claude Code 핵심 기능</h5>
                                                    <ul className="text-sm text-violet-800 space-y-1">
                                                        <li>• 자연어로 컴포넌트 생성</li>
                                                        <li>• 코드 리팩토링 & 최적화</li>
                                                        <li>• 버그 수정 & 디버깅</li>
                                                        <li>• 테스트 코드 자동 생성</li>
                                                        <li>• 문서화 자동화</li>
                                                    </ul>
                                                </div>
                                                <div className="bg-purple-50 p-4 rounded-lg">
                                                    <h5 className="font-medium text-purple-900 mb-2">워크플로우 통합</h5>
                                                    <ul className="text-sm text-purple-800 space-y-1">
                                                        <li>• Figma → Code 변환</li>
                                                        <li>• Git 워크플로우 자동화</li>
                                                        <li>• PR 리뷰 & 제안</li>
                                                        <li>• 성능 최적화 제안</li>
                                                        <li>• 접근성 개선 사항</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">Claude Code 활용 예제</h5>
                                                <div className="space-y-3">
                                                    <div className="bg-white p-3 rounded border">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">💬 자연어 명령</h6>
                                                        <div className="text-sm text-gray-600 italic">
                                                            "Figma 디자인을 보고 반응형 카드 컴포넌트를 만들어줘.
                                                            Tailwind CSS를 사용하고, 호버 애니메이션도 추가해줘."
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded border">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">🔄 코드 리팩토링</h6>
                                                        <div className="text-sm text-gray-600 italic">
                                                            "이 컴포넌트의 성능을 최적화하고 TypeScript 타입을 더 엄격하게 만들어줘."
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-3 rounded border">
                                                        <h6 className="text-sm font-medium text-gray-900 mb-2">🧪 테스트 생성</h6>
                                                        <div className="text-sm text-gray-600 italic">
                                                            "이 Button 컴포넌트에 대한 Jest 테스트를 작성해줘.
                                                            모든 props와 이벤트 핸들러를 테스트해야 해."
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('design-week5-6')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">5-6주차: 디자인-개발 통합 워크플로우</h4>
                                        {expandedItems['design-week5-6'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['design-week5-6'] && (
                                        <div className="mt-4 space-y-4">
                                            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-cyan-900 mb-3">통합 워크플로우 프로젝트</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h6 className="text-sm font-medium text-cyan-800 mb-2">Figma 작업</h6>
                                                        <ul className="text-xs text-cyan-700 space-y-1">
                                                            <li>• 완전한 디자인 시스템 구축</li>
                                                            <li>• 모바일/데스크톱 프로토타입</li>
                                                            <li>• 인터랙션 & 마이크로애니메이션</li>
                                                            <li>• 컴포넌트 라이브러리</li>
                                                            <li>• 개발자 핸드오프</li>
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h6 className="text-sm font-medium text-cyan-800 mb-2">Claude Code 개발</h6>
                                                        <ul className="text-xs text-cyan-700 space-y-1">
                                                            <li>• 디자인 → 코드 자동 변환</li>
                                                            <li>• 컴포넌트 자동 생성</li>
                                                            <li>• 스타일링 최적화</li>
                                                            <li>• 테스트 코드 생성</li>
                                                            <li>• 문서화 자동화</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <h5 className="font-medium text-gray-900 mb-2">자동화된 개발 파이프라인</h5>
                                                <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                                    {`// claude-workflow.config.js
export default {
  // Figma 연동 설정
  figma: {
    fileId: process.env.FIGMA_FILE_ID,
    accessToken: process.env.FIGMA_ACCESS_TOKEN,
    
    // 자동 변환 규칙
    componentMapping: {
      'Button': 'components/ui/Button.tsx',
      'Card': 'components/ui/Card.tsx',
      'Modal': 'components/ui/Modal.tsx',
    },
    
    // 디자인 토큰 싱크
    designTokens: {
      colors: 'styles/colors.ts',
      typography: 'styles/typography.ts',
      spacing: 'styles/spacing.ts',
    }
  },

  // 코드 생성 설정
  codeGeneration: {
    framework: 'next.js',
    styling: 'tailwind',
    typescript: true,
    
    // 자동 생성 옵션
    generateTests: true,
    generateStorybook: true,
    generateDocs: true,
    
    // 최적화 옵션
    optimizeImages: true,
    treeshaking: true,
    bundleAnalysis: true
  },

  // AI 어시스턴트 설정
  ai: {
    model: 'claude-3-sonnet',
    temperature: 0.3,
    
    // 커스텀 프롬프트
    prompts: {
      componentGeneration: \`
        Create a React component based on the Figma design.
        Use TypeScript and Tailwind CSS.
        Include proper props interface and default values.
        Add JSDoc comments for documentation.
        Ensure accessibility compliance.
      \`,
      
      testGeneration: \`
        Generate comprehensive tests for this component.
        Use Jest and React Testing Library.
        Test all props, events, and accessibility features.
        Include edge cases and error scenarios.
      \`
    }
  },

  // 품질 관리
  quality: {
    linting: ['eslint', 'prettier'],
    testing: ['jest', 'react-testing-library'],
    accessibility: ['axe-core', 'lighthouse'],
    performance: ['web-vitals', 'bundle-analyzer']
  }
}

// package.json scripts
{
  "scripts": {
    "figma:sync": "claude-code figma sync",
    "generate:component": "claude-code generate component",
    "generate:tests": "claude-code generate tests",
    "optimize": "claude-code optimize",
    "audit": "claude-code audit"
  }
}`}
                                                </pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🚀 생산성 향상 지표">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">개발 속도</h4>
                                    <div className="text-2xl font-bold text-green-600 mb-1">5배</div>
                                    <p className="text-sm text-gray-600">컴포넌트 생성 시간</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Target className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">정확도</h4>
                                    <div className="text-2xl font-bold text-blue-600 mb-1">95%</div>
                                    <p className="text-sm text-gray-600">디자인 구현 정확도</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Users className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">협업 효율</h4>
                                    <div className="text-2xl font-bold text-purple-600 mb-1">80%</div>
                                    <p className="text-sm text-gray-600">커뮤니케이션 시간 절약</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Award className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">품질</h4>
                                    <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
                                    <p className="text-sm text-gray-600">코드 품질 점수</p>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'projects':
                return (
                    <div className="space-y-6">
                        <Section title="🎯 실전 프로젝트 포트폴리오 (전체 통합)">
                            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 rounded-lg mb-6">
                                <div className="flex items-start">
                                    <Target className="h-6 w-6 text-white mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-white">포트폴리오 프로젝트 - 기술 스택 통합 실전</h4>
                                        <p className="text-orange-100 text-sm mt-2">
                                            16주간 학습한 모든 기술을 통합하여 실제 서비스 수준의 프로젝트 구축<br />
                                            채용 담당자가 주목할 수 있는 차별화된 포트폴리오 완성
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                                                <Globe className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-blue-900">프로젝트 1</h4>
                                                <p className="text-sm text-blue-700">SaaS 대시보드</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm text-blue-800 space-y-2 mb-4">
                                            <li>• Next.js 14 App Router</li>
                                            <li>• TanStack Query + Zustand</li>
                                            <li>• AG Grid + 실시간 차트</li>
                                            <li>• NextAuth.js + 2FA</li>
                                            <li>• Framer Motion 애니메이션</li>
                                        </ul>
                                        <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                                            📊 Analytics, 사용자 관리, 실시간 모니터링
                                        </div>
                                    </div>

                                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                                                <Users className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-green-900">프로젝트 2</h4>
                                                <p className="text-sm text-green-700">협업 도구</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm text-green-800 space-y-2 mb-4">
                                            <li>• 실시간 문서 편집</li>
                                            <li>• React DnD 칸반 보드</li>
                                            <li>• WebSocket 실시간 채팅</li>
                                            <li>• 파일 업로드 & 공유</li>
                                            <li>• 모바일 반응형 PWA</li>
                                        </ul>
                                        <div className="text-xs text-green-600 bg-green-100 p-2 rounded">
                                            💼 팀 협업, 프로젝트 관리, 커뮤니케이션
                                        </div>
                                    </div>

                                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                                                <Star className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-purple-900">프로젝트 3</h4>
                                                <p className="text-sm text-purple-700">AI 포트폴리오</p>
                                            </div>
                                        </div>
                                        <ul className="text-sm text-purple-800 space-y-2 mb-4">
                                            <li>• 3D 인터랙티브 요소</li>
                                            <li>• Scroll-triggered 애니메이션</li>
                                            <li>• Claude Code 통합</li>
                                            <li>• 다크모드 + 테마 시스템</li>
                                            <li>• 성능 최적화 (95+ 점수)</li>
                                        </ul>
                                        <div className="text-xs text-purple-600 bg-purple-100 p-2 rounded">
                                            🎨 개인 브랜딩, 창의적 표현, 기술 시연
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">🚀 프로젝트 1: SaaS Analytics 대시보드</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">핵심 기능</h5>
                                            <div className="space-y-3">
                                                <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                                                    <Activity className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                                    <div>
                                                        <div className="font-medium text-blue-900">실시간 대시보드</div>
                                                        <div className="text-sm text-blue-700">WebSocket 기반 실시간 데이터 업데이트</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                                                    <Database className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                                                    <div>
                                                        <div className="font-medium text-green-900">데이터 시각화</div>
                                                        <div className="text-sm text-green-700">Chart.js + AG Grid로 복잡한 데이터 표현</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                                                    <Shield className="h-5 w-5 text-purple-500 mt-0.5 mr-3" />
                                                    <div>
                                                        <div className="font-medium text-purple-900">고급 인증</div>
                                                        <div className="text-sm text-purple-700">NextAuth.js + 2FA + RBAC 시스템</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">기술 스택</h5>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <pre className="text-sm text-gray-800">
                                                    {`Frontend:
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query v5
- Zustand
- Framer Motion
- AG Grid Enterprise

Backend:
- Next.js API Routes
- Prisma + PostgreSQL
- NextAuth.js v5
- Socket.io
- Redis (캐싱)

Deployment:
- Vercel (Frontend)
- Railway (Database)
- Upstash (Redis)`}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                                        <h5 className="font-medium text-indigo-900 mb-2">💡 차별화 포인트</h5>
                                        <ul className="text-sm text-indigo-800 space-y-1">
                                            <li>• 실시간 성능 모니터링 (Core Web Vitals)</li>
                                            <li>• AI 기반 이상 탐지 알고리즘</li>
                                            <li>• 커스텀 차트 컴포넌트 (Canvas API)</li>
                                            <li>• 마이크로 인터랙션으로 UX 개선</li>
                                            <li>• 완전한 접근성 지원 (WCAG 2.1 AA)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">💼 프로젝트 2: 실시간 협업 플랫폼</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">주요 기능</h5>
                                            <div className="space-y-2">
                                                <div className="flex items-center p-2 bg-green-50 rounded">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                    <span className="text-sm text-green-800">실시간 문서 공동 편집 (OT 알고리즘)</span>
                                                </div>
                                                <div className="flex items-center p-2 bg-blue-50 rounded">
                                                    <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                                                    <span className="text-sm text-blue-800">드래그 앤 드롭 칸반 보드</span>
                                                </div>
                                                <div className="flex items-center p-2 bg-purple-50 rounded">
                                                    <CheckCircle className="h-4 w-4 text-purple-500 mr-3" />
                                                    <span className="text-sm text-purple-800">화상 회의 통합 (WebRTC)</span>
                                                </div>
                                                <div className="flex items-center p-2 bg-orange-50 rounded">
                                                    <CheckCircle className="h-4 w-4 text-orange-500 mr-3" />
                                                    <span className="text-sm text-orange-800">오프라인 지원 (Service Worker)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-gray-900 mb-3">성능 최적화</h5>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                                    <span className="text-sm font-medium text-yellow-900">Bundle Size</span>
                                                    <span className="text-sm text-yellow-800"> 200KB</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                    <span className="text-sm font-medium text-green-900">Lighthouse Score</span>
                                                    <span className="text-sm text-green-800">95+</span>
                                                </div>
                                                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                                    <span className="text-sm font-medium text-blue-900">실시간 지연시간</span>
                                                    <span className="text-sm text-blue-800"> 50ms</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-4">🎨 프로젝트 3: AI 기반 창작 포트폴리오</h4>
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-4">
                                        <h5 className="font-medium text-purple-900 mb-2">🤖 Claude Code 통합 기능</h5>
                                        <ul className="text-sm text-purple-800 space-y-1">
                                            <li>• AI 기반 코드 생성 데모</li>
                                            <li>• 자동 컴포넌트 최적화</li>
                                            <li>• 실시간 디자인 → 코드 변환</li>
                                            <li>• 자연어 인터페이스</li>
                                            <li>• 코드 품질 자동 분석</li>
                                        </ul>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h6 className="text-sm font-medium text-gray-900 mb-2">시각적 요소</h6>
                                            <ul className="text-xs text-gray-700 space-y-1">
                                                <li>• Three.js 3D 인터랙션</li>
                                                <li>• GSAP 고급 애니메이션</li>
                                                <li>• Canvas 기반 파티클 시스템</li>
                                                <li>• Parallax 스크롤 효과</li>
                                                <li>• 동적 테마 변경</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h6 className="text-sm font-medium text-gray-900 mb-2">성능 기술</h6>
                                            <ul className="text-xs text-gray-700 space-y-1">
                                                <li>• Image Optimization (Next.js)</li>
                                                <li>• Code Splitting 최적화</li>
                                                <li>• Web Workers 활용</li>
                                                <li>• Intersection Observer</li>
                                                <li>• Progressive Enhancement</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📈 포트폴리오 완성도 체크리스트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">기술적 완성도</h4>
                                    <div className="space-y-2">
                                        {[
                                            '모든 기술 스택 통합 구현',
                                            '실제 서비스 수준 기능',
                                            '반응형 디자인 완벽 지원',
                                            'TypeScript 완전 타입 안정성',
                                            '테스트 커버리지 80% 이상',
                                            '접근성 WCAG 2.1 AA 준수',
                                            '성능 최적화 (Lighthouse 90+)',
                                            'SEO 최적화 완료'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                <span className="text-sm text-green-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">프로페셔널 요소</h4>
                                    <div className="space-y-2">
                                        {[
                                            '완전한 README 문서',
                                            '라이브 데모 + GitHub 링크',
                                            '코드 품질 도구 적용',
                                            'CI/CD 파이프라인 구축',
                                            '에러 모니터링 연동',
                                            '사용자 피드백 수집',
                                            '성능 메트릭 대시보드',
                                            '기술 블로그 포스팅'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                                                <CheckCircle className="h-4 w-4 text-blue-500 mr-3" />
                                                <span className="text-sm text-blue-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🎯 취업 성공 전략">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-900 mb-4">포트폴리오 어필</h4>
                                    <ul className="text-sm text-green-800 space-y-2">
                                        <li>• 기술 스택 다양성과 깊이</li>
                                        <li>• 실제 비즈니스 문제 해결</li>
                                        <li>• 사용자 중심 설계 사고</li>
                                        <li>• 성능과 보안 고려</li>
                                        <li>• 지속적인 개선 의지</li>
                                    </ul>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-4">면접 대비</h4>
                                    <ul className="text-sm text-blue-800 space-y-2">
                                        <li>• 기술 선택 근거 설명</li>
                                        <li>• 트레이드오프 분석 능력</li>
                                        <li>• 문제 해결 과정 설명</li>
                                        <li>• 코드 리뷰 및 리팩토링</li>
                                        <li>• 확장성 고려사항</li>
                                    </ul>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-4">지속적 성장</h4>
                                    <ul className="text-sm text-purple-800 space-y-2">
                                        <li>• 오픈소스 기여</li>
                                        <li>• 기술 블로그 운영</li>
                                        <li>• 커뮤니티 참여</li>
                                        <li>• 새로운 기술 학습</li>
                                        <li>• 멘토링 및 지식 공유</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            default:
                return <div>Content not found</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Code className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">프론트엔드 기술 스택 완전 로드맵 2025</h1>
                                <p className="text-sm text-gray-500">Next.js부터 AI 도구까지 - 16주 마스터 과정</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Next.js 14</span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">TanStack v5</span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">2025 Latest</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <nav className="bg-white rounded-lg shadow-sm border p-4 sticky top-8">
                            <div className="space-y-1">
                                {sections.map((section) => {
                                    const Icon = section.icon;
                                    return (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4 mr-3" />
                                            {section.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Next.js 14, TanStack Query v5, Zustand, Claude Code 등 2025년 최신 프론트엔드 기술을 반영하여 작성되었습니다.
                        </p>
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
                            <span>• Next.js 14 App Router</span>
                            <span>• TanStack Query v5</span>
                            <span>• Framer Motion 11</span>
                            <span>• NextAuth.js v5</span>
                            <span>• Claude Code Integration</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-400">
                                🚀 16주 완주 시 시니어 프론트엔드 개발자로 취업 성공하세요!
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default FrontendRoadmap;