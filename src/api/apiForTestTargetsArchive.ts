// C:\Users\terec\msa-admin\src\api\apiForTestTargetsArchive.ts
import { TestTarget } from '@/types/typeForTestTarget';

// 테스트 대상을 아카이브로 이동
export async function moveTestTargetsToArchive(targetIds: string[]): Promise<boolean> {
    try {
        console.log('API 호출: moveTestTargetsToArchive, 대상 ID들:', targetIds);

        const response = await fetch('/api/test-targets-archive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetIds }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`아카이브 API 오류 (${response.status}): ${errorText}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('아카이브 API 응답:', result);

        return result.success || false;
    } catch (error) {
        console.error('Error archiving test targets:', error);
        throw error;
    }
}

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
        return [];
    }
}

// 아카이브에서 특정 테스트 대상 조회
export async function fetchArchivedTestTarget(id: string): Promise<TestTarget | null> {
    try {
        const response = await fetch(`/api/test-targets-archive/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch archived test target');
        }
        const { data } = await response.json();
        return data || null;
    } catch (error) {
        console.error('Error fetching archived test target:', error);
        return null;
    }
}

// 아카이브에서 테스트 대상 복원
export async function restoreTestTarget(id: string): Promise<boolean> {
    try {
        const response = await fetch(`/api/test-targets-archive/${id}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { success } = await response.json();
        return success || false;
    } catch (error) {
        console.error('Error restoring test target:', error);
        return false;
    }
}

// 아카이브에서 테스트 대상 영구 삭제
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
        return false;
    }
}

// 아카이브에서 여러 테스트 대상 영구 삭제
export async function deleteMultipleArchivedTestTargets(targetIds: string[]): Promise<boolean> {
    try {
        const response = await fetch(`/api/test-targets-archive/batch-delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ targetIds }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { success } = await response.json();
        return success || false;
    } catch (error) {
        console.error('Error deleting multiple archived test targets:', error);
        return false;
    }
}