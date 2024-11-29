"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ApiFormData {
    apiName1: string;
    apiUrl: string;
    httpMethod: 'Get' | 'Post' | 'Put' | 'Delete';
}

const ApiConverterComponent = () => {
    const [formData, setFormData] = useState<ApiFormData>({
        apiName1: '',
        apiUrl: '/api/shop/v1/admin/coupon/issue',
        httpMethod: 'Get'
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleMethodChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            httpMethod: value as ApiFormData['httpMethod']
        }));
    };

    const generateCode = () => {
        if (!formData.apiName1.trim()) {
            toast.error('API 이름을 입력해주세요.');
            return;
        }

        const apiName = formData.apiName1.charAt(0).toUpperCase() + formData.apiName1.slice(1);

        const code1 = `${formData.apiName1}: {
  method: ApiMethod.${formData.httpMethod},
  endpoint: '${formData.apiUrl}',
  authenticated: true
},`;

        const code2 = `static ${formData.apiName1}(dto: IRequestDtoFor${apiName})
  : Promise<IResponseDtoFor${apiName}> {
  return HttpClient.command(api.issueShopCoupon, dto);
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
        try {
            await navigator.clipboard.writeText(text);
            setCopyStates(prev => ({ ...prev, [codeKey]: true }));
            toast.success('코드가 클립보드에 복사되었습니다!');

            setTimeout(() => {
                setCopyStates(prev => ({ ...prev, [codeKey]: false }));
            }, 2000);
        } catch (err) {
            toast.error('복사에 실패했습니다.');
        }
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
        <div className="relative">
            <div className="font-medium mb-2">
                {title}
            </div>
            <div className="bg-gray-100 p-4 rounded-lg relative">
                <div className="pr-24">
                    <pre className="whitespace-pre-wrap text-sm font-mono">{code}</pre>
                </div>
                {code && (
                    <div className="absolute top-2 right-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className={`flex items-center gap-2 ${
                                copyStates[codeKey]
                                    ? 'bg-green-100 hover:bg-green-200'
                                    : 'bg-white hover:bg-gray-100'
                            } transition-all duration-200 active:scale-95`}
                            onClick={() => copyToClipboard(code, codeKey)}
                        >
                            {copyStates[codeKey] ? (
                                <>
                                    <Check className="h-4 w-4" />
                                    <span>복사됨</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    <span>복사</span>
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-4xl p-4 space-y-4">
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
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="w-24 text-sm font-medium text-gray-700">Method:</label>
                            <RadioGroup
                                defaultValue="Get"
                                value={formData.httpMethod}
                                onValueChange={handleMethodChange}
                                className="flex gap-4"
                            >
                                {['Get', 'Post', 'Put', 'Delete'].map((method) => (
                                    <div key={method} className="flex items-center space-x-2">
                                        <RadioGroupItem value={method} id={method} />
                                        <Label htmlFor={method}>{method}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        <Button
                            onClick={generateCode}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 active:scale-95"
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
    );
};

export default ApiConverterComponent;
