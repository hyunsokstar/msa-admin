import React, { useState } from 'react';
import { Image as ImageIcon, Eye, Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';
import CommonTabMenu2 from '@/components/common/CommonTabMenu2';
import { TabItem } from '@/types/typeForCommonTab';
import { useUpdateSubTodoImage } from '@/hook/task/useUpdateSubTodoImage';
import { useFileUpload } from '@/lib/utils/useFileUpload';
import ImagePreviewWithDrop from './ImagePreviewWithDrop';

interface ImageForSubTodoProps {
    todoId: string;
    taskId: string;
    image: string | null;
    onImageUpdate?: (newImage: string) => void;
}

const ImageForSubTodo: React.FC<ImageForSubTodoProps> = ({
    todoId,
    taskId,
    image,
    onImageUpdate
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const updateImage = useUpdateSubTodoImage(taskId);

    const { uploadFile } = useFileUpload({
        onSuccess: (fileUrl) => {
            setTempImage(fileUrl);
            updateImage.mutate({
                id: todoId,
                taskResultImage: fileUrl
            });
            onImageUpdate?.(fileUrl);
        },
        onError: (error) => {
            console.error("Failed to upload file:", error);
            alert("이미지 업로드에 실패했습니다.");
        }
    });

    const handleClick = () => {
        setTempImage(image);
        setIsModalOpen(true);
    };

    const handleImageUpload = (fileUrl: string) => {
        setTempImage(fileUrl);
        updateImage.mutate({
            id: todoId,
            taskResultImage: fileUrl
        });
        onImageUpdate?.(fileUrl);
    };

    const handleDirectUpload = async (file: File) => {
        try {
            await uploadFile(file);
        } catch (error) {
            // 에러 처리는 useFileUpload의 onError에서 처리됨
        }
    };

    const tabs: TabItem[] = [
        {
            id: 'preview',
            label: (
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                </div>
            ),
            content: (
                <ImagePreviewWithDrop
                    image={tempImage}
                    onImageUpdate={handleDirectUpload}
                />
            )
        },
        {
            id: 'edit',
            label: (
                <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                </div>
            ),
            content: (
                <div className="py-4">
                    <ImageUploader2
                        onUploadComplete={handleImageUpload}
                        initialImage={tempImage || undefined}
                        isUpdate={!!tempImage}
                    />
                </div>
            )
        }
    ];

    return (
        <>
            {/* 이미지 썸네일 크기 증가 */}
            <div className="w-20 h-20 mx-auto relative group cursor-pointer" onClick={handleClick}>
                {image ? (
                    <>
                        <img
                            src={image}
                            alt="Task result"
                            className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-md flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                    </>
                ) : (
                    <div className="w-full h-full rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                        <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                )}
            </div>

            {/* 모달 크기 증가 */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-5xl min-h-[600px] bg-white">
                    <DialogHeader>
                        <DialogTitle>
                            {image ? 'Task Result Image' : 'Add Task Result Image'}
                        </DialogTitle>
                    </DialogHeader>
                    <CommonTabMenu2
                        tabs={tabs}
                        defaultIndex={0}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ImageForSubTodo;