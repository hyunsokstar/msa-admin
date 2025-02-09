// src/app/task-admin/task-history/page.tsx
"use client";

import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useApiForGetTaskHistory } from '@/hook/task/useApiForTaskHistory';
import ArchivedTaskList from '../task-dashboard/components/ArchivedTaskList';

const TaskHistoryPage = () => {
    const { data: taskHistory, isLoading, error } = useApiForGetTaskHistory();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertDescription>작업 이력을 불러오는데 실패했습니다.</AlertDescription>
            </Alert>
        );
    }

    
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">작업 이력</h1>
            <ArchivedTaskList archivedTasks={taskHistory || []} />
        </div>
    );
};

export default TaskHistoryPage;