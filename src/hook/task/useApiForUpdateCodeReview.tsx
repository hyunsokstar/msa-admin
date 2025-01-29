    // src\hook\task\useApiForUpdateCodeReview.tsx
    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { toast } from 'react-toastify';
    import { CreateCodeReviewRequest, TaskCodeReview } from '@/types/task/typeForCodeReviews';
    import { apiForUpdateCodeReview } from '@/api/task/apiForTaskCodeReviews';

    interface UpdateCodeReviewVariables {
        taskId: string;
        reviewId: number;
        data: Partial<CreateCodeReviewRequest>;
    }

    export const useApiForUpdateCodeReview = () => {
        const queryClient = useQueryClient();

        return useMutation<TaskCodeReview, Error, UpdateCodeReviewVariables>({
            mutationFn: async ({ taskId, reviewId, data }) => {
                const result = await apiForUpdateCodeReview(taskId, reviewId, data);
                toast.success('코드 리뷰가 수정되었습니다.');
                return result;
            },
            onError: (error) => {
                toast.error(`수정 실패: ${error.message}`);
            },
            onSuccess: (_, variables) => {
                // 해당 태스크의 코드 리뷰 목록 갱신
                queryClient.invalidateQueries({
                    queryKey: ['taskDetail', variables.taskId]
                });
            },
        });
    };