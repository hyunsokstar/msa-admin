// C:\Users\terec\msa-admin\src\hook\useApiForDeleteCommentForArchivedTestItem.ts
"use client";

import { apiForDeleteCommentForArchivedTestItem } from "@/api/apiForCommentListForArchivedTestItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 아카이브된 테스트 항목의 댓글 삭제를 위한 커스텀 훅
 * @param testItemId 아카이브된 테스트 항목 ID
 */
export function useApiForDeleteCommentForArchivedTestItem(testItemId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentId: string) => {
            return await apiForDeleteCommentForArchivedTestItem(testItemId, commentId);
        },
        onSuccess: (data) => {
            if (data?.success) {
                // 댓글 삭제 성공 시 캐시된 댓글 목록 갱신
                queryClient.invalidateQueries({
                    queryKey: ["archived-comments", testItemId],
                });
            }
        },
        onError: (error) => {
            console.error("아카이브된 테스트 항목 댓글 삭제 중 오류 발생:", error);
        },
    });
}