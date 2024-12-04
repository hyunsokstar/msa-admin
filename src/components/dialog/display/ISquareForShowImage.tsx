import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from '@radix-ui/react-dialog';

interface ISquareForShowImageProps {
  imageUrls: {
    url1?: string;
    url2?: string;
    url3?: string;
  };
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-12 h-12',
};

const ISquareForShowImage = ({ imageUrls, size = 'lg' }: ISquareForShowImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const hasImages = imageUrls.url1 || imageUrls.url2 || imageUrls.url3;
  const imageArray = [
    { id: '1', url: imageUrls.url1 },
    { id: '2', url: imageUrls.url2 },
    { id: '3', url: imageUrls.url3 },
  ].filter(img => img.url);

  const handlePrevious = () => {
    setSlideDirection('right');
    setCurrentImageIndex((prev) => 
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSlideDirection('left');
    setCurrentImageIndex((prev) => 
      prev === imageArray.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') setIsOpen(false);
  };

  if (!hasImages) {
    return (
      <div className={`${sizeMap[size]} bg-gray-100 rounded-md flex items-center justify-center`}>
        <span className="text-gray-400 text-xs">No Image</span>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div 
          className={`${sizeMap[size]} relative cursor-pointer overflow-hidden rounded-md hover:opacity-90 transition-opacity`}
        >
          {imageUrls.url1 ? (
            <img
              src={imageUrls.url1}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xs">No Preview</span>
            </div>
          )}
          {imageArray.length > 1 && (
            <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1 rounded-tl-md">
              +{imageArray.length - 1}
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogTitle></DialogTitle>

      <DialogContent 
        className="max-w-[100vw] max-h-[100vh] h-screen w-screen p-0 bg-black/90"
        onKeyDown={handleKeyDown}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </Button>

          {/* Navigation buttons */}
          {imageArray.length > 1 && (
            <>
              <Button
                variant="ghost"
                className="absolute left-4 z-50 text-white hover:bg-white/20"
                onClick={handlePrevious}
              >
                <ChevronLeft size={24} />
              </Button>
              <Button
                variant="ghost"
                className="absolute right-4 z-50 text-white hover:bg-white/20"
                onClick={handleNext}
              >
                <ChevronRight size={24} />
              </Button>
            </>
          )}

          {/* Image container */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <img
              key={currentImageIndex}
              src={imageArray[currentImageIndex].url}
              alt={`Image ${currentImageIndex + 1}`}
              className={cn(
                "max-w-full max-h-full object-contain transition-transform duration-300",
                slideDirection === 'left' && "animate-slide-left",
                slideDirection === 'right' && "animate-slide-right"
              )}
              onAnimationEnd={() => setSlideDirection(null)}
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {imageArray.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ISquareForShowImage;