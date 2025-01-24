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

export interface TaskDashboard {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  status: TaskStatus;
  order: number;
  created_at: string;
  /** 수정: created_by가 유저 객체를 통째로 가진다고 가정 */
  created_by_user: User;    
  updated_at: string | null;
  /** 수정: updated_by 또한 유저 객체 (null 가능) */
  updated_by: User | null;
  is_archived: boolean | null;
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
  createdBy: string; // 사용자 ID 또는 유저 정보
}
