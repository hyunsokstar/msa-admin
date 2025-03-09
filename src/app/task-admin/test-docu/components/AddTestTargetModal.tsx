"use client";
import React from 'react';
import { TestTarget } from '@/types/typeForTestTarget';
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';

interface AddTestTargetModalProps {
    show: boolean;
    newTestTarget: Partial<TestTarget>;
    user: any; // 실제 타입으로 변경
    assignees: { id: string; name: string }[];
    isPending: boolean;
    onClose: () => void;
    onChange: (field: string, value: any) => void;
    onSave: () => void;
}

const AddTestTargetModal: React.FC<AddTestTargetModalProps> = ({
    show,
    newTestTarget,
    user,
    assignees,
    isPending,
    onClose,
    onChange,
    onSave
}) => {
    if (!show) return null;

    // 이미지 업로드 완료 핸들러
    const handleImageUpload = (fileUrl: string) => {
        onChange('target_image_url', fileUrl);
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">새 테스트 대상 추가</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {/* 테스트 대상 이름 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">테스트 대상 이름 *</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="테스트 대상 이름을 입력하세요"
                                value={newTestTarget.name || ''}
                                onChange={(e) => onChange('name', e.target.value)}
                            />
                        </div>

                        {/* 담당자 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                            <select
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={newTestTarget.assignee_id || ''}
                                onChange={(e) => onChange('assignee_id', e.target.value)}
                            >
                                {/* 기본적으로 현재 사용자가 선택됨 */}
                                {user && (
                                    <option value={user.id}>{user.full_name || user.email} (나)</option>
                                )}
                                {assignees.filter(a => !user || a.id !== user.id).map(assignee => (
                                    <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                                ))}
                                {!user && <option value="">담당자 선택</option>}
                            </select>
                        </div>

                        {/* 테스트 대상 이미지 업로더 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지</label>
                            <ImageUploader2
                                onUploadComplete={handleImageUpload}
                                maxWidth="max-w-full"
                                initialImage={newTestTarget.target_image_url || undefined}
                            />
                            <p className="mt-1 text-xs text-gray-500">테스트 대상의 대표 이미지를 업로드하세요 (선택사항)</p>
                        </div>

                        {/* 설명 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                rows={3}
                                placeholder="테스트 대상에 대한 설명을 입력하세요"
                                value={newTestTarget.description || ''}
                                onChange={(e) => onChange('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            취소
                        </button>
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                            onClick={onSave}
                            disabled={isPending}
                        >
                            {isPending ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTestTargetModal;