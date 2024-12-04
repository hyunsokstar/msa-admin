// src/hooks/useApiForDeleteIssue.ts
import apiForTaskIssue from '@/api/apiForTaskIssue';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface DeleteIssueParams {
    issueId: number;
    issueTitle: string;
}

export const useApiForDeleteTaskIssue = (filter: any) => {
    const queryClient = useQueryClient();

    const { mutate: deleteIssue, isPending: isDeleting } = useMutation({
        mutationFn: async (params: DeleteIssueParams) => {
            console.log('Mutation 시작:', params);

            // 사용자에게 삭제 확인
            if (!window.confirm(`\"${params.issueTitle}\" 이슈를 삭제하시겠습니까?`)) {
                console.log('사용자가 삭제를 취소함');
                throw new Error('사용자가 삭제를 취소했습니다.');
            }

            // 이슈 삭제 API 호출
            await apiForTaskIssue.deleteIssue(params.issueId);
            console.log('API 응답: 성공적으로 삭제됨');
        },
        onMutate: (variables) => {
            console.log('Mutation 시작 전:', variables);
            // 선택적: 낙관적 업데이트를 위한 이전 데이터 백업
            const previousIssues = queryClient.getQueryData(['issues', filter]);
            return { previousIssues };
        },
        onSuccess: () => {
            console.log('Mutation 성공');
            // issues 쿼리 무효화
            queryClient.invalidateQueries({
                queryKey: ['issues', filter],
                exact: true
            });
            toast.success('이슈가 성공적으로 삭제되었습니다.');
        },
        onError: (error: Error, variables, context) => {
            console.error('Mutation 에러:', error);
            // 삭제 실패 시 이전 데이터로 복원 (선택적)
            if (context?.previousIssues) {
                queryClient.setQueryData(['issues', filter], context.previousIssues);
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
        deleteIssue,
        isDeleting
    };
};
