"use client";
import React from 'react';
import { TestTarget } from '@/types/typeForTestTarget';
import { Search, Filter, Plus } from 'lucide-react';

interface TestFiltersProps {
    filters: {
        targetId: string;
        assignee: string;
        searchTerm: string;
        progressRange: { min: number; max: number };
    };
    testTargets: TestTarget[] | undefined;
    user: any;
    assignees: { id: string; name: string }[];
    handleFilterChange: (filterName: string, value: any) => void;
    resetFilters: () => void;
    onAddNewClick: () => void;
    isAuthenticated: boolean;
}

const TestFilters: React.FC<TestFiltersProps> = ({
    filters,
    testTargets,
    user,
    assignees,
    handleFilterChange,
    resetFilters,
    onAddNewClick,
    isAuthenticated
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-wrap gap-3">
                {/* 검색 필터 */}
                <div className="flex-grow min-w-[200px]">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            placeholder="검색..."
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        />
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* 테스트 대상 필터 */}
                <div className="min-w-[160px]">
                    <select
                        className="w-full py-2 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-8"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundSize: "1.5em 1.5em"
                        }}
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
                <div className="min-w-[160px]">
                    <select
                        className="w-full py-2 px-3 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 appearance-none bg-no-repeat bg-right pr-8"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundSize: "1.5em 1.5em"
                        }}
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

                {/* 버튼 영역 */}
                <div className="flex items-center space-x-2 ml-auto">
                    <button
                        className="flex items-center justify-center p-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                        onClick={resetFilters}
                        title="필터 초기화"
                    >
                        <Filter className="h-4 w-4" />
                    </button>
                    <button
                        className="flex items-center justify-center px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-medium transition-colors"
                        onClick={() => {
                            if (!isAuthenticated) {
                                alert('로그인 후 이용해주세요.');
                                return;
                            }
                            onAddNewClick();
                        }}
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TestFilters;