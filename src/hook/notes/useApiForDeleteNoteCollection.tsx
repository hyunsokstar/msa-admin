// src/hooks/useApiForDeleteNoteCollection.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteNoteCollection } from '@/api/notes/apiForNoteCollections';

export const useApiForDeleteNoteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await apiForDeleteNoteCollection(id);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['noteCollections'],
      });
      toast.success('노트 컬렉션이 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });
};