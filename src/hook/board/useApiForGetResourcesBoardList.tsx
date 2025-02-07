// src/hooks/useApiForGetResourcesBoardList.ts
import { useQuery } from '@tanstack/react-query';
import { apiForGetResourcesBoardList, GetResourcesBoardParams } from '@/api/apiForResourcesBoard';

export const useApiForGetResourcesBoardList = (params: GetResourcesBoardParams = {}) => {
    return useQuery({
        queryKey: ['resourcesBoard', params],
        queryFn: () => apiForGetResourcesBoardList(params),
        staleTime: 5000,
        placeholderData: (previousData) => previousData
    });
};