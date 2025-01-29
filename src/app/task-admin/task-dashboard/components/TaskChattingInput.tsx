// components/TaskChattingInput.tsx
"use client";

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import useApiForCreateTaskChat from '@/hook/task/useApiForCreateTaskChat';

interface Props {
    taskId: string;
    onSuccess?: () => void;
}

const TaskChattingInput: React.FC<Props> = ({ taskId, onSuccess }) => {
    const [message, setMessage] = useState('');
    const { isAuthenticated } = useUserStore();
    const { mutate, isPending } = useApiForCreateTaskChat(taskId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('로그인이 필요합니다.');
            return;
        }

        if (!message.trim()) {
            return;
        }

        mutate(
            { taskId, message: message.trim() },
            {
                onSuccess: () => {
                    setMessage('');
                    onSuccess?.();
                }
            }
        );
    };

    return (
        <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isPending}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending ? '전송 중...' : '전송'}
                </button>
            </form>
        </div>
    );
};

export default TaskChattingInput;