"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserFilter } from '@/types/typeForUser';
import { useUserStore } from '@/store/useUserStore';
import { useApiForDeleteUser } from '@/hook/useApiForDeleteUser';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';
import ITableForUserList from './_comp/ITableForUserList';
import ISideBarForUserList from './_comp/ISideBarForUserList';

type SearchField = 'name' | 'email' | 'phone';

const UserListPage = () => {
  const [filter, setFilter] = useState<UserFilter>({});
  const [searchField, setSearchField] = useState<SearchField>('email');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState<{field: SearchField; term: string}>({ field: 'email', term: '' });
  
  const { data: users, isLoading, isError } = useApiForGetAllUsers({ 
    ...filter, 
    [debouncedSearch.field]: debouncedSearch.term 
  });

  const currentUser = useUserStore(state => state.user);
  const { mutate: deleteUser } = useApiForDeleteUser();

  const searchFieldOptions = [
    { value: 'name', label: '이름' },
    { value: 'email', label: '이메일' },
    { value: 'phone', label: '전화번호' }
  ];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const executeSearch = () => {
    setDebouncedSearch({ field: searchField, term: searchTerm });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  const handleSearchFieldChange = (value: string) => {
    setSearchField(value as SearchField);
    setSearchTerm('');
    setDebouncedSearch({ field: value as SearchField, term: '' });
  };

  const handleAdminFilter = (value: string) => {
    setFilter(prev => ({
      ...prev,
      isAdmin: value === 'admin' ? true : value === 'user' ? false : undefined
    }));
  };

  const handleSelectOrganization = (orgId: string | null) => {
    setFilter(prev => ({
      ...prev,
      organizationId: orgId ?? undefined
    }));
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteUser(userId);
    }
  };

  const getSearchPlaceholder = () => {
    switch(searchField) {
      case 'name': return '이름으로 검색...';
      case 'email': return '이메일로 검색...';
      case 'phone': return '전화번호로 검색...';
      default: return '검색어를 입력하세요...';
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
          <div className="w-3 h-3 rounded-full animate-pulse bg-gray-500"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center bg-white">
        <div className="text-red-500 text-center space-y-2">
          <p className="text-lg font-medium">데이터를 불러오는데 실패했습니다</p>
          <p className="text-sm text-gray-500">잠시 후 다시 시도해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="p-8">
        {/* 헤더 영역 */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-gray-900" />
            <h1 className="text-2xl font-semibold text-gray-900">사용자 관리</h1>
          </div>
          <p className="text-sm text-gray-500">전체 {users?.length || 0}명의 사용자가 있습니다</p>
        </div>

        {/* 검색 및 필터 영역 */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Select onValueChange={handleAdminFilter} defaultValue="all">
            <SelectTrigger className="w-[140px] border-gray-200 bg-white">
              <SelectValue placeholder="권한 유형" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="admin">관리자</SelectItem>
              <SelectItem value="user">일반 사용자</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex gap-2 flex-1 min-w-[300px]">
            <Select onValueChange={handleSearchFieldChange} defaultValue="email">
              <SelectTrigger className="w-[140px] border-gray-200 bg-white">
                <SelectValue placeholder="검색 조건" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                {searchFieldOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder={getSearchPlaceholder()}
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={handleKeyPress}
              className="flex-1 border-gray-200 focus:border-gray-300 bg-white"
            />
            <Button 
              onClick={executeSearch}
              className="bg-black text-white hover:bg-gray-900"
            >
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="flex">
            {/* 왼쪽 사이드바 */}
            <div className="w-[280px] min-w-[280px] p-6 bg-gray-50 border-r border-gray-200">
              <ISideBarForUserList 
                onSelectOrganization={handleSelectOrganization}
                selectedOrgId={filter.organizationId || null}
              />
            </div>

            {/* 오른쪽 테이블 */}
            <div className="flex-1 p-6 bg-white">
              <ITableForUserList 
                users={users || []}
                currentUser={currentUser}
                onDeleteUser={handleDeleteUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListPage;