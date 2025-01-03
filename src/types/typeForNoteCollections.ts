import { z } from 'zod';


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

// src/types/typeForNoteCollections.ts
export interface CreateNoteCollectionDto {
  name: string;
  writer: string;  // writer ID
}

export interface CreateNoteCollectionResponse {
  data: NoteCollection;
  error?: string;
}

// 기존 타입 정의 아래에 추가
export const createNoteCollectionSchema = z.object({
  name: z.string()
    .min(1, '컬렉션 이름은 필수입니다.')
    .max(100, '컬렉션 이름은 100자를 초과할 수 없습니다.')
});

export type CreateNoteCollectionFormData = z.infer<typeof createNoteCollectionSchema>;