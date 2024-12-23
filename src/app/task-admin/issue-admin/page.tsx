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
import { useApiForGetAllIssueList } from "@/hook/useApiForGetAllIssueList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { IssueFilter, CreateIssueDto } from "@/types/typeForTaskIssue";
import ISearchFormForIssueList from "@/components/searchform/ISearchFormForIssueList";
import IDialogButtonForRegisterIssue from "@/components/dialog/IDialogButtonForRegisterIssue";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import IDialogButtonForDeleteTaskIssue from "@/components/dialog/IDialogButtonForDeleteTaskIssue";
import IDialogButtonForUpdateTaskIssue from "@/components/dialog/IDialogButtonForUpdateTaskIssue";
import { CustomBadge } from "@/components/bedge/CustomBadge";
import ISquareForShowImage from "@/components/dialog/display/ISquareForShowImage";
import Pagination from "rc-pagination"; // rc-pagination import
import TextAlign from "@tiptap/extension-text-align";
// import "rc-pagination/assets/index.css"; // 기본 스타일 가져오기

const IssueAdminPage = () => {
    const [filter, setFilter] = useState<IssueFilter>({});
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Items per page
    const offset = (currentPage - 1) * limit;

    const { data, isLoading, error } = useApiForGetAllIssueList(filter, limit, offset);
    const { issues, totalIssues, totalCompleted, totalIncomplete } = data || {};
    const { isAuthenticated } = useUserStore();

    console.log("data: ", data);

    const handleFilterChange = (newFilter: IssueFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    const handleIssueRegister = (issueData: CreateIssueDto) => {
        console.log("New Issue Registered:", issueData);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-32 w-full" />
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
            <ISearchFormForIssueList
                onFilterChange={handleFilterChange}
                stats={{
                    totalCompleted: totalCompleted || 0,
                    totalIncomplete: totalIncomplete || 0,
                }}
            />

            <div className="flex justify-end">
                <IDialogButtonForRegisterIssue isDisabled={!isAuthenticated} />
            </div>

            <div className="space-y-4">
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Refer Image</TableHead>
                                <TableHead>Type/Priority/Status</TableHead>
                                <TableHead>Categories</TableHead>
                                <TableHead>Manager/Executor</TableHead>
                                <TableHead>Page URL</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {issues?.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell>{issue.id}</TableCell>
                                    <TableCell>{issue.title}</TableCell>
                                    <TableCell>
                                        <ISquareForShowImage
                                            imageUrls={{
                                                url1: issue.ref_img_url1,
                                                url2: issue.ref_img_url2,
                                                url3: issue.ref_img_url3,
                                            }}
                                        />
                                    </TableCell>
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
                                            {issue.category2 && (
                                                <CustomBadge variant="category" value={issue.category2} />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div>Manager: {issue.manager_user?.email || "N/A"}</div>
                                            <div>Executor: {issue.executor_user?.email || "N/A"}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="">
                                        <div className="h-full w-full flex items-center justify-center">
                                        {issue.page_url && (
                                            <Link href={issue.page_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <IDialogButtonForUpdateTaskIssue issue={issue} />
                                            <IDialogButtonForDeleteTaskIssue
                                                issueId={issue.id}
                                                issueTitle={issue.title}
                                                filter={filter}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-center">
                    <Pagination
                        current={currentPage} // currentPage 대신 current
                        total={totalIssues || 0} // totalItems -> total
                        pageSize={limit}
                        onChange={handlePageChange} // onPageChange 대신 onChange
                    />
                </div>

            </div>
        </div>
    );
};

export default IssueAdminPage;
