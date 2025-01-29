// hooks/task/useApiForCreateTaskChat.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForTaskChatCreate } from '@/api/task/apiForTaskChat';
import { TaskChat } from '@/types/typeForTaskChat';

interface CreateTaskChatDto {
    taskId: string;
    message: string;
}

export const useApiForCreateTaskChat = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation<TaskChat, Error, CreateTaskChatDto>({
        mutationFn: async (chatData: CreateTaskChatDto) => {
            try {
                const result = await apiForTaskChatCreate(chatData);
                toast.success('메시지가 전송되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '메시지 전송에 실패했습니다.';
                toast.error(`전송 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['taskDetail', taskId],
            });
        },
    });
};

export default useApiForCreateTaskChat;