// components/IUserListWithLoginStatus.tsx
"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from '@/types/typeForUser';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';

interface Props {
    className?: string;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'online':
            return 'bg-emerald-500'; // 밝은 초록색
        case 'offline':
            return 'bg-gray-400';    // 회색
        case 'away':
            return 'bg-amber-500';   // 주황빛 노란색
        default:
            return 'bg-gray-400';
    }
};

const IUserListWithLoginStatus = ({ className }: Props) => {
    const { data: users, isLoading, error } = useApiForGetAllUsers();

    if (isLoading) {
        return (
            <Card className={`${className} h-full`}>
                <CardContent className="p-6">Loading...</CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className={`${className} h-full`}>
                <CardContent className="p-6">Error: {error.message}</CardContent>
            </Card>
        );
    }

    return (
        <Card className={`${className} h-full overflow-hidden`}>
            <CardHeader className="p-4 border-b">
                <CardTitle className="text-lg">접속 중인 사용자</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="h-[calc(100%-4rem)] overflow-y-auto">
                    {users?.map((user: IUser) => (
                        <div key={user.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b">
                            <div className="relative">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={user.profile_image_url ?? ''} alt={user.full_name || 'User'} />
                                    <AvatarFallback className="bg-gray-200">
                                        {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <span
                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                                        ${getStatusColor(user.status)}`}
                                    title={`Status: ${user.status}`} // 마우스 오버시 상태 표시
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium truncate">{user.full_name || 'Unknown User'}</p>
                                    <span className="text-xs text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            </div>
                            {user.is_admin && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default IUserListWithLoginStatus;