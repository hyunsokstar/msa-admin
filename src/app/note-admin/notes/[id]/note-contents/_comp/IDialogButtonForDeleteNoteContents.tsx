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

interface IDialogButtonForDeleteNoteContentsProps {
  onConfirm: () => void;
  isLoading?: boolean;
}

const IDialogButtonForDeleteNoteContents = ({ 
  onConfirm,
  isLoading 
}: IDialogButtonForDeleteNoteContentsProps) => {
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
            onClick={onConfirm}
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