import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import SubTaskActions from "./SubTaskActions";
import { UseMutationResult } from "@tanstack/react-query";
import { toast, ToastPosition } from "react-toastify";
import { cn } from "@/lib/utils";
import ImageForSubTodo from "./ImageForSubTodo";

interface SubTaskRowProps {
    taskId: string;
    todo: {
        id: string;
        content: string;
        is_completed: boolean;
        task_result_image: string | null;
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
            toast.success(`Task ${checked ? 'completed' : 'uncompleted'} successfully`, toastOptions);
        } catch (error) {
            console.error('Failed to update status:', error);
            toast.error('Failed to update task status', toastOptions);
        }
    };

    const handleImageUpdate = (newImage: string) => {
        // TODO: Implement image update API call
        console.log('Image update:', newImage);
        toast.info('Image update will be implemented soon');
    };

    return (
        <TableRow className="hover:bg-gray-50">
            <TableCell className="text-center w-12 p-0">
                <Checkbox
                    checked={todo.is_completed}
                    onCheckedChange={handleStatusChange}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
            </TableCell>
            <TableCell>
                {isEditing ? (
                    <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="max-w-sm"
                    />
                ) : (
                    <div className="flex items-center gap-2">
                        <span className={cn(
                            "text-sm text-gray-700",
                            todo.is_completed && "text-gray-400"
                        )}>
                            {todo.content}
                        </span>
                    </div>
                )}
            </TableCell>
            <TableCell className="text-center w-20">
                <ImageForSubTodo
                    image={todo.task_result_image}
                    onImageUpdate={handleImageUpdate} 
                    todoId={todo.id} 
                    taskId={taskId}                
                    />
            </TableCell>
            <TableCell className="text-center w-24">
                <div className="flex justify-center">
                    <SubTaskActions
                        taskId={taskId}
                        todoId={todo.id}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editContent={editContent}
                        originalContent={todo.content}
                    />
                </div>
            </TableCell>
        </TableRow>
    );
};

export default SubTaskRow;