// C:\Users\terec\msa-admin\src\types\typeForCommonChatting.ts
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface CommonChatting {
    id: string;
    message: string;
    user_id: string;
    created_at: string;
    message_type: string;
    users: {
        id: string;
        full_name: string;
        profile_image_url: string | null;
    };
    is_left: boolean;
}

export interface CommonChattingResponse {
    data: CommonChatting[] | null;
    error?: string;
    details?: string;
}

export interface ChatMessageProps {
    message: CommonChatting;
    previousMessageUserId?: string | null;
}

export interface ChatContainerProps {
    className?: string;
    messages: CommonChatting[];
    onSuccess?: (options?: RefetchOptions) => Promise<QueryObserverResult<CommonChattingResponse, Error>>;
}