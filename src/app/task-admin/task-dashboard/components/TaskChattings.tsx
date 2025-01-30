// components/TaskChattings.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MessageSquare } from 'lucide-react';
import { TaskChat } from '@/types/task/typeForTaskDetail';
import TaskChattingInput from './TaskChattingInput';
import { useTaskChattings } from '@/hook/task/useTaskChattings';
import { cn } from '@/lib/utils';

interface Props {
    taskId?: string;
    ownerId?: string;
    isLoading: boolean;
    chattings?: TaskChat[];
}

const TaskChattings = ({ taskId, ownerId, isLoading, chattings = [] }: Props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useTaskChattings(taskId);

    useEffect(() => {
        if (chattings.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chattings]);

    return (
        <div className="flex flex-col h-[calc(100vh-300px)]">
            <div className="flex-1 overflow-y-auto bg-gray-50">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : chattings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <MessageSquare className="w-10 h-10 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm">아직 채팅 메시지가 없습니다.</p>
                    </div>
                ) : (
                    <div className="p-4 space-y-4">
                        {chattings?.map((chat) => {
                            const messageTime = format(new Date(chat.created_at), 'HH:mm');
                            const userName = chat.created_by_user.full_name || '';
                            const userInitial = userName.charAt(0).toUpperCase();

                            return (
                                <div
                                    key={chat.id}
                                    className={cn(
                                        "flex items-end gap-2",
                                        !chat.is_left ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {chat.is_left ? (
                                        <div className="flex items-end gap-2">
                                            <Avatar className="w-8 h-8">
                                                {chat.created_by_user.profile_image_url ? (
                                                    <AvatarImage
                                                        src={chat.created_by_user.profile_image_url}
                                                        alt={userName}
                                                    />
                                                ) : (
                                                    <AvatarFallback className="bg-gray-500 text-white">
                                                        {userInitial}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs text-gray-500 ml-1">
                                                    {userName}
                                                </span>
                                                <div className="bg-blue-500 text-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
                                                    <p className="text-sm">{chat.message}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {messageTime}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-end gap-2">
                                            <span className="text-xs text-gray-400">
                                                {messageTime}
                                            </span>
                                            <div className="bg-white rounded-2xl rounded-tr-none px-4 py-2 shadow-sm border border-gray-100">
                                                <p className="text-sm text-gray-800">{chat.message}</p>
                                            </div>
                                            <Avatar className="w-8 h-8">
                                                {chat.created_by_user.profile_image_url ? (
                                                    <AvatarImage
                                                        src={chat.created_by_user.profile_image_url}
                                                        alt={userName}
                                                    />
                                                ) : (
                                                    <AvatarFallback className="bg-gray-500 text-white">
                                                        {userInitial}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {taskId && (
                <TaskChattingInput
                    taskId={taskId}
                />
            )}
        </div>
    );
};

export default TaskChattings;