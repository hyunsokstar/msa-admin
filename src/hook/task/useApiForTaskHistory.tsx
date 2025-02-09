// src/hooks/task/useApiForGetTaskHistory.ts
import { apiForGetTaskHistoryList } from '@/api/apiForTaskHistory';
import { useQuery } from '@tanstack/react-query';

export const useApiForGetTaskHistory = () => {
    return useQuery({
        queryKey: ['taskHistory'],
        queryFn: apiForGetTaskHistoryList,
    });
};
