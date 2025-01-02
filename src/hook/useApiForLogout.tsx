// hooks/useApiForAuth.ts
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { apiForLogoutUser } from '@/api/apiForAuth';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/useUserStore';

export const useApiForLogout = (): UseMutationResult<void, Error, void> => {
   const clearAuth = useUserStore((state) => state.clearAuth);

   return useMutation({
       mutationFn: apiForLogoutUser,
       onSuccess: () => {
           clearAuth(); // userStore의 clearAuth 사용
           toast.success('로그아웃 되었습니다.');
       },
       onError: (error: Error) => {
           const errorMessage = error.message || '로그아웃 중 오류가 발생했습니다';
           toast.error(`로그아웃 실패: ${errorMessage}`);
           throw error;
       },
   });
};