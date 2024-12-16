// src/hooks/useApiForCreateFreeBoard.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForCreateFreeBoard } from '@/api/apiForFreeBoard';
import type { ICreateFreeBoardDto } from '@/types/typeForFreeBoard';

export const useApiForCreateFreeBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: ICreateFreeBoardDto) => {
      try {
        const result = await apiForCreateFreeBoard(postData);
        toast.success('게시글이 성공적으로 생성되었습니다.');
        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '게시글 생성 중 오류가 발생했습니다.';
        toast.error(`게시글 생성 실패: ${errorMessage}`);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['freeBoardPosts'],
      });
    },
  });
};

export default useApiForCreateFreeBoard;