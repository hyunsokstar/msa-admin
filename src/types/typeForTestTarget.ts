// src/types/typeForTestTarget.ts

export interface TestTarget {
    id: string;
    name: string;
    description: string | null;
    assignee_id: string | null;
    registration_date: string;
    completion_percentage: number;
    created_at: string;
    updated_at: string;
    target_image_url: string | null;
    item_count?: number; // 테스트 아이템 개수 필드 추가
}

export interface TestItem {
    id: string;
    target_id: string;
    description: string;
    is_completed: boolean;
    assignee_id: string | null;
    issue_solver_id: string | null; // 추가: 문제 해결한 사람 ID
    notes: string | null;
    ref_image: string | null;
    ref_video: string | null;
    created_at: string;
    updated_at: string;
    // 조인된 사용자 정보를 담을 필드
    assignee?: {
        id: string;
        full_name: string;
        profile_image_url: string | null;
    } | null;
    // 추가: 문제 해결한 사람 정보
    issue_solver?: {
        id: string;
        full_name: string;
        profile_image_url: string | null;
    } | null;
}

export interface CreateTestTargetParams {
    name: string;
    description?: string;
    assignee_id?: string;
    target_image_url?: string; // 새로 추가된 필드
}

export interface UpdateTestTargetParams {
    name?: string;
    description?: string;
    assignee_id?: string;
}

export interface CreateTestItemParams {
    target_id: string;
    description: string;
    is_completed?: boolean;
    assignee_id?: string;
    notes?: string;
}

export interface UpdateTestItemParams {
    category?: string;
    description?: string;
    is_completed?: boolean;
    assignee_id?: string;
    notes?: string;
}