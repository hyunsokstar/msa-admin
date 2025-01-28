// src/app/task-admin/task-dashboard/components/ApiSpecTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import IDialogButtonForTestApi from "./IDialogButtonForTestApi";
import IDialogButtonForEditApi from "./IDialogButtonForEditApi";
import IDialogButtonForDeleteApi from "./IDialogButtonForDeleteApi";

interface ApiSpecTableProps {
    taskId: string;
    apiSpecs: TaskApiSpec[] | null;
    selectedItems: Set<string>;
    isAllSelected: boolean;
    onSelectAll: () => void;
    onSelectItem: (id: string) => void;
}

const ApiSpecTable: React.FC<ApiSpecTableProps> = ({
    taskId,
    apiSpecs,
    selectedItems,
    isAllSelected,
    onSelectAll,
    onSelectItem,
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-12 text-center">
                        <Checkbox checked={isAllSelected} onCheckedChange={onSelectAll} />
                    </TableHead>
                    <TableHead className="w-24 text-center">Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-48 text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {apiSpecs && apiSpecs.length > 0 ? (
                    apiSpecs.map((spec) => (
                        <TableRow key={spec.id}>
                            <TableCell className="text-center">
                                <Checkbox
                                    checked={selectedItems.has(spec.id)}
                                    onCheckedChange={() => onSelectItem(spec.id)}
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
                            <TableCell>
                                <div className="flex justify-center gap-2">
                                    <IDialogButtonForEditApi
                                        taskId={taskId}
                                        apiSpec={spec}
                                    />
                                    <IDialogButtonForTestApi apiSpec={spec} />
                                    <IDialogButtonForDeleteApi
                                        taskId={taskId}
                                        apiSpec={spec}
                                    />
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
    );
};

export default ApiSpecTable;