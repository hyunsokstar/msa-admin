import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Star, StarHalf, Database, Code, Settings, User, FileText, Rocket } from 'lucide-react';

// 타입 정의
interface TechSkill {
    name: string;
    score: number;
    category: 'backend' | 'frontend' | 'other';
    description: string;
    priority: 'high' | 'medium' | 'low';
}

const TechDebtReport: React.FC = () => {
    // 기술 부채 데이터
    const techSkills: TechSkill[] = [
        // 백엔드
        { name: 'Spring', score: 7, category: 'backend', description: '프레임워크 기본 이해', priority: 'medium' },
        { name: 'JSP', score: 5, category: 'backend', description: '레거시 기술, 현대화 필요', priority: 'high' },
        { name: 'MyBatis', score: 6, category: 'backend', description: '기본 CRUD 작업 가능', priority: 'medium' },
        { name: 'SQL', score: 8, category: 'backend', description: '복잡한 쿼리 작성 가능', priority: 'low' },
        { name: 'Dev Express', score: 4, category: 'backend', description: '학습 및 경험 부족', priority: 'high' },
        { name: 'Dev Extream', score: 3, category: 'backend', description: '생소한 기술, 학습 필요', priority: 'high' },
        { name: 'Redis (Backend)', score: 6, category: 'backend', description: '캐싱 기본 사용법 이해', priority: 'medium' },

        // 프론트엔드
        { name: 'Tauri', score: 8, category: 'frontend', description: '현재 프로젝트 진행 중', priority: 'low' },
        { name: 'React', score: 9, category: 'frontend', description: '고급 패턴까지 활용 가능', priority: 'low' },
        { name: 'Redis (Frontend)', score: 6, category: 'frontend', description: '클라이언트 연동 경험', priority: 'medium' },

        // 기타
        { name: '인증 및 권한', score: 6, category: 'other', description: 'JWT, OAuth 기본 이해', priority: 'medium' },
        { name: '비즈니스 로직 이해', score: 7, category: 'other', description: '도메인 지식 보유', priority: 'medium' },
        { name: '업무 관리', score: 5, category: 'other', description: '프로젝트 관리 역량 개선 필요', priority: 'high' },
        { name: '배포', score: 6, category: 'other', description: 'CI/CD 파이프라인 구축 경험', priority: 'medium' },
        { name: '문서화', score: 4, category: 'other', description: '체계적 문서화 개선 필요', priority: 'high' }
    ];

    // 점수에 따른 별표 렌더링
    const renderStars = (score: number) => {
        const fullStars = Math.floor(score);
        const hasHalfStar = score % 1 >= 0.5;
        const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1">
                {/* 꽉 찬 별 */}
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {/* 반 별 */}
                {hasHalfStar && (
                    <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                )}
                {/* 빈 별 */}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">
                    {score.toFixed(1)}/10
                </span>
            </div>
        );
    };

    // 우선순위에 따른 색상
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // 카테고리별 아이콘
    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'backend': return <Database className="w-5 h-5" />;
            case 'frontend': return <Code className="w-5 h-5" />;
            case 'other': return <Settings className="w-5 h-5" />;
            default: return <Settings className="w-5 h-5" />;
        }
    };

    // 카테고리별 데이터 분류
    const backendSkills = techSkills.filter(skill => skill.category === 'backend');
    const frontendSkills = techSkills.filter(skill => skill.category === 'frontend');
    const otherSkills = techSkills.filter(skill => skill.category === 'other');

    // 전체 평균 점수
    const averageScore = techSkills.reduce((sum, skill) => sum + skill.score, 0) / techSkills.length;

    // 우선순위별 개수
    const highPriorityCount = techSkills.filter(skill => skill.priority === 'high').length;
    const mediumPriorityCount = techSkills.filter(skill => skill.priority === 'medium').length;
    const lowPriorityCount = techSkills.filter(skill => skill.priority === 'low').length;

    return (
        <div className="space-y-8">
            {/* 헤더 섹션 */}
            <div className="text-center">
                <h2 className="text-4xl font-bold text-blue-700 flex items-center justify-center gap-3 mb-4">
                    <AlertTriangle className="h-10 w-10" />
                    기술 부채 관리 보고서
                </h2>
                <p className="text-gray-600 text-lg">
                    현재 기술 스택의 숙련도와 개선이 필요한 영역을 시각화한 보고서입니다.
                </p>
            </div>

            {/* 요약 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-blue-200">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {averageScore.toFixed(1)}
                        </div>
                        <div className="text-sm text-gray-600">전체 평균 점수</div>
                        <div className="mt-2">
                            {renderStars(averageScore)}
                        </div>
                    </CardContent>
                </Card>

                <Card className="text-center bg-gradient-to-br from-red-50 to-white border-red-200">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-red-600 mb-2">{highPriorityCount}</div>
                        <div className="text-sm text-gray-600">높은 우선순위</div>
                        <Badge className="mt-2 bg-red-100 text-red-700">긴급 개선</Badge>
                    </CardContent>
                </Card>

                <Card className="text-center bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-yellow-600 mb-2">{mediumPriorityCount}</div>
                        <div className="text-sm text-gray-600">중간 우선순위</div>
                        <Badge className="mt-2 bg-yellow-100 text-yellow-700">점진적 개선</Badge>
                    </CardContent>
                </Card>

                <Card className="text-center bg-gradient-to-br from-green-50 to-white border-green-200">
                    <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-green-600 mb-2">{lowPriorityCount}</div>
                        <div className="text-sm text-gray-600">낮은 우선순위</div>
                        <Badge className="mt-2 bg-green-100 text-green-700">유지 관리</Badge>
                    </CardContent>
                </Card>
            </div>

            {/* 카테고리별 기술 스택 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 백엔드 */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                        <CardTitle className="flex items-center gap-3 text-blue-700">
                            <Database className="h-6 w-6" />
                            백엔드 기술
                        </CardTitle>
                        <CardDescription className="text-blue-600">
                            서버 사이드 기술 스택 현황
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {backendSkills.map((skill, index) => (
                                <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                                        <Badge className={`text-xs ${getPriorityColor(skill.priority)}`}>
                                            {skill.priority}
                                        </Badge>
                                    </div>
                                    <div className="mb-2">
                                        {renderStars(skill.score)}
                                    </div>
                                    <p className="text-sm text-gray-600">{skill.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 프론트엔드 */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                        <CardTitle className="flex items-center gap-3 text-green-700">
                            <Code className="h-6 w-6" />
                            프론트엔드 기술
                        </CardTitle>
                        <CardDescription className="text-green-600">
                            클라이언트 사이드 기술 스택 현황
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {frontendSkills.map((skill, index) => (
                                <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                                        <Badge className={`text-xs ${getPriorityColor(skill.priority)}`}>
                                            {skill.priority}
                                        </Badge>
                                    </div>
                                    <div className="mb-2">
                                        {renderStars(skill.score)}
                                    </div>
                                    <p className="text-sm text-gray-600">{skill.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 기타 */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100">
                        <CardTitle className="flex items-center gap-3 text-purple-700">
                            <Settings className="h-6 w-6" />
                            기타 역량
                        </CardTitle>
                        <CardDescription className="text-purple-600">
                            프로젝트 관리 및 소프트 스킬 현황
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {otherSkills.map((skill, index) => (
                                <div key={index} className="p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start justify-between mb-2">
                                        <h4 className="font-semibold text-gray-800">{skill.name}</h4>
                                        <Badge className={`text-xs ${getPriorityColor(skill.priority)}`}>
                                            {skill.priority}
                                        </Badge>
                                    </div>
                                    <div className="mb-2">
                                        {renderStars(skill.score)}
                                    </div>
                                    <p className="text-sm text-gray-600">{skill.description}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 개선 계획 */}
            <Card className="shadow-lg border-l-4 border-l-orange-500">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                    <CardTitle className="flex items-center gap-3 text-orange-700">
                        <Rocket className="h-6 w-6" />
                        개선 계획 및 우선순위
                    </CardTitle>
                    <CardDescription className="text-orange-600">
                        기술 부채 해결을 위한 단계별 개선 로드맵
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* 긴급 개선 */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-red-700 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                긴급 개선 (High Priority)
                            </h4>
                            <div className="space-y-2">
                                {techSkills
                                    .filter(skill => skill.priority === 'high')
                                    .map((skill, index) => (
                                        <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
                                            <div className="font-medium text-sm">{skill.name}</div>
                                            <div className="text-xs text-gray-600 mt-1">{skill.description}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* 점진적 개선 */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-yellow-700 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                점진적 개선 (Medium Priority)
                            </h4>
                            <div className="space-y-2">
                                {techSkills
                                    .filter(skill => skill.priority === 'medium')
                                    .map((skill, index) => (
                                        <div key={index} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <div className="font-medium text-sm">{skill.name}</div>
                                            <div className="text-xs text-gray-600 mt-1">{skill.description}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {/* 유지 관리 */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-green-700 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                유지 관리 (Low Priority)
                            </h4>
                            <div className="space-y-2">
                                {techSkills
                                    .filter(skill => skill.priority === 'low')
                                    .map((skill, index) => (
                                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                                            <div className="font-medium text-sm">{skill.name}</div>
                                            <div className="text-xs text-gray-600 mt-1">{skill.description}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TechDebtReport;