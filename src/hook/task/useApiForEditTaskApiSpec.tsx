// C:\Users\terec\msa-admin\src\hook\task\useApiForEditTaskApiSpec.tsx
// src/hooks/task/useApiForEditTaskApiSpec.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { EditApiSpecRequest } from '@/api/task/type/typeForApiSpecForTask';
import { apiForEditTaskApiSpec } from '@/api/task/apiForTaskApiSpecs';

interface EditMutationParams {
    specId: string;
    data: EditApiSpecRequest;
}

export const useApiForEditTaskApiSpec = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ specId, data }: EditMutationParams) => {
            try {
                const result = await apiForEditTaskApiSpec(taskId, specId, data);
                toast.success('API 스펙이 수정되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '수정 중 오류가 발생했습니다.';
                toast.error(`수정 실패: ${errorMessage}`);
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