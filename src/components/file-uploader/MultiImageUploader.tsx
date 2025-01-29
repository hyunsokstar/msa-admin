import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MultiImageUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
}

const MultiImageUploader = ({ onUploadComplete, maxFiles = 5 }: MultiImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<Array<{ url: string, file: File }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files));
  }, [previews, maxFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    processFiles(Array.from(e.target.files));
  };

  const processFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (previews.length + imageFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    imageFiles.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => [...prev, { url: previewUrl, file }]);
      setUploadProgress(prev => [...prev, 0]);
    });
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index].url);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartUpload = async () => {
    if (previews.length === 0) return;
    setIsUploading(true);

    try {
      const uploadedUrls = await Promise.all(
        previews.map(async ({ file }, index) => {
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

          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload file ${file.name}`);
          }

          // Update progress
          setUploadProgress(prev => {
            const newProgress = [...prev];
            newProgress[index] = 100;
            return newProgress;
          });

          return fileUrl;
        })
      );

      onUploadComplete?.(uploadedUrls);
      setPreviews([]);
      setUploadProgress([]);

    } catch (error) {
      console.error('Upload error:', error);
      alert('일부 이미지 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-dashed rounded-lg h-32 transition-all duration-200",
          isDragging ? "border-blue-500 bg-blue-50/50 scale-[1.02]" : "border-slate-200",
          "hover:border-blue-500 hover:bg-blue-50/30 hover:scale-[1.01]",
          "backdrop-blur-sm"
        )}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        <div className="flex flex-col items-center justify-center w-full h-full p-4 text-center">
          <Upload className={cn(
            "w-8 h-8 mb-2 transition-colors duration-200",
            isDragging ? "text-blue-500" : "text-slate-400"
          )} />
          <p className="text-sm font-medium text-slate-700">
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-xs text-slate-500 mt-1">
            PNG, JPG (최대 {maxFiles}개)
          </p>
        </div>
      </Card>

      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {previews.map(({ url }, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden ring-1 ring-slate-200">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
                  />
                  {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${uploadProgress[index]}%` }}
                      />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg transform translate-y-2 group-hover:translate-y-0"
                  disabled={isUploading}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={handleStartUpload}
            disabled={isUploading}
            className={cn(
              "w-full transition-all duration-200",
              isUploading ? "bg-slate-100" : "bg-blue-500 hover:bg-blue-600",
              "shadow-md hover:shadow-lg"
            )}
          >
            {isUploading ? "업로드 중..." : "업로드 시작"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;