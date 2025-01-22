'use client';

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useUserStore } from "@/store/useUserStore";
import { IUser } from '@/types/typeForUser';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogButtonForLogin from '../dialog/DialogButtonForLoginForm';
import DialogButtonForSignUp from '../dialog/DialogButtonForSignUp';

const AuthMenus: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const supabase = createClientComponentClient();
    const setAuth = useUserStore((state) => state.setAuth);

    const fetchUserData = async () => {
        try {
            const response = await fetch('/api/auth/user');

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setAuth(data.user, data.session);
            } else {
                setUser(null);
                setAuth(null, null);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
            setAuth(null, null);
        }
    };

    useEffect(() => {
        // 초기 사용자 데이터 로드
        fetchUserData();
    
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event) => {
                if (event === 'SIGNED_IN') {  // TOKEN_REFRESHED 제거
                    await fetchUserData();
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setAuth(null, null);
                }
            }
        );
    
        return () => {
            subscription.unsubscribe();
        };
    }, [supabase, setAuth]);

    const getInitials = (name?: string | null) => {
        if (!name) return '';
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setAuth(null, null);
    };

    return (
        <div className="flex items-center space-x-4">
            {user ? (
                <div className="flex items-center space-x-4">
                    <Link 
                        href="/profile" 
                        className="group flex items-center gap-2 p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-md"
                    >
                        <Avatar className="h-10 w-10 transition-transform duration-200 group-hover:scale-105">
                            {user.profile_image_url ? (
                                <AvatarImage
                                    src={user.profile_image_url}
                                    alt={user.full_name ?? user.email ?? ''}
                                />
                            ) : null}
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(user.full_name) || user.email?.[0].toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium flex items-center gap-1 group-hover:text-primary transition-colors duration-200">
                                {user.full_name ?? user.email}
                                {user.is_admin && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ShieldCheck 
                                                    className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-200"
                                                    aria-label="관리자"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>관리자</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                )}
                            </span>
                            {user.full_name && (
                                <span className="text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                    <Button
                        variant="outline"
                        onClick={handleSignOut}
                        size="sm"
                    >
                        로그아웃
                    </Button>
                </div>
            ) : (
                <>
                    <DialogButtonForLogin />
                    <DialogButtonForSignUp />
                </>
            )}
        </div>
    );
};

export default AuthMenus;
