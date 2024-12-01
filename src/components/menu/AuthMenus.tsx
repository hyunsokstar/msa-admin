// src/components/AuthMenus.tsx
'use client';

import React, {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import DialogButtonForLogin from '../dialog/DialogButtonForLoginForm';
import DialogButtonForSignUp from '../dialog/DialogButtonForSignUp';
import getSupabase from '@/lib/supabaseClient';
import {ExtendedUser, useUserStore} from "@/store/useUserStore";
import {User} from "@supabase/auth-js";

// 로그인한 유저 정보 타입 정의 (필요시 확장 가능)
interface UserProfile {
    email: string | null;
    userId: string;
    is_admin?: boolean;
}

const AuthMenus: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const supabase = getSupabase();
    const setAuth = useUserStore((state) => state.setAuth);

    useEffect(() => {
        if (!supabase) return;

        // 초기 유저 정보 로드
        const loadUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if(session?.user) {
                // todo: public.users 의 해당 유저 정보도 가져오기
                console.log("publicUser 호출 check ")
                const { data: publicUser, error }
                    = await supabase
                    .from('users')
                    .select('is_admin') // 필요한 필드 선택
                    .eq('id', session.user.id) // auth.users의 id를 기준으로 필터링
                    .single();

                if (error) {
                    console.error('Error fetching user:', error);
                    return;
                }

                console.log("public.user : " , publicUser)

                if (publicUser) {
                    const {is_admin} = publicUser;

                    console.log("is_admin ?? : ", is_admin)

                    setUser({
                        email: session.user.email ?? null,
                        userId: session.user.id ?? '',
                        is_admin: is_admin
                    });

                    const extendedUser: ExtendedUser = {
                        ...session.user,
                        is_admin: is_admin,
                    };

                    setAuth(extendedUser, session);


                }

            }

        };

        loadUser();

        // 인증 상태 변경 감지
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session?.user) {
                    // 로그인 되었을 때 유저 정보 저장
                    setUser({
                        email: session.user.email ?? null,
                        userId: session.user.id,
                    });
                } else {
                    // 로그아웃 되었을 때 유저 정보 제거
                    setUser(null);
                }
            }
        );

        // 클린업 함수로 이벤트 리스너 해제
        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [supabase]);

    return (
        <div className="flex items-center space-x-4">
            {user ? (
                // 로그인한 경우 유저 정보 표시
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">
                        안녕하세요, {user.email} 님!
                    </span>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            if (supabase) {
                                await supabase.auth.signOut();
                            }
                        }}
                    >
                        로그아웃
                    </Button>
                </div>
            ) : (
                // 로그인하지 않은 경우 로그인/회원가입 버튼 표시
                <>
                    <DialogButtonForLogin />
                    <DialogButtonForSignUp />
                </>
            )}
        </div>
    );
};

export default AuthMenus;
