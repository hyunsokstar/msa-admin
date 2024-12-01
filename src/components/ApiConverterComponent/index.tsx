// src/components/ApiConverterComponent.tsx
"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToastContainer, toast } from 'react-toastify';
import ITableForApiNameList from '@/components/ApiConverterComponent/ITableForApiNameList';
import useApiForUpdateIsCompletedForApiNames from "@/hook/useApiForUpdateIsCompletedForApiNames";
import ICodeBlockForApiUtil from '@/components/ApiConverterComponent/ICodeBlockForApiUtil';
import 'react-toastify/dist/ReactToastify.css';

interface ApiFormData {
    apiName1: string;
    apiUrl: string;
    apiMethod: string;
}

const ApiConverterComponent = () => {
    const [formData, setFormData] = useState<ApiFormData>({
        apiName1: '',
        apiUrl: '',
        apiMethod: ''
    });

    const [generatedCode1, setGeneratedCode1] = useState('');
    const [generatedCode2, setGeneratedCode2] = useState('');
    const [generatedCode3, setGeneratedCode3] = useState('');
    const [generatedCode4, setGeneratedCode4] = useState('');
    const [copyStates, setCopyStates] = useState({
        code1: false,
        code2: false,
        code3: false,
        code4: false
    });

    const updateCompletionMutation = useApiForUpdateIsCompletedForApiNames();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApiNameSelect = (apiName: string, apiUrl: string, apiMethod: string) => {
        setFormData(prev => ({
            ...prev,
            apiName1: apiName,
            apiUrl: apiUrl,
            apiMethod: apiMethod
        }));
    };

    const handleToggleCompletion = async (apiId: number, isCompleted: boolean) => {
        try {
            updateCompletionMutation.mutate(
                { id: apiId, isCompleted: isCompleted },
                {
                    onSuccess: () => {
                        toast.success('API 상태가 업데이트되었습니다.');
                    },
                    onError: () => {
                        toast.error('API 상태 업데이트 중 오류가 발생했습니다.');
                    }
                }
            );
        } catch (error) {
            console.error('API 상태 업데이트 오류:', error);
            toast.error('API 상태 업데이트에 실패했습니다.');
        }
    };

    const generateCode = () => {
        if (!formData.apiName1.trim()) {
            toast.error('API 이름을 입력해주세요.');
            return;
        }

        const apiName = formData.apiName1.charAt(0).toUpperCase() + formData.apiName1.slice(1);

        const code1 = `${formData.apiName1}: {
  method: ApiMethod.${formData.apiMethod},
  endpoint: '${formData.apiUrl}',
  authenticated: true
},`;

        const code2 = `static ${formData.apiName1}(dto: IRequestDtoFor${apiName})
  : Promise<IResponseDtoFor${apiName}> {
  return HttpClient.${formData.apiMethod.toLowerCase() === 'get' ? 'get' : 'command'}(api.${formData.apiName1}, dto);
}`;

        const code3 = `export interface IRequestDtoFor${apiName} {}`;
        const code4 = `export interface IResponseDtoFor${apiName} {}`;

        setGeneratedCode1(code1);
        setGeneratedCode2(code2);
        setGeneratedCode3(code3);
        setGeneratedCode4(code4);

        toast.success('코드가 생성되었습니다.');
    };

    const copyToClipboard = async (text: string, codeKey: keyof typeof copyStates) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyStates(prev => ({ ...prev, [codeKey]: true }));
            toast.success('클립보드에 복사되었습니다.');

            setTimeout(() => {
                setCopyStates(prev => ({ ...prev, [codeKey]: false }));
            }, 2000);
        } catch (error) {
            toast.error('복사에 실패했습니다.');
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6">
            <div className="flex gap-6 h-full">
                {/* 왼쪽 패널 (40%) */}
                <div className="w-[40%]">
                    <Card className="border-0 shadow-lg bg-white h-full">
                        <CardHeader className="border-b bg-gray-50/50 px-6 py-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                                API 코드 생성기
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {[{ name: 'apiName1', label: 'API 이름', placeholder: 'createPost' }, { name: 'apiUrl', label: 'API URL', placeholder: '/api/posts' }, { name: 'apiMethod', label: 'Method', placeholder: 'Get' }].map(({ name, label, placeholder }) => (
                                        <div key={name} className="flex items-center gap-4">
                                            <label className="w-28 text-sm font-medium text-gray-600">
                                                {label}:
                                            </label>
                                            <Input
                                                name={name}
                                                value={formData[name as keyof ApiFormData]}
                                                onChange={handleInputChange}
                                                className="flex-1 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder={placeholder}
                                            />
                                        </div>
                                    ))}

                                    <Button
                                        onClick={generateCode}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 shadow-sm transition-all duration-200"
                                    >
                                        API 함수 및 타입으로 변환
                                    </Button>
                                </div>

                                <div className="space-y-4 mt-8">
                                {
                                    [
                                        { title: '요청 타입 정의', code: generatedCode3, key: 'code3', hasDialogButtonForChatbot: true }, 
                                        { title: '응답 타입 정의', code: generatedCode4, key: 'code4', hasDialogButtonForChatbot: true },
                                        { title: 'API 정의', code: generatedCode1, key: 'code1', hasDialogButtonForChatbot: false }, 
                                        { title: '메서드 정의', code: generatedCode2, key: 'code2', hasDialogButtonForChatbot: false }
                                    ].map((block) => (
                                        <ICodeBlockForApiUtil
                                            key={block.key}
                                            title={block.title}
                                            code={block.code}
                                            codeKey={block.key as keyof typeof copyStates}
                                            copyToClipboard={(text, key) => copyToClipboard(text, key as keyof typeof copyStates)}
                                            copyStates={copyStates}
                                            hasDialogButtonForChatbot={block.hasDialogButtonForChatbot}
                                        />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 구분선 */}
                <div className="w-px bg-gray-200 self-stretch" />

                {/* 오른쪽 패널 (60%) */}
                <div className="w-[60%]">
                    <ITableForApiNameList
                        onSelect={handleApiNameSelect}
                        onToggleCompletion={handleToggleCompletion}
                    />
                </div>
            </div>
        </div>
    );
};

export default ApiConverterComponent;