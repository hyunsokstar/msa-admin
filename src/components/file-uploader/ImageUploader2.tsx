import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  X, 
  Maximize2, 
  Download, 
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploader2Props {
  onUploadComplete?: (fileUrl: string) => void;
  maxWidth?: string;
  isUpdate?: boolean;
  initialImage?: string;
}

const ImageUploader2 = ({ 
  onUploadComplete, 
  maxWidth = "max-w-4xl",
  isUpdate = false,
  initialImage
}: ImageUploader2Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 100);
    return interval;
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const progressInterval = simulateProgress();

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setHasChanged(true);

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
        setUploadProgress(100);
        onUploadComplete?.(fileUrl);
      } else {
        throw new Error("업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      // In update mode, revert to initial image on error
      if (isUpdate) {
        setPreviewUrl(initialImage ?? null);
        setHasChanged(false);
      } else {
        setPreviewUrl(null);
      }
      alert("파일 업로드에 실패했습니다");
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const clearPreview = () => {
    if (isUpdate && initialImage && !hasChanged) {
      // In update mode, don't allow clearing if no new image was uploaded
      return;
    }
    setPreviewUrl(null);
    setHasChanged(true);
  };

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const downloadImage = async () => {
    if (previewUrl) {
      try {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded-image.jpg';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('다운로드 오류:', error);
        alert('이미지 다운로드에 실패했습니다');
      }
    }
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="flex gap-2 h-32">
      {/* Preview Section */}
      <Card className="relative overflow-hidden border-2 border-dashed rounded-lg w-1/2 h-full">
        {previewUrl ? (
          <div className="relative w-full h-full group">
            {isUploading && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Left buttons */}
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={togglePreview}
                  className="shadow-sm h-7 w-7"
                >
                  {isPreviewVisible ? (
                    <EyeOff className="w-3 h-3" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={downloadImage}
                  className="shadow-sm h-7 w-7"
                >
                  <Download className="w-3 h-3" />
                </Button>
              </div>
              
              {/* Right buttons */}
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={openInNewTab}
                  className="shadow-sm h-7 w-7"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
                {(!isUpdate || hasChanged) && (
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={clearPreview}
                    className="shadow-sm h-7 w-7"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>

            {/* Image Preview */}
            {isPreviewVisible && (
              <img
                src={previewUrl}
                alt="미리보기"
                className="object-contain w-full h-full p-2"
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <p className="text-xs">여기에 이미지가 표시됩니다</p>
          </div>
        )}
      </Card>

      {/* Upload Section */}
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-dashed rounded-lg w-1/2 h-full transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "hover:border-blue-500 hover:bg-blue-50"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center w-full h-full p-2 text-center">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-xs font-medium text-gray-700">
            {isUpdate ? "이미지 변경하기" : "이미지를 드래그하거나 클릭"}
          </p>
          <p className="text-[10px] text-gray-500">PNG, JPG (최대 10MB)</p>
        </div>
      </Card>
    </div>
  );
};

export default ImageUploader2;