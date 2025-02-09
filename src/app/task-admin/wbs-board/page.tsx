'use client';

import React, { useState } from 'react';
import DataGrid from 'react-data-grid';
import type { Column, SortColumn } from 'react-data-grid';
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import 'react-data-grid/lib/styles.css';

interface TaskDashboard {
    id: string;
    title: string;
    description?: string;
    screen_url?: string;
    status: string;
    created_by: string;
    order: number;
    is_archived: boolean;
    figma_url?: string;
    created_at: string;
}

const WbsBoard: React.FC = () => {
    const [sortColumns, setSortColumns] = useState<SortColumn[]>([]);

    const initialRows: TaskDashboard[] = [
        {
            id: "1",
            title: "프로젝트 기획",
            description: "프로젝트 초기 기획 작업",
            screen_url: "",
            status: "완료",
            created_by: "김철수",
            order: 1,
            is_archived: false,
            figma_url:
                "https://www.figma.com/design/K6llOysA3A5tUp4DcDhhzl/PDS-(%EC%BA%A0%ED%8E%98%EC%9D%B8)?node-id=421-35436&t=7VjvvJttrgzyCiMd-1",
            created_at: "2024-02-01T10:00:00Z"
        },
        {
            id: "2",
            title: "요구사항 분석",
            description: "비즈니스 요구사항 분석 및 정리",
            screen_url: "",
            status: "진행중",
            created_by: "이영희",
            order: 2,
            is_archived: false,
            figma_url:
                "https://www.figma.com/design/K6llOysA3A5tUp4DcDhhzl/PDS-(%EC%BA%A0%ED%8E%98%EC%9D%B8)?node-id=454-19036&t=7VjvvJttrgzyCiMd-1",
            created_at: "2024-02-15T12:00:00Z"
        }
    ];

    const [rows, setRows] = useState(initialRows);

    const columns: Column<TaskDashboard>[] = [
        { key: "id", name: "ID", width: 80, frozen: true },
        { key: "title", name: "작업 제목", width: 300, frozen: true },
        { key: "created_by", name: "담당자", width: 150 },
        { key: "status", name: "상태", width: 120 },
        {
            key: "figma_url",
            name: "Figma",
            width: 80,
            renderCell: ({ row }) => {
                if (!row.figma_url) return null;
                return (
                    <Button asChild variant="outline" className="p-2">
                        <a
                            href={row.figma_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Figma 디자인 열기"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </Button>
                );
            }
        },
        {
            key: "order",
            name: "순서",
            width: 80,
            renderCell: ({ row }) => row.order
        },
        {
            key: "created_at",
            name: "생성일",
            width: 180,
            renderCell: ({ row }) => new Date(row.created_at).toLocaleString()
        }
    ];

    function sortRows(initialRows: TaskDashboard[], sortColumns: SortColumn[]): TaskDashboard[] {
        if (sortColumns.length === 0) return initialRows;

        const sortedRows = [...initialRows];
        sortedRows.sort((a, b) => {
            for (const sort of sortColumns) {
                const aValue = a[sort.columnKey as keyof TaskDashboard] ?? '';
                const bValue = b[sort.columnKey as keyof TaskDashboard] ?? '';
                const comparator = aValue.toString().localeCompare(bValue.toString());
                if (comparator !== 0) {
                    return sort.direction === 'ASC' ? comparator : -comparator;
                }
            }
            return 0;
        });

        return sortedRows;
    }

    return (
        <div className="flex flex-col items-center">
            {/* 상단 타이틀 */}
            <h2 className="text-2xl font-semibold my-4">업무 관리 보드</h2>

            {/* DataGrid 테이블 */}
            <div className="w-[70%] shadow-lg border border-gray-200 rounded-lg p-4">
                <DataGrid
                    className="h-[600px]"
                    columns={columns}
                    rows={sortRows(rows, sortColumns)}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    defaultColumnOptions={{
                        sortable: true,
                        resizable: true
                    }}
                />
            </div>
        </div>
    );
};

export default WbsBoard;
