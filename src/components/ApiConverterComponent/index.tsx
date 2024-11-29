"use client";

import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Copy} from 'lucide-react';

interface ApiFormData {
    apiName1: string;
    apiUrl: string;
}

const ApiConverterComponent = () => {
    const [formData, setFormData] = useState<ApiFormData>({
        apiName1: '', apiUrl: '/api/shop/v1/admin/coupon/issue'
    });

    const [generatedCode1, setGeneratedCode1] = useState('');
    const [generatedCode2, setGeneratedCode2] = useState('');
    const [generatedCode3, setGeneratedCode3] = useState('');
    const [generatedCode4, setGeneratedCode4] = useState('');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    };

    const generateCode = () => {
        console.log("generateCode 가 실행됨")
        // Generate first code block
        const code1 = `${formData.apiName1}: {
  method: ApiMethod.Post,
  endpoint: '${formData.apiUrl}',
  authenticated: true
},`;

        // Generate second code block
        const apiName2 = formData.apiName1.charAt(0).toUpperCase() + formData.apiName1.slice(1);
        const code2 = `static ${formData.apiName1}(dto: IRequestDtoFor${apiName2})
  : Promise<IResponseDtoFor${apiName2}> {
  return HttpClient.command(api.issueShopCoupon, dto);
}`;

        const apiName3 = formData.apiName1.charAt(0).toUpperCase() + formData.apiName1.slice(1);
        const code3 = `export interface IRequestDtoFor${apiName3} {}`;

        const apiName4 = formData.apiName1.charAt(0).toUpperCase() + formData.apiName1.slice(1);
        const code4 = `export interface IRequestDtoFor${apiName4} {}`;

        setGeneratedCode1(code1);
        setGeneratedCode2(code2);
        setGeneratedCode3(code3);
        setGeneratedCode4(code4);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (<div className="w-full max-w-4xl p-4 space-y-4">
        <Card>
            <CardContent className="pt-6">
                <div className="grid gap-4">
                    <div className="flex items-center gap-2">
                        <label className="w-24">apiName1:</label>
                        <Input
                            name="apiName1"
                            value={formData.apiName1}
                            onChange={handleInputChange}
                            className="flex-1"
                            placeholder="createPost"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="w-24">apiUrl:</label>
                        <Input
                            name="apiUrl"
                            value={formData.apiUrl}
                            onChange={handleInputChange}
                            className="flex-1"
                        />
                    </div>
                    <Button onClick={generateCode}>변환</Button>

                    <div className="mt-4 space-y-4">
                        <div className="relative">
                            <div className="font-medium mb-2">함수-1</div>
                            <div className="bg-gray-100 p-4 rounded-lg relative">
                                <pre className="whitespace-pre-wrap">{generatedCode1}</pre>
                                {generatedCode1 && (<Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(generatedCode1)}
                                >
                                    <Copy className="w-4 h-4"/>
                                </Button>)}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="font-medium mb-2">함수-2</div>
                            <div className="bg-gray-100 p-4 rounded-lg relative">
                                <pre className="whitespace-pre-wrap">{generatedCode2}</pre>
                                {generatedCode2 && (<Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => copyToClipboard(generatedCode2)}
                                >
                                    <Copy className="w-4 h-4"/>
                                </Button>)}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="font-medium mb-2">요청 타입</div>
                        <div className="bg-gray-100 p-4 rounded-lg relative">
                            <pre className="whitespace-pre-wrap">{generatedCode3}</pre>
                            {generatedCode3 && (<Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(generatedCode3)}
                            >
                                <Copy className="w-4 h-4"/>
                            </Button>)}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="font-medium mb-2">응답 타입</div>
                        <div className="bg-gray-100 p-4 rounded-lg relative">
                            <pre className="whitespace-pre-wrap">{generatedCode4}</pre>
                            {generatedCode4 && (<Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => copyToClipboard(generatedCode4)}
                            >
                                <Copy className="w-4 h-4"/>
                            </Button>)}
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    </div>);
};

export default ApiConverterComponent;
