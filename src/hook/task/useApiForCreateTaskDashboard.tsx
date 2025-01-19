import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiForCreateTaskDashboard } from "@/api/task/apiForTaskDashBoard";
import { TaskDashboard } from "@/types/task/typeForTaskDashboard";

export const useApiForCreateTaskDashboard = () => {
  const queryClient = useQueryClient();

  return useMutation<
    TaskDashboard,
    Error,
    {
      title: string;
      description: string;
      screen_url: string;
      isArchived: boolean;
      figmaUrl: string;
      createdBy: string;
    }
  >({
    mutationFn: async (task) => {
      try {
        const result = await apiForCreateTaskDashboard(task);
        toast.success("Task dashboard created successfully");
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create task dashboard";
        toast.error(`Error: ${errorMessage}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskDashboard"] });
    },
  });
};

export default useApiForCreateTaskDashboard;
