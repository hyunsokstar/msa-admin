"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import {
    useGetTestItems,
    useGetTestTarget,
    useToggleTestItemCompletion,
    useUpdateTestItem,
    useDeleteTestItem
} from "@/hook/useApiForTestTarget";
import { TestItem, TestTarget } from "@/types/typeForTestTarget";

// Props 타입 정의
interface TestDetailProps {
    params: Promise<{ id: string }>;
}

// 그룹화된 테스트 항목 타입 정의
interface TestCategory {
    id: string;
    name: string;
    items: TestItem[];
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

    // 테스트 항목 업데이트 훅
    const updateTestItemMutation = useUpdateTestItem(testId);

    // 테스트 항목 완료 상태 토글 훅
    const toggleCompletionMutation = useToggleTestItemCompletion(testId);

    // 테스트 항목 삭제 훅
    const deleteTestItemMutation = useDeleteTestItem(testId);

    // 카테고리별로 그룹화된 테스트 항목
    const [testCategories, setTestCategories] = useState<TestCategory[]>([]);

    // "수정" 버튼 클릭 시 활성화되는 편집 상태를 저장
    const [editItemId, setEditItemId] = useState<string | null>(null);
    const [editDescription, setEditDescription] = useState("");
    const [editNotes, setEditNotes] = useState("");

    // 테스트 항목 데이터가 로드되면 카테고리별로 그룹화
    useEffect(() => {
        if (testItems) {
            const categoriesMap = new Map<string, TestItem[]>();

            testItems.forEach((item) => {
                if (!categoriesMap.has(item.category)) {
                    categoriesMap.set(item.category, []);
                }
                categoriesMap.get(item.category)?.push(item);
            });

            const categoriesArray: TestCategory[] = Array.from(categoriesMap).map(
                ([name, items]) => ({
                    id: `cat-${name.replace(/\s+/g, "-").toLowerCase()}`,
                    name,
                    items,
                })
            );

            setTestCategories(categoriesArray);
        }
    }, [testItems]);

    // 아이템 삭제
    const handleDeleteItem = (itemId: string) => {
        if (confirm("정말 삭제하시겠습니까?")) {
            deleteTestItemMutation.mutate(itemId);
        }
    };

    // 아이템 수정 모드 진입
    const handleEditItem = (item: TestItem) => {
        setEditItemId(item.id);
        setEditDescription(item.description);
        setEditNotes(item.notes || "");
    };

    // 아이템 수정 취소
    const handleCancelEdit = () => {
        setEditItemId(null);
        setEditDescription("");
        setEditNotes("");
    };

    // 아이템 수정 저장
    const handleSaveEdit = (itemId: string) => {
        updateTestItemMutation.mutate({
            id: itemId,
            updates: {
                description: editDescription,
                notes: editNotes,
            },
        });
        setEditItemId(null);
        setEditDescription("");
        setEditNotes("");
    };

    // 로딩 및 에러 처리
    if (isLoadingTarget || isLoadingItems) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                로딩 중...
            </div>
        );
    }

    if (targetError || itemsError) {
        return (
            <div className="container mx-auto px-4 py-8 text-red-500">
                데이터를 불러오는 중 오류가 발생했습니다.
            </div>
        );
    }

    if (!testTarget) {
        return (
            <div className="container mx-auto px-4 py-8">
                존재하지 않는 테스트 대상입니다.
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/task-admin/test-docu" className="text-indigo-600 hover:text-indigo-900 flex items-center">
                &lt; 테스트 목록으로 돌아가기
            </Link>

            {/* 테스트 대상 정보 */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                <h1 className="text-2xl font-bold mb-2">{testTarget.name}</h1>
                <p className="text-gray-600 mb-4">{testTarget.description}</p>
            </div>

            {/* 테스트 체크리스트 */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                <h2 className="text-xl font-bold mb-6">테스트 체크리스트</h2>
                {testCategories.map((category) => (
                    <div
                        key={category.id}
                        className="border-b pb-6 last:border-b-0 last:pb-0"
                    >
                        <h3 className="text-lg font-semibold mb-4">
                            {category.name}
                        </h3>

                        <ul className="space-y-4">
                            {category.items.map((item) => {
                                const isEditing = editItemId === item.id;

                                return (
                                    <li
                                        key={item.id}
                                        className="border p-4 rounded-lg bg-gray-50"
                                    >
                                        {/* 내용 영역 */}
                                        {isEditing ? (
                                            <div className="flex flex-col space-y-2">
                                                <label className="text-sm font-medium text-gray-700">
                                                    설명:
                                                    <input
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                                        value={editDescription}
                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                    />
                                                </label>

                                                <label className="text-sm font-medium text-gray-700">
                                                    메모:
                                                    <textarea
                                                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                                        rows={3}
                                                        value={editNotes}
                                                        onChange={(e) => setEditNotes(e.target.value)}
                                                    />
                                                </label>

                                                <div className="mt-2 flex space-x-2">
                                                    <button
                                                        className="px-3 py-1 text-xs text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                                        onClick={() => handleSaveEdit(item.id)}
                                                    >
                                                        저장
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        취소
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col space-y-2">
                                                <span
                                                    className={
                                                        item.is_completed
                                                            ? "line-through text-gray-500"
                                                            : "text-gray-900"
                                                    }
                                                >
                                                    {item.description}
                                                </span>
                                                {item.notes && (
                                                    <span className="text-sm text-gray-500">
                                                        메모: {item.notes}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* 액션 영역 */}
                                        <div className="mt-3 flex items-center space-x-3">
                                            {/* 완료 체크박스 */}
                                            <input
                                                type="checkbox"
                                                checked={item.is_completed}
                                                onChange={() =>
                                                    toggleCompletionMutation.mutate({
                                                        id: item.id,
                                                        isCompleted: !item.is_completed,
                                                    })
                                                }
                                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />

                                            {/* 수정 버튼 */}
                                            {!isEditing && (
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                                                    onClick={() => handleEditItem(item)}
                                                >
                                                    수정
                                                </button>
                                            )}

                                            {/* 삭제 버튼 */}
                                            <button
                                                className="text-red-600 hover:text-red-800 text-sm"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestDetail;
