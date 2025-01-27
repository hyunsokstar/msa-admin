// SubTaskRow.tsx
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import SubTaskActions from "./SubTaskActions";
import CommonSwitch from "@/components/common/CommonSwitch";
import { UseMutationResult } from "@tanstack/react-query";
import { toast, ToastPosition } from "react-toastify";

interface SubTaskRowProps {
    taskId: string;
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
    updateStatusMutation,
    taskId
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(todo.content);

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
            <TableCell className="text-center">
                <Checkbox checked={isSelected} onCheckedChange={onSelect} />
            </TableCell>
            <TableCell className="text-center">
                {isEditing ? (
                    <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="max-w-sm mx-auto"
                    />
                ) : (
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-700">
                            {todo.content}
                        </span>
                        {todo.is_completed && (
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500">
                                <Check className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>
                )}
            </TableCell>
            <TableCell className="text-center">
                <div className="flex justify-center">
                    <CommonSwitch
                        id={`task-${todo.id}`}
                        checked={todo.is_completed}
                        onCheckedChange={handleStatusChange}
                    />
                </div>
            </TableCell>
            <TableCell className="text-center">
                <div className="flex justify-center">
                    <SubTaskActions
                        taskId={taskId}
                        todoId={todo.id}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editContent={editContent}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SubTaskRow;