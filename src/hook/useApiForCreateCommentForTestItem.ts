// C:\Users\terec\msa-admin\src\hook\useApiForCreateCommentForTestItem.ts

"use client";

import { apiForPostCommentForTestItem } from "@/api/apiForCommentListForTestItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 댓글 생성 요청을 위한 커스텀 훅
 */
export function useApiForCreateCommentForTestItem(testItemId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newComment: {
            author_id: string;
            comment: string;
            ref_image?: string | null;
            ref_video?: string | null;
        }) => {
            return await apiForPostCommentForTestItem(testItemId, newComment);
        },
        onSuccess: (data) => {
            if (data?.data) {
                queryClient.invalidateQueries({
                    queryKey: ["comments", testItemId],
                });
            }
        },
        onError: (error) => {
            console.error("댓글 등록 중 오류 발생:", error);
        },
    });
}
