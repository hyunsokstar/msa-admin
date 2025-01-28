// src/types/task/typeForTaskDashboard.ts
export type TaskStatus = 'ready' | 'progress' | 'test' | 'complete';

export interface User {
  id: string;
  email: string;
  is_admin?: boolean;
  full_name?: string;
  created_at?: string;
  updated_at?: string;
  phone_number?: string | null;
  organization_id?: string | null;
  profile_image_url?: string | null;
}

export interface TaskApiSpec {
  id: string;
  task_id: string;
  endpoint: string;
  method: string;
  description: string | null;
  request_spec: Record<string, any> | null;  // null 허용으로 수정
  response_spec: Record<string, any> | null; // null 허용으로 수정
  headers: Record<string, any> | null;       // null 허용으로 수정
  created_at: string;
  updated_at: string;
}

export interface TaskCodeReview {
  id: number;
  task_id: string;
  content: string;
  title: string;
  created_at: string;
  updated_at: string;
  page: number;
  order: number;
  writer: User;
  path: string;
}

export interface TaskDashboard {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  status: TaskStatus;
  order: number;
  created_at: string;
  created_by_user: User;
  updated_at: string | null;
  updated_by: User | null;
  is_archived: boolean | null;
  task_api_mappings?: TaskApiSpec[];
  task_code_reviews?: TaskCodeReview[];
  sub_todos?: SubTodo[];
  ref_images?: RefImage[];
}

export interface SubTodo {
  id: string;
  content: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  task_id: string;
}

export interface RefImage {
  id: string;
  task_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TaskDashboardForUpdate {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  is_archived: boolean | null;
  status?: TaskStatus;
  order?: number;
  created_at?: string;
  created_by?: User;
  updated_at?: string | null;
  updated_by?: User | null;
}

export interface ICreateForTaskBoard {
  title: string;
  description: string;
  screen_url: string;
  figmaUrl: string;
  isArchived: boolean;
  createdBy: string;
}

export interface ICreateTaskApiSpec {
  task_id: string;
  endpoint: string;
  method: string;
  description?: string;
  request_spec?: Record<string, any> | null;
  response_spec?: Record<string, any> | null;
  headers?: Record<string, any> | null;
}

export interface ICreateTaskCodeReview {
  task_id: string;
  content: string;
  title: string;
  page?: number;
  order?: number;
  writer: string;
}

export interface IUpdateTaskApiSpec extends Partial<Omit<ICreateTaskApiSpec, 'task_id'>> {
  id: string;
}

export interface IUpdateTaskCodeReview extends Partial<Omit<ICreateTaskCodeReview, 'task_id' | 'writer'>> {
  id: number;
}