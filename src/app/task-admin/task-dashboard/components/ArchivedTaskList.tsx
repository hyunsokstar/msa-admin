"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import DataGrid, { Column, SelectColumn } from "react-data-grid";
import { TaskDashboard, TaskDashboardForUpdate } from "@/types/task/typeForTaskDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Archive, ExternalLink } from "lucide-react";
import "react-data-grid/lib/styles.css";
import useApiForSaveTaskGridRows from "@/hook/task/useApiForSaveTaskGridRows";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useApiForMoveTaskToHistory } from "@/hook/task/useApiForMoveTaskToHistory";
import ISelectBoxForUserAtGrid from "./GridEditor/ISelectBoxForUserAtGrid";
import CommonCheckForGridEdit from "./GridEditor/CommonCheckForGridEdit";
import CommonInputForGridCellEdit from "./GridEditor/CommonInputForGridCellEdit";

interface TaskDashboardWithUserName extends TaskDashboard {
    created_by_user_name: string;
    formatted_updated_at: string;
}

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [localRows, setLocalRows] = useState<TaskDashboardWithUserName[]>([]);

    useEffect(() => {
        setLocalRows(
            archivedTasks.map((task) => ({
                ...task,
                created_by_user_name: task.created_by_user?.full_name || "",
                formatted_updated_at: task.updated_at
                    ? format(new Date(task.updated_at), "yyyy-MM-dd HH:mm:ss")
                    : "",
            }))
        );
    }, [archivedTasks]);

    const { mutate: moveToHistory, isPending } = useApiForMoveTaskToHistory();
    const { mutate: saveTasksMutate, status: saveStatus } = useApiForSaveTaskGridRows();
    const isSaveLoading = saveStatus === "pending";

    const handleMoveToHistory = useCallback(() => {
        const selectedIds = Array.from(selectedRows);
        if (selectedIds.length === 0) return;

        moveToHistory(selectedIds, {
            onSuccess: () => {
                toast.success("Tasks moved to history.");
                setLocalRows((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
                setSelectedRows(new Set());
            },
            onError: (error) => {
                toast.error(`Error moving tasks: ${error.message}`);
            },
        });
    }, [selectedRows, moveToHistory]);

    const handleSave = useCallback(() => {
        const selectedRowsArray = Array.from(selectedRows);
        const modifiedRows = localRows.filter((row) => selectedRowsArray.includes(row.id));

        const tasksToUpdate: TaskDashboardForUpdate[] = modifiedRows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            created_by_user: row.created_by_user ? { id: row.created_by_user.id } : null,
            screen_url: row.screen_url || "",
            figma_url: row.figma_url || "",
            is_archived: row.is_archived || false,
        }));

        saveTasksMutate(tasksToUpdate, {
            onSuccess: () => {
                toast.success("Tasks saved successfully");
                setSelectedRows(new Set());
            },
            onError: (error: any) => {
                console.error("Error saving grid data:", error);
                toast.error(`Error saving grid data: ${error.message}`);
            },
        });
    }, [selectedRows, localRows, saveTasksMutate]);

    const openTaskDetail = useCallback((taskId: string) => {
        window.open(`/task-admin/task-dashboard/${taskId}`, "_blank");
    }, []);

    const columns: Column<TaskDashboardWithUserName>[] = useMemo(
        () => [
            {
                ...SelectColumn,
                width: 45,
                resizable: false,
            },
            {
                key: "title",
                name: "제목",
                width: "45%",
                minWidth: 300,
                resizable: true,
                sortable: true,
                renderEditCell: CommonInputForGridCellEdit,
            },
            {
                key: "created_by_user_name",
                name: "담당자",
                width: "13%",
                minWidth: 130,
                resizable: true,
                sortable: true,
                renderCell: ({ row }) => row.created_by_user_name,
                renderEditCell: ISelectBoxForUserAtGrid,
            },
            {
                key: "formatted_updated_at",
                name: "완료 일시",
                width: "20%",
                minWidth: 170,
                resizable: true,
                sortable: true,
                renderCell: ({ row }) => row.formatted_updated_at,
            },
            {
                key: "task_detail",
                name: "링크",
                width: "10%",
                minWidth: 120,
                maxWidth: 140,
                resizable: false,
                sortable: false,
                renderCell: ({ row }) => (
                    <button onClick={() => openTaskDetail(row.id)}>
                        <ExternalLink size={18} />
                    </button>
                ),
            },
            {
                key: "is_archived",
                name: "보관 여부",
                width: "12%",
                minWidth: 140,
                resizable: true,
                sortable: true,
                renderCell: ({ row }) => (
                    <CommonCheckForGridEdit
                        row={row}
                        column={{ key: "is_archived" }}
                        onRowChange={(updatedRow) =>
                            setLocalRows((prevRows) =>
                                prevRows.map((r) => (r.id === updatedRow.id ? updatedRow : r))
                            )
                        }
                        onClose={() => { }}
                    />
                ),
                renderEditCell: CommonCheckForGridEdit,
            },
        ],
        [openTaskDetail]
    );

    return (
        <Card className="mt-8 w-full">
            <CardHeader className="flex justify-between pb-6">
                <CardTitle>작업 완료 목록</CardTitle>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={selectedRows.size === 0 || isSaveLoading}
                        className="px-4 py-2 h-9"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save ({selectedRows.size})
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleMoveToHistory}
                        disabled={selectedRows.size === 0 || isPending}
                        className="px-4 py-2 h-9"
                    >
                        <Archive className="mr-2 h-4 w-4" />
                        Move to History
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="h-[calc(100vh-320px)] min-h-[500px] w-full max-w-full">
                    <DataGrid
                        columns={columns}
                        rows={localRows}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={setSelectedRows}
                        rowKeyGetter={(row) => row.id}
                        className="h-full w-full"
                        rowHeight={42}
                        headerRowHeight={42}
                        enableVirtualization={true}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ArchivedTaskList;
