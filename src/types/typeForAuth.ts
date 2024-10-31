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