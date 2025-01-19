// src/types/task/typeForTaskDashboard.ts
export type TaskStatus = 'ready' | 'progress' | 'test' | 'complete';

export interface TaskDashboard {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  status: TaskStatus;
  order: number;
  created_at: string;
  created_by: string;
  updated_at: string | null;
  updated_by: string | null;
  is_archived: boolean | null;
}