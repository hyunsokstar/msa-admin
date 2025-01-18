// src/api/task/apiForTaskDashBoard.ts

import { TaskDashboard } from "@/types/task/typeForTaskDashboard";

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