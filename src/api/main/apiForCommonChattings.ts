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
    created_by: string
): Promise<CommonChattingResponse> {
    try {
        const response = await fetch('/api/common-chattings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                created_by: created_by,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create common chatting');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForCreateCommonChatting:', error);
        return {
            data: null,
            error: 'Failed to create common chatting',
            details: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}