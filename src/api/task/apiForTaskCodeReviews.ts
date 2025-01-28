// api/task/apiForTaskCodeReviews.ts
import { CreateCodeReviewRequest, TaskCodeReview } from "@/types/task/typeForCodeReviews";

export const apiForCreateCodeReview = async (
    taskId: string,
    data: CreateCodeReviewRequest
): Promise<TaskCodeReview> => {
    const response = await fetch(`/api/task-dashboard/${taskId}/code-reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to create code review');
    }

    const result = await response.json();
    return result.data;
};

export const apiForUpdateCodeReview = async (
    taskId: string,
    reviewId: number,
    data: Partial<CreateCodeReviewRequest>
): Promise<TaskCodeReview> => {
    const response = await fetch(`/api/task-dashboard/${taskId}/code-reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to update code review');
    }

    const result = await response.json();
    return result.data;
};

export const apiForDeleteCodeReview = async (
    taskId: string,
    reviewId: number
): Promise<void> => {
    const response = await fetch(`/api/task-dashboard/${taskId}/code-reviews/${reviewId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete code review');
    }
};