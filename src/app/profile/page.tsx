'use client';

import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck } from 'lucide-react';

const ProfilePage = () => {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return null;
    }

    const getInitials = (name?: string | null) => {
        if (!name) return '';
        return name.split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* 왼쪽 메인 콘텐츠 영역 */}
                <div className="md:col-span-8 lg:col-span-9">
                    <Card>
                        <CardHeader>
                            <CardTitle>프로필 정보</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">이름</h3>
                                <p className="text-lg">{user.full_name || '미설정'}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">이메일</h3>
                                <p className="text-lg">{user.email}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">계정 유형</h3>
                                <p className="text-lg">{user.is_admin ? '관리자' : '일반 사용자'}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 오른쪽 사이드바 영역 */}
                <div className="md:col-span-4 lg:col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">기본 정보</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center space-y-4">
                            <Avatar className="h-24 w-24">
                                {user.profile_image_url ? (
                                    <AvatarImage
                                        src={user.profile_image_url}
                                        alt={user.full_name ?? user.email ?? ''}
                                    />
                                ) : null}
                                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                                    {getInitials(user.full_name) || user.email?.[0].toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">{user.full_name}</h2>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                {user.is_admin && (
                                    <div className="mt-2">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                                            <ShieldCheck className="h-3 w-3" />
                                            관리자
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;