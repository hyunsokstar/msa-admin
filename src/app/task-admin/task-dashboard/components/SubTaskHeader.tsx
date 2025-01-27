"use client"
import React, { useState } from 'react';
import { PlusCircle, Trash2, Save } from "lucide-react";
import CommonButton2 from '@/components/common/CommonButton2';
import useApiForCreateSubTodo from '@/hook/task/useApiForCreateSubTodo';

interface SubTaskHeaderProps {
    selectedCount: number;
    taskId: string;
}

const SubTaskHeader: React.FC<SubTaskHeaderProps> = ({ taskId, selectedCount }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [content, setContent] = useState('');
    const { mutate: createSubTodo, isPending } = useApiForCreateSubTodo(taskId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        createSubTodo(
            { task_id: taskId, content },
            {
                onSuccess: () => {
                    setContent('');
                    setIsFormOpen(false);
                }
            }
        );
    };

    return (
        <div className='mt-2'>
            <div className="flex items-center justify-between pb-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sub Tasks
                </h3>
                <div className="flex items-center gap-3">
                    <CommonButton2
                        variant="ghost"
                        disabled={selectedCount === 0}
                        icon={<Trash2 className="w-4 h-4" />}
                    >
                        Delete
                    </CommonButton2>
                    <CommonButton2
                        variant="ghost"
                        onClick={() => setIsFormOpen(!isFormOpen)}
                        icon={<PlusCircle className="w-4 h-4" />}
                    >
                        Add Task
                    </CommonButton2>
                </div>
            </div>

            <div
                className={`transform transition-all duration-300 ease-out ${isFormOpen
                        ? 'h-10 opacity-100 mb-0'
                        : 'h-0 opacity-0 mb-0'
                    }`}
            >
                <form onSubmit={handleSubmit} className="pt-2">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter subtask content"
                            className="flex-1 w-full px-2 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-950 dark:border-gray-800 dark:text-gray-200"
                        />
                        <CommonButton2
                            type="submit"
                            loading={isPending}
                            icon={<Save className="w-4 h-4" />}
                        >
                            Save
                        </CommonButton2>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubTaskHeader;