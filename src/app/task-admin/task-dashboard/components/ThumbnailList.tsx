import Image from 'next/image';

interface ThumbnailProps {
  images: { id: string; image_url: string }[] | null;
  getValidImageUrl: (url: string) => string;
}

const ThumbnailList: React.FC<ThumbnailProps> = ({ images, getValidImageUrl }) => {
  return (
    <div className="border-l bg-gray-50 p-auto space-y-3 overflow-y-auto p-5">
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
  );
};

export default ThumbnailList;