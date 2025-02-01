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
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import CommonButton from '../common/CommonButton';

interface Props {
  collectionId: string;
  noteId: number;
  noteTitle: string;
  writerEmail: string;  // 작성자 이메일 추가
}

export const IDialogButtonForDeleteNote = ({
  collectionId,
  noteId,
  noteTitle,
  writerEmail,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();
  const deleteMutation = useApiForDeleteNote();

  // 권한 체크 로직
  const isAuthenticated = !!user;
  const isAuthorized = user?.email === writerEmail || user?.is_admin;
  const canDelete = isAuthenticated && isAuthorized;

  // 툴팁 메시지 결정
  const getTooltipMessage = () => {
    if (!isAuthenticated) return '로그인이 필요합니다';
    if (!isAuthorized) return '삭제 권한이 없습니다';
    return '';
  };

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

  // 권한이 없는 경우 disabled 버튼만 표시
  if (!canDelete) {
    return (
      <div className="relative group">
        <CommonButton
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500/50 cursor-not-allowed"
          disabled={true}
        >
          <Trash2 className="h-4 w-4" />
        </CommonButton>
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          {getTooltipMessage()}
        </div>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-600"
          disabled={deleteMutation.isPending}
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