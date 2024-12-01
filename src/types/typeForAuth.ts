// src/types/typeForAuth.ts
import { AuthError, AuthResponse } from '@supabase/supabase-js';

export interface AuthCredentials {
    email: string;
    password: string;
}

// AuthApiResponse에 isAdmin 필드 추가
export type AuthApiResponse = AuthResponse['data'] & {
    isAdmin?: boolean;
};

export type AuthApiError = AuthError;

// UserProfile 타입 수정
export interface UserProfile {
    email: string | null;
    isAdmin: boolean;
}
