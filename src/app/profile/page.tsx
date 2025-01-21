'use client';

import React from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck } from 'lucide-react';
import { PersonalDevSpec } from '@/types/typeForProfile';
import { useApiForPersonalDevSpecs } from '@/hook/user/useApiForPersonalDevSpecs';
import { FolderClosed, Play, CircleDot } from 'lucide-react';


const DevSpecTree = ({ items }: { items: PersonalDevSpec[] }) => {
  return (
    <div className="pl-4">
      {items.map((item) => (
        <div key={item.id} className="my-2">
          <div className="flex items-center gap-2">
            {/* 아이콘 영역 */}
            {item.children && item.children.length > 0 ? (
              <FolderClosed className="h-4 w-4 text-yellow-500" />
            ) : (
              item.status === 'active' ? (
                <Play className="h-4 w-4 text-green-500 fill-green-500" />
              ) : (
                <CircleDot className="h-4 w-4 text-gray-500" />
              )
            )}
            
            {/* 텍스트 영역 */}
            <span className="text-sm font-medium">{item.name}</span>
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              item.status === 'active' ? 'bg-green-100 text-green-800' : 
              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {item.status}
            </span>
          </div>
          
          {/* 자식 요소들 */}
          {item.children && item.children.length > 0 && (
            <div className="ml-4 mt-2 border-l-2 border-gray-200">
              <DevSpecTree items={item.children} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

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
               <div className="md:col-span-4 lg:col-span-3 space-y-6">
                   {/* 기본 정보 카드 */}
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

                   {/* 개발 스펙 트리 카드 */}
                   <Card>
                       <CardHeader>
                           <CardTitle>개발 스펙</CardTitle>
                       </CardHeader>
                       <CardContent>
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