// hooks/task/useApiForUpdateSubTodoAll.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateSubTodoAll, UpdateSubTodoAllDto } from '@/api/task/apiForSubTodos';

interface UpdateSubTodoAllParams {
    id: string;
    content: string;
    task_result_image: string | null;
    ref_task_note: string | null;
}

export const useApiForUpdateSubTodoAll = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...data }: UpdateSubTodoAllParams) => {
            try {
                return await apiForUpdateSubTodoAll(id, data);
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '수정 중 오류가 발생했습니다.';
                toast.error(`수정 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            toast.success('수정되었습니다');
            queryClient.invalidateQueries({
                queryKey: ['taskDetail', taskId]
            });
        }
    });
};