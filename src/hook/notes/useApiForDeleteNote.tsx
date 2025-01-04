// src/hook/notes/useApiForDeleteNote.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteNote } from '@/api/notes/apiForNotes';

interface DeleteNoteParams {
  collectionId: string;
  noteId: number;
}

export const useApiForDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ collectionId, noteId }: DeleteNoteParams) => {
      const result = await apiForDeleteNote(collectionId, noteId);
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['notes', variables.collectionId],
      });
      toast.success('노트가 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });
};