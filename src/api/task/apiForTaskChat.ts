// api/task/apiForTaskChat.ts
import { TaskChat } from "@/types/typeForTaskChat";

export interface CreateTaskChatParams {
    taskId: string;
    message: string;
}

export const apiForTaskChatCreate = async ({
    taskId,
    message,
}: CreateTaskChatParams): Promise<TaskChat> => {
    const response = await fetch(`/api/task-dashboard/${taskId}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '메시지 전송에 실패했습니다.');
    }

    return response.json();
};