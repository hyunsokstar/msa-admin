// src/api/apiForAuth.ts
import getSupabase from '@/lib/supabaseClient';
import { AuthCredentials, AuthApiResponse, UserProfile } from '@/types/typeForAuth';
import {Session} from "@supabase/supabase-js";

export const apiForSignUpUser = async ({
                                           email,
                                           password,
                                       }: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    // 1. 먼저 Supabase Auth로 회원가입
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        console.error('회원가입 실패:', signUpError);
        throw signUpError;
    }

    // 2. Auth 회원가입이 성공하면 추가 프로필 정보를 저장
    if (authData.user) {
        const userProfile: Partial<UserProfile> = {
            user_id: authData.user.id,
            email: email,
            created_at: new Date().toISOString(),
        };

        const { error: profileError } = await supabase
            .from('users')  // 'public.users' 대신 'users'만 사용
            .insert([userProfile]);

        if (profileError) {
            console.error('사용자 프로필 생성 실패:', profileError);
            // Auth에서 생성된 사용자 삭제 시도
            await supabase.auth.admin.deleteUser(authData.user.id);
            throw profileError;
        }
    }

    return authData;
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
        console.error('로그인 실패:', error);
        throw error;
    }

    return data;
};

export const logoutUser = async (): Promise<void> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('로그아웃 실패:', error);
        throw error;
    }
};

// 현재 사용자 세션 가져오기
export const getCurrentSession = async (): Promise<{ session: Session } | { session: null }> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw error;
    }

    return data;
};


