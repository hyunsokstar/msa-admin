// src/api/apiForNoteCollections.ts
import { NoteCollection, PaginatedResponse } from '@/types/typeForNoteCollections';

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