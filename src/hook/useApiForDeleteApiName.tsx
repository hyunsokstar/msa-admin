// src/hooks/useApiForDeleteApiName.ts
import { apiForDeleteApiName } from '@/api/apiForApiConverter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { DeleteApiNameParams } from '@/types/typeForApiConverter';

export const useApiForDeleteApiName = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteApiName, isPending: isDeleting } = useMutation({
        mutationFn: async (params: DeleteApiNameParams) => {
            console.log('Mutation 시작:', params);

            if (!window.confirm(`"${params.apiName}" API를 삭제하시겠습니까?`)) {
                console.log('사용자가 삭제를 취소함');
                throw new Error('사용자가 삭제를 취소했습니다.');
            }

            const success = await apiForDeleteApiName(params.id);
            console.log('API 응답:', success);

            if (!success) {
                throw new Error('API 삭제에 실패했습니다.');
            }
            return success;
        },
        onMutate: (variables) => {
            console.log('Mutation 시작 전:', variables);
            const previousApiNames = queryClient.getQueryData(['apiNamesData']);
            return { previousApiNames };
        },
        onSuccess: () => {
            console.log('Mutation 성공');
            queryClient.invalidateQueries({
                queryKey: ['apiNamesData'],
                exact: true
            });
            toast.success('API가 성공적으로 삭제되었습니다.');
        },
        onError: (error: Error, variables, context) => {
            console.error('Mutation 에러:', error);
            if (context?.previousApiNames) {
                queryClient.setQueryData(['apiNamesData'], context.previousApiNames);
            }
            if (error.message !== '사용자가 삭제를 취소했습니다.') {
                toast.error(error.message);
            }
        },
        onSettled: () => {
            console.log('Mutation 완료');
        }
    });

    return {
        deleteApiName,
        isDeleting
    };
};