// components/ImagePreviewWithDrop.tsx
import React, { useCallback, useState } from 'react';
import { Image as ImageIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewWithDropProps {
    image: string | null;
    onImageUpdate?: (file: File) => void;
}

const ImagePreviewWithDrop: React.FC<ImagePreviewWithDropProps> = ({
    image,
    onImageUpdate
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            if (onImageUpdate) {
                onImageUpdate(file);
            }
        }
    }, [onImageUpdate]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    return (
        <div
            className={cn(
                "relative w-full min-h-[400px] rounded-lg transition-all duration-200",
                "flex flex-col items-center justify-center",
                isDragging ? "bg-blue-50 border-2 border-dashed border-blue-500" : "bg-gray-50"
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {image ? (
                <>
                    <img
                        src={image}
                        alt="Preview"
                        className="max-h-[60vh] w-auto object-contain rounded-lg shadow-lg"
                    />
                    {isDragging && (
                        <div className="absolute inset-0 bg-blue-500 bg-opacity-10 flex items-center justify-center rounded-lg">
                            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
                                <Upload className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-blue-700">Drop to update image</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <p>No image available</p>
                    <p className="text-sm mt-2 text-gray-500">Drag and drop an image to upload</p>
                </div>
            )}
        </div>
    );
};

export default ImagePreviewWithDrop;