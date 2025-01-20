import { TaskDetail } from "@/types/task/typeForTaskDetail";

// api/task/apiForTaskDashBoardDetail.ts
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