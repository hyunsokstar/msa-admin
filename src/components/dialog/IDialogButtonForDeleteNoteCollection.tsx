import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';
import { useApiForDeleteNoteCollection } from '@/hook/notes/useApiForDeleteNoteCollection';
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';

interface IDialogButtonForDeleteNoteCollectionProps {
  collectionId: number;
  collectionName: string;
  writerEmail: string;  // 작성자 이메일 추가
}

export const IDialogButtonForDeleteNoteCollection = ({
  collectionId,
  collectionName,
  writerEmail,
}: IDialogButtonForDeleteNoteCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();
  const deleteMutation = useApiForDeleteNoteCollection();

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
      await deleteMutation.mutateAsync(collectionId);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete note collection:', error);
    }
  };

  // 권한이 없는 경우 disabled 버튼만 표시
  if (!canDelete) {
    return (
      <div className="relative group">
        <CommonButton
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-red-300 cursor-not-allowed"
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
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
          disabled={deleteMutation.isPending}
        >
          <Trash2 className="h-4 w-4" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader className="relative pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            노트 컬렉션 삭제
          </DialogTitle>
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