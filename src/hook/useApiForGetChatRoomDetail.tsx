// src/hooks/useApiForGetChatRoomDetail.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IChatRoom } from '@/types/typeForChatRoom';
import { apiForChatRoomDetail } from '@/api/apiForChat';

/**
 * 특정 채팅방의 상세 정보를 가져오는 커스텀 훅
 * 채팅방 제목, 생성일, 생성자 등의 기본 정보를 조회할 때 사용
 * 
 * @param roomId - 조회할 채팅방의 ID
 * @returns 채팅방 상세 정보를 담은 쿼리 결과
 * 
 * @example
 * ```typescript
 * const { 
 *   data: roomDetail,      // 채팅방 정보
 *   isLoading,            // 로딩 상태
 *   error                 // 에러 상태
 * } = useApiForGetChatRoomDetail(roomId);
 * 
 * if (isLoading) return <div>로딩 중...</div>;
 * if (error) return <div>에러 발생</div>;
 * if (roomDetail) {
 *   console.log(roomDetail.name);        // 채팅방 이름
 *   console.log(roomDetail.created_at);  // 생성일
 * }
 * ```
 */
export const useApiForGetChatRoomDetail = (roomId: string) => {
    return useQuery<IChatRoom>({
        queryKey: ['chatRoom', roomId],
        queryFn: async () => {
            try {
                const data = await apiForChatRoomDetail(roomId);
                if (!data) {
                    throw new Error('채팅방 정보를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '채팅방 정보를 가져오는 중 오류가 발생했습니다.';
                toast.error(errorMessage);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });
};

export default useApiForGetChatRoomDetail;