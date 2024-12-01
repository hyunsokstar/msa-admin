// src/api/apiForAuth.ts
import getSupabase from '@/lib/supabaseClient';
import { AuthCredentials, AuthApiResponse } from '@/types/typeForAuth';

export const apiForSignUpUser = async ({
                                           email,
                                           password,
                                       }: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    // public.users 테이블에 사용자 추가
    const { data, error } = await supabase
        .from('public.users')
        .insert([
            {
                email,
                password, // 비밀번호를 그냥 저장하지 않고, 해시 처리된 형태로 저장하는 것이 보안에 안전합니다.
                created_at: new Date().toISOString(), // 필요시 추가 필드 여기에 추가
                // 예: username: email.split('@')[0], // 이메일 앞부분을 기본 사용자 이름으로 설정하는 경우
            },
        ]);

    if (error) {
        console.error('public.users 테이블에 사용자 추가 실패:', error);
        throw error;
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
