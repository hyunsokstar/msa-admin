export interface Comment {
    id: string;
    test_item_id: string;
    author_id: string;
    comment: string;
    created_at: string;
    updated_at: string;
    ref_image?: string | null;
    ref_video?: string | null;
    author?: {
        id: string;
        full_name: string;
        profile_image_url?: string;
    };
}

type ApiResponse<T> = {
    data?: T;
    error?: string;
};

/**
 * 특정 테스트 항목에 대한 댓글 목록을 가져옵니다.
 * @param testItemId 댓글을 가져올 테스트 항목의 ID
 * @returns 댓글 배열 또는 오류 메시지를 포함한 ApiResponse 객체
 */
export const apiForGetCommentListForTestItem = async (
    testItemId: string
): Promise<ApiResponse<Comment[]>> => {
    if (!testItemId) {
        return { error: 'testItemId가 제공되지 않았습니다.' };
    }

    console.log("testItemId : ", testItemId);


    try {
        const response = await fetch(`/api/test-items/${testItemId}/comments`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        const responseText = await response.text();
        const result: ApiResponse<Comment[]> = responseText
            ? JSON.parse(responseText)
            : { data: [] };

        if (!response.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('❌ 댓글 목록 가져오기 실패:', error);
        return {
            error: error instanceof Error ? error.message : '알 수 없는 오류',
        };
    }
};

export const apiForPostCommentForTestItem = async (
    testItemId: string,
    newComment: {
        author_id: string;
        comment: string;
        ref_image?: string | null;
        ref_video?: string | null;
    }
): Promise<ApiResponse<Comment>> => {
    try {
        const response = await fetch(`/api/test-items/${testItemId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newComment),
        });

        const responseText = await response.text();
        const result: ApiResponse<Comment> = responseText
            ? JSON.parse(responseText)
            : { error: '응답 파싱 실패' };

        if (!response.ok) {
            throw new Error(result.error || `HTTP ${response.status}`);
        }

        return result;
    } catch (error) {
        console.error('❌ 댓글 등록 실패:', error);
        return {
            error: error instanceof Error ? error.message : '알 수 없는 오류',
        };
    }
};