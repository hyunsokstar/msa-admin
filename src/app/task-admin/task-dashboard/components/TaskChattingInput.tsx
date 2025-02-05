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

    // 두 개의 mutate 함수 사용
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
            setMessage('');
            onSuccess?.();
        };

        if (selectedUserId === 'all') {
            // 전체 메시지는 task chat으로 전송
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
            // 특정 사용자에게는 common chat으로 전송
            createCommonChat(
                {
                    message: message.trim(),
                    created_by: user.id,
                    recipient_id: selectedUserId
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
        <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex">
                    <ISelectBoxForTaskChatting
                        selectedUserId={selectedUserId}
                        onUserSelect={setSelectedUserId}
                        className="w-24 rounded-l-full rounded-r-none border-r-0"
                        disabled={isPending}
                    />
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={selectedUserId === 'all' ? "태스크 대화방에 메시지 보내기" : "메시지 보내기"}
                        className="flex-1 rounded-r-full rounded-l-none border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isPending}
                    />
                </div>
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