// src/hooks/useApiForNotes.ts
import { getNotesByCollectionId } from '@/api/notes/apiForNotes';
import { GetNotesParams, Note, PaginatedResponse } from '@/types/notes/typeForNotes';
import { useQuery } from '@tanstack/react-query';

interface UseNotesParams extends GetNotesParams {
  collectionId: string;
}

export const useApiForGetNotesForNoteCollection = ({ collectionId, page = 1, pageSize = 10 }: UseNotesParams) => {
  return useQuery<PaginatedResponse<Note[]>, Error>({
    queryKey: ['notes', collectionId, { page, pageSize }],
    queryFn: () => getNotesByCollectionId(collectionId, { page, pageSize }),
    staleTime: 5000,
  });
};