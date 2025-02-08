"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { IUser } from '@/types/typeForUser';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';
import { useUserStore } from '@/store/useUserStore';
import IDialogButtonForUpdateUserStatus from './IDialogButtonForUpdateUserStatus';

interface Props {
    className?: string;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'working':
            return 'bg-emerald-500';
        case 'break':
            return 'bg-yellow-500';
        case 'away':
            return 'bg-orange-500';
        case 'vacation':
            return 'bg-red-500';
        case 'studying':
            return 'bg-blue-500';
        case 'meeting':
            return 'bg-purple-500';
        default:
            return 'bg-gray-400';
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'working':
            return '업무중';
        case 'break':
            return '휴식중';
        case 'away':
            return '자리 비움';
        case 'vacation':
            return '휴가';
        case 'studying':
            return '스터디중';
        case 'meeting':
            return '회의중';
        default:
            return '오프라인';
    }
};

const IUserListWithLoginStatus = ({ className }: Props) => {
    const { data: users, isLoading, error } = useApiForGetAllUsers();
    const currentUser = useUserStore((state) => state.user);

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
                <div className="max-h-[400px] overflow-y-auto">
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
                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(user.status ?? 'offline')}`}
                                    title={`Status: ${user.status}`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-medium truncate">{user.full_name || 'Unknown User'}</p>
                                    {currentUser?.id !== user.id && (
                                        <span className="text-sm text-gray-600">
                                            {getStatusLabel(user.status ?? 'offline')}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            </div>
                            {user.is_admin && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Admin
                                </span>
                            )}
                            {currentUser?.id === user.id && (
                                <IDialogButtonForUpdateUserStatus userId={user.id} currentStatus={user.status ?? "offline"} />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default IUserListWithLoginStatus;