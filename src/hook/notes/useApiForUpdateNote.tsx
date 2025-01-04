// src/hook/notes/useApiForUpdateNote.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateNote } from '@/api/notes/apiForNotes';

interface UpdateNoteParams {
  collectionId: string;
  noteId: number;
  data: {
    title: string;
  };
}

export const useApiForUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, noteId, data }: UpdateNoteParams) => {
      const result = await apiForUpdateNote(collectionId, noteId, data);
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', variables.collectionId],
      });
      toast.success('노트가 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`수정 실패: ${error.message}`);
    },
  });
};