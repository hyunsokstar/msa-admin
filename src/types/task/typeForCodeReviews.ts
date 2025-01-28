// C:\Users\terec\msa-admin\src\types\task\typeForCodeReviews.ts

// types/task/typeForCodeReviews.ts
import { IUser } from "../typeForChatRoom";

export interface TaskCodeReview {
    id: number;
    task_id: string;
    content: string;
    title: string;
    created_at: string;
    updated_at: string;
    page: number;
    order: number;
    writer: IUser;
    path: string;
}
