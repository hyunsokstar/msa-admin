// src/api/apiForAuth.ts
import getSupabase from '@/lib/supabaseClient';
import { AuthCredentials, AuthApiResponse } from '@/types/typeForAuth';

export const apiForSignUpUser = async ({
    email,
    password
}: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log('error', error);
        throw error; // AuthError 타입을 그대로 throw
    }
    return data;
};

export const apiForLoginUser = async ({
    email,
    password
}: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw error;
    }
    return data;
};

export const logoutUser = async (): Promise<void> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
};