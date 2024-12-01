"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ITableForApiNameList from '@/components/ApiConverterComponent/ITableForApiNameList';
import useApiForUpdateIsCompletedForApiNames from "@/hook/useApiForUpdateIsCompletedForApiNames";

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
                        toast.success('API 상태가 성공적으로 업데이트되었습니다!');
                    },
                    onError: () => {
                        toast.error('API 상태 업데이트 중 오류가 발생했습니다.');
                    }
                }
            );
        } catch (error) {
            console.error('API 상태 업데이트 중 오류 발생:', error);
            toast.error('API 상태 업데이트 중 오류가 발생했습니다.');
        }
    };

    const generateCode = () => {
        if (!formData.apiName1.trim()) {
            toast.error('API 이름을 입력해주세요.');
            return;
        }

        const apiName = formData.apiName1.charAt(0) + formData.apiName1.slice(1);

        const code1 = `${formData.apiName1}: {
  method: ApiMethod.${formData.apiMethod},
  endpoint: '${formData.apiUrl}',
  authenticated: true
},`;

        const code2 = `static ${formData.apiName1}(dto: IRequestDtoFor${apiName})
  : Promise<IResponseDtoFor${apiName}> {
  return HttpClient.${formData.apiMethod === 'Get' ? 'get' : 'command' }(api.${formData.apiName1}, dto);
}`;

        const code3 = `export interface IRequestDtoFor${apiName} {}`;
        const code4 = `export interface IResponseDtoFor${apiName} {}`;

        setGeneratedCode1(code1);
        setGeneratedCode2(code2);
        setGeneratedCode3(code3);
        setGeneratedCode4(code4);

        toast.success('코드가 성공적으로 생성되었습니다!');
    };

    const copyToClipboard = async (text: string, codeKey: keyof typeof copyStates) => {
        await navigator.clipboard.writeText(text);
        setCopyStates(prev => ({ ...prev, [codeKey]: true }));
        toast.success('코드가 클립보드에 복사되었습니다!');

        setTimeout(() => {
            setCopyStates(prev => ({ ...prev, [codeKey]: false }));
        }, 2000);
    };

    const CodeBlock = ({
                           title,
                           code,
                           codeKey
                       }: {
        title: string;
        code: string;
        codeKey: keyof typeof copyStates;
    }) => (
        <div className="mb-4">
            <div className="font-medium mb-2">{title}</div>
            <div className="bg-gray-100 p-4 rounded-lg relative">
                <div className="flex justify-between items-start">
                    <pre className="whitespace-pre-wrap text-sm font-mono pr-12">{code}</pre>
                    {code && (
                        <Button
                            variant="secondary"
                            size="sm"
                            className={`ml-2 h-8 ${copyStates[codeKey] ? 'bg-green-100' : 'bg-gray-200'}`}
                            onClick={() => copyToClipboard(code, codeKey)}
                        >
                            {copyStates[codeKey] ? (
                                <Check className="h-4 w-4 text-green-600" />
                            ) : (
                                <Copy className="h-4 w-4 text-gray-600" />
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-7xl p-4 grid grid-cols-2 gap-4">
            <div className="border-r pr-4">
                <ToastContainer />
                <Card className="border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">API 코드 생성기</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <label className="w-24 text-sm font-medium text-gray-700">API 이름:</label>
                                <Input
                                    name="apiName1"
                                    value={formData.apiName1}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                    placeholder="createPost"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="w-24 text-sm font-medium text-gray-700">API URL:</label>
                                <Input
                                    name="apiUrl"
                                    value={formData.apiUrl}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                    placeholder="api url"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="w-24 text-sm font-medium text-gray-700">Method:</label>
                                <Input
                                    name="apiMethod"
                                    value={formData.apiMethod}
                                    onChange={handleInputChange}
                                    className="flex-1"
                                    placeholder="Get"
                                />
                            </div>

                            <Button
                                onClick={generateCode}
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                            >
                                api 함수 및 타입으로 변환
                            </Button>
                        </div>

                        <div className="space-y-6 mt-6">
                            <CodeBlock title="API 정의" code={generatedCode1} codeKey="code1" />
                            <CodeBlock title="메서드 정의" code={generatedCode2} codeKey="code2" />
                            <CodeBlock title="요청 타입 정의" code={generatedCode3} codeKey="code3" />
                            <CodeBlock title="응답 타입 정의" code={generatedCode4} codeKey="code4" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="pl-4">
                <ITableForApiNameList onSelect={handleApiNameSelect} onToggleCompletion={handleToggleCompletion} />
            </div>
        </div>
    );
};

export default ApiConverterComponent;
