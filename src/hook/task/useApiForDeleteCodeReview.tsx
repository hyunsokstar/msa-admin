// src\hook\task\useApiForDeleteCodeReview.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteCodeReview } from '@/api/task/apiForTaskCodeReviews';

interface DeleteCodeReviewVariables {
    taskId: string;
    reviewId: number;
}

export const useApiForDeleteCodeReview = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, DeleteCodeReviewVariables>({
        mutationFn: async ({ taskId, reviewId }) => {
            await apiForDeleteCodeReview(taskId, reviewId);
            toast.success('코드 리뷰가 삭제되었습니다.');
        },
        onError: (error) => {
            toast.error(`삭제 실패: ${error.message}`);
        },
        onSuccess: (_, variables) => {
            // 해당 태스크의 코드 리뷰 목록 갱신
            queryClient.invalidateQueries({
                queryKey: ['taskDetail', variables.taskId]
            });
        },
    });
};