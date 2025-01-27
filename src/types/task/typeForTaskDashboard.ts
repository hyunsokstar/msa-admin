// src/types/task/typeForTaskDashboard.ts

// 기존 타입들...
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

// API 스펙 관련 새로운 타입들
export interface TaskApiSpec {
  id: string;
  task_id: string;
  endpoint: string;
  method: string;
  description: string | null;
  request_spec: Record<string, any>;  // JSONB 타입
  response_spec: Record<string, any>; // JSONB 타입
  headers: Record<string, any>;       // JSONB 타입
  created_at: string;
  updated_at: string;
}

// TaskDashboard 인터페이스 업데이트
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
  task_api_mappings?: TaskApiSpec[]; // API 스펙 정보 추가
  sub_todos?: SubTodo[];            // 기존 sub_todos 타입도 명시적으로 추가
  ref_images?: RefImage[];          // 기존 ref_images 타입도 명시적으로 추가
}

// SubTodo 인터페이스 (이미 있다면 그대로 사용)
export interface SubTodo {
  id: string;
  content: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
  task_id: string;
}

// RefImage 인터페이스 (이미 있다면 그대로 사용)
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

// API 스펙 생성을 위한 인터페이스
export interface ICreateTaskApiSpec {
  task_id: string;
  endpoint: string;
  method: string;
  description?: string;
  request_spec?: Record<string, any>;
  response_spec?: Record<string, any>;
  headers?: Record<string, any>;
}

// API 스펙 업데이트를 위한 인터페이스
export interface IUpdateTaskApiSpec extends Partial<Omit<ICreateTaskApiSpec, 'task_id'>> {
  id: string;
}