// C: \Users\terec\msa - admin\src\types\typeForTestTarget.ts

// C:\Users\terec\msa-admin\src\types\typeForTestTarget.ts

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
    target_image_url: string | null; // 새로 추가된 필드
}

export interface TestItem {
    id: string;
    target_id: string;
    category: string;
    description: string;
    is_completed: boolean;
    assignee_id: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
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
    category: string;
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