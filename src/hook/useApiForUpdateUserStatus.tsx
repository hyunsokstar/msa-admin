// hooks/useApiForUpdateUserStatus.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiForUserList from '@/api/apiForUser';

interface UpdateStatusVariables {
    userId: string;
    status: 'working' | 'break' | 'away' | 'vacation' | 'studying' | 'meeting' | 'offline';
}

export const useApiForUpdateUserStatus = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, UpdateStatusVariables>({
        mutationFn: async ({ userId, status }: UpdateStatusVariables) => {
            try {
                await apiForUserList.updateUser(userId, { status });
                toast.success('상태가 성공적으로 변경되었습니다.');
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '상태 변경 중 오류가 발생했습니다.';
                toast.error(`상태 변경 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};