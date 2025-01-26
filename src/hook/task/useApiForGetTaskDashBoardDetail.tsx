// hooks/task/useTaskDetail.ts
import { useQuery } from '@tanstack/react-query';
import { apiForGetTaskSubTodoList } from '@/api/task/apiForTaskDashBoardDetail';

export function useApiForGetTaskDashBoardDetail(
  id: string | undefined,
  open: boolean
) {
  return useQuery({
    queryKey: ['taskDetail', id],
    queryFn: () => apiForGetTaskSubTodoList(id as string),
    enabled: Boolean(id) && id !== 'undefined' && id !== 'null' && open,
  });
}