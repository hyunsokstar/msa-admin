// C:\Users\terec\msa-admin\src\hook\useApiForFetchArchivedTestTargets.ts
import { useQuery } from '@tanstack/react-query';
import { fetchArchivedTestTargets } from '@/api/apiForTestTargetsArchive';
import { TestTarget } from '@/types/typeForTestTarget';

// 아카이브된 테스트 대상 목록 조회 훅
const useApiForFetchArchivedTestTargets = () => {
    return useQuery<TestTarget[], Error>({
        queryKey: ['archivedTestTargets'],
        queryFn: fetchArchivedTestTargets
    });
};

export default useApiForFetchArchivedTestTargets;