import { GetNotesParams, Note, PaginatedResponse } from "@/types/notes/typeForNotes";

export const getNotesByCollectionId = async (
  collectionId: string, 
  params: GetNotesParams = {}
): Promise<PaginatedResponse<Note[]>> => {
  const { page = 1, pageSize = 10 } = params;
  
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString()
    });

    const response = await fetch(
      `/api/note-collections/${collectionId}/notes?${queryParams}`
    );

    console.log('response:', response);
    
    
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};