"use client";
import React, { useState, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/lib/styles.css';

interface Todo {
    id: number;
    title: string;
    color: string;
}

const ProjectTimelineStep1 = () => {
    // 샘플 데이터
    const [todos] = useState<Todo[]>([
        { id: 1, title: "기획서 작성", color: "blue" },
        { id: 2, title: "디자인 시안", color: "green" },
        { id: 3, title: "개발 구현", color: "purple" },
        { id: 4, title: "테스트 진행", color: "orange" },
        { id: 5, title: "배포 준비", color: "red" },
    ]);

    // 날짜 생성 (6월 16일부터 9월 16일까지 - 92일)
    const generateDates = () => {
        const dates = [];
        const startDate = new Date(2025, 5, 16); // 2025년 6월 16일
        const endDate = new Date(2025, 8, 16);   // 2025년 9월 16일

        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push({
                date: new Date(currentDate),
                dateStr: currentDate.toISOString().split('T')[0],
                month: currentDate.getMonth() + 1,
                day: currentDate.getDate(),
                dayName: currentDate.toLocaleDateString('ko-KR', { weekday: 'short' }),
                isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const dates = generateDates();

    // 컬럼 정의
    const columns = useMemo(() => {
        const baseColumns = [
            {
                key: 'title',
                name: 'Todo',
                width: 200,
                frozen: true,
                resizable: true,
                renderCell: ({ row }: { row: Todo }) => (
                    <div className="flex items-center h-full px-2">
                        <div
                            className={`w-3 h-3 rounded-full mr-2`}
                            style={{ backgroundColor: getColorValue(row.color) }}
                        />
                        <span className="font-medium">{row.title}</span>
                    </div>
                )
            }
        ];

        // 날짜 컬럼들 추가
        const dateColumns = dates.map(dateInfo => ({
            key: dateInfo.dateStr,
            name: `${dateInfo.month}/${dateInfo.day}`,
            width: 35,
            resizable: true,
            headerCellClass: dateInfo.isWeekend ? 'weekend-header' : 'weekday-header',
            renderCell: ({ row, column }: { row: Todo; column: any }) => (
                <div
                    className={`w-full h-full flex items-center justify-center cursor-pointer hover:bg-blue-100 ${dateInfo.isWeekend ? 'bg-red-50' : 'bg-white'
                        }`}
                    onClick={() => handleCellClick(row.id, column.key)}
                >
                    <div className="w-6 h-6 border border-gray-300 rounded hover:border-blue-500 transition-colors">
                        {/* 나중에 체크 상태 표시 */}
                    </div>
                </div>
            )
        }));

        return [...baseColumns, ...dateColumns];
    }, [dates]);

    // 색상 값 변환 함수
    const getColorValue = (color: string) => {
        const colorMap: Record<string, string> = {
            blue: '#3b82f6',
            green: '#10b981',
            purple: '#8b5cf6',
            orange: '#f59e0b',
            red: '#ef4444'
        };
        return colorMap[color] || '#6b7280';
    };

    // 셀 클릭 핸들러 (Step 2에서 구현 예정)
    const handleCellClick = (todoId: number, dateStr: string) => {
        console.log(`Clicked: Todo ${todoId}, Date ${dateStr}`);
    };

    // 행 데이터 준비
    const rows = todos.map(todo => ({
        ...todo,
        // 날짜별 데이터도 나중에 추가 예정
    }));

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <style jsx>{`
        .weekend-header {
          background-color: #fef2f2 !important;
          color: #dc2626 !important;
          font-weight: 600;
        }
        .weekday-header {
          background-color: #f9fafb !important;
          font-weight: 600;
        }
        .rdg {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
      `}</style>

            <h1 className="text-2xl font-bold mb-6">프로젝트 기간 시각화 - Step 1 (react-data-grid)</h1>

            <div className="bg-white rounded-lg shadow-lg p-4">
                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        기간: 2025년 6월 16일 ~ 9월 16일 (총 {dates.length}일)
                    </p>
                </div>

                <div style={{ height: '400px', width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        className="rdg-light"
                        style={{ height: '100%' }}
                        headerRowHeight={35}
                        rowHeight={40}
                    />
                </div>
            </div>

            {/* 월별 구분 표시 */}
            <div className="mt-6 grid grid-cols-4 gap-4">
                {[6, 7, 8, 9].map(month => {
                    const monthDates = dates.filter(d => d.month === month);
                    return (
                        <div key={month} className="bg-white p-3 rounded-lg shadow">
                            <h3 className="font-semibold text-center">{month}월</h3>
                            <p className="text-sm text-gray-600 text-center">
                                {monthDates.length}일
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* 현재 상태 표시 */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Step 1 완료 사항 (react-data-grid):</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>react-data-grid 기본 설정 완료</li>
                    <li>Todo 컬럼 고정 (frozen)</li>
                    <li>92개 날짜 컬럼 동적 생성</li>
                    <li>컬럼 크기 조절 가능 (resizable)</li>
                    <li>주말 구분 (헤더 색상)</li>
                    <li>셀 클릭 이벤트 준비</li>
                </ul>
            </div>

            {/* 다음 단계 미리보기 */}
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold mb-2">다음 단계 (Step 2):</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>체크박스 상태 관리 (useState)</li>
                    <li>셀 클릭 시 색상 토글</li>
                    <li>Todo별 다른 색상으로 체크 표시</li>
                    <li>선택된 날짜 데이터 구조 구현</li>
                </ul>
            </div>
        </div>
    );
};

export default ProjectTimelineStep1;