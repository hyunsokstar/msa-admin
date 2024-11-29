// 파일 경로: /components/ITableForApiNameList.tsx
import React from 'react';
import useApiForGetApiNames from '@/hook/useApiForGetApiNames';
import { Button } from '@/components/ui/button';
import { ApiNameType } from '@/types/typeForApiConverter';
import { Toggle } from '@/components/ui/toggle';
import { CheckCircle, Circle } from 'lucide-react';

interface ITableForApiNameListProps {
    onSelect: (apiName: string, apiUrl: string, apiMethod: string) => void;
    onToggleCompletion: (apiId: number, isCompleted: boolean) => void;
}

const ITableForApiNameList: React.FC<ITableForApiNameListProps> = ({ onSelect, onToggleCompletion }) => {
    const { data: apiNameList, isLoading, isError } = useApiForGetApiNames();

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-4">Error loading API names data.</div>;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">API 이름 목록</h3>
            <div className="divide-y divide-gray-200">
                {apiNameList?.map((apiName: ApiNameType) => (
                    <div
                        key={apiName.id}
                        className="py-4 px-2 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 rounded-lg"
                    >
                        <div>
                            <div className="text-base font-semibold text-gray-900">{apiName.title} ({apiName.method})</div>
                            <div className="text-sm text-gray-600">{apiName.url}</div>
                            <div className="text-sm text-gray-500">{apiName.description}</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Toggle
                                pressed={apiName.is_completed}
                                onPressedChange={() => onToggleCompletion(apiName.id, !apiName.is_completed)}
                                className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150 ${
                                    apiName.is_completed
                                        ? 'bg-green-100 hover:bg-green-200 text-green-700'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                                }`}
                            >
                                {apiName.is_completed ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        완료
                                    </>
                                ) : (
                                    <>
                                        <Circle className="w-5 h-5 text-gray-500" />
                                        비완료
                                    </>
                                )}
                            </Toggle>
                            <Button
                                variant="outline"
                                className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-150 ${
                                    apiName.is_completed
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } text-white`}
                                onClick={() => onSelect(apiName.title, apiName.url, apiName.method)}
                            >
                                선택
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ITableForApiNameList;
