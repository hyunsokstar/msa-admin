// ✅ 수정된 useApiForDeleteNoteContent.ts (pageNum을 필수로 명시)
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNoteContent as deleteNoteContentApi } from '@/api/notes/apiForNoteContents'
import { toast } from 'react-toastify'

interface UseApiForDeleteNoteContentProps {
  noteId: string
  pageNum: number // ✅ 필수로 변경
}

const useApiForDeleteNoteContent = ({
  noteId,
  pageNum
}: UseApiForDeleteNoteContentProps) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (contentId: number) => deleteNoteContentApi(noteId, contentId),
    onSuccess: () => {
      console.log('노트 삭제 성공 - noteId, pageNum:', noteId, pageNum)
      queryClient.invalidateQueries({
        queryKey: ['noteContents', noteId, pageNum]
      })
      toast.success('노트 내용이 삭제되었습니다.')
    },
    onError: () => {
      toast.error('노트 내용을 삭제하는 데 실패했습니다.')
    }
  })

  return {
    deleteNoteContent: (contentId: number, options?: any) =>
      mutation.mutate(contentId, options),
    isPending: mutation.isPending,
    error: mutation.error
  }
}

export default useApiForDeleteNoteContent
