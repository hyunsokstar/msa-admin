




// ===== 5. 수정된 메인 페이지 =====
// src/pages/ProjectTimelineStep1.tsx (또는 적절한 경로)

"use client";
import React from 'react';
import IGridTableForTaskSchedule from './components/timeline/IGridTableForTaskSchedule';
import { generateDateRange } from './utils/dateUtilsForTaskSchedule';
import MonthSelector from './components/timeline/MonthSelector';

const ProjectTimelineStep1 = () => {
    const startDate = new Date(2025, 5, 16); // 2025년 6월 16일
    const endDate = new Date(2025, 8, 16);   // 2025년 9월 16일
    const dates = generateDateRange(startDate, endDate);

    const handleMonthSelect = (month: number) => {
        console.log(`${month}월 선택됨`);
        // 월별 필터링 로직 추가 가능
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen" >
            <h1 className="text-2xl font-bold mb-6" > 프로젝트 기간 시각화 - 리팩토링 버전 </h1>

            < div className="bg-white rounded-lg shadow-lg p-4 mb-6" >
                <IGridTableForTaskSchedule
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>

            {/* 월별 구분 표시 */}
            <div className="mb-6" >
                <h2 className="text-lg font-semibold mb-3" > 월별 통계 </h2>
                < MonthSelector
                    dates={dates}
                    onMonthSelect={handleMonthSelect}
                />
            </div>
        </div>
    );
};

export default ProjectTimelineStep1;