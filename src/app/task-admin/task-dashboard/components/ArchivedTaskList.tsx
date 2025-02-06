// components/ArchivedTaskList.tsx
"use client";

import React, { useState, useCallback } from 'react';
import DataGrid, { Column, SelectColumn, DataGridProps } from 'react-data-grid';
import { TaskDashboard } from '@/types/task/typeForTaskDashboard';
import 'react-data-grid/lib/styles.css';

interface TaskDashboardWithUserName extends TaskDashboard {
    created_by_user_name: string;
}

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

    const columns: Column<TaskDashboardWithUserName>[] = [
        SelectColumn,
        {
            key: 'title',
            name: '제목',
        },
        {
            key: 'description',
            name: '설명',
        },
        {
            key: 'status',
            name: '상태',
        },
        {
            key: 'created_by_user_name',
            name: '생성자',
            renderCell: ({ row }) => row.created_by_user_name,
        },
    ];

    const rows: TaskDashboardWithUserName[] = archivedTasks.map((task) => ({
        ...task,
        created_by_user_name: task.created_by_user?.full_name || '',
    }));

    const onSelectedRowsChange = useCallback((newSelectedRows: Set<React.Key>) => {
        setSelectedRows(newSelectedRows);
    }, []);

    // Define rowKeyGetter to specify how to get the unique ID for each row
    const rowKeyGetter = useCallback((row: TaskDashboardWithUserName) => row.id, []);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">아카이브된 작업</h2>
            <DataGrid
                columns={columns}
                rows={rows}
                className="h-[400px]"
                selectedRows={selectedRows}
                onSelectedRowsChange={onSelectedRowsChange}
                rowKeyGetter={rowKeyGetter} // Add rowKeyGetter
            />
        </div>
    );
};

export default ArchivedTaskList;