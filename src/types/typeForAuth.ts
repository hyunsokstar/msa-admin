// src/types/typeForAuth.ts
import { AuthError, AuthResponse, User, Session } from '@supabase/supabase-js';

export interface AuthCredentials {
    email: string;
    password: string;
}

export interface AuthState {
    user: User | null;
    session: Session | null;
}

export type AuthApiResponse = AuthResponse['data'];
export type AuthApiError = AuthError;

// 사용자 프로필 타입 추가
export interface UserProfile {
    user_id: string;
    email: string;
    created_at: string;
    updated_at?: string;
}
