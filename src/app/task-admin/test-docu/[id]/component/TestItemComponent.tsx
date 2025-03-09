// 1. TestItemComponent.tsx - 개별 테스트 항목을 표시하고 관리하는 컴포넌트
"use client";
import React, { useState } from 'react';
import { TestItem } from '@/types/typeForTestTarget';

interface TestItemComponentProps {
    item: TestItem;
    onToggleCompletion: (id: string, isCompleted: boolean) => void;
    onUpdate: (id: string, updates: { description?: string; notes?: string | null }) => void;
    onDelete: (id: string) => void;
}

const TestItemComponent: React.FC<TestItemComponentProps> = ({
    item,
    onToggleCompletion,
    onUpdate,
    onDelete
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState(item.description);
    const [editNotes, setEditNotes] = useState(item.notes || "");

    // 수정 시작
    const handleEdit = () => {
        setIsEditing(true);
        setEditDescription(item.description);
        setEditNotes(item.notes || "");
    };

    // 변경 취소
    const handleCancel = () => {
        setIsEditing(false);
    };

    // 변경 저장
    const handleSave = () => {
        onUpdate(item.id, {
            description: editDescription,
            notes: editNotes,
        });
        setIsEditing(false);
    };

    // 삭제 확인
    const handleDelete = () => {
        if (confirm("정말 삭제하시겠습니까?")) {
            onDelete(item.id);
        }
    };

    return (
        <li className="border p-4 rounded-lg bg-gray-50">
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
                            onClick={handleSave}
                        >
                            저장
                        </button>
                        <button
                            className="px-3 py-1 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                            onClick={handleCancel}
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
                    {item.notes ? (
                        <span className="text-sm text-gray-500">
                            메모: {item.notes}
                        </span>
                    ) : (
                        <span className="text-sm text-gray-400 italic">
                            메모 없음
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
                    onChange={() => onToggleCompletion(item.id, !item.is_completed)}
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />

                {/* 수정 버튼 */}
                {!isEditing && (
                    <button
                        className="text-indigo-600 hover:text-indigo-900 text-sm"
                        onClick={handleEdit}
                    >
                        수정
                    </button>
                )}

                {/* 삭제 버튼 */}
                <button
                    className="text-red-600 hover:text-red-800 text-sm"
                    onClick={handleDelete}
                >
                    삭제
                </button>
            </div>
        </li>
    );
};

export default TestItemComponent;