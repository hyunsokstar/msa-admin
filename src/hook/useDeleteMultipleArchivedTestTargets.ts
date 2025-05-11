// C:\Users\terec\msa-admin\src\hook\useDeleteMultipleArchivedTestTargets.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMultipleArchivedTestTargets } from '@/api/apiForTestTargetsArchive';

// 여러 아카이브된 테스트 대상 일괄 삭제 훅
const useDeleteMultipleArchivedTestTargets = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (targetIds: string[]) => deleteMultipleArchivedTestTargets(targetIds),
        onSuccess: () => {
            // 성공 시 아카이브 목록 쿼리 무효화하여 데이터 갱신
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
        }
    });
};

export default useDeleteMultipleArchivedTestTargets;