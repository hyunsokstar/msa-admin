// C:\Users\terec\msa-admin\src\api\notes\apiForNotes.ts
import {
  GetNotesParams,
  ICreateNoteData,
  Note,
  OrderChangeItem,
  PaginatedResponse
} from '@/types/notes/typeForNotes'

// todo:
// 노트 순서 변경 api 필요 with nextjs15 server route
// apiForUpdateNoteOrder

export const getNotesByCollectionId = async (
  collectionId: string,
  params: GetNotesParams = {}
): Promise<PaginatedResponse<Note[]>> => {
  const { page = 1, pageSize = 10 } = params

  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString()
    })

    const response = await fetch(
      `/api/note-collections/${collectionId}/notes?${queryParams}`
    )

    console.log('response:', response)

    if (!response.ok) {
      throw new Error('Failed to fetch notes')
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('Failed to fetch notes:', error)
    throw error
  }
}

export const apiForCreateNote = async (data: ICreateNoteData) => {
  try {
    const response = await fetch(
      `/api/note-collections/${data.collectionId}/notes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          writer: data.writer
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create note')
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('Failed to create note:', error)
    throw error
  }
}

// 노트 수정 API
export const apiForUpdateNote = async (
  collectionId: string,
  noteId: number,
  data: { title: string }
): Promise<Note> => {
  try {
    const response = await fetch(
      `/api/note-collections/${collectionId}/notes`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: noteId,
          title: data.title
        })
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update note')
    }

    const json = await response.json()
    return json.data
  } catch (error) {
    console.error('Failed to update note:', error)
    throw error
  }
}

// 노트 삭제 API
export const apiForDeleteNote = async (
  collectionId: string,
  noteId: number
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(
      `/api/note-collections/${collectionId}/notes?id=${noteId}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete note')
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to delete note:', error)
    throw error
  }
}

export const apiForUpdateNoteOrder = async (
  items: OrderChangeItem[]
): Promise<any> => {
  try {
    const response = await fetch(`/api/notes/order`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    })

    if (!response.ok) {
      throw new Error('Failed to update note order')
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error('Failed to update note order:', error)
    throw error
  }
}
