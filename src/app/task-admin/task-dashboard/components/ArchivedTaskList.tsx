import React from 'react';
import DataGrid from 'react-data-grid';
import { TaskDashboard } from '@/types/task/typeForTaskDashboard';
import 'react-data-grid/lib/styles.css';

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const columns = [
        {
            key: 'title',
            name: '제목'
        },
        {
            key: 'description',
            name: '설명'
        },
        {
            key: 'status',
            name: '상태'
        },
        {
            key: 'created_by_user_name',
            name: '생성자',
            formatter: ({ row }: { row: TaskDashboard }) => {
                return row.created_by_user?.full_name || '';
            }
        }
    ];

    const rows = archivedTasks.map(task => ({
        ...task,
        created_by_user_name: task.created_by_user?.full_name || ''
    }));

    console.log("archivedTasks at 컴퍼넌트 : ", archivedTasks);

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">아카이브된 작업</h2>
            <DataGrid
                columns={columns}
                rows={rows}
                className="h-[400px]"
            />
        </div>
    );
};

export default ArchivedTaskList;