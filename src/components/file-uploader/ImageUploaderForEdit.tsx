import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, X, Maximize2, Download, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderForEditProps {
  initialImage: string;
  onUpdateImage: (updatedImage: string | null) => void;
}

const ImageUploaderForEdit = ({
  initialImage,
  onUpdateImage,
}: ImageUploaderForEditProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const simulateProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
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

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
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

      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (uploadResponse.ok) {
        setUploadProgress(100);
        onUpdateImage(fileUrl);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("File upload error:", error);
      setPreviewUrl(initialImage);
      alert("Image upload failed.");
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
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
    setPreviewUrl(null);
    onUpdateImage(null);
  };

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, "_blank");
    }
  };

  const downloadImage = async () => {
    if (previewUrl) {
      try {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "downloaded-image.jpg";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.error("Download error:", error);
        alert("Failed to download image.");
      }
    }
  };

  const togglePreview = () => {
    setIsPreviewVisible(!isPreviewVisible);
  };

  return (
    <div className="flex gap-4">
      {/* Preview Section */}
      <Card
        className={cn(
          "relative overflow-hidden rounded-lg w-1/2 h-32 border-2 border-dashed",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "hover:border-blue-500 hover:bg-blue-50"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
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
            <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="icon" onClick={togglePreview}>
                {isPreviewVisible ? <EyeOff /> : <Eye />}
              </Button>
              <Button variant="secondary" size="icon" onClick={downloadImage}>
                <Download />
              </Button>
              <Button variant="secondary" size="icon" onClick={openInNewTab}>
                <Maximize2 />
              </Button>
              <Button variant="destructive" size="icon" onClick={clearPreview}>
                <X />
              </Button>
            </div>
            {isPreviewVisible && (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain w-full h-full p-2"
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400">
            <Upload className="w-8 h-8 mb-2" />
            <p className="text-xs font-medium">Drag or click to upload</p>
          </div>
        )}
      </Card>

      {/* Upload Section */}
      <Card
        className={cn(
          "relative overflow-hidden rounded-lg w-1/2 h-32 border-2 border-dashed",
          "hover:border-blue-500 hover:bg-blue-50"
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center w-full h-full p-2 text-center">
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-xs font-medium text-gray-700">
            Select or drop new image
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ImageUploaderForEdit;
