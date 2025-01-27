// src/app/task-admin/task-dashboard/components/ApiSpecs.tsx
"use client";
import React, { useState } from "react";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import ApiSpecTable from "./ApiSpecTable";
import IDialogButtonForCreateApi from "./IDialogButtonForCreateApi";

interface ApiSpecsProps {
    taskId: string;
    isLoading: boolean;
    apiSpecs: TaskApiSpec[] | null;
}

const ApiSpecs: React.FC<ApiSpecsProps> = ({ taskId, isLoading, apiSpecs }) => {
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [isAllSelected, setIsAllSelected] = useState(false);

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(apiSpecs?.map((spec) => spec.id) || []));
        }
        setIsAllSelected(!isAllSelected);
    };

    const handleSelectItem = (id: string) => {
        const newSelected = new Set(selectedItems);
        if (selectedItems.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedItems(newSelected);
        setIsAllSelected(newSelected.size === (apiSpecs?.length || 0));
    };

    const handleEdit = (spec: TaskApiSpec) => {
        // TODO: Implement edit functionality
        console.log('Edit spec:', spec);
    };

    const handleDelete = (spec: TaskApiSpec) => {
        // TODO: Implement delete functionality
        console.log('Delete spec:', spec);
    };

    if (isLoading) return <div className="text-sm text-gray-500">Loading API specs...</div>;

    return (
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">API Specifications</h2>
                <IDialogButtonForCreateApi taskId={taskId} />
            </div>

            <ApiSpecTable
                apiSpecs={apiSpecs}
                selectedItems={selectedItems}
                isAllSelected={isAllSelected}
                onSelectAll={handleSelectAll}
                onSelectItem={handleSelectItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ApiSpecs;