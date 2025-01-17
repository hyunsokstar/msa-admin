// src/api/apiForAuth.ts
import getSupabase from '@/lib/supabaseClient';
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

// export const apiForLoginUser = async ({
//                                           email,
//                                           password
//                                       }: AuthCredentials): Promise<{
//     weakPassword?: WeakPassword;
//     session: Session;
//     isAdmin: boolean;
//     user: User
// }> => {
//     const supabase = getSupabase();
//     if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');
//     console.log("supabase 객체 생성 확인 at login : ", supabase);

//     const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });
//     console.log("로그인 했는지 확인 : ", data);

//     if (error) {
//         console.error('로그인 실패:', error);
//         throw error;
//     }

//     // public.users에서 is_admin 정보 가져오기
//     if (data.user) {
//         const { data: userData, error: userError } = await supabase
//             .from('users')
//             .select('is_admin')
//             .eq('id', data.user.id)
//             .single();

//         if (userError) {
//             console.error('사용자 정보 조회 실패:', userError);
//             throw userError;
//         }
//         return {
//             weakPassword: undefined,
//             session: data.session,
//             isAdmin: userData.is_admin,
//             user: data.user
//         };
//     }

//     throw new Error('사용자 정보가 없습니다.');
// };


export const apiForSignUpUser = async ({
                                           email,
                                           password,
                                       }: AuthCredentials): Promise<AuthApiResponse> => {
    const supabase = getSupabase();
    if (!supabase) throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');

    try {
        // 1. auth.users에 회원가입
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) throw signUpError;

        // 2. public.users에 사용자 정보 저장
        if (authData.user) {
            const { error: profileError } = await supabase
                .from('users')
                .insert({
                    id: authData.user.id,
                    email: email,
                    is_admin: false
                });

            if (profileError) {
                console.error('사용자 데이터 저장 실패:', profileError);
                await supabase.auth.admin.deleteUser(authData.user.id);
                throw profileError;
            }
        }

        return authData;
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


