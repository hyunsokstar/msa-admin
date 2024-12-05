"use client";
import ImageUploader from '@/components/file-uploader/ImageUploader'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';

const ImageUploadTestPage = () => {
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleUploadComplete = (fileUrl: string) => {
    setUploadedUrl(fileUrl);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">이미지 업로드 테스트</h1>
      
      <ImageUploader onUploadComplete={handleUploadComplete} />
      
      {uploadedUrl && (
        <div className="space-y-2">
          <div className="space-y-2">
            <p className="text-sm font-medium">업로드된 이미지 URL:</p>
            <Input 
              value={uploadedUrl} 
              readOnly 
              onClick={(e) => {
                e.currentTarget.select();
                navigator.clipboard.writeText(uploadedUrl);
              }}
            />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">이미지 미리보기:</p>
            <img 
              src={uploadedUrl} 
              alt="Uploaded preview" 
              className="max-w-md rounded-lg border shadow-sm" 
            />
          </div>
        </div>
      )}

      <br />

      <ImageUploader2 />

    </div>
  )
}

export default ImageUploadTestPage