"use client";

import React from 'react'
import IDialogButtonForTaskDashBoardDetail from '../components/IDialogButtonForTaskDashBoardDetail';
import { useRouter } from 'next/navigation';
import { apiForGetTaskSubTodoList } from '@/api/task/apiForTaskDashBoardDetail';
import { useQuery } from '@tanstack/react-query';

interface Props {
    params: Promise<{
        id: string
    }>
}

const TaskDetailPage = ({ params }: Props) => {
    const router = useRouter();
    const { id } = React.use(params);

    const { data: taskDetail, isLoading } = useQuery({
        queryKey: ['taskDetail', id],
        queryFn: () => apiForGetTaskSubTodoList(id),
    });

    const handleClose = () => {
        router.back();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!taskDetail) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50">
            <IDialogButtonForTaskDashBoardDetail
                id={id}
                title={taskDetail.title}
                description={taskDetail.description || ""}
                imageUrl={taskDetail.screen_url || "/placeholder-image.jpg"}
                className="hidden"
                defaultOpen={true}
                onOpenChange={handleClose}
                taskDetail={taskDetail}
            />
        </div>
    )
}

export default TaskDetailPage