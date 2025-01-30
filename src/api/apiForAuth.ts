// src/api/apiForAuth.ts
import getSupabase from '@/lib/supabase/browserClient';
import { AuthCredentials, AuthApiResponse, UserProfile } from '@/types/typeForAuth';
import {Session, WeakPassword} from "@supabase/supabase-js";
import {User} from "@supabase/auth-js";

export const apiForLoginUser = async ({
  email,
  password
}: AuthCredentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  console.log("로그인 응답 데이터 response : ", response);
  

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return response.json();
};

export const apiForSignUpUser = async ({
    email,
    password,
    full_name,
}: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    try {
        // 1. auth.users에 회원가입
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name,
                }
            }
        });

        if (signUpError) throw signUpError;

        // 2. public.users에 사용자 정보 저장
        if (authData?.user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    email: email,
                    full_name: full_name,
                    is_admin: false,
                    profile_image_url: null
                });

            if (profileError) {
                console.error('사용자 프로필 저장 실패:', profileError);
                // 사용자 생성 롤백
                if (authData.user.id) {
                    await supabase.auth.admin.deleteUser(authData.user.id);
                }
                throw profileError;
            }
        }

        return {
            ...authData,
            isAdmin: false
        };
    } catch (error) {
        console.error('회원가입 프로세스 실패:', error);
        throw error;
    }
};

export const apiForLogoutUser = async () => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
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


