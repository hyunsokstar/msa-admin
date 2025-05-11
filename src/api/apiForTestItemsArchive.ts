// C:\Users\terec\msa-admin\src\api\apiForTestItemsArchive.ts
import getSupabase from '@/lib/supabase/browserClient';
import { SupabaseClient } from '@supabase/supabase-js';
import {
    TestTarget,
    TestItem,
    CreateTestItemParams,
    UpdateTestItemParams
} from '@/types/typeForTestTarget';

// 아카이브된 테스트 대상 목록 조회
export async function fetchArchivedTestTargets(): Promise<TestTarget[]> {
    try {
        const response = await fetch('/api/test-targets-archive');
        if (!response.ok) {
            throw new Error('Failed to fetch archived test targets');
        }
        const { data } = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching archived test targets:', error);
        throw error;
    }
}

// 특정 아카이브된 테스트 대상 조회
export async function fetchArchivedTestTarget(id: string): Promise<TestTarget> {
    try {
        const response = await fetch(`/api/test-targets-archive/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch archived test target');
        }
        const { data } = await response.json();
        if (!data) {
            throw new Error('Archived test target not found');
        }
        return data;
    } catch (error) {
        console.error('Error fetching archived test target:', error);
        throw error;
    }
}

// 아카이브된 테스트 항목 목록 조회 (특정 테스트 대상에 속한)
export async function fetchArchivedTestItems(targetId: string): Promise<TestItem[]> {
    try {
        const response = await fetch(`/api/test-targets-archive/${targetId}/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch archived test items');
        }
        const { data } = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching archived test items:', error);
        throw error;
    }
}

// 아카이브된 테스트 대상 복원
export async function restoreArchivedTestTarget(id: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/test-targets-archive/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { success } = await response.json();
        return success || false;
    } catch (error) {
        console.error('Error restoring archived test target:', error);
        throw error;
    }
}

// 아카이브된 테스트 대상 영구 삭제
export async function deleteArchivedTestTarget(id: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/test-targets-archive/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { success } = await response.json();
        return success || false;
    } catch (error) {
        console.error('Error deleting archived test target:', error);
        throw error;
    }
}

// 아카이브된 테스트 대상 일괄 영구 삭제
export async function bulkDeleteArchivedTestTargets(ids: string[]): Promise<boolean> {
    try {
        const response = await fetch('/api/test-targets-archive/bulk-delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetIds: ids }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { success } = await response.json();
        return success || false;
    } catch (error) {
        console.error('Error bulk deleting archived test targets:', error);
        throw error;
    }
}

// 아카이브된 테스트 항목 조회
export async function fetchArchivedTestItem(id: string): Promise<TestItem> {
    const supabase = getSupabase() as SupabaseClient;

    const { data, error } = await supabase
        .from('test_items_archive')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching archived test item:', error);
        throw error;
    }

    if (!data) {
        throw new Error('Archived test item not found');
    }

    return data;
}

// 아카이브된 테스트 항목 업데이트
export async function updateArchivedTestItem(id: string, updates: UpdateTestItemParams): Promise<TestItem> {
    const supabase = getSupabase() as SupabaseClient;

    const { data, error } = await supabase
        .from('test_items_archive')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating archived test item:', error);
        throw error;
    }

    return data;
}

// 아카이브된 테스트 항목 삭제
export async function deleteArchivedTestItem(id: string): Promise<boolean> {
    const supabase = getSupabase() as SupabaseClient;

    const { error } = await supabase
        .from('test_items_archive')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting archived test item:', error);
        throw error;
    }

    return true;
}

// 아카이브된 테스트 항목 완료 상태 토글
export async function toggleArchivedTestItemCompletion(
    id: string,
    isCompleted: boolean,
    userId: string | undefined
): Promise<TestItem> {
    const supabase = getSupabase() as SupabaseClient;

    // 업데이트할 데이터 준비
    const updateData: any = {
        is_completed: isCompleted,
        updated_at: new Date().toISOString()
    };

    // 완료 상태로 변경될 때만 issue_solver_id 설정
    if (isCompleted && userId) {
        updateData.issue_solver_id = userId;
    } else if (!isCompleted) {
        // 미완료 상태로 변경될 때는 issue_solver_id를 null로 설정
        updateData.issue_solver_id = null;
    }

    const { data, error } = await supabase
        .from('test_items_archive')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling archived test item completion:', error);
        throw error;
    }

    return data;
}

// 아카이브된 테스트 항목 처리 중 상태 토글
export async function toggleArchivedTestItemProcessing(
    id: string,
    isProcessing: boolean,
    userId: string | undefined
): Promise<TestItem> {
    const supabase = getSupabase() as SupabaseClient;

    // 업데이트할 데이터 준비
    const updateData: any = {
        is_processing: isProcessing,
        updated_at: new Date().toISOString()
    };

    // 처리 중 상태로 변경될 때만 issue_solver_id 설정
    if (isProcessing && userId) {
        updateData.issue_solver_id = userId;
    } else if (!isProcessing) {
        // 처리 중 상태가 해제될 때는 issue_solver_id를 null로 설정
        updateData.issue_solver_id = null;
    }

    const { data, error } = await supabase
        .from('test_items_archive')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling archived test item processing:', error);
        throw error;
    }

    return data;
}

// 아카이브된 테스트 항목 추가
export async function addArchivedTestItem(testItem: CreateTestItemParams): Promise<TestItem> {
    try {
        const response = await fetch(`/api/test-targets-archive/${testItem.target_id}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testItem),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding archived test item:', error);
        throw error;
    }
}