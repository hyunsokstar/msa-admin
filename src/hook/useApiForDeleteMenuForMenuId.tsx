// src/hooks/useApiForDeleteMenuForMenuId.ts
import { apiForDeleteMenuForMenuId } from '@/api/apiForMenu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useApiForDeleteMenuForMenuId = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteMenu, isPending: isDeleting } = useMutation({
        mutationFn: async (menuId: number) => {
            const success = await apiForDeleteMenuForMenuId(menuId);
            if (!success) {
                throw new Error('메뉴 삭제에 실패했습니다.');
            }
            return success;
        },
        onSuccess: () => {
            // 메뉴 데이터 리페칭
            queryClient.invalidateQueries({ queryKey: ['menus'] });
            toast.success('메뉴가 성공적으로 삭제되었습니다.');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });

    return {
        deleteMenu,
        isDeleting
    };
};