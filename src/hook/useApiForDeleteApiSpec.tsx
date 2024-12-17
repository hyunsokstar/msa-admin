import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteApiSpec } from '@/api/apiForApiSpec';

export const useApiForDeleteApiSpec = () => {
   const queryClient = useQueryClient();

   return useMutation<boolean, Error, string>({
       mutationFn: async (id: string) => {
        console.log("삭제할 id : ", id);
        
           const result = await deleteApiSpec(id);
           if (!result) {
               throw new Error('API 스펙 삭제에 실패했습니다.');
           }
           return result;
       },
       onSuccess: () => {
           toast.success('API 스펙이 성공적으로 삭제되었습니다.');
           queryClient.invalidateQueries({
               queryKey: ['apiSpecs'],
           });
       },
       onError: (error: Error) => {
           toast.error(`API 스펙 삭제 실패: ${error.message}`);
       }
   });
};

export default useApiForDeleteApiSpec;