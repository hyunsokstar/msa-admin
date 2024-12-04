// src/hook/useApiForUpdateIssue.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UpdateIssueDto, Issue, IssueFilter } from '@/types/typeForTaskIssue';
import apiForTaskIssue from '@/api/apiForTaskIssue';

interface UpdateIssueVariables {
    id: number;
    data: UpdateIssueDto;
}

export const useApiForUpdateIssue = (filter: IssueFilter | undefined) => {
    const queryClient = useQueryClient();

    return useMutation<Issue, Error, UpdateIssueVariables>({
        mutationFn: async ({ id, data }: UpdateIssueVariables) => {
            try {
                const result = await apiForTaskIssue.updateIssue(id, data);
                toast.success('이슈가 성공적으로 업데이트되었습니다.');
                return result;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : '이슈 업데이트 중 오류가 발생했습니다.';
                toast.error(`이슈 업데이트 실패: ${errorMessage}`);
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

export default useApiForUpdateIssue;