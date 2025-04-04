"use client";

import React, { useState, useRef } from "react";
import { Edit2 } from "lucide-react";
import { TaskCodeReview } from "@/types/task/typeForCodeReviews";
import { Button } from "@/components/ui/button";
import ICardForCodeReview from "@/app/task-admin/task-dashboard/components/ICardForCodeReview";
import IDialogButtonForCreateCodeReview from "@/app/task-admin/task-dashboard/components/IDialogButtonForCreateCodeReview";
import { useApiForDeleteCodeReview } from "@/hook/task/useApiForDeleteCodeReview";

interface CodeReviewsProps {
    taskId: string;
    isLoading: boolean;
    codeReviews: TaskCodeReview[];
}

const CodeReviews: React.FC<CodeReviewsProps> = ({
    taskId,
    isLoading,
    codeReviews = []
}) => {
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedReview, setSelectedReview] = useState<TaskCodeReview | null>(null);
    const contentRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const deleteCodeReview = useApiForDeleteCodeReview();

    const handleScrollToContent = (reviewId: string) => {
        const element = contentRefs.current[reviewId];
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    };

    const handleDelete = async (reviewId: number) => {
        deleteCodeReview.mutate({
            taskId,
            reviewId
        });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <section className="bg-white rounded-lg shadow-sm flex flex-col h-[calc(100vh-200px)]">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold">Code Reviews</h2>
                    <Button
                        variant="outline"
                        onClick={() => setIsUpdateMode(!isUpdateMode)}
                        className="flex items-center gap-2"
                        size="sm"
                    >
                        <Edit2 className="h-4 w-4" />
                        {isUpdateMode ? '수정 모드 끄기' : '수정 모드'}
                    </Button>
                </div>
                <IDialogButtonForCreateCodeReview taskId={taskId} />
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2">
                <div className="space-y-4">
                    {codeReviews.map((review) => (
                        <div
                            key={review.id}
                            ref={(el) => {
                                if (el) contentRefs.current[review.id.toString()] = el;
                            }}
                        >
                            <ICardForCodeReview
                                review={review}
                                isSelected={selectedReview?.id === review.id}
                                isUpdateMode={isUpdateMode}
                                onClick={() => setSelectedReview(review)}
                                onDelete={() => handleDelete(review.id)}
                                isDeleting={deleteCodeReview.isPending && selectedReview?.id === review.id}
                                taskId={taskId}
                            />
                        </div>
                    ))}
                    {codeReviews.length === 0 && (
                        <div className="flex items-center justify-center h-[400px] text-gray-500">
                            No code reviews yet. Add your first review!
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CodeReviews;