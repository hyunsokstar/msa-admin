// C:\Users\terec\msa-admin\src\app\pilot-project\roadmap-for-voip\page.tsx

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, Shield, Server, Users, Phone, Database, Network, Globe, Clock, BookOpen, ExternalLink, Star, Zap, Lock, Trophy, AlertCircle, Info } from 'lucide-react';

const VoIPRoadmapManual = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpanded = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const sections = [
        { id: 'overview', title: '개요', icon: BookOpen },
        { id: 'market', title: '시장 동향', icon: TrendingUp },
        { id: 'architecture', title: '아키텍처', icon: Server },
        { id: 'roadmap', title: '12주 로드맵', icon: Clock },
        { id: 'performance', title: '성능 벤치마크', icon: Zap },
        { id: 'security', title: '보안 모범사례', icon: Shield },
        { id: 'cases', title: '기업 사례', icon: Trophy },
        { id: 'references', title: '참고 자료', icon: ExternalLink }
    ];

    const performanceData = [
        { metric: '동시콜 처리', freeswitch: '2,000+', asterisk: '1,200', kamailio: 'Proxy only' },
        { metric: 'CPS (Calls Per Second)', freeswitch: '100+', asterisk: '50', kamailio: '수만+' },
        { metric: '메모리 사용량', freeswitch: '중간', asterisk: '높음', kamailio: '낮음' },
        { metric: '확장성', freeswitch: '우수', asterisk: '보통', kamailio: '탁월' },
        { metric: '구성 복잡도', freeswitch: '중간', asterisk: '높음', kamailio: '높음' }
    ];

    const securityThreats = [
        { threat: 'Caller ID Spoofing', impact: '높음', solution: 'STIR/SHAKEN 구현' },
        { threat: 'VoIP Eavesdropping', impact: '높음', solution: 'SRTP/TLS 암호화' },
        { threat: 'DoS/DDoS 공격', impact: '중간', solution: 'Rate Limiting, Firewall' },
        { threat: 'Toll Fraud', impact: '높음', solution: '인증 강화, 모니터링' },
        { threat: 'Vishing', impact: '중간', solution: '직원 교육, 검증 절차' }
    ];

    const techStack = [
        { category: '시그널링 서버', tech: 'Kamailio', description: 'SIP 프록시/레지스트라', scale: '100,000+ 동시 등록' },
        { category: '미디어 서버', tech: 'FreeSWITCH', description: '미디어 처리, 녹취, TTS/STT', scale: '2,000+ 동시콜' },
        { category: '로드밸런서', tech: 'HAProxy', description: 'SIP 트래픽 분산', scale: '고가용성 지원' },
        { category: '세션 관리', tech: 'Redis Cluster', description: '상태 캐싱, 이벤트 버스', scale: '수백만 세션' },
        { category: '데이터베이스', tech: 'PostgreSQL', description: '사용자, 로그, 통계', scale: 'Primary/Replica' },
        { category: 'API 서버', tech: 'Spring Boot', description: '관리 API, 제어 로직', scale: '마이크로서비스' }
    ];

    const enterpriseProviders = [
        { name: 'RingCentral', marketShare: '23%', features: 'UCaaS, Contact Center', pricing: '$20-45/월' },
        { name: 'Microsoft Teams', marketShare: '18%', features: 'Unified Communications', pricing: '$4-22/월' },
        { name: 'Cisco Webex', marketShare: '15%', features: 'Enterprise VoIP', pricing: '$13.50-25/월' },
        { name: 'Zoom Phone', marketShare: '12%', features: 'Cloud PBX', pricing: '$10-20/월' },
        { name: '8x8', marketShare: '8%', features: 'Contact Center', pricing: '$12-24/월' }
    ];

    const roadmapWeeks = [
        { week: '1-2주', title: '기술 선정 및 아키텍처', tasks: ['트래픽 예측', '서버 스펙 설계', 'Kamailio 클러스터 구성'] },
        { week: '3-4주', title: 'FreeSWITCH 구성', tasks: ['다중 인스턴스 설정', 'RTP/ESL 구성', 'Kamailio 연동'] },
        { week: '5-6주', title: '인증 및 WebRTC', tasks: ['Spring Boot API', 'JWT 인증', 'TURN/STUN 서버'] },
        { week: '7-8주', title: '콜 처리 구현', tasks: ['Inbound/Outbound', '상담원 UI', '실시간 상태'] },
        { week: '9-10주', title: '녹취 및 모니터링', tasks: ['통화 녹취', '통계 처리', 'Grafana 구성'] },
        { week: '11-12주', title: '부하테스트 및 배포', tasks: ['SIPp 테스트', 'HA 구성', '운영 배포'] }
    ];

    const caseStudies = [
        {
            company: 'Daktela',
            industry: 'Contact Center',
            solution: 'Kamailio + FreeSWITCH',
            scale: '옴니채널 클라우드 솔루션',
            benefits: 'robust gateway, resilient connections'
        },
        {
            company: '2600Hz (Kazoo)',
            industry: 'Telecom Platform',
            solution: 'Kamailio + FreeSWITCH + AMQP',
            scale: 'Carrier-grade VoIP',
            benefits: 'Registration handling, Presence/BLF'
        },
        {
            company: 'LocalMail',
            industry: 'Business Phone',
            solution: 'Cloud-based VoIP',
            scale: '글로벌 팀 지원',
            benefits: 'AI-powered calling, video meetings'
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
                        <Section title="🎯 프로젝트 목표">
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Info className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h4 className="text-lg font-medium text-blue-800">동시콜 1000-2000명 수준의 중대형 콜센터 구축</h4>
                                        <p className="text-blue-700 mt-2">
                                            오픈소스 기반으로 비용 0원, 확장성 100%, 성능 보장을 목표로 하는
                                            텔레콤급 콜센터 플랫폼을 구축합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🏗️ 핵심 아키텍처">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {techStack.map((item, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                                        <h4 className="font-medium text-gray-900">{item.category}</h4>
                                        <p className="text-blue-600 font-semibold">{item.tech}</p>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        <p className="text-xs text-green-600 font-medium mt-2">{item.scale}</p>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="⚡ 주요 특징">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                        기술적 장점
                                    </h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• 완전 오픈소스 기반 (라이선스 비용 0원)</li>
                                        <li>• 수평 확장 가능한 마이크로서비스 아키텍처</li>
                                        <li>• 클러스터링을 통한 고가용성 보장</li>
                                        <li>• WebRTC 지원으로 브라우저 직접 연결</li>
                                        <li>• 실시간 모니터링 및 장애 대응</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                        <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
                                        비즈니스 이점
                                    </h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• 초기 투자비용 최소화</li>
                                        <li>• 필요에 따른 유연한 확장</li>
                                        <li>• 완전한 기술 통제권 확보</li>
                                        <li>• 커스터마이징 자유도 100%</li>
                                        <li>• 글로벌 기업 수준의 안정성</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'market':
                return (
                    <div className="space-y-6">
                        <Section title="📊 VoIP 시장 현황 2025">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">시장 규모 및 성장률</h4>
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600">$63.73B</div>
                                        <div className="text-sm text-gray-600">2031년 예상 시장 규모</div>
                                        <div className="mt-2">
                                            <span className="text-green-600 font-medium">+9.9% CAGR</span>
                                            <span className="text-gray-500 text-sm ml-2">(2024-2031)</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">주요 시장 동향</h4>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>• AI 기반 통화 분석 및 품질 평가 확산</li>
                                        <li>• WebRTC 기술로 브라우저 기반 솔루션 증가</li>
                                        <li>• STIR/SHAKEN 보안 표준 의무화</li>
                                        <li>• 클라우드 네이티브 아키텍처로의 전환</li>
                                        <li>• 옴니채널 고객 경험 통합</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                        <Section title="🏢 주요 엔터프라이즈 VoIP 업체">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">업체</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시장점유율</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주요 기능</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격대</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {enterpriseProviders.map((provider, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{provider.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.marketShare}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.features}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{provider.pricing}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <Section title="🔮 2025년 핵심 트렌드">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                    <h4 className="font-medium text-purple-900">AI 통합</h4>
                                    <p className="text-sm text-purple-700 mt-2">실시간 통화 분석, 감정 인식, 자동 요약</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                    <h4 className="font-medium text-green-900">보안 강화</h4>
                                    <p className="text-sm text-green-700 mt-2">STIR/SHAKEN, 제로트러스트, 엔드투엔드 암호화</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-900">클라우드 네이티브</h4>
                                    <p className="text-sm text-blue-700 mt-2">컨테이너화, 마이크로서비스, 자동 스케일링</p>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'architecture':
                return (
                    <div className="space-y-6">
                        <Section title="🏗️ 중대형 콜센터용 고급 아키텍처">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <pre className="text-sm text-gray-800 overflow-x-auto">
                                    {`┌─────────────────────────────────────────────────────────┐
│              인터넷 / PSTN / SIP 트렁크                    │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│                HAProxy / DNS SRV                        │
│            (로드밸런서 + 고가용성)                         │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│              Kamailio Cluster                           │
│        (SIP Proxy/Registrar/Dispatcher)                │
│     - TLS/SRTP 보안  - NAT Traversal                    │
│     - STIR/SHAKEN   - 로드밸런싱                         │
└─────────┬─────────────────────┬─────────────────────────┘
          │                     │
          │                     │
┌─────────▼───────┐    ┌────────▼──────────────────────────┐
│   STUN/TURN     │    │      FreeSWITCH Cluster           │
│     서버        │    │   (미디어 서버 - 다중 인스턴스)      │
│  (WebRTC NAT)   │    │  - 녹취/TTS/STT  - 콜 큐          │
└─────────────────┘    │  - 컨퍼런스     - IVR             │
                       └────────┬──────────────────────────┘
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
    ┌─────────▼─────────┐ ┌─────▼─────┐ ┌────────▼────────┐
    │   Redis Cluster   │ │ PostgreSQL│ │  Spring Boot    │
    │  (세션 관리,      │ │(사용자/로그)│ │   API 서버      │
    │   이벤트 버스)    │ │           │ │ (관리/제어 API) │
    └───────────────────┘ └───────────┘ └─────────────────┘
                                │
                      ┌─────────▼─────────┐
                      │   React UI        │
                      │ (상담원/관리자)    │
                      │ - 실시간 대시보드  │
                      │ - 통화 제어       │
                      └───────────────────┘`}
                                </pre>
                            </div>
                        </Section>

                        <Section title="🔧 컴포넌트별 상세 구성">
                            <div className="space-y-4">
                                {[
                                    {
                                        title: 'Kamailio 클러스터',
                                        items: ['Dispatcher 모드로 FreeSWITCH 로드밸런싱', 'TLS/SRTP 암호화 지원', 'STIR/SHAKEN 구현', 'DoS/DDoS 공격 방어']
                                    },
                                    {
                                        title: 'FreeSWITCH 멀티 인스턴스',
                                        items: ['인스턴스당 300-500 동시콜 처리', 'ESL(Event Socket Library) 제어', '실시간 녹취 및 저장', 'G.711/G.722/Opus 코덱 지원']
                                    },
                                    {
                                        title: 'Redis 클러스터',
                                        items: ['세션 상태 공유', 'Pub/Sub 이벤트 버스', '실시간 상담원 상태 관리', '통화 통계 실시간 수집']
                                    },
                                    {
                                        title: '모니터링 스택',
                                        items: ['Prometheus: 메트릭 수집', 'Grafana: 시각화 대시보드', 'Loki: 로그 집계', 'sngrep: SIP 트래픽 분석']
                                    }
                                ].map((component, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">{component.title}</h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {component.items.map((item, i) => (
                                                <li key={i} className="flex items-center text-sm text-gray-600">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📈 확장성 설계 고려사항">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">동시콜 1000-2000명 처리 설계</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                            <span className="text-gray-700">FreeSWITCH 인스턴스</span>
                                            <span className="font-semibold text-blue-600">5-10대</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                            <span className="text-gray-700">Kamailio 노드</span>
                                            <span className="font-semibold text-green-600">2-3대 (HA)</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                                            <span className="text-gray-700">Redis 클러스터</span>
                                            <span className="font-semibold text-purple-600">3-5 노드</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                            <span className="text-gray-700">예상 네트워크 대역폭</span>
                                            <span className="font-semibold text-yellow-600">200-500 Mbps</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">하드웨어 권장 사양</h4>
                                    <div className="space-y-3">
                                        <div className="p-3 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">FreeSWITCH 서버</div>
                                            <div className="text-sm text-gray-600 mt-1">CPU: 16-32 코어, RAM: 32-64GB, SSD: 500GB+</div>
                                        </div>
                                        <div className="p-3 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">Kamailio 서버</div>
                                            <div className="text-sm text-gray-600 mt-1">CPU: 8-16 코어, RAM: 16-32GB, SSD: 200GB+</div>
                                        </div>
                                        <div className="p-3 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">데이터베이스 서버</div>
                                            <div className="text-sm text-gray-600 mt-1">CPU: 16+ 코어, RAM: 64GB+, NVMe SSD: 1TB+</div>
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
                        <Section title="🚀 12주 고속 로드맵 (중대형 스케일 대응)">
                            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-start">
                                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium text-amber-800">주의사항</h4>
                                        <p className="text-amber-700 text-sm mt-1">
                                            이 로드맵은 동시콜 1000-2000명 수준의 엔터프라이즈급 콜센터 구축을 목표로 합니다.
                                            각 단계별로 충분한 테스트와 검증이 필요합니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {roadmapWeeks.map((phase, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-3">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mr-3">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{phase.week}</h4>
                                                        <p className="text-gray-600 text-sm">{phase.title}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-11">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        {phase.tasks.map((task, taskIndex) => (
                                                            <div key={taskIndex} className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                                                {task}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="🎯 상세 구현 단계">
                            <div className="space-y-6">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('phase1')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">Phase 1: 기반 인프라 (1-4주)</h4>
                                        {expandedItems.phase1 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems.phase1 && (
                                        <div className="mt-4 space-y-3">
                                            <div className="bg-blue-50 p-3 rounded">
                                                <h5 className="font-medium">1주차: 아키텍처 설계</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• 트래픽 예측 및 용량 계획</li>
                                                    <li>• 네트워크 토폴로지 설계</li>
                                                    <li>• 보안 정책 수립</li>
                                                    <li>• 하드웨어/클라우드 리소스 준비</li>
                                                </ul>
                                            </div>
                                            <div className="bg-green-50 p-3 rounded">
                                                <h5 className="font-medium">2주차: Kamailio 클러스터 구성</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• Dispatcher 모드 설정</li>
                                                    <li>• TLS/SRTP 암호화 구성</li>
                                                    <li>• DNS SRV 레코드 설정</li>
                                                    <li>• 로드밸런싱 알고리즘 선택</li>
                                                </ul>
                                            </div>
                                            <div className="bg-purple-50 p-3 rounded">
                                                <h5 className="font-medium">3-4주차: FreeSWITCH 설정</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• 멀티 인스턴스 배포</li>
                                                    <li>• ESL 인터페이스 구성</li>
                                                    <li>• 코덱 최적화</li>
                                                    <li>• 기본 dialplan 작성</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('phase2')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">Phase 2: 인증 및 연결 (5-8주)</h4>
                                        {expandedItems.phase2 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems.phase2 && (
                                        <div className="mt-4 space-y-3">
                                            <div className="bg-yellow-50 p-3 rounded">
                                                <h5 className="font-medium">5-6주차: 인증 시스템</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• Spring Boot 기반 API 서버 구축</li>
                                                    <li>• JWT 토큰 기반 인증</li>
                                                    <li>• PostgreSQL 데이터베이스 연동</li>
                                                    <li>• STUN/TURN 서버 설정</li>
                                                </ul>
                                            </div>
                                            <div className="bg-red-50 p-3 rounded">
                                                <h5 className="font-medium">7-8주차: WebRTC 및 콜 처리</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• sip.js 기반 WebRTC 클라이언트</li>
                                                    <li>• NAT Traversal 구성</li>
                                                    <li>• Inbound/Outbound 콜 라우팅</li>
                                                    <li>• 실시간 상담원 상태 관리</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border border-gray-200 rounded-lg p-4">
                                    <button
                                        onClick={() => toggleExpanded('phase3')}
                                        className="flex items-center justify-between w-full text-left"
                                    >
                                        <h4 className="font-semibold text-gray-900">Phase 3: 고급 기능 및 배포 (9-12주)</h4>
                                        {expandedItems.phase3 ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                                    </button>
                                    {expandedItems.phase3 && (
                                        <div className="mt-4 space-y-3">
                                            <div className="bg-indigo-50 p-3 rounded">
                                                <h5 className="font-medium">9-10주차: 녹취 및 모니터링</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• 통화 녹취 시스템 구축</li>
                                                    <li>• Prometheus + Grafana 모니터링</li>
                                                    <li>• 실시간 통계 대시보드</li>
                                                    <li>• 알람 및 장애 대응 시스템</li>
                                                </ul>
                                            </div>
                                            <div className="bg-orange-50 p-3 rounded">
                                                <h5 className="font-medium">11-12주차: 부하테스트 및 운영</h5>
                                                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                                                    <li>• SIPp 기반 부하 테스트</li>
                                                    <li>• 고가용성 구성 검증</li>
                                                    <li>• 운영 매뉴얼 작성</li>
                                                    <li>• 프로덕션 배포</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'performance':
                return (
                    <div className="space-y-6">
                        <Section title="⚡ 성능 벤치마크 비교">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">성능 지표</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FreeSWITCH</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asterisk</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kamailio</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {performanceData.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.metric}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{item.freeswitch}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.asterisk}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600">{item.kamailio}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <Section title="📊 실제 성능 데이터">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">FreeSWITCH 성능 실측</h4>
                                    <div className="space-y-3">
                                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">최대 동시콜</span>
                                                <span className="text-2xl font-bold text-green-600">2,000+</span>
                                            </div>
                                            <p className="text-sm text-green-700 mt-1">8-core Intel Xeon, 16GB RAM 기준</p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">CPS (Calls/sec)</span>
                                                <span className="text-2xl font-bold text-blue-600">50-100</span>
                                            </div>
                                            <p className="text-sm text-blue-700 mt-1">안정적인 호 설정 성능</p>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">평균 지연시간</span>
                                                <span className="text-2xl font-bold text-purple-600">&lt; 50ms</span>
                                            </div>
                                            <p className="text-sm text-purple-700 mt-1">RTP 미디어 처리 지연</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">네트워크 대역폭 계산</h4>
                                    <div className="space-y-3">
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">G.711 코덱 (64kbps)</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                • 1000 동시콜: ~80 Mbps<br />
                                                • 2000 동시콜: ~160 Mbps
                                            </div>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">G.722 코덱 (64kbps)</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                • 1000 동시콜: ~80 Mbps<br />
                                                • 2000 동시콜: ~160 Mbps
                                            </div>
                                        </div>
                                        <div className="p-4 border border-gray-200 rounded-lg">
                                            <div className="font-medium text-gray-900">Opus 코덱 (32kbps)</div>
                                            <div className="text-sm text-gray-600 mt-1">
                                                • 1000 동시콜: ~40 Mbps<br />
                                                • 2000 동시콜: ~80 Mbps
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔧 성능 최적화 팁">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Server className="h-5 w-5 text-blue-500 mr-2" />
                                        시스템 레벨 최적화
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• SQLite DB를 tmpfs(메모리)로 이동</li>
                                        <li>• 로그 레벨을 WARNING 이상으로 제한</li>
                                        <li>• ulimit 설정 최적화 (nofile: 999999)</li>
                                        <li>• tcmalloc 또는 jemalloc 사용</li>
                                        <li>• SSD 사용 및 I/O 스케줄러 최적화</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Network className="h-5 w-5 text-green-500 mr-2" />
                                        네트워크 최적화
                                    </h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li>• bypass_media 모드 적극 활용</li>
                                        <li>• 불필요한 트랜스코딩 방지</li>
                                        <li>• late_negotiation 활성화</li>
                                        <li>• RTP 패킷 크기 최적화</li>
                                        <li>• 네트워크 인터럽트 처리 분산</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>

                        <Section title="📈 스케일링 전략">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">수직 확장 (Scale Up)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">500</div>
                                            <div className="text-sm text-gray-600">동시콜 / 인스턴스</div>
                                            <div className="text-xs text-gray-500">8-core, 16GB RAM</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">1,000</div>
                                            <div className="text-sm text-gray-600">동시콜 / 인스턴스</div>
                                            <div className="text-xs text-gray-500">16-core, 32GB RAM</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600">2,000</div>
                                            <div className="text-sm text-gray-600">동시콜 / 인스턴스</div>
                                            <div className="text-xs text-gray-500">32-core, 64GB RAM</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                                    <h4 className="font-semibold text-gray-900 mb-3">수평 확장 (Scale Out)</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                                            <span>2-3 FreeSWITCH 인스턴스</span>
                                            <span className="font-semibold text-green-600">1,000-1,500 동시콜</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                                            <span>5-6 FreeSWITCH 인스턴스</span>
                                            <span className="font-semibold text-green-600">2,500-3,000 동시콜</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded border">
                                            <span>10+ FreeSWITCH 인스턴스</span>
                                            <span className="font-semibold text-green-600">5,000+ 동시콜</span>
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
                        <Section title="🛡️ VoIP 보안 위협 분석 2025">
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-start">
                                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />
                                    <div>
                                        <h4 className="font-medium text-red-800">사이버 보안 현황</h4>
                                        <p className="text-red-700 text-sm mt-1">
                                            2025년 글로벌 사이버 범죄 손실 예상액: <strong>$10.5조</strong><br />
                                            VoIP 시스템은 인터넷 기반으로 다양한 보안 위협에 노출됩니다.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보안 위협</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위험도</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">대응 방안</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {securityThreats.map((threat, index) => (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{threat.threat}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${threat.impact === '높음' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {threat.impact}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{threat.solution}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Section>

                        <Section title="🔐 STIR/SHAKEN 2025 최신 규정">
                            <div className="space-y-4">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-2">2025년 6월 20일 새로운 규정</h4>
                                    <ul className="space-y-2 text-blue-800 text-sm">
                                        <li>• <strong>Provider-Owned Certificates Only:</strong> 제3자 인증서 사용 금지</li>
                                        <li>• <strong>Independent Attestation:</strong> 각 사업자가 독립적으로 통화 인증 결정</li>
                                        <li>• <strong>Robocall Mitigation Plan 업데이트 의무:</strong> FCC 데이터베이스 정보 갱신</li>
                                    </ul>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h5 className="font-medium text-gray-900 mb-2">STIR (Secure Telephony Identity Revisited)</h5>
                                        <p className="text-sm text-gray-600">발신자 정보를 디지털 서명으로 인증하는 프로토콜</p>
                                    </div>
                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h5 className="font-medium text-gray-900 mb-2">SHAKEN (Signature-based Handling of Asserted Information Using toKENs)</h5>
                                        <p className="text-sm text-gray-600">SIP 네트워크에서 STIR 구현을 위한 프레임워크</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🔒 보안 구현 체크리스트">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Lock className="h-5 w-5 text-red-500 mr-2" />
                                        필수 보안 설정
                                    </h4>
                                    <div className="space-y-3">
                                        {[
                                            { item: 'TLS 1.3 암호화', status: true },
                                            { item: 'SRTP 미디어 암호화', status: true },
                                            { item: 'STIR/SHAKEN 구현', status: true },
                                            { item: '강력한 패스워드 정책', status: true },
                                            { item: '다중 인증 (MFA)', status: true },
                                            { item: 'IP 화이트리스트', status: true },
                                            { item: 'Fail2ban 침입 탐지', status: true },
                                            { item: '정기 보안 업데이트', status: true }
                                        ].map((check, index) => (
                                            <div key={index} className="flex items-center">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-3" />
                                                <span className="text-sm text-gray-700">{check.item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                                        <Shield className="h-5 w-5 text-blue-500 mr-2" />
                                        고급 보안 기능
                                    </h4>
                                    <div className="space-y-3">
                                        {[
                                            'WebRTC DTLS-SRTP',
                                            'SIP over TLS (SIPS)',
                                            'RTP/SRTP 키 순환',
                                            '실시간 침입 탐지 시스템',
                                            'AI 기반 이상 행동 탐지',
                                            'VPN 터널링',
                                            '지리적 접근 제한',
                                            '통화 기록 암호화 저장'
                                        ].map((feature, index) => (
                                            <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                                                <Star className="h-4 w-4 text-blue-500 mr-3" />
                                                <span className="text-sm text-blue-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🚨 보안 사고 대응 계획">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div className="text-2xl font-bold text-red-600">1단계</div>
                                        <div className="text-sm font-medium text-red-800">즉시 격리</div>
                                        <p className="text-xs text-red-700 mt-1">감염된 시스템 네트워크 차단</p>
                                    </div>
                                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                                        <div className="text-2xl font-bold text-orange-600">2단계</div>
                                        <div className="text-sm font-medium text-orange-800">상황 평가</div>
                                        <p className="text-xs text-orange-700 mt-1">피해 범위 및 원인 분석</p>
                                    </div>
                                    <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                        <div className="text-2xl font-bold text-yellow-600">3단계</div>
                                        <div className="text-sm font-medium text-yellow-800">복구 작업</div>
                                        <p className="text-xs text-yellow-700 mt-1">백업으로부터 시스템 복원</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="text-2xl font-bold text-green-600">4단계</div>
                                        <div className="text-sm font-medium text-green-800">재발 방지</div>
                                        <p className="text-xs text-green-700 mt-1">보안 정책 개선 및 강화</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h5 className="font-medium text-gray-900 mb-2">24시간 모니터링 체계</h5>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                                        <li>• Prometheus 메트릭 기반 알람</li>
                                        <li>• 실시간 SIP 트래픽 분석</li>
                                        <li>• 비정상적인 통화 패턴 탐지</li>
                                        <li>• 지리적 위치 기반 접근 제어</li>
                                    </ul>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'cases':
                return (
                    <div className="space-y-6">
                        <Section title="🏆 글로벌 기업 적용 사례">
                            <div className="space-y-6">
                                {caseStudies.map((study, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">{study.company}</h4>
                                                <p className="text-sm text-gray-600">{study.industry}</p>
                                            </div>
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {study.solution}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">규모</h5>
                                                <p className="text-sm text-gray-700">{study.scale}</p>
                                            </div>
                                            <div>
                                                <h5 className="font-medium text-gray-900 mb-2">주요 효과</h5>
                                                <p className="text-sm text-gray-700">{study.benefits}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="📊 Kamailio 활용 기업 현황">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">주요 텔레콤 업체</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Deutsche Telekom', desc: '독일 2대 통신사' },
                                            { name: 'Sipgate', desc: '독일 VoIP 서비스 제공업체' },
                                            { name: 'Phonnect', desc: '조지아 차세대 통신 서비스' },
                                            { name: 'Telavox', desc: '노르웨이 대형 VoIP 업체' }
                                        ].map((company, index) => (
                                            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                                <div>
                                                    <div className="font-medium text-blue-900">{company.name}</div>
                                                    <div className="text-sm text-blue-700">{company.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">콜센터/클라우드 업체</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'Daktela', desc: '옴니채널 콜센터 솔루션' },
                                            { name: 'VoIP Innovations', desc: '홀세일 SIP 트렁킹' },
                                            { name: 'Tragofone', desc: 'RTC 솔루션 개발' },
                                            { name: 'AfriCallShop', desc: '아프리카 특화 VoIP' }
                                        ].map((company, index) => (
                                            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                                                <div>
                                                    <div className="font-medium text-green-900">{company.name}</div>
                                                    <div className="text-sm text-green-700">{company.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="💡 성공 사례 분석">
                            <div className="space-y-4">
                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-3">2600Hz (Kazoo) 플랫폼</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <h5 className="font-medium text-purple-800">아키텍처</h5>
                                            <p className="text-sm text-purple-700 mt-1">Kamailio (프론트엔드) + FreeSWITCH (미디어) + AMQP (메시징)</p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-purple-800">핵심 기능</h5>
                                            <p className="text-sm text-purple-700 mt-1">등록 처리, Presence/BLF, 동적 라우팅</p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-purple-800">성과</h5>
                                            <p className="text-sm text-purple-700 mt-1">통신사급 안정성과 확장성</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                                    <h4 className="font-semibold text-blue-900 mb-3">FusionPBX 엔터프라이즈 클러스터</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <h5 className="font-medium text-blue-800">특징</h5>
                                            <p className="text-sm text-blue-700 mt-1">FreeSWITCH + Lua 스크립트 기반</p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue-800">장점</h5>
                                            <p className="text-sm text-blue-700 mt-1">복잡한 결정 로직, 데이터베이스 연동</p>
                                        </div>
                                        <div>
                                            <h5 className="font-medium text-blue-800">확장성</h5>
                                            <p className="text-sm text-blue-700 mt-1">로드밸런스 클러스터 + SIP 프록시</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📈 ROI 분석">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">비용 절감 효과</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-green-900">라이선스 비용</span>
                                                <span className="text-lg font-bold text-green-600">-100%</span>
                                            </div>
                                            <p className="text-sm text-green-700">상용 솔루션 대비 완전 무료</p>
                                        </div>
                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-blue-900">운영 비용</span>
                                                <span className="text-lg font-bold text-blue-600">-60%</span>
                                            </div>
                                            <p className="text-sm text-blue-700">클라우드 기반 자동 스케일링</p>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-purple-900">개발 비용</span>
                                                <span className="text-lg font-bold text-purple-600">-40%</span>
                                            </div>
                                            <p className="text-sm text-purple-700">오픈소스 커뮤니티 지원</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">성능 개선 효과</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-yellow-900">통화 품질</span>
                                                <span className="text-lg font-bold text-yellow-600">+25%</span>
                                            </div>
                                            <p className="text-sm text-yellow-700">HD 코덱 및 적응형 지터 버퍼</p>
                                        </div>
                                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-red-900">응답 시간</span>
                                                <span className="text-lg font-bold text-red-600">+50%</span>
                                            </div>
                                            <p className="text-sm text-red-700">실시간 라우팅 및 로드밸런싱</p>
                                        </div>
                                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium text-indigo-900">가용성</span>
                                                <span className="text-lg font-bold text-indigo-600">99.9%</span>
                                            </div>
                                            <p className="text-sm text-indigo-700">클러스터링 및 자동 장애복구</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    </div>
                );

            case 'references':
                return (
                    <div className="space-y-6">
                        <Section title="📚 핵심 기술 문서">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">공식 문서</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'FreeSWITCH 공식 문서', url: 'https://developer.signalwire.com/freeswitch/', desc: '설치, 구성, API 레퍼런스' },
                                            { title: 'Kamailio 매뉴얼', url: 'https://www.kamailio.org/docs/', desc: '모듈, 구성, 예제' },
                                            { title: 'PostgreSQL 최적화', url: 'https://www.postgresql.org/docs/', desc: '성능 튜닝, 클러스터링' },
                                            { title: 'Redis 클러스터', url: 'https://redis.io/docs/management/scaling/', desc: '분산 구성, 고가용성' }
                                        ].map((doc, index) => (
                                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                                <ExternalLink className="h-4 w-4 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{doc.title}</div>
                                                    <div className="text-sm text-gray-600">{doc.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">보안 및 규정</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: 'STIR/SHAKEN 표준', url: 'https://www.fcc.gov/call-authentication', desc: 'FCC 규정 및 구현 가이드' },
                                            { title: 'VoIP 보안 가이드', url: 'https://www.nist.gov/cybersecurity', desc: 'NIST 사이버보안 프레임워크' },
                                            { title: 'TLS/SRTP 구현', url: 'https://datatracker.ietf.org/doc/html/rfc3711', desc: 'RFC 표준 및 모범사례' },
                                            { title: 'WebRTC 보안', url: 'https://webrtc-security.github.io/', desc: '브라우저 기반 보안 고려사항' }
                                        ].map((doc, index) => (
                                            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                                <Shield className="h-4 w-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{doc.title}</div>
                                                    <div className="text-sm text-gray-600">{doc.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="🛠️ 개발 도구 및 라이브러리">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { name: 'SIPp', desc: 'SIP 프로토콜 테스트 도구', category: '테스트' },
                                    { name: 'sngrep', desc: 'SIP 메시지 캡처/분석', category: '디버깅' },
                                    { name: 'sip.js', desc: 'WebRTC SIP 클라이언트', category: '개발' },
                                    { name: 'Spring Boot', desc: 'Java 기반 API 서버', category: '백엔드' },
                                    { name: 'React', desc: '상담원 UI 프레임워크', category: '프론트엔드' },
                                    { name: 'Docker', desc: '컨테이너 배포', category: '인프라' },
                                    { name: 'Prometheus', desc: '메트릭 수집', category: '모니터링' },
                                    { name: 'Grafana', desc: '시각화 대시보드', category: '모니터링' },
                                    { name: 'HAProxy', desc: '로드밸런서', category: '인프라' }
                                ].map((tool, index) => (
                                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                                        <div className="font-medium text-gray-900">{tool.name}</div>
                                        <div className="text-sm text-gray-600 mt-1">{tool.desc}</div>
                                        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                            {tool.category}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        <Section title="🌐 커뮤니티 및 지원">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">오픈소스 커뮤니티</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'FreeSWITCH Community', members: '5,000+', desc: 'Slack, 포럼, 이슈 트래킹' },
                                            { name: 'Kamailio Users', members: '3,500+', desc: '메일링 리스트, IRC 채널' },
                                            { name: 'VoIP-Info Wiki', members: '전세계', desc: '기술 문서, 튜토리얼' },
                                            { name: 'GitHub Projects', repos: '1,000+', desc: '소스코드, 예제 프로젝트' }
                                        ].map((community, index) => (
                                            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                                                <Users className="h-5 w-5 text-blue-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-blue-900">{community.name}</div>
                                                    <div className="text-sm text-blue-700">
                                                        {community.members && `${community.members} • `}{community.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">상용 지원</h4>
                                    <div className="space-y-3">
                                        {[
                                            { name: 'SignalWire', desc: 'FreeSWITCH 공식 상용 지원' },
                                            { name: 'Asipto', desc: 'Kamailio 전문 컨설팅' },
                                            { name: 'VoIP 엔지니어링', desc: '시스템 통합 및 최적화' },
                                            { name: '클라우드 매니지드', desc: 'AWS/GCP 기반 운영 서비스' }
                                        ].map((support, index) => (
                                            <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                                                <Phone className="h-5 w-5 text-green-500 mr-3" />
                                                <div>
                                                    <div className="font-medium text-green-900">{support.name}</div>
                                                    <div className="text-sm text-green-700">{support.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <Section title="📖 추천 학습 자료">
                            <div className="space-y-4">
                                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                    <h4 className="font-semibold text-purple-900 mb-3">📚 필독서</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="font-medium text-purple-800">FreeSWITCH 1.6 Cookbook</div>
                                            <div className="text-sm text-purple-700">Anthony Minessale, Giovanni Maruzzelli</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-purple-800">Building Telephony Systems with Kamailio</div>
                                            <div className="text-sm text-purple-700">Flavio E. Goncalves, Daniel-Constantin Mierla</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <h4 className="font-semibold text-orange-900 mb-3">🎥 온라인 강의</h4>
                                    <div className="space-y-2 text-sm text-orange-800">
                                        <div>• ClueCon 컨퍼런스 영상 아카이브</div>
                                        <div>• Kamailio World 컨퍼런스 세션</div>
                                        <div>• VoIP 프로그래밍 Udemy 강의</div>
                                        <div>• WebRTC 실습 YouTube 시리즈</div>
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
                                            이 매뉴얼은 기술적 가이드라인을 제공하며, 실제 운영 환경에서는
                                            충분한 테스트와 보안 검토가 필요합니다.
                                        </p>
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>성능 수치는 하드웨어 및 네트워크 환경에 따라 달라질 수 있습니다</li>
                                            <li>보안 설정은 최신 위협에 따라 지속적으로 업데이트해야 합니다</li>
                                            <li>상용 환경 배포 전 전문가 검토를 권장합니다</li>
                                            <li>법적 규정은 국가/지역별로 다를 수 있습니다</li>
                                        </ul>
                                    </div>
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
                            <Phone className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">VoIP 콜센터 구축 완전 매뉴얼</h1>
                                <p className="text-sm text-gray-500">동시콜 1000-2000명 수준의 엔터프라이즈급 솔루션</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">2025 최신</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">오픈소스</span>
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
                            이 매뉴얼은 2025년 최신 기술 동향을 반영하여 작성되었습니다.
                            지속적인 업데이트와 커뮤니티 기여를 환영합니다.
                        </p>
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
                            <span>• FreeSWITCH</span>
                            <span>• Kamailio</span>
                            <span>• PostgreSQL</span>
                            <span>• Redis</span>
                            <span>• Spring Boot</span>
                            <span>• React</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default VoIPRoadmapManual;