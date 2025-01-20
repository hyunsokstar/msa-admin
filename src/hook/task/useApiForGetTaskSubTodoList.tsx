// hooks/task/useTaskDetail.ts
import { useQuery } from '@tanstack/react-query';
import { apiForGetTaskSubTodoList } from '@/api/task/apiForTaskDashBoardDetail';

export function useApiForGetTaskSubTodoList(id: string | undefined) {
  return useQuery({
    queryKey: ['taskDetail', id],
    queryFn: () => apiForGetTaskSubTodoList(id as string),
    // enabled: Boolean(id) && id !== 'undefined' && id !== 'null',
    // 아래와 같이 더 엄격한 타입 체크도 가능합니다
    // enabled: typeof id === 'string' && id.length > 0,
  });
}