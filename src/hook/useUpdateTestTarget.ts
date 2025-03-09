// C:\Users\terec\msa-admin\src\hook\useUpdateTestTarget.ts

import { addTestTarget, updateTestTarget } from '@/api/apiForTestTarget';
import { CreateTestTargetParams, UpdateTestTargetParams } from '@/types/typeForTestTarget';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// 테스트 대상 수정 훅
export const useUpdateTestTarget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string, updates: UpdateTestTargetParams }) =>
            updateTestTarget(id, updates),
        onSuccess: (_, variables) => {
            toast.success('테스트 대상이 수정되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
            queryClient.invalidateQueries({ queryKey: ['testTarget', variables.id] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 대상 수정에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};