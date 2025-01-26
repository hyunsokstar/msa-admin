// SubTaskRow.tsx
"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import SubTaskActions from "./SubTaskActions";
import CommonSwitch from "@/components/common/CommonSwitch";
import { UseMutationResult } from "@tanstack/react-query";
import { toast, ToastPosition } from "react-toastify";

interface SubTaskRowProps {
    todo: {
        id: string;
        content: string;
        is_completed: boolean;
    };
    isSelected: boolean;
    onSelect: () => void;
    updateStatusMutation: UseMutationResult<any, Error, { id: string; isCompleted: boolean }>;
}

const SubTaskRow: React.FC<SubTaskRowProps> = ({
    todo,
    isSelected,
    onSelect,
    updateStatusMutation
}) => {

    // react-toastify 선언
    const toastOptions = {
        position: "top-center" as ToastPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    const handleStatusChange = async (checked: boolean) => {
        try {
            await updateStatusMutation.mutateAsync({
                id: todo.id,
                isCompleted: checked
            });
            toast.success(`Task status ${checked ? 'completed' : 'uncompleted'} successfully`, toastOptions);
        } catch (error) {
            console.error('Failed to update status:', error);
            toast.error('Failed to update task status', toastOptions);
        }
    };

    return (
        <TableRow>
            <TableCell>
                <Checkbox checked={isSelected} onCheckedChange={onSelect} />
            </TableCell>
            <TableCell>
                <span className={cn(
                    "text-sm text-gray-700",
                    todo.is_completed && "text-gray-400 line-through"
                )}>
                    {todo.content}
                </span>
            </TableCell>
            <TableCell>
                <CommonSwitch
                    id={`task-${todo.id}`}
                    checked={todo.is_completed}
                    onCheckedChange={handleStatusChange}
                />
            </TableCell>
            <TableCell>
                <SubTaskActions todoId={todo.id} />
            </TableCell>
        </TableRow>
    );
};

export default SubTaskRow;