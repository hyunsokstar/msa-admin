// src/hooks/useApiForDeleteMenu.ts
import { apiForDeleteMenu } from '@/api/apiForMenu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface DeleteMenuParams {
    menuId: number;
    menuName: string;
}

export const useApiForDeleteMenu = () => {
    const queryClient = useQueryClient();

    const { mutate: deleteMenu, isPending: isDeleting } = useMutation({
        mutationFn: async (params: DeleteMenuParams) => {
            console.log('Mutation 시작:', params);

            if (!window.confirm(`"${params.menuName}" 메뉴를 삭제하시겠습니까?\n하위 메뉴가 있다면 함께 삭제됩니다.`)) {
                console.log('사용자가 삭제를 취소함');
                throw new Error('사용자가 삭제를 취소했습니다.');
            }

            const success = await apiForDeleteMenu(params.menuId);
            console.log('API 응답:', success);

            if (!success) {
                throw new Error('메뉴 삭제에 실패했습니다.');
            }
            return success;
        },
        onMutate: (variables) => {
            console.log('Mutation 시작 전:', variables);
            // 선택적: 낙관적 업데이트를 위한 이전 데이터 백업
            const previousMenus = queryClient.getQueryData(['menusData']);
            return { previousMenus };
        },
        onSuccess: () => {
            console.log('Mutation 성공');
            // menusData 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ['menusData'],
                exact: true
            });
            toast.success('메뉴가 성공적으로 삭제되었습니다.');
        },
        onError: (error: Error, variables, context) => {
            console.error('Mutation 에러:', error);
            // 삭제 실패 시 이전 데이터로 복원 (선택적)
            if (context?.previousMenus) {
                queryClient.setQueryData(['menusData'], context.previousMenus);
            }
            if (error.message !== '사용자가 삭제를 취소했습니다.') {
                toast.error(error.message);
            }
        },
        onSettled: () => {
            console.log('Mutation 완료');
        }
    });

    return {
        deleteMenu,
        isDeleting
    };
};