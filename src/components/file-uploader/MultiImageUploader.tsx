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
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );
    
    if (previews.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => [...prev, previewUrl]);
    });
  }, [previews, maxFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files).filter(
      file => file.type.startsWith('image/')
    );

    if (previews.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
      return;
    }

    files.forEach(file => {
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => [...prev, previewUrl]);
    });
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleStartUpload = () => {
    if (previews.length === 0) return;
    onUploadComplete?.(previews);
    setPreviews([]);
  };

  return (
    <div className="space-y-4">
      <Card
        className={cn(
          "relative overflow-hidden border-2 border-dashed rounded-lg h-32 transition-colors",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300",
          "hover:border-blue-500 hover:bg-blue-50"
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
          <Upload className="w-8 h-8 mb-2 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG (최대 {maxFiles}개)
          </p>
        </div>
      </Card>

      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group aspect-square">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={isUploading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <Button 
            onClick={handleStartUpload}
            disabled={isUploading}
            className="w-full"
          >
            {isUploading ? "업로드 중..." : "업로드 시작"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;