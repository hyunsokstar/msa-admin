import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useApiForUsersInfoForSelectBox from '@/hook/useApiForUsersInfoForSelectBox';

interface FormSelectBoxForAllUserListWithApiProps {
  onChange: (value: string | null) => void;
  defaultValue?: string;
  isDisabled?: boolean; // 선택 박스 비활성화 여부
}

const FormSelectBoxForAllUserListWithApi: React.FC<FormSelectBoxForAllUserListWithApiProps> = React.memo(
  ({ onChange, defaultValue, isDisabled = false }) => {
    const { data: users, isLoading, error } = useApiForUsersInfoForSelectBox();

    const selectContentStyles = "bg-white border border-gray-200 shadow-md rounded-md overflow-hidden";
    const selectItemStyles = "cursor-pointer hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-600 py-2 px-3";
    const selectTriggerStyles = `flex-1 h-9 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
      isDisabled ? 'bg-gray-200 cursor-not-allowed' : ''
    }`;

    if (isLoading) {
      return (
        <div className="h-9 bg-gray-200 animate-pulse rounded-md">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-red-500 text-sm">
          사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.
        </div>
      );
    }

    return (
      <Select
        onValueChange={(value) => onChange(value === 'none' ? null : value)}
        defaultValue={defaultValue || 'none'}
        disabled={isDisabled}
      >
        <SelectTrigger className={selectTriggerStyles}>
          <SelectValue placeholder="사용자 선택" />
        </SelectTrigger>
        <SelectContent className={selectContentStyles}>
          <SelectItem value="none" className={selectItemStyles}>
            모든 유저
          </SelectItem>
          {users?.map((user) => (
            <SelectItem
              key={user.id}
              value={user.id ?? ''}
              className={selectItemStyles}
            >
              {user.email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

export default FormSelectBoxForAllUserListWithApi;
