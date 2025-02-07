"use client";

import React, { useState } from 'react';
import { useRowSelection } from 'react-data-grid';
import { Textarea } from "@/components/ui/textarea";

interface TextEditorProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commit: boolean, keepEditing: boolean) => void;
}

const TextAreaCellEditor = ({
    row,
    column,
    onRowChange,
    onClose,
}: TextEditorProps) => {
    const { isRowSelected, onRowSelectionChange } = useRowSelection();
    const [initialValue] = useState(row[column.key] as string);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            console.log('엔터 눌렀습니다');
            const currentValue = event.currentTarget.value || "";
            if (initialValue !== currentValue) {
                onRowSelectionChange({ row: row, checked: true, isShiftClick: false });
            }
            onClose(true, false);
        }
    };

    return (
        <Textarea
            className="w-full h-full min-h-[60px] resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
            value={row[column.key]}
            onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
            onKeyDown={handleKeyPress}
            onBlur={(e) => {
                const currentValue = e.target.value || "";
                if (initialValue !== currentValue) {
                    onRowSelectionChange({ row: row, checked: true, isShiftClick: false });
                }
                onClose(true, false);
            }}
            autoFocus
        />
    );
};

export default TextAreaCellEditor;