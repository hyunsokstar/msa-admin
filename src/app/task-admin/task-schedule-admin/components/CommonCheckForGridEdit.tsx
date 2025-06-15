// ===== 1. 수정된 체크박스 에디터 =====
// src/components/grid/CommonCheckForGridEdit.tsx

import React, { useState } from 'react';

interface Props {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
    onSelectionChange?: (rowId: any, hasChanges: boolean) => void; // 변경사항 감지 콜백 추가
}

const CommonCheckForGridEdit = ({ row, column, onRowChange, onClose, onSelectionChange }: Props) => {
    const [initialValue] = useState(row[column.key] as boolean);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        const updatedRow = { ...row, [column.key]: value };
        onRowChange(updatedRow);

        // 변경사항이 있는지 확인하고 콜백 호출
        const hasChanges = value !== initialValue;
        if (onSelectionChange && hasChanges) {
            onSelectionChange(row.id, true);
        }
    };

    const handleBlur = () => {
        const hasChanges = (row[column.key] || false) !== initialValue;
        if (onSelectionChange && hasChanges) {
            onSelectionChange(row.id, true);
        }
        onClose(true, false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Escape') {
            onRowChange({ ...row, [column.key]: initialValue });
            onClose(true, false);
        } else if (event.key === 'Enter') {
            const hasChanges = (row[column.key] || false) !== initialValue;
            if (onSelectionChange && hasChanges) {
                onSelectionChange(row.id, true);
            }
            onClose(true, false);
        }
    };

    return (
        <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={row[column.key] || false}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
        />
    );
};

export default CommonCheckForGridEdit;

