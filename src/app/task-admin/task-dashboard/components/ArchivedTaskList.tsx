"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import { TaskDashboard, TaskDashboardForUpdate, User } from '@/types/task/typeForTaskDashboard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import 'react-data-grid/lib/styles.css';
import useApiForSaveTaskGridRows from '@/hook/task/useApiForSaveTaskGridRows';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import CommonInputForGridCellEdit from './GridEditor/CommonInputForGridCellEdit';
import ISelectBoxForUserAtGrid from './GridEditor/ISelectBoxForUserAtGrid';
import CommonCheckForGridEdit from './GridEditor/CommonCheckForGridEdit';

interface TaskDashboardWithUserName extends TaskDashboard {
    created_by_user_name: string;
    formatted_updated_at: string;
}

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

    // archivedTasks 데이터를 가공하여 rows를 생성
    const rows = useMemo(() =>
        archivedTasks.map(task => ({
            ...task,
            created_by_user_name: task.created_by_user?.full_name || '',
            formatted_updated_at: task.updated_at ? format(new Date(task.updated_at), 'yyyy-MM-dd HH:mm:ss') : '',
        })), [archivedTasks]
    );

    const [localRows, setLocalRows] = useState<TaskDashboardWithUserName[]>(rows);

    // rows가 변경될 때 localRows 업데이트
    useEffect(() => {
        setLocalRows(rows);
    }, [rows]);

    const columns: Column<TaskDashboardWithUserName>[] = useMemo(() => [
        SelectColumn,
        {
            key: 'title',
            name: '제목',
            renderEditCell: (props) => (
                <CommonInputForGridCellEdit {...props} />
            )
        },
        {
            key: 'description',
            name: '설명',
            renderEditCell: (props) => (
                <CommonInputForGridCellEdit {...props} />
            )
        },
        {
            key: 'created_by_user',
            name: '담당자',
            renderCell: ({ row }) => row.created_by_user_name,
            renderEditCell: ISelectBoxForUserAtGrid
        },
        {
            key: 'formatted_updated_at',
            name: '완료 일시',
            renderCell: ({ row }) => row.formatted_updated_at
        },
        {
            key: 'is archieved',
            name: '보관 여부',
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
    ], []);

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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>작업 완료 목록</CardTitle>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={selectedRows.size === 0 || isSaveLoading}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save ({selectedRows.size})
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DataGrid
                    columns={columns}
                    rows={localRows}
                    className="h-[400px]"
                    selectedRows={selectedRows}
                    onSelectedRowsChange={onSelectedRowsChange}
                    onRowsChange={onRowsChange}
                    rowKeyGetter={rowKeyGetter}
                />
            </CardContent>
        </Card>
    );
};

export default ArchivedTaskList;
