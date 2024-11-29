// 파일 경로: /src/hooks/useApiForUpdateIsCompletedForApiNames.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateIsCompletedForApiNames } from '@/api/apiForApiConverter';
import { toast } from 'react-toastify';
import {IRequestParameterForUpdateIsCompleted, IResponseTypeForUpdateIsCompleted} from "@/types/typeForApiConverter";

/**
 * API 이름의 완료 상태를 업데이트하는 커스텀 훅
 * @returns Mutation 객체를 반환
 */
export const useApiForUpdateIsCompletedForApiNames = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<IResponseTypeForUpdateIsCompleted, Error, IRequestParameterForUpdateIsCompleted>({
        mutationFn: async ({ id, isCompleted }) => {
            const success = await apiForUpdateIsCompletedForApiNames(id, isCompleted);
            if (!success) {
                throw new Error('API 이름 완료 상태 업데이트 실패');
            }
            return { success, message: '업데이트 성공' };
        },
        onSuccess: async (data) => {
            console.log('Success: ', data);
            await toast.success('API 상태가 성공적으로 업데이트되었습니다!', {
                position: 'top-center',
                autoClose: 3000,
            });
            // 업데이트 성공 시 쿼리 무효화하여 데이터를 새로 고침
            queryClient.invalidateQueries({
                queryKey: ['apiNamesData'],
            });
        },
        onError: (error) => {
            console.error('Error: ', error);
            toast.error(error.message || 'API 상태 업데이트 중 오류 발생', {
                position: 'top-right',
                autoClose: 3000,
            });
        },
    });

    return mutation;
};

export default useApiForUpdateIsCompletedForApiNames;
