import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForCreateReferenceImageForTask } from '@/api/task/apiForTaskDashBoardDetail';

export const useApiForCreateReferenceImageForTask = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (files: string[]) => {
      try {
        const result = await apiForCreateReferenceImageForTask(taskId, files);
        toast.success('참조 이미지가 업로드되었습니다.');
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : '이미지 업로드 중 오류가 발생했습니다.';
        toast.error(`업로드 실패: ${errorMessage}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['taskDetail', taskId],
      });
    },
  });
};