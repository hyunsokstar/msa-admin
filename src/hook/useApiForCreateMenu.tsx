// src/hooks/useApiForCreateMenu.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForCreateMenu, MenuItemType } from '@/api/apiForMenu';
import { CreateMenuDto } from '@/types/typeForMenu';

export const useApiForCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation<MenuItemType, Error, CreateMenuDto>({
    mutationFn: apiForCreateMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['menusData'],
      });
      toast.success('메뉴가 성공적으로 생성되었습니다.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error) => {
      const errorMessage = error instanceof Error 
        ? error.message 
        : '메뉴 생성 중 오류가 발생했습니다.';
      
      toast.error(`메뉴 생성 실패: ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};

export default useApiForCreateMenu;