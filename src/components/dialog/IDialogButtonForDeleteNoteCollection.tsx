// src/components/dialog/IDialogButtonForDeleteNoteCollection.tsx
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2, X } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';
import { useApiForDeleteNoteCollection } from '@/hook/useApiForDeleteNoteCollection';

interface IDialogButtonForDeleteNoteCollectionProps {
  collectionId: number;
  collectionName: string;
}

export const IDialogButtonForDeleteNoteCollection = ({
  collectionId,
  collectionName,
}: IDialogButtonForDeleteNoteCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useApiForDeleteNoteCollection();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(collectionId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete note collection:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Trash2 className="h-4 w-4" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader className="relative pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            노트 컬렉션 삭제
          </DialogTitle>
          {/* <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button> */}
        </DialogHeader>
        <div className="py-6">
          <p className="text-gray-700 dark:text-gray-300">
            정말 <span className="font-semibold">"{collectionName}"</span> 컬렉션을 삭제하시겠습니까?
          </p>
          <p className="mt-2 text-sm text-gray-500">
            이 작업은 되돌릴 수 없습니다.
          </p>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <CommonButton
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            취소
          </CommonButton>
          <CommonButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300"
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};