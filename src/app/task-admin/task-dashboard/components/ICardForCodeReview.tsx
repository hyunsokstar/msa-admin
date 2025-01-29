import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TaskCodeReview } from "@/types/task/typeForCodeReviews";
import { format } from "date-fns";
import { Copy } from "lucide-react";
import IDialogButtonForDeleteCodeReview from "./IDialogButtonForDeleteCodeReview";
import ICardForUpdateCodeReview from "./ICardForUpdateCodeReview";
import CommonButton2 from "@/components/common/CommonButton2";

interface ICardForCodeReviewProps {
    review: TaskCodeReview;
    isSelected: boolean;
    isUpdateMode?: boolean;
    onClick: () => void;
    taskId: string;
    onDelete: () => void;
    isDeleting: boolean;
}

const ICardForCodeReview: React.FC<ICardForCodeReviewProps> = ({
    review,
    isSelected,
    isUpdateMode = false,
    onClick,
    taskId,
    onDelete,
    isDeleting
}) => {
    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigator.clipboard.writeText(review.content);
    };

    if (isUpdateMode) {
        return (
            <ICardForUpdateCodeReview
                review={review}
                isSelected={isSelected}
                onClick={onClick}
                taskId={taskId}
            />
        );
    }

    console.log("review : ", review);
    

    return (
        <Card
            className={`mb-4 transition-all hover:shadow-md relative bg-white rounded-xl border border-gray-200
               ${isSelected ? 'ring-1 ring-blue-400 shadow-md' : 'hover:border-gray-300'}`}
            onClick={onClick}
        >
            <CardContent className="p-6">
                <div className="flex items-start gap-5 mb-5">
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
                        <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded 
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                            {review.writer.full_name || '사용자'}
                        </div>
                    </div>

                    <div className="flex-grow space-y-3">
                        <div className="grid grid-cols-[1fr,auto] gap-4 items-start">
                            <div className="space-y-3">
                                <div className="space-y-1">
                                    <Input
                                        value={review.title}
                                        readOnly
                                        placeholder="리뷰 제목"
                                        className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all font-medium text-gray-900"
                                    />
                                    <Input
                                        value={review.path}
                                        readOnly
                                        placeholder="파일 경로"
                                        className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all font-mono text-sm text-gray-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <CommonButton2
                                    type="button"
                                    variant="ghost"
                                    icon={<Copy className="h-4 w-4" />}
                                    onClick={handleCopy}
                                    className="px-2"
                                />
                                <IDialogButtonForDeleteCodeReview
                                    onConfirm={onDelete}
                                    isLoading={isDeleting}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="overflow-y-auto">
                    <div className="min-h-[180px] max-h-[400px] overflow-y-auto p-5 border border-gray-200 
                         rounded-lg bg-gray-50 prose prose-sm max-w-none mb-4 whitespace-pre-wrap">
                        {review.content}
                    </div>
                </div>

                <div className="text-xs text-gray-400 text-right">
                    Last updated: {format(new Date(review.updated_at), 'yyyy.MM.dd HH:mm')}
                </div>
            </CardContent>
        </Card>
    );
};

export default ICardForCodeReview;