// src\api\apiForTaskHistory.ts
// src/api/task/apiForTaskHistory.ts
"use client";

import { TaskDashboard } from "@/types/task/typeForTaskDashboard";

export async function apiForGetTaskHistoryList(): Promise<TaskDashboard[]> {
    const response = await fetch('/api/task-history', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch task history data');
    }

    const { data } = await response.json();
    return data as TaskDashboard[];
}

// todo:
// apiForMoveTaskInfoFromArchivedListToTaskHistory 함수 구현
// 필요한것 서버 라우트
// custom hook 

export async function apiForMoveTaskInfoFromArchivedListToTaskHistory(taskIds: string[]): Promise<void> {
    const response = await fetch("/api/task-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskIds }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to move tasks to history");
    }
}
