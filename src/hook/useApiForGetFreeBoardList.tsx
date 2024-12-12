// src/hooks/useApiForGetFreeBoardList.ts

import { useQuery } from '@tanstack/react-query';
import { apiForGetFreeBoardList } from '../api/apiForFreeBoard';
import { IRequestDtoForApiForGetFreeBoardList } from '../types/typeForFreeBoard';

export const useApiForGetFreeBoardList = (params: IRequestDtoForApiForGetFreeBoardList) => {
  return useQuery({
    queryKey: ['freeBoardList', params],
    queryFn: () => apiForGetFreeBoardList(params),
    staleTime: 5000
  });
};