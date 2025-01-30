// types/task/typeForTaskDetail.ts
import { IUser } from "../typeForUser";
import { TaskCodeReview } from "./typeForCodeReviews";

export interface SubTodo {
  id: string;
  task_id: string;
  content: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface RefImage {
  id: string;
  task_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  created_by: string;
}

export interface TaskApiMapping {
  id: string;
  task_id: string;
  endpoint: string;
  method: string;
  description: string | null;
  request_spec: Record<string, any> | null;
  response_spec: Record<string, any> | null;
  headers: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface TaskChat {
  id: string;
  is_left: boolean;
  task_id: string;
  message: string;
  created_at: string;
  created_by_user: {
    id: string;
    full_name: string;
    profile_image_url: string | null;
  };
}

export interface TaskDetail {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  status: string;
  order: number;
  created_at: string;
  created_by: IUser;
  updated_at: string | null;
  updated_by: IUser | null;
  is_archived: boolean | null;
  sub_todos: SubTodo[];
  ref_images: RefImage[];
  task_api_mappings: TaskApiMapping[];
  task_code_reviews: TaskCodeReview[];
  task_chattings: TaskChat[]; // 추가된 부분
}