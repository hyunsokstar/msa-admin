import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, ToastPosition } from 'react-toastify';
import { apiForUpdateMenuOrder } from '@/api/apiForMenu';

// API 요청에 필요한 파라미터 타입 정의
interface UpdateMenuOrderVariables {
    movingMenuId: number;
    targetMenuId: number;
    newOrder: number;
    targetOrder: number;
}

// API 응답 타입 정의 (필요한 경우 확장)
interface UpdateMenuOrderResponse {
    success: boolean;
    message?: string;
}

export const useApiForUpdateMenuOrder = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateMenuOrderResponse, Error, UpdateMenuOrderVariables>({
        mutationFn: async ({ 
            movingMenuId, 
            targetMenuId,
            newOrder,
            targetOrder 
        }: UpdateMenuOrderVariables) => {
            try {
                const result = await apiForUpdateMenuOrder({ 
                    movingMenuId, 
                    targetMenuId,
                    newOrder,
                    targetOrder 
                });
                
                if (result) {
                    return {
                        success: true,
                        message: '메뉴 순서가 성공적으로 변경되었습니다.'
                    };
                } else {
                    throw new Error('메뉴 순서 변경에 실패했습니다.');
                }
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '메뉴 순서 변경 중 오류가 발생했습니다.';
                throw new Error(errorMessage);
            }
        },
        onSuccess: async (data) => {
            // 캐시된 메뉴 데이터 무효화
            await queryClient.invalidateQueries({
                queryKey: ['menusData'],
            });
            
            console.log('메뉴 순서 변경 성공:', data);  

            // 성공 메시지 표시 (상단 가운데, 2초 동안)
            await toast.success('메뉴 순서가 변경되었습니다.', {
                position: 'top-center' as ToastPosition,
                autoClose: 2000, // 2초 후 자동 닫힘
                // hideProgressBar: true, // 진행 표시 바 숨김
                // closeOnClick: true,
                // pauseOnHover: false,
                // draggable: true,
            });
        },
        onError: (error) => {
            // 에러 메시지 표시
            toast.error(`메뉴 순서 변경 실패: ${error.message}`, {
                position: 'top-center' as ToastPosition,
                autoClose: 3000, // 3초 후 자동 닫힘
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            console.error('메뉴 순서 변경 중 오류:', error);
        },
    });
};

export default useApiForUpdateMenuOrder;
