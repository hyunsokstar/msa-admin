import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveTestTargetsToArchive } from '@/api/apiForTestTargetsArchive';
import { toast } from 'react-toastify';

/**
 * 선택한 테스트 대상을 아카이브로 이동하는 훅
 * @returns 테스트 대상 아카이브 이동 mutation
 */
const useMoveTestTargetsToArchive = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (targetIds: string[]) => {
            console.log('아카이브 이동 호출:', targetIds);
            return moveTestTargetsToArchive(targetIds);
        },
        onSuccess: () => {
            // 테스트 대상 목록과 아카이브 목록 모두 갱신
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });

            toast.success('선택한 항목이 아카이브로 이동되었습니다.');
        },
        onError: (error) => {
            console.error('Archive error:', error);
            toast.error('아카이브 이동 중 오류가 발생했습니다.');
        }
    });
};

// 이전 이름의 훅도 내보내기 (호환성 유지)
export const useArchiveMoveTestTargetsItemToTestTargetsArchive = useMoveTestTargetsToArchive;

export default useMoveTestTargetsToArchive;