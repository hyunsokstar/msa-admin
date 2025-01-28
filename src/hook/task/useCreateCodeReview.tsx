// src/hooks/task/useCreateCodeReview.ts
import { apiForCreateCodeReview } from "@/api/task/apiForTaskCodeReviews";
import { CreateCodeReviewRequest, TaskCodeReview } from "@/types/task/typeForCodeReviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateCodeReview = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation<TaskCodeReview, Error, CreateCodeReviewRequest>({
        mutationFn: (data: CreateCodeReviewRequest) => apiForCreateCodeReview(taskId, data),
        onSuccess: (response) => {
            // API 응답에 error 필드가 있는 경우 처리
            if ('error' in response) {
                toast.error(response.error as string);
                return;
            }

            // 성공 시 task detail의 code reviews 데이터 갱신
            queryClient.invalidateQueries({
                queryKey: ["taskDetail", taskId]
            });

            toast.success("Code review created successfully");
        },
        onError: (error) => {
            console.error('Error creating code review:', error);
            toast.error("Failed to create code review");
        }
    });
};