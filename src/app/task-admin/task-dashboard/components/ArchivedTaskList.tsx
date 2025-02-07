"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import { TaskDashboard, TaskDashboardForUpdate } from '@/types/task/typeForTaskDashboard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ExternalLink } from "lucide-react";
import 'react-data-grid/lib/styles.css';
import useApiForSaveTaskGridRows from '@/hook/task/useApiForSaveTaskGridRows';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import ISelectBoxForUserAtGrid from './GridEditor/ISelectBoxForUserAtGrid';
import CommonCheckForGridEdit from './GridEditor/CommonCheckForGridEdit';
import CommonInputForGridCellEdit from './GridEditor/CommonInputForGridCellEdit';

interface TaskDashboardWithUserName extends TaskDashboard {
    created_by_user_name: string;
    formatted_updated_at: string;
}

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());
    const [localRows, setLocalRows] = useState<TaskDashboardWithUserName[]>([]);

    const rows = useMemo(() =>
        archivedTasks.map(task => ({
            ...task,
            created_by_user_name: task.created_by_user?.full_name || '',
            formatted_updated_at: task.updated_at ? format(new Date(task.updated_at), 'yyyy-MM-dd HH:mm:ss') : '',
        })), [archivedTasks]
    );

    useEffect(() => {
        setLocalRows(rows);
    }, [rows]);

    const openTaskDetail = useCallback((taskId: string) => {
        window.open(`/task-admin/task-dashboard/${taskId}`, '_blank');
    }, []);

    const customSelectColumn = {
        ...SelectColumn,
        width: 45,
        minWidth: 45,
        maxWidth: 45,
        resizable: false
    };

    const columns: Column<TaskDashboardWithUserName>[] = useMemo(() => [
        customSelectColumn,
        {
            key: 'title',
            name: '제목',
            width: '35%',
            minWidth: 200,
            resizable: true,
            sortable: true,
            renderEditCell: CommonInputForGridCellEdit
        },
        {
            key: 'created_by_user',
            name: '담당자',
            width: '15%',
            minWidth: 120,
            resizable: true,
            sortable: true,
            renderCell: ({ row }) => row.created_by_user_name,
            renderEditCell: ISelectBoxForUserAtGrid
        },
        {
            key: 'formatted_updated_at',
            name: '완료 일시',
            width: '20%',
            minWidth: 150,
            resizable: true,
            sortable: true,
            renderCell: ({ row }) => row.formatted_updated_at
        },
        {
            key: 'task_detail',
            name: '링크',
            width: 60,
            minWidth: 60,
            maxWidth: 60,
            resizable: false,
            sortable: false,
            renderCell: ({ row }) => (
                <button onClick={() => openTaskDetail(row.id)}>
                    <ExternalLink size={18} />
                </button>
            )
        },
        {
            key: 'is_archived',
            name: '보관 여부',
            width: '10%',
            minWidth: 100,
            resizable: true,
            sortable: true,
            renderCell: ({ row }) => (
                <CommonCheckForGridEdit
                    row={row}
                    column={{ key: 'is_archived' }}
                    onRowChange={(updatedRow) => setLocalRows(prevRows =>
                        prevRows.map(r => (r.id === updatedRow.id ? updatedRow : r))
                    )}
                    onClose={() => { }}
                />
            ),
            renderEditCell: CommonCheckForGridEdit
        }
    ], [openTaskDetail]);

    const { mutate: saveTasksMutate, status } = useApiForSaveTaskGridRows();
    const isSaveLoading = status === 'pending';

    const handleSave = useCallback(async () => {
        const selectedRowsArray = Array.from(selectedRows);
        const modifiedRows = localRows.filter(row => selectedRowsArray.includes(row.id));

        const tasksToUpdate: TaskDashboardForUpdate[] = modifiedRows.map(row => ({
            id: row.id,
            title: row.title,
            description: row.description,
            created_by_user: row.created_by_user ? { id: row.created_by_user.id } : null,
            screen_url: row.screen_url || '',
            figma_url: row.figma_url || '',
            is_archived: row.is_archived || false,
        }));

        saveTasksMutate(tasksToUpdate, {
            onSuccess: () => {
                toast.success('Tasks saved successfully');
                setSelectedRows(new Set());
            },
            onError: (error: any) => {
                console.error("Error saving grid data:", error);
                toast.error(`Error saving grid data: ${error.message}`);
            }
        });
    }, [selectedRows, localRows, saveTasksMutate]);

    const onSelectedRowsChange = useCallback((newSelectedRows: Set<React.Key>) => {
        setSelectedRows(newSelectedRows);
    }, []);

    const rowKeyGetter = useCallback((row: TaskDashboardWithUserName) => row.id, []);

    const onRowsChange = useCallback((newRows: TaskDashboardWithUserName[]) => {
        setLocalRows(newRows);
    }, []);

    return (
        <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-xl font-semibold">작업 완료 목록</CardTitle>
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
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="h-[calc(100vh-300px)] min-h-[400px] w-full">
                    <DataGrid
                        columns={columns}
                        rows={localRows}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={onSelectedRowsChange}
                        onRowsChange={onRowsChange}
                        rowKeyGetter={rowKeyGetter}
                        className="h-full w-full"
                        rowHeight={40}
                        headerRowHeight={40}
                        enableVirtualization={true}
                    // defaultColumnOptions는 여기서 생략하고 각 컬럼에 직접 옵션을 설정했습니다
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ArchivedTaskList;