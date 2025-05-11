// C:\Users\terec\msa-admin\src\hook\useApiForGetCommentsForArchivedTestItem.ts
// archived 된 테스트 댓글 목록 조회!!!

"use client";

import { apiForGetCommentsForArchivedTestItem } from "@/api/apiForCommentListForArchivedTestItem";
import { useQuery } from "@tanstack/react-query";

/**
 * 아카이브된 테스트 항목의 댓글 목록을 조회하는 커스텀 훅
 * @param testItemId 아카이브된 테스트 항목 ID
 * @param options 추가 옵션 (enabled, staleTime 등)
 */
export function useApiForGetCommentsForArchivedTestItem(
    testItemId: string,
    options?: {
        enabled?: boolean;
        staleTime?: number;
        refetchInterval?: number | false;
    }
) {
    return useQuery({
        queryKey: ["archived-comments", testItemId],
        queryFn: () => apiForGetCommentsForArchivedTestItem(testItemId),
        enabled: options?.enabled !== false && !!testItemId,
        staleTime: options?.staleTime || 1000 * 60, // 기본 1분
        refetchInterval: options?.refetchInterval || false,
    });
}