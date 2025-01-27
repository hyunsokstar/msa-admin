// C:\Users\terec\msa-admin\src\hook\task\useApiForDeleteSubTodo.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteSubTodo } from '@/api/task/apiForSubTodos';

export const useApiForDeleteSubTodo = (taskId: string) => {
    const queryClient = useQueryClient();
    console.log('taskId', taskId);

    return useMutation({
        mutationFn: async (subtodoId: string) => {
            try {
                const result = await apiForDeleteSubTodo(subtodoId);
                toast.success('서브 할일이 삭제되었습니다.');
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