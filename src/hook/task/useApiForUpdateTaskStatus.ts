// src/hook/task/useApiForUpdateTaskStatus.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateTaskStatus } from '@/api/task/apiForTaskDashBoard';
import { TaskStatus } from '@/types/task/typeForTaskDashboard';

interface UpdateTaskStatusParams {
  id: string;
  status: TaskStatus;
  order: number;
}

export const useApiForUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, order }: UpdateTaskStatusParams) => 
      apiForUpdateTaskStatus(id, status, order),
    onSuccess: () => {
      // task 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['taskDashboard'] });
    },
    onError: (error) => {
      console.error('Failed to update task status:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  });
};