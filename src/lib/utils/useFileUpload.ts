// C:\Users\terec\msa-admin\src\lib\utils\useFileUpload.ts

// hooks/useFileUpload.ts
import { useState } from 'react';

interface UseFileUploadOptions {
    onSuccess?: (fileUrl: string) => void;
    onError?: (error: Error) => void;
}

interface UploadProgress {
    isUploading: boolean;
    progress: number;
}

export const useFileUpload = (options?: UseFileUploadOptions) => {
    const [uploadState, setUploadState] = useState<UploadProgress>({
        isUploading: false,
        progress: 0
    });

    const simulateProgress = () => {
        setUploadState(prev => ({ ...prev, progress: 0 }));
        const interval = setInterval(() => {
            setUploadState(prev => {
                if (prev.progress >= 95) {
                    clearInterval(interval);
                    return prev;
                }
                return { ...prev, progress: prev.progress + 5 };
            });
        }, 100);
        return interval;
    };

    const uploadFile = async (file: File) => {
        if (!file) return;

        setUploadState({ isUploading: true, progress: 0 });
        const progressInterval = simulateProgress();

        try {
            // 1. Get presigned URL
            const presignedResponse = await fetch("/api/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    filename: file.name,
                    contentType: file.type,
                }),
            });

            const { presignedUrl, fileUrl } = await presignedResponse.json();

            // 2. Upload to S3
            const uploadResponse = await fetch(presignedUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                },
            });

            if (uploadResponse.ok) {
                setUploadState(prev => ({ ...prev, progress: 100 }));
                options?.onSuccess?.(fileUrl);
                return fileUrl;
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            const errorObj = error instanceof Error ? error : new Error("Upload failed");
            options?.onError?.(errorObj);
            throw errorObj;
        } finally {
            clearInterval(progressInterval);
            setTimeout(() => {
                setUploadState({ isUploading: false, progress: 0 });
            }, 500);
        }
    };

    return {
        uploadFile,
        isUploading: uploadState.isUploading,
        progress: uploadState.progress
    };
};