// src/hook/useApiForCreateIssue.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreateIssueDto, Issue } from '@/types/typeForTaskIssue';
import apiForTaskIssue from '@/api/apiForTaskIssue';

export const useApiForCreateIssue = () => {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, CreateIssueDto>({
        mutationFn: async (issueData: CreateIssueDto) => {
            try {
                const result = await apiForTaskIssue.createIssue(issueData);
                toast.success('이슈가 성공적으로 생성되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '이슈 생성 중 오류가 발생했습니다.';
                toast.error(`이슈 생성 실패: ${errorMessage}`);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['issues'],
            });
        },
    });
};

export default useApiForCreateIssue;