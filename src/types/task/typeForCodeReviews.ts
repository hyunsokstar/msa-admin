// C:\Users\terec\msa-admin\src\types\task\typeForCodeReviews.ts
import { IUser } from "../typeForChatRoom";


export interface CreateCodeReviewRequest {
    title: string;
    content: string;
    path: string;
    writer: string;
    order: number;
}

export interface TaskCodeReview {
    id: number;
    task_id: string;
    title: string;
    content: string;
    path: string;
    writer: IUser;
    order: number;
    created_at: string;
    updated_at: string;
}