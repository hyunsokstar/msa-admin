// src/hooks/notes/useApiForDeleteNoteContent.ts
import { useQueryClient } from '@tanstack/react-query';
import { deleteNoteContent } from '@/api/notes/apiForNoteContents';
import { useState } from 'react';
import { toast } from 'react-toastify'; // react-toastify import

interface UseApiForDeleteNoteContentProps {
  noteId: string;
  pageNum?: number;
}

const useApiForDeleteNoteContent = ({ noteId, pageNum }: UseApiForDeleteNoteContentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (contentId: number) => {
    setIsLoading(true);
    setError(null);
    
    console.log("noteId : ", noteId);
    console.log("pageNum : ", pageNum);

    try {
      await deleteNoteContent(noteId, contentId);
      // Invalidate and refetch queries
      await queryClient.invalidateQueries({
        queryKey: ['noteContents', noteId, pageNum]
      });

      // 성공 메시지 출력
      toast.success('노트 내용이 삭제되었습니다.'); 
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete note content'));
      // 에러 메시지 출력
      toast.error('노트 내용을 삭제하는 데 실패했습니다.'); 
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteNoteContent: handleDelete,
    isLoading,
    error
  };
};

export default useApiForDeleteNoteContent;