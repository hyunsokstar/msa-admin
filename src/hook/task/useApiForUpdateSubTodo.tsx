// hooks/task/useApiForUpdateSubTodo.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateSubTodo } from '@/api/task/apiForSubTodos';

export const useApiForUpdateSubTodo = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, content }: { id: string; content: string }) => {
            try {
                const result = await apiForUpdateSubTodo(id, content);
                toast.success('수정되었습니다');
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