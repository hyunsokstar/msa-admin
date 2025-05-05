// TestItemComponent.tsx
"use client";
import React, { useState } from 'react';
import { TestItem } from '@/types/typeForTestTarget';
import Image from 'next/image';
import { FileImage, Film, Plus, X, Maximize2, Download } from 'lucide-react';
import IDialogButtonForRefImageForTestItem from './IDialogButtonForRefImageForTestItem';
import IDialogButtonForRefVideoForTestItem from './IDialogButtonForRefVideoForTestItem';

interface TestItemComponentProps {
    item: TestItem;
    onToggleCompletion: (id: string, isCompleted: boolean) => void;
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
    onUpdate,
    onDelete
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editDescription, setEditDescription] = useState(item.description);
    const [editNotes, setEditNotes] = useState(item.notes || "");
    
    // 미디어 모달 상태
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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

    return (
        <li className="border p-4 rounded-lg bg-gray-50 mb-2">
            {isEditing ? (
                // 편집 모드 - 양식 형태로 표시
                <div className="space-y-2">
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
                // 표시 모드 - 가로 레이아웃으로 배치
                <div className="flex items-center">
                    {/* 왼쪽: 담당자 프로필 이미지 */}
                    <div className="flex-shrink-0 mr-4">
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
                        {item.assignee && (
                            <div className="text-xs text-center mt-1 text-gray-500 truncate w-10">
                                {item.assignee.full_name ? item.assignee.full_name.split(' ')[0] : '담당자'}
                            </div>
                        )}
                    </div>
                    
                    {/* 중앙: 항목 내용 */}
                    <div className="flex-grow">
                        <div 
                            className={`font-medium ${item.is_completed ? "line-through text-gray-500" : "text-gray-900"}`}
                        >
                            {item.description}
                        </div>
                        {item.notes && (
                            <div className="text-sm text-gray-500 mt-1">
                                {item.notes}
                            </div>
                        )}
                    </div>
                    
                    {/* 미디어 버튼: 빨간 박스 영역 */}
                    <div className="flex-shrink-0 mx-4 flex items-center space-x-2">
                        {/* 이미지 버튼 */}
                        <div className="relative group">
                            <IDialogButtonForRefImageForTestItem
                                testItemId={item.id}
                                targetId={item.target_id}
                                imageUrl={item.ref_image} 
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
                    
                    {/* 오른쪽: 액션 버튼들 */}
                    <div className="flex-shrink-0 flex items-center space-x-3">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={item.is_completed}
                                onChange={() => onToggleCompletion(item.id, !item.is_completed)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="ml-1 text-xs text-gray-500">완료</span>
                        </label>
                        
                        <button
                            className="text-indigo-600 hover:text-indigo-900 text-sm px-2 py-1 rounded hover:bg-indigo-50"
                            onClick={handleEdit}
                        >
                            수정
                        </button>
                        
                        <button
                            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
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