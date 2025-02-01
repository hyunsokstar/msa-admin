// components/common/CommonTabMenu2.tsx
"use client";

import React from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { TabItem } from "./CommonTabMenu";

interface CommonTabMenu2Props {
    tabs: TabItem[];
    defaultIndex?: number;
    className?: string;
}

const CommonTabMenu2: React.FC<CommonTabMenu2Props> = ({
    tabs,
    defaultIndex = 0,
    className,
}) => {
    return (
        <div className={cn("w-full", className)}>
            <Tab.Group defaultIndex={defaultIndex}>
                <Tab.List className="flex space-x-4 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.id}
                            className={({ selected }) =>
                                cn(
                                    "px-4 py-2 text-sm font-medium outline-none",
                                    "border-b-2 -mb-px",
                                    "transition-all duration-200",
                                    selected
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                )
                            }
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-4">
                    {tabs.map((tab) => (
                        <Tab.Panel
                            key={tab.id}
                            className="outline-none"
                        >
                            {tab.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default CommonTabMenu2;