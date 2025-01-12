import { z } from 'zod';


// src/types/typeForNoteCollections.ts
export interface Writer {
  id: string;
  full_name: string | null;
  profile_image_url: string | null;  // API 응답과 일치하도록 유지
}

// types/typeForNoteCollections.ts
export interface NoteCollection {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  writer: Writer | null;
  note_count: number;
}

export interface PaginatedResponse<T> {
  data: T;
  pages: number[];  // 페이지 목록 추가
  pagination: {
    currentPage: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
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

export interface UpdateNoteCollectionDto {
  name: string;
}

export interface UpdateNoteCollectionResponse {
  data: NoteCollection;
  error?: string;
}

// 타입 가드용 타입
export type PaginatedNoteCollectionResponse = PaginatedResponse<NoteCollection[]>;