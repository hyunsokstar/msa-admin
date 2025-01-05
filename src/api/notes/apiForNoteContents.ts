// src/api/notes/apiForNoteContents.ts
import { NoteContent,CreateNoteContentData,  NoteContentResponse } from '@/types/notes/typeForNoteContents';

interface GetNoteContentsParams {
  noteId: string;
  pageNum?: number;
}

export const getNoteContents = async ({
  noteId,
  pageNum = 1
}: GetNoteContentsParams): Promise<NoteContentResponse> => {

  console.log("noteId : ", noteId);
  console.log("pageNum : ", pageNum);
  // type 검사
  if (typeof noteId !== 'string') {
    throw new Error('Invalid noteId');
  }  

  try {
    const response = await fetch(`/api/notes/${noteId}/contents?pageNum=${pageNum}`);
    
    const json = await response.json();

    console.log("json : ", json);
    

    // 서버에서 반환된 에러 메시지가 있는지 먼저 확인
    if (json.error) {
      throw new Error(json.error);
    }

    // 응답의 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // data 필드가 있는지 확인
    if (!json.data) {
      throw new Error('Invalid response format: missing data field');
    }

    return {
      data: Array.isArray(json.data) ? json.data : []
    };
    
  } catch (error) {
    console.log("error : ", error);
    
    // 구체적인 에러 메시지 전달
    throw new Error('Failed to fetch note contents: Unknown error');
  }
};

export const createNoteContent = async (noteId: string, data: Partial<CreateNoteContentData>) => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create note content');
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Failed to create note content:', error);
    throw error;
  }
};

export const updateNoteContent = async (noteId: string, contentId: number, data: Partial<NoteContent>) => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: contentId, ...data }),
    });

    if (!response.ok) {
      throw new Error('Failed to update note content');
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error('Failed to update note content:', error);
    throw error;
  }
};

export const deleteNoteContent = async (noteId: string, contentId: number) => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents?id=${contentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete note content');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to delete note content:', error);
    throw error;
  }
};