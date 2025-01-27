// hooks/task/useApiForCreateSubTodo.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreateSubTodoDto } from '@/api/task/apiForSubTodos';
import { apiForCreateSubTodo } from '@/api/task/apiForSubTodos';

export const useApiForCreateSubTodo = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, CreateSubTodoDto>({
        mutationFn: async (subTodoData: CreateSubTodoDto) => {
            try {
                const result = await apiForCreateSubTodo(subTodoData);
                toast.success('서브 할일이 성공적으로 생성되었습니다.');
                return result.data;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '서브 할일 생성 중 오류가 발생했습니다.';
                toast.error(`생성 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['taskDetail', taskId],
            });
        },
    });
};

export default useApiForCreateSubTodo;