import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskDashboard, TaskDashboardForUpdate } from "@/types/task/typeForTaskDashboard";
import { apiForUpdateTask } from "@/api/task/apiForTaskDashBoard";

export const useApiForUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedTask: TaskDashboardForUpdate) => apiForUpdateTask(updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskDashboard"] });
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });
};

export default useApiForUpdateTask;