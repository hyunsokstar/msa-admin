// TestItemComponent.tsx
"use client";
import React, { useState } from 'react';
import { TestItem } from '@/types/typeForTestTarget';
import Image from 'next/image';
import { FileImage, Film, Plus, X, Maximize2, Download, Calendar, Clock, Edit, Trash, CheckCircle2, Lock } from 'lucide-react';
import IDialogButtonForRefImageForTestItem from './IDialogButtonForRefImageForTestItem';
import IDialogButtonForRefVideoForTestItem from './IDialogButtonForRefVideoForTestItem';
import CommonSwitch from '@/components/common/CommonSwitch';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useUserStore } from '@/store/useUserStore';

interface TestItemComponentProps {
    item: TestItem;
    onToggleCompletion: (id: string, isCompleted: boolean) => void;
    onToggleProcessing?: (id: string, isProcessing: boolean) => void;
    onUpdate: (id: string, updates: {
        description?: string;
        notes?: string | null;
        ref_image?: string | null;
        ref_video?: string | null;
    }) => void;
    onDelete: (id: string) => void;
}

const TestItemComponent: React.FC<TestItemComponentProps> = ({
    item,
    onToggleCompletion,
    onToggleProcessing,
    onUpdate,
    onDelete
}) => {
    // 사용자 인증 상태 가져오기
    const { isAuthenticated } = useUserStore();

    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState(item.description);
    const [editNotes, setEditNotes] = useState(item.notes || "");

    // 미디어 모달 상태
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    // 날짜 포맷 함수
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        try {
            return format(new Date(dateString), 'yyyy-MM-dd HH:mm', { locale: ko });
        } catch (error) {
            return dateString;
        }
    };

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

    // 이미지 모달 열기
    const openImageModal = () => {
        setIsImageModalOpen(true);
    };

    // 동영상 모달 열기
    const openVideoModal = () => {
        setIsVideoModalOpen(true);
    };

    // 새 창에서 미디어 열기
    const openMediaInNewTab = (url: string) => {
        window.open(url, '_blank');
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
        } catch (error) {
            console.error('다운로드 오류:', error);
            alert('이미지 다운로드에 실패했습니다');
        }
    };

    // 이미지 업로드 처리
    const handleImageUpload = (imageUrl: string) => {
        onUpdate(item.id, {
            ref_image: imageUrl
        });
        setIsImageModalOpen(false);
    };

    // 동영상 업로드 처리
    const handleVideoUpload = (videoUrl: string) => {
        onUpdate(item.id, {
            ref_video: videoUrl
        });
        setIsVideoModalOpen(false);
    };

    // 완료 상태 토글 핸들러 (인증된 사용자만 가능)
    const handleToggleCompletion = (checked: boolean) => {
        if (isAuthenticated) {
            onToggleCompletion(item.id, checked);
        } else {
            // 인증되지 않은 경우 알림 표시 (선택 사항)
            alert('로그인 후 이용 가능합니다.');
        }
    };


    const handleToggleProcessing = (checked: boolean) => {
        if (isAuthenticated) {
            // 부모 컴포넌트로부터 전달받은 onToggleProcessing 함수 호출
            if (onToggleProcessing) {
                onToggleProcessing(item.id, checked);
            } else {
                // onToggleProcessing이 없는 경우 콘솔 로그만 출력
                console.log(`테스트 항목 ID: ${item.id}, 처리 중 상태: ${checked}`);
            }
        } else {
            // 인증되지 않은 경우 알림 표시
            alert('로그인 후 이용 가능합니다.');
        }
    };

    // 항목의 배경색 결정
    // 항목의 배경색 결정 - 처리 중 상태 추가
    const getBgColor = () => {
        if (item.is_completed) return 'bg-green-50 border-green-200';
        if (item.is_processing) return 'bg-blue-50 border-blue-200';
        return 'bg-gray-50';
    };

    const getContentBgColor = () => {
        if (item.is_completed) return 'bg-green-100/50';
        if (item.is_processing) return 'bg-blue-100/50';
        return 'bg-white';
    };

    const getTextColor = () => {
        if (item.is_completed) return 'text-green-700';
        if (item.is_processing) return 'text-blue-700';
        return 'text-gray-900';
    };

    const getHoverBgColor = () => {
        if (item.is_completed) return 'hover:bg-green-200';
        if (item.is_processing) return 'hover:bg-blue-200';
        return 'hover:bg-gray-100';
    };

    const bgColor = getBgColor();
    const contentBgColor = getContentBgColor();
    const textColor = getTextColor();
    const hoverBgColor = getHoverBgColor();

    return (
        <li className={`border p-4 rounded-lg ${bgColor} mb-2 transition-colors duration-200`}>
            {isEditing ? (
                // 편집 모드 - 양식 형태로 표시
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
                // 표시 모드 - 레이아웃 재구성 (2행으로 압축)
                <div className="flex flex-col space-y-3">
                    {/* 첫 번째 행: 담당자, 미디어 버튼, 날짜 정보, 완료 상태 */}
                    <div className="flex justify-between items-center">
                        {/* 왼쪽: 담당자 정보 */}
                        <div className="flex items-center">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
                                {item.assignee && item.assignee.profile_image_url ? (
                                    <Image
                                        src={item.assignee.profile_image_url}
                                        alt={item.assignee.full_name || "담당자"}
                                        fill
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-400 text-xs">
                                        사용자
                                    </div>
                                )}
                            </div>
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-700">
                                    {item.assignee?.full_name || '담당자 없음'}
                                </div>
                            </div>
                        </div>

                        {/* 미디어 버튼 */}
                        <div className="flex items-center space-x-2 mx-2">
                            {/* 이미지 버튼 */}
                            <div className="relative group">
                                <IDialogButtonForRefImageForTestItem
                                    testItemId={item.id}
                                    targetId={item.target_id}
                                    imageUrl={item.ref_image}
                                    onImageUpdated={(url) => onUpdate(item.id, { ref_image: url })}
                                />

                                {/* 호버 시 나타나는 이미지 미리보기 */}
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

                            {/* 동영상 버튼 */}
                            <div className="relative group">
                                <IDialogButtonForRefVideoForTestItem
                                    videoUrl={item.ref_video}
                                    testItemId={item.id}
                                    targetId={item.target_id}
                                    onVideoUpdated={(url) => onUpdate(item.id, { ref_video: url })}
                                />

                                {/* 호버 시 나타나는 동영상 미리보기 (썸네일 대신 아이콘 표시) */}
                                <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border p-1 z-10">
                                    <div className="w-32 h-32 flex flex-col items-center justify-center bg-gray-100">
                                        <Film className={`w-10 h-10 ${item.ref_video ? 'text-red-500' : 'text-red-300'} mb-2`} />
                                        <span className="text-xs text-gray-500">
                                            {item.ref_video ? "동영상 미리보기" : "동영상 없음"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 날짜 정보 (2줄로 압축) */}
                        <div className="text-xs text-gray-500 mx-2">
                            <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>생성: {formatDate(item.created_at)}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>수정: {formatDate(item.updated_at)}</span>
                            </div>
                        </div>

                        {/* 완료 스위치와 해결자 영역 */}
                        <div className="flex items-center space-x-2">
                            {/* 해결자 정보 (완료 상태일 때만 표시) */}
                            {item.is_completed && item.issue_solver && (
                                <div className="flex items-center">
                                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-200 border border-green-300">
                                        {item.issue_solver.profile_image_url ? (
                                            <Image
                                                src={item.issue_solver.profile_image_url}
                                                alt={item.issue_solver.full_name || "해결자"}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full w-full bg-green-100 text-green-600 text-xs">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* 완료 상태 전환 스위치 */}
                            {/* <div className="relative">
                                {!isAuthenticated && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed" title="로그인 후 이용 가능합니다">
                                        <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full"></div>
                                        <Lock className="h-3 w-3 text-gray-600" />
                                    </div>
                                )}
                                <CommonSwitch
                                    id={`complete-switch-${item.id}`}
                                    checked={item.is_completed}
                                    onCheckedChange={isAuthenticated ? handleToggleCompletion : () => {}}
                                />
                            </div> */}

                            {/* 스위치 버튼 영역 - 수직으로 배치 */}
                            <div className="flex flex-col space-y-2">
                                {/* 처리 중 상태 전환 스위치 */}
                                <div className="relative flex items-center">
                                    <span className="text-xs text-gray-500 mr-2">진행</span>
                                    <div className="relative">
                                        {!isAuthenticated && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed" title="로그인 후 이용 가능합니다">
                                                <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full"></div>
                                                <Lock className="h-3 w-3 text-gray-600" />
                                            </div>
                                        )}
                                        <CommonSwitch
                                            id={`processing-switch-${item.id}`}
                                            checked={item.is_processing || false}
                                            onCheckedChange={isAuthenticated ? handleToggleProcessing : () => { }}
                                        />
                                    </div>
                                </div>

                                {/* 완료 상태 전환 스위치 */}
                                <div className="relative flex items-center">
                                    <span className="text-xs text-gray-500 mr-2">완료</span>
                                    <div className="relative">
                                        {!isAuthenticated && (
                                            <div className="absolute inset-0 flex items-center justify-center z-10 cursor-not-allowed" title="로그인 후 이용 가능합니다">
                                                <div className="absolute inset-0 bg-gray-200 opacity-40 rounded-full"></div>
                                                <Lock className="h-3 w-3 text-gray-600" />
                                            </div>
                                        )}
                                        <CommonSwitch
                                            id={`complete-switch-${item.id}`}
                                            checked={item.is_completed}
                                            onCheckedChange={isAuthenticated ? handleToggleCompletion : () => { }}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 두 번째 행: 설명 및 메모, 액션 버튼 */}
                    <div className={`flex items-start ${contentBgColor} rounded-lg`}>
                        {/* 왼쪽: 설명 및 메모 */}
                        <div className="flex-grow px-3 py-2">
                            <div className={`text-base font-medium ${textColor}`}>
                                {item.description}
                            </div>
                            {item.notes && (
                                <div className="text-sm text-gray-600 mt-1 pl-1">
                                    {item.notes}
                                </div>
                            )}
                        </div>

                        {/* 오른쪽: 아이콘 액션 버튼들 */}
                        <div className={`flex items-center ml-2 px-1 py-2 ${contentBgColor} rounded-r-lg`}>
                            {isAuthenticated ? (
                                <>
                                    <button
                                        className={`p-2 text-indigo-600 hover:text-indigo-900 rounded-full ${hoverBgColor}`}
                                        onClick={handleEdit}
                                        title="수정"
                                    >
                                        <Edit size={16} />
                                    </button>

                                    <button
                                        className={`p-2 text-red-600 hover:text-red-800 rounded-full ${hoverBgColor} ml-1`}
                                        onClick={handleDelete}
                                        title="삭제"
                                    >
                                        <Trash size={16} />
                                    </button>
                                </>
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
                                {item.ref_image ? "테스트 참조 이미지" : "이미지 추가"}
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
                                // 이미지가 있으면 보여줌
                                <img
                                    src={item.ref_image}
                                    alt="테스트 참조 이미지"
                                    className="max-w-full max-h-[70vh] object-contain"
                                />
                            ) : (
                                // 이미지가 없으면 업로드 UI (예시, 실제 구현 필요)
                                <div className="text-center p-8">
                                    <FileImage className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">이미지를 추가하려면 파일을 업로드하세요</p>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                        이미지 파일 선택
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, WEBP 형식의 이미지 (최대 10MB)</p>
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
                                {item.ref_video ? "테스트 참조 동영상" : "동영상 추가"}
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
                                // 동영상이 있으면 보여줌
                                <video
                                    src={item.ref_video}
                                    controls
                                    controlsList="nodownload"
                                    className="max-w-full max-h-[70vh]"
                                />
                            ) : (
                                // 동영상이 없으면 업로드 UI (예시, 실제 구현 필요)
                                <div className="text-center p-8">
                                    <Film className="w-16 h-16 text-red-300 mx-auto mb-4" />
                                    <p className="text-gray-600 mb-4">동영상을 추가하려면 파일을 업로드하세요</p>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                        동영상 파일 선택
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">MP4, WEBM 형식의 동영상 (최대 100MB)</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TestItemComponent;