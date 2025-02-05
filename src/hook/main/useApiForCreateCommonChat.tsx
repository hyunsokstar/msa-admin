// hook/useApiForCreateCommonChat.ts
import { useMutation } from "@tanstack/react-query";
import { apiForCreateCommonChatting } from "@/api/main/apiForCommonChattings";

interface CreateCommonChatParams {
    message: string;
    created_by: string;
    recipient_id?: string;  // recipient_id 추가
}

export function useApiForCreateCommonChat() {
    return useMutation({
        mutationFn: async ({ message, created_by, recipient_id }: CreateCommonChatParams) => {
            return apiForCreateCommonChatting(message, created_by, recipient_id);
        }
    });
}