// src/hooks/useApiForTransformStyles.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TransformStyle } from '@/types/typeForTransform';
import { apiForGetTransformStyles } from '@/api/apiForCodeTransFormWithPostGresDb';

export const useApiForTransformStyles = () => {
  return useQuery<TransformStyle[]>({
    queryKey: ['transformStyles'],
    queryFn: async () => {
      try {
        const data = await apiForGetTransformStyles();
        if (!data) {
          throw new Error('변환 스타일 데이터를 찾을 수 없습니다.');
        }
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '변환 스타일을 가져오는 중 오류가 발생했습니다.';
        toast.error(`데이터 로드 실패: ${errorMessage}`);
        throw error;
      }
    },
  });
};