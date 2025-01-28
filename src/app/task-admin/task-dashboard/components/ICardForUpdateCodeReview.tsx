// components/ICardForUpdateCodeReview.tsx
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TaskCodeReview } from "@/types/task/typeForCodeReviews";
import CommonButton2 from "@/components/common/CommonButton2";
import { Save, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ICardForUpdateCodeReviewProps {
    review: TaskCodeReview;
    isSelected?: boolean;
    onClick?: () => void;
    taskId: string;
    onSave?: (updatedReview: Partial<TaskCodeReview>) => void;
    onCancel?: () => void;
}

const ICardForUpdateCodeReview: React.FC<ICardForUpdateCodeReviewProps> = ({
    review,
    isSelected,
    onClick,
    taskId,
    onSave,
    onCancel
}) => {
    const [title, setTitle] = useState(review.title);
    const [path, setPath] = useState(review.path);
    const [content, setContent] = useState(review.content);
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (onSave) {
            setIsSaving(true);
            try {
                await onSave({
                    id: review.id,
                    title,
                    path,
                    content
                });
            } finally {
                setIsSaving(false);
            }
        }
    };

    return (
        <Card
            className={`mb-4 transition-all relative bg-white rounded-xl border border-gray-200
               ${isSelected ? 'ring-1 ring-blue-400 shadow-md' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 상단 영역 */}
                    <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">{review.order}</span>
                        </div>

                        <div className="relative group">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={review.writer.profile_image_url || ''}
                                    alt={review.writer.full_name || '사용자'}
                                />
                                <AvatarFallback>
                                    {review.writer.full_name?.charAt(0)?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="flex-grow space-y-3">
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="리뷰 제목"
                                className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
                            />
                            <Input
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                placeholder="파일 경로"
                                className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
                            />
                        </div>
                    </div>

                    {/* 컨텐츠 영역 */}
                    <div className="overflow-y-auto">
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="리뷰 내용을 입력하세요"
                            className="min-h-[180px] max-h-[400px] overflow-y-auto p-5 border border-gray-200 rounded-lg bg-gray-50 prose prose-sm max-w-none
                               hover:bg-white transition-colors duration-200"
                        />
                    </div>

                    {/* 버튼 영역 */}
                    <div className="flex justify-end gap-2 pt-2">
                        <CommonButton2
                            type="button"
                            variant="ghost"
                            icon={<X className="h-4 w-4" />}
                            onClick={onCancel}
                        >
                            취소
                        </CommonButton2>
                        <CommonButton2
                            type="submit"
                            variant="primary"
                            icon={<Save className="h-4 w-4" />}
                            loading={isSaving}
                        >
                            저장
                        </CommonButton2>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ICardForUpdateCodeReview;