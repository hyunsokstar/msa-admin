import React, { useState } from 'react';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePreviewModalProps {
 isOpen: boolean;
 onClose: () => void;
 imageUrl: string | null;  // string 대신 string | null로 변경
 onApply: (width: number) => void;
}

const IMAGE_SIZES = [
 { label: 'XS', value: 200 },
 { label: 'S', value: 400 },
 { label: 'M', value: 600 },
 { label: 'L', value: 800 },
 { label: 'XL', value: 1000 },
];

const ImagePreviewModal = ({ isOpen, onClose, imageUrl, onApply }: ImagePreviewModalProps) => {
 const [selectedSize, setSelectedSize] = useState<number>(600); // 기본값 M 사이즈

 return (
   <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-[800px] bg-white">
       <DialogHeader>
         <DialogTitle>이미지 크기 설정</DialogTitle>
       </DialogHeader>
       
       <div className="flex flex-col items-center gap-4 py-4">
         {/* 이미지 미리보기 */}
         <div className="relative w-full overflow-auto max-h-[400px]">
           {imageUrl && (  // imageUrl이 있을 때만 이미지를 렌더링
             <img 
               src={imageUrl} 
               alt="Preview" 
               style={{ width: selectedSize }}
               className="mx-auto"
             />
           )}
         </div>
         
         {/* 사이즈 선택 버튼들 */}
         <div className="flex gap-2">
           {IMAGE_SIZES.map(size => (
             <Button
               key={size.label}
               onClick={() => setSelectedSize(size.value)}
               variant={selectedSize === size.value ? "default" : "outline"}
               className="w-16"
             >
               {size.label}
             </Button>
           ))}
         </div>
         
         {/* 현재 선택된 크기 표시 */}
         <div className="text-sm text-muted-foreground">
           선택된 크기: {selectedSize}px
         </div>
       </div>

       <DialogFooter>
         <Button variant="outline" onClick={onClose}>
           취소
         </Button>
         <Button onClick={() => onApply(selectedSize)}>
           적용
         </Button>
       </DialogFooter>
     </DialogContent>
   </Dialog>
 );
};

export default ImagePreviewModal;