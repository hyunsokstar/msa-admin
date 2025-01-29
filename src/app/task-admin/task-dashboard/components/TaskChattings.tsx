// components/TaskChattings.tsx
"use client";

import React from 'react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MessageSquare } from 'lucide-react';
import { TaskChat } from '@/types/task/typeForTaskDetail';

interface Props {
    taskId?: string;
    ownerId?: string;
    isLoading: boolean;
    chattings?: TaskChat[];
}

const TaskChattings = ({ taskId, ownerId, isLoading, chattings = [] }: Props) => {
    // 로딩 상태
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
            </div>
        );
    }

    // 채팅 데이터가 없는 경우
    if (!isLoading && chattings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-50">
                <MessageSquare className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-gray-500 text-sm">아직 채팅 메시지가 없습니다.</p>
            </div>
        );
    }

    // 채팅 데이터가 있는 경우
    return (
        <div className="flex flex-col h-[calc(100vh-300px)] bg-gray-50">
            {/* 채팅 메시지 영역 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chattings?.map((chat) => {
                    const isOwner = chat.created_by_user.id === ownerId;
                    const messageTime = format(new Date(chat.created_at), 'HH:mm');
                    const userName = chat.created_by_user.full_name || '';
                    const userInitial = userName.charAt(0).toUpperCase();

                    return (
                        <div
                            key={chat.id}
                            className={`flex items-end gap-2 ${isOwner ? 'justify-start' : 'justify-end'}`}
                        >
                            {isOwner && (
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
                            )}

                            {!isOwner && (
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
            </div>

            {/* 메시지 입력 영역 */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        전송
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskChattings;
