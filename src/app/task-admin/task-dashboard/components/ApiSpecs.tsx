// src/app/task-admin/task-dashboard/components/ApiSpecs.tsx
"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import IDialogButtonForTestApi from "./IDialogButtonForTestApi";

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

    if (isLoading) return <div className="text-sm text-gray-500">Loading API specs...</div>;

    return (
        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">API Specifications</h2>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
                    onClick={() => {/* TODO: Add new API spec */ }}
                >
                    <span>Add API</span>
                </button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-12 text-center">
                            <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                        </TableHead>
                        <TableHead className="w-24 text-center">Method</TableHead>
                        <TableHead>Endpoint</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-32 text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apiSpecs && apiSpecs.length > 0 ? (
                        apiSpecs.map((spec) => (
                            <TableRow key={spec.id}>
                                <TableCell className="text-center">
                                    <Checkbox
                                        checked={selectedItems.has(spec.id)}
                                        onCheckedChange={() => handleSelectItem(spec.id)}
                                    />
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge className={cn("font-mono", getMethodColor(spec.method))}>
                                        {spec.method}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-mono text-sm">
                                    {spec.endpoint}
                                </TableCell>
                                <TableCell>
                                    {spec.description || "-"}
                                </TableCell>
                                <TableCell className="text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="p-2 hover:bg-gray-100 rounded"
                                            onClick={() => {/* TODO: Edit API spec */ }}
                                        >
                                            Edit
                                        </button>
                                        <IDialogButtonForTestApi apiSpec={spec} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                                No API specifications added yet
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApiSpecs;