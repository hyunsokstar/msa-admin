// src/components/AuthMenus.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import DialogButtonForLogin from '../dialog/DialogButtonForLoginForm';
import DialogButtonForSignUp from '../dialog/DialogButtonForSignUp';
import getSupabase from '@/lib/supabaseClient';

// 로그인한 유저 정보 타입 정의 (필요시 확장 가능)
interface UserProfile {
    email: string | null;
    userId: string;
}

const AuthMenus: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const supabase = getSupabase();

    useEffect(() => {
        if (!supabase) return;

        // 초기 유저 정보 로드
        const loadUser = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                setUser({
                    email: user.email ?? null,
                    userId: user.id,
                });
            } else {
                setUser(null);
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
