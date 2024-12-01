// 파일 경로: /src/hooks/useApiForGetApiNames.ts
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {ApiNameType} from "@/types/typeForApiConverter";
import apiForGetApiNames from "@/api/apiForApiConverter";

/**
 * api_names 데이터를 가져오는 Custom Hook
 * @returns React Query의 useQuery 훅을 통해 API 목록을 가져옴
 */
export const useApiForGetApiNames = () => {
    return useQuery<ApiNameType[]>({
        queryKey: ['apiNamesData'],
        queryFn: async (): Promise<ApiNameType[]> => {
            try {
                const data = await apiForGetApiNames();
                if (!data) {
                    throw new Error('API 이름 데이터를 찾을 수 없습니다.');
                }
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'API 이름 데이터를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
    });
};

export default useApiForGetApiNames;
