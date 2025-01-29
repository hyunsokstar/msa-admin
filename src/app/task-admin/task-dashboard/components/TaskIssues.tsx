import React from 'react'

interface Props {
    taskId?: string;
    isLoading: boolean;
}

export const TaskIssues = ({ taskId, isLoading }: Props) => {
    return (
        <div className="p-4">
            task issue list {taskId}
        </div>
    )
}