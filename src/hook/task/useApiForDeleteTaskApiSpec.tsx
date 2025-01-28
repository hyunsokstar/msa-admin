// src/hooks/task/useApiForDeleteTaskApiSpec.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteTaskApiSpec } from '@/api/task/apiForTaskApiSpecs';

export const useApiForDeleteTaskApiSpec = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (specId: string) => {
            try {
                const result = await apiForDeleteTaskApiSpec(taskId, specId);
                toast.success('API 스펙이 삭제되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '삭제 중 오류가 발생했습니다.';
                toast.error(`삭제 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['taskDetail', taskId]
            });
        }
    });
};