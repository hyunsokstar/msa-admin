// src/app/user-admin/user-list/page.tsx
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const UserListPage = () => {
  const [filter, setFilter] = useState<UserFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { data: users, isLoading, isError } = useApiForGetAllUsers({ ...filter, email: debouncedSearchTerm });

  const currentUser = useUserStore(state => state.user);
  const { mutate: deleteUser } = useApiForDeleteUser();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
  };

  const executeSearch = () => {
      setDebouncedSearchTerm(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          executeSearch();
      }
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

  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-64">
              <div className="animate-bounce text-primary">Loading...</div>
          </div>
      );
  }

  if (isError) {
      return <div className="text-red-500 text-center p-4">Error loading users</div>;
  }

  return (
      <div className="p-6 bg-orange-50/30">
          <Card className="border-orange-100 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-b border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                      <Users className="h-6 w-6 text-orange-500" />
                      <CardTitle className="text-xl text-orange-700">사용자 관리</CardTitle>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4">
                      <div className="flex gap-2 flex-1 min-w-[300px]">
                          <Input
                              placeholder="이메일로 검색..."
                              value={searchTerm}
                              onChange={handleSearch}
                              onKeyPress={handleKeyPress}
                              className="border-orange-200 focus:border-orange-300 bg-white"
                          />
                          <Button 
                              onClick={executeSearch}
                              variant="secondary"
                              className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                          >
                              <Search className="h-4 w-4 mr-2" />
                              검색
                          </Button>
                      </div>
                      <Select onValueChange={handleAdminFilter}>
                          <SelectTrigger className="w-[180px] border-orange-200 bg-white hover:bg-orange-50 focus:border-orange-300">
                              <SelectValue placeholder="권한 유형" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-orange-200">
                              <SelectItem value="all" className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer">
                                  전체
                              </SelectItem>
                              <SelectItem value="admin" className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer">
                                  관리자
                              </SelectItem>
                              <SelectItem value="user" className="hover:bg-orange-50 focus:bg-orange-50 cursor-pointer">
                                  일반 사용자
                              </SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
              </CardHeader>
              <CardContent className="p-4">
                  <div className="flex gap-4">
                      {/* 왼쪽 사이드바 */}
                      <div className="w-[280px] min-w-[280px] border-r border-orange-100 pr-4">
                          <ISideBarForUserList 
                              onSelectOrganization={handleSelectOrganization}
                              selectedOrgId={filter.organizationId || null}
                          />
                      </div>

                      {/* 오른쪽 테이블 */}
                      <div className="flex-1">
                          <ITableForUserList 
                              users={users || []}
                              currentUser={currentUser}
                              onDeleteUser={handleDeleteUser}
                          />
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
  );
};

export default UserListPage;