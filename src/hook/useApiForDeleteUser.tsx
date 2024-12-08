// src/hooks/useApiForDeleteUser.tsx

import apiForUserList from '@/api/apiForUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useApiForDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: async (userId: string) => {
            try {
                await apiForUserList.deleteUser(userId);
                toast.success('회원이 성공적으로 삭제되었습니다.');
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '회원 삭제 중 오류가 발생했습니다.';
                toast.error(`회원 삭제 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            // 사용자 목록 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
        onError: (error) => {
            console.error('Delete user error:', error);
        }
    });
};

export default useApiForDeleteUser;