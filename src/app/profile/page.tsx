'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck, FileText, Bookmark, Code, StickyNote } from 'lucide-react';
import { useApiForPersonalDevSpecs } from '@/hook/user/useApiForPersonalDevSpecs';
import DevSpecTree from './comp/DevSpecTree';
import IGridTableForBookMarkForProfile from './comp/IGridTableForBookMarkForProfile';

const ProfilePage = () => {
  const user = useUserStore((state) => state.user);
  const { data: devSpecs, isLoading } = useApiForPersonalDevSpecs();
  const [activeTab, setActiveTab] = useState('notepad');
  const [activeMemoTab, setActiveMemoTab] = useState('memo1');

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

  const mainTabs = [
    { id: 'notepad', label: '메모장', icon: FileText },
    { id: 'bookmarks', label: '즐겨찾기', icon: Bookmark },
  ];

  const memoTabs = [
    { id: 'memo1', label: '메모1' },
    { id: 'memo2', label: '메모2' },
    { id: 'memo3', label: '메모3' },
    { id: 'memo4', label: '메모4' },
  ];

  // 간단한 메모 컴포넌트
  const MemoContent = ({ memoId }: { memoId: string }) => {
    const [content, setContent] = useState('');

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <StickyNote className="w-5 h-5" />
            {memoTabs.find(tab => tab.id === memoId)?.label}
          </h3>
          <div className="text-xs text-gray-500">
            마지막 수정: {new Date().toLocaleDateString('ko-KR')}
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`${memoTabs.find(tab => tab.id === memoId)?.label}에 메모를 작성하세요...`}
          className="w-full h-96 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {content.length} 글자
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
            저장
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Content - 메인 콘텐츠 */}
        <div className="lg:col-span-9">
          <Card>
            {/* 메인 탭 헤더 */}
            <CardHeader className="pb-0">
              <div className="flex space-x-1 border-b">
                {mainTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardHeader>

            {/* 탭 콘텐츠 */}
            <CardContent className="pt-6">
              {activeTab === 'notepad' && (
                <div>
                  {/* 메모 서브 탭 */}
                  <div className="mb-6">
                    <div className="flex space-x-1 border-b border-gray-200">
                      {memoTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveMemoTab(tab.id)}
                          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeMemoTab === tab.id
                            ? 'border-orange-500 text-orange-600 bg-orange-50'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 메모 콘텐츠 */}
                  <MemoContent memoId={activeMemoTab} />
                </div>
              )}

              {activeTab === 'bookmarks' && (
                <div>
                  <IGridTableForBookMarkForProfile />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Content - 사이드바 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 기본 정보 카드 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-3">
              {/* Avatar */}
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={user.profile_image_url || ''}
                  alt={user.full_name || 'User'}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                  {getInitials(user.full_name)}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="text-center space-y-1">
                <h3 className="font-semibold text-base">
                  {user.full_name || 'Unknown User'}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>

                {/* Admin Badge */}
                {user.is_admin && (
                  <div className="flex items-center justify-center space-x-1 text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs">관리자</span>
                  </div>
                )}

                {/* Status Badge */}
                {user.status && (
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${user.status === 'online' ? 'bg-green-100 text-green-800' :
                    user.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                    <div className={`w-2 h-2 rounded-full mr-1 ${user.status === 'online' ? 'bg-green-500' :
                      user.status === 'away' ? 'bg-yellow-500' :
                        'bg-gray-500'
                      }`} />
                    {user.status === 'online' ? '온라인' :
                      user.status === 'away' ? '자리비움' : '오프라인'}
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="w-full space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">가입일:</span>
                  <span>
                    {user.created_at ?
                      new Date(user.created_at).toLocaleDateString('ko-KR') :
                      '-'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">최근 업데이트:</span>
                  <span>
                    {user.updated_at ?
                      new Date(user.updated_at).toLocaleDateString('ko-KR') :
                      '-'
                    }
                  </span>
                </div>
                {user.phone_number && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">연락처:</span>
                    <span>{user.phone_number}</span>
                  </div>
                )}
                {user.organization_id && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">조직 ID:</span>
                    <span className="text-xs text-gray-500">{user.organization_id}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 개발 스펙 카드 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Code className="w-4 h-4" />
                개발 스펙
              </CardTitle>
            </CardHeader>
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