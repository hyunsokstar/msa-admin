// src/utils/dateUtils.ts

export interface DateInfo {
    date: Date;
    dateStr: string;
    month: number;
    day: number;
    dayName: string;
    isWeekend: boolean;
}

export const generateDateRange = (startDate: Date, endDate: Date): DateInfo[] => {
    const dates: DateInfo[] = [];
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

export const getColorValue = (color: string): string => {
    const colorMap: Record<string, string> = {
        blue: '#3b82f6',
        green: '#10b981',
        purple: '#8b5cf6',
        orange: '#f59e0b',
        red: '#ef4444'
    };
    return colorMap[color] || '#6b7280';
};

export const getMonthlyStats = (dates: DateInfo[]) => {
    const monthStats = [6, 7, 8, 9].map(month => {
        const monthDates = dates.filter(d => d.month === month);
        return {
            month,
            dayCount: monthDates.length
        };
    });
    return monthStats;
};