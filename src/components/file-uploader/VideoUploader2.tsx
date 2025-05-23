import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  X, 
  Maximize2, 
  Download, 
  Eye,
  EyeOff,
  Play,
  Pause
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoUploader2Props {
  onUploadComplete?: (fileUrl: string) => void;
  maxWidth?: string;
  isUpdate?: boolean;
  initialVideo?: string;
}

const VideoUploader2 = ({ 
  onUploadComplete, 
  maxWidth = "max-w-4xl",
  isUpdate = false,
  initialVideo
}: VideoUploader2Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialVideo || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [hasChanged, setHasChanged] = useState(false);
  const [isLeftBoxSelected, setIsLeftBoxSelected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 3; // 비디오는 더 크므로 진행 속도를 약간 낮춤
      });
    }, 200);
    return interval;
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // 파일 크기 검사 (100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert("파일 크기가 너무 큽니다. 100MB 이하의 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 형식 검사
    if (!file.type.startsWith('video/')) {
      alert("동영상 파일만 업로드 가능합니다.");
      return;
    }

    setIsUploading(true);
    const progressInterval = simulateProgress();

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setHasChanged(true);
    setIsLeftBoxSelected(false); // 복사 붙여넣기 모드 해제

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
          fileType: "video" // 비디오 파일임을 서버에 알림
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

      console.log("uploadResponse", uploadResponse);
      
      if (uploadResponse.ok) {
        setUploadProgress(100);
        onUploadComplete?.(fileUrl);
      } else {
        throw new Error("업로드 실패");
      }
    } catch (error) {
      console.error("파일 업로드 오류:", error);
      if (isUpdate) {
        setPreviewUrl(initialVideo ?? null);
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

  // Handle paste events
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!isLeftBoxSelected) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('video') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            handleFileUpload(file);
            break;
          }
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [isLeftBoxSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
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
    if (isUpdate && initialVideo && !hasChanged) {
      return;
    }
    setPreviewUrl(null);
    setHasChanged(true);
    setIsLeftBoxSelected(false); // 복사 붙여넣기 모드 해제
  };

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    }
  };

  const downloadVideo = async () => {
    if (previewUrl) {
      try {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloaded-video.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error('다운로드 오류:', error);
        alert('동영상 다운로드에 실패했습니다');
      }
    }
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLeftBoxDoubleClick = () => {
    setIsLeftBoxSelected(!isLeftBoxSelected);
  };

  return (
    <div className="flex gap-2 h-72"> {/* 비디오는 더 큰 높이가 필요함 */}
      {/* Preview Section */}
      <Card 
        className={cn(
          "relative overflow-hidden rounded-lg w-1/2 h-full",
          isLeftBoxSelected 
            ? "border-2 border-dashed border-red-500" 
            : "border-2 border-dashed border-gray-300",
        )}
        onClick={handleLeftBoxDoubleClick}
      >
        {previewUrl ? (
          <div className="relative w-full h-full group">
            {isUploading && (
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 z-10">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10">
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
                  onClick={downloadVideo}
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

            {/* 재생/일시정지 버튼 (중앙) */}
            {isPreviewVisible && (
              <div 
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="bg-black bg-opacity-40 rounded-full p-3">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
            )}

            {/* Video Preview */}
            {isPreviewVisible && (
              <video
                ref={videoRef}
                src={previewUrl}
                className="object-contain w-full h-full"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                controls={false} // 커스텀 컨트롤 사용
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <p className="text-xs">여기에 동영상이 표시됩니다</p>
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
          accept="video/*" // 비디오 파일만 선택 가능
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center w-full h-full p-2 text-center">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-xs font-medium text-gray-700">
            {isUpdate ? "동영상 변경하기" : "동영상을 드래그하거나 클릭"}
          </p>
          <p className="text-[10px] text-gray-500">MP4, WEBM, MOV (최대 100MB)</p>
        </div>
      </Card>
    </div>
  );
};

export default VideoUploader2;