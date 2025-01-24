import { IUser } from "../typeForChatRoom";

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
  created_by: IUser;
  sub_todos: SubTodo[];
  ref_images: RefImage[];  // Added this line
}

// Add new interface
export interface RefImage {
  id: string;
  task_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  created_by: string;
}