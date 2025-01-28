// src/api/task/apiForTaskApiSpecs.ts
import {
    CreateApiSpecRequest,
    CreateApiSpecResponse,
    EditApiSpecRequest,
    DeleteApiSpecResponse
} from './type/typeForApiSpecForTask';

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

export const apiForEditTaskApiSpec = async (
    taskId: string,
    specId: string,
    data: EditApiSpecRequest
): Promise<CreateApiSpecResponse> => {
    try {
        const response = await fetch(`/api/task-dashboard/${taskId}/api-specs/${specId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API 스펙 업데이트에 실패했습니다');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForEditTaskApiSpec:', error);
        return {
            data: null,
            error: 'API 스펙 업데이트에 실패했습니다',
            details: error instanceof Error ? error.message : 'Unknown error'
        };
    }
};

export const apiForDeleteTaskApiSpec = async (
    taskId: string,
    specId: string
): Promise<DeleteApiSpecResponse> => {
    try {
        const response = await fetch(`/api/task-dashboard/${taskId}/api-specs/${specId}`, {
            method: 'DELETE',
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'API 스펙 삭제에 실패했습니다');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiForDeleteTaskApiSpec:', error);
        return {
            error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'
        };
    }
};