import React, { useState } from 'react'
import { useRowSelection } from 'react-data-grid'

interface Props {
    row: any
    column: { key: keyof any }
    onRowChange: (updatedRow: any) => void
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void
}

const CommonInputForGridCellEdit = ({
    row,
    column,
    onRowChange,
    onClose,
}: Props) => {
    const { onRowSelectionChange } = useRowSelection()
    const [initialValue] = useState(row[column.key] as string)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRowChange({ ...row, [column.key]: event.target.value })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
        if (event.key === 'Escape') {
            onRowChange({ ...row, [column.key]: initialValue })
            onClose(true, false)
        }
    }

    const handleBlur = () => {
        handleSubmit()
    }

    const handleSubmit = () => {
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
        <input
            className="w-full h-full px-3 bg-white focus:outline-none"
            value={row[column.key]}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
        />
    )
}

export default CommonInputForGridCellEdit