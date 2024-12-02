// src/hooks/useApiForUpdateTransformStyle.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TransformStyle, CodeTransformFormat } from '@/types/typeForTransform';
import { apiForUpdateTransformStyle } from '@/api/apiForCodeTransFormWithPostGresDb';

export const useApiForUpdateTransformStyle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({
      id,
      data
    }: {
      id: number;
      data: Omit<CodeTransformFormat, 'id' | 'created_at'>;
    }) => {
      return await apiForUpdateTransformStyle(id, data);
    },
    onSuccess: () => {
      toast.success('변환 스타일이 업데이트되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['transformStyles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || '업데이트 실패');
    },
  });
};