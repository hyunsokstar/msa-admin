import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ApiSpec, updateApiSpec } from '@/api/apiForApiSpec';

export const useApiForUpdateApiSpec = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiSpec[], Error, { id: string, updates: Partial<ApiSpec> }>({
        mutationFn: async ({ id, updates }) => {
            const result = await updateApiSpec(id, updates);
            if (!result) {
                throw new Error('API 스펙 수정에 실패했습니다.');
            }
            return result;
        },
        onSuccess: () => {
            toast.success('API 스펙이 성공적으로 수정되었습니다.');
            queryClient.invalidateQueries({
                queryKey: ['apiSpecs'],
            });
        },
        onError: (error: Error) => {
            toast.error(`API 스펙 수정 실패: ${error.message}`);
        }
    });
};