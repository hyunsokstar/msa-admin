"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueFilter } from "@/types/typeForTaskIssue";
import { useApiForGetMyIssues } from "@/hook/useApiForGetMyIssues";
import ISearchFormForIssueList from "@/components/searchform/ISearchFormForIssueList";
import { useUserStore } from "@/store/useUserStore";
import { CustomBadge } from "@/components/bedge/CustomBadge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Pagination from "rc-pagination";

const MyIssuesPage = () => {
    const [filter, setFilter] = useState<IssueFilter>({});
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    const { isAuthenticated } = useUserStore();
    const { data, isLoading, error } = useApiForGetMyIssues(filter, limit, offset);
    const { issues, totalIssues, totalCompleted, totalIncomplete } = data || {};

    const handleFilterChange = (newFilter: IssueFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (!isAuthenticated) {
        return (
            <div className="p-6">
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
                    로그인이 필요한 페이지입니다.
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <Skeleton className="h-32 w-full" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <Skeleton key={index} className="h-16 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error: {error instanceof Error ? error.message : '오류가 발생했습니다.'}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">내 담당 이슈</h1>
            
            <ISearchFormForIssueList
                onFilterChange={handleFilterChange}
                stats={{
                    totalCompleted: totalCompleted || 0,
                    totalIncomplete: totalIncomplete || 0,
                }}
            />

            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Type/Priority/Status</TableHead>
                            <TableHead>Categories</TableHead>
                            <TableHead>Manager/Executor</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Page</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {issues?.map((issue) => (
                            <TableRow key={issue.id}>
                                <TableCell>{issue.id}</TableCell>
                                <TableCell>{issue.title}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <CustomBadge variant="priority" value={issue.priority} />
                                        <CustomBadge variant="type" value={issue.type} />
                                        <CustomBadge variant="status" value={issue.status} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <CustomBadge variant="category" value={issue.category1} />
                                        <CustomBadge variant="category" value={issue.category2} />
                                    </div>
                                </TableCell>
                                <TableCell>{issue.manager_user?.email || "N/A"}</TableCell>
                                <TableCell>
                                    {new Date(issue.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center">
                                        {issue.page_url && (
                                            <Link 
                                                href={issue.page_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center mt-4">
                <Pagination
                    current={currentPage}
                    total={totalIssues || 0}
                    pageSize={limit}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default MyIssuesPage;