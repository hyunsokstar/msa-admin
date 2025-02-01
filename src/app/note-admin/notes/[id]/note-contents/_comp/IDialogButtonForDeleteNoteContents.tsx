import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import CommonButton from '@/components/common/CommonButton';
import { useUserStore } from '@/store/useUserStore';
import useApiForDeleteNoteContent from '@/hook/notes/useApiForDeleteNoteContent';
import { useQueryClient } from '@tanstack/react-query';

interface IDialogButtonForDeleteNoteContentsProps {
  contentId: number;
  writerEmail: string;
  noteId: string;
  pageNum?: number;
}

const IDialogButtonForDeleteNoteContents = ({
  contentId,
  writerEmail,
  noteId,
  pageNum,
}: IDialogButtonForDeleteNoteContentsProps) => {
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();
  const { deleteNoteContent, isLoading } = useApiForDeleteNoteContent({
    noteId,
    pageNum
  });

  // 권한 체크 로직
  const isAuthenticated = !!user;
  const isAuthorized = user?.email === writerEmail || user?.is_admin;

  const handleDelete = async () => {
    try {
      await deleteNoteContent(contentId);
      // 성공 시 캐시 무효화
    } catch (error) {
      console.error('Failed to delete note content:', error);
    }
  };

  // 툴팁 메시지 결정
  const getTooltipMessage = () => {
    if (!isAuthenticated) return '로그인이 필요합니다';
    if (!isAuthorized) return '삭제 권한이 없습니다';
    return '';
  };

  // 권한이 없는 경우 disabled 버튼만 표시
  if (!isAuthenticated || !isAuthorized) {
    return (
      <div className="relative group">
        <CommonButton
          variant="destructive"
          size="icon"
          className="h-10 w-10 opacity-50 cursor-not-allowed"
          disabled={true}
        >
          <Trash2 className="h-5 w-5" />
        </CommonButton>
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          {getTooltipMessage()}
        </div>
      </div>
    );
  }

  // 권한이 있는 경우 삭제 다이얼로그 표시
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <CommonButton
          variant="destructive"
          size="icon"
          className="h-10 w-10"
          disabled={isLoading}
        >
          <Trash2 className="h-5 w-5" />
        </CommonButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-lg shadow-md">
        <AlertDialogHeader>
          <AlertDialogTitle>노트 내용 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            이 노트 내용을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            {isLoading ? '삭제 중...' : '삭제'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IDialogButtonForDeleteNoteContents;