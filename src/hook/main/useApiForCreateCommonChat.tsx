import { useMutation } from "@tanstack/react-query";
import { apiForCreateCommonChatting } from "@/api/main/apiForCommonChattings";

export function useApiForCreateCommonChat() {
    return useMutation({
        mutationFn: async ({ message, created_by }: { message: string; created_by: string }) => {
            return apiForCreateCommonChatting(message, created_by);
        }
    });
}   