// src/api/task/apiForTaskDashBoard.ts
import { TaskDashboard, TaskStatus } from "@/types/task/typeForTaskDashboard";

export const apiForGetTaskDashBoardList = async () => {
  const response = await fetch('/api/task-dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch task dashboard data');
  }

  const { data } = await response.json();
  return data as TaskDashboard[];
};

export const apiForUpdateTaskStatus = async (
  id: string,
  status: TaskStatus,
  order: number
) => {
  const response = await fetch('/api/task-dashboard', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status, order }),
  });

  if (!response.ok) {
    throw new Error('Failed to update task status');
  }

  const { data } = await response.json();
  return data as TaskDashboard;
};