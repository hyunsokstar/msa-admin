// src/hooks/useApiForChatRoomList.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IChatRoom } from '@/types/typeForChatRoom';
import { apiForChatRoomList } from '@/api/apiForChat';

/**
 * 채팅방 목록을 가져오는 Custom Hook
 * @returns React Query의 useQuery 훅을 통해 채팅방 목록을 가져옴
 */
export const useApiForChatRoomList = () => {
    return useQuery<IChatRoom[]>({
        queryKey: ['chatRooms'],
        queryFn: async (): Promise<IChatRoom[]> => {
            try {
                const data = await apiForChatRoomList();
                if (!data) {
                    throw new Error('채팅방 목록을 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '채팅방 목록을 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5, // 5분
        refetchOnWindowFocus: true,
    });
};

export default useApiForChatRoomList;