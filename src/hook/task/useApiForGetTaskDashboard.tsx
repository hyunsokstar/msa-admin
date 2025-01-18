// src/hooks/useApiForGetTaskDashboard.ts
import { apiForGetTaskDashBoardList } from '@/api/task/apiForTaskDashBoard';
import { useQuery } from '@tanstack/react-query';

export const useApiForGetTaskDashboard = () => {
  return useQuery({
    queryKey: ['taskDashboard'],
    queryFn: apiForGetTaskDashBoardList,
    staleTime: 5000,
    placeholderData: (previousData) => previousData
  });
};