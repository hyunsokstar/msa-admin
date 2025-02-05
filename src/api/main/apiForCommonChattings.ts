// api/main/apiForCommonChattings.ts
import { CommonChatting } from "@/types/typeForCommonChatting";

interface CommonChattingResponse {
    data: CommonChatting[] | null;
    error?: string;
    details?: string;
}

export async function apiForGetCommonChattings(): Promise<CommonChattingResponse> {
    try {
        const response = await fetch('/api/common-chattings', {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch common chattings');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForGetCommonChattings:', error);
        return {
            data: null,
            error: 'Failed to fetch common chattings',
            details: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

export async function apiForCreateCommonChatting(
    message: string,
    created_by: string,
    recipient_id?: string
): Promise<CommonChattingResponse> {
    try {
        const response = await fetch('/api/common-chattings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                created_by,
                recipient_id
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create common chatting');
        }

        // 응답이 비어있는지 확인
        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        // JSON 파싱
        const data = JSON.parse(text);
        return { data }; // 응답을 CommonChattingResponse 형식으로 변환
    } catch (error) {
        console.error('Error in apiForCreateCommonChatting:', error);
        return {
            data: null,
            error: 'Failed to create common chatting',
            details: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}