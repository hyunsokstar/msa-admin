// ===== 2. 수정된 메인 그리드 컴포넌트 =====
// src/components/timeline/IGridTableForTaskSchedule.tsx

"use client";
import React, { useState, useMemo, useEffect } from 'react';
import DataGrid, { Column, SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Save, Loader2 } from 'lucide-react';
import { DateInfo, generateDateRange, getColorValue } from '../../utils/dateUtilsForTaskSchedule';
import CommonCheckForGridEdit from '../CommonCheckForGridEdit';

interface Todo {
    id: number;
    title: string;
    color: string;
    [key: string]: any; // 날짜별 체크 상태를 위한 동적 속성
}

interface IGridTableForTaskScheduleProps {
    startDate?: Date;
    endDate?: Date;
}

const IGridTableForTaskSchedule: React.FC<IGridTableForTaskScheduleProps> = ({
    startDate = new Date(2025, 5, 16), // 2025년 6월 16일
    endDate = new Date(2025, 8, 16)    // 2025년 9월 16일
}) => {
    // 샘플 데이터
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "기획서 작성", color: "blue" },
        { id: 2, title: "디자인 시안", color: "green" },
        { id: 3, title: "개발 구현", color: "purple" },
        { id: 4, title: "테스트 진행", color: "orange" },
        { id: 5, title: "배포 준비", color: "red" },
    ]);

    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
    const [hasChanges, setHasChanges] = useState(false);
    const [originalTodos, setOriginalTodos] = useState<Todo[]>([]);

    // 초기 데이터 저장 (변경사항 비교용)
    useEffect(() => {
        setOriginalTodos(JSON.parse(JSON.stringify(todos)));
    }, []);

    // 날짜 생성
    const dates: DateInfo[] = generateDateRange(startDate, endDate);

    // 특정 Todo에 변경사항이 있는지 확인하는 함수
    const hasChangesInTodo = (todo: Todo): boolean => {
        const original = originalTodos.find(orig => orig.id === todo.id);
        if (!original) return true; // 새로 추가된 할일

        // 날짜별 체크 상태 비교
        return dates.some(date => {
            const currentValue = todo[date.dateStr] || false;
            const originalValue = original[date.dateStr] || false;
            return currentValue !== originalValue;
        });
    };

    // 변경사항이 있는 Todo들을 자동으로 선택
    useEffect(() => {
        const changedTodoIds = todos
            .filter(todo => hasChangesInTodo(todo))
            .map(todo => todo.id);

        if (changedTodoIds.length > 0) {
            setSelectedRows(new Set(changedTodoIds));
            setHasChanges(true);
        } else {
            setSelectedRows(new Set());
            setHasChanges(false);
        }
    }, [todos, originalTodos]);

    // 컬럼 정의
    const columns: Column<Todo>[] = useMemo(() => {
        const baseColumns: Column<Todo>[] = [
            {
                ...SelectColumn,
                width: 50,
                minWidth: 50,
                maxWidth: 50,
                resizable: false,
            },
            {
                key: 'title',
                name: 'Todo',
                width: 200,
                frozen: true,
                resizable: true,
                renderCell: ({ row }) => (
                    <div className="flex items-center h-full px-2">
                        <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: getColorValue(row.color) }}
                        />
                        <span className={`font-medium ${hasChangesInTodo(row) ? 'text-orange-600' : 'text-gray-900'}`}>
                            {row.title}
                            {hasChangesInTodo(row) && <span className="ml-1 text-orange-500">*</span>}
                        </span>
                    </div>
                )
            }
        ];

        // 날짜 컬럼들 추가
        const dateColumns: Column<Todo>[] = dates.map(dateInfo => ({
            key: dateInfo.dateStr,
            name: `${dateInfo.month}/${dateInfo.day}`,
            width: 35,
            resizable: true,
            headerCellClass: dateInfo.isWeekend ? 'weekend-header' : 'weekday-header',
            renderEditCell: (props) => (
                <CommonCheckForGridEdit
                    {...props}
                    onSelectionChange={handleSelectionChange}
                />
            ),
            renderCell: ({ row, column }) => {
                const original = originalTodos.find(orig => orig.id === row.id);
                const currentValue = row[column.key] || false;
                const originalValue = original ? (original[column.key] || false) : false;
                const isChanged = currentValue !== originalValue;

                return (
                    <div
                        className={`w-full h-full flex items-center justify-center cursor-pointer hover:bg-blue-100 ${dateInfo.isWeekend ? 'bg-red-50' : 'bg-white'
                            } ${isChanged ? 'ring-1 ring-orange-300' : ''}`}
                        onClick={() => handleCellClick(row.id, column.key as string)}
                    >
                        <div
                            className={`w-6 h-6 border rounded hover:border-blue-500 transition-colors flex items-center justify-center ${isChanged ? 'border-orange-400' : 'border-gray-300'
                                }`}
                            style={{
                                backgroundColor: currentValue ? getColorValue(row.color) : 'transparent',
                                opacity: currentValue ? 0.7 : 1
                            }}
                        >
                            {currentValue && (
                                <span className="text-white text-xs">✓</span>
                            )}
                        </div>
                    </div>
                );
            }
        }));

        return [...baseColumns, ...dateColumns];
    }, [dates, todos, originalTodos]);

    // 셀 클릭 핸들러
    const handleCellClick = (todoId: number, dateStr: string) => {
        setTodos(prevTodos => {
            const newTodos = prevTodos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        [dateStr]: !todo[dateStr]
                    };
                }
                return todo;
            });
            return newTodos;
        });
        console.log(`Toggle: Todo ${todoId}, Date ${dateStr}`);
    };

    // 선택 변경 콜백 (체크박스 에디터에서 호출)
    const handleSelectionChange = (rowId: number, hasChanges: boolean) => {
        if (hasChanges) {
            setSelectedRows(prev => new Set([...prev, rowId]));
        }
    };

    // 행 선택 변경 핸들러
    const handleSelectedRowsChange = (newSelectedRows: Set<number>) => {
        setSelectedRows(newSelectedRows);
    };

    // Save 버튼 핸들러
    const handleSave = () => {
        if (selectedRows.size === 0) {
            alert('저장할 항목을 선택해주세요.');
            return;
        }

        const selectedTodos = todos.filter(todo => selectedRows.has(todo.id));

        console.log('=== 선택된 일정 정보 ===');
        console.log(`총 ${selectedTodos.length}개 항목:`);
        selectedTodos.forEach((todo, index) => {
            const checkedDates = dates
                .filter(date => todo[date.dateStr])
                .map(date => date.dateStr);

            console.log(`\n${index + 1}. ${todo.title} (${todo.color})`);
            console.log(`   - 선택된 날짜: ${checkedDates.length}일`);
            console.log(`   - 날짜 목록: ${checkedDates.join(', ')}`);
            console.log(`   - 변경사항: ${hasChangesInTodo(todo) ? 'Yes' : 'No'}`);
        });

        // 저장 후 원본 데이터 업데이트
        setOriginalTodos(JSON.parse(JSON.stringify(todos)));
        setSelectedRows(new Set());
        setHasChanges(false);

        alert(`${selectedTodos.length}개 항목이 저장되었습니다. 콘솔을 확인해주세요.`);
    };

    // 행 변경 핸들러
    const handleRowsChange = (newRows: Todo[]) => {
        setTodos(newRows);
        console.log('일정 데이터 변경됨 (아직 저장되지 않음)');
    };

    // 새 할일 추가
    const handleAddTodo = () => {
        const newTodo: Todo = {
            id: Math.max(...todos.map(t => t.id)) + 1,
            title: `새 할일 ${todos.length + 1}`,
            color: 'blue'
        };
        setTodos([...todos, newTodo]);
    };

    // 변경사항 취소
    const handleReset = () => {
        if (!hasChanges) {
            alert('변경사항이 없습니다.');
            return;
        }

        if (confirm('모든 변경사항을 취소하시겠습니까?')) {
            setTodos(JSON.parse(JSON.stringify(originalTodos)));
            setSelectedRows(new Set());
            setHasChanges(false);
        }
    };

    // 선택된 항목의 변경사항 취소
    const handleResetSelected = () => {
        if (selectedRows.size === 0) {
            alert('취소할 항목을 선택해주세요.');
            return;
        }

        if (confirm(`선택한 ${selectedRows.size}개 항목의 변경사항을 취소하시겠습니까?`)) {
            setTodos(prevTodos => {
                return prevTodos.map(todo => {
                    if (selectedRows.has(todo.id)) {
                        const original = originalTodos.find(orig => orig.id === todo.id);
                        return original ? { ...original } : todo;
                    }
                    return todo;
                });
            });
        }
    };

    return (
        <div className="w-full">
            <style jsx>{`
                .weekend-header {
                    background-color: #fef2f2 !important;
                    color: #dc2626 !important;
                    font-weight: 600;
                }
                .weekday-header {
                    background-color: #f9fafb !important;
                    font-weight: 600;
                }
                .rdg {
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
            `}</style>

            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-sm text-gray-600">
                            기간: {startDate.toLocaleDateString('ko-KR')} ~ {endDate.toLocaleDateString('ko-KR')} (총 {dates.length}일)
                        </p>
                    </div>

                    {/* 선택된 개수 */}
                    {selectedRows.size > 0 && (
                        <span className="text-xs text-blue-600 font-medium">
                            {selectedRows.size}개 선택됨
                        </span>
                    )}

                    {/* 변경 사항 표시 */}
                    {hasChanges && (
                        <span className="text-xs text-orange-600 font-medium">
                            ⚠️ 저장되지 않은 변경사항
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {/* Save 버튼 */}
                    <button
                        onClick={handleSave}
                        disabled={selectedRows.size === 0}
                        className={`flex items-center space-x-1 px-3 py-1 text-xs rounded transition-colors ${selectedRows.size === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : hasChanges
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                            }`}
                    >
                        <Save className="w-3 h-3" />
                        <span>
                            {hasChanges ? '변경사항 저장' : 'Save'} ({selectedRows.size})
                        </span>
                    </button>

                    {/* 선택 항목 변경사항 취소 */}
                    {selectedRows.size > 0 && hasChanges && (
                        <button
                            onClick={handleResetSelected}
                            className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                        >
                            선택 취소 ({selectedRows.size})
                        </button>
                    )}

                    {/* 전체 변경사항 취소 */}
                    {hasChanges && (
                        <button
                            onClick={handleReset}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            전체 취소
                        </button>
                    )}

                    {/* 새 할일 추가 버튼 */}
                    <button
                        onClick={handleAddTodo}
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        + 새 할일
                    </button>
                </div>
            </div>

            <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={todos}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={handleSelectedRowsChange}
                    onRowsChange={handleRowsChange}
                    rowKeyGetter={(row) => row.id}
                    className="rdg-light"
                    style={{ height: '100%' }}
                    headerRowHeight={35}
                    rowHeight={40}
                    defaultColumnOptions={{
                        sortable: true,
                        resizable: true
                    }}
                />
            </div>

            <div className="mt-3 text-xs text-gray-500">
                💡 날짜 셀을 클릭하면 체크/언체크되고, 변경사항이 있는 할일이 자동으로 선택됩니다. (* 표시는 변경된 항목)
            </div>
        </div>
    );
};

export default IGridTableForTaskSchedule;