import { apiForMoveTaskInfoFromArchivedListToTaskHistory } from "@/api/apiForTaskHistory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiForMoveTaskToHistory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiForMoveTaskInfoFromArchivedListToTaskHistory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["archivedTasks"] });
        },
    });
};
