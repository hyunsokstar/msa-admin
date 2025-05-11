// C:\Users\terec\msa-admin\src\app\task-admin\test-targets-archive\[id]\component\ArchivedTestItemComponent.tsx
"use client";

import React, { useState } from 'react';
import { TestItem } from '@/types/typeForTestTarget';
import Image from 'next/image';
import {
    FileImage,
    Film,
    Plus,
    X,
    Maximize2,
    Download,
    Calendar,
    Clock,
    Edit,
    Trash,
    CheckCircle2,
    Lock,
    AlertCircle
} from 'lucide-react';
import IDialogButtonForRefImageForArchivedTestItem from './IDialogButtonForRefImageForArchivedTestItem';
import IDialogButtonForRefVideoForTestItem from './IDialogButtonForRefVideoForTestItem';
import CommonSwitch from '@/components/common/CommonSwitch';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useUserStore } from '@/store/useUserStore';
import ICollapsibleCommentsForArchivedTestItem from './ICollapsibleCommentsForArchivedTestItem';
import IDialogButtonForRefVideoForArchivedTestItem from './IDialogButtonForRefVideoForArchivedTestItem';

interface TestItemComponentProps {
    item: TestItem;
    onToggleCompletion: (id: string, isCompleted: boolean) => void;
    onToggleProcessing?: (id: string, isProcessing: boolean) => void;
    onUpdate: (
        id: string,
        updates: {
            description?: string;
            notes?: string | null;
            ref_image?: string | null;
            ref_video?: string | null;
        }
    ) => void;
    onDelete: (id: string) => void;
}

const ArchivedTestItemComponent: React.FC<TestItemComponentProps> = ({
    item,
    onToggleCompletion,
    onToggleProcessing,
    onUpdate,
    onDelete
}) => {
    // 사용자 인증 상태 가져오기
    const { isAuthenticated } = useUserStore();

    // 편집 모드 상태
    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState(item.description);
    const [editNotes, setEditNotes] = useState(item.notes || "");

    // 이미지/동영상 모달 상태
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // 날짜 포맷 함수
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm', { locale: ko });
        } catch {
            return dateString;
        }
    };

    // 편집 핸들러
    const handleEdit = () => {
        setIsEditing(true);
        setEditDescription(item.description);
        setEditNotes(item.notes || "");
    };
    const handleCancel = () => setIsEditing(false);
    const handleSave = () => {
        onUpdate(item.id, { description: editDescription, notes: editNotes });
        setIsEditing(false);
    };

    // 삭제 확인
    const handleDelete = () => {
        if (confirm("정말 삭제하시겠습니까?")) {
            onDelete(item.id);
        }
    };

    // 이미지 다운로드
    const downloadImage = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'test-image.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch {
            alert('이미지 다운로드에 실패했습니다');
        }
    };

    // 새 창에서 미디어 열기
    const openMediaInNewTab = (url: string) => {
        window.open(url, '_blank');
    };

    // 토글 핸들러
    const handleToggleCompletion = (checked: boolean) => {
        if (!isAuthenticated) {
            alert('로그인 후 이용 가능합니다.');
            return;
        }
        onToggleCompletion(item.id, checked);
    };
    const handleToggleProcessing = (checked: boolean) => {
        if (!isAuthenticated) {
            alert('로그인 후 이용 가능합니다.');
            return;
        }
        onToggleProcessing
            ? onToggleProcessing(item.id, checked)
            : console.log(`테스트 항목 ID: ${item.id}, 처리 중: ${checked}`);
    };

    // 경과시간 출력
    const getElapsedTimeText = (start: string, end: string) => {
        const s = new Date(start).getTime();
        const e = new Date(end).getTime();
        const diff = e - s;
        if (isNaN(diff) || diff < 0) return '';
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0
            ? `(경과: ${hours}시간 ${mins}분)`
            : `(경과: ${mins}분)`;
    };

    // 스타일 헬퍼
    const getBgColor = () =>
        item.is_completed
            ? 'bg-green-50 border-green-200'
            : item.is_processing
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200';

    const getContentBgColor = () =>
        item.is_completed
            ? 'bg-green-100/50'
            : item.is_processing
                ? 'bg-blue-100/50'
                : 'bg-white';

    const getTextColor = () =>
        item.is_completed
            ? 'text-green-700'
            : item.is_processing
                ? 'text-blue-700'
                : 'text-gray-900';

    const getHoverBgColor = () =>
        item.is_completed
            ? 'hover:bg-green-200'
            : item.is_processing
                ? 'hover:bg-blue-200'
                : 'hover:bg-gray-100';

    const getStatusIcon = () =>
        item.is_completed ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
        ) : item.is_processing ? (
            <AlertCircle className="h-4 w-4 text-blue-600" />
        ) : null;

    return (
        <li className={`border p-4 rounded-lg ${getBgColor()} mb-2 transition-colors duration-200 shadow-sm`}>
            {isEditing ? (
                // — 편집 모드 —
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        설명:
                        <input
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                        />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        메모:
                        <textarea
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            rows={3}
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                        />
                    </label>
                    <div className="flex justify-end space-x-2">
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
                // — 표시 모드 —
                <div className="flex flex-col space-y-3">
                    {/* 첫 번째 줄: 담당자, 미디어, 날짜, 상태 */}
                    <div className="flex justify-between items-center">
                        {/* 담당자 */}
                        <div className="flex items-center">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                                {item.assignee?.profile_image_url ? (
                                    <Image
                                        src={item.assignee.profile_image_url}
                                        alt={item.assignee.full_name || '담당자'}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400 text-xs">
                                        사용자
                                    </div>
                                )}
                            </div>
                            <div className="ml-2 text-sm font-medium text-gray-700">
                                {item.assignee?.full_name || '담당자 없음'}
                            </div>
                        </div>

                        {/* 미디어 버튼 */}
                        <div className="flex items-center space-x-2 mx-2">
                            <div className="relative group">
                                <IDialogButtonForRefImageForArchivedTestItem
                                    testItemId={item.id}
                                    targetId={item.target_id}
                                    imageUrl={item.ref_image}
                                    onImageUpdated={(url) => onUpdate(item.id, { ref_image: url })}
                                />
                                <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-1 z-10">
                                    {item.ref_image ? (
                                        <img
                                            src={item.ref_image}
                                            alt="이미지 미리보기"
                                            className="w-32 h-32 object-contain"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-100">
                                            <FileImage className="w-10 h-10 text-blue-300 mb-2" />
                                            <span className="text-xs text-gray-500">이미지 없음</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="relative group">
                                <IDialogButtonForRefVideoForArchivedTestItem
                                    testItemId={item.id}
                                    targetId={item.target_id}
                                    videoUrl={item.ref_video}
                                    onVideoUpdated={(url) => onUpdate(item.id, { ref_video: url })}
                                />
                                <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-1 z-10">
                                    <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-100">
                                        <Film
                                            className={`w-10 h-10 mb-2 ${item.ref_video ? 'text-red-500' : 'text-red-300'
                                                }`}
                                        />
                                        <span className="text-xs text-gray-500">
                                            {item.ref_video ? '동영상 미리보기' : '동영상 없음'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 날짜 & 경과 */}
                        <div className="
              text-xs text-gray-500 mx-2
              space-y-1
            ">
                            <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                생성: {formatDate(item.created_at)}
                            </div>
                            <div className="flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                완료: {formatDate(item.updated_at)}{' '}
                                {item.created_at &&
                                    item.updated_at &&
                                    getElapsedTimeText(item.created_at, item.updated_at)}
                            </div>
                        </div>

                        {/* 상태 스위치 */}
                        <div className="flex flex-col space-y-2">
                            <div className="relative flex items-center">
                                <span className="text-xs text-gray-500 mr-2">진행</span>
                                <div className="relative">
                                    {!isAuthenticated && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed"
                                            title="로그인 후 이용 가능합니다"
                                        >
                                            <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full"></div>
                                            <Lock className="h-3 w-3 text-gray-600" />
                                        </div>
                                    )}
                                    <CommonSwitch
                                        id={`processing-switch-${item.id}`}
                                        checked={item.is_processing || false}
                                        onCheckedChange={handleToggleProcessing}
                                    />
                                </div>
                            </div>
                            <div className="relative flex items-center">
                                <span className="text-xs text-gray-500 mr-2">완료</span>
                                <div className="relative">
                                    {!isAuthenticated && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed"
                                            title="로그인 후 이용 가능합니다"
                                        >
                                            <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full"></div>
                                            <Lock className="h-3 w-3 text-gray-600" />
                                        </div>
                                    )}
                                    <CommonSwitch
                                        id={`complete-switch-${item.id}`}
                                        checked={item.is_completed}
                                        onCheckedChange={handleToggleCompletion}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 설명 & 메모, 액션 버튼 */}
                    <div className={`flex items-start ${getContentBgColor()} rounded-lg`}>
                        <div className="flex-grow px-3 py-2">
                            <div className={`text-base font-medium ${getTextColor()}`}>
                                {item.description}
                            </div>
                            {item.notes && (
                                <div className="text-sm text-gray-600 mt-1 pl-1">{item.notes}</div>
                            )}
                        </div>
                        <div className={`flex items-center ml-2 px-1 py-2 ${getContentBgColor()} rounded-r-lg`}>
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-2">
                                    <button
                                        className={`p-2 text-indigo-600 hover:text-indigo-900 rounded-full ${getHoverBgColor()}`}
                                        onClick={handleEdit}
                                        title="수정"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        className={`p-2 text-red-600 hover:text-red-800 rounded-full ${getHoverBgColor()}`}
                                        onClick={handleDelete}
                                        title="삭제"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="p-2 text-gray-400" title="로그인 후 이용 가능합니다">
                                    <Lock size={16} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 이미지 모달 */}
            {isImageModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden max-w-3xl max-h-[90vh] w-full">
                        <div className="flex justify-between items-center p-3 border-b">
                            <h3 className="font-medium">
                                {item.ref_image ? '테스트 참조 이미지' : '이미지 추가'}
                            </h3>
                            <div className="flex space-x-2">
                                {item.ref_image && (
                                    <>
                                        <button
                                            className="p-1 hover:bg-gray-100 rounded"
                                            onClick={() => downloadImage(item.ref_image!)}
                                            title="이미지 다운로드"
                                        >
                                            <Download className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <button
                                            className="p-1 hover:bg-gray-100 rounded"
                                            onClick={() => openMediaInNewTab(item.ref_image!)}
                                            title="새 창에서 열기"
                                        >
                                            <Maximize2 className="h-5 w-5 text-gray-600" />
                                        </button>
                                    </>
                                )}
                                <button
                                    className="p-1 hover:bg-gray-100 rounded"
                                    onClick={() => setIsImageModalOpen(false)}
                                    title="닫기"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {item.ref_image ? (
                                <img
                                    src={item.ref_image}
                                    alt="테스트 참조 이미지"
                                    className="max-w-full max-h-[70vh] object-contain"
                                />
                            ) : (
                                <div className="text-center p-8">
                                    <FileImage className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">
                                        이미지를 추가하려면 파일을 업로드하세요
                                    </p>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        이미지 파일 선택
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        PNG, JPG, WEBP 형식의 이미지 (최대 10MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 동영상 모달 */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg overflow-hidden max-w-3xl max-h-[90vh] w-full">
                        <div className="flex justify-between items-center p-3 border-b">
                            <h3 className="font-medium">
                                {item.ref_video ? '테스트 참조 동영상' : '동영상 추가'}
                            </h3>
                            <div className="flex space-x-2">
                                {item.ref_video && (
                                    <button
                                        className="p-1 hover:bg-gray-100 rounded"
                                        onClick={() => openMediaInNewTab(item.ref_video!)}
                                        title="새 창에서 열기"
                                    >
                                        <Maximize2 className="h-5 w-5 text-gray-600" />
                                    </button>
                                )}
                                <button
                                    className="p-1 hover:bg-gray-100 rounded"
                                    onClick={() => setIsVideoModalOpen(false)}
                                    title="닫기"
                                >
                                    <X className="h-5 w-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-center bg-gray-50">
                            {item.ref_video ? (
                                <video
                                    src={item.ref_video}
                                    controls
                                    controlsList="nodownload"
                                    className="max-w-full max-h-[70vh]"
                                />
                            ) : (
                                <div className="text-center p-8">
                                    <Film className="w-16 h-16 text-red-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">
                                        동영상을 추가하려면 파일을 업로드하세요
                                    </p>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                        동영상 파일 선택
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        MP4, WEBM 형식의 동영상 (최대 100MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 댓글 영역 (항목 외부 하단) */}
            <div className="mt-4 w-full flex justify-end">
                <ICollapsibleCommentsForArchivedTestItem testItemId={item.id} />
            </div>
        </li>
    );
};

export default ArchivedTestItemComponent;