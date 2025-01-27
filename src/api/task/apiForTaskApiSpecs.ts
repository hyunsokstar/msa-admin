// src/api/task/apiForTaskApiSpecs.ts
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";

interface CreateApiSpecRequest {
    method: string;
    endpoint: string;
    description?: string;
    request_spec?: Record<string, any>;
    response_spec?: Record<string, any>;
    headers?: Record<string, any>;
}

interface CreateApiSpecResponse {
    data: TaskApiSpec | null;
    message?: string;
    error?: string;
    details?: string;
}

export const apiForCreateTaskApiSpec = async (
    taskId: string,
    data: CreateApiSpecRequest
): Promise<CreateApiSpecResponse> => {
    try {
        const response = await fetch(`/api/task-dashboard/${taskId}/api-specs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create API spec');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForCreateTaskApiSpec:', error);
        return {
            data: null,
            error: 'Failed to create API spec',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};