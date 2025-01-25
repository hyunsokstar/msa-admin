// C:\Users\terec\msa-admin\src\api\task\apiForTaskDashBoardDetail.ts
import { TaskDetail } from "@/types/task/typeForTaskDetail";

export const apiForDeleteRefImageForTaskId = async (imageId: string): Promise<boolean> => {
  const response = await fetch(`/api/task-dashboard/${imageId}/reference-image`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to delete reference image');
  }

  const { success } = await response.json();
  return success;
};

// apiForDeleteReferenceImageForTask
export const apiForCreateReferenceImageForTask = async (taskId: string, imageUrls: string[]): Promise<boolean> => {
  const response = await fetch(`/api/task-dashboard/${taskId}/reference-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrls }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to save reference images');
  }

  const { success } = await response.json();
  return success;
};

export async function apiForGetTaskSubTodoList(id: string): Promise<TaskDetail> {
  console.log("Requesting task detail for ID:", id);  // 디버깅용 로그 추가

  const response = await fetch(`/api/task-dashboard/${id}/detail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);  // 디버깅용 로그 추가
    throw new Error(errorData.error || 'Failed to fetch task detail');
  }

  const { data } = await response.json();
  return data as TaskDetail;
}