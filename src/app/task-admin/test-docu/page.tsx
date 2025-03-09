"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { TestTarget } from '@/types/typeForTestTarget';
import { useUserStore } from '@/store/useUserStore';
import { useAddTestTarget, useDeleteTestTarget, useGetTestTargets } from '@/hook/useApiForTestTarget';

interface TestTrackingPageProps {
    // 필요한 props가 있다면 여기에 추가
}

const TestTrackingPage: React.FC<TestTrackingPageProps> = () => {
    // 사용자 정보 가져오기
    const { user, isAuthenticated } = useUserStore();

    // 테스트 대상 목록 가져오기 (React Query 훅 사용)
    const { data: testTargets, isLoading: isLoadingTargets, error: targetsError } = useGetTestTargets();

    // 테스트 대상 추가 훅
    const addTestTargetMutation = useAddTestTarget();

    // 테스트 대상 삭제 훅
    const deleteTestTargetMutation = useDeleteTestTarget();

    // 담당자 목록 샘플 데이터 (실제로는 API에서 가져와야 함)
    const assignees = [
        { id: 'bb3786b4-3941-4a00-a753-765c3a8d1c5c', name: '김개발' },
        { id: '885e47a5-850d-4e80-b29e-82eb9b1132ef', name: '이테스터' },
        { id: 'some-uuid-3', name: '박매니저' }
    ];

    // 필터링 상태
    const [filters, setFilters] = useState({
        targetId: '',
        assignee: '',
        searchTerm: '',
        progressRange: { min: 0, max: 100 }
    });

    // 새 테스트 대상을 위한 폼 상태
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTestTarget, setNewTestTarget] = useState<Partial<TestTarget>>({
        name: '',
        description: '',
        assignee_id: user?.id || ''
    });

    // 필터 변경 핸들러
    const handleFilterChange = (filterName: string, value: any) => {
        setFilters({ ...filters, [filterName]: value });
    };

    // 필터 초기화 핸들러
    const resetFilters = () => {
        setFilters({
            targetId: '',
            assignee: '',
            searchTerm: '',
            progressRange: { min: 0, max: 100 }
        });
    };

    // 새 테스트 대상 입력 핸들러
    const handleNewTestTargetChange = (field: string, value: any) => {
        setNewTestTarget({ ...newTestTarget, [field]: value });
    };

    // 테스트 대상 추가 핸들러
    const handleAddTestTarget = () => {
        if (!isAuthenticated) {
            alert('로그인 후 이용해주세요.');
            return;
        }

        if (!newTestTarget.name) {
            alert('테스트 대상 이름은 필수 입력 항목입니다.');
            return;
        }

        addTestTargetMutation.mutate({
            name: newTestTarget.name,
            description: newTestTarget.description || '',
            // 담당자를 선택하지 않은 경우 현재 로그인 사용자를 담당자로 설정
            assignee_id: newTestTarget.assignee_id || user?.id || null,
        }, {
            onSuccess: () => {
                setShowAddForm(false);
                setNewTestTarget({
                    name: '',
                    description: '',
                    assignee_id: user?.id || ''
                });
            }
        });
    };

    // 테스트 대상 삭제 핸들러
    const handleDeleteTestTarget = (id: string) => {
        if (confirm('이 테스트 대상을 삭제하시겠습니까? 관련된 모든 테스트 항목도 함께 삭제됩니다.')) {
            deleteTestTargetMutation.mutate(id);
        }
    };

    // 진행률에 따른 색상 결정
    const getProgressColor = (percentage: number) => {
        if (percentage < 30) return 'bg-red-500';
        if (percentage < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    // 테스트 대상 데이터 필터링
    const filteredTestTargets = testTargets
        ? testTargets.filter(target => {
            // 테스트 대상 필터
            if (filters.targetId && target.id !== filters.targetId) return false;

            // 담당자 필터
            if (filters.assignee && target.assignee_id !== filters.assignee) return false;

            // 진행률 필터
            if (target.completion_percentage < filters.progressRange.min ||
                target.completion_percentage > filters.progressRange.max) return false;

            // 검색어 필터 (이름과 설명에서 검색)
            if (filters.searchTerm) {
                const searchLower = filters.searchTerm.toLowerCase();
                const nameMatch = target.name.toLowerCase().includes(searchLower);
                const descMatch = target.description?.toLowerCase().includes(searchLower) || false;
                if (!nameMatch && !descMatch) return false;
            }

            return true;
        })
        : [];

    // 담당자 ID로 이름 찾기
    const getAssigneeName = (assigneeId: string | null) => {
        if (!assigneeId) return '-';

        // 현재 로그인 사용자인 경우 표시
        if (user && assigneeId === user.id) {
            return `${user.full_name || user.email} (나)`;
        }

        const assignee = assignees.find(a => a.id === assigneeId);
        return assignee ? assignee.name : assigneeId;
    };

    if (isLoadingTargets) {
        return <div className="flex justify-center items-center h-64">로딩 중...</div>;
    }

    if (targetsError) {
        return <div className="text-red-500 p-4">데이터를 불러오는 중 오류가 발생했습니다.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">콜센터 상담 관리 프로젝트 테스트 기록</h1>

            {/* 필터 섹션 */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-wrap -mx-2">
                    {/* 테스트 대상 필터 */}
                    <div className="px-2 w-full sm:w-1/2 md:w-1/3 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">테스트 대상</label>
                        <select
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={filters.targetId}
                            onChange={(e) => handleFilterChange('targetId', e.target.value)}
                        >
                            <option value="">모든 테스트 대상</option>
                            {testTargets && testTargets.map(target => (
                                <option key={target.id} value={target.id}>
                                    {target.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 담당자 필터 */}
                    <div className="px-2 w-full sm:w-1/2 md:w-1/3 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                        <select
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={filters.assignee}
                            onChange={(e) => handleFilterChange('assignee', e.target.value)}
                        >
                            <option value="">모든 담당자</option>
                            {user && (
                                <option value={user.id}>{user.full_name || user.email} (나)</option>
                            )}
                            {assignees.filter(a => !user || a.id !== user.id).map(assignee => (
                                <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* 검색 필터 */}
                    <div className="px-2 w-full sm:w-1/2 md:w-1/3 mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">테스트 주제 검색</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="검색어를 입력하세요"
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        />
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                        onClick={resetFilters}
                    >
                        필터 초기화
                    </button>
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            if (!isAuthenticated) {
                                alert('로그인 후 이용해주세요.');
                                return;
                            }
                            setShowAddForm(true);
                        }}
                    >
                        새 테스트 대상 추가
                    </button>
                </div>
            </div>

            {/* 테스트 기록 목록 */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
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
                        {filteredTestTargets.length > 0 ? (
                            filteredTestTargets.map((target) => (
                                <tr key={target.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {/* 테스트 주제를 클릭하면 상세 페이지로 이동 */}
                                        <Link
                                            href={`/task-admin/test-docu/${target.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer"
                                        >
                                            <div>{target.name}</div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
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
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                <div
                                                    className={`h-2.5 rounded-full ${getProgressColor(target.completion_percentage)}`}
                                                    style={{ width: `${target.completion_percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-medium">{target.completion_percentage}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <Link
                                            href={`/task-admin/test-docu/${target.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2"
                                        >
                                            세부 항목
                                        </Link>
                                        {/* 내가 담당자인 경우만 수정/삭제 가능 */}
                                        {user && target.assignee_id === user.id && (
                                            <>
                                                <button className="text-indigo-600 hover:text-indigo-900 mr-2">수정</button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDeleteTestTarget(target.id)}
                                                >
                                                    삭제
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                                    테스트 기록이 없거나 필터 조건에 맞는 결과가 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* 새 테스트 대상 추가 모달 */}
            {showAddForm && (
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
                                        onChange={(e) => handleNewTestTargetChange('name', e.target.value)}
                                    />
                                </div>

                                {/* 담당자 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">담당자</label>
                                    <select
                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        value={newTestTarget.assignee_id || ''}
                                        onChange={(e) => handleNewTestTargetChange('assignee_id', e.target.value)}
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

                                {/* 설명 */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        rows={3}
                                        placeholder="테스트 대상에 대한 설명을 입력하세요"
                                        value={newTestTarget.description || ''}
                                        onChange={(e) => handleNewTestTargetChange('description', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                                    onClick={() => setShowAddForm(false)}
                                >
                                    취소
                                </button>
                                <button
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleAddTestTarget}
                                    disabled={addTestTargetMutation.isPending}
                                >
                                    {addTestTargetMutation.isPending ? '저장 중...' : '저장'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestTrackingPage;