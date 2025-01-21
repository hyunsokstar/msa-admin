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
}

export interface PersonalDevSpecsResponse {
  data: PersonalDevSpec[];
}