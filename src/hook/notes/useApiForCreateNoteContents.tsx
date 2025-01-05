// 생성 Hook
// src/hooks/useApiForNoteContents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  getNoteContents,
  createNoteContent,
  updateNoteContent,
  deleteNoteContent,
} from '@/api/notes/apiForNoteContents';
import type { CreateNoteContentData, NoteContentResponse } from '@/types/notes/typeForNoteContents';

export const useCreateNoteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, data }: { noteId: string; data: Partial<CreateNoteContentData> }) => 
      createNoteContent(noteId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['noteContents', variables.noteId],
      });
      toast.success('내용이 추가되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`추가 실패: ${error.message}`);
    },
  });
};