// C:\Users\terec\msa-admin\src\app\task-admin\test-targets-archive\page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { TestTarget } from '@/types/typeForTestTarget';
import Link from 'next/link';
import { ArrowLeft, Trash2, Search, RefreshCw, X, ArrowUpCircle } from 'lucide-react';
import useRestoreTestTarget from '@/hook/useRestoreTestTarget';
import useDeleteArchivedTestTarget from '@/hook/useDeleteArchivedTestTarget';
import useDeleteMultipleArchivedTestTargets from '@/hook/useDeleteMultipleArchivedTestTargets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApiForFetchArchivedTestTargets from '@/hook/useApiForFetchArchivedTestTargets';
import TestTargetArchiveList from './components/TestTargetArchiveList';
import { useQueryClient } from '@tanstack/react-query';

const TestArchivePage: React.FC = () => {
    // QueryClient 가져오기 (일괄 복원 후 캐시 무효화를 위해)
    const queryClient = useQueryClient();

    // 사용자 정보 가져오기
    const { user } = useUserStore();

    // 아카이브된 테스트 대상 목록 가져오기
    const { data: archivedTargets, isLoading, error, refetch } = useApiForFetchArchivedTestTargets();

    // 복원 및 삭제 뮤테이션
    const restoreMutation = useRestoreTestTarget();
    const deleteMutation = useDeleteArchivedTestTarget();
    const bulkDeleteMutation = useDeleteMultipleArchivedTestTargets();

    // 필터링 상태
    const [searchTerm, setSearchTerm] = useState('');

    // 체크박스 상태 관리
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [allChecked, setAllChecked] = useState(false);

    // 일괄 처리 상태
    const [isBulkRestoring, setIsBulkRestoring] = useState(false);

    // 담당자 목록 샘플 데이터
    const assignees = [
        { id: 'bb3786b4-3941-4a00-a753-765c3a8d1c5c', name: '김개발' },
        { id: '885e47a5-850d-4e80-b29e-82eb9b1132ef', name: '이테스터' },
        { id: 'some-uuid-3', name: '박매니저' }
    ];

    // 전체 체크박스 핸들러
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        setAllChecked(checked);

        if (checked && archivedTargets) {
            // 모든 아이템 ID를 선택 목록에 추가
            const allIds = archivedTargets.map((target: TestTarget) => target.id);
            setSelectedItems(allIds);
        } else {
            // 선택 목록 비우기
            setSelectedItems([]);
        }
    };

    // 개별 체크박스 핸들러
    const handleSelectItem = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = e.target.checked;

        if (checked) {
            // 아이템 추가
            setSelectedItems(prev => [...prev, id]);
        } else {
            // 아이템 제거
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
        }
    };

    // 선택된 아이템 수를 기반으로 전체 체크 상태 업데이트
    useEffect(() => {
        if (archivedTargets && archivedTargets.length > 0 && selectedItems.length === archivedTargets.length) {
            setAllChecked(true);
        } else {
            setAllChecked(false);
        }
    }, [selectedItems, archivedTargets]);

    // 담당자 ID로 이름 찾기
    const getAssigneeName = (assigneeId: string | null) => {
        if (!assigneeId) return '-';

        // 현재 로그인 사용자인 경우 표시
        if (user && assigneeId === user.id) {
            return `${user.full_name || user.email} (나)`;
        }

        const assignee = assignees.find(a => a.id === assigneeId);
        return assignee ? assignee.name : assigneeId;
    };

    // 진행률에 따른 색상 결정
    const getProgressColor = (percentage: number) => {
        if (percentage < 30) return 'bg-red-500';
        if (percentage < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    // 테스트 대상 복원 핸들러
    const handleRestore = (id: string) => {
        if (window.confirm('이 테스트 대상을 복원하시겠습니까?')) {
            toast.promise(
                restoreMutation.mutateAsync(id),
                {
                    pending: '복원 중입니다...',
                    success: '성공적으로 복원되었습니다',
                    error: '복원 중 오류가 발생했습니다'
                }
            );
        }
    };

    // 테스트 대상 삭제 핸들러
    const handleDelete = (id: string) => {
        if (window.confirm('이 테스트 대상을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            toast.promise(
                deleteMutation.mutateAsync(id),
                {
                    pending: '삭제 중입니다...',
                    success: '성공적으로 삭제되었습니다',
                    error: '삭제 중 오류가 발생했습니다'
                }
            );
        }
    };

    // 선택한 테스트 대상 일괄 삭제 핸들러
    const handleBulkDelete = () => {
        if (selectedItems.length === 0) return;

        if (window.confirm(`선택한 ${selectedItems.length}개 항목을 영구적으로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) {
            toast.promise(
                bulkDeleteMutation.mutateAsync(selectedItems).then(() => {
                    setSelectedItems([]);
                    setAllChecked(false);
                }),
                {
                    pending: '삭제 중입니다...',
                    success: '선택한 항목이 삭제되었습니다',
                    error: '삭제 중 오류가 발생했습니다'
                }
            );
        }
    };

    // 선택한 테스트 대상 일괄 복원 핸들러
    const handleBulkRestore = async () => {
        if (selectedItems.length === 0) return;

        if (window.confirm(`선택한 ${selectedItems.length}개 항목을 복원하시겠습니까?`)) {
            setIsBulkRestoring(true);
            try {
                // 각 항목을 순차적으로 복원
                const promises = selectedItems.map(id =>
                    restoreMutation.mutateAsync(id)
                        .catch(err => {
                            console.error(`Error restoring item ${id}:`, err);
                            return false; // 실패한 경우 false 반환
                        })
                );

                const results = await Promise.all(promises);
                const successCount = results.filter(result => result !== false).length;

                // 모든 항목이 성공적으로 복원됨
                if (successCount === selectedItems.length) {
                    toast.success(`${successCount}개 항목이 성공적으로 복원되었습니다`);
                }
                // 일부 항목만 성공적으로 복원됨
                else if (successCount > 0) {
                    toast.info(`${successCount}/${selectedItems.length}개 항목이 복원되었습니다`);
                }
                // 모든 항목 복원 실패
                else {
                    toast.error('항목 복원 중 오류가 발생했습니다');
                }

                // 선택 항목 초기화
                setSelectedItems([]);
                setAllChecked(false);

                // 데이터 갱신
                queryClient.invalidateQueries({ queryKey: ['archivedTestTargets'] });
                queryClient.invalidateQueries({ queryKey: ['testTargets'] });
            } catch (error) {
                toast.error('복원 중 오류가 발생했습니다');
                console.error('Bulk restore error:', error);
            } finally {
                setIsBulkRestoring(false);
            }
        }
    };

    // 새로고침 핸들러
    const handleRefresh = () => {
        toast.promise(
            refetch(),
            {
                pending: '데이터를 새로고침 중입니다...',
                success: '데이터가 새로고침 되었습니다',
                error: '데이터 새로고침 중 오류가 발생했습니다'
            }
        );
    };

    // 검색어 필터링
    const filteredTargets = archivedTargets
        ? archivedTargets.filter((target: TestTarget) => {
            if (!searchTerm) return true;

            const searchLower = searchTerm.toLowerCase();
            const nameMatch = target.name.toLowerCase().includes(searchLower);
            const descMatch = target.description?.toLowerCase().includes(searchLower) || false;
            return nameMatch || descMatch;
        })
        : [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-md bg-red-50 p-4 my-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">데이터를 불러오는 중 오류가 발생했습니다.</h3>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* 헤더 및 네비게이션 */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                    <Link
                        href="/task-admin/test-docu"
                        className="inline-flex items-center mr-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-1" />
                        <span className="text-sm">테스트 대상 목록</span>
                    </Link>
                </div>
                <br />
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">아카이브된 테스트 대상</h1>

                <button
                    className="flex items-center text-gray-600 px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                    onClick={handleRefresh}
                >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <span className="text-sm">새로고침</span>
                </button>
            </div>

            {/* 필터 및 검색 */}
            <div className="bg-white border rounded-lg shadow-sm mb-6">
                <div className="p-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="테스트 대상 검색..."
                            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setSearchTerm('')}
                            >
                                <X className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 선택된 항목이 있을 때 보여주는 액션 버튼 영역 */}
            {selectedItems.length > 0 && (
                <div className="bg-white border rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                            <span className="font-medium">{selectedItems.length}</span>개 항목 선택됨
                        </span>
                        <div className="flex items-center gap-3">
                            {/* 복원 버튼 */}
                            <button
                                className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-100 transition-colors"
                                onClick={handleBulkRestore}
                                disabled={isBulkRestoring}
                            >
                                <ArrowUpCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {isBulkRestoring ? '복원 처리 중...' : '선택한 항목 복원'}
                                </span>
                            </button>

                            {/* 삭제 버튼 */}
                            <button
                                className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md hover:bg-red-100 transition-colors"
                                onClick={handleBulkDelete}
                                disabled={bulkDeleteMutation.isPending}
                            >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {bulkDeleteMutation.isPending ? '삭제 처리 중...' : '선택한 항목 삭제'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 테스트 대상 아카이브 리스트 컴포넌트 사용 */}
            <TestTargetArchiveList
                archivedTargets={filteredTargets}
                selectedItems={selectedItems}
                onSelectItem={handleSelectItem}
                onSelectAll={handleSelectAll}
                allChecked={allChecked}
                getAssigneeName={getAssigneeName}
                getProgressColor={getProgressColor}
                onRestore={handleRestore}
                onDelete={handleDelete}
                isRestoringOrDeleting={restoreMutation.isPending || deleteMutation.isPending || isBulkRestoring}
                searchTerm={searchTerm}
            />
        </div>
    );
};

export default TestArchivePage;