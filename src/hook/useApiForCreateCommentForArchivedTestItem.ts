// C:\Users\terec\msa-admin\src\hook\useApiForCreateCommentForArchivedTestItem.ts

"use client";

import { apiForPostCommentForArchivedTestItem } from "@/api/apiForCommentListForArchivedTestItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 아카이브된 테스트 항목의 댓글 생성 요청을 위한 커스텀 훅
 * @param testItemId 아카이브된 테스트 항목 ID
 */
export function useApiForCreateCommentForArchivedTestItem(testItemId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newComment: {
            author_id: string;
            comment: string;
            ref_image?: string | null;
            ref_video?: string | null;
        }) => {
            return await apiForPostCommentForArchivedTestItem(testItemId, newComment);
        },
        onSuccess: (data) => {
            if (data?.data) {
                // 댓글 생성 성공 시 캐시된 댓글 목록 갱신
                queryClient.invalidateQueries({
                    queryKey: ["archived-comments", testItemId],
                });
            }
        },
        onError: (error) => {
            console.error("아카이브된 테스트 항목 댓글 등록 중 오류 발생:", error);
        },
    });
}