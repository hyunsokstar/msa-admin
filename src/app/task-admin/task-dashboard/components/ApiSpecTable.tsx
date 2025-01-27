// src/app/task-admin/task-dashboard/components/ApiSpecTable.tsx
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import IDialogButtonForTestApi from "./IDialogButtonForTestApi";
import CommonButton2 from "@/components/common/CommonButton2";
import { Pencil, Trash2 } from "lucide-react";

interface ApiSpecTableProps {
    apiSpecs: TaskApiSpec[] | null;
    selectedItems: Set<string>;
    isAllSelected: boolean;
    onSelectAll: () => void;
    onSelectItem: (id: string) => void;
    onEdit: (spec: TaskApiSpec) => void;
    onDelete: (spec: TaskApiSpec) => void;
}

const ApiSpecTable: React.FC<ApiSpecTableProps> = ({
    apiSpecs,
    selectedItems,
    isAllSelected,
    onSelectAll,
    onSelectItem,
    onEdit,
    onDelete,
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
                                    <CommonButton2
                                        variant="ghost"
                                        icon={<Pencil className="h-4 w-4" />}
                                        onClick={() => onEdit(spec)}
                                        className="px-2"
                                    />
                                    <IDialogButtonForTestApi apiSpec={spec} />
                                    <CommonButton2
                                        variant="ghost"
                                        icon={<Trash2 className="h-4 w-4" />}
                                        onClick={() => onDelete(spec)}
                                        className="text-red-600 hover:text-red-700 px-2"
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