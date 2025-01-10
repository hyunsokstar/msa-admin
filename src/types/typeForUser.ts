// src/types/typeForUser.ts

export interface IUser {
    id: string;
    email: string | null;
    full_name?: string | null;
    phone_number?: string | null;
    is_admin?: boolean;
    created_at?: string;
    profile_image_url?: string | null;  // null도 허용하도록 수정
}

export interface UserFilter {
    isAdmin?: boolean;
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
}

// 상단에 타입 추가
export interface UserSelectInfo {
    id:string | null, 
    email:string, 
    profile_image_url:string
}