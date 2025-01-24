import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreatePersonalDevSpecDto, PersonalDevSpecResponse } from '@/types/typeForPersonalDevSpec';
import { apiForCreatePersonalDevSpec } from './useApiForPersonalDevSpecs';

export const useApiForCreatePersonalDevSpec = () => {
  const queryClient = useQueryClient();

  return useMutation<PersonalDevSpecResponse, Error, CreatePersonalDevSpecDto>({
    mutationFn: async (data: CreatePersonalDevSpecDto) => {
      const result = await apiForCreatePersonalDevSpec(data);
      toast.success('개발 스펙이 추가되었습니다.');
      return result;
    },
    onError: (error) => {
      toast.error(`추가 실패: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['personalDevSpecs'],
      });
    },
  });
};