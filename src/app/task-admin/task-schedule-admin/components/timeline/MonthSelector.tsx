// ===== 3. 월별 선택 컴포넌트 =====
// src/components/timeline/MonthSelector.tsx

import React from 'react';
import { DateInfo } from '../../utils/dateUtilsForTaskSchedule';

interface MonthSelectorProps {
    dates: DateInfo[];
    onMonthSelect?: (month: number) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ dates, onMonthSelect }) => {
    const monthStats = [6, 7, 8, 9].map(month => {
        const monthDates = dates.filter(d => d.month === month);
        return {
            month,
            dayCount: monthDates.length
        };
    });

    return (
        <div className="grid grid-cols-4 gap-4">
            {monthStats.map(({ month, dayCount }) => (
                <div
                    key={month}
                    className="bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => onMonthSelect?.(month)}
                >
                    <h3 className="font-semibold text-center">{month}월</h3>
                    <p className="text-sm text-gray-600 text-center">
                        {dayCount}일
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MonthSelector;