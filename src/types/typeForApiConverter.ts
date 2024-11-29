// 파일 경로: /types/ApiNamesType.ts

export interface ApiNameType {
    id: number;
    title: string;
    description: string;
    url: string;
    method: string;
    is_completed: boolean;
}

export interface IRequestParameterForUpdateIsCompleted {
    id: number;
    isCompleted: boolean;
}

export interface IResponseTypeForUpdateIsCompleted {
    success: boolean;
    message: string;
}

// 이 인터페이스는 Supabase의 `api_names` 테이블에 있는 데이터를 타입스크립트로 표현한 것입니다.
// `id`, `title`, `description`, `url`, `method` 등의 필드를 포함합니다.
