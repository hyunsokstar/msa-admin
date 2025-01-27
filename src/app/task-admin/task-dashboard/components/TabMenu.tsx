"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import SubTasks from "./SubTasks";

interface TabMenuProps {
    taskDetail: any; // API 응답 타입에 맞게 수정 가능
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
                {activeTab === "subtodo" && (
                    <SubTasks
                        taskId={taskDetail?.id}
                        isLoading={isLoading}
                        subTodos={taskDetail?.sub_todos || []}
                    />
                )}
                {activeTab === "api" && <div className="p-4">API Content</div>}
                {activeTab === "code_review" && (
                    <div className="p-4">Code Review Content</div>
                )}
                {activeTab === "messages" && <div className="p-4">Messages Content</div>}
            </div>
        </div>
    );
};

export default TabMenu;
