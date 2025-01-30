import { useMutation } from "@tanstack/react-query";
import { apiForCreateCommonChatting } from "@/api/main/apiForCommonChattings";

export function useApiForCreateCommonChat() {
    return useMutation({
        mutationFn: async ({ message, userId }: { message: string; userId: string }) => {
            return apiForCreateCommonChatting(message, userId);
        }
    });
}   