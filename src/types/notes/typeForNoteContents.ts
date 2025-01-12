// src/types/notes/typeForNoteContents.ts

// POST 요청용 타입
export interface CreateNoteContentData {
  title: string;
  content: string;
  page: number;
  order: number;
  path: string;
  writer: string; // writer의 id만 필요
}

// src/types/notes/typeForNoteContents.ts
export interface NoteContent {
  id: number;
  note_id: number;
  title: string | null;
  content: string;
  page: number | null;
  order: number | null;
  path: string;
  created_at: string;
  updated_at: string;
  writer?: {
    id: string;
    full_name: string;
    profile_image_url?: string;
  };
}

export interface NoteContentResponse {
  data: NoteContent[];
  pages: number[];  // 실제 존재하는 페이지 번호 배열
}