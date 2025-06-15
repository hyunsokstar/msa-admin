// src/types/typeForUser.ts

export interface IUser {
    id: string;
    full_name: string;
    profile_image_url: string | null;
    phone_number: string | null;
    created_at: string;
    updated_at: string;
    email?: string;
    is_admin: boolean;
    organization_id: string | null;
    status?: 'online' | 'offline' | 'away';
}

export interface UserFilter {
    isAdmin?: boolean;
    name?: string;
    phone?: string;
    email?: string;
    organizationId?: string;
}

export interface CreateUserDto {
    full_name?: string;
    profile_image?: string;
    phone_number?: string;
    email: string;
    is_admin?: boolean;
}

export interface UpdateUserDto {
    full_name?: string;
    profile_image?: string;
    phone_number?: string;
    email?: string;
    is_admin?: boolean;
    status?: 'working' | 'break' | 'away' | 'vacation' | 'studying' | 'meeting' | 'offline';
}

// 상단에 타입 추가
export interface UserSelectInfo {
    id: string | null;
    email: string;
    profile_image_url: string;
}

// PersonalInfoForProfile 컴포넌트에서 사용할 추가 타입들
export interface PersonalMemo {
    id: string;
    title: string;
    content: string;
    type: 'todo' | 'important' | 'note';
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface PersonalBookmark {
    id: string;
    url: string;
    description: string;
    user_id: string;
}

export interface StudyLog {
    id: string;
    title: string;
    content: string;
    tags: string[];
    study_date: string;
    duration_minutes?: number;
    category: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface FileResource {
    id: string;
    file_name: string;
    file_url: string;
    file_size: number;
    file_type: string;
    mime_type: string;
    folder_id?: string;
    description?: string;
    uploaded_at: string;
    user_id: string;
}

export interface FileFolder {
    id: string;
    folder_name: string;
    parent_folder_id?: string;
    file_count: number;
    created_at: string;
    user_id: string;
}

// API 응답 타입들
export interface PersonalDataResponse {
    memos: PersonalMemo[];
    bookmarks: PersonalBookmark[];
    studyLogs: StudyLog[];
    files: FileResource[];
    folders: FileFolder[];
}

// 탭 타입 정의
export type TabType = 'memo' | 'bookmarks' | 'archive' | 'study';

// 컴포넌트 Props 타입
export interface PersonalInfoTabProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    userId: string;
}

// CRUD 작업을 위한 타입들
export interface CreateMemoDto {
    title: string;
    content: string;
    type: 'todo' | 'important' | 'note';
}

export interface UpdateMemoDto {
    title?: string;
    content?: string;
    type?: 'todo' | 'important' | 'note';
}

export interface CreateBookmarkDto {
    title: string;
    url: string;
    description?: string;
    category?: string;
}

export interface UpdateBookmarkDto {
    title?: string;
    url?: string;
    description?: string;
    category?: string;
}

export interface CreateStudyLogDto {
    title: string;
    content: string;
    tags: string[];
    study_date: string;
    duration_minutes?: number;
    category: string;
}

export interface UpdateStudyLogDto {
    title?: string;
    content?: string;
    tags?: string[];
    study_date?: string;
    duration_minutes?: number;
    category?: string;
}

export interface CreateFolderDto {
    folder_name: string;
    parent_folder_id?: string;
}

export interface UploadFileDto {
    file: File;
    folder_id?: string;
    description?: string;
}