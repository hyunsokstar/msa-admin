// components/ISelectBoxForTaskChatting.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';

interface ISelectBoxForTaskChattingProps {
    selectedUserId: string;
    onUserSelect: (userId: string) => void;
    className?: string;
    disabled?: boolean;
}

const ISelectBoxForTaskChatting: React.FC<ISelectBoxForTaskChattingProps> = ({
    selectedUserId,
    onUserSelect,
    className,
    disabled
}) => {
    const { data: users, isLoading } = useApiForGetAllUsers();

    const sortedUsers = React.useMemo(() => {
        if (!users) return [];
        return [
            { id: 'all', full_name: '@모두' },
            ...users.map(user => ({
                id: user.id,
                full_name: `@${user.full_name}`
            }))
        ];
    }, [users]);

    if (isLoading) {
        return (
            <select
                disabled
                className={cn(
                    "border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50",
                    className
                )}
            >
                <option>로딩중...</option>
            </select>
        );
    }

    return (
        <select
            value={selectedUserId}
            onChange={(e) => onUserSelect(e.target.value)}
            className={cn(
                "border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors",
                className
            )}
            disabled={disabled}
        >
            {sortedUsers.map((user) => (
                <option
                    key={user.id}
                    value={user.id}
                    className={cn(
                        "bg-white",
                        user.id === 'all' ? 'font-bold' : ''
                    )}
                >
                    {user.full_name}
                </option>
            ))}
        </select>
    );
};

export default ISelectBoxForTaskChatting;