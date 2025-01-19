// src/api/task/apiForTaskDashBoard.ts
"use client";

import { TaskDashboard, TaskStatus } from "@/types/task/typeForTaskDashboard";

/** GET: TaskDashboard 전체 리스트 */
export async function apiForGetTaskDashBoardList(): Promise<TaskDashboard[]> {
  const response = await fetch('/api/task-dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log("response 존재? ", response);

  if (!response.ok) {
    throw new Error('Failed to fetch task dashboard data');
  }

  const { data } = await response.json();
  console.log("data 존재? ", data);

  // data가 TaskDashboard[] 형태인지 확인
  return data as TaskDashboard[];
}

/** PATCH: TaskDashboard status 업데이트 */
export async function apiForUpdateTaskStatus(
  id: string,
  status: TaskStatus,
  order: number
): Promise<TaskDashboard> {
  const response = await fetch('/api/task-dashboard', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, status, order }),
  });

  console.log("response 존재? ", response);

  if (!response.ok) {
    throw new Error('Failed to update task status');
  }

  const { data } = await response.json();
  return data as TaskDashboard;
}
