"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash, Eye, Download } from "lucide-react";

interface ThumbnailImageProps {
  imageId: string;
  imageUrl: string;
  taskId: string;
  index: number;
  getValidImageUrl: (url: string) => string;
  onDelete: (id: string) => void;
  onView: (url: string) => void;
}

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({
  imageId,
  taskId,
  imageUrl,
  index,
  getValidImageUrl,
  onDelete,
  onView,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleView = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div
      className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={getValidImageUrl(imageUrl)}
        alt={`Reference ${index + 1}`}
        className="object-cover"
        fill
      />

      {isHovered && (
        <div className="absolute top-2 right-2 flex space-x-2">

          <button
            className="p-1 bg-white rounded-full hover:bg-gray-200"
            onClick={() => handleView(getValidImageUrl(imageUrl))}
            title="View"
          >
            <Eye size={16} className="text-blue-500" />
          </button>
          <button
            className="p-1 bg-white rounded-full hover:bg-gray-200"
            onClick={() => {
              const a = document.createElement("a");
              a.href = getValidImageUrl(imageUrl);
              a.download = `reference-${index + 1}.jpg`;
              a.click();
            }}
            title="Download"
          >
            <Download size={16} className="text-green-500" />
          </button>
          <button
            className="p-1 bg-white rounded-full hover:bg-gray-200"
            onClick={() => onDelete(imageId)}
            title="Delete"
          >
            <Trash size={16} className="text-red-500" />
          </button>


        </div>
      )}
    </div>
  );
};

export default ThumbnailImage;