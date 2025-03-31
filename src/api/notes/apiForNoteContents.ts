// src/api/notes/apiForNoteContents.ts
import {
  NoteContent,
  CreateNoteContentData,
  NoteContentResponse
} from '@/types/notes/typeForNoteContents'

interface OrderChangeItem {
  id: number
  order: number
}

export const updateNoteContentOrder = async (
  noteId: string,
  items: OrderChangeItem[]
): Promise<void> => {
  const response = await fetch(`/api/notes/${noteId}/contents/order`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update order')
  }
}

interface GetNoteContentsParams {
  noteId: string
  pageNum?: number
}

export const getNoteContents = async ({
  noteId,
  pageNum = 1
}: GetNoteContentsParams): Promise<NoteContentResponse> => {
  // type 검사
  if (typeof noteId !== 'string') {
    throw new Error('Invalid noteId')
  }

  try {
    const response = await fetch(
      `/api/notes/${noteId}/contents?pageNum=${pageNum}`
    )
    const json = await response.json()

    console.log('json : ', json)

    // 서버에서 반환된 에러 메시지가 있는지 먼저 확인
    if (json.error) {
      throw new Error(json.error)
    }

    // 응답의 상태 코드 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // data와 pages 필드가 있는지 확인
    if (!json.data || !json.pages) {
      throw new Error('Invalid response format: missing data or pages field')
    }

    return {
      data: Array.isArray(json.data) ? json.data : [],
      pages: Array.isArray(json.pages) ? json.pages : [] // 페이지 배열 확인 및 처리
    }
  } catch (error) {
    console.log('error : ', error)

    if (error instanceof Error) {
      throw new Error(`Failed to fetch note contents: ${error.message}`)
    }

    // 구체적인 에러 메시지 전달
    throw new Error('Failed to fetch note contents: Unknown error')
  }
}

export const createNoteContent = async (
  noteId: string,
  data: Partial<CreateNoteContentData>
) => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error('Failed to create note content')
    }

    const json = await response.json()
    return json.data
  } catch (error) {
    console.error('Failed to create note content:', error)
    throw error
  }
}

export const updateNoteContent = async (
  noteId: string,
  contentId: number,
  data: Partial<NoteContent>
) => {
  try {
    const response = await fetch(`/api/notes/${noteId}/contents`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: contentId, ...data })
    })

    if (!response.ok) {
      throw new Error('Failed to update note content')
    }

    const json = await response.json()
    return json.data
  } catch (error) {
    console.error('Failed to update note content:', error)
    throw error
  }
}

export const deleteNoteContent = async (noteId: string, contentId: number) => {
  try {
    const response = await fetch(
      `/api/notes/${noteId}/contents?id=${contentId}`,
      {
        method: 'DELETE'
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete note content')
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to delete note content:', error)
    throw error
  }
}
