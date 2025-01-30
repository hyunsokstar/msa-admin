// src/types/typeForUser.ts

export interface IUser {
    id: string;
    full_name: string;
    profile_image_url: string | null;
    phone_number: string | null;
    created_at: string;
    updated_at: string;
    email: string;
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
}

// 상단에 타입 추가
export interface UserSelectInfo {
    id:string | null, 
    email:string, 
    profile_image_url:string
}