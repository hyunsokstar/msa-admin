// src/api/user/apiForProfile.ts
export interface PersonalDevSpec {
  id: number;
  name: string;
  parent_id: number | null;
  status: string;
  sort_order: number;
  is_active: boolean;
  created_by: string;
  children?: PersonalDevSpec[];
  type?: 'folder' | 'item'; // 추가
  is_folder?: boolean; // 추가
}

export interface PersonalDevSpecsResponse {
  data: PersonalDevSpec[];
}