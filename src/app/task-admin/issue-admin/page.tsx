// src/app/task-admin/issue-admin/page.tsx 업데이트

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
import { Badge } from "@/components/ui/badge";
import { useApiForGetAllIssueList } from "@/hook/useApiForGetAllIssueList";
import { Skeleton } from "@/components/ui/skeleton";
import { IssueFilter, CreateIssueDto } from "@/types/typeForTaskIssue";
import ISearchFormForIssueList from "@/components/searchform/ISearchFormForIssueList";
import IDialogButtonForRegisterIssue from "@/components/dialog/IDialogButtonForRegisterIssue";
import { useUserStore } from "@/store/useUserStore";
import { getCategoryColor, getPriorityColor, getStatusColor } from "@/lib/colorUtils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import IDialogButtonForDeleteTaskIssue from "@/components/dialog/IDialogButtonForDeleteTaskIssue";
import IDialogButtonForUpdateTaskIssue from "@/components/dialog/IDialogButtonForUpdateTaskIssue";

const IssueAdminPage = () => {
    const [filter, setFilter] = useState<IssueFilter>({});
    const { data: issues, isLoading, error } = useApiForGetAllIssueList(filter);
    const { isAuthenticated } = useUserStore();

    // 필터가 변경될 때 호출되는 핸들러
    const handleFilterChange = (newFilter: IssueFilter) => {
        setFilter(newFilter);
    };

    // 새로운 이슈 등록 핸들러
    const handleIssueRegister = (issueData: CreateIssueDto) => {
        console.log("New Issue Registered:", issueData);
        // 여기에 이슈 등록 API를 호출하는 로직 추가 가능
    };

    // 로딩 중인 경우의 UI
    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-32 w-full" /> {/* 필터링 폼 로딩 */}
                <div className="space-y-4">
                    <Skeleton className="h-7 w-24" />
                    <div className="border rounded-lg p-4">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full mb-2" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // 오류 발생 시의 UI
    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error: {error.message}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* 필터 검색 폼 */}
            <ISearchFormForIssueList onFilterChange={handleFilterChange} />

            <div className="flex">
                <IDialogButtonForRegisterIssue isDisabled={!isAuthenticated} />
            </div>

            {/* 이슈 테이블 */}
            <div className="space-y-4">
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 bg-gray-200">ID</TableHead>
                                <TableHead className="bg-gray-200">Title</TableHead>
                                <TableHead className="bg-gray-200">page_url</TableHead>
                                <TableHead className="bg-gray-200">Status</TableHead>
                                <TableHead className="bg-gray-200">Priority</TableHead>
                                <TableHead className="bg-gray-200">Category1</TableHead>
                                <TableHead className="bg-gray-200">Category2</TableHead>
                                <TableHead className="bg-gray-200">Manager</TableHead>
                                {/* <TableHead className="bg-gray-200">Created At</TableHead> */}
                                <TableHead className="bg-gray-200">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {issues?.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell>{issue.id}</TableCell>
                                    <TableCell className="font-medium">{issue.title}</TableCell>
                                    <TableCell className="font-medium">
                                        {issue.page_url && (
                                            <Link href={issue.page_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink />
                                            </Link>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getStatusColor(issue.status)}>
                                            {issue.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getPriorityColor(issue.priority)}>
                                            {issue.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={getCategoryColor(issue.category1)}>
                                            {issue.category1}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" >
                                            {issue.category2}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{issue.manager?.email || "N/A"}</TableCell>
                                    {/* <TableCell>
                                        {new Date(issue.created_at).toLocaleDateString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </TableCell> */}
                                    <TableCell>
                                        
                                        <IDialogButtonForUpdateTaskIssue 
                                            issue={issue}                                            
                                        />
                                        <IDialogButtonForDeleteTaskIssue
                                            issueId={issue.id}
                                            issueTitle={issue.title}
                                            filter={filter}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default IssueAdminPage;
