import React, { useState, useEffect } from 'react'
import { useRowSelection } from 'react-data-grid'
import { Select } from "@/components/ui/select"
import { Avatar } from '@/components/ui/avatar'
import { IUser } from '@/types/typeForUser'
import { useApiForGetAllUsers } from '@/hook/useApiForGetAllUsers'

interface Props {
    row: any
    column: { key: keyof any }
    onRowChange: (updatedRow: any) => void
    onClose: (commitChanges?: boolean, shouldFocusCell?: boolean) => void
}

const ISelectBoxForUserAtGrid = ({
    row,
    column,
    onRowChange,
    onClose,
}: Props) => {
    const { onRowSelectionChange } = useRowSelection()
    const [initialValue] = useState(row[column.key] as string)
    const { data: users, isLoading } = useApiForGetAllUsers()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = event.target.value
        const selectedUser = users?.find(user => user.id === userId)

        onRowChange({
            ...row,
            [column.key]: selectedUser?.id || '',
            [String(column.key) + '_name']: selectedUser?.full_name || '',
            created_by_user: selectedUser
        })
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

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <select
            className="w-full h-full border rounded px-2 py-1"
            value={row[column.key]}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
        >
            <option value="">Select user</option>
            {users?.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.full_name}
                </option>
            ))}
        </select>
    )
}

export default ISelectBoxForUserAtGrid