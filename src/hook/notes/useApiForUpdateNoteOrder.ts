// src/hooks/notes/useApiForUpdateNoteOrder.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiForUpdateNoteOrder } from '@/api/notes/apiForNotes'
import { OrderChangeItem } from '@/types/notes/typeForNotes'
import { toast } from 'react-toastify'

export const useApiForUpdateNoteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (items: OrderChangeItem[]) => apiForUpdateNoteOrder(items),

    onSuccess: () => {
      // 노트 리스트 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['notes'] })
      toast.success('노트 순서가 변경되었습니다.')
    },

    onError: (error: Error) => {
      toast.error(`노트 순서 변경 실패: ${error.message}`)
    }
  })
}
