"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TestTarget } from '@/types/typeForTestTarget';
import { X, Edit, Trash2, ExternalLink } from 'lucide-react';
import EditTestTargetModal from './EditTestTargetModal';

interface TestTargetListProps {
    testTargets: TestTarget[];
    user: any; // 실제 타입으로 변경
    assignees: { id: string; name: string }[];
    getAssigneeName: (assigneeId: string | null) => string;
    getProgressColor: (percentage: number) => string;
    onDelete: (id: string) => void;
}

const TestTargetList: React.FC<TestTargetListProps> = ({
    testTargets,
    user,
    assignees,
    getAssigneeName,
    getProgressColor,
    onDelete
}) => {
    // 이미지 다이얼로그 상태 관리
    const [isImageDialogOpen, setImageDialogOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ url: string, name: string } | null>(null);

    // 수정 모달 상태 관리
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [targetToEdit, setTargetToEdit] = useState<TestTarget | null>(null);

    // 이미지 클릭 핸들러
    const handleImageClick = (imageUrl: string, targetName: string) => {
        setSelectedImage({ url: imageUrl, name: targetName });
        setImageDialogOpen(true);
    };

    // 다이얼로그 닫기 핸들러
    const closeImageDialog = () => {
        setImageDialogOpen(false);
    };

    // 수정 버튼 클릭 핸들러
    const handleEditClick = (target: TestTarget) => {
        setTargetToEdit(target);
        setEditModalOpen(true);
    };

    // 수정 모달 닫기 핸들러
    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setTargetToEdit(null);
    };

    // ESC 키 이벤트 리스너 추가
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isImageDialogOpen) {
                closeImageDialog();
            }
        };

        // 이벤트 리스너 등록
        if (isImageDialogOpen) {
            window.addEventListener('keydown', handleEscKey);
        }

        // 컴포넌트 언마운트시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [isImageDialogOpen]);

    return (
        <>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {/* 이미지 열 */}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                이미지
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                테스트 대상
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                설명
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                담당자
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                등록일
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                진행률
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                액션
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testTargets.length > 0 ? (
                            testTargets.map((target) => (
                                <tr key={target.id}>
                                    {/* 이미지 열 - 크기 증가 */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            className="h-16 w-16 relative cursor-pointer transform hover:scale-105 transition-transform"
                                            onClick={() => target.target_image_url ? handleImageClick(target.target_image_url, target.name) : null}
                                        >
                                            {target.target_image_url ? (
                                                <Image
                                                    src={target.target_image_url}
                                                    alt={target.name}
                                                    width={64}
                                                    height={64}
                                                    className="rounded-md object-cover w-16 h-16"
                                                />
                                            ) : (
                                                <div className="h-16 w-16 rounded-md bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500 text-xl font-medium">{target.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {/* 테스트 주제를 클릭하면 상세 페이지로 이동 */}
                                        <div className="flex items-center">
                                            <Link
                                                href={`/task-admin/test-docu/${target.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer mr-2"
                                            >
                                                {target.name}
                                            </Link>

                                            {/* 아이템 개수 표시 */}
                                            {target.item_count !== undefined && (
                                                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-indigo-100 bg-indigo-600 rounded">
                                                    {target.item_count}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                        <div className="text-sm text-gray-900">{target.description || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {getAssigneeName(target.assignee_id)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(target.registration_date).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-24">
                                                <div
                                                    className={`h-2.5 rounded-full ${getProgressColor(target.completion_percentage)}`}
                                                    style={{ width: `${target.completion_percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium">{target.completion_percentage}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/task-admin/test-docu/${target.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-gray-100"
                                                title="세부 항목"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            {/* 내가 담당자인 경우만 수정/삭제 가능 */}
                                            {user && target.assignee_id === user.id && (
                                                <>
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-gray-100"
                                                        onClick={() => handleEditClick(target)}
                                                        title="수정"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-gray-100"
                                                        onClick={() => onDelete(target.id)}
                                                        title="삭제"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                                    테스트 기록이 없거나 필터 조건에 맞는 결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 이미지 다이얼로그 - 전체 화면 최대화 */}
            {isImageDialogOpen && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                        {/* 닫기 버튼 */}
                        <button
                            className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 z-10"
                            onClick={closeImageDialog}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* 이미지 제목 */}
                        <h3 className="text-white text-xl font-medium mb-4 absolute top-4 left-1/2 transform -translate-x-1/2">{selectedImage.name}</h3>

                        {/* 이미지 - 크기 최대화 */}
                        <div className="w-full h-full flex items-center justify-center">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.name}
                                className="max-w-[90vw] max-h-[90vh] object-contain"
                                onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 다이얼로그 닫힘 방지
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* 수정 모달 */}
            <EditTestTargetModal
                show={isEditModalOpen}
                targetToEdit={targetToEdit}
                user={user}
                assignees={assignees}
                onClose={handleCloseEditModal}
            />
        </>
    );
};

export default TestTargetList;