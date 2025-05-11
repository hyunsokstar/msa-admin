// components/test/IDialogButtonForRefImageForTestItem.tsx
import React, { useState } from 'react';
import { FileImage, Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';
import { useApiForUpdateTestItemRefImage } from '@/hook/useApiForUpdateTestItemRefImage';

interface IDialogButtonForRefImageForTestItemProps {
    testItemId: string;
    targetId: string; // Add targetId to invalidate the correct queries
    imageUrl: string | null;
    onImageUpdated?: (newImageUrl: string) => void;
}

const IDialogButtonForRefImageForTestItem: React.FC<IDialogButtonForRefImageForTestItemProps> = ({
    testItemId,
    targetId,
    imageUrl,
    onImageUpdated
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const updateImageMutation = useApiForUpdateTestItemRefImage();

    const handleUploadComplete = async (fileUrl: string) => {
        try {
            // Call the mutation to update the image
            await updateImageMutation.mutateAsync({
                itemId: testItemId,
                imageUrl: fileUrl,
                targetId: targetId
            });
            
            // Optional callback for parent component
            if (onImageUpdated) {
                onImageUpdated(fileUrl);
            }
            
            // Close the dialog after successful update
            setIsDialogOpen(false);
        } catch (err) {
            // Error is already handled by the mutation hook
            console.error("Error details:", err);
        }
    };

    return (
        <>
            {/* Clickable element (either preview image or add button) */}
            {updateImageMutation.isPending ? (
                // Loading state
                <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-gray-50">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
            ) : imageUrl ? (
                // If we have an image, show the preview that's clickable
                <div 
                    className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:border-blue-400 transition-colors relative group"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <img
                        src={imageUrl}
                        alt="미리보기"
                        className="w-full h-full object-cover"
                    />
                    {/* Optional hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Plus className="h-6 w-6 text-white" />
                    </div>
                </div>
            ) : (
                // If no image, show a button to add one
                <div
                    className="w-16 h-16 flex flex-col items-center justify-center border border-dashed border-blue-400 rounded-md cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => setIsDialogOpen(true)}
                >
                    <Plus className="h-4 w-4 text-blue-500 mb-1" />
                    <FileImage className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-xs text-blue-600">이미지</span>
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg bg-white rounded-lg shadow-md p-6">
                    <DialogHeader>
                        <DialogTitle>{imageUrl ? "참조 이미지 수정" : "참조 이미지 업로드"}</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <ImageUploader2
                            onUploadComplete={handleUploadComplete}
                            isUpdate={!!imageUrl}
                            initialImage={imageUrl || undefined}
                        />
                    </div>
                    {updateImageMutation.error && (
                        <p className="text-sm text-red-500 mt-2">
                            오류: {updateImageMutation.error.message}
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default IDialogButtonForRefImageForTestItem;