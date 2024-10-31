// src/api/apiForAuth.ts
import { supabase } from '@/lib/supabaseClient';
import { AuthCredentials, AuthApiResponse } from '@/types/typeForAuth';

export const apiForSignUpUser = async ({
    email,
    password
}: AuthCredentials): Promise<AuthApiResponse> => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        throw error; // AuthError 타입을 그대로 throw
    }
    return data;
};

export const apiForLoginUser = async ({
    email,
    password
}: AuthCredentials): Promise<AuthApiResponse> => {
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
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw error;
    }
};