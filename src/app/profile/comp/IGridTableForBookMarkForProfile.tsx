'use client';

import React, { useState, useMemo } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { PersonalBookmark } from '@/types/typeForUser';
import { Save } from 'lucide-react';
import CommonInputForGridCellEdit from '@/app/task-admin/task-dashboard/components/GridEditor/CommonInputForGridCellEdit';

// 기존 CommonInputForGridCellEdit 컴포넌트 사용
interface InputProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

// const CommonInputForGridCellEdit = ({ row, column, onRowChange, onClose }: InputProps) => {
//     const [initialValue] = useState(row[column.key] as string);

//     const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         onRowChange({ ...row, [column.key]: event.target.value });
//     };

//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             onClose(true, false);
//         }
//         if (event.key === 'Escape') {
//             onRowChange({ ...row, [column.key]: initialValue });
//             onClose(true, false);
//         }
//     };

//     const handleBlur = () => {
//         onClose(true, false);
//     };

//     return (
//         <input
//             className="w-full h-full px-3 bg-white focus:outline-none"
//             value={row[column.key]}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             onKeyDown={handleKeyDown}
//             autoFocus
//         />
//     );
// };

interface BookmarkRow extends PersonalBookmark {
    // 추가 속성이 필요하면 여기에 추가
}

const IGridTableForBookMarkForProfile: React.FC = () => {
    // 샘플 데이터
    const [bookmarks, setBookmarks] = useState<BookmarkRow[]>([
        {
            id: '1',
            title: 'GitHub',
            url: 'https://github.com',
            favicon_url: '🐙',
            description: '코드 저장소 및 버전 관리 플랫폼',
            category: '개발',
            created_at: '2025-06-15T10:00:00Z',
            user_id: 'user1'
        },
        {
            id: '2',
            title: 'Stack Overflow',
            url: 'https://stackoverflow.com',
            favicon_url: '📚',
            description: '개발자 Q&A 커뮤니티',
            category: '개발',
            created_at: '2025-06-14T15:30:00Z',
            user_id: 'user1'
        },
        {
            id: '3',
            title: 'MDN Web Docs',
            url: 'https://developer.mozilla.org',
            favicon_url: '📖',
            description: 'Web 기술 공식 문서',
            category: '문서',
            created_at: '2025-06-13T09:20:00Z',
            user_id: 'user1'
        },
        {
            id: '4',
            title: 'React Documentation',
            url: 'https://react.dev',
            favicon_url: '⚛️',
            description: 'React 공식 문서 및 튜토리얼',
            category: '문서',
            created_at: '2025-06-12T14:45:00Z',
            user_id: 'user1'
        },
        {
            id: '5',
            title: 'Vercel Deployment Platform',
            url: 'https://vercel.com',
            favicon_url: '▲',
            description: '프론트엔드 배포 및 호스팅 플랫폼',
            category: '도구',
            created_at: '2025-06-11T11:15:00Z',
            user_id: 'user1'
        }
    ]);

    // 선택된 행들 (react-data-grid 7.0 방식)
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // 카테고리 선택 에디터
    const CategorySelectEditor = ({ row, column, onRowChange, onClose }: InputProps) => {
        const categories = ['개발', '문서', '도구', '기타'];
        const [initialValue] = useState(row[column.key] as string);

        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            onRowChange({ ...row, [column.key]: event.target.value });
            onClose(true, false);
        };

        const handleKeyDown = (event: React.KeyboardEvent<HTMLSelectElement>) => {
            if (event.key === 'Escape') {
                onRowChange({ ...row, [column.key]: initialValue });
                onClose(true, false);
            }
        };

        return (
            <select
                className="w-full h-full px-3 bg-white focus:outline-none"
                value={row[column.key] as string}
                onChange={handleChange}
                onBlur={() => onClose(true, false)}
                onKeyDown={handleKeyDown}
                autoFocus
            >
                {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>
        );
    };

    // 컬럼 정의 - 제목 제거, 편집 가능한 컬럼들 추가
    const columns: Column<BookmarkRow>[] = useMemo(() => [
        {
            ...SelectColumn,
            width: 50,
            resizable: false,
        },
        {
            key: 'favicon_url',
            name: '',
            width: 60,
            renderCell: ({ row }) => (
                <div className="flex items-center justify-center h-full">
                    <span className="text-xl">{row.favicon_url || '🔗'}</span>
                </div>
            )
        },
        {
            key: 'url',
            name: 'URL',
            width: 350,
            resizable: true,
            renderEditCell: CommonInputForGridCellEdit,
            renderCell: ({ row }) => (
                <div className="flex items-center h-full px-3">
                    <span className="text-sm text-blue-600 truncate hover:underline cursor-pointer">
                        {row.url}
                    </span>
                </div>
            )
        },
        {
            key: 'description',
            name: '설명',
            width: 400,
            resizable: true,
            renderEditCell: CommonInputForGridCellEdit,
            renderCell: ({ row }) => (
                <div className="flex items-center h-full px-3">
                    <span className="text-sm text-gray-600 truncate">
                        {row.description || '-'}
                    </span>
                </div>
            )
        },
        {
            key: 'category',
            name: '카테고리',
            width: 120,
            resizable: true,
            renderEditCell: CategorySelectEditor,
            renderCell: ({ row }) => (
                <div className="flex items-center justify-center h-full">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${row.category === '개발' ? 'bg-blue-100 text-blue-800' :
                        row.category === '문서' ? 'bg-green-100 text-green-800' :
                            row.category === '도구' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                        }`}>
                        {row.category || '기타'}
                    </span>
                </div>
            )
        },
        {
            key: 'actions',
            name: '작업',
            width: 140,
            renderCell: ({ row }) => (
                <div className="flex items-center justify-center h-full space-x-2">
                    <button
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        onClick={() => handleVisit(row.url)}
                    >
                        방문
                    </button>
                    <button
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        onClick={() => handleDelete(row.id)}
                    >
                        삭제
                    </button>
                </div>
            )
        }
    ], []);

    // 이벤트 핸들러들
    const handleVisit = (url: string) => {
        window.open(url, '_blank');
    };

    const handleDelete = (id: string) => {
        if (confirm('정말 삭제하시겠습니까?')) {
            setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
            // 선택된 항목에서도 제거
            setSelectedRows(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    const handleDeleteSelected = () => {
        if (selectedRows.size === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        if (confirm(`선택한 ${selectedRows.size}개 항목을 삭제하시겠습니까?`)) {
            const selectedIds = Array.from(selectedRows);
            setBookmarks(prev => prev.filter(bookmark => !selectedIds.includes(bookmark.id)));
            setSelectedRows(new Set());
        }
    };

    // Save 버튼 핸들러 - 선택된 행들의 정보를 로그로 출력
    const handleSave = () => {
        if (selectedRows.size === 0) {
            alert('저장할 항목을 선택해주세요.');
            return;
        }

        const selectedIds = Array.from(selectedRows);
        const selectedBookmarks = bookmarks.filter(bookmark => selectedIds.includes(bookmark.id));

        console.log('=== 선택된 즐겨찾기 정보 ===');
        console.log(`총 ${selectedBookmarks.length}개 항목:`);
        selectedBookmarks.forEach((bookmark, index) => {
            console.log(`\n${index + 1}. ${bookmark.title}`);
            console.log(`   - ID: ${bookmark.id}`);
            console.log(`   - URL: ${bookmark.url}`);
            console.log(`   - 설명: ${bookmark.description}`);
            console.log(`   - 카테고리: ${bookmark.category}`);
            console.log(`   - 생성일: ${bookmark.created_at}`);
        });
        console.log('\n=== 전체 데이터 (JSON) ===');
        console.log(JSON.stringify(selectedBookmarks, null, 2));

        alert(`${selectedBookmarks.length}개 항목이 저장되었습니다. 콘솔을 확인해주세요.`);
        setSelectedRows(new Set()); // 저장 후 선택 해제
    };

    // 행 변경 핸들러 - 실시간 반영
    const handleRowsChange = (rows: BookmarkRow[]) => {
        setBookmarks(rows);
        console.log('Data updated:', rows);
    };

    return (
        <div className="w-full h-full">
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

            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-xs text-gray-500">총 {bookmarks.length}개</p>
                    </div>

                    {/* 선택된 개수 */}
                    {selectedRows.size > 0 && (
                        <span className="text-xs text-blue-600 font-medium">
                            {selectedRows.size}개 선택됨
                        </span>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {/* Save 버튼 */}
                    <button
                        onClick={handleSave}
                        disabled={selectedRows.size === 0}
                        className={`flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors ${selectedRows.size === 0
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <Save className="w-3 h-3" />
                        <span>Save ({selectedRows.size})</span>
                    </button>

                    {/* 선택 삭제 버튼 */}
                    {selectedRows.size > 0 && (
                        <button
                            onClick={handleDeleteSelected}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            선택 삭제 ({selectedRows.size})
                        </button>
                    )}

                    {/* 새 즐겨찾기 버튼 */}
                    <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                        + 새 즐겨찾기
                    </button>
                </div>
            </div>

            <div className="w-full" style={{ height: '300px' }}>
                <DataGrid
                    columns={columns}
                    rows={bookmarks}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={setSelectedRows}
                    onRowsChange={handleRowsChange}
                    rowKeyGetter={(row) => row.id}
                    className="rdg-light"
                    style={{
                        height: '100%',
                        width: '100%',
                        minWidth: '1120px'
                    }}
                    headerRowHeight={32}
                    rowHeight={45}
                    defaultColumnOptions={{
                        sortable: true,
                        resizable: true
                    }}
                />
            </div>

            <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
                <span>💡 URL, 설명, 카테고리를 더블클릭하면 편집할 수 있습니다</span>
                <span>총 너비: 1120px (스크롤 가능)</span>
            </div>
        </div>
    );
};

export default IGridTableForBookMarkForProfile;