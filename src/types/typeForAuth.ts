// src/types/typeForAuth.ts
import { AuthError, AuthResponse } from '@supabase/supabase-js';
import { z } from 'zod';

export interface AuthCredentials {
    email: string;
    password: string;
    full_name: string;
}

export type AuthApiResponse = AuthResponse['data'] & {
    isAdmin?: boolean;
};

export type AuthApiError = AuthError;

export interface UserProfile {
    email: string | null;
    isAdmin: boolean;
    full_name: string;
}

// 유효성 검사 스키마
export const signUpSchema = z.object({
    email: z.string().email('올바른 이메일 주소를 입력해주세요'),
    password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다'),
    confirmPassword: z.string(),
    full_name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다')
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export interface ValidationErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    full_name?: string;
}