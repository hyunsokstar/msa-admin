"use client";

import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Users, UserPlus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserFilter } from '@/types/typeForUser';
import { useUserStore } from '@/store/useUserStore';
import { useApiForDeleteUser } from '@/hook/useApiForDeleteUser';
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers';
import IDialogButtonForUpdateUser from '@/components/dialog/IDialogButtonForUpdateUser';

const UserListPage = () => {
    const [filter, setFilter] = useState<UserFilter>({});
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { data: users, isLoading, isError } = useApiForGetAllUsers({ ...filter, email: debouncedSearchTerm });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const currentUser = useUserStore(state => state.user);
    const { mutate: deleteUser } = useApiForDeleteUser();

    const getInitials = (user: { full_name?: string | null; email?: string | null }) => {
        if (user.full_name) {
            return user.full_name.substring(0, 2).toUpperCase();
        }
        if (user.email) {
            return user.email.substring(0, 2).toUpperCase();
        }
        return 'UN';
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const executeSearch = () => {
        setDebouncedSearchTerm(searchTerm);
        setCurrentPage(1);
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
        setCurrentPage(1);
    };

    const handleDeleteUser = (userId: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteUser(userId);
        }
    };

    const paginatedUsers = users?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 0;

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
                                className="bg-blue-100 hover:bg-blue-200 text-brue-700"
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
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-orange-50/50 hover:bg-orange-50">
                                <TableHead className="w-[60px]">프로필</TableHead>
                                <TableHead>이메일</TableHead>
                                <TableHead>이름</TableHead>
                                <TableHead>전화번호</TableHead>
                                <TableHead>권한</TableHead>
                                <TableHead>가입일</TableHead>
                                <TableHead className="w-[150px]">작업</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers?.map((user) => {
                                const isCurrentUser = currentUser?.email === user.email;
                                return (
                                    <TableRow key={user.id} className="hover:bg-orange-50/30">
                                        <TableCell>
                                            <Avatar className="w-10 h-10 border-2 border-orange-100">
                                                <AvatarImage 
                                                    src={user.profile_image_url || ''} 
                                                    alt={user.full_name || user.email || '사용자'} 
                                                />
                                                <AvatarFallback className="bg-orange-100 text-orange-700">
                                                    {getInitials(user)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="font-medium">{user.email}</TableCell>
                                        <TableCell>{user.full_name || '-'}</TableCell>
                                        <TableCell>{user.phone_number || '-'}</TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant={user.is_admin ? "destructive" : "secondary"}
                                                className={user.is_admin 
                                                    ? "bg-red-100 text-red-700 hover:bg-red-200" 
                                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"}
                                            >
                                                {user.is_admin ? '관리자' : '일반'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {isCurrentUser && (
                                                <div className="flex gap-2">
                                                    <IDialogButtonForUpdateUser 
                                                        user={user}
                                                        isCurrentUser={isCurrentUser}
                                                    />
                                                    <Button 
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-1" />
                                                        삭제
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            aria-disabled={currentPage === 1}
                                            className={`
                                                ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                                hover:bg-orange-50 border-orange-200
                                            `}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i + 1}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(i + 1)}
                                                isActive={currentPage === i + 1}
                                                className={currentPage === i + 1 
                                                    ? 'bg-orange-500 text-white' 
                                                    : 'hover:bg-orange-50 border-orange-200'
                                                }
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            aria-disabled={currentPage === totalPages}
                                            className={`
                                                ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                                hover:bg-orange-50 border-orange-200
                                            `}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default UserListPage;