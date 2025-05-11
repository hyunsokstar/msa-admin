import { useMutation, useQueryClient } from '@tanstack/react-query';
import { restoreTestTarget } from '@/api/apiForTestTargetsArchive';

// 아카이브된 테스트 대상 복원 훅
const useRestoreTestTarget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: restoreTestTarget,
        onSuccess: () => {
            // 성공 시 관련 쿼리 무효화하여 데이터 갱신
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
        }
    });
};

export default useRestoreTestTarget;