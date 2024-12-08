// src/hooks/useApiForUpdateUser.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { User, UpdateUserDto } from '@/types/typeForUser';
import apiForUserList from '@/api/apiForUser';

interface UpdateUserVariables {
    id: string;
    updateData: UpdateUserDto;
}

export const useApiForUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, UpdateUserVariables>({
        mutationFn: async ({ id, updateData }: UpdateUserVariables) => {
            try {
                const result = await apiForUserList.updateUser(id, updateData);
                toast.success('회원 정보가 성공적으로 업데이트되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '회원 정보 업데이트 중 오류가 발생했습니다.';
                toast.error(`회원 정보 업데이트 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            // 사용자 목록 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ['users'],
            });
        },
    });
};

export default useApiForUpdateUser;