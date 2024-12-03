// src/hooks/useApiForCreateApiName.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForCreateApiName } from '@/api/apiForApiConverter';
import { z } from 'zod';

// 유효성 검사를 위한 스키마 정의
const apiNameSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  url: z.string().min(1, 'URL을 입력해주세요'),
  method: z.string().min(1, 'HTTP 메서드를 입력해주세요'),
  description: z.string().optional(),
  is_completed: z.boolean(),
});

// 타입 정의
export type ApiNameInput = z.infer<typeof apiNameSchema>;

export const useApiForCreateApiName = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ApiNameInput) => {
      try {
        // 유효성 검사
        apiNameSchema.parse(data);
        return await apiForCreateApiName({
          ...data,
          description: data.description ?? '',
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw new Error(error.errors[0].message);
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success('API가 성공적으로 생성되었습니다.');
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['apiNamesData'] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
