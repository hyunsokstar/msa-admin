// C:\Users\terec\msa-admin\src\types\typeForPersonalDevSpec.ts

export interface CreatePersonalDevSpecDto {
  name: string;
  parent_id: number | null;
  status: string;
  created_by: string;
  sort_order: number;
  is_active: boolean;
}

export interface PersonalDevSpecResponse {
  data: {
    id: number;
    name: string;
    parent_id: number | null;
    status: string;
    created_by: string;
    sort_order: number;
    is_active: boolean;
  };
}