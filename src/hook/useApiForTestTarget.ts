// src/hooks/useApiForTestTarget.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    fetchTestTargets,
    fetchTestTarget,
    fetchTestItems,
    addTestTarget,
    updateTestTarget,
    deleteTestTarget,
    addTestItem,
    updateTestItem,
    deleteTestItem,
    toggleTestItemCompletion,
    toggleTestItemProcessing
} from '@/api/apiForTestTarget';
import {
    CreateTestTargetParams,
    UpdateTestTargetParams,
    CreateTestItemParams,
    UpdateTestItemParams
} from '@/types/typeForTestTarget';
import { useUserStore } from '@/store/useUserStore';

// 테스트 대상 목록 조회 훅
export const useGetTestTargets = () => {
    return useQuery({
        queryKey: ['testTargets'],
        queryFn: async () => {
            try {
                const data = await fetchTestTargets();
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '테스트 대상 목록을 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        }
    });
};

// 특정 테스트 대상 조회 훅
export const useGetTestTarget = (id: string) => {
    return useQuery({
        queryKey: ['testTarget', id],
        queryFn: async () => {
            try {
                const data = await fetchTestTarget(id);
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '테스트 대상 정보를 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        enabled: !!id // id가 있는 경우에만 쿼리 실행
    });
};

// 테스트 항목 목록 조회 훅
export const useGetTestItems = (targetId: string) => {
    return useQuery({
        queryKey: ['testItems', targetId],
        queryFn: async () => {
            try {
                const data = await fetchTestItems(targetId);
                return data;
            } catch (error) {
                const errorMessage = error instanceof Error
                    ? error.message
                    : '테스트 항목 목록을 가져오는 중 오류가 발생했습니다.';
                toast.error(`데이터 로드 실패: ${errorMessage}`);
                throw error;
            }
        },
        enabled: !!targetId // targetId가 있는 경우에만 쿼리 실행
    });
};

// 테스트 대상 삭제 훅
export const useDeleteTestTarget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTestTarget(id),
        onSuccess: () => {
            toast.success('테스트 대상이 삭제되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 대상 삭제에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};

// 테스트 항목 추가 훅
export const useAddTestItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newTestItem: CreateTestItemParams) => addTestItem(newTestItem),
        onSuccess: (_, variables) => {
            toast.success('테스트 항목이 추가되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testItems', variables.target_id] });
            queryClient.invalidateQueries({ queryKey: ['testTarget', variables.target_id] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 항목 추가에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};

// 테스트 항목 수정 훅
export const useUpdateTestItem = (targetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string, updates: UpdateTestItemParams }) =>
            updateTestItem(id, updates),
        onSuccess: () => {
            toast.success('테스트 항목이 수정되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['testTarget', targetId] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 항목 수정에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};

// 테스트 항목 삭제 훅
export const useDeleteTestItem = (targetId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTestItem(id),
        onSuccess: () => {
            toast.success('테스트 항목이 삭제되었습니다.');
            queryClient.invalidateQueries({ queryKey: ['testItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['testTarget', targetId] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 항목 삭제에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};

// 테스트 항목 완료 상태 토글 훅
// 테스트 항목 완료 상태 토글 훅
export const useToggleTestItemCompletion = (targetId: string) => {
    const queryClient = useQueryClient();
    const { user } = useUserStore(); // 현재 로그인한 사용자 정보 가져오기

    return useMutation({
        mutationFn: ({ id, isCompleted }: { id: string, isCompleted: boolean }) =>
            // 완료 상태 변경 시 현재 사용자 ID를 전달
            toggleTestItemCompletion(id, isCompleted, user?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['testTarget', targetId] });
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 항목 상태 변경에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};

// 테스트 항목 처리 중 상태 토글 훅 (userId 추가)
export const useToggleTestItemProcessing = (targetId: string) => {
    const queryClient = useQueryClient();
    const { user } = useUserStore(); // 현재 로그인한 사용자 정보 가져오기

    return useMutation({
        mutationFn: ({ id, isProcessing }: { id: string, isProcessing: boolean }) =>
            // 처리 중 상태 변경 시 현재 사용자 ID를 전달
            toggleTestItemProcessing(id, isProcessing, user?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testItems', targetId] });
            // queryClient.invalidateQueries({ queryKey: ['testTarget', targetId] });
            toast.success(`처리 상태가 변경되었습니다.`);
        },
        onError: (error) => {
            const errorMessage = error instanceof Error
                ? error.message
                : '테스트 항목 처리 상태 변경에 실패했습니다.';
            toast.error(`오류 발생: ${errorMessage}`);
        }
    });
};