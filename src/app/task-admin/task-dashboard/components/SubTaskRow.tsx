import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import SubTaskActions from "./SubTaskActions";
import { UseMutationResult } from "@tanstack/react-query";
import { toast, ToastPosition } from "react-toastify";
import { cn } from "@/lib/utils";
import ImageForSubTodo from "./ImageForSubTodo";
import { Notebook, Link } from "lucide-react";

interface SubTaskRowProps {
    taskId: string;
    todo: {
        id: string;
        content: string;
        is_completed: boolean;
        task_result_image: string | null;
        ref_task_note: string | null;
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
        console.log('Image update:', newImage);
        toast.info('Image update will be implemented soon');
    };

    return (
        <TableRow className="hover:bg-gray-50 text-center">
            {/* ✅ 체크박스 중앙 정렬 */}
            <TableCell className="w-12 text-center p-0">
                <div className="flex justify-center items-center h-full min-h-[40px]">
                    <Checkbox
                        checked={todo.is_completed}
                        onCheckedChange={handleStatusChange}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                </div>
            </TableCell>

            {/* ✅ 내용 */}
            <TableCell className="text-left">
                {isEditing ? (
                    <Input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="max-w-sm"
                    />
                ) : (
                    <span className="text-sm text-gray-700">{todo.content}</span>
                )}
            </TableCell>

            {/* ✅ 참고 이미지 (정사각형 & 크기 조정) */}
            <TableCell className="w-16">
                <div className="flex justify-center items-center">
                    <ImageForSubTodo
                        image={todo.task_result_image}
                        onImageUpdate={handleImageUpdate}
                        todoId={todo.id}
                        taskId={taskId}
                    />
                </div>
            </TableCell>

            {/* ✅ 참고 노트 (아이콘으로 표시) */}
            <TableCell className="w-16">
                <div className="flex justify-center items-center">
                    {todo.ref_task_note ? (
                        <a href={todo.ref_task_note} target="_blank" rel="noopener noreferrer">
                            <Link className="h-5 w-5 text-blue-500" />
                        </a>
                    ) : (
                        <Notebook className="h-5 w-5 text-gray-200" />
                    )}
                </div>
            </TableCell>

            {/* ✅ 액션 버튼 */}
            <TableCell className="w-24">
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
