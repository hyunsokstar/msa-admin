// src/app/task-admin/issue-admin/page.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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

// 상태, 우선순위 및 카테고리에 따라 색상 선택 함수
const getStatusColor = (status: string) => {
    switch (status) {
        case "Open":
            return "bg-green-100 text-green-800";
        case "In Progress":
            return "bg-blue-100 text-blue-800";
        case "Closed":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "High":
            return "bg-red-100 text-red-800";
        case "Medium":
            return "bg-yellow-100 text-yellow-800";
        case "Low":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case "shop":
            return "bg-purple-100 text-purple-800";
        case "cms":
            return "bg-emerald-100 text-emerald-800";
        case "lms":
            return "bg-indigo-100 text-indigo-800";
        case "user":
            return "bg-orange-100 text-orange-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const IssueAdminPage = () => {
    const [filter, setFilter] = useState<IssueFilter>({});
    const { data: issues, isLoading, error } = useApiForGetAllIssueList(filter);

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
                <IDialogButtonForRegisterIssue onIssueRegister={handleIssueRegister} />
            </div>

            {/* 이슈 테이블 */}
            <div className="space-y-4">
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 bg-gray-200">ID</TableHead>
                                <TableHead className="bg-gray-200">Title</TableHead>
                                <TableHead className="bg-gray-200">Status</TableHead>
                                <TableHead className="bg-gray-200">Priority</TableHead>
                                <TableHead className="bg-gray-200">Category</TableHead>
                                <TableHead className="bg-gray-200">Manager</TableHead>
                                <TableHead className="bg-gray-200">Created At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {issues?.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell>{issue.id}</TableCell>
                                    <TableCell className="font-medium">{issue.title}</TableCell>
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
                                        <Badge variant="secondary" className={getCategoryColor(issue.category)}>
                                            {issue.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{issue.manager?.email || "N/A"}</TableCell>
                                    <TableCell>
                                        {new Date(issue.created_at).toLocaleDateString("ko-KR", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
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
