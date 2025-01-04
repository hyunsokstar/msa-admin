// src/components/dialog/IDialogButtonForDeleteNote.tsx
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react';
import { useApiForDeleteNote } from '@/hook/notes/useApiForDeleteNote';
import CommonButton from '../common/CommonButton';

interface Props {
  collectionId: string;
  noteId: number;
  noteTitle: string;
}

export const IDialogButtonForDeleteNote = ({
  collectionId,
  noteId,
  noteTitle,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const deleteMutation = useApiForDeleteNote();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        collectionId,
        noteId,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 dark:bg-gray-800">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            노트 삭제
          </DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300 mt-1.5">
            이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4 text-gray-700 dark:text-gray-300">
          <p>
            정말 <span className="font-semibold">"{noteTitle}"</span> 노트를 삭제하시겠습니까?
          </p>
        </div>
        <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 justify-end">
          <CommonButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-9"
          >
            취소
          </CommonButton>
          <CommonButton
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            isLoading={deleteMutation.isPending}
            loadingText="삭제 중..."
            className="h-9"
          >
            삭제
          </CommonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};