"use client";
import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import {
    useGetTestItems,
    useGetTestTarget,
    useToggleTestItemCompletion,
    useUpdateTestItem,
    useDeleteTestItem,
    useAddTestItem,
    useToggleTestItemProcessing
} from "@/hook/useApiForTestTarget";
import { TestItem, CreateTestItemParams } from "@/types/typeForTestTarget";
import TestTargetInfoComponent from "./component/TestTargetInfoComponent";
import TestItemComponent from "./component/TestItemComponent";
import AddTestItemModal from "./component/AddTestItemModal";

// Props 타입 정의
interface TestDetailProps {
    params: Promise<{ id: string }>;
}

const TestDetail = ({ params }: TestDetailProps) => {
    // Next.js 15+에서 params가 Promise이므로, React.use()로 언래핑
    const { id: testId } = use(params);

    // 현재 로그인한 사용자 정보 가져오기
    const { user, isAuthenticated } = useUserStore();

    // 테스트 대상 정보 가져오기
    const {
        data: testTarget,
        isLoading: isLoadingTarget,
        error: targetError,
    } = useGetTestTarget(testId);

    // 테스트 항목 목록 가져오기
    const {
        data: testItems,
        isLoading: isLoadingItems,
        error: itemsError,
    } = useGetTestItems(testId);

    // 테스트 항목 추가 훅
    const addTestItemMutation = useAddTestItem();

    // 테스트 항목 업데이트 훅
    const updateTestItemMutation = useUpdateTestItem(testId);

    // 테스트 항목 완료 상태 토글 훅
    const toggleCompletionMutation = useToggleTestItemCompletion(testId);
    const toggleProcessingMutation = useToggleTestItemProcessing(testId);


    // 테스트 항목 삭제 훅
    const deleteTestItemMutation = useDeleteTestItem(testId);

    // 항목 추가 모달 상태
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    // 테스트 항목 추가 핸들러
    const handleAddItem = (newItem: CreateTestItemParams) => {

        const itemWithAssignee = {
            ...newItem,
            assignee_id: user?.id || undefined, // 현재 사용자 ID를 assignee_id로 설정
            is_completed: false, // 기본값으로 false 설정
        };

        addTestItemMutation.mutate(itemWithAssignee, {
            onSuccess: () => {
                setAddModalOpen(false);
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
        });
    };

    // 테스트 항목 토글 핸들러
    const handleToggleCompletion = (id: string, isCompleted: boolean) => {
        toggleCompletionMutation.mutate({
            id,
            isCompleted
        });
    };

    const handleToggleProcessing = (id: string, isProcessing: boolean) => {
        console.log(`테스트 항목 ID: ${id}, 처리 중 상태: ${isProcessing}`);
        toggleProcessingMutation.mutate({
            id,
            isProcessing
        });
    };

    // 테스트 항목 삭제 핸들러
    const handleDeleteItem = (id: string) => {
        deleteTestItemMutation.mutate(id);
    };

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
                    <p className="text-sm mt-1">{targetError?.message || itemsError?.message || '알 수 없는 오류'}</p>
                </div>
            </div>
        );
    }

    if (!testTarget) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="font-medium">존재하지 않는 테스트 대상입니다.</p>
                    <p className="text-sm mt-2">
                        <Link href="/task-admin/test-docu" className="text-indigo-600 hover:text-indigo-900">
                            테스트 목록으로 돌아가기
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    // 현재 사용자가 담당자인지 확인
    const isCurrentUserAssignee = user && testTarget.assignee_id === user.id;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 뒤로 가기 링크 */}
            <Link href="/task-admin/test-docu" className="text-indigo-600 hover:text-indigo-900 flex items-center">
                &lt; 테스트 목록으로 돌아가기
            </Link>

            {/* 테스트 대상 정보 컴포넌트 */}
            <TestTargetInfoComponent testTarget={testTarget} />

            {/* 테스트 체크리스트 */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">테스트 체크리스트</h2>
                    {isCurrentUserAssignee && (
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                            onClick={() => setAddModalOpen(true)}
                        >
                            + 테스트 항목 추가
                        </button>
                    )}
                </div>

                {testItems && testItems.length > 0 ? (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium">테스트 항목</h3>
                            <div className="text-sm text-gray-500">
                                {testItems.filter(item => item.is_completed).length}/{testItems.length} 완료
                            </div>
                        </div>
                        <ul className="space-y-2">
                            {testItems.map((item) => (
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
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl mb-2">아직 테스트 항목이 없습니다.</p>
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

export default TestDetail;