// src/components/table/ITableForUserList.tsx
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import IDialogButtonForUpdateUser from '@/components/dialog/IDialogButtonForUpdateUser';
import { IUser } from '@/types/typeForUser';

interface ITableForUserListProps {
    users: IUser[];
    currentUser: IUser | null;
    onDeleteUser: (userId: string) => void;
}

const ITableForUserList = ({ users, currentUser, onDeleteUser }: ITableForUserListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const getInitials = (user: { full_name?: string | null; email?: string | null }) => {
        if (user.full_name) {
            return user.full_name.substring(0, 2).toUpperCase();
        }
        if (user.email) {
            return user.email.substring(0, 2).toUpperCase();
        }
        return 'UN';
    };

    const paginatedUsers = users.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(users.length / itemsPerPage);

    return (
        <>
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
                    {paginatedUsers.map((user) => {
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
                                                onClick={() => onDeleteUser(user.id)}
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
        </>
    );
};

export default ITableForUserList;