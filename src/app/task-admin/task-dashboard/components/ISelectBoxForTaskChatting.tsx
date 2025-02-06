// components/ISelectBoxForTaskChatting.tsx
"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';
import CommonSelectBox, { SelectOption } from './CommonSelectBox';

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

    const options: SelectOption[] = React.useMemo(() => {
        if (!users) return [{ value: 'all', label: '@모두' }];
        return [
            { value: 'all', label: '@모두' },
            ...users.map(user => ({
                value: user.id,
                label: `@${user.full_name}`
            }))
        ];
    }, [users]);

    if (isLoading) {
        return (
            <CommonSelectBox
                options={[{ value: 'loading', label: '로딩중...' }]}
                value="loading"
                onChange={() => { }}
                className={className}
            />
        );
    }

    return (
        <CommonSelectBox
            options={options}
            value={selectedUserId}
            onChange={onUserSelect}
            className={cn(
                "min-w-[150px]",
                className
            )}
        />
    );
};

export default ISelectBoxForTaskChatting;
