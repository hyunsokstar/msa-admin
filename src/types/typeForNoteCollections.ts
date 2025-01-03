// src/types/typeForNoteCollections.ts
export interface Writer {
  id: string;
  full_name: string | null;
  profile_image_url: string | null;  // API 응답과 일치하도록 유지
}

export interface NoteCollection {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  writer: Writer | null;
}

export interface PaginationInfo {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface GetNoteCollectionsParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T;
  pagination: PaginationInfo;
  error?: string;
}