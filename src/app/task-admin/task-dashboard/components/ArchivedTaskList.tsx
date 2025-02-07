"use client";

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import { TaskDashboard, TaskDashboardForUpdate, User } from '@/types/task/typeForTaskDashboard';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, ExternalLink } from "lucide-react";
import 'react-data-grid/lib/styles.css';
import useApiForSaveTaskGridRows from '@/hook/task/useApiForSaveTaskGridRows';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import CommonInputForGridCellEdit from './GridEditor/CommonInputForGridCellEdit';
import ISelectBoxForUserAtGrid from './GridEditor/ISelectBoxForUserAtGrid';
import CommonCheckForGridEdit from './GridEditor/CommonCheckForGridEdit';

// 커스텀 스타일 정의
const customStyles = `
  .rdg {
    block-size: 100% !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 0.5rem !important;
  }

  .rdg-header-row {
    background-color: #f9fafb !important;
    font-weight: 600 !important;
    color: #374151 !important;
  }

  .rdg-cell {
    padding: 0.75rem 1rem !important;
    border-bottom: 1px solid #e5e7eb !important;
  }

  .rdg-row:hover {
    background-color: #f3f4f6 !important;
  }

  .rdg-row.rdg-row-selected {
    background-color: #e5e7eb !important;
  }

  .external-link-button {
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
  }

  .external-link-button:hover {
    background-color: #e5e7eb;
  }
`;

interface TaskDashboardWithUserName extends TaskDashboard {
    created_by_user_name: string;
    formatted_updated_at: string;
}

interface Props {
    archivedTasks?: TaskDashboard[];
}

const ArchivedTaskList = ({ archivedTasks = [] }: Props) => {
    const [selectedRows, setSelectedRows] = useState(() => new Set<React.Key>());

    const rows = useMemo(() =>
        archivedTasks.map(task => ({
            ...task,
            created_by_user_name: task.created_by_user?.full_name || '',
            formatted_updated_at: task.updated_at ? format(new Date(task.updated_at), 'yyyy-MM-dd HH:mm:ss') : '',
        })), [archivedTasks]
    );

    const [localRows, setLocalRows] = useState<TaskDashboardWithUserName[]>(rows);

    useEffect(() => {
        setLocalRows(rows);
    }, [rows]);

    const openTaskDetail = useCallback((taskId: string) => {
        window.open(`/task-admin/task-dashboard/${taskId}`, '_blank');
    }, []);

    const customSelectColumn = {
        ...SelectColumn,
        width: 'clamp(50px, 4vw, 65px)',  // 최소 50px, 최대 65px
        minWidth: 50,
        maxWidth: 65,
    };

    const columns: Column<TaskDashboardWithUserName>[] = useMemo(() => [
        customSelectColumn,
        {
            key: 'title',
            name: '제목',
            width: 'clamp(200px, 35%, 600px)',  // 최소 200px, 기본 35%, 최대 600px
            renderEditCell: (props) => (
                <CommonInputForGridCellEdit {...props} />
            )
        },
        {
            key: 'created_by_user',
            name: '담당자',
            width: 'clamp(120px, 15%, 200px)',  // 최소 120px, 기본 15%, 최대 200px
            renderCell: ({ row }) => row.created_by_user_name,
            renderEditCell: ISelectBoxForUserAtGrid
        },
        {
            key: 'formatted_updated_at',
            name: '완료 일시',
            width: 'clamp(150px, 20%, 250px)',  // 최소 150px, 기본 20%, 최대 250px
            renderCell: ({ row }) => row.formatted_updated_at
        },
        {
            key: 'task_detail',
            name: '링크',
            width: 'clamp(100px, 5%, 80px)',     // 최소 60px, 기본 5%, 최대 80px
            renderCell: ({ row }) => (
                <button
                    onClick={() => openTaskDetail(row.id)}
                    className="external-link-button"
                >
                    <ExternalLink size={18} />
                </button>
            )
        },
        {
            key: 'is_archived',
            name: '보관 여부',
            width: 'clamp(80px, 10%, 120px)',   // 최소 80px, 기본 10%, 최대 120px
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

    useEffect(() => {
        // 스타일 태그 추가
        const styleElement = document.createElement('style');
        styleElement.textContent = customStyles;
        document.head.appendChild(styleElement);

        // 컴포넌트 언마운트 시 스타일 제거
        return () => {
            document.head.removeChild(styleElement);
        };
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
                <div className="h-[600px] w-full">
                    <DataGrid
                        columns={columns}
                        rows={localRows}
                        selectedRows={selectedRows}
                        onSelectedRowsChange={onSelectedRowsChange}
                        onRowsChange={onRowsChange}
                        rowKeyGetter={rowKeyGetter}
                        className="h-full"
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ArchivedTaskList;