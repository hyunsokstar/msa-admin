// components/TabMenu.tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import SubTasks from "./SubTasks";
import ApiSpecs from "./ApiSpecs";
import { TaskDetail } from "@/types/task/typeForTaskDetail";
import CodeReviews from "@/app/api-spec-admin/api-spec-dashboard/CodeReviews";

interface TabMenuProps {
    taskDetail: TaskDetail;
    isLoading: boolean;
}

const TabMenu: React.FC<TabMenuProps> = ({ taskDetail, isLoading }) => {
    const [activeTab, setActiveTab] = useState("subtodo");

    const tabs = [
        { id: "subtodo", label: "Sub Todo" },
        { id: "api", label: "API" },
        { id: "code_review", label: "Code Review" },
        { id: "messages", label: "Messages" },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "subtodo":
                return (
                    <SubTasks
                        taskId={taskDetail?.id}
                        isLoading={isLoading}
                        subTodos={taskDetail?.sub_todos || []}
                    />
                );
            case "api":
                return (
                    <ApiSpecs
                        taskId={taskDetail?.id}
                        isLoading={isLoading}
                        apiSpecs={taskDetail?.task_api_mappings || []}
                    />
                );
            case "code_review":
                return (
                    <CodeReviews
                        taskId={taskDetail?.id}
                        isLoading={isLoading}
                        codeReviews={taskDetail?.task_code_reviews || []}
                    />
                );
            case "messages":
                return <div className="p-4">Messages Content</div>;
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                                activeTab === tab.id
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-0">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TabMenu;