// components/ITableForApiNameList.tsx
"use client";

import React from 'react';
import useApiForGetApiNames from '@/hook/useApiForGetApiNames';
import { Button } from '@/components/ui/button';
import { ApiNameType } from '@/types/typeForApiConverter';
import { Toggle } from '@/components/ui/toggle';
import { CheckCircle, Circle } from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import IDialogButtonForCreateApiName from '../dialog/IDialogButtonForCreateApiName';
import IDialogButtonForDeleteApiName from '../dialog/IDialogButtonForDeleteApiName';

interface ITableForApiNameListProps {
    onSelect: (apiName: string, apiUrl: string, apiMethod: string) => void;
    onToggleCompletion: (apiId: number, isCompleted: boolean) => void;
}

const ITableForApiNameList: React.FC<ITableForApiNameListProps> = ({ onSelect, onToggleCompletion }) => {
    const { data: apiNameList, isLoading, isError } = useApiForGetApiNames();
    const user = useUserStore((state) => state.user);

    if (isLoading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-4">Error loading API names data.</div>;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">API 이름 목록</h3>
                <IDialogButtonForCreateApiName />
            </div>

            <Table className="w-full text-left">
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="py-3 px-4 font-semibold text-gray-700">API 이름</TableHead>
                        <TableHead className="py-3 px-4 font-semibold text-gray-700">API URL</TableHead>
                        <TableHead className="py-3 px-4 font-semibold text-gray-700">메소드</TableHead>
                        <TableHead className="py-3 px-4 font-semibold text-gray-700">설명</TableHead>
                        <TableHead className="py-3 px-4 font-semibold text-gray-700 text-center">상태</TableHead>
                        <TableHead className="py-3 px-4 font-semibold text-gray-700 text-center">작업</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apiNameList?.map((apiName: ApiNameType) => (
                        <TableRow key={apiName.id} className="hover:bg-gray-50 transition-colors duration-150">
                            <TableCell className="py-4 px-4 font-medium text-gray-900">{apiName.title}</TableCell>
                            <TableCell className="py-4 px-4 text-gray-600">{apiName.url}</TableCell>
                            <TableCell className="py-4 px-4 text-gray-800">{apiName.method}</TableCell>
                            <TableCell className="py-4 px-4 text-gray-500">{apiName.description}</TableCell>
                            <TableCell className="py-4 px-4 text-center">
                                <Toggle
                                    pressed={apiName.is_completed}
                                    onPressedChange={() => {
                                        if (user) {
                                            console.log(`현재 로그인 유저: ${user.email}`);
                                        } else {
                                            console.log('로그인된 사용자가 없습니다.');
                                        }
                                        onToggleCompletion(apiName.id, !apiName.is_completed);
                                    }}
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
                            </TableCell>
                            <TableCell className="py-4 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
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
                                    <IDialogButtonForDeleteApiName 
                                        id={apiName.id}
                                        apiName={apiName.title}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ITableForApiNameList;