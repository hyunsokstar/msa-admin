// src/hooks/notes/useApiForGetNoteContents.ts
import { useQuery } from '@tanstack/react-query'
import { getNoteContents } from '@/api/notes/apiForNoteContents'
import type { NoteContentResponse } from '@/types/notes/typeForNoteContents'

interface UseNoteContentsParams {
  noteId: string
  pageNum?: number
  pageSize?: number
}

export const useApiForGetNoteContents = ({
  noteId,
  pageNum = 1,
  pageSize = 10
}: UseNoteContentsParams) => {
  return useQuery<NoteContentResponse>({
    // console.log("조회시 noteId : ", noteId, pageNum)

    queryKey: ['noteContents', noteId, pageNum],
    queryFn: () => getNoteContents({ noteId, pageNum })
    // Removed staleTime: 5000 to ensure immediate refreshes
  })
}
