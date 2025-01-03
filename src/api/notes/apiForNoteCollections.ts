// src/api/apiForNoteCollections.ts
import { CreateNoteCollectionDto, CreateNoteCollectionResponse, NoteCollection, PaginatedResponse, UpdateNoteCollectionDto, UpdateNoteCollectionResponse } from '@/types/typeForNoteCollections';

export interface GetNoteCollectionsParams {
  page?: number;
  pageSize?: number;
}

export const apiForGetNoteCollections = async (context: any) => {
  const [_, params] = context.queryKey;
  const { page = 1, pageSize = 10 } = params as GetNoteCollectionsParams;

  try {
    const response = await fetch(
      `/api/note-collections?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch note collections');
    }

    const responseData = await response.json();
    console.log('Response data:', responseData);
    return responseData;

  } catch (error) {
    console.error('Error in apiForGetNoteCollections:', error);
    throw error;
  }
};

export const createNoteCollection = async (data: CreateNoteCollectionDto): Promise<CreateNoteCollectionResponse> => {
  try {
    const response = await fetch('/api/note-collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Response:', response);
    

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create note collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in createNoteCollection:', error);
    throw error;
  }
};

export const apiForUpdateNoteCollection = async (
  id: number,
  data: UpdateNoteCollectionDto
): Promise<UpdateNoteCollectionResponse> => {
  try {
    const response = await fetch(`/api/note-collections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update note collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in apiForUpdateNoteCollection:', error);
    throw error;
  }
};

// note collections 삭제 API
export const apiForDeleteNoteCollection = async (id: number): Promise<{ success: boolean }> => {
  console.log("삭제할 id : ", id);
  
  try {
    const response = await fetch(`/api/note-collections/${id}`, {
      method: 'DELETE',
    });

    console.log('Response:', response);
    

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete note collection');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in apiForDeleteNoteCollection:', error);
    throw error;
  }
};