// src/api/apiForNoteCollections.ts

import { ApiResponse, NoteCollection, PaginatedResponse } from '@/types/typeForNoteCollections';

interface GetNoteCollectionsParams {
  page?: number;
  pageSize?: number;
}

export const apiForGetNoteCollections = async ({
  page = 1,
  pageSize = 10
}: GetNoteCollectionsParams = {}): Promise<PaginatedResponse<NoteCollection[]>> => {
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

    return await response.json();
  } catch (error) {
    console.error('Error in apiForGetNoteCollections:', error);
    throw error;
  }
};