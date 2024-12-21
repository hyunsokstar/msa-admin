import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { IssueFilter } from '@/types/typeForTaskIssue';
import apiForTaskIssue from '@/api/apiForTaskIssue';
import { useUserStore } from '@/store/useUserStore';

export const useApiForGetMyIssues = (filter?: IssueFilter, limit = 10, offset = 0) => {
    const { user } = useUserStore();

    return useQuery({
        queryKey: ['myIssues', user?.id, filter, limit, offset],
        queryFn: async () => {
            if (!user?.id) {
                throw new Error('User not authenticated');
            }
            try {
                const data = await apiForTaskIssue.getMyIssues(user.id, filter, limit, offset);
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error 
                    ? error.message 
                    : '내 이슈 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        enabled: !!user?.id, // 사용자가 인증된 경우에만 쿼리 실행
    });
};