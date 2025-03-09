"use client";

import React from 'react';
import { TestItem } from '@/types/typeForTestTarget';
import TestItemComponent from './TestItemComponent';

interface TestCategoryProps {
    id: string;
    name: string;
    items: TestItem[];
    onToggleCompletion: (id: string, isCompleted: boolean) => void;
    onUpdateItem: (id: string, updates: { description?: string; notes?: string | null }) => void;
    onDeleteItem: (id: string) => void;
}

const TestCategoryComponent: React.FC<TestCategoryProps> = ({
    id,
    name,
    items,
    onToggleCompletion,
    onUpdateItem,
    onDeleteItem
}) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">{name}</h3>
                <div className="text-sm text-gray-500">
                    {items.length > 0 ? (
                        <>
                            {items.filter(item => item.is_completed).length}/{items.length} 완료
                        </>
                    ) : (
                        <span>항목 없음</span>
                    )}
                </div>
            </div>

            {items.length > 0 ? (
                <ul className="space-y-2">
                    {items.map((item) => (
                        <TestItemComponent
                            key={item.id}
                            item={item}
                            onToggleCompletion={onToggleCompletion}
                            onUpdate={onUpdateItem}
                            onDelete={onDeleteItem}
                        />
                    ))}
                </ul>
            ) : (
                <div className="p-4 border rounded text-center text-gray-500">
                    이 카테고리에 테스트 항목이 없습니다.
                </div>
            )}
        </div>
    );
};

export default TestCategoryComponent;