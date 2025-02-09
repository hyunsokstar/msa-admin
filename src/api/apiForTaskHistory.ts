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
