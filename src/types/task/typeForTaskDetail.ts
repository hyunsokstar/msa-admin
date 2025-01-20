// types/task/typeForTaskDetail.ts
export interface SubTodo {
  id: string;
  task_id: string;
  content: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface TaskDetail {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  status: string;
  created_at: string;
  sub_todos: SubTodo[];
}