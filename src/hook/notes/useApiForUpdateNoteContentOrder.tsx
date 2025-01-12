// src/hooks/notes/useApiForUpdateNoteContentOrder.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNoteContentOrder } from '@/api/notes/apiForNoteContents';
import { toast } from 'react-toastify';

interface OrderChangeItem {
  id: number;
  order: number;
}

export const useApiForUpdateNoteContentOrder = (noteId: string, pageNum: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: OrderChangeItem[]) => updateNoteContentOrder(noteId, items),
    onSuccess: () => {
      // 노트 컨텐츠 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['noteContents', noteId, pageNum],
      });
      toast.success('순서가 변경되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`순서 변경 실패: ${error.message}`);
    },
  });
};