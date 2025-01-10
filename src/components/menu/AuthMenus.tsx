'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ShieldCheck } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DialogButtonForLogin from '../dialog/DialogButtonForLoginForm';
import DialogButtonForSignUp from '../dialog/DialogButtonForSignUp';
import getSupabase from '@/lib/supabaseClient';
import { useUserStore } from "@/store/useUserStore";
import { User } from "@supabase/auth-js";
import { IUser } from '@/types/typeForUser';

interface UserProfile {
    email: string | null;
    userId: string;
    is_admin?: boolean;
    profile_image_url?: string;
    full_name?: string;
}

const AuthMenus: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);
    const supabase = getSupabase();
    const setAuth = useUserStore((state) => state.setAuth);

    useEffect(() => {
        if (!supabase) return;

        const loadUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (session?.user) {
                const { data: publicUser, error }
                    = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user:', error);
                    return;
                }

                if (publicUser) {
                    const { is_admin, profile_image_url, full_name } = publicUser;

                    setUser({
                        email: session.user.email ?? null,
                        id: session.user.id ?? '',
                        is_admin: is_admin,
                        profile_image_url: profile_image_url,
                        full_name: full_name,
                        phone_number: publicUser.phone_number ?? null,
                        created_at: publicUser.created_at ?? null
                    });

                    const extendedUser: IUser = {
                        ...session.user,
                        email: session.user.email ?? null,
                        is_admin: is_admin,
                        profile_image_url: profile_image_url,
                        full_name: full_name,
                        phone_number: publicUser.phone_number ?? null
                    };

                    setAuth(extendedUser, session);
                }
            }
        };

        loadUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    const { data: publicUser, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (!error && publicUser) {
                        setUser({
                            email: session.user.email ?? null,
                            id: session.user.id,
                            is_admin: publicUser.is_admin,
                            profile_image_url: publicUser.profile_image_url,
                            full_name: publicUser.full_name,
                            phone_number: publicUser.phone_number ?? null,
                            created_at: publicUser.created_at ?? null
                        });
                    }
                } else {
                    setUser(null);
                }
            }
        );

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, [supabase]);

    const getInitials = (name?: string | null) => {
        if (!name) return '';
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex items-center space-x-4">
            {user ? (
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
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
                            <span className="text-sm font-medium flex items-center gap-1">
                                {user.full_name ?? user.email}
                                {user.is_admin && (
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <ShieldCheck 
                                                    className="h-4 w-4 text-primary"
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
                    </div>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            if (supabase) {
                                await supabase.auth.signOut();
                            }
                        }}
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