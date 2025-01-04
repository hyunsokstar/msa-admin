// src/types/notes/typeForNoteContents.ts
export interface NoteContent {
  id: number;
  note_id: number;
  title: string | null;
  content: string;
  page: number | null;
  order: number | null;
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
}