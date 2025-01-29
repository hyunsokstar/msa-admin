// api/task/type/typeForTaskChat.ts
export interface TaskChat {
    id: string;
    task_id: string;
    message: string;
    created_by: string;
    created_at: string;
    created_by_user: {
        id: string;
        full_name: string;
        profile_image_url: string | null;
    };
}