// C:\Users\terec\msa-admin\src\api\task\type\typeForApiSpecForTask.ts

import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";

export interface CreateApiSpecRequest {
    method: string;
    endpoint: string;
    description?: string;
    request_spec?: Record<string, any>;
    response_spec?: Record<string, any>;
    headers?: Record<string, any>;
}

export interface EditApiSpecRequest extends CreateApiSpecRequest {
    // EditApiSpecRequest는 CreateApiSpecRequest와 동일한 필드를 가집니다.
    // 필요한 경우 추가 필드를 여기에 정의할 수 있습니다.
}

export interface CreateApiSpecResponse {
    data: TaskApiSpec | null;
    message?: string;
    error?: string;
    details?: string;
}

export interface DeleteApiSpecResponse {
    success?: boolean;
    error?: string;
}