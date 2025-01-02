export interface UpdateHeaderNavDto {
    name: string;
    path: string;
}

export interface CreateMenuDto {
  name: string;
  path: string;
  parent_id: number | null;
  sort_order?: number;
}