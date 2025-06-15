// C:\Users\terec\msa-admin\src\types\typeForBookMark.ts

// 기본 북마크 타입
export interface PersonalBookmark {
    id: string;
    url: string;
    description: string;
    user_id: string;
}

// API 응답 타입
export interface PersonalBookmarksResponse {
    data: PersonalBookmark[];
}

// 생성용 DTO (id, user_id 제외)
export type CreatePersonalBookmarkDto = Omit<PersonalBookmark, 'id' | 'user_id'>;

// 수정용 DTO (id, user_id 제외하고 선택적)
export type UpdatePersonalBookmarkDto = Partial<Omit<PersonalBookmark, 'id' | 'user_id'>>;

// 다중 삭제 요청 타입
export interface BulkDeleteBookmarksRequest {
    ids: string[];
}

// 다중 삭제 응답 타입
export interface BulkDeleteBookmarksResponse {
    message: string;
    deletedCount: number;
    data: PersonalBookmark[];
}

// API 에러 응답 타입
export interface BookmarkApiError {
    error: string;
    status?: number;
}

// 북마크 필터 타입 (추후 확장용)
export interface BookmarkFilter {
    url?: string;
    description?: string;
    user_id?: string;
}

// 북마크 정렬 옵션
export type BookmarkSortOption = 'created_asc' | 'created_desc' | 'url_asc' | 'url_desc';

// 북마크 페이지네이션 타입 (추후 확장용)
export interface BookmarkPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedBookmarksResponse {
    data: PersonalBookmark[];
    pagination: BookmarkPagination;
}