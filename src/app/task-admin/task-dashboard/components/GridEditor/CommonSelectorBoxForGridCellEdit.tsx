import React, { useState } from 'react'
import { useRowSelection } from 'react-data-grid'
import { Select } from "@/components/ui/select"

interface Props {
    row: any
    column: { key: keyof any }
    onRowChange: (updatedRow: any) => void
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void
    options: string[]
}

const CommonSelectorBoxForGridCellEdit = ({
    row,
    column,
    onRowChange,
    onClose,
    options,
}: Props) => {
    const { onRowSelectionChange } = useRowSelection()
    const [initialValue] = useState(row[column.key] as string)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        onRowChange({ ...row, [column.key]: value })
    }

    const handleBlur = () => {
        if (initialValue !== row[column.key]) {
            onRowSelectionChange({
                row: row,
                checked: true,
                isShiftClick: false
            })
        }
        onClose(true, false)
    }

    return (
        <select
            className="w-full h-full border rounded px-2 py-1"
            value={row[column.key]}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}

export default CommonSelectorBoxForGridCellEdit