// src/hooks/useApiForGetNoteCollections.ts

import { useQuery } from '@tanstack/react-query';
import { apiForGetNoteCollections } from '@/api/notes/apiForNoteCollections';
import { GetNoteCollectionsParams } from '@/types/typeForNoteCollections';

export const useApiForGetNoteCollections = (params: GetNoteCollectionsParams = {}) => {
  return useQuery({
    queryKey: ['noteCollections', params],
    queryFn: () => apiForGetNoteCollections(params),
    staleTime: 5000,
    placeholderData: (previousData) => previousData // 페이지 전환시 이전 데이터 유지
  });
};