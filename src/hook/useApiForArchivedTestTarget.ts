// C:\Users\terec\msa-admin\src\hook\useApiForArchivedTestTarget.ts

"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchArchivedTestTarget,
    fetchArchivedTestItems,
    deleteArchivedTestTarget,
    bulkDeleteArchivedTestTargets,
    restoreArchivedTestTarget,
    updateArchivedTestItem,
    deleteArchivedTestItem,
    toggleArchivedTestItemCompletion,
    toggleArchivedTestItemProcessing,
    addArchivedTestItem
} from '@/api/apiForTestItemsArchive';
import { TestTarget, TestItem, CreateTestItemParams, UpdateTestItemParams } from '@/types/typeForTestTarget';
import { useUserStore } from '@/store/useUserStore';

// 아카이브된 테스트 대상 가져오기 훅
export function useGetArchivedTestTarget(id: string) {
    return useQuery<TestTarget, Error>({
        queryKey: ['archivedTestTarget', id],
        queryFn: () => fetchArchivedTestTarget(id),
        enabled: !!id,
    });
}

// 아카이브된 테스트 항목 목록 가져오기 훅
export function useGetArchivedTestItems(targetId: string) {
    return useQuery<TestItem[], Error>({
        queryKey: ['archivedTestItems', targetId],
        queryFn: () => fetchArchivedTestItems(targetId),
        enabled: !!targetId,
    });
}

// 아카이브된 테스트 대상 삭제 훅
export function useDeleteArchivedTestTarget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteArchivedTestTarget(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
        },
    });
}

// 여러 아카이브된 테스트 대상 일괄 삭제 훅
export function useDeleteMultipleArchivedTestTargets() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: string[]) => bulkDeleteArchivedTestTargets(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
        },
    });
}

// 아카이브된 테스트 대상 복원 훅
export function useRestoreTestTarget() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => restoreArchivedTestTarget(id),
        onSuccess: () => {
            // 아카이브된 테스트 대상 목록과 테스트 대상 목록 모두 갱신
            queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
            queryClient.invalidateQueries({ queryKey: ['testTargets'] });
        },
    });
}

// 아카이브된 테스트 항목 업데이트 훅
export function useUpdateArchivedTestItem(targetId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (params: { id: string; updates: UpdateTestItemParams }) =>
            updateArchivedTestItem(params.id, params.updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTarget', targetId] });
        },
    });
}

// 아카이브된 테스트 항목 삭제 훅
export function useDeleteArchivedTestItem(targetId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteArchivedTestItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTarget', targetId] });
        },
    });
}

// 아카이브된 테스트 항목 완료 상태 토글 훅
export function useToggleArchivedTestItemCompletion(targetId: string) {
    const queryClient = useQueryClient();
    const { user } = useUserStore();

    return useMutation({
        mutationFn: (params: { id: string; isCompleted: boolean }) =>
            toggleArchivedTestItemCompletion(params.id, params.isCompleted, user?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTarget', targetId] });
        },
    });
}

// 아카이브된 테스트 항목 진행 중 상태 토글 훅
export function useToggleArchivedTestItemProcessing(targetId: string) {
    const queryClient = useQueryClient();
    const { user } = useUserStore();

    return useMutation({
        mutationFn: (params: { id: string; isProcessing: boolean }) =>
            toggleArchivedTestItemProcessing(params.id, params.isProcessing, user?.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedTestItems', targetId] });
            queryClient.invalidateQueries({ queryKey: ['archivedTestTarget', targetId] });
        },
    });
}

// 아카이브된 테스트 항목 추가 훅
export function useAddArchivedTestItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (testItem: CreateTestItemParams) => addArchivedTestItem(testItem),
        onSuccess: (data) => {
            if (data) {
                const targetId = data.target_id;
                queryClient.invalidateQueries({ queryKey: ['archivedTestItems', targetId] });
                queryClient.invalidateQueries({ queryKey: ['archivedTestTarget', targetId] });
            }
        },
    });
}