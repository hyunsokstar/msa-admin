import React, { useState } from 'react';
import {
    Search,
    Code2,
    BookOpen,
    FileText,
    Zap,
    Database,
    ExternalLink,
    Star,
    Tag,
    User,
    Clock,
    Target,
    Play,
    TrendingUp,
    Server,
    Activity,
} from 'lucide-react';

interface Lecture {
    id: number;
    type: 'lecture';
    title: string;
    description: string;
    url: string;
    instructor: string;
    tags: string[];
    difficulty: string;
    duration: string;
    category: 'realtime' | 'api' | 'batch';
    features: string[];
    realWorldApplications: string[];
    keyPoints: string[];
}

const ReferenceLectures: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'realtime' | 'api' | 'batch'>('all');

    const lectures: Lecture[] = [
        {
            id: 1,
            type: 'lecture',
            title: 'Go 언어로 실시간 서버 개발',
            description: '고성능 실시간 처리와 MSA 구조의 경량 서비스, 브로커, 에이전트 구현을 위한 Go 언어 마스터',
            url: 'https://fastcampus.co.kr/dev_online_golang',
            instructor: 'FastCampus',
            tags: ['Go', 'Golang', '실시간', '고성능', 'MSA', '브로커', 'WebSocket'],
            difficulty: '중급~고급',
            duration: '실전 위주',
            category: 'realtime',
            features: [
                '고성능 실시간 처리 시스템 구축',
                'MSA 구조의 경량 서비스 개발',
                '이벤트 브로커 및 에이전트 구현',
                'WebSocket 서버 개발',
                'Redis Pub/Sub 패턴 활용'
            ],
            realWorldApplications: [
                '실시간 알림 시스템',
                'Redis Pub/Sub 메시징',
                'WebSocket 실시간 통신',
                '이벤트 서버 구축',
                'SIP/통신 연동 서비스'
            ],
            keyPoints: [
                '실시간 이벤트 분산 처리',
                '메신저 시스템 구현',
                '고성능 브로커 개발',
                '경량 마이크로서비스'
            ]
        },
        {
            id: 2,
            type: 'lecture',
            title: 'Spring Boot + QueryDSL 실전 API 개발',
            description: '조직/상담원/콜/권한/통계 등 핵심 서비스의 메인 API 구축과 대규모 데이터 처리 실무',
            url: 'https://fastcampus.co.kr/dev_online_api3',
            instructor: 'FastCampus',
            tags: ['Spring Boot', 'QueryDSL', 'REST API', 'JPA', '대규모 데이터', 'MSA'],
            difficulty: '중급',
            duration: '실전 프로젝트',
            category: 'api',
            features: [
                '대규모 데이터 처리 최적화',
                'QueryDSL을 활용한 복잡한 쿼리 작성',
                'REST API 설계 및 구현',
                '트랜잭션 관리 및 성능 튜닝',
                'MSA 아키텍처 연동'
            ],
            realWorldApplications: [
                'Organization 관리 시스템',
                'CTI(Computer Telephony Integration)',
                'Call 관리 및 모니터링',
                '권한 관리 시스템(Auth)',
                'Reporting 및 통계 서비스'
            ],
            keyPoints: [
                '핵심 서비스 메인 API',
                '대량 쿼리 처리',
                '실무 아키텍처 설계',
                'MSA 서비스 연동'
            ]
        },
        {
            id: 3,
            type: 'lecture',
            title: 'Spring Batch 대용량 데이터 처리',
            description: '대용량/정기 데이터 처리, 야간 집계, 대량 마이그레이션, 정기 리포트 생성을 위한 배치 시스템',
            url: 'https://fastcampus.co.kr/dev_online_springbatch',
            instructor: 'FastCampus',
            tags: ['Spring Batch', '대용량 처리', '배치', '스케줄링', '데이터 마이그레이션'],
            difficulty: '중급~고급',
            duration: '심화 과정',
            category: 'batch',
            features: [
                '대용량 데이터 배치 처리',
                '정기 스케줄링 및 자동화',
                '데이터 마이그레이션 시스템',
                '야간 집계 처리 로직',
                '장애 복구 및 재시작 메커니즘'
            ],
            realWorldApplications: [
                '일일 콜 통계 집계',
                '데이터 마이그레이션/백업',
                '정기 데이터 정리 작업',
                '월간/연간 리포트 생성',
                '대량 데이터 ETL 처리'
            ],
            keyPoints: [
                '비실시간 정기 업무',
                '장기 배치 작업',
                '대용량 처리 최적화',
                '안정성 및 복구'
            ]
        }
    ];

    const categories = [
        { key: 'all', label: '전체', icon: <Search size={16} />, color: 'text-gray-600' },
        { key: 'realtime', label: '실시간/Go', icon: <Activity size={16} />, color: 'text-green-600' },
        { key: 'api', label: 'API/Spring', icon: <Server size={16} />, color: 'text-blue-600' },
        { key: 'batch', label: '배치/대용량', icon: <Database size={16} />, color: 'text-purple-600' },
    ];

    const filteredLectures = filter === 'all' ? lectures : lectures.filter(lecture => lecture.category === filter);

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'realtime': return 'bg-green-100 text-green-700 border-green-200';
            case 'api': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'batch': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'realtime': return <Activity size={20} className="text-green-600" />;
            case 'api': return <Server size={20} className="text-blue-600" />;
            case 'batch': return <Database size={20} className="text-purple-600" />;
            default: return <BookOpen size={20} className="text-gray-600" />;
        }
    };

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'realtime': return '실시간/고성능';
            case 'api': return 'API/백엔드';
            case 'batch': return '배치/대용량';
            default: return '강의';
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
                    <Play size={32} className="text-blue-600" />
                    FastCampus 실전 개발 강의
                </h1>
                <p className="text-lg text-gray-600">현업에서 바로 써먹는 실전 위주의 백엔드 개발 강의</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 rounded-lg">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setFilter(cat.key as any)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${filter === cat.key
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Lecture Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLectures.map(lecture => (
                    <div key={lecture.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                        {/* Card Header */}
                        <div className="p-6 pb-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    {getCategoryIcon(lecture.category)}
                                    <span className="text-sm font-medium text-gray-600">
                                        {getCategoryLabel(lecture.category)}
                                    </span>
                                </div>
                                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(lecture.category)}`}>
                                    {lecture.difficulty}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">{lecture.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{lecture.description}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {lecture.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                        <Tag size={10} className="mr-1" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <User size={14} />
                                    {lecture.instructor}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {lecture.duration}
                                </div>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="px-6 pb-4 space-y-4">
                            {/* Key Points */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Target size={16} className="text-blue-500" />
                                    핵심 포인트
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {lecture.keyPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Features */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Star size={16} className="text-yellow-500" />
                                    학습 내용
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {lecture.features.slice(0, 3).map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                    {lecture.features.length > 3 && (
                                        <li className="text-gray-500">외 {lecture.features.length - 3}개 더...</li>
                                    )}
                                </ul>
                            </div>

                            {/* Real World Applications */}
                            <div>
                                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <TrendingUp size={16} className="text-green-500" />
                                    실제 적용 예시
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                                    {lecture.realWorldApplications.slice(0, 3).map((app, i) => (
                                        <li key={i}>{app}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-6 pt-0">
                            <button
                                onClick={() => window.open(lecture.url, '_blank')}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <ExternalLink size={16} />
                                강의 보러가기
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3종 세트 요약 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap size={24} className="text-blue-600" />
                    3종 세트 완벽 조합
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity size={20} className="text-green-600" />
                            <span className="font-medium">Go 언어</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">실시간/경량/브로커/이벤트/메신저</p>
                        <div className="text-xs text-green-600 font-medium">
                            → Messenger, Event, 실시간 서버, Broker, SIP 등
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Server size={20} className="text-blue-600" />
                            <span className="font-medium">Spring Boot API</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">메인 서비스/REST API/DB/쿼리/트랜잭션</p>
                        <div className="text-xs text-blue-600 font-medium">
                            → Organization, CTI, Call, Auth, Reporting 등
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                            <Database size={20} className="text-purple-600" />
                            <span className="font-medium">Spring Batch</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">대용량/정기/배치/야간/마이그레이션</p>
                        <div className="text-xs text-purple-600 font-medium">
                            → Reporting, Analytics, 데이터 정리/집계/이관 등
                        </div>
                    </div>
                </div>
            </div>

            {/* Architecture Overview */}
            <div className="bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code2 size={24} className="text-gray-700" />
                    전체 시스템 아키텍처
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-2">
                            <Activity size={32} className="text-green-600 mx-auto" />
                        </div>
                        <h4 className="font-medium mb-1">실시간 레이어</h4>
                        <p className="text-sm text-gray-600">Go 기반 실시간 처리</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg mb-2">
                            <Server size={32} className="text-blue-600 mx-auto" />
                        </div>
                        <h4 className="font-medium mb-1">API 레이어</h4>
                        <p className="text-sm text-gray-600">Spring Boot 메인 서비스</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-purple-100 p-4 rounded-lg mb-2">
                            <Database size={32} className="text-purple-600 mx-auto" />
                        </div>
                        <h4 className="font-medium mb-1">배치 레이어</h4>
                        <p className="text-sm text-gray-600">Spring Batch 대용량 처리</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferenceLectures;