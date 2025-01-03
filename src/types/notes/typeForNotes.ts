// src\types\notes\typeForNotes.ts
export interface Note {
  id: number;
  collection_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  writer?: {
    id: string;
    full_name: string;
    profile_image_url?: string;
  };
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T;
  pagination: Pagination;
}

export interface GetNotesParams {
  page?: number;
  pageSize?: number;
}