// C:\Users\terec\msa-admin\src\app\task-admin\test-targets-archive\components\TestTargetArchiveList.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpCircle, Trash2, ChevronsUpDown } from 'lucide-react';
import { TestTarget } from '@/types/typeForTestTarget';

interface TestTargetArchiveListProps {
    archivedTargets: TestTarget[];
    selectedItems: string[];
    onSelectItem: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
    allChecked: boolean;
    getAssigneeName: (assigneeId: string | null) => string;
    getProgressColor: (percentage: number) => string;
    onRestore: (id: string) => void;
    onDelete: (id: string) => void;
    isRestoringOrDeleting: boolean;
    searchTerm?: string;
}

const TestTargetArchiveList: React.FC<TestTargetArchiveListProps> = ({
    archivedTargets,
    selectedItems,
    onSelectItem,
    onSelectAll,
    allChecked,
    getAssigneeName,
    getProgressColor,
    onRestore,
    onDelete,
    isRestoringOrDeleting,
    searchTerm = ''
}) => {
    return (
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={allChecked}
                                        onChange={onSelectAll}
                                    />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>이미지</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <span>테스트 대상</span>
                                    <ChevronsUpDown className="ml-1 h-4 w-4" />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>설명</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>담당자</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center">
                                    <span>등록일</span>
                                    <ChevronsUpDown className="ml-1 h-4 w-4" />
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>진행률</span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <span>액션</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {archivedTargets.length > 0 ? (
                            archivedTargets.map((target: TestTarget) => (
                                <tr key={target.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            checked={selectedItems.includes(target.id)}
                                            onChange={(e) => onSelectItem(e, target.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-12 relative">
                                            {target.target_image_url ? (
                                                <Image
                                                    src={target.target_image_url}
                                                    alt={target.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-md object-cover w-12 h-12"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center">
                                                    <span className="text-gray-500 text-lg font-medium">{target.name.charAt(0).toUpperCase()}</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Link
                                                href={`/task-admin/test-targets-archive/${target.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer mr-2"
                                            >
                                                {target.name}
                                            </Link>
                                            {target.item_count !== undefined && target.item_count > 0 && (
                                                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                                                    {target.item_count}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 max-w-xs truncate">{target.description || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{getAssigneeName(target.assignee_id)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{new Date(target.registration_date).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                                <div
                                                    className={`h-2 rounded-full ${getProgressColor(target.completion_percentage)}`}
                                                    style={{ width: `${target.completion_percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium text-gray-500">{target.completion_percentage}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50"
                                                onClick={() => onRestore(target.id)}
                                                title="복원"
                                                disabled={isRestoringOrDeleting}
                                            >
                                                <ArrowUpCircle className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                                onClick={() => onDelete(target.id)}
                                                title="영구 삭제"
                                                disabled={isRestoringOrDeleting}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-6 py-10 text-center">
                                    <div className="flex flex-col items-center">
                                        <svg className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="text-gray-500 text-sm mb-1">
                                            {searchTerm
                                                ? '검색 조건에 맞는 아카이브된 테스트 대상이 없습니다.'
                                                : '아카이브된 테스트 대상이 없습니다.'}
                                        </p>
                                        <p className="text-gray-400 text-xs">테스트 대상 목록에서 아카이브할 항목을 선택하세요.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 페이지네이션 부분 */}
            {archivedTargets.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-700">
                                <span>총 </span>
                                <span className="font-medium">{archivedTargets.length}</span>
                                <span> 개 항목</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestTargetArchiveList;