import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { apiForUpdateHeaderNav, MenuItemType } from '@/api/apiForMenu';

interface UpdateHeaderNavVariables {
    menuId: number;
    updateData: {
        name: string;
        path: string;
    };
}

export const useApiForUpdateHeaderNav = () => {
    const queryClient = useQueryClient();

    return useMutation<MenuItemType, Error, UpdateHeaderNavVariables>({
        mutationFn: async ({ menuId, updateData }: UpdateHeaderNavVariables) => {
            try {
                const result = await apiForUpdateHeaderNav(menuId, updateData);
                toast.success('메뉴가 성공적으로 업데이트되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '메뉴 업데이트 중 오류가 발생했습니다.';
                toast.error(`메뉴 업데이트 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            // 메뉴 데이터 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ['menusData'],
            });
        },
    });
};

export default useApiForUpdateHeaderNav;