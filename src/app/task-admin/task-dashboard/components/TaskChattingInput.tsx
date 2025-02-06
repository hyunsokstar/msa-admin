// components/TaskChattingInput.tsx
"use client";

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import ISelectBoxForTaskChatting from './ISelectBoxForTaskChatting';
import { useApiForCreateCommonChat } from '@/hook/main/useApiForCreateCommonChat';
import { useApiForCreateTaskChat } from '@/hook/task/useApiForCreateTaskChat';

interface Props {
    taskId: string;
    onSuccess?: () => void;
}

const TaskChattingInput: React.FC<Props> = ({ taskId, onSuccess }) => {
    const [message, setMessage] = useState('');
    const [selectedUserId, setSelectedUserId] = useState('all');
    const { isAuthenticated, user } = useUserStore();
    const { mutate: createCommonChat, isPending: isCommonPending } = useApiForCreateCommonChat();
    const { mutate: createTaskChat, isPending: isTaskPending } = useApiForCreateTaskChat(taskId);

    const isPending = isCommonPending || isTaskPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            toast.error('로그인이 필요합니다.');
            return;
        }

        if (!message.trim()) {
            return;
        }

        const handleSuccess = () => {
            toast.success('메시지가 전송되었습니다.');
            setMessage('');
            onSuccess?.();
        };

        if (selectedUserId === 'all') {
            createTaskChat(
                {
                    taskId,
                    message: message.trim()
                },
                {
                    onSuccess: handleSuccess,
                    onError: (error) => {
                        toast.error('메시지 전송에 실패했습니다.');
                    }
                }
            );
        } else {
            createCommonChat(
                {
                    message: message.trim(),
                    created_by: user.id,
                    recipient_id: selectedUserId,
                    task_link: `/task-admin/task-dashboard/${taskId}`
                },
                {
                    onSuccess: handleSuccess,
                    onError: (error) => {
                        toast.error('메시지 전송에 실패했습니다.');
                    }
                }
            );
        }
    };

    return (
        <div className="border-t bg-white p-4 w-full">
            {/* taskId:{taskId} */}
            <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                <div className="flex flex-1">
                    <ISelectBoxForTaskChatting
                        selectedUserId={selectedUserId}
                        onUserSelect={setSelectedUserId}
                        className="w-32 rounded-none border-r-0"
                        disabled={isPending}
                    />
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={selectedUserId === 'all' ? "태스크 대화방에 메시지 보내기" : "메시지 보내기"}
                        className="flex-1 border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending ? '전송 중...' : '전송'}
                </button>
            </form>
        </div>
    );
};

export default TaskChattingInput;