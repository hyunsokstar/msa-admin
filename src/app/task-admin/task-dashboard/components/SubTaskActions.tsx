import React from 'react';
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useApiForDeleteSubTodo } from '@/hook/task/useApiForDeleteSubTodo';
import { useApiForUpdateSubTodo } from '@/hook/task/useApiForUpdateSubTodo';

interface SubTaskActionsProps {
    taskId: string;
    todoId: string;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    editContent: string;
    originalContent: string;
}

const SubTaskActions: React.FC<SubTaskActionsProps> = ({
    taskId,
    todoId,
    isEditing,
    setIsEditing,
    editContent,
    originalContent
}) => {
    const { mutate: deleteSubTodo } = useApiForDeleteSubTodo(taskId);
    const { mutate: updateSubTodo } = useApiForUpdateSubTodo(taskId);

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

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
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
                        onClick={() => setIsEditing(true)}
                        className="p-1 hover:bg-gray-100 rounded"
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
    );
};

export default SubTaskActions;