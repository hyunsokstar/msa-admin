// C:\Users\terec\msa-admin\src\app\task-admin\test-targets-archive\[id]\page.tsx
"use client";
import React, { useState, use } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import {
    useGetArchivedTestItems,
    useGetArchivedTestTarget,
    useRestoreTestTarget,
    useUpdateArchivedTestItem,
    useDeleteArchivedTestItem,
    useToggleArchivedTestItemCompletion,
    useToggleArchivedTestItemProcessing,
    useAddArchivedTestItem
} from "@/hook/useApiForArchivedTestTarget";
import { TestItem, CreateTestItemParams } from "@/types/typeForTestTarget";
import TestTargetInfoComponent from "./component/TestTargetInfoComponent";
import TestItemComponent from "./component/ArchivedTestItemComponent";
import AddTestItemModal from "./component/AddTestItemModal";
import { ArrowUpCircle } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Props 타입 정의
interface ArchivedTestDetailProps {
    params: Promise<{ id: string }>;
}

const ArchivedTestDetail = ({ params }: ArchivedTestDetailProps) => {
    // Next.js 15+에서 params가 Promise이므로, React.use()로 언래핑
    const { id: testId } = use(params);

    // 현재 로그인한 사용자 정보 가져오기
    const { user, isAuthenticated } = useUserStore();

    // 아카이브된 테스트 대상 정보 가져오기
    const {
        data: archivedTestTarget,
        isLoading: isLoadingTarget,
        error: targetError,
    } = useGetArchivedTestTarget(testId);

    // 아카이브된 테스트 항목 목록 가져오기
    const {
        data: archivedTestItems,
        isLoading: isLoadingItems,
        error: itemsError,
    } = useGetArchivedTestItems(testId);

    // 복원 뮤테이션
    const restoreMutation = useRestoreTestTarget();

    // 아카이브된 항목을 위한 CRUD 훅
    const addTestItemMutation = useAddArchivedTestItem();
    const updateTestItemMutation = useUpdateArchivedTestItem(testId);
    const toggleCompletionMutation = useToggleArchivedTestItemCompletion(testId);
    const toggleProcessingMutation = useToggleArchivedTestItemProcessing(testId);
    const deleteTestItemMutation = useDeleteArchivedTestItem(testId);

    // 항목 추가 모달 상태
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // 테스트 대상 복원 핸들러
    const handleRestore = () => {
        if (window.confirm('이 테스트 대상을 복원하시겠습니까? 관련된 모든 테스트 항목도 함께 복원됩니다.')) {
            toast.promise(
                restoreMutation.mutateAsync(testId),
                {
                    pending: '복원 중입니다...',
                    success: '성공적으로 복원되었습니다',
                    error: '복원 중 오류가 발생했습니다'
                }
            ).then(() => {
                // 복원 성공 시 아카이브 목록 페이지로 리디렉션
                window.location.href = '/task-admin/test-targets-archive';
            });
        }
    };

    // 항목을 상태별로 정렬하는 함수
    const sortTestItemsByStatus = (items: TestItem[]) => {
        if (!items) return [];

        // 정렬된 항목 배열을 반환
        return [...items].sort((a, b) => {
            // 완료된 항목은 가장 아래로
            if (a.is_completed && !b.is_completed) return 1;
            if (!a.is_completed && b.is_completed) return -1;

            // 진행 중인 항목은 중간으로
            if (a.is_processing && !b.is_processing && !b.is_completed) return 1;
            if (!a.is_processing && !a.is_completed && b.is_processing) return -1;

            // 그 외에는 생성 날짜 기준 정렬 (최신순)
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
    };

    // 테스트 항목 추가 핸들러
    const handleAddItem = (newItem: CreateTestItemParams) => {
        const itemWithAssignee = {
            ...newItem,
            assignee_id: user?.id || undefined,
            is_completed: false,
        };

        addTestItemMutation.mutate(itemWithAssignee, {
            onSuccess: () => {
                setAddModalOpen(false);
                toast.success('테스트 항목이 추가되었습니다');
            },
            onError: (error) => {
                toast.error(`항목 추가 실패: ${error.message}`);
            }
        });
    };

    // 테스트 항목 업데이트 핸들러
    const handleUpdateItem = (id: string, updates: { description?: string; notes?: string | null }) => {
        updateTestItemMutation.mutate({
            id,
            updates: {
                ...updates,
                notes: updates.notes ?? undefined
            }
        }, {
            onSuccess: () => {
                toast.success('테스트 항목이 업데이트되었습니다');
            },
            onError: (error) => {
                toast.error(`항목 업데이트 실패: ${error.message}`);
            }
        });
    };

    // 테스트 항목 토글 핸들러
    const handleToggleCompletion = (id: string, isCompleted: boolean) => {
        toggleCompletionMutation.mutate({
            id,
            isCompleted
        }, {
            onSuccess: () => {
                toast.success(`항목을 ${isCompleted ? '완료' : '미완료'} 상태로 변경했습니다`);
            },
            onError: (error) => {
                toast.error(`상태 변경 실패: ${error.message}`);
            }
        });
    };

    const handleToggleProcessing = (id: string, isProcessing: boolean) => {
        toggleProcessingMutation.mutate({
            id,
            isProcessing
        }, {
            onSuccess: () => {
                toast.success(`항목을 ${isProcessing ? '진행 중' : '미시작'} 상태로 변경했습니다`);
            },
            onError: (error) => {
                toast.error(`상태 변경 실패: ${error.message}`);
            }
        });
    };

    // 테스트 항목 삭제 핸들러
    const handleDeleteItem = (id: string) => {
        if (window.confirm('이 테스트 항목을 삭제하시겠습니까?')) {
            deleteTestItemMutation.mutate(id, {
                onSuccess: () => {
                    toast.success('테스트 항목이 삭제되었습니다');
                },
                onError: (error) => {
                    toast.error(`항목 삭제 실패: ${error.message}`);
                }
            });
        }
    };

    // 상태별로 정렬된 테스트 항목 목록
    const sortedArchivedTestItems = archivedTestItems ? sortTestItemsByStatus(archivedTestItems) : [];

    // 각 상태별 항목 개수
    const getStatusCounts = () => {
        if (!archivedTestItems) return { total: 0, notStarted: 0, processing: 0, completed: 0 };

        const completed = archivedTestItems.filter(item => item.is_completed).length;
        const processing = archivedTestItems.filter(item => !item.is_completed && item.is_processing).length;
        const notStarted = archivedTestItems.length - completed - processing;

        return {
            total: archivedTestItems.length,
            notStarted,
            processing,
            completed
        };
    };

    const statusCounts = getStatusCounts();

    // 현재 사용자가 담당자인지 확인
    const isCurrentUserAssignee = user && archivedTestTarget?.assignee_id === user.id;

    // 로딩 및 에러 처리
    if (isLoadingTarget || isLoadingItems) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>로딩 중...</span>
                </div>
            </div>
        );
    }

    if (targetError || itemsError) {
        return (
            <div className="container mx-auto px-4 py-8 text-red-500">
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                    <p className="font-medium">데이터를 불러오는 중 오류가 발생했습니다.</p>
                    <p className="text-sm mt-1">{(targetError as Error)?.message || (itemsError as Error)?.message || '알 수 없는 오류'}</p>
                </div>
            </div>
        );
    }

    if (!archivedTestTarget) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="font-medium">존재하지 않는 아카이브된 테스트 대상입니다.</p>
                    <p className="text-sm mt-2">
                        <Link href="/task-admin/test-targets-archive" className="text-indigo-600 hover:text-indigo-900">
                            아카이브 목록으로 돌아가기
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50">
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

            {/* 상단 네비게이션 영역 */}
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                    <Link href="/task-admin/test-targets-archive" className="text-indigo-600 hover:text-indigo-900 flex items-center">
                        &lt; 아카이브 목록으로 돌아가기
                    </Link>

                    {/* 복원 버튼 */}
                    <button
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                        onClick={handleRestore}
                        disabled={restoreMutation.isPending}
                    >
                        <ArrowUpCircle className="w-4 h-4" />
                        <span>{restoreMutation.isPending ? '복원 중...' : '테스트 대상 복원'}</span>
                    </button>
                </div>
            </div>

            {/* 테스트 대상 정보 컴포넌트 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="mb-4 inline-block px-2 py-1 bg-gray-100 rounded text-sm text-gray-500">
                    아카이브됨
                </div>
                <TestTargetInfoComponent testTarget={archivedTestTarget} isArchived={true} />
            </div>

            {/* 테스트 체크리스트 (편집 가능) */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">테스트 체크리스트 (아카이브)</h2>

                    {/* 상태별 요약 정보 */}
                    <div className="flex space-x-3 text-sm flex-1 justify-center">
                        <div className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                            미시작: <span className="font-medium">{statusCounts.notStarted}</span>
                        </div>
                        <div className="px-3 py-1 bg-blue-100 rounded-full border border-blue-200">
                            진행중: <span className="font-medium">{statusCounts.processing}</span>
                        </div>
                        <div className="px-3 py-1 bg-green-100 rounded-full border border-green-200">
                            완료: <span className="font-medium">{statusCounts.completed}</span>
                        </div>
                    </div>

                    {/* 새 테스트 추가 버튼 */}
                    {isCurrentUserAssignee && (
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                            onClick={() => setAddModalOpen(true)}
                        >
                            + 새 테스트 추가
                        </button>
                    )}
                </div>

                {sortedArchivedTestItems && sortedArchivedTestItems.length > 0 ? (
                    <div className="space-y-3">
                        {/* 테스트 항목 목록 */}
                        <ul className="space-y-3">
                            {sortedArchivedTestItems.map((item) => (
                                <TestItemComponent
                                    key={item.id}
                                    item={item}
                                    onToggleCompletion={handleToggleCompletion}
                                    onToggleProcessing={handleToggleProcessing}
                                    onUpdate={handleUpdateItem}
                                    onDelete={handleDeleteItem}
                                />
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-lg">
                        <p className="text-xl mb-2">아카이브된 테스트 항목이 없습니다.</p>
                        {isCurrentUserAssignee ? (
                            <button
                                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                                onClick={() => setAddModalOpen(true)}
                            >
                                테스트 항목 추가하기
                            </button>
                        ) : (
                            <p className="text-sm">담당자만 테스트 항목을 추가할 수 있습니다.</p>
                        )}
                    </div>
                )}
            </div>

            {/* 테스트 항목 추가 모달 */}
            <AddTestItemModal
                show={isAddModalOpen}
                targetId={testId}
                onClose={() => setAddModalOpen(false)}
                onAdd={handleAddItem}
                isPending={addTestItemMutation.isPending}
            />
        </div>
    );
};

export default ArchivedTestDetail;