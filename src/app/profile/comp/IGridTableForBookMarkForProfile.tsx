'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { PersonalBookmark } from '@/types/typeForBookMark';
import { Save, Loader2 } from 'lucide-react';
import CommonInputForGridCellEdit from '@/app/task-admin/task-dashboard/components/GridEditor/CommonInputForGridCellEdit';
import {
    useApiForPersonalBookmarks,
    useCreatePersonalBookmark,
    useUpdatePersonalBookmark,
    useDeletePersonalBookmark,
    useDeleteMultipleBookmarks
} from '@/hook/user/useApiForPersonalBookmarks';
import { useUserStore } from '@/store/useUserStore';

interface InputProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

interface BookmarkRow extends PersonalBookmark {
    // 추가 속성이 필요하면 여기에 추가
}

const IGridTableForBookMarkForProfile: React.FC = () => {
    const user = useUserStore((state) => state.user);

    // API 훅들
    const { data: bookmarksData, isLoading, error } = useApiForPersonalBookmarks();
    const createMutation = useCreatePersonalBookmark();
    const updateMutation = useUpdatePersonalBookmark();
    const deleteMutation = useDeletePersonalBookmark();
    const bulkDeleteMutation = useDeleteMultipleBookmarks();

    // 로컬 상태
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
    const [localBookmarks, setLocalBookmarks] = useState<BookmarkRow[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    // 북마크 데이터 동기화
    useEffect(() => {
        if (bookmarksData?.data) {
            setLocalBookmarks(bookmarksData.data);
            setHasChanges(false);
        }
    }, [bookmarksData]);

    // 로딩 상태 체크
    const isAnyMutationLoading =
        createMutation.isPending ||
        updateMutation.isPending ||
        deleteMutation.isPending ||
        bulkDeleteMutation.isPending;

    const columns: Column<BookmarkRow>[] = useMemo(() => [
        {
            ...SelectColumn,
            width: 40,
            minWidth: 40,
            maxWidth: 40,
            resizable: false,
        },
        {
            key: 'url',
            name: 'URL',
            width: 350,
            minWidth: 250,
            resizable: true,
            renderEditCell: CommonInputForGridCellEdit,
            renderCell: ({ row }) => (
                <div className="flex items-center h-full px-2">
                    <span
                        className="text-sm text-blue-600 truncate hover:underline cursor-pointer"
                        onClick={() => handleVisit(row.url)}
                        title={`${row.url} - 클릭하여 방문`}
                    >
                        {row.url}
                    </span>
                </div>
            )
        },
        {
            key: 'description',
            name: '설명',
            width: 300,
            minWidth: 200,
            resizable: true,
            renderEditCell: CommonInputForGridCellEdit,
            renderCell: ({ row }) => (
                <div className="flex items-center h-full px-2">
                    <span className="text-sm text-gray-600 truncate" title={row.description}>
                        {row.description || '-'}
                    </span>
                </div>
            )
        },
        {
            key: 'actions',
            name: '작업',
            width: 80,
            minWidth: 70,
            maxWidth: 80,
            resizable: false,
            renderCell: ({ row }) => (
                <div className="flex items-center justify-center h-full">
                    <button
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        onClick={() => handleDelete(row.id)}
                        disabled={isAnyMutationLoading}
                    >
                        삭제
                    </button>
                </div>
            )
        }
    ], [isAnyMutationLoading]);

    // 이벤트 핸들러들
    const handleVisit = (url: string) => {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(formattedUrl, '_blank');
    };

    const handleDelete = async (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteMutation.mutateAsync(id);
                // 선택된 항목에서도 제거
                setSelectedRows(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(id);
                    return newSet;
                });
                console.log('북마크가 삭제되었습니다.');
            } catch (error) {
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const handleDeleteSelected = async () => {
        if (selectedRows.size === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        if (confirm(`선택한 ${selectedRows.size}개 항목을 삭제하시겠습니까?`)) {
            try {
                const selectedIds = Array.from(selectedRows);
                await bulkDeleteMutation.mutateAsync(selectedIds);
                setSelectedRows(new Set());
                console.log('선택된 북마크들이 삭제되었습니다.');
            } catch (error) {
                alert('삭제 중 오류가 발생했습니다.');
            }
        }
    };

    // Save 버튼 핸들러 - 변경된 항목들을 실제로 업데이트
    const handleSave = async () => {
        if (selectedRows.size === 0) {
            alert('저장할 항목을 선택해주세요.');
            return;
        }

        try {
            const selectedIds = Array.from(selectedRows);
            const originalBookmarks = bookmarksData?.data || [];

            // 변경된 항목들만 찾아서 업데이트
            const updatePromises = [];

            for (const id of selectedIds) {
                const localRow = localBookmarks.find(b => b.id === id);
                const originalRow = originalBookmarks.find(b => b.id === id);

                if (localRow && originalRow &&
                    (localRow.url !== originalRow.url || localRow.description !== originalRow.description)) {

                    updatePromises.push(
                        updateMutation.mutateAsync({
                            id: localRow.id,
                            data: {
                                url: localRow.url,
                                description: localRow.description
                            }
                        })
                    );
                }
            }

            if (updatePromises.length > 0) {
                await Promise.all(updatePromises);
                console.log(`${updatePromises.length}개 북마크가 업데이트되었습니다.`);
                setHasChanges(false);
            }

            // 선택된 북마크 정보 출력
            const selectedBookmarks = localBookmarks.filter(bookmark => selectedIds.includes(bookmark.id));

            console.log('=== 선택된 즐겨찾기 정보 ===');
            console.log(`총 ${selectedBookmarks.length}개 항목:`);
            selectedBookmarks.forEach((bookmark, index) => {
                console.log(`\n${index + 1}. ${bookmark.url}`);
                console.log(`   - ID: ${bookmark.id}`);
                console.log(`   - 설명: ${bookmark.description}`);
                console.log(`   - 사용자 ID: ${bookmark.user_id}`);
            });

            alert(`${selectedBookmarks.length}개 항목이 저장되었습니다. 콘솔을 확인해주세요.`);
            setSelectedRows(new Set());

        } catch (error) {
            console.error('저장 실패:', error);
            alert('저장 중 오류가 발생했습니다.');
        }
    };

    // 새 즐겨찾기 추가
    const handleAddBookmark = async () => {
        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            await createMutation.mutateAsync({
                url: 'https://example.com',
                description: '설명을 입력하세요'
            });
            console.log('새 북마크가 추가되었습니다.');
        } catch (error) {
            alert('북마크 추가 중 오류가 발생했습니다.');
        }
    };

    // 행 변경 핸들러 - 로컬 상태만 업데이트
    const handleRowsChange = (rows: BookmarkRow[]) => {
        setLocalBookmarks(rows);

        // 변경사항이 있는지 체크
        const originalBookmarks = bookmarksData?.data || [];
        const hasAnyChanges = rows.some(row => {
            const original = originalBookmarks.find(b => b.id === row.id);
            return original && (original.url !== row.url || original.description !== row.description);
        });

        setHasChanges(hasAnyChanges);
        console.log('로컬 데이터 변경됨 (아직 저장되지 않음)');
    };

    // 로딩 상태
    if (isLoading) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>북마크를 불러오는 중...</span>
                </div>
            </div>
        );
    }

    // 에러 상태
    if (error) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-2">북마크를 불러오는데 실패했습니다.</p>
                    <p className="text-sm text-gray-500">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <style jsx>{`
                .rdg {
                    border-radius: 8px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                    width: 100% !important;
                }
                .rdg-header-row {
                    background-color: #f9fafb;
                    font-weight: 600;
                    font-size: 12px;
                }
                .rdg-row:hover {
                    background-color: #f8fafc;
                }
                .rdg-viewport {
                    overflow-x: auto !important;
                }
                .rdg-cell[aria-selected="true"] {
                    outline: 2px solid #3b82f6;
                    outline-offset: -2px;
                }
            `}</style>

            <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-xs text-gray-500">총 {localBookmarks.length}개</p>
                    </div>

                    {/* 선택된 개수 */}
                    {selectedRows.size > 0 && (
                        <span className="text-xs text-blue-600 font-medium">
                            {selectedRows.size}개 선택됨
                        </span>
                    )}

                    {/* 변경 사항 표시 */}
                    {hasChanges && (
                        <span className="text-xs text-orange-600 font-medium">
                            ⚠️ 저장되지 않은 변경사항
                        </span>
                    )}

                    {/* 로딩 표시 */}
                    {isAnyMutationLoading && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>처리 중...</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Save 버튼 */}
                    <button
                        onClick={handleSave}
                        disabled={selectedRows.size === 0 || isAnyMutationLoading}
                        className={`flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors ${selectedRows.size === 0 || isAnyMutationLoading
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : hasChanges
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <Save className="w-3 h-3" />
                        <span>
                            {hasChanges ? '변경사항 저장' : 'Save'} ({selectedRows.size})
                        </span>
                    </button>

                    {/* 선택 삭제 버튼 */}
                    {selectedRows.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            disabled={isAnyMutationLoading}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                            선택 삭제 ({selectedRows.size})
                        </button>
                    )}

                    {/* 새 즐겨찾기 버튼 */}
                    <button
                        onClick={handleAddBookmark}
                        disabled={!user || isAnyMutationLoading}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                        + 새 즐겨찾기
                    </button>
                </div>
            </div>

            {/* 그리드 컨테이너 - 반응형 처리 */}
            <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
                <div className="overflow-x-auto">
                    <div style={{ minWidth: '730px', height: '400px' }}>
                        <DataGrid
                            columns={columns}
                            rows={localBookmarks}
                            selectedRows={selectedRows}
                            onSelectedRowsChange={setSelectedRows}
                            onRowsChange={handleRowsChange}
                            rowKeyGetter={(row) => row.id}
                            className="rdg-light"
                            style={{
                                height: '100%',
                                width: '100%'
                            }}
                            headerRowHeight={32}
                            rowHeight={45}
                            defaultColumnOptions={{
                                sortable: true,
                                resizable: true
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-3 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span>💡 URL, 설명을 더블클릭하면 편집할 수 있습니다. Save 버튼을 눌러야 실제로 저장됩니다.</span>
                <span className="text-right">최소 너비: 730px (스크롤 가능)</span>
            </div>
        </div>
    );
};

export default IGridTableForBookMarkForProfile;