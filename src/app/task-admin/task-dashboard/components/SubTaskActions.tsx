import React, { useState } from 'react';
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useApiForDeleteSubTodo } from '@/hook/task/useApiForDeleteSubTodo';
import { useApiForUpdateSubTodo } from '@/hook/task/useApiForUpdateSubTodo';
import DialogForSubTodoUpdate from './DialogForSubTodoUpdate';
import { useApiForUpdateSubTodoAll } from '@/hook/task/useApiForSubTodoAll';

interface SubTaskActionsProps {
    taskId: string;
    todoId: string;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    editContent: string;
    originalContent: string;
    todo: {
        content: string;
        task_result_image: string | null;
        ref_task_note: string | null;
    };
}

const SubTaskActions: React.FC<SubTaskActionsProps> = ({
    taskId,
    todoId,
    isEditing,
    setIsEditing,
    editContent,
    originalContent,
    todo
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { mutate: deleteSubTodo } = useApiForDeleteSubTodo(taskId);
    const { mutate: updateSubTodo } = useApiForUpdateSubTodo(taskId);
    const { mutate: updateSubTodoAll } = useApiForUpdateSubTodoAll(taskId);

    const handleDelete = () => {
        if (confirm('삭제하시겠습니까?')) {
            deleteSubTodo(todoId);
        }
    };

    const handleUpdate = () => {
        if (editContent.trim() && editContent !== originalContent) {
            if (confirm('수정하시겠습니까?')) {
                updateSubTodo({ id: todoId, content: editContent.trim() });
                setIsEditing(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    const handleDialogUpdate = (updatedData: {
        content: string;
        task_result_image: string | null;
        ref_task_note: string | null;
    }) => {
        console.log('Updated data:', updatedData);
        updateSubTodoAll({
            id: todoId,
            ...updatedData
        });
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleEditClick = (e: React.MouseEvent) => {
        if (e.ctrlKey || e.metaKey) {  // metaKey for Mac
            setIsDialogOpen(true);
        } else {
            setIsEditing(true);
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="p-1 hover:bg-green-100 rounded"
                        >
                            <Check className="w-4 h-4 text-green-500" />
                        </button>
                        <button
                            onClick={handleCancel}
                            className="p-1 hover:bg-red-100 rounded"
                        >
                            <X className="w-4 h-4 text-red-500" />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleEditClick}
                            className="p-1 hover:bg-gray-100 rounded"
                            title="Click: 인라인 수정 / Ctrl+Click: 다이얼로그로 수정"
                        >
                            <Pencil className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <Trash2 className="w-4 h-4 text-gray-500" />
                        </button>
                    </>
                )}
            </div>

            <DialogForSubTodoUpdate
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                todo={todo}
                onUpdate={handleDialogUpdate}
            />
        </>
    );
};

export default SubTaskActions;