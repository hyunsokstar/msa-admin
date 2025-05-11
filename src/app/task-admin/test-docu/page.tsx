"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Archive, RefreshCw } from 'lucide-react';
import { TestTarget } from '@/types/typeForTestTarget';
import { useUserStore } from '@/store/useUserStore';
import { useDeleteTestTarget, useGetTestTargets } from '@/hook/useApiForTestTarget';
import TestFilters from './components/TestFilters';
import TestTargetList from './components/TestTargetList';
import AddTestTargetModal from './components/AddTestTargetModal';
import { useAddTestTarget } from '@/hook/useAddTestTarget';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMoveTestTargetsToArchive from '@/hook/useArchiveMoveTestTargetsItemToTestTargetsArchive';

const TestTrackingPage: React.FC = () => {
    // 사용자 정보 가져오기
    const { user, isAuthenticated } = useUserStore();

    // 테스트 대상 목록 가져오기 (React Query 훅 사용)
    const { data: testTargets, isLoading: isLoadingTargets, error: targetsError, refetch } = useGetTestTargets();

    // 아카이브 이동 훅
    const archiveMutation = useMoveTestTargetsToArchive();

    // 체크박스 상태 관리
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    // 데이터를 컴포넌트 마운트시 및 주기적으로 다시 가져오기
    useEffect(() => {
        // 컴포넌트 마운트 시 데이터 강제 갱신
        refetch();

        // 60초마다 데이터 갱신 (선택적)
        const intervalId = setInterval(() => {
            refetch();
        }, 60000);

        // 컴포넌트 언마운트 시 클리어
        return () => clearInterval(intervalId);
    }, [refetch]);

    // 로딩 상태 확인 로그
    useEffect(() => {
        if (isLoadingTargets) {
            console.log('데이터 로딩 중...');
        } else if (targetsError) {
            console.error('데이터 로딩 오류:', targetsError);
        } else {
            console.log('로드된 테스트 대상 수:', testTargets?.length || 0);
            console.log('테스트 대상 데이터:', testTargets);
        }
    }, [isLoadingTargets, targetsError, testTargets]);

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
            toast.warning('로그인 후 이용해주세요.');
            return;
        }

        if (!newTestTarget.name) {
            toast.warning('테스트 대상 이름은 필수 입력 항목입니다.');
            return;
        }

        addTestTargetMutation.mutate({
            name: newTestTarget.name,
            description: newTestTarget.description || '',
            // 담당자를 선택하지 않은 경우 현재 로그인 사용자를 담당자로 설정
            assignee_id: newTestTarget.assignee_id || user?.id || undefined,
            target_image_url: newTestTarget.target_image_url || undefined,
        }, {
            onSuccess: () => {
                toast.success('테스트 대상이 성공적으로 추가되었습니다.');
                setShowAddForm(false);
                setNewTestTarget({
                    name: '',
                    description: '',
                    assignee_id: user?.id || '',
                    target_image_url: '',
                });
            },
            onError: (error) => {
                toast.error('테스트 대상 추가 중 오류가 발생했습니다.');
                console.error('추가 중 오류:', error);
            }
        });
    };

    // 테스트 대상 삭제 핸들러
    const handleDeleteTestTarget = (id: string) => {
        if (window.confirm('이 테스트 대상을 삭제하시겠습니까? 관련된 모든 테스트 항목도 함께 삭제됩니다.')) {
            deleteTestTargetMutation.mutate(id, {
                onSuccess: () => {
                    toast.success('테스트 대상이 성공적으로 삭제되었습니다.');
                },
                onError: (error) => {
                    toast.error('테스트 대상 삭제 중 오류가 발생했습니다.');
                    console.error('삭제 중 오류:', error);
                }
            });
        }
    };

    // 아카이브로 이동 핸들러
    const handleArchiveItems = () => {
        if (selectedItems.length === 0) {
            toast.warning('선택한 항목이 없습니다.');
            return;
        }

        if (window.confirm(`선택한 ${selectedItems.length}개 항목을 아카이브로 이동하시겠습니까?`)) {
            archiveMutation.mutate(selectedItems, {
                onSuccess: () => {
                    // 성공 시 선택 항목 초기화
                    setSelectedItems([]);
                }
            });
        }
    };

    // 선택 항목 변경 핸들러
    const handleSelectedItemsChange = (items: string[]) => {
        setSelectedItems(items);
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

    // 데이터 로딩 확인을 위한 간단한 디버깅 버튼
    const handleDebugRefresh = () => {
        toast.info('데이터 새로고침 중...');
        refetch().then(result => {
            if (result.error) {
                toast.error('데이터 로드 실패');
                console.error('데이터 로드 오류:', result.error);
            } else {
                toast.success(`${result.data?.length || 0}개 항목 로드됨`);
            }
        });
    };

    if (isLoadingTargets) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500">데이터 로딩 중...</p>
                </div>
            </div>
        );
    }

    if (targetsError) {
        return (
            <div className="flex flex-col items-center p-4">
                <div className="text-red-500 bg-red-50 p-4 rounded-lg mb-4 w-full max-w-lg">
                    <h3 className="font-bold mb-2">데이터를 불러오는 중 오류가 발생했습니다</h3>
                    <p>{(targetsError as Error)?.message || '알 수 없는 오류'}</p>
                </div>
                <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    onClick={() => refetch()}
                >
                    다시 시도
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">콜센터 관리 프로젝트 테스트 기록!!</h1>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleDebugRefresh}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span>데이터 새로고침</span>
                    </button>

                    <Link
                        href="/task-admin/test-archive"
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <Archive className="w-4 h-4" />
                        <span>아카이브 보기</span>
                    </Link>
                </div>
            </div>

            {/* 선택된 항목이 있을 때만 보여주는 액션 버튼 */}
            {selectedItems.length > 0 && (
                <div className="flex justify-end mb-4">
                    <button
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                        onClick={handleArchiveItems}
                        disabled={archiveMutation.isPending}
                    >
                        <Archive className="w-4 h-4" />
                        <span>
                            {archiveMutation.isPending
                                ? '처리 중...'
                                : `아카이브 이동 (${selectedItems.length})`}
                        </span>
                    </button>
                </div>
            )}

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
                onSelectedItemsChange={handleSelectedItemsChange}
                selectedItems={selectedItems}
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