import React, { useState } from 'react';
import { useRowSelection } from 'react-data-grid';

interface Props {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
}

const CommonCheckForGridEdit = ({ row, column, onRowChange, onClose }: Props) => {
    const { onRowSelectionChange } = useRowSelection();
    const [initialValue] = useState(row[column.key] as boolean);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        onRowChange({ ...row, [column.key]: value });
    };

    const handleBlur = () => {
        if (initialValue !== row[column.key]) {
            onRowSelectionChange({
                row: row,
                checked: true,
                isShiftClick: false
            });
        }
        onClose(true, false);
    };

    return (
        <input
            type="checkbox"
            className="w-4 h-4 cursor-pointer"
            checked={row[column.key] || false}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
        />
    );
};

export default CommonCheckForGridEdit;
