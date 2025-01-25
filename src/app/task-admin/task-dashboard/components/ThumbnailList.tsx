"use client";

import React from "react";
import ThumbnailImage from "./ThumbnailImage";
import IDialogButtonForReflImageUploadForTask from "./IDialogButtonForReflImageUploadForTask";
import { useApiForDeleteRefImageForTask } from "@/hook/useApiForDeleteRefImageForTask";

interface ThumbnailProps {
  taskId: string;
  images: { id: string; image_url: string }[] | null;
  getValidImageUrl: (url: string) => string;
}

const ThumbnailList: React.FC<ThumbnailProps> = ({ taskId, images, getValidImageUrl }) => {
  const deleteImageMutation = useApiForDeleteRefImageForTask(taskId);

  const handleDelete = (id: string) => {
    deleteImageMutation.mutate(id);
  };
  
  return (
    <div className="border-l bg-gray-50 flex flex-col">
      <div className="flex items-center justify-between p-3 bg-white border-b">
        <h3 className="text-sm font-medium text-gray-700">
          Ref Images ({images?.length || 0})
        </h3>
        <IDialogButtonForReflImageUploadForTask title="" taskId={taskId} />
      </div>

      <div className="p-3 space-y-3 overflow-y-auto">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <ThumbnailImage
              key={image.id}
              taskId={taskId}
              imageId={image.id}
              imageUrl={image.image_url}
              index={index}
              getValidImageUrl={getValidImageUrl}
              onDelete={handleDelete}
              onView={() => window.open(getValidImageUrl(image.image_url), '_blank')}
            />
          ))
        ) : (
          <div className="text-xs text-gray-500 text-center">No reference images</div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailList;