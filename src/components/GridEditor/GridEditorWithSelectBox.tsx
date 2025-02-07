"use client";

import React, { useState } from "react";
import { useRowSelection } from "react-data-grid";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SelectBoxProps {
    row: any;
    column: { key: keyof any };
    onRowChange: (updatedRow: any) => void;
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void;
    arrayForSelectOption: string[];
}

const GridEditorWithSelectBox = ({
    row,
    column,
    onRowChange,
    onClose,
    arrayForSelectOption,
}: SelectBoxProps) => {
    const { isRowSelected, onRowSelectionChange } = useRowSelection();
    const [initialValue] = useState(row[column.key] as string);

    const handleValueChange = (newValue: string) => {
        if (initialValue !== newValue) {
            onRowSelectionChange({
                row: row,
                checked: true,
                isShiftClick: false,
            });
        }
        onRowChange({ ...row, [column.key]: newValue });
        onClose(true, false);
    };

    return (
        <Select
            value={row[column.key]}
            onValueChange={handleValueChange}
            defaultOpen
        >
            <SelectTrigger className="w-full h-[34px] bg-white border-0 focus:ring-0 shadow-none text-sm">
                <SelectValue placeholder="Select option">
                    {row[column.key]}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white min-w-[150px] z-[9999] shadow-md rounded-md border border-gray-200">
                {arrayForSelectOption.map((el) => (
                    <SelectItem key={el} value={el} className="py-2 px-4 text-sm">
                        {el}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default GridEditorWithSelectBox;
