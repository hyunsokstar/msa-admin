// src/hooks/useApiForCreateNoteCollection.tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreateNoteCollectionDto, NoteCollection } from '@/types/typeForNoteCollections';
import { createNoteCollection } from '@/api/apiForNoteCollections';

export const useApiForCreateNoteCollection = () => {
  const queryClient = useQueryClient();

  return useMutation<NoteCollection, Error, CreateNoteCollectionDto>({
    mutationFn: async (noteCollectionData: CreateNoteCollectionDto) => {
      try {
        const result = await createNoteCollection(noteCollectionData);
        toast.success('노트 컬렉션이 성공적으로 생성되었습니다.');
        return result.data;
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : '노트 컬렉션 생성 중 오류가 발생했습니다.';
        toast.error(`생성 실패: ${errorMessage}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['noteCollections'],
      });
    },
  });
};

export default useApiForCreateNoteCollection;