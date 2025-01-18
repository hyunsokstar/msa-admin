// src/types/typeForTaskDashboard.ts
export type TaskStatus = 'ready' | 'progress' | 'test' | 'complete';

export interface TaskDashboard {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  status: TaskStatus;
  created_at: string;
  created_by: string;
}