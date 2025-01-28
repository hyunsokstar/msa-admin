// components/common/CommonTabMenu.tsx
"use client";

import React from "react";
import { Tab } from "@headlessui/react";
import { cn } from "@/lib/utils";

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface CommonTabMenuProps {
    tabs: TabItem[];
    defaultIndex?: number;
    className?: string;
    variant?: "default" | "pills" | "underline";
}

const CommonTabMenu: React.FC<CommonTabMenuProps> = ({
    tabs,
    defaultIndex = 0,
    className,
    variant = "default"
}) => {
    const variants = {
        default: {
            list: "flex space-x-1 rounded-xl bg-blue-900/20 p-1",
            tab: "w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all",
            active: "bg-white text-blue-700 shadow",
            inactive: "text-blue-400 hover:bg-white/[0.12] hover:text-blue-600"
        },
        pills: {
            list: "flex space-x-2",
            tab: "rounded-full px-4 py-2 text-sm font-medium transition-all",
            active: "bg-blue-600 text-white",
            inactive: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        },
        underline: {
            list: "flex border-b border-gray-200",
            tab: "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-all",
            active: "border-blue-500 text-blue-600",
            inactive: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        }
    };

    return (
        <div className={cn("w-full", className)}>
            <Tab.Group defaultIndex={defaultIndex}>
                <Tab.List className={variants[variant].list}>
                    {tabs.map((tab) => (
                        <Tab
                            key={tab.id}
                            className={({ selected }) =>
                                cn(
                                    variants[variant].tab,
                                    selected
                                        ? variants[variant].active
                                        : variants[variant].inactive
                                )
                            }
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {tabs.map((tab) => (
                        <Tab.Panel
                            key={tab.id}
                            className={cn(
                                "rounded-xl p-3",
                                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                            )}
                        >
                            {tab.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default CommonTabMenu;
