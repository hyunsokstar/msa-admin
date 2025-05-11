// C:\Users\terec\msa-admin\src\api\apiForCommentListForArchivedTestItem.ts
"use client";


/**
 * 아카이브된 테스트 항목의 댓글 목록을 조회하는 API
 * @param testItemId 아카이브된 테스트 항목 ID
 * @returns 댓글 목록 또는 에러
 */
export async function apiForGetCommentsForArchivedTestItem(testItemId: string) {
    try {
        const response = await fetch(`/api/test-items-archive/${testItemId}/comments`);

        if (!response.ok) {
            throw new Error(`댓글 조회 실패 (${response.status}): ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("아카이브된 테스트 항목 댓글 조회 중 오류:", error);
        throw error;
    }
}

/**
 * 아카이브된 테스트 항목에 새 댓글을 생성하는 API
 * @param testItemId 아카이브된 테스트 항목 ID
 * @param commentData 새 댓글 데이터
 * @returns 생성된 댓글 정보 또는 에러
 */
export async function apiForPostCommentForArchivedTestItem(
    testItemId: string,
    commentData: {
        author_id: string;
        comment: string;
        ref_image?: string | null;
        ref_video?: string | null;
    }
): Promise<any> {
    try {
        const response = await fetch(`/api/test-items-archive/${testItemId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            throw new Error(`댓글 생성 실패 (${response.status}): ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("아카이브된 테스트 항목 댓글 생성 중 오류:", error);
        throw error;
    }
}

/**
 * 아카이브된 테스트 항목의 댓글을 삭제하는 API
 * @param testItemId 아카이브된 테스트 항목 ID
 * @param commentId 삭제할 댓글 ID
 * @returns 삭제 결과 또는 에러
 */
export async function apiForDeleteCommentForArchivedTestItem(
    testItemId: string,
    commentId: string
): Promise<any> {
    try {
        const response = await fetch(`/api/test-items-archive/${testItemId}/comments?commentId=${commentId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`댓글 삭제 실패 (${response.status}): ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("아카이브된 테스트 항목 댓글 삭제 중 오류:", error);
        throw error;
    }
}