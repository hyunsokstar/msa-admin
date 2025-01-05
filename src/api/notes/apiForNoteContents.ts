// src/api/notes/apiForNoteContents.ts
import { NoteContent,CreateNoteContentData,  NoteContentResponse } from '@/types/notes/typeForNoteContents';

export const getNoteContents = async (noteId: string): Promise<NoteContentResponse> => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch note contents');
    }
    
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch note contents:', error);
    throw error;
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