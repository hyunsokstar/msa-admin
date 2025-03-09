// src/app/task-admin/test-docu/page.tsx
"use client";
import React, { useState } from 'react';
import { TestTarget } from '@/types/typeForTestTarget';
import { useUserStore } from '@/store/useUserStore';
import { useDeleteTestTarget, useGetTestTargets } from '@/hook/useApiForTestTarget';
import TestFilters from './components/TestFilters';
import TestTargetList from './components/TestTargetList';
import AddTestTargetModal from './components/AddTestTargetModal';
import { useAddTestTarget } from '@/hook/useAddTestTarget';

const TestTrackingPage: React.FC = () => {
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
            assignee_id: newTestTarget.assignee_id || user?.id || undefined,
            target_image_url: newTestTarget.target_image_url || undefined, // 이 필드 추가
        }, {
            onSuccess: () => {
                setShowAddForm(false);
                setNewTestTarget({
                    name: '',
                    description: '',
                    assignee_id: user?.id || '',
                    target_image_url: '', // 초기화할 때도 이 필드 추가
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

            {/* 필터 컴포넌트 */}
            <TestFilters
                filters={filters}
                testTargets={testTargets || []}
                user={user}
                assignees={assignees}
                handleFilterChange={handleFilterChange}
                resetFilters={resetFilters}
                onAddNewClick={() => setShowAddForm(true)}
                isAuthenticated={isAuthenticated}
            />

            {/* 테스트 대상 목록 컴포넌트 */}
            <TestTargetList
                testTargets={filteredTestTargets}
                user={user}
                getAssigneeName={getAssigneeName}
                getProgressColor={getProgressColor}
                onDelete={handleDeleteTestTarget}
                assignees={assignees}
            />

            {/* 테스트 대상 추가 모달 컴포넌트 */}
            <AddTestTargetModal
                show={showAddForm}
                newTestTarget={newTestTarget}
                user={user}
                assignees={assignees}
                isPending={addTestTargetMutation.isPending}
                onClose={() => setShowAddForm(false)}
                onChange={handleNewTestTargetChange}
                onSave={handleAddTestTarget}
            />
        </div>
    );
};

export default TestTrackingPage;