// src/app/task-admin/test-docu/[id]/components/AddTestItemModal.tsx
"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CreateTestItemParams } from '@/types/typeForTestTarget';

interface AddTestItemModalProps {
    show: boolean;
    targetId: string;
    onClose: () => void;
    onAdd: (newItem: CreateTestItemParams) => void;
    isPending: boolean;
}

const AddTestItemModal: React.FC<AddTestItemModalProps> = ({
    show,
    targetId,
    onClose,
    onAdd,
    isPending
}) => {
    // 입력 상태 관리
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    if (!show) return null;

    // 폼 제출 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 유효성 검사
        if (!description) {
            alert('설명은 필수 입력 항목입니다.');
            return;
        }

        // 새 항목 생성 요청
        onAdd({
            target_id: targetId,
            description,
            notes: notes || undefined,
            is_completed: false,
        });

        // 입력값 초기화
        resetForm();
    };

    // 폼 초기화
    const resetForm = () => {
        setDescription('');
        setNotes('');
    };

    // 모달 닫기
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">테스트 항목 추가</h3>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        {/* 설명 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">설명 *</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="테스트 항목 설명을 입력하세요"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* 메모 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">메모 (선택사항)</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                rows={3}
                                placeholder="추가 메모를 입력하세요"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                            onClick={handleClose}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                            disabled={isPending}
                        >
                            {isPending ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTestItemModal;