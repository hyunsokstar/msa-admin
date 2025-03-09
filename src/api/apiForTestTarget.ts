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
export async function toggleTestItemCompletion(id: string, isCompleted: boolean): Promise<TestItem | null> {
    const supabase = getSupabase() as SupabaseClient;

    const { data, error } = await supabase
        .from('test_items')
        .update({ is_completed: isCompleted })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error toggling test item completion:', error);
        return null;
    }

    return data;
}