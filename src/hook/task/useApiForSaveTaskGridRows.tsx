// C:\Users\terec\msa-admin\src\hook\task\useApiForSaveTaskGridRows.tsx
import { apiForSaveTashDashBoardRowsForGrid } from "@/api/task/apiForTaskDashBoard";
import { TaskDashboardForUpdate } from "@/types/task/typeForTaskDashboard";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // import useMutation, useQueryClient


// Custom hook for saving grid data using React Query useMutation
const useApiForSaveTaskGridRows = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTasks: TaskDashboardForUpdate[]) => apiForSaveTashDashBoardRowsForGrid(updatedTasks),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["taskDashboard"] }); // Invalidate taskDashboard query
        },
        onError: (error) => {
            console.error("Failed to save task grid data:", error);
        },
    });
};

export default useApiForSaveTaskGridRows; // Export custom hook