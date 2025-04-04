"use client";

import { TaskDashboard, TaskDashboardForUpdate } from "@/types/task/typeForTaskDashboard";

export async function apiForSaveTashDashBoardRowsForGrid(tasks: TaskDashboardForUpdate[]): Promise<boolean> {
  try {
    console.log('Request payload for grid save:', tasks);

    const response = await fetch(`/api/task-dashboard/grid-save`, { // grid-save 엔드포인트
      method: "PUT", // PUT 메서드
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks }), // tasks 배열 body에 담기
    });

    const responseData = await response.json();
    console.log('Grid save Response:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to save task grid data: ${responseData.error || 'Unknown error'}`);
    }

    return responseData.success as boolean; // 성공 여부 boolean으로 반환
  } catch (error) {
    console.error('Task grid save error:', error);
    throw error;
  }
}

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

// src/api/task/apiForTaskDashBoard.ts에 추가
export async function apiForDeleteTaskDashboard(id: string): Promise<boolean> {

  try {
    const response = await fetch(`/api/task-dashboard/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete task dashboard');
    }

    const { success } = await response.json();
    return success;
  } catch (error) {
    console.error('Delete task error:', error);
    throw error;
  }
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

  console.log("reponse check : ", response);
  

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

// src\api\task\apiForTaskDashBoard.ts
export async function apiForUpdateTask(task: TaskDashboardForUpdate): Promise<TaskDashboard> {
  try {
    console.log('Request payload:', task);

    const response = await fetch(`/api/task-dashboard/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const responseData = await response.json();
    console.log('Response:', responseData);

    if (!response.ok) {
      throw new Error(`Failed to update task: ${responseData.error || 'Unknown error'}`);
    }

    return responseData.data as TaskDashboard;
  } catch (error) {
    console.error('Task update error:', error);
    throw error;
  }
}
