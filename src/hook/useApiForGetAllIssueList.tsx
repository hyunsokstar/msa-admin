// src/hook/useApiForGetAllIssueList.tsx

import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Issue, IssueFilter } from '@/types/typeForTaskIssue';
import apiForTaskIssue from '@/api/apiForTaskIssue';

export const useApiForGetAllIssueList = (filter?: IssueFilter) => {
    return useQuery<Issue[], Error>({
        queryKey: ['issues', filter],
        queryFn: async () => {
            try {
                const data = await apiForTaskIssue.getAllIssues(filter);
                if (!data) {
                    throw new Error('이슈 데이터를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '이슈 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export default useApiForGetAllIssueList;