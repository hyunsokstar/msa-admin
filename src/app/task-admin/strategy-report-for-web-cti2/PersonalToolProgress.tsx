import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Target, TrendingUp, Calendar } from 'lucide-react';

const CTITaskMasterProgress = () => {
    const [completedTasks] = useState([
        'Tauri + Vite + TailwindCSS + ShadCN UI 개발 환경 구축',
        '기본 네이티브 메뉴 및 다이얼로그 팝업 테스트 완료',
        'FSD 기반 폴더 구조 설계 및 Zustand 스토어 셋업',
        'TanStack Router 기반 페이지 라우터 구성',
        '사용자 바/패널 모드 설정 → 로컬 파일 시스템 저장 기능 구현'
    ]);

    const [todoTasks] = useState([
        '상담사 실시간 데이터 polling 테스트 (TanStack Query, REST or Redis 연동)',
        '웹 로그인 후 개인화 툴 자동 실행 연계',
        '배포 및 설치 자동화 프로세스 구축 (예: .msi or .exe)',
        '전체 UI 메뉴 시스템 구성 및 파일 기반 설정 저장',
        '기타 고도화 작업 (테마, 다국어 등)'
    ]);

    const totalTasks = completedTasks.length + todoTasks.length;
    const completionRate = Math.round((completedTasks.length / totalTasks) * 100);

    return (
        <section className="mt-8 p-4 bg-white rounded-2xl shadow">
            {/* 헤더 섹션 */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-3">
                        <Target className="h-8 w-8" />
                        CTI Task Master 진행 현황
                    </h2>
                    <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {completionRate}% 완료
                    </Badge>
                </div>

                {/* 프로그레스 바 */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                        style={{ width: `${completionRate}%` }}
                    />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        완료: {completedTasks.length}개
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        할일: {todoTasks.length}개
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 완료된 기능 */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-green-700">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            완료된 기능
                        </CardTitle>
                        <CardDescription className="text-green-600">
                            개발 환경 구축 및 기본 기능 구현 완료
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {completedTasks.map((item, index) => (
                                <div key={index} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-5 h-5 bg-green-500 rounded border-2 border-green-500 flex items-center justify-center">
                                            <CheckCircle className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700 leading-relaxed group-hover:text-green-800 transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2 text-green-700">
                                <Calendar className="h-4 w-4" />
                                <span className="font-medium text-sm">완료 현황</span>
                            </div>
                            <p className="text-sm text-green-600 mt-1">
                                기본 개발 환경과 핵심 기능들이 성공적으로 구현되었습니다.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* TODO 리스트 */}
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-3 text-orange-700">
                            <div className="p-2 bg-orange-100 rounded-lg">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                            TODO 리스트
                        </CardTitle>
                        <CardDescription className="text-orange-600">
                            향후 개발 예정 기능 및 개선 사항
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {todoTasks.map((item, index) => (
                                <div key={index} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-5 h-5 bg-white border-2 border-orange-300 rounded flex items-center justify-center group-hover:border-orange-400 transition-colors">
                                            <div className="w-2 h-2 bg-transparent rounded-sm" />
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700 leading-relaxed group-hover:text-orange-800 transition-colors">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 text-orange-700">
                                <Clock className="h-4 w-4" />
                                <span className="font-medium text-sm">다음 단계</span>
                            </div>
                            <p className="text-sm text-orange-600 mt-1">
                                실시간 데이터 연동과 배포 자동화가 우선 진행 예정입니다.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 하단 요약 정보 */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-blue-200">
                    <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-blue-600 mb-1">{totalTasks}</div>
                        <div className="text-sm text-gray-600">전체 작업</div>
                    </CardContent>
                </Card>

                <Card className="text-center bg-gradient-to-br from-green-50 to-white border-green-200">
                    <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks.length}</div>
                        <div className="text-sm text-gray-600">완료된 작업</div>
                    </CardContent>
                </Card>

                <Card className="text-center bg-gradient-to-br from-orange-50 to-white border-orange-200">
                    <CardContent className="pt-4">
                        <div className="text-2xl font-bold text-orange-600 mb-1">{todoTasks.length}</div>
                        <div className="text-sm text-gray-600">남은 작업</div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default CTITaskMasterProgress;