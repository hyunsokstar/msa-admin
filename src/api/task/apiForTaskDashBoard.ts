"use client";

import { TaskDashboard } from "@/types/task/typeForTaskDashboard";

export async function apiForGetTaskDashBoardList(): Promise<TaskDashboard[]> {
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
}

export async function apiForUpdateTaskStatus(
  id: string,
  status: string,
  order: number
): Promise<TaskDashboard> {
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
}

export async function apiForCreateTaskDashboard(task: {
  title: string;
  description: string;
  coverUrl: string;
  isArchived: boolean;
  figmaUrl: string;
  createdBy: string;
}): Promise<TaskDashboard> {
  const response = await fetch('/api/task-dashboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task dashboard');
  }

  const { data } = await response.json();
  return data as TaskDashboard;
}
