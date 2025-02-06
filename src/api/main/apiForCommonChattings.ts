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
    recipient_id?: string,
    task_link?: string
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
                recipient_id,
                task_link
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create common chatting');
        }

        const text = await response.text();
        if (!text) {
            throw new Error('Empty response from server');
        }

        const data = JSON.parse(text);
        return { data };
    } catch (error) {
        console.error('Error in apiForCreateCommonChatting:', error);
        return {
            data: null,
            error: 'Failed to create common chatting',
            details: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}