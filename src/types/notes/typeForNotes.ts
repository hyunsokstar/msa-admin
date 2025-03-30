import { z } from 'zod'

// src\types\notes\typeForNotes.ts
export interface Note {
  id: number
  collection_id: number
  title: string
  created_at: string
  updated_at: string
  writer?: {
    id: string
    full_name: string
    email: string
    profile_image_url?: string
  }
}

export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> {
  data: T
  pagination: Pagination
}

export interface GetNotesParams {
  page?: number
  pageSize?: number
}

export interface ICreateNoteData {
  title: string
  collectionId: string
  writer: string
}

export const createNoteSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자를 초과할 수 없습니다.')
})

export type CreateNoteFormData = z.infer<typeof createNoteSchema>

export interface UpdateNoteData {
  id: number
  title: string
}

// 추가: 노트 순서 변경을 위한 타입
export interface OrderChangeItem {
  id: number
  order: number
}
