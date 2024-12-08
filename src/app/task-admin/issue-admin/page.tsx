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

const IssueAdminPage = () => {
    const [filter, setFilter] = useState<IssueFilter>({});
    const { data: issues, isLoading, error } = useApiForGetAllIssueList(filter);
    const { isAuthenticated } = useUserStore();

    const handleFilterChange = (newFilter: IssueFilter) => {
        setFilter(newFilter);
    };

    const handleIssueRegister = (issueData: CreateIssueDto) => {
        console.log("New Issue Registered:", issueData);
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
            <ISearchFormForIssueList onFilterChange={handleFilterChange} />

            <div className="flex">
                <IDialogButtonForRegisterIssue isDisabled={!isAuthenticated} />
            </div>

            <div className="space-y-4">
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 bg-gray-200">ID</TableHead>
                                <TableHead className="bg-gray-200">Title</TableHead>
                                <TableHead className="bg-gray-200">참고 이미지</TableHead>
                                <TableHead className="bg-gray-200">Status/Type/Priority</TableHead>
                                <TableHead className="bg-gray-200">Categories</TableHead>
                                <TableHead className="bg-gray-200">Assignees</TableHead>
                                <TableHead className="bg-gray-200">Page URL</TableHead>
                                <TableHead className="bg-gray-200">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {issues?.map((issue) => (
                                <TableRow key={issue.id}>
                                    <TableCell>{issue.id}</TableCell>
                                    <TableCell className="font-medium">{issue.title}</TableCell>
                                    <TableCell className="font-medium">
                                        <ISquareForShowImage imageUrls={{
                                            url1: issue.ref_img_url1,
                                            url2: issue.ref_img_url2,
                                            url3: issue.ref_img_url3
                                        }} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <CustomBadge
                                                variant="status"
                                                value={issue.status}
                                            />
                                            <CustomBadge
                                                variant="type"
                                                value={issue.type}
                                            />
                                            <CustomBadge
                                                variant="priority"
                                                value={issue.priority}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <CustomBadge
                                                variant="category"
                                                value={issue.category1}
                                            />
                                            {issue.category2 && (
                                                <CustomBadge
                                                    value={issue.category2}
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="text-sm">
                                                <span className="font-semibold">Manager:</span>{' '}
                                                {issue.manager_user?.email || 'N/A'}
                                            </div>
                                            <div className="text-sm">
                                                <span className="font-semibold">Executor:</span>{' '}
                                                {issue.executor_user?.email || 'N/A'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {issue.page_url && (
                                            <Link href={issue.page_url} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </TableCell>
                                    <TableCell className="space-x-2">
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