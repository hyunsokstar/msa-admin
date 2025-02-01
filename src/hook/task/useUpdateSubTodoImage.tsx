// hooks/task/useUpdateSubTodoImage.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateSubTodoImage } from '@/api/task/apiForSubTodos';

export const useUpdateSubTodoImage = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, taskResultImage }: { id: string; taskResultImage: string }) => {
            try {
                const result = await apiForUpdateSubTodoImage(id, taskResultImage);
                toast.success('이미지가 업데이트되었습니다');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '이미지 업데이트 중 오류가 발생했습니다.';
                toast.error(`업데이트 실패: ${errorMessage}`);
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