// src/hook/useApiForDeleteIssue.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiForTaskIssue from '@/api/apiForTaskIssue';

export const useApiForDeleteIssue = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            try {
                await apiForTaskIssue.deleteIssue(id);
                toast.success('이슈가 성공적으로 삭제되었습니다.');
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '이슈 삭제 중 오류가 발생했습니다.';
                toast.error(`이슈 삭제 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['issues'],
            });
        },
    });
};

export default useApiForDeleteIssue;