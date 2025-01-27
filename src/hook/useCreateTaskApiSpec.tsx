// src/hook/task/useCreateTaskApiSpec.ts
import { apiForCreateTaskApiSpec } from "@/api/task/apiForTaskApiSpecs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface CreateApiSpecInput {
    method: string;
    endpoint: string;
    description?: string;
    request_spec?: Record<string, any>;
    response_spec?: Record<string, any>;
    headers?: Record<string, any>;
}

export const useCreateTaskApiSpec = (taskId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateApiSpecInput) => apiForCreateTaskApiSpec(taskId, data),
        onSuccess: (response) => {
            if (response.error) {
                toast.error(response.error);
                return;
            }

            // 성공 시 task detail의 api specs 데이터 갱신
            queryClient.invalidateQueries({
                queryKey: ["taskDetail", taskId]
            });

            toast.success("API specification created successfully");
        },
        onError: (error) => {
            console.error('Error creating API spec:', error);
            toast.error("Failed to create API specification");
        }
    });
};
