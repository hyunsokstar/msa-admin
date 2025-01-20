// src/hooks/task/useApiForDragAndDropTask.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiForUpdateTaskStatus } from '@/api/task/apiForTaskDashBoard';
import { TaskStatus } from '@/types/task/typeForTaskDashboard';

interface DragAndDropParams {
  id: string;
  status: TaskStatus; // 새로운 상태
  order: number;      // 새로운 순서
}

export const useApiForDragAndDropTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status, order }: DragAndDropParams) =>
      apiForUpdateTaskStatus(id, status, order), // 전달된 status와 order를 사용
    onSuccess: () => {
      // 드래그 앤 드롭 후 task 목록 갱신
      queryClient.invalidateQueries({ queryKey: ['taskDashboard'] });
    },
    onError: (error) => {
      console.error('Failed to update task via drag-and-drop:', error);
      // TODO: 에러 처리 (예: 토스트 메시지)
    },
  });
};
