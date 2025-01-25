import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForDeleteRefImageForTaskId } from '@/api/task/apiForTaskDashBoardDetail';

export const useApiForDeleteRefImageForTask = (taskId: any) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      return await apiForDeleteRefImageForTaskId(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        
        queryKey: ['taskDetail', taskId],
      });
      toast.success('참조 이미지가 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(`삭제 실패: ${error.message}`);
    },
  });
};