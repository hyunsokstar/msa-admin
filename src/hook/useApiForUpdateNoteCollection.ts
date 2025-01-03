// src/hooks/useApiForUpdateNoteCollection.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { 
  apiForUpdateNoteCollection, 
} from '@/api/apiForNoteCollections';
import { UpdateNoteCollectionDto } from '@/types/typeForNoteCollections';

interface UpdateNoteCollectionParams {
  id: number;
  data: UpdateNoteCollectionDto;
}

export const useApiForUpdateNoteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateNoteCollectionParams) => {
      const result = await apiForUpdateNoteCollection(id, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['noteCollections'],
      });
      toast.success('노트 컬렉션이 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`수정 실패: ${error.message}`);
    },
  });
};