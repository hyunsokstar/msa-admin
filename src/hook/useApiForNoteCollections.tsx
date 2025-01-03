// src/hooks/useApiForNoteCollections.ts
import { useQuery } from '@tanstack/react-query';
import { apiForGetNoteCollections, GetNoteCollectionsParams } from '@/api/apiForNoteCollections';
import { PaginatedResponse, NoteCollection } from '@/types/typeForNoteCollections';

export const useApiForNoteCollections = (params: GetNoteCollectionsParams = {}) => {
  const { page = 1, pageSize = 10 } = params;

  return useQuery<PaginatedResponse<NoteCollection[]>, Error>({
    queryKey: ['noteCollections', { page, pageSize }],
    queryFn: apiForGetNoteCollections,
    staleTime: 5000,
  });
};