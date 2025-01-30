export interface CommonChatting {
    id: string;
    message: string;
    user_id: string;
    created_at: string;
    message_type: string;
    users: {
        id: string;
        full_name: string;
        profile_image_url: string | null;
    };
}