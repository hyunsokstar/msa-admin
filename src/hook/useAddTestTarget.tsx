import { addTestTarget } from '@/api/apiForTestTarget';
import { CreateTestTargetParams } from '@/types/typeForTestTarget';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// 테스트 대상 추가 훅
export const useAddTestTarget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTestTarget: CreateTestTargetParams) => addTestTarget(newTestTarget),
        onSuccess: () => {
            toast.success('테스트 대상이 추가되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 대상 추가에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};