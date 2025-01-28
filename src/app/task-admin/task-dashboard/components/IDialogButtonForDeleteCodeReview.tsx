// components/IDialogButtonForDeleteCodeReview.tsx
import React from "react";
import { Trash2 } from "lucide-react";
import CommonButton2 from "@/components/common/CommonButton2";
import CommonDialogButton from "@/components/common/CommonDialogButton";

interface IDialogButtonForDeleteCodeReviewProps {
    onConfirm: () => void;
    isLoading?: boolean;
}

const IDialogButtonForDeleteCodeReview: React.FC<IDialogButtonForDeleteCodeReviewProps> = ({
    onConfirm,
    isLoading
}) => {
    return (
        <CommonDialogButton
            trigger={
                <CommonButton2
                    variant="ghost"
                    icon={<Trash2 className="h-4 w-4 text-red-500" />}
                    className="px-2"
                />
            }
            title="코드 리뷰 삭제"
            size="sm"
        >
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    이 코드 리뷰를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </p>
                <div className="flex justify-end gap-3">
                    <CommonButton2
                        variant="ghost"
                        onClick={() => onConfirm()}
                    >
                        취소
                    </CommonButton2>
                    <CommonButton2
                        variant="danger"
                        onClick={onConfirm}
                        loading={isLoading}
                    >
                        삭제
                    </CommonButton2>
                </div>
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForDeleteCodeReview;