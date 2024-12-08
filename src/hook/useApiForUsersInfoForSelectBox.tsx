// src/hook/useApiForUsersInfoForSelectBox.tsx
import apiForUserList from '@/api/apiForUser';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UserSelectInfo } from '@/types/typeForUser';

export const useApiForUsersInfoForSelectBox = () => {
    return useQuery<UserSelectInfo[], Error>({
        queryKey: ['usersForSelect'],
        queryFn: async () => {
            try {
                const data = await apiForUserList.getUsersInfoForSelectBox();
                if (!data) {
                    throw new Error('사용자 목록을 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '사용자 목록을 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export default useApiForUsersInfoForSelectBox;