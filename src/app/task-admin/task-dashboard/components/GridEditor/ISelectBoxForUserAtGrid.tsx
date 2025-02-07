import React, { useState, useEffect } from 'react'
import { useRowSelection } from 'react-data-grid'
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
    const { data: users, isLoading } = useApiForGetAllUsers()

    // 초기값 설정을 created_by_user 객체의 id로 수정
    const [initialValue] = useState(row.created_by_user?.id || '')

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = event.target.value
        const selectedUser = users?.find(user => user.id === userId)

        if (selectedUser) {
            onRowChange({
                ...row,
                created_by_user: selectedUser,
                created_by_user_name: selectedUser.full_name // 표시용 이름 필드 업데이트
            })
        } else {
            // 사용자가 선택되지 않은 경우
            onRowChange({
                ...row,
                created_by_user: null,
                created_by_user_name: ''
            })
        }
    }

    const handleBlur = () => {
        // 초기값과 현재 선택된 값 비교
        if (initialValue !== row.created_by_user?.id) {
            onRowSelectionChange({
                row: row,
                checked: true,
                isShiftClick: false
            })
        }
        onClose(true, false)
    }

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <select
            className="w-full h-full px-3 bg-white focus:outline-none"
            value={row.created_by_user?.id || ''}
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