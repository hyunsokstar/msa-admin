// C:\Users\terec\msa-admin\src\api\apiForTestTarget.ts

import getSupabase from '@/lib/supabase/browserClient';
import { SupabaseClient } from '@supabase/supabase-js';
import {
    TestTarget,
    TestItem,
    CreateTestTargetParams,
    UpdateTestTargetParams,
    CreateTestItemParams,
    UpdateTestItemParams
} from '@/types/typeForTestTarget';

// 테스트 대상 목록 조회
export async function fetchTestTargets(): Promise<TestTarget[] | null> {
    try {
        const response = await fetch('/api/test-targets');
        if (!response.ok) {
            throw new Error('Failed to fetch test targets');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching test targets:', error);
        return null;
    }
}

// 특정 테스트 대상 조회
export async function fetchTestTarget(id: string): Promise<TestTarget | null> {
    try {
        const response = await fetch(`/api/test-targets/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch test target');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching test target:', error);
        return null;
    }
}

// 테스트 대상 추가
export async function addTestTarget(testTarget: CreateTestTargetParams): Promise<TestTarget | null> {
    try {
        const response = await fetch('/api/test-targets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testTarget),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding test target:', error);
        return null;
    }
}

// 테스트 대상 수정
export async function updateTestTarget(id: string, updates: UpdateTestTargetParams): Promise<TestTarget | null> {
    const supabase = getSupabase() as SupabaseClient;

    const { data, error } = await supabase
        .from('test_targets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating test target:', error);
        return null;
    }

    return data;
}

// 테스트 대상 삭제
export async function deleteTestTarget(id: string): Promise<boolean> {
    const supabase = getSupabase() as SupabaseClient;

    const { error } = await supabase
        .from('test_targets')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting test target:', error);
        return false;
    }

    return true;
}

// 테스트 항목 목록 조회 (특정 테스트 대상에 속한)
export async function fetchTestItems(targetId: string): Promise<TestItem[] | null> {
    try {
        const response = await fetch(`/api/test-targets/${targetId}/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch test items');
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching test items:', error);
        return null;
    }
}

// 테스트 항목 추가
export async function addTestItem(testItem: CreateTestItemParams): Promise<TestItem | null> {
    try {
        const response = await fetch(`/api/test-targets/${testItem.target_id}/items`, {
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
        console.error('Error adding test item:', error);
        return null;
    }
}

// 테스트 항목 수정
export async function updateTestItem(id: string, updates: UpdateTestItemParams): Promise<TestItem | null> {
    const supabase = getSupabase() as SupabaseClient;

    const { data, error } = await supabase
        .from('test_items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating test item:', error);
        return null;
    }

    return data;
}

// 테스트 항목 삭제
export async function deleteTestItem(id: string): Promise<boolean> {
    const supabase = getSupabase() as SupabaseClient;

    const { error } = await supabase
        .from('test_items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting test item:', error);
        return false;
    }

    return true;
}

// 테스트 항목 완료 상태 토글
export async function toggleTestItemCompletion(
    id: string, 
    isCompleted: boolean, 
    userId: string | undefined
): Promise<TestItem | null> {
    const supabase = getSupabase() as SupabaseClient;

    // 업데이트할 데이터 준비
    const updateData: any = { 
        is_completed: isCompleted,
        updated_at: new Date().toISOString() // 현재 시간으로 updated_at 필드 설정
    };
    
    // 완료 상태로 변경될 때만 issue_solver_id 설정
    if (isCompleted && userId) {
        updateData.issue_solver_id = userId;
    } else if (!isCompleted) {
        // 미완료 상태로 변경될 때는 issue_solver_id를 null로 설정
        updateData.issue_solver_id = null;
    }

    const { data, error } = await supabase
        .from('test_items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling test item completion:', error);
        return null;
    }

    return data;
}

// 테스트 항목 처리 중 상태 토글 (새로 추가)
// 테스트 항목 처리 중 상태 토글 (issue_solver_id 필드 처리 추가)
export async function toggleTestItemProcessing(
    id: string, 
    isProcessing: boolean,
    userId: string | undefined
): Promise<TestItem | null> {
    const supabase = getSupabase() as SupabaseClient;

    // 업데이트할 데이터 준비
    const updateData: any = { 
        is_processing: isProcessing,
        updated_at: new Date().toISOString() // 현재 시간으로 updated_at 필드 설정
    };
    
    // 처리 중 상태로 변경될 때만 issue_solver_id 설정
    if (isProcessing && userId) {
        updateData.issue_solver_id = userId;
    } else if (!isProcessing) {
        // 처리 중 상태가 해제될 때는 issue_solver_id를 null로 설정
        updateData.issue_solver_id = null;
    }

    const { data, error } = await supabase
        .from('test_items')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling test item processing:', error);
        return null;
    }

    return data;
}