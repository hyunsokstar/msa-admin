// src\app\profile\page.tsx
'use client';

import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck } from 'lucide-react';
import { useApiForPersonalDevSpecs } from '@/hook/user/useApiForPersonalDevSpecs';
import DevSpecTree from './comp/DevSpecTree';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const { data: devSpecs, isLoading } = useApiForPersonalDevSpecs();

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
        {/* Left Content */}
        <div className="md:col-span-8 lg:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>프로필 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
            </CardContent>
          </Card>
        </div>

        {/* Right Content */}
        <div className="md:col-span-4 lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {/* ... Avatar and user info content remains the same ... */}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : devSpecs?.data ? (
                <DevSpecTree items={devSpecs.data} />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  개발 스펙 정보가 없습니다
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;