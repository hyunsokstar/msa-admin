import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ApiSpec, addApiSpec } from '@/api/apiForApiSpec';

export const useApiForCreateApiSpec = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ApiSpec[], Error, Partial<ApiSpec>>({
        mutationFn: async (apiSpecData: Partial<ApiSpec>) => {
            try {
                const result = await addApiSpec(apiSpecData);
                if (!result) {
                    throw new Error('API 스펙 생성에 실패했습니다.');
                }
                toast.success('API 스펙이 성공적으로 생성되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'API 스펙 생성 중 오류가 발생했습니다.';
                toast.error(`API 스펙 생성 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['apiSpecs'],
            });
        },
    });

    return mutation;
};

export default useApiForCreateApiSpec;