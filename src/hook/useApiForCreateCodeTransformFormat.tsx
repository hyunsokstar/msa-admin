// src/hooks/useApiForCreateCodeTransformFormat.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForCreateCodeTransformFormat } from '@/api/apiForCodeTransFormWithPostGresDb';
import { z } from 'zod';

const transformFormatSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  trans_format: z.string().min(1, '변환 포맷을 입력해주세요'),
  description: z.string().optional(),
  placeholder: z.string().optional(),
});

export type TransformFormatInput = z.infer<typeof transformFormatSchema>;

export const useApiForCreateCodeTransformFormat = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (data: TransformFormatInput) => {
      try {
        // 유효성 검사
        transformFormatSchema.parse(data);
        return await apiForCreateCodeTransformFormat({
          ...data,
          description: data.description ?? '',
          placeholder: data.placeholder ?? '',
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('변환 포맷이 생성되었습니다.');
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['transformStyles'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};