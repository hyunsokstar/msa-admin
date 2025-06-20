// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { CheckCircle, Clock, AlertCircle, Target, TrendingUp, Calendar } from 'lucide-react';

// const CTITaskMasterProgress = () => {
//     const [completedTasks] = useState([
//         'Tauri + Vite + TailwindCSS + ShadCN UI 개발 환경 구축',
//         '기본 네이티브 메뉴 및 다이얼로그 팝업 테스트 완료',
//         'FSD 기반 폴더 구조 설계 및 Zustand 스토어 셋업',
//         'TanStack Router 기반 페이지 라우터 구성',
//         '사용자 바/패널 모드 설정 → 로컬 파일 시스템 저장 기능 구현'
//     ]);

//     const [todoTasks] = useState([
//         '상담사 실시간 데이터 polling 테스트 (TanStack Query, REST or Redis 연동)',
//         '웹 로그인 후 개인화 툴 자동 실행 연계',
//         '배포 및 설치 자동화 프로세스 구축 (예: .msi or .exe)',
//         '전체 UI 메뉴 시스템 구성 및 파일 기반 설정 저장',
//         '기타 고도화 작업 (테마, 다국어 등)'
//     ]);

//     const totalTasks = completedTasks.length + todoTasks.length;
//     const completionRate = Math.round((completedTasks.length / totalTasks) * 100);

//     return (
//         <section className="mt-24">
//             {/* 헤더 섹션 */}
//             <div className="mb-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-3">
//                         <Target className="h-8 w-8" />
//                         CTI Task Master 진행 현황
//                     </h2>
//                 </div>

//                 {/* 프로그레스 바 */}
//                 <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
//                     <div
//                         className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
//                         style={{ width: `${completionRate}%` }}
//                     />
//                 </div>

//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                     <span className="flex items-center gap-2">
//                         <CheckCircle className="h-4 w-4 text-green-500" />
//                         완료: {completedTasks.length}개
//                     </span>
//                     <span className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-orange-500" />
//                         할일: {todoTasks.length}개
//                     </span>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* 완료된 기능 */}
//                 <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
//                     <CardHeader className="pb-3">
//                         <CardTitle className="flex items-center gap-3 text-green-700">
//                             <div className="p-2 bg-green-100 rounded-lg">
//                                 <CheckCircle className="h-6 w-6" />
//                             </div>
//                             완료된 기능
//                         </CardTitle>
//                         <CardDescription className="text-green-600">
//                             개발 환경 구축 및 기본 기능 구현 완료
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-3">
//                             {completedTasks.map((item, index) => (
//                                 <div key={index} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors">
//                                     <div className="flex-shrink-0 mt-1">
//                                         <div className="w-5 h-5 bg-green-500 rounded border-2 border-green-500 flex items-center justify-center">
//                                             <CheckCircle className="h-3 w-3 text-white" />
//                                         </div>
//                                     </div>
//                                     <span className="text-sm text-gray-700 leading-relaxed group-hover:text-green-800 transition-colors">
//                                         {item}
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
//                             <div className="flex items-center gap-2 text-green-700">
//                                 <Calendar className="h-4 w-4" />
//                                 <span className="font-medium text-sm">완료 현황</span>
//                             </div>
//                             <p className="text-sm text-green-600 mt-1">
//                                 기본 개발 환경과 핵심 기능들이 성공적으로 구현되었습니다.
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* TODO 리스트 */}
//                 <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
//                     <CardHeader className="pb-3">
//                         <CardTitle className="flex items-center gap-3 text-orange-700">
//                             <div className="p-2 bg-orange-100 rounded-lg">
//                                 <AlertCircle className="h-6 w-6" />
//                             </div>
//                             TODO 리스트
//                         </CardTitle>
//                         <CardDescription className="text-orange-600">
//                             향후 개발 예정 기능 및 개선 사항
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="space-y-3">
//                             {todoTasks.map((item, index) => (
//                                 <div key={index} className="group flex items-start gap-3 p-2 rounded-lg hover:bg-orange-50 transition-colors">
//                                     <div className="flex-shrink-0 mt-1">
//                                         <div className="w-5 h-5 bg-white border-2 border-orange-300 rounded flex items-center justify-center group-hover:border-orange-400 transition-colors">
//                                             <div className="w-2 h-2 bg-transparent rounded-sm" />
//                                         </div>
//                                     </div>
//                                     <span className="text-sm text-gray-700 leading-relaxed group-hover:text-orange-800 transition-colors">
//                                         {item}
//                                     </span>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-200">
//                             <div className="flex items-center gap-2 text-orange-700">
//                                 <Clock className="h-4 w-4" />
//                                 <span className="font-medium text-sm">다음 단계</span>
//                             </div>
//                             <p className="text-sm text-orange-600 mt-1">
//                                 실시간 데이터 연동과 배포 자동화가 우선 진행 예정입니다.
//                             </p>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>

//             {/* 하단 요약 정보 */}
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <Card className="text-center bg-gradient-to-br from-blue-50 to-white border-blue-200">
//                     <CardContent className="pt-4">
//                         <div className="text-2xl font-bold text-blue-600 mb-1">{totalTasks}</div>
//                         <div className="text-sm text-gray-600">전체 작업</div>
//                     </CardContent>
//                 </Card>

//                 <Card className="text-center bg-gradient-to-br from-green-50 to-white border-green-200">
//                     <CardContent className="pt-4">
//                         <div className="text-2xl font-bold text-green-600 mb-1">{completedTasks.length}</div>
//                         <div className="text-sm text-gray-600">완료된 작업</div>
//                     </CardContent>
//                 </Card>

//                 <Card className="text-center bg-gradient-to-br from-orange-50 to-white border-orange-200">
//                     <CardContent className="pt-4">
//                         <div className="text-2xl font-bold text-orange-600 mb-1">{todoTasks.length}</div>
//                         <div className="text-sm text-gray-600">남은 작업</div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </section>
//     );
// };

// export default CTITaskMasterProgress;

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Target, TrendingUp, Calendar, ChevronLeft, ChevronRight, Plus, Edit } from 'lucide-react';

// 타입 정의
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface WeekData {
    weekNumber: number;
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    tasks: Task[];
}

type WeeklyDataArray = WeekData[];

interface WeeklyTodoManagerProps { }

const WeeklyTodoManager: React.FC<WeeklyTodoManagerProps> = () => {
    // 현재 날짜 (6월 20일, 2025년)
    const currentDate: Date = new Date(2025, 5, 20);

    // 주차별 데이터 구조 - 기존 CTITaskMasterProgress 내용 충실 반영
    const [weeklyData, setWeeklyData] = useState<WeeklyDataArray>([
        {
            weekNumber: 1,
            startDate: new Date(2025, 5, 20),
            endDate: new Date(2025, 5, 26),
            title: "개발 환경 구축 및 기본 기능 완성",
            description: "Tauri 기반 데스크톱 앱 개발 환경 완료 및 기본 구조 구축",
            tasks: [
                // 완료된 작업 (기존 completedTasks 반영)
                { id: 1, text: "Tauri + Vite + TailwindCSS + ShadCN UI 개발 환경 구축", completed: true },
                { id: 2, text: "기본 네이티브 메뉴 및 다이얼로그 팝업 테스트 완료", completed: true },
                { id: 3, text: "FSD 기반 폴더 구조 설계 및 Zustand 스토어 셋업", completed: true },
                { id: 4, text: "TanStack Router 기반 페이지 라우터 구성", completed: true },
                { id: 5, text: "사용자 바/패널 모드 설정 → 로컬 파일 시스템 저장 기능 구현", completed: true },
                // TODO 작업 (기존 todoTasks 반영)
                { id: 6, text: "상담사 실시간 데이터 polling 테스트 (TanStack Query, REST or Redis 연동)", completed: false },
                { id: 7, text: "웹 로그인 후 개인화 툴 자동 실행 연계", completed: false },
                { id: 8, text: "배포 및 설치 자동화 프로세스 구축 (예: .msi or .exe)", completed: false },
                { id: 9, text: "전체 UI 메뉴 시스템 구성 및 파일 기반 설정 저장", completed: false },
                { id: 10, text: "기타 고도화 작업 (테마, 다국어 등)", completed: false }
            ]
        },
        {
            weekNumber: 2,
            startDate: new Date(2025, 5, 27),
            endDate: new Date(2025, 6, 3),
            title: "실시간 데이터 연동 시스템 구축",
            description: "TanStack Query와 Redis를 활용한 실시간 데이터 처리 완성",
            tasks: [
                { id: 11, text: "TanStack Query 고급 설정 및 캐싱 전략 구현", completed: false },
                { id: 12, text: "Redis 실시간 데이터 연동 및 구독 시스템", completed: false },
                { id: 13, text: "상담사 데이터 실시간 모니터링 대시보드", completed: false },
                { id: 14, text: "에러 핸들링 및 재시도 로직 구현", completed: false },
                { id: 15, text: "실시간 데이터 상태 관리 최적화", completed: false },
                { id: 16, text: "네트워크 상태 모니터링 기능", completed: false }
            ]
        },
        {
            weekNumber: 3,
            startDate: new Date(2025, 6, 4),
            endDate: new Date(2025, 6, 10),
            title: "웹 로그인 연동 및 인증 시스템",
            description: "웹 기반 로그인과 개인화 툴 자동 실행 연계 완성",
            tasks: [
                { id: 17, text: "웹 로그인 API 연동 구현", completed: false },
                { id: 18, text: "JWT 토큰 기반 인증 시스템", completed: false },
                { id: 19, text: "개인화 툴 자동 실행 로직 구현", completed: false },
                { id: 20, text: "사용자 세션 관리 및 자동 갱신", completed: false },
                { id: 21, text: "로그인 상태 UI 반영 시스템", completed: false },
                { id: 22, text: "Single Sign-On (SSO) 통합", completed: false }
            ]
        },
        {
            weekNumber: 4,
            startDate: new Date(2025, 6, 11),
            endDate: new Date(2025, 6, 17),
            title: "UI 메뉴 시스템 완성",
            description: "전체 UI 메뉴 시스템과 파일 기반 설정 저장 완료",
            tasks: [
                { id: 23, text: "전체 UI 메뉴 구조 설계 및 컴포넌트 구현", completed: false },
                { id: 24, text: "파일 기반 설정 저장 시스템 구현", completed: false },
                { id: 25, text: "메뉴 권한 관리 시스템", completed: false },
                { id: 26, text: "설정 백업 및 복원 기능", completed: false },
                { id: 27, text: "메뉴 커스터마이징 기능", completed: false },
                { id: 28, text: "동적 메뉴 생성 및 관리 기능", completed: false }
            ]
        },
        {
            weekNumber: 5,
            startDate: new Date(2025, 6, 18),
            endDate: new Date(2025, 6, 24),
            title: "배포 자동화 프로세스 구축",
            description: "빌드 프로세스 최적화 및 설치 패키지 생성",
            tasks: [
                { id: 29, text: "Tauri 빌드 프로세스 최적화", completed: false },
                { id: 30, text: "Windows .msi 설치 패키지 생성", completed: false },
                { id: 31, text: "실행 파일 최적화 및 압축", completed: false },
                { id: 32, text: "배포 스크립트 작성 및 자동화", completed: false },
                { id: 33, text: "설치/제거 프로세스 검증", completed: false },
                { id: 34, text: "자동 업데이트 시스템 구현", completed: false }
            ]
        },
        {
            weekNumber: 6,
            startDate: new Date(2025, 6, 25),
            endDate: new Date(2025, 6, 31),
            title: "고도화 작업 - 테마 시스템",
            description: "다크/라이트 테마 및 커스텀 테마 시스템 구현",
            tasks: [
                { id: 35, text: "다크/라이트 테마 기본 구조 구현", completed: false },
                { id: 36, text: "테마 전환 애니메이션 및 UI", completed: false },
                { id: 37, text: "커스텀 테마 에디터 구현", completed: false },
                { id: 38, text: "테마 설정 저장/로드 기능", completed: false },
                { id: 39, text: "테마 프리셋 및 공유 기능", completed: false }
            ]
        },
        {
            weekNumber: 7,
            startDate: new Date(2025, 7, 1),
            endDate: new Date(2025, 7, 7),
            title: "고도화 작업 - 다국어 지원",
            description: "i18n 기반 다국어 지원 및 현지화 시스템",
            tasks: [
                { id: 40, text: "i18n 라이브러리 설정 및 기본 구조", completed: false },
                { id: 41, text: "한국어/영어 번역 파일 작성", completed: false },
                { id: 42, text: "언어 변경 UI 및 실시간 전환", completed: false },
                { id: 43, text: "날짜/시간 현지화 포맷팅", completed: false },
                { id: 44, text: "다국어 설정 저장 및 관리", completed: false }
            ]
        },
        {
            weekNumber: 8,
            startDate: new Date(2025, 7, 8),
            endDate: new Date(2025, 7, 14),
            title: "성능 최적화 및 안정화",
            description: "메모리 최적화, 속도 개선, 안정성 강화",
            tasks: [
                { id: 45, text: "메모리 누수 점검 및 최적화", completed: false },
                { id: 46, text: "앱 시작 속도 최적화", completed: false },
                { id: 47, text: "번들 크기 최적화", completed: false },
                { id: 48, text: "에러 로깅 시스템 구현", completed: false },
                { id: 49, text: "성능 모니터링 대시보드", completed: false }
            ]
        },
        {
            weekNumber: 9,
            startDate: new Date(2025, 7, 15),
            endDate: new Date(2025, 7, 21),
            title: "통합 테스트 및 품질 보증",
            description: "전체 시스템 통합 테스트 및 버그 수정",
            tasks: [
                { id: 50, text: "전체 기능 통합 테스트 시나리오 작성", completed: false },
                { id: 51, text: "자동화된 테스트 스위트 구현", completed: false },
                { id: 52, text: "크리티컬 버그 수정", completed: false },
                { id: 53, text: "사용자 시나리오 기반 테스트", completed: false },
                { id: 54, text: "부하 테스트 및 스트레스 테스트", completed: false }
            ]
        },
        {
            weekNumber: 10,
            startDate: new Date(2025, 7, 22),
            endDate: new Date(2025, 7, 28),
            title: "문서화 및 사용자 가이드",
            description: "사용자 매뉴얼, 개발 문서, API 문서 작성",
            tasks: [
                { id: 55, text: "사용자 매뉴얼 및 가이드 작성", completed: false },
                { id: 56, text: "개발자 문서 정리 및 API 문서", completed: false },
                { id: 57, text: "설치 및 설정 가이드 작성", completed: false },
                { id: 58, text: "FAQ 및 문제 해결 가이드", completed: false },
                { id: 59, text: "영상 튜토리얼 제작", completed: false }
            ]
        },
        {
            weekNumber: 11,
            startDate: new Date(2025, 7, 29),
            endDate: new Date(2025, 8, 4),
            title: "베타 출시 및 피드백 수집",
            description: "내부 베타 테스트 및 초기 사용자 피드백",
            tasks: [
                { id: 60, text: "베타 버전 패키징 및 배포", completed: false },
                { id: 61, text: "베타 테스터 모집 및 관리", completed: false },
                { id: 62, text: "피드백 수집 시스템 구축", completed: false },
                { id: 63, text: "사용자 행동 분석 도구 설정", completed: false },
                { id: 64, text: "긴급 패치 및 핫픽스 시스템", completed: false }
            ]
        },
        {
            weekNumber: 12,
            startDate: new Date(2025, 8, 5),
            endDate: new Date(2025, 8, 11),
            title: "최종 출시 준비",
            description: "정식 출시 준비, 마케팅 자료, 최종 점검",
            tasks: [
                { id: 65, text: "베타 피드백 반영 및 최종 수정", completed: false },
                { id: 66, text: "출시 전 최종 통합 테스트", completed: false },
                { id: 67, text: "배포 파이프라인 최종 검증", completed: false },
                { id: 68, text: "마케팅 자료 및 홍보 준비", completed: false },
                { id: 69, text: "출시 후 지원 체계 구축", completed: false }
            ]
        }
    ]);

    const [selectedWeek, setSelectedWeek] = useState<number>(0);

    // 현재 주차 계산
    const getCurrentWeek = (): number => {
        const now: Date = new Date();
        return weeklyData.findIndex((week: WeekData) =>
            now >= week.startDate && now <= week.endDate
        );
    };

    // 전체 진행률 계산
    const overallProgress: number = useMemo(() => {
        const totalTasks: number = weeklyData.reduce((sum: number, week: WeekData) => sum + week.tasks.length, 0);
        const completedTasks: number = weeklyData.reduce((sum: number, week: WeekData) =>
            sum + week.tasks.filter((task: Task) => task.completed).length, 0);
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    }, [weeklyData]);

    // 주차별 진행률 계산
    const getWeekProgress = (week: WeekData): number => {
        const completedTasks: number = week.tasks.filter((task: Task) => task.completed).length;
        return week.tasks.length > 0 ? Math.round((completedTasks / week.tasks.length) * 100) : 0;
    };

    // 작업 완료 토글
    const toggleTaskCompletion = (weekIndex: number, taskId: number): void => {
        setWeeklyData((prev: WeeklyDataArray) => {
            const newData: WeeklyDataArray = [...prev];
            const taskIndex: number = newData[weekIndex].tasks.findIndex((task: Task) => task.id === taskId);
            if (taskIndex !== -1) {
                newData[weekIndex].tasks[taskIndex].completed = !newData[weekIndex].tasks[taskIndex].completed;
            }
            return newData;
        });
    };

    // 새 작업 추가
    const addNewTask = (weekIndex: number): void => {
        const newTaskText: string | null = prompt("새 작업을 입력하세요:");
        if (newTaskText && newTaskText.trim()) {
            setWeeklyData((prev: WeeklyDataArray) => {
                const newData: WeeklyDataArray = [...prev];
                const maxId: number = Math.max(...newData.flatMap((week: WeekData) => week.tasks.map((task: Task) => task.id)));
                const newTask: Task = {
                    id: maxId + 1,
                    text: newTaskText.trim(),
                    completed: false
                };
                newData[weekIndex].tasks.push(newTask);
                return newData;
            });
        }
    };

    // 작업 수정
    const editTask = (weekIndex: number, taskId: number): void => {
        const task: Task | undefined = weeklyData[weekIndex].tasks.find((t: Task) => t.id === taskId);
        if (!task) return;

        const newText: string | null = prompt("작업 내용을 수정하세요:", task.text);
        if (newText && newText.trim()) {
            setWeeklyData((prev: WeeklyDataArray) => {
                const newData: WeeklyDataArray = [...prev];
                const taskIndex: number = newData[weekIndex].tasks.findIndex((t: Task) => t.id === taskId);
                if (taskIndex !== -1) {
                    newData[weekIndex].tasks[taskIndex].text = newText.trim();
                }
                return newData;
            });
        }
    };

    const formatDate = (date: Date): string => {
        return `${date.getMonth() + 1}/${date.getDate()}`;
    };

    const currentWeek: number = getCurrentWeek();
    const selectedWeekData: WeekData = weeklyData[selectedWeek];
    const completedTasks: Task[] = selectedWeekData.tasks.filter((task: Task) => task.completed);
    const incompleteTasks: Task[] = selectedWeekData.tasks.filter((task: Task) => !task.completed);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-4xl font-bold text-blue-700 flex items-center gap-3">
                        <Target className="h-10 w-10" />
                        CTI Task Master 주차별 관리
                    </h1>
                    <Badge variant="outline" className="text-xl px-6 py-3 bg-blue-50 text-blue-700 border-blue-200">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        전체 {overallProgress}% 완료
                    </Badge>
                </div>

                {/* 전체 프로그레스 바 */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden shadow-inner">
                    <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-700 ease-out shadow-sm"
                        style={{ width: `${overallProgress}%` }}
                    />
                </div>

                {/* 주차 네비게이션 */}
                <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
                    <button
                        onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
                        disabled={selectedWeek === 0}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        type="button"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                            {selectedWeek + 1}주차 ({formatDate(selectedWeekData.startDate)} - {formatDate(selectedWeekData.endDate)})
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{selectedWeekData.title}</p>
                        <p className="text-gray-500 text-xs mt-1">{selectedWeekData.description}</p>
                        {selectedWeek === currentWeek && (
                            <Badge className="mt-2 bg-green-100 text-green-700 border-green-200">
                                <Clock className="h-3 w-3 mr-1" />
                                현재 주차
                            </Badge>
                        )}
                    </div>

                    <button
                        onClick={() => setSelectedWeek(Math.min(weeklyData.length - 1, selectedWeek + 1))}
                        disabled={selectedWeek === weeklyData.length - 1}
                        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        type="button"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* 메인 주차 상세 정보 */}
                <div className="xl:col-span-2">
                    <Card className="shadow-xl bg-white border-0">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl text-blue-800 flex items-center gap-3">
                                    <Calendar className="h-6 w-6" />
                                    {selectedWeek + 1}주차 작업 목록
                                </CardTitle>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => addNewTask(selectedWeek)}
                                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        title="새 작업 추가"
                                        type="button"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {getWeekProgress(selectedWeekData)}%
                                        </div>
                                        <div className="text-sm text-gray-600">완료율</div>
                                    </div>
                                </div>
                            </div>
                            <CardDescription className="text-blue-700 text-lg mt-2">
                                {selectedWeekData.title}
                            </CardDescription>
                            <p className="text-blue-600 text-sm">{selectedWeekData.description}</p>

                            {/* 주차별 프로그레스 바 */}
                            <div className="w-full bg-blue-100 rounded-full h-2 mt-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${getWeekProgress(selectedWeekData)}%` }}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* 완료된 작업 */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        완료된 작업 ({completedTasks.length}개)
                                    </h3>
                                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                        {completedTasks.map((task: Task) => (
                                            <div
                                                key={task.id}
                                                className="group flex items-start gap-3 p-3 rounded-lg border bg-green-50 border-green-200 hover:bg-green-100 transition-all duration-200"
                                            >
                                                <button
                                                    onClick={() => toggleTaskCompletion(selectedWeek, task.id)}
                                                    className="flex-shrink-0 mt-1"
                                                    type="button"
                                                >
                                                    <div className="w-5 h-5 rounded-lg border-2 bg-green-500 border-green-500 flex items-center justify-center">
                                                        <CheckCircle className="h-3 w-3 text-white" />
                                                    </div>
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="text-sm leading-relaxed text-green-800 break-words">
                                                            {task.text}
                                                        </span>
                                                        <button
                                                            onClick={() => editTask(selectedWeek, task.id)}
                                                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                                            title="작업 수정"
                                                            type="button"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {completedTasks.length === 0 && (
                                            <div className="text-center text-gray-500 py-8">
                                                완료된 작업이 없습니다.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 진행 중인 작업 */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold text-orange-700 flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        진행 중인 작업 ({incompleteTasks.length}개)
                                    </h3>
                                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                        {incompleteTasks.map((task: Task) => (
                                            <div
                                                key={task.id}
                                                className="group flex items-start gap-3 p-3 rounded-lg border bg-white border-gray-200 hover:bg-gray-50 transition-all duration-200"
                                            >
                                                <button
                                                    onClick={() => toggleTaskCompletion(selectedWeek, task.id)}
                                                    className="flex-shrink-0 mt-1"
                                                    type="button"
                                                >
                                                    <div className="w-5 h-5 rounded-lg border-2 bg-white border-gray-300 hover:border-green-400 transition-colors flex items-center justify-center">
                                                        <div className="w-2 h-2 bg-transparent rounded-sm" />
                                                    </div>
                                                </button>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="text-sm leading-relaxed text-gray-700 group-hover:text-gray-900 transition-colors break-words">
                                                            {task.text}
                                                        </span>
                                                        <button
                                                            onClick={() => editTask(selectedWeek, task.id)}
                                                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                                                            title="작업 수정"
                                                            type="button"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {incompleteTasks.length === 0 && (
                                            <div className="text-center text-gray-500 py-8">
                                                모든 작업이 완료되었습니다! 🎉
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 사이드바 - 주차별 요약 */}
                <div className="space-y-6">
                    {/* 전체 요약 */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                프로젝트 요약
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">총 주차</span>
                                    <span className="font-semibold">{weeklyData.length}주</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">총 작업</span>
                                    <span className="font-semibold">
                                        {weeklyData.reduce((sum: number, week: WeekData) => sum + week.tasks.length, 0)}개
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">완료 작업</span>
                                    <span className="font-semibold text-green-600">
                                        {weeklyData.reduce((sum: number, week: WeekData) =>
                                            sum + week.tasks.filter((task: Task) => task.completed).length, 0)}개
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">현재 주차</span>
                                    <span className="font-semibold text-blue-600">
                                        {currentWeek >= 0 ? `${currentWeek + 1}주차` : '시작 전'}
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 주차별 미니 뷰 */}
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                주차별 진행률
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {weeklyData.map((week: WeekData, index: number) => (
                                    <div
                                        key={week.weekNumber}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedWeek === index
                                            ? 'border-blue-300 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            } ${currentWeek === index ? 'ring-2 ring-green-200' : ''}`}
                                        onClick={() => setSelectedWeek(index)}
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-medium text-sm">
                                                {week.weekNumber}주차
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                {getWeekProgress(week)}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div
                                                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                                style={{ width: `${getWeekProgress(week)}%` }}
                                            />
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 truncate">
                                            {formatDate(week.startDate)} - {formatDate(week.endDate)}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1 truncate">
                                            {week.title}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default WeeklyTodoManager;