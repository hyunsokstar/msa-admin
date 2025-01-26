// hooks/task/useUpdateSubTodoStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateSubTodoStatus } from '@/api/task/apiForSubTodos';

export const useUpdateSubTodoStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
            await apiForUpdateSubTodoStatus(id, isCompleted),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['taskDetail'] });
        }
    });
};