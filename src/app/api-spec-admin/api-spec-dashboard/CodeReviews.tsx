// components/CodeReviews.tsx
import React, { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import CommonButton2 from "@/components/common/CommonButton2";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import { TaskCodeReview } from "@/types/task/typeForCodeReviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

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
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<TaskCodeReview | null>(null);

    const handleAddCodeReview = () => {
        setIsAddReviewOpen(true);
    };

    const handleEditCodeReview = (review: TaskCodeReview) => {
        setEditingReview(review);
    };

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Code Reviews</h2>
                <CommonButton2
                    variant="primary"
                    icon={<Plus className="h-4 w-4" />}
                    onClick={handleAddCodeReview}
                >
                    Add Review
                </CommonButton2>
            </div>

            <div className="space-y-4">
                {codeReviews.map((review) => (
                    <div
                        key={review.id}
                        className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={review.writer.profile_image_url || ''}
                                        alt={review.writer.full_name}
                                    />
                                    <AvatarFallback>
                                        {(review.writer.full_name?.slice(0, 2) || '').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">{review.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        {review.writer.full_name} · {format(new Date(review.created_at), 'MMM d, yyyy')}
                                    </p>
                                </div>
                            </div>
                            <CommonButton2
                                variant="ghost"
                                icon={<Pencil className="h-4 w-4" />}
                                onClick={() => handleEditCodeReview(review)}
                                className="px-2"
                            />
                        </div>
                        <div className="whitespace-pre-wrap text-sm text-gray-600 pl-11">
                            {review.content}
                        </div>
                        <div className="mt-2 text-xs text-gray-400 pl-11">
                            Last updated: {format(new Date(review.updated_at), 'MMM d, yyyy HH:mm')}
                        </div>
                    </div>
                ))}

                {codeReviews.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No code reviews yet. Add your first review!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CodeReviews;