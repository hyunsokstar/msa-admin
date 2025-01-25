import Image from "next/image";
import { PlusCircle } from "lucide-react";
import IDialogButtonForReflImageUploadForTask from "./IDialogButtonForReflImageUploadForTask";

interface ThumbnailProps {
  taskId: string ;
  images: { id: string; image_url: string }[] | null;
  getValidImageUrl: (url: string) => string;
}

const ThumbnailList: React.FC<ThumbnailProps> = ({ taskId, images, getValidImageUrl }) => {

  return (
    <div className="border-l bg-gray-50 flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between p-3 bg-white border-b">
        <h3 className="text-sm font-medium text-gray-700">
          Ref Images ({images?.length || 0})
        </h3>
      <IDialogButtonForReflImageUploadForTask
          title=""
          taskId={taskId}
      />

      </div>

      {/* Thumbnail Images */}
      <div className="p-3 space-y-3 overflow-y-auto">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <button
              key={image.id}
              className="w-full aspect-square relative rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <Image
                src={getValidImageUrl(image.image_url)}
                alt={`Reference ${index + 1}`}
                className="object-cover"
                fill
              />
            </button>
          ))
        ) : (
          <div className="text-xs text-gray-500 text-center">No reference images</div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailList;
