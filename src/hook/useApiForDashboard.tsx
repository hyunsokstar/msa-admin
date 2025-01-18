// src/hooks/useApiForDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { fetchApiSpecs, ApiSpec } from '@/api/apiForApiSpec';

export const useApiForDashboard = () => {
    return useQuery({
        queryKey: ['apiSpecs'],
        queryFn: async () => {
            try {
                const specs = await fetchApiSpecs();

                if (!specs) {
                    throw new Error('API 스펙을 불러오는데 실패했습니다');
                }

                return { specs };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'API 데이터를 불러오는 중 오류가 발생했습니다';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        }
    });
};