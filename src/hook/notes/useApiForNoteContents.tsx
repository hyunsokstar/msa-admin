// src/hooks/useApiForNoteContents.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  getNoteContents,
  createNoteContent,
  updateNoteContent,
  deleteNoteContent,
} from '@/api/notes/apiForNoteContents';
import type { NoteContent, NoteContentResponse } from '@/types/notes/typeForNoteContents';

// 조회 Hook
export const useNoteContents = (noteId: string) => {
  return useQuery<NoteContentResponse>({
    queryKey: ['noteContents', noteId],
    queryFn: () => getNoteContents(noteId),
    staleTime: 5000,
  });
};

// 수정 Hook
export const useUpdateNoteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      noteId, 
      contentId, 
      data 
    }: { 
      noteId: string; 
      contentId: number; 
      data: Partial<NoteContent> 
    }) => updateNoteContent(noteId, contentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['noteContents', variables.noteId],
      });
      toast.success('내용이 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`수정 실패: ${error.message}`);
    },
  });
};

// 삭제 Hook
export const useDeleteNoteContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, contentId }: { noteId: string; contentId: number }) => 
      deleteNoteContent(noteId, contentId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['noteContents', variables.noteId],
      });
      toast.success('내용이 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });
};