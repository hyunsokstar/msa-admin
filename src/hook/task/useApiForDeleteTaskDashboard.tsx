// src/hooks/useApiForDeleteTaskDashboard.ts
import { apiForDeleteTaskDashboard } from '@/api/task/apiForTaskDashBoard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface DeleteTaskParams {
  id: string;
  title: string;
}

export const useApiForDeleteTaskDashboard = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationFn: async (params: DeleteTaskParams) => {
      console.log('Delete mutation started:', params);

      // if (!window.confirm(`"${params.title}" 태스크를 삭제하시겠습니까?`)) {
      //   console.log('User cancelled deletio  n');
      //   throw new Error('사용자가 삭제를 취소했습니다.');
      // }

      const success = await apiForDeleteTaskDashboard(params.id);
      console.log('API response:', success);

      if (!success) {
        throw new Error('태스크 삭제에 실패했습니다.');
      }
      return success;
    },
    onMutate: (variables) => {
      console.log('Before mutation:', variables);
      const previousTasks = queryClient.getQueryData(['taskDashboard']);
      return { previousTasks };
    },
    onSuccess: () => {
      console.log('Mutation successful');
      queryClient.invalidateQueries({
        queryKey: ['taskDashboard'],
        exact: true
      });
      toast.success('태스크가 성공적으로 삭제되었습니다.');
    },
    onError: (error: Error, variables, context) => {
      console.error('Mutation error:', error);
      if (context?.previousTasks) {
        queryClient.setQueryData(['taskDashboard'], context.previousTasks);
      }
      if (error.message !== '사용자가 삭제를 취소했습니다.') {
        toast.error(error.message);
      }
    },
    onSettled: () => {
      console.log('Mutation completed');
    }
  });

  return {
    deleteTask,
    isDeleting
  };
};