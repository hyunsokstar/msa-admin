// components/TabMenu.tsx
"use client";

import React from "react";
import SubTasks from "./SubTasks";
import ApiSpecs from "./ApiSpecs";
import { TaskDetail } from "@/types/task/typeForTaskDetail";
import CommonTabMenu, { TabItem } from "@/components/common/CommonTabMenu";
import CodeReviews from "@/app/api-spec-admin/api-spec-dashboard/CodeReviews";
import TaskChattings from "./TaskChattings";

interface TabMenuProps {
    taskDetail: TaskDetail;
    isLoading: boolean;
}

const TabMenu: React.FC<TabMenuProps> = ({ taskDetail, isLoading }) => {
    const tabs: TabItem[] = [
        {
            id: "subtodo",
            label: "Sub Todo",
            content: (
                <SubTasks
                    taskId={taskDetail?.id}
                    isLoading={isLoading}
                    subTodos={taskDetail?.sub_todos || []}
                />
            )
        },
        {
            id: "api",
            label: "API",
            content: (
                <ApiSpecs
                    taskId={taskDetail?.id}
                    isLoading={isLoading}
                    apiSpecs={taskDetail?.task_api_mappings || []}
                />
            )
        },
        {
            id: "code_review",
            label: "Code Review",
            content: (
                <CodeReviews
                    taskId={taskDetail?.id}
                    isLoading={isLoading}
                    codeReviews={taskDetail?.task_code_reviews || []}
                />
            )
        },
        {
            id: "task-chattings",
            label: "Task Chattings",
            content: (
                <TaskChattings
                    taskId={taskDetail?.id}
                    ownerId={taskDetail?.created_by?.id}
                    isLoading={isLoading}
                    chattings={taskDetail?.task_chattings || []}
                />
            )
        }
    ];

    return (
        <CommonTabMenu
            tabs={tabs}
            variant="underline"
            className="w-full"
        />
    );
};

export default TabMenu;