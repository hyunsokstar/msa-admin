"use client";
import React, { useEffect, useState } from 'react';
import { TestTarget } from '@/types/typeForTestTarget';
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';
import { X } from 'lucide-react';
import { useUpdateTestTarget } from '@/hook/useUpdateTestTarget';

interface EditTestTargetModalProps {
    show: boolean;
    targetToEdit: TestTarget | null;
    user: any; // 실제 타입으로 변경
    assignees: { id: string; name: string }[];
    onClose: () => void;
}

const EditTestTargetModal: React.FC<EditTestTargetModalProps> = ({
    show,
    targetToEdit,
    user,
    assignees,
    onClose
}) => {
    const [editedTarget, setEditedTarget] = useState<Partial<TestTarget>>({});
    const updateTestTargetMutation = useUpdateTestTarget();

    // 모달이 열릴 때 현재 테스트 대상 정보로 상태 초기화
    useEffect(() => {
        if (show && targetToEdit) {
            setEditedTarget({
                name: targetToEdit.name,
                description: targetToEdit.description,
                assignee_id: targetToEdit.assignee_id,
                target_image_url: targetToEdit.target_image_url
            });
        }
    }, [show, targetToEdit]);

    if (!show || !targetToEdit) return null;

    // 필드 변경 핸들러
    const handleChange = (field: string, value: any) => {
        setEditedTarget({ ...editedTarget, [field]: value });
    };

    // 이미지 업로드 완료 핸들러
    const handleImageUpload = (fileUrl: string) => {
        handleChange('target_image_url', fileUrl);
    };

    // 수정 저장 핸들러
    const handleSave = () => {
        // 필수 필드 검증
        if (!editedTarget.name) {
            alert('테스트 대상 이름은 필수 항목입니다.');
            return;
        }

        // 변경된 내용만 추출
        const updates: any = {};
        if (editedTarget.name !== targetToEdit.name) updates.name = editedTarget.name;
        if (editedTarget.description !== targetToEdit.description) updates.description = editedTarget.description;
        if (editedTarget.assignee_id !== targetToEdit.assignee_id) updates.assignee_id = editedTarget.assignee_id;
        if (editedTarget.target_image_url !== targetToEdit.target_image_url) updates.target_image_url = editedTarget.target_image_url;

        // 변경 사항이 있는 경우에만 업데이트 요청
        if (Object.keys(updates).length > 0) {
            updateTestTargetMutation.mutate(
                { id: targetToEdit.id, updates },
                {
                    onSuccess: () => {
                        onClose();
                    }
                }
            );
        } else {
            // 변경 사항 없이 닫기
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">테스트 대상 수정</h3>
                    <button
                        className="text-gray-400 hover:text-gray-500"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </button>
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
                                value={editedTarget.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />
                        </div>

                        {/* 담당자 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                            <select
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={editedTarget.assignee_id || ''}
                                onChange={(e) => handleChange('assignee_id', e.target.value)}
                            >
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
                                initialImage={editedTarget.target_image_url || undefined}
                                isUpdate={true}
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
                                value={editedTarget.description || ''}
                                onChange={(e) => handleChange('description', e.target.value)}
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
                            onClick={handleSave}
                            disabled={updateTestTargetMutation.isPending}
                        >
                            {updateTestTargetMutation.isPending ? '저장 중...' : '저장'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTestTargetModal;