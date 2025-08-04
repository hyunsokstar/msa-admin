"use client";
// C:\Users\terec\msa-admin\src\app\pilot-project\roadmap-for-spring-boot\page.tsx
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, Shield, Server, Users, Coffee, Database, Network, Globe, Clock, BookOpen, ExternalLink, Star, Zap, Lock, Trophy, AlertCircle, Info, Cpu, Activity, Target, Code, Layers, HardDrive } from 'lucide-react';

interface ExpandedItems {
    [key: string]: boolean;
}

const SpringBootManual = () => {
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

    const toggleExpanded = (id: string): void => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const sections = [
        { id: 'overview', title: '개요', icon: BookOpen },
        { id: 'ecosystem', title: '생태계', icon: Network },
        { id: 'roadmap', title: '12주 로드맵', icon: Clock },
        { id: 'performance', title: '성능 & GraalVM', icon: Zap },
        { id: 'enterprise', title: '기업 사례', icon: Trophy },
        { id: 'security', title: '보안 & 모범사례', icon: Shield },
        { id: 'ai', title: 'Spring AI', icon: Star },
        { id: 'resources', title: '학습 자료', icon: ExternalLink }
    ];

    const coreStack = [
        { name: 'Spring Boot 3.5', version: '2025.05 GA', desc: 'Auto-configuration, Starter 생태계', trend: 'Latest' },
        { name: 'Spring Framework 6.2', version: '6.2.3', desc: 'DI/IoC, AOP, WebMVC/WebFlux', trend: 'Stable' },
        { name: 'Spring Security 6.5', version: '6.5.0', desc: 'Authentication, Authorization, OAuth2', trend: 'Enhanced' },
        { name: 'Spring Data', version: '2025.0', desc: 'JPA, MongoDB, Redis, Elasticsearch', trend: 'Updated' },
        { name: 'Spring Cloud', version: '2025.0', desc: 'Microservices, Service Discovery', trend: 'Cloud-Native' },
        { name: 'Spring AI', version: '1.0 GA', desc: 'OpenAI, Anthropic, Ollama 통합', trend: 'New' }
    ];

    const performanceMetrics = [
        { metric: '시작 시간', jvm: '3-5초', graalvm: '50-100ms', improvement: '95% 개선' },
        { metric: '메모리 사용량', jvm: '200-400MB', graalvm: '50-100MB', improvement: '75% 절약' },
        { metric: '이미지 크기', jvm: '350MB+', graalvm: '130MB', improvement: '60% 축소' },
        { metric: 'Cold Start', jvm: '느림', graalvm: '즉시', improvement: 'Serverless 최적화' }
    ];

    const enterpriseCases = [
        {
            company: 'Netflix',
            scale: '2억+ 사용자',
            architecture: 'Spring Boot + Spring Cloud',
            benefits: '마이크로서비스 표준화, 20% 성능 향상',
            details: 'Spring Boot로 완전 표준화, Java 21 Virtual Threads 활용'
        },
        {
            company: 'Amazon',
            scale: '글로벌 서비스',
            architecture: 'Spring Boot Microservices',
            benefits: '확장성, 개발 생산성 향상',
            details: 'AWS Lambda에서 GraalVM Native Image 활용'
        },
        {
            company: 'Uber',
            scale: '수십억 요청/일',
            architecture: 'Spring Boot + Kafka',
            benefits: '실시간 데이터 처리, 고가용성',
            details: 'Spring Boot Reactive 스택으로 비동기 처리'
        }
    ];

    const roadmapPhases = [
        {
            weeks: '1-2주',
            title: 'Java & Spring 기초',
            focus: 'Foundation',
            topics: ['Java 17+ 기본기', 'Spring Core (DI/IoC)', 'Maven/Gradle', 'IDE 설정'],
            projects: ['Hello World 프로젝트', '의존성 주입 실습']
        },
        {
            weeks: '3-4주',
            title: 'Spring Boot 시작',
            focus: 'Getting Started',
            topics: ['Spring Boot 구조', 'Auto-configuration', 'Properties 설정', 'Profiles'],
            projects: ['REST API 서버', '설정 관리 앱']
        },
        {
            weeks: '5-6주',
            title: 'Web & REST API',
            focus: 'Web Development',
            topics: ['Spring MVC', 'RESTful API', 'Validation', 'Exception Handling'],
            projects: ['할일 관리 API', 'CRUD 웹 서비스']
        },
        {
            weeks: '7-8주',
            title: 'Data Access',
            focus: 'Database Integration',
            topics: ['Spring Data JPA', 'Database 연동', 'Transaction', 'Query Methods'],
            projects: ['게시판 시스템', '사용자 관리 앱']
        },
        {
            weeks: '9-10주',
            title: 'Security & Testing',
            focus: 'Production Ready',
            topics: ['Spring Security', 'JWT', 'Unit Testing', 'Integration Testing'],
            projects: ['인증 시스템', '보안 API 서버']
        },
        {
            weeks: '11-12주',
            title: 'Advanced & Microservices',
            focus: 'Enterprise Scale',
            topics: ['Spring Cloud', 'Microservices', 'Docker', 'Monitoring'],
            projects: ['마이크로서비스 시스템', '배포 파이프라인']
        }
    ];

    const aiFeatures = [
        { feature: 'Chat Models', providers: 'OpenAI, Anthropic, Ollama', useCase: '챗봇, Q&A 시스템' },
        { feature: 'Image Models', providers: 'OpenAI DALL-E, Stability AI', useCase: '이미지 생성, 편집' },
        { feature: 'Audio Models', providers: 'OpenAI Whisper', useCase: '음성 인식, 전사' },
        { feature: 'Vector Stores', providers: 'Pinecone, Chroma, Redis', useCase: 'RAG, 문서 검색' },
        { feature: 'Function Calling', providers: '모든 모델', useCase: 'API 호출, 도구 연동' }
    ];

    const Section = ({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) => (
        <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                {title}
            </h3>
            {children}
        </div>
    );

    const renderContent = (): React.ReactNode => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <Section title="🎯 Spring Boot 2025 핵심 전략">
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Info className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-green-800">Convention over Configuration</h4>
                                        <p className="text-green-700 mt-2">
                                            12주 완주 시 <strong>Production-Ready</strong> 엔터프라이즈 애플리케이션 개발 능력 확보<br />
                                            마이크로서비스, GraalVM Native Image, Spring AI까지 최신 기술 스택 마스터
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🚀 2025년 Spring Boot 주요 업데이트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">최신 릴리즈 하이라이트</h4>
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-blue-900">Spring Boot 3.5.0 GA</span>
                                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">2025.05</span>
                                            </div>
                                            <p className="text-sm text-blue-700 mt-2">
                                                향상된 구성 관리, 컨테이너 통합, SSL/TLS 개선
                                            </p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-purple-900">Spring AI 1.0 GA</span>
                                                <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">NEW</span>
                                            </div>
                                            <p className="text-sm text-purple-700 mt-2">
                                                OpenAI, Anthropic, Ollama 등 주요 AI 모델 통합
                                            </p>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-green-900">GraalVM Native Image</span>
                                                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Enhanced</span>
                                            </div>
                                            <p className="text-sm text-green-700 mt-2">
                                                50ms 이하 시작 시간, 75% 메모리 절약
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">기술적 진화</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                                            <Coffee className="h-5 w-5 text-yellow-600 mr-3" />
                                            <div>
                                                <div className="font-medium text-yellow-900">Java 21 Virtual Threads</div>
                                                <div className="text-sm text-yellow-700">동시성 처리 40% 향상, CPU 사용량 15% 절감</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                                            <Layers className="h-5 w-5 text-red-600 mr-3" />
                                            <div>
                                                <div className="font-medium text-red-900">Jakarta EE 9+ 마이그레이션</div>
                                                <div className="text-sm text-red-700">javax.* → jakarta.* 네임스페이스</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
                                            <Activity className="h-5 w-5 text-indigo-600 mr-3" />
                                            <div>
                                                <div className="font-medium text-indigo-900">관찰가능성 향상</div>
                                                <div className="text-sm text-indigo-700">Micrometer, OpenTelemetry 통합</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🏗️ 핵심 생태계 스택">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {coreStack.map((item, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                            <span className={`text-xs px-2 py-1 rounded ${item.trend === 'New' ? 'bg-green-100 text-green-800' :
                                                item.trend === 'Latest' ? 'bg-blue-100 text-blue-800' :
                                                    item.trend === 'Enhanced' ? 'bg-purple-100 text-purple-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {item.trend}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">{item.version}</div>
                                        <p className="text-sm text-gray-700">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📈 2025년 시장 전망">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">개발자 수요</h4>
                                    <div className="text-2xl font-bold text-blue-600 mb-1">+25%</div>
                                    <p className="text-sm text-gray-600">Spring Boot 개발자 채용 증가</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Globe className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">기업 도입률</h4>
                                    <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
                                    <p className="text-sm text-gray-600">Fortune 500 기업 활용</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Star className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">AI 통합</h4>
                                    <div className="text-2xl font-bold text-purple-600 mb-1">50%</div>
                                    <p className="text-sm text-gray-600">AI 기능 탑재 프로젝트</p>
                                </div>
                            </div>
                        </Section>

                        <Section title="💼 학습 성과 및 커리어 패스">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">12주 완주 후 기대 효과</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-indigo-900 mb-2">기술적 역량</h5>
                                            <ul className="text-sm text-indigo-800 space-y-1">
                                                <li>• 엔터프라이즈급 애플리케이션 설계</li>
                                                <li>• 마이크로서비스 아키텍처 구현</li>
                                                <li>• GraalVM Native Image 최적화</li>
                                                <li>• Spring AI로 지능형 앱 개발</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-purple-900 mb-2">커리어 성장</h5>
                                            <ul className="text-sm text-purple-800 space-y-1">
                                                <li>• Senior Backend Developer</li>
                                                <li>• Solutions Architect</li>
                                                <li>• DevOps Engineer</li>
                                                <li>• Technical Lead</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600">15만+</div>
                                            <div className="text-sm text-green-800">Spring Boot 채용 공고</div>
                                        </div>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">7000만+</div>
                                            <div className="text-sm text-blue-800">연봉 상승 (원/년)</div>
                                        </div>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-purple-600">95%</div>
                                            <div className="text-sm text-purple-800">개발자 만족도</div>
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
                        <Section title="🗺️ 12주 Spring Boot 마스터 로드맵 2025">
                            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <Target className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium text-blue-800">학습 목표</h4>
                                        <p className="text-blue-700 text-sm mt-1">
                                            초급자부터 시작하여 12주 후 엔터프라이즈급 Spring Boot 애플리케이션을
                                            설계하고 구현할 수 있는 실무 역량 확보
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {roadmapPhases.map((phase, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-sm font-bold mr-4">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold text-gray-900">{phase.weeks}</h4>
                                                    <p className="text-gray-600">{phase.title}</p>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${phase.focus === 'Foundation' ? 'bg-green-100 text-green-800' :
                                                phase.focus === 'Getting Started' ? 'bg-blue-100 text-blue-800' :
                                                    phase.focus === 'Web Development' ? 'bg-purple-100 text-purple-800' :
                                                        phase.focus === 'Database Integration' ? 'bg-orange-100 text-orange-800' :
                                                            phase.focus === 'Production Ready' ? 'bg-red-100 text-red-800' :
                                                                'bg-indigo-100 text-indigo-800'
                                                }`}>
                                                {phase.focus}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-3">학습 주제</h5>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {phase.topics.map((topic, topicIndex) => (
                                                        <div key={topicIndex} className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                            {topic}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-3">실습 프로젝트</h5>
                                                <div className="space-y-2">
                                                    {phase.projects.map((project, projectIndex) => (
                                                        <div key={projectIndex} className="flex items-center text-sm text-blue-700 bg-blue-50 p-2 rounded">
                                                            <Code className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                                                            {project}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📚 단계별 상세 학습 계획">
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week1-2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">1-2주차: Java & Spring 기초 마스터</h4>
                                        {expandedItems['week1-2'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week1-2'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Java 및 Spring의 기본 개념을 이해하고, 간단한 애플리케이션을 개발합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Java 17+ 기본기 다지기</li>
                                                <li>Spring Core (DI/IoC) 이해하기</li>
                                                <li>Maven/Gradle을 통한 빌드 관리</li>
                                                <li>IDE 설정 및 프로젝트 구조 이해하기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week3-4')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">3-4주차: Spring Boot 시작</h4>
                                        {expandedItems['week3-4'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week3-4'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Spring Boot의 구조와 설정 방법을 배우고, 간단한 RESTful API를 개발합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Spring Boot 기본 구조 이해하기</li>
                                                <li>Auto-configuration 원리 배우기</li>
                                                <li>Properties 파일을 통한 설정 관리</li>
                                                <li>Profiles을 이용한 환경별 설정 방법 배우기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week5-6')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">5-6주차: Web & REST API</h4>
                                        {expandedItems['week5-6'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week5-6'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Spring MVC를 이용한 웹 애플리케이션 개발 및 RESTful API 설계를 학습합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Spring MVC 구조 및 동작 원리 이해하기</li>
                                                <li>RESTful API 설계 원칙 배우기</li>
                                                <li>Validation 및 Exception Handling 기법 익히기</li>
                                                <li>API 문서화를 위한 Swagger/OpenAPI 사용법 배우기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week7-8')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">7-8주차: Data Access</h4>
                                        {expandedItems['week7-8'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week7-8'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Spring Data JPA를 이용한 데이터베이스 연동 및 쿼리 메소드 사용법을 학습합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Spring Data JPA 기본 개념 이해하기</li>
                                                <li>Database 연동 및 설정 방법 배우기</li>
                                                <li>Transaction 관리 및 쿼리 메소드 활용하기</li>
                                                <li>JPA Criteria API 및 QueryDSL 사용법 익히기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week9-10')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">9-10주차: Security & Testing</h4>
                                        {expandedItems['week9-10'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week9-10'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Spring Security를 이용한 인증 및 인가 구현, 단위 테스트 및 통합 테스트 기법을 학습합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Spring Security 기본 개념 이해하기</li>
                                                <li>JWT를 이용한 Stateless 인증 구현하기</li>
                                                <li>OAuth 2.1 / OIDC를 이용한 소셜 로그인 구현하기</li>
                                                <li>JUnit과 Mockito를 이용한 테스트 코드 작성법 배우기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('week11-12')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">11-12주차: Advanced & Microservices</h4>
                                        {expandedItems['week11-12'] ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems['week11-12'] && (
                                        <div className="mt-4 text-sm text-gray-700">
                                            <p>Spring Cloud를 이용한 마이크로서비스 아키텍처 구현 및 Docker를 이용한 컨테이너 배포를 학습합니다.</p>
                                            <ul className="list-disc list-inside mt-2">
                                                <li>Spring Cloud 기본 개념 이해하기</li>
                                                <li>마이크로서비스 간 통신 방법 배우기</li>
                                                <li>Docker를 이용한 컨테이너 이미지 생성 및 배포하기</li>
                                                <li>Kubernetes를 이용한 오케스트레이션 기법 익히기</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>

                        <Section title="🎯 학습 성과 측정">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">주차별 체크포인트</h4>
                                    <div className="space-y-3">
                                        {[
                                            { week: '2주차', task: 'Spring IoC/DI 개념 설명 가능', difficulty: 'Basic' },
                                            { week: '4주차', task: 'Spring Boot 프로젝트 구조 이해', difficulty: 'Basic' },
                                            { week: '6주차', task: 'RESTful API 설계 및 구현', difficulty: 'Intermediate' },
                                            { week: '8주차', task: 'JPA 연관관계 매핑 활용', difficulty: 'Intermediate' },
                                            { week: '10주차', task: '보안 인증/인가 구현', difficulty: 'Advanced' },
                                            { week: '12주차', task: '마이크로서비스 아키텍처 구성', difficulty: 'Advanced' }
                                        ].map((checkpoint, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                    <div>
                                                        <span className="font-medium text-gray-900">{checkpoint.week}</span>
                                                        <span className="text-gray-700 ml-2">{checkpoint.task}</span>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-1 text-xs font-medium rounded ${checkpoint.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                                                    checkpoint.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {checkpoint.difficulty}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">최종 역량 평가</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="font-medium text-blue-900 mb-2">기술적 역량</h5>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>✅ Spring Framework 생태계 활용</li>
                                                <li>✅ 엔터프라이즈 패턴 적용</li>
                                                <li>✅ 테스트 주도 개발 (TDD)</li>
                                                <li>✅ 성능 최적화 기법</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <h5 className="font-medium text-green-900 mb-2">프로젝트 결과물</h5>
                                            <ul className="text-sm text-green-800 space-y-1">
                                                <li>📦 GitHub 포트폴리오 (12개 프로젝트)</li>
                                                <li>📊 성능 테스트 보고서</li>
                                                <li>📖 기술 문서 작성</li>
                                                <li>🚀 클라우드 배포 경험</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'performance':
                return (
                    <div className="space-y-6">
                        <Section title="⚡ Spring Boot vs GraalVM Native Image 성능 비교">
                            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <Zap className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium text-blue-800">GraalVM Native Image 혁신</h4>
                                        <p className="text-blue-700 text-sm mt-1">
                                            Spring Boot 3.0+에서 정식 지원하는 AOT(Ahead-of-Time) 컴파일을 통해
                                            시작 시간 95% 단축, 메모리 사용량 75% 절약 달성
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">성능 지표</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">JVM 모드</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GraalVM Native</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">개선 효과</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {performanceMetrics.map((metric, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{metric.metric}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">{metric.jvm}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{metric.graalvm}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">{metric.improvement}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <Section title="📊 실제 벤치마크 데이터">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">시작 시간 벤치마크</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-orange-900">Spring Boot JVM</span>
                                                <span className="text-lg font-bold text-orange-600">3.4초</span>
                                            </div>
                                            <div className="w-full bg-orange-200 rounded-full h-2">
                                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                            <p className="text-sm text-orange-700 mt-1">전체 애플리케이션 컨텍스트 로드 시간</p>
                                        </div>

                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-green-900">GraalVM Native</span>
                                                <span className="text-lg font-bold text-green-600">75ms</span>
                                            </div>
                                            <div className="w-full bg-green-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                                            </div>
                                            <p className="text-sm text-green-700 mt-1">네이티브 실행파일 즉시 시작</p>
                                        </div>

                                        <div className="p-3 bg-blue-50 rounded border border-blue-200">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-blue-600">45배</div>
                                                <div className="text-sm text-blue-700">시작 속도 향상</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">메모리 사용량 비교</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-red-900">JVM Heap + MetaSpace</span>
                                                <span className="text-lg font-bold text-red-600">361MB</span>
                                            </div>
                                            <div className="w-full bg-red-200 rounded-full h-2">
                                                <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>
                                            <p className="text-sm text-red-700 mt-1">런타임 메모리 전체 사용량</p>
                                        </div>

                                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-purple-900">Native Image RSS</span>
                                                <span className="text-lg font-bold text-purple-600">91MB</span>
                                            </div>
                                            <div className="w-full bg-purple-200 rounded-full h-2">
                                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                            <p className="text-sm text-purple-700 mt-1">네이티브 프로세스 메모리</p>
                                        </div>

                                        <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold text-indigo-600">75%</div>
                                                <div className="text-sm text-indigo-700">메모리 절약</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔧 GraalVM Native Image 구성">
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">Maven 설정</h4>
                                    <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                        {`<profiles>
  <profile>
    <id>native</id>
    <build>
      <plugins>
        <plugin>
          <groupId>org.graalvm.buildtools</groupId>
          <artifactId>native-maven-plugin</artifactId>
          <version>0.10.3</version>
          <executions>
            <execution>
              <id>build-native</id>
              <goals>
                <goal>compile-no-fork</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
      </plugins>
    </build>
  </profile>
</profiles>`}
                                    </pre>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">네이티브 빌드 명령어</h4>
                                    <div className="space-y-2">
                                        <div className="bg-white p-3 rounded border font-mono text-sm">
                                            # 로컬 네이티브 빌드<br />
                                            ./mvnw clean -Pnative native:compile
                                        </div>
                                        <div className="bg-white p-3 rounded border font-mono text-sm">
                                            # Docker를 통한 네이티브 빌드<br />
                                            ./mvnw spring-boot:build-image -Pnative
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <h5 className="font-medium text-green-900 mb-2">✅ 네이티브 지원 라이브러리</h5>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>• Spring Framework 6.0+</li>
                                            <li>• Spring Boot 3.0+</li>
                                            <li>• Spring Data JPA</li>
                                            <li>• Spring Security</li>
                                            <li>• Jackson JSON</li>
                                            <li>• Micrometer</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <h5 className="font-medium text-yellow-900 mb-2">⚠️ 제한 사항</h5>
                                        <ul className="text-sm text-yellow-800 space-y-1">
                                            <li>• 동적 클래스 로딩 불가</li>
                                            <li>• 리플렉션 사전 구성 필요</li>
                                            <li>• 빌드 시간 5-10분 소요</li>
                                            <li>• 일부 라이브러리 미지원</li>
                                            <li>• 플랫폼별 바이너리</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📈 성능 최적화 전략">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Cpu className="h-5 w-5 text-blue-500 mr-2" />
                                        JVM 성능 튜닝
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <h5 className="font-medium text-blue-900">JVM 파라미터 최적화</h5>
                                            <div className="text-sm text-blue-800 mt-1 font-mono">
                                                -Xms512m -Xmx1024m<br />
                                                -XX:+UseG1GC<br />
                                                -XX:MaxGCPauseMillis=200
                                            </div>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <h5 className="font-medium text-green-900">Spring Boot 설정</h5>
                                            <div className="text-sm text-green-800 mt-1">
                                                • Lazy Initialization 활성화<br />
                                                • 불필요한 Auto-configuration 제외<br />
                                                • Connection Pool 튜닝
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <HardDrive className="h-5 w-5 text-green-500 mr-2" />
                                        Native Image 최적화
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-purple-50 rounded-lg">
                                            <h5 className="font-medium text-purple-900">AOT 힌트 구성</h5>
                                            <div className="text-sm text-purple-800 mt-1">
                                                • @RegisterReflectionForBinding<br />
                                                • RuntimeHints 커스터마이징<br />
                                                • 네이티브 테스트 실행
                                            </div>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-lg">
                                            <h5 className="font-medium text-orange-900">빌드 최적화</h5>
                                            <div className="text-sm text-orange-800 mt-1">
                                                • 멀티스테이지 Docker 빌드<br />
                                                • 프로파일 가이드 최적화(PGO)<br />
                                                • 불필요한 기능 제거
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🎯 실사용 시나리오별 권장사항">
                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                                    <h4 className="font-semibold text-gray-900 mb-3">☁️ 서버리스 & 마이크로서비스</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-green-900">AWS Lambda</div>
                                            <div className="text-sm text-green-700">Cold Start 최소화</div>
                                            <div className="text-xs text-green-600 mt-1">✅ Native 권장</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-blue-900">Kubernetes</div>
                                            <div className="text-sm text-blue-700">빠른 Pod 시작</div>
                                            <div className="text-xs text-blue-600 mt-1">✅ Native 권장</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-purple-900">Google Cloud Run</div>
                                            <div className="text-sm text-purple-700">자동 스케일링</div>
                                            <div className="text-xs text-purple-600 mt-1">✅ Native 권장</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border">
                                    <h4 className="font-semibold text-gray-900 mb-3">🏢 엔터프라이즈 애플리케이션</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3 bg-white rounded">
                                            <div className="font-medium text-orange-900">장시간 실행 애플리케이션</div>
                                            <div className="text-sm text-orange-700 mt-1">
                                                • JIT 컴파일러 최적화 활용<br />
                                                • 복잡한 비즈니스 로직<br />
                                                • 다양한 외부 라이브러리
                                            </div>
                                            <div className="text-xs text-orange-600 mt-2">⚖️ JVM 모드 고려</div>
                                        </div>
                                        <div className="p-3 bg-white rounded">
                                            <div className="font-medium text-red-900">배치 처리 애플리케이션</div>
                                            <div className="text-sm text-red-700 mt-1">
                                                • 빠른 시작 시간 중요<br />
                                                • 메모리 효율성 우선<br />
                                                • 단순한 처리 로직
                                            </div>
                                            <div className="text-xs text-red-600 mt-2">✅ Native 권장</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'enterprise':
                return (
                    <div className="space-y-6">
                        <Section title="🏆 글로벌 기업 Spring Boot 도입 사례">
                            <div className="space-y-6">
                                {enterpriseCases.map((company, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-xl font-semibold text-gray-900">{company.company}</h4>
                                                <p className="text-gray-600">{company.scale}</p>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                                                {company.architecture}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">주요 성과</h5>
                                                <p className="text-gray-700">{company.benefits}</p>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">기술적 세부사항</h5>
                                                <p className="text-gray-700">{company.details}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📊 Netflix Spring Boot 심화 분석">
                            <div className="bg-gradient-to-r from-red-50 to-black p-6 rounded-lg border border-red-200">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                                        <Star className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-900">Netflix: 업계 최대 규모 Spring Boot 운영</h4>
                                        <p className="text-gray-600">2억 3천만 사용자, 일일 수십억 요청 처리</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-3">아키텍처 진화</h5>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-white rounded border">
                                                <div className="font-medium text-red-900">2012년: 모놀리스 → 마이크로서비스</div>
                                                <div className="text-sm text-gray-700 mt-1">Spring Boot 도입으로 개발 생산성 300% 향상</div>
                                            </div>
                                            <div className="p-3 bg-white rounded border">
                                                <div className="font-medium text-blue-900">2021년: Spring Boot 완전 표준화</div>
                                                <div className="text-sm text-gray-700 mt-1">기존 Guice 기반 레거시를 Spring Boot로 완전 이전</div>
                                            </div>
                                            <div className="p-3 bg-white rounded border">
                                                <div className="font-medium text-green-900">2024년: Java 21 Virtual Threads</div>
                                                <div className="text-sm text-gray-700 mt-1">동시성 처리 성능 20% 향상 달성</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-3">기술적 혁신</h5>
                                        <div className="space-y-3">
                                            <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                                                <div className="font-medium text-yellow-900">Spring Cloud Netflix OSS</div>
                                                <div className="text-sm text-yellow-800 mt-1">Eureka, Zuul, Hystrix 등 오픈소스 기여</div>
                                            </div>
                                            <div className="p-3 bg-purple-50 rounded border border-purple-200">
                                                <div className="font-medium text-purple-900">메모리 최적화</div>
                                                <div className="text-sm text-purple-800 mt-1">Application Context 메모리 누수 해결</div>
                                            </div>
                                            <div className="p-3 bg-indigo-50 rounded border border-indigo-200">
                                                <div className="font-medium text-indigo-900">관찰가능성</div>
                                                <div className="text-sm text-indigo-800 mt-1">분산 추적, 메트릭, 로깅 통합 시스템</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📈 도입 성과 및 ROI 분석">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-900 mb-4">개발 생산성</h4>
                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-green-600">50%</div>
                                            <div className="text-sm text-green-800">개발 시간 단축</div>
                                        </div>
                                        <div className="text-sm text-green-800">
                                            • Auto-configuration으로 설정 간소화<br />
                                            • Starter Dependencies로 빠른 프로젝트 시작<br />
                                            • DevTools로 개발 효율성 향상
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-4">운영 효율성</h4>
                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-blue-600">40%</div>
                                            <div className="text-sm text-blue-800">인프라 비용 절감</div>
                                        </div>
                                        <div className="text-sm text-blue-800">
                                            • 마이크로서비스 아키텍처 도입<br />
                                            • 컨테이너 최적화<br />
                                            • 자동 스케일링 및 모니터링
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-4">품질 향상</h4>
                                    <div className="space-y-3">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-purple-600">99.9%</div>
                                            <div className="text-sm text-purple-800">시스템 가용성</div>
                                        </div>
                                        <div className="text-sm text-purple-800">
                                            • 내장 테스트 프레임워크<br />
                                            • Actuator 기반 헬스체크<br />
                                            • 분산 시스템 안정성
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🌍 산업별 도입 현황">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">금융 서비스</h4>
                                    <div className="space-y-3">
                                        {[
                                            { company: 'JPMorgan Chase', use: '트레이딩 시스템', benefit: '지연시간 30% 감소' },
                                            { company: '카카오뱅크', use: '모바일 뱅킹', benefit: '개발 기간 50% 단축' },
                                            { company: '토스', use: '결제 플랫폼', benefit: '처리량 10배 향상' }
                                        ].map((case_study, index) => (
                                            <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                                                <div className="font-medium text-green-900">{case_study.company}</div>
                                                <div className="text-sm text-green-700">{case_study.use}</div>
                                                <div className="text-xs text-green-600 mt-1">📈 {case_study.benefit}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">E-Commerce</h4>
                                    <div className="space-y-3">
                                        {[
                                            { company: 'Amazon', use: '주문 처리 시스템', benefit: '확장성 무제한' },
                                            { company: '쿠팡', use: '배송 관리', benefit: '실시간 추적 시스템' },
                                            { company: '11번가', use: '상품 검색', benefit: '응답 시간 70% 개선' }
                                        ].map((case_study, index) => (
                                            <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="font-medium text-blue-900">{case_study.company}</div>
                                                <div className="text-sm text-blue-700">{case_study.use}</div>
                                                <div className="text-xs text-blue-600 mt-1">📈 {case_study.benefit}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="⚠️ 도입 시 주요 고려사항">
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <h4 className="font-semibold text-yellow-900 mb-3">기술적 고려사항</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-yellow-800 mb-2">레거시 시스템 통합</h5>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                <li>• 기존 데이터베이스 스키마 호환성</li>
                                                <li>• API 버전 관리 전략</li>
                                                <li>• 점진적 마이그레이션 계획</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-yellow-800 mb-2">팀 역량 개발</h5>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                <li>• Spring 생태계 학습 비용</li>
                                                <li>• 마이크로서비스 아키텍처 이해</li>
                                                <li>• DevOps 문화 정착</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-semibold text-red-900 mb-3">비즈니스 고려사항</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">3-6개월</div>
                                            <div className="text-sm text-red-700">초기 도입 기간</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">20-30%</div>
                                            <div className="text-sm text-red-700">개발 리소스 투입</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-red-600">12개월</div>
                                            <div className="text-sm text-red-700">ROI 실현 기간</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'security':
                return (
                    <div className="space-y-6">
                        <Section title="🛡️ Spring Security 2025 핵심 기능">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">인증 메커니즘</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="font-medium text-blue-900">JWT (JSON Web Token)</h5>
                                            <p className="text-sm text-blue-800 mt-1">
                                                Stateless 인증, 마이크로서비스 간 토큰 전달
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <h5 className="font-medium text-green-900">OAuth 2.1 / OIDC</h5>
                                            <p className="text-sm text-green-800 mt-1">
                                                소셜 로그인, 제3자 인증 서비스 통합
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                            <h5 className="font-medium text-purple-900">SAML 2.0</h5>
                                            <p className="text-sm text-purple-800 mt-1">
                                                기업 환경 SSO, Active Directory 연동
                                            </p>
                                        </div>
                                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                            <h5 className="font-medium text-orange-900">Multi-Factor Authentication</h5>
                                            <p className="text-sm text-orange-800 mt-1">
                                                2FA, TOTP, SMS 인증 통합
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">인가 및 접근 제어</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                                            <h5 className="font-medium text-red-900">Method-Level Security</h5>
                                            <p className="text-sm text-red-800 mt-1">
                                                @PreAuthorize, @PostAuthorize 어노테이션
                                            </p>
                                        </div>
                                        <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                                            <h5 className="font-medium text-indigo-900">RBAC (Role-Based Access)</h5>
                                            <p className="text-sm text-indigo-800 mt-1">
                                                역할 기반 권한 관리, 계층형 권한
                                            </p>
                                        </div>
                                        <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                                            <h5 className="font-medium text-teal-900">ABAC (Attribute-Based)</h5>
                                            <p className="text-sm text-teal-800 mt-1">
                                                속성 기반 동적 권한 제어
                                            </p>
                                        </div>
                                        <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                                            <h5 className="font-medium text-pink-900">Domain Object Security</h5>
                                            <p className="text-sm text-pink-800 mt-1">
                                                엔티티 레벨 접근 제어, ACL
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔐 실전 보안 구현 패턴">
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">JWT 기반 인증 구현</h4>
                                    <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
                                        {`@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> 
                oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())))
            .csrf(csrf -> csrf.disable());
        
        return http.build();
    }
}`}
                                    </pre>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-blue-900 mb-2">Password 정책</h5>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• BCrypt 해싱 (최소 12 rounds)</li>
                                            <li>• 8자 이상, 특수문자 포함</li>
                                            <li>• 계정 잠금 정책 (5회 실패)</li>
                                            <li>• 주기적 패스워드 변경</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h5 className="font-medium text-green-900 mb-2">세션 보안</h5>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>• HttpOnly, Secure 쿠키</li>
                                            <li>• SameSite=Strict 설정</li>
                                            <li>• 세션 타임아웃 관리</li>
                                            <li>• 동시 세션 제한</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔒 HTTPS/TLS 구성">
                            <div className="space-y-4">
                                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-3">Spring Boot TLS 설정</h4>
                                    <div className="bg-white p-3 rounded border">
                                        <pre className="text-sm text-gray-800">
                                            {`# application.yml
server:
  port: 8443
  ssl:
    enabled: true
    key-store: classpath:keystore.p12
    key-store-password: changeit
    key-store-type: PKCS12
    key-alias: spring-boot
    protocols: [TLSv1.3, TLSv1.2]
    ciphers: [TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256]`}
                                        </pre>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                                        <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                                        <h5 className="font-medium text-blue-900">TLS 1.3</h5>
                                        <p className="text-sm text-blue-800">최신 암호화 프로토콜</p>
                                    </div>
                                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                                        <Lock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                                        <h5 className="font-medium text-purple-900">HSTS</h5>
                                        <p className="text-sm text-purple-800">HTTP Strict Transport Security</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg text-center">
                                        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                                        <h5 className="font-medium text-green-900">Certificate Pinning</h5>
                                        <p className="text-sm text-green-800">인증서 고정</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🚨 보안 취약점 대응">
                            <div className="space-y-4">
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-semibold text-red-900 mb-3">OWASP Top 10 대응</h4>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-red-800 mb-2">주입 공격 방어</h5>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                <li>• SQL Injection: Prepared Statement</li>
                                                <li>• XSS: Content Security Policy</li>
                                                <li>• CSRF: Token 기반 방어</li>
                                                <li>• Command Injection: Input Validation</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-red-800 mb-2">데이터 보호</h5>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                <li>• 민감 정보 암호화</li>
                                                <li>• 로그 마스킹</li>
                                                <li>• 데이터베이스 암호화</li>
                                                <li>• 백업 데이터 보안</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-yellow-900 mb-3">보안 헤더 설정</h4>
                                    <div className="bg-white p-3 rounded border">
                                        <pre className="text-sm text-gray-800">
                                            {`@Configuration
public class SecurityHeadersConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) {
        http.headers(headers -> headers
            .frameOptions().deny()
            .contentTypeOptions().and()
            .httpStrictTransportSecurity(hsts -> hsts
                .maxAgeInSeconds(31536000)
                .includeSubdomains(true))
            .and());
        return http.build();
    }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔍 보안 모니터링 & 감사">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">실시간 모니터링</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <h5 className="font-medium text-blue-900">Spring Boot Actuator</h5>
                                            <p className="text-sm text-blue-800 mt-1">
                                                /actuator/health, /metrics 엔드포인트 활용
                                            </p>
                                        </div>
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <h5 className="font-medium text-green-900">Micrometer Metrics</h5>
                                            <p className="text-sm text-green-800 mt-1">
                                                인증 실패, 권한 거부 메트릭 수집
                                            </p>
                                        </div>
                                        <div className="p-3 bg-purple-50 rounded-lg">
                                            <h5 className="font-medium text-purple-900">Custom Security Events</h5>
                                            <p className="text-sm text-purple-800 mt-1">
                                                비정상 접근, 토큰 탈취 시도 탐지
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">감사 로깅</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 bg-orange-50 rounded-lg">
                                            <h5 className="font-medium text-orange-900">Access Logs</h5>
                                            <p className="text-sm text-orange-800 mt-1">
                                                사용자 행동 추적, IP 기반 접근 패턴
                                            </p>
                                        </div>
                                        <div className="p-3 bg-red-50 rounded-lg">
                                            <h5 className="font-medium text-red-900">Security Events</h5>
                                            <p className="text-sm text-red-800 mt-1">
                                                로그인 실패, 권한 변경 등 보안 이벤트
                                            </p>
                                        </div>
                                        <div className="p-3 bg-indigo-50 rounded-lg">
                                            <h5 className="font-medium text-indigo-900">Structured Logging</h5>
                                            <p className="text-sm text-indigo-800 mt-1">
                                                JSON 형태 로그, ELK Stack 연동
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📋 보안 체크리스트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">개발 단계</h4>
                                    <div className="space-y-2">
                                        {[
                                            '입력 데이터 검증 및 sanitization',
                                            'SQL Injection 방어 (Prepared Statement)',
                                            'XSS 방어 (CSP, 출력 인코딩)',
                                            'CSRF 토큰 구현',
                                            '민감 정보 하드코딩 금지',
                                            'Error 정보 노출 방지',
                                            '로깅 시 민감 정보 마스킹'
                                        ].map((item, index) => (
                                            <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                <span className="text-sm text-green-800">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">배포 단계</h4>
                                    <div className="space-y-2">
                                        {[
                                            'HTTPS 강제 적용',
                                            '보안 헤더 설정 (HSTS, CSP)',
                                            '불필요한 HTTP 메소드 비활성화',
                                            'Admin 엔드포인트 접근 제한',
                                            '데이터베이스 연결 암호화',
                                            '정기적인 보안 패치 적용',
                                            '취약점 스캔 및 침투 테스트'
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

            case 'ai':
                return (
                    <div className="space-y-6">
                        <Section title="🤖 Spring AI 1.0 GA - 엔터프라이즈 AI 통합">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200 mb-6">
                                <div className="flex items-start">
                                    <Star className="h-6 w-6 text-purple-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="text-lg font-medium text-purple-800">2025년 5월 Spring AI 1.0 GA 출시</h4>
                                        <p className="text-purple-700 text-sm mt-2">
                                            Java 개발자를 위한 최초의 프로덕션급 AI 통합 프레임워크<br />
                                            POJO 기반 AI 애플리케이션 개발, 포터블 API로 벤더 종속성 해결
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">지원 AI 모델</h4>
                                    <div className="space-y-3">
                                        {aiFeatures.map((feature, index) => (
                                            <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="font-medium text-gray-900">{feature.feature}</h5>
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                        {feature.providers.split(',').length}개 제공업체
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-2">{feature.providers}</p>
                                                <p className="text-xs text-blue-600">🎯 {feature.useCase}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">핵심 아키텍처</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <pre className="text-sm text-gray-800 overflow-x-auto">
                                            {`┌─────────────────────────────────────┐
│        Spring Boot Application      │
│  ┌─────────────────────────────────┐ │
│  │         ChatClient API          │ │
│  │    (Portable Abstraction)       │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │     Auto-Configuration          │ │
│  │  • openai-spring-boot-starter   │ │
│  │  • anthropic-spring-boot-starter│ │
│  │  • ollama-spring-boot-starter   │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │      Vector Stores              │ │
│  │   Redis, Pinecone, Chroma       │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="💻 실전 Spring AI 구현">
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-3">기본 Chat API 구현</h4>
                                    <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                                        {`@RestController
public class ChatController {
    
    private final ChatClient chatClient;
    
    public ChatController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }
    
    @PostMapping("/api/chat")
    public String chat(@RequestBody String message) {
        return chatClient.prompt(message)
                .call()
                .content();
    }
    
    @PostMapping("/api/chat/stream")
    public Flux<String> chatStream(@RequestBody String message) {
        return chatClient.prompt(message)
                .stream()
                .content();
    }
}`}
                                    </pre>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-3">구조화된 출력 (Structured Output)</h4>
                                    <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                                        {`@RestController
public class ProductController {
    
    private final ChatClient chatClient;
    
    @PostMapping("/api/analyze-review")
    public ReviewAnalysis analyzeReview(@RequestBody String review) {
        return chatClient
            .prompt("상품 리뷰를 분석해주세요: " + review)
            .call()
            .entity(ReviewAnalysis.class);
    }
}

record ReviewAnalysis(
    @JsonProperty("sentiment") String sentiment,
    @JsonProperty("rating") int rating,
    @JsonProperty("keywords") List<String> keywords,
    @JsonProperty("summary") String summary
) {}`}
                                    </pre>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-3">RAG (Retrieval-Augmented Generation)</h4>
                                    <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                                        {`@Service
public class DocumentQAService {
    
    private final ChatClient chatClient;
    private final VectorStore vectorStore;
    
    public String askQuestion(String question) {
        // 1. 벡터 검색으로 관련 문서 찾기
        List<Document> similarDocs = vectorStore
            .similaritySearch(SearchRequest.query(question).withTopK(5));
            
        // 2. 검색된 문서를 컨텍스트로 프롬프트 구성
        String context = similarDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n"));
            
        String promptTemplate = """
            다음 문서를 바탕으로 질문에 답변해주세요:
            
            문서 내용:
            {context}
            
            질문: {question}
            
            답변:
            """;
            
        return chatClient
            .prompt(promptTemplate)
            .call()
            .content();
    }
}`}
                                    </pre>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔧 Spring AI 설정">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">의존성 설정</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <pre className="text-sm text-gray-800">
                                            {`<!-- Maven -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-pgvector-store-spring-boot-starter</artifactId>
</dependency>`}
                                        </pre>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">Application Properties</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <pre className="text-sm text-gray-800">
                                            {`# OpenAI 설정
spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4o
spring.ai.openai.chat.options.temperature=0.7

# Vector Store 설정
spring.ai.vectorstore.pgvector.database-name=vectordb
spring.ai.vectorstore.pgvector.host=localhost
spring.ai.vectorstore.pgvector.port=5432`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🎯 실제 활용 사례">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3">고객 서비스 챗봇</h4>
                                    <ul className="text-sm text-blue-800 space-y-2">
                                        <li>• FAQ 자동 응답</li>
                                        <li>• 실시간 문의 처리</li>
                                        <li>• 다국어 지원</li>
                                        <li>• 감정 분석 기반 에스컬레이션</li>
                                    </ul>
                                    <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-700">
                                        💡 응답 시간 80% 단축, 고객 만족도 25% 향상
                                    </div>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-900 mb-3">문서 분석 시스템</h4>
                                    <ul className="text-sm text-green-800 space-y-2">
                                        <li>• 계약서 자동 요약</li>
                                        <li>• 리스크 항목 추출</li>
                                        <li>• 법률 조항 검토</li>
                                        <li>• 번역 및 현지화</li>
                                    </ul>
                                    <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-700">
                                        💡 문서 처리 시간 90% 단축, 정확도 95%
                                    </div>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-3">개인화 추천</h4>
                                    <ul className="text-sm text-purple-800 space-y-2">
                                        <li>• 상품 추천 엔진</li>
                                        <li>• 콘텐츠 큐레이션</li>
                                        <li>• 사용자 행동 분석</li>
                                        <li>• A/B 테스트 자동화</li>
                                    </ul>
                                    <div className="mt-3 p-2 bg-purple-100 rounded text-xs text-purple-700">
                                        💡 클릭률 35% 증가, 매출 20% 상승
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="⚠️ Spring AI 개발 고려사항">
                            <div className="space-y-4">
                                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <h4 className="font-semibold text-yellow-900 mb-3">성능 최적화</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-yellow-800 mb-2">비용 관리</h5>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                <li>• 토큰 사용량 모니터링</li>
                                                <li>• 캐싱 전략 수립</li>
                                                <li>• 프롬프트 최적화</li>
                                                <li>• 모델별 비용 효율성 분석</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-yellow-800 mb-2">응답 속도 개선</h5>
                                            <ul className="text-sm text-yellow-700 space-y-1">
                                                <li>• 스트리밍 응답 활용</li>
                                                <li>• 비동기 처리 구현</li>
                                                <li>• 연결 풀 관리</li>
                                                <li>• 타임아웃 설정 최적화</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <h4 className="font-semibold text-red-900 mb-3">보안 및 개인정보</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-red-800 mb-2">데이터 보호</h5>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                <li>• 민감정보 마스킹</li>
                                                <li>• 데이터 암호화 전송</li>
                                                <li>• 로컬 모델 활용 검토</li>
                                                <li>• 개인정보 처리방침 준수</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-red-800 mb-2">AI 윤리</h5>
                                            <ul className="text-sm text-red-700 space-y-1">
                                                <li>• 편향성 모니터링</li>
                                                <li>• 답변 품질 검증</li>
                                                <li>• 할루시네이션 방지</li>
                                                <li>• 투명성 및 설명가능성</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3">프로덕션 체크리스트</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-blue-900">모니터링</div>
                                            <div className="text-xs text-blue-700">메트릭, 로깅</div>
                                        </div>
                                        <div className="text-center">
                                            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-green-900">테스팅</div>
                                            <div className="text-xs text-green-700">통합, E2E 테스트</div>
                                        </div>
                                        <div className="text-center">
                                            <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-purple-900">스케일링</div>
                                            <div className="text-xs text-purple-700">로드밸런싱</div>
                                        </div>
                                        <div className="text-center">
                                            <CheckCircle className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                                            <div className="text-sm font-medium text-orange-900">장애 대응</div>
                                            <div className="text-xs text-orange-700">Circuit Breaker</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'resources':
                return (
                    <div className="space-y-6">
                        <Section title="📚 공식 문서 및 가이드">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">핵심 문서</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'Spring Boot Reference Documentation', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/', desc: '공식 레퍼런스, 모든 기능 상세 설명' },
                                            { title: 'Spring Framework Documentation', url: 'https://docs.spring.io/spring-framework/docs/current/reference/html/', desc: 'Core Spring 개념, DI/IoC, AOP' },
                                            { title: 'Spring Guides', url: 'https://spring.io/guides', desc: '단계별 튜토리얼, Getting Started' },
                                            { title: 'Spring Boot Starters', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/using.html#using.build-systems.starters', desc: 'Starter 의존성 완전 가이드' }
                                        ].map((doc, index) => (
                                            <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                                                <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-blue-900">{doc.title}</div>
                                                    <div className="text-sm text-blue-700">{doc.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">Spring AI & 최신 기술</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'Spring AI Reference', url: 'https://docs.spring.io/spring-ai/reference/', desc: 'AI 모델 통합, Vector Store 설정' },
                                            { title: 'GraalVM Native Image', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/native-image.html', desc: '네이티브 이미지 빌드 가이드' },
                                            { title: 'Spring Security OAuth2', url: 'https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html', desc: 'OAuth2, JWT, OIDC 구현' },
                                            { title: 'Spring Cloud', url: 'https://spring.io/projects/spring-cloud', desc: '마이크로서비스, 서비스 디스커버리' }
                                        ].map((doc, index) => (
                                            <div key={index} className="flex items-start p-3 bg-purple-50 rounded-lg">
                                                <Star className="h-4 w-4 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-purple-900">{doc.title}</div>
                                                    <div className="text-sm text-purple-700">{doc.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🎓 학습 플랫폼 & 강의">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">온라인 강의</h4>
                                    <div className="space-y-3">
                                        {[
                                            { platform: 'Spring Academy', desc: 'VMware 공식 교육', level: 'All Levels' },
                                            { platform: 'Baeldung', desc: '실무 중심 튜토리얼', level: 'Intermediate' },
                                            { platform: 'Udemy', desc: '종합 Spring Boot 코스', level: 'Beginner' },
                                            { platform: 'Pluralsight', desc: '엔터프라이즈 중심', level: 'Advanced' }
                                        ].map((course, index) => (
                                            <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                                <div className="font-medium text-gray-900">{course.platform}</div>
                                                <div className="text-sm text-gray-600 mt-1">{course.desc}</div>
                                                <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                        course.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                                                            'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {course.level}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">실습 프로젝트</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Spring PetClinic', desc: '샘플 웹 애플리케이션', github: 'spring-projects/spring-petclinic' },
                                            { name: 'Spring Boot Examples', desc: '다양한 예제 모음', github: 'spring-projects/spring-boot/tree/main/spring-boot-samples' },
                                            { name: 'Spring Security Samples', desc: '보안 구현 예제', github: 'spring-projects/spring-security-samples' },
                                            { name: 'Spring AI Examples', desc: 'AI 통합 예제', github: 'spring-projects/spring-ai/tree/main/spring-ai-examples' }
                                        ].map((project, index) => (
                                            <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                                <div className="font-medium text-gray-900">{project.name}</div>
                                                <div className="text-sm text-gray-600 mt-1">{project.desc}</div>
                                                <div className="text-xs text-blue-600 mt-2 font-mono">{project.github}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">커뮤니티</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Spring Community', members: '100만+', desc: '공식 커뮤니티 포럼' },
                                            { name: 'Stack Overflow', members: '50만+', desc: 'spring-boot 태그' },
                                            { name: 'Reddit r/springframework', members: '15만+', desc: '개발자 토론' },
                                            { name: 'Spring Discord', members: '10만+', desc: '실시간 채팅' }
                                        ].map((community, index) => (
                                            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <Users className="h-5 w-5 text-green-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-green-900">{community.name}</div>
                                                    <div className="text-sm text-green-700">
                                                        {community.members} • {community.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📖 추천 도서">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">한국어 도서</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <h5 className="font-semibold text-blue-900">스프링 부트 실전 활용 마스터</h5>
                                            <p className="text-sm text-blue-700 mt-1">저자: 그렉 턴키스트</p>
                                            <p className="text-xs text-blue-600 mt-2">Spring Boot 2.x/3.x 완전 정복, 실무 예제 중심</p>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <h5 className="font-semibold text-green-900">스프링 마이크로서비스</h5>
                                            <p className="text-sm text-green-700 mt-1">저자: 마그누스 라슨</p>
                                            <p className="text-xs text-green-600 mt-2">Spring Cloud를 활용한 마이크로서비스 아키텍처</p>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <h5 className="font-semibold text-purple-900">스프링 시큐리티 인 액션</h5>
                                            <p className="text-sm text-purple-700 mt-1">저자: 라우렌티우 스필카</p>
                                            <p className="text-xs text-purple-600 mt-2">Spring Security 완전 가이드, OAuth2/JWT</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">영문 도서</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                            <h5 className="font-semibold text-orange-900">Spring Boot in Action</h5>
                                            <p className="text-sm text-orange-700 mt-1">Author: Craig Walls</p>
                                            <p className="text-xs text-orange-600 mt-2">Spring Boot 기초부터 고급까지, 검증된 베스트셀러</p>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                            <h5 className="font-semibold text-red-900">Cloud Native Spring in Action</h5>
                                            <p className="text-sm text-red-700 mt-1">Author: Thomas Vitale</p>
                                            <p className="text-xs text-red-600 mt-2">클라우드 네이티브 애플리케이션 개발 가이드</p>
                                        </div>
                                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                            <h5 className="font-semibold text-indigo-900">Spring Security in Action</h5>
                                            <p className="text-sm text-indigo-700 mt-1">Author: Laurentiu Spilca</p>
                                            <p className="text-xs text-indigo-600 mt-2">보안 구현 실전 가이드, 최신 보안 패턴</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🛠️ 개발 도구 & IDE">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">추천 IDE</h4>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                                                    <span className="text-white text-xs font-bold">IJ</span>
                                                </div>
                                                <h5 className="font-semibold text-blue-900">IntelliJ IDEA</h5>
                                            </div>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Spring Boot 통합 지원</li>
                                                <li>• 자동 완성 및 리팩토링</li>
                                                <li>• HTTP Client 내장</li>
                                                <li>• Database 도구 통합</li>
                                            </ul>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex items-center mb-2">
                                                <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center mr-3">
                                                    <span className="text-white text-xs font-bold">VS</span>
                                                </div>
                                                <h5 className="font-semibold text-green-900">Visual Studio Code</h5>
                                            </div>
                                            <ul className="text-sm text-green-800 space-y-1">
                                                <li>• Extension Pack for Java</li>
                                                <li>• Spring Boot Tools</li>
                                                <li>• Lightweight & Fast</li>
                                                <li>• Remote Development</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">필수 플러그인/확장</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Spring Boot DevTools', desc: '자동 재시작, LiveReload' },
                                            { name: 'Lombok', desc: 'Boilerplate 코드 제거' },
                                            { name: 'JPA Buddy', desc: 'JPA 엔티티 관리' },
                                            { name: 'SonarLint', desc: '코드 품질 검사' },
                                            { name: 'Docker', desc: '컨테이너 개발 환경' },
                                            { name: 'Postman/Insomnia', desc: 'API 테스트 도구' }
                                        ].map((tool, index) => (
                                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{tool.name}</div>
                                                    <div className="text-sm text-gray-600">{tool.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🎯 실습 환경 구성">
                            <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-900 mb-3">로컬 개발 환경</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="font-medium text-green-800 mb-2">필수 설치</h5>
                                            <ul className="text-sm text-green-700 space-y-1">
                                                <li>• ☕ JDK 17+ (OpenJDK/Oracle JDK)</li>
                                                <li>• 🔨 Maven 3.6+ 또는 Gradle 7+</li>
                                                <li>• 🐘 PostgreSQL 14+ (또는 MySQL)</li>
                                                <li>• 🗄️ Redis 6+ (캐싱/세션)</li>
                                                <li>• 🐳 Docker Desktop</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-green-800 mb-2">선택 설치</h5>
                                            <ul className="text-sm text-green-700 space-y-1">
                                                <li>• 📊 Elasticsearch (검색)</li>
                                                <li>• 🔄 Apache Kafka (메시징)</li>
                                                <li>• 📈 Grafana + Prometheus</li>
                                                <li>• 🌐 Node.js (프론트엔드)</li>
                                                <li>• ☸️ Kubernetes (k3s/minikube)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-gray-900 mb-3">Docker Compose 개발 환경</h4>
                                    <pre className="text-sm bg-white p-4 rounded border overflow-x-auto">
                                        {`version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: springboot_db
      POSTGRES_USER: developer
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  elasticsearch:
    image: elasticsearch:8.8.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"

volumes:
  postgres_data:`}
                                    </pre>
                                </div>

                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-gray-900 mb-3">클라우드 실습 환경</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-purple-900">Heroku</div>
                                            <div className="text-sm text-purple-700">무료 배포 환경</div>
                                            <div className="text-xs text-purple-600 mt-1">Git 연동 자동 배포</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-blue-900">Railway</div>
                                            <div className="text-sm text-blue-700">간편한 클라우드</div>
                                            <div className="text-xs text-blue-600 mt-1">데이터베이스 포함</div>
                                        </div>
                                        <div className="text-center p-3 bg-white rounded">
                                            <div className="font-medium text-green-900">Google Cloud</div>
                                            <div className="text-sm text-green-700">$300 크레딧</div>
                                            <div className="text-xs text-green-600 mt-1">GKE, Cloud SQL</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="⚠️ 주의사항 및 면책조항">
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div className="flex items-start">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
                                    <div className="text-sm text-yellow-800">
                                        <p className="mb-2">
                                            이 로드맵은 2025년 최신 정보를 바탕으로 작성되었으며,
                                            개인의 학습 속도와 경험에 따라 결과가 달라질 수 있습니다.
                                        </p>
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>버전 정보는 지속적으로 업데이트되므로 공식 문서 확인 필요</li>
                                            <li>실무 프로젝트 적용 전 충분한 테스트와 검증 권장</li>
                                            <li>보안 관련 설정은 최신 가이드라인 준수</li>
                                            <li>라이선스 및 사용 조건 확인 후 활용</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Coffee className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Spring Boot 완전 매뉴얼 2025</h1>
                                <p className="text-sm text-gray-500">핵심 생태계부터 AI 통합까지 - 12주 마스터 로드맵</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Spring Boot 3.5</span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Spring AI 1.0</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2025 Latest</span>
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
                                            type="button"
                                            onClick={() => setActiveSection(section.id)}
                                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === section.id
                                                ? 'bg-green-100 text-green-700'
                                                : 'text-gray-600'
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
                            Spring Boot 3.5, Spring AI 1.0, GraalVM Native Image 등 2025년 최신 기술을 반영하여 작성되었습니다.
                        </p>
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
                            <span>• Spring Boot 3.5.0</span>
                            <span>• Spring AI 1.0 GA</span>
                            <span>• Java 21 LTS</span>
                            <span>• GraalVM Native</span>
                            <span>• Spring Security 6.5</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-xs text-gray-400">
                                ⚡ 12주 완주 시 엔터프라이즈급 Spring Boot 개발자로 성장하세요!
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SpringBootManual;
