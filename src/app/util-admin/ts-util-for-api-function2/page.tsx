// src/app/transform/page.tsx
"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransformInputs } from '@/types/typeForTransform';
import { toast } from 'react-toastify';
import { useApiForTransformStyles } from '@/hook/useApiForTransformStyles';
import { apiForApplyTransform } from '@/api/apiForCodeTransFormWithPostGresDb';
import TransformResponse from '@/components/ITransformResponse';
import IDialogButtonForCreateCodeFormatTransformer from '@/components/dialog/IDialogButtonForCreateCodeFormatTransformer';
import ITableForApiNameList from '@/components/ApiConverterComponent/ITableForApiNameList';

export default function TransformPage() {
  const { data: styles, isLoading } = useApiForTransformStyles();
  const [inputs, setInputs] = useState<TransformInputs>({
    name: '',
    method: '',
    endpoint: '',
  });
  const [generatedCodes, setGeneratedCodes] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ITableForApiNameList의 onSelect 핸들러
  const handleApiNameSelect = (apiName: string, apiUrl: string, apiMethod: string) => {
    setInputs({
      name: apiName,
      endpoint: apiUrl,
      method: apiMethod,
    });
  };

  // ITableForApiNameList의 onToggleCompletion 핸들러
  const handleToggleCompletion = async (apiId: number, isCompleted: boolean) => {
    // 기존 토글 로직 유지
  };

  const handleTransform = () => {
    if (!inputs.name) {
      toast.error('이름을 입력해주세요.');
      return;
    }

    const newCodes: {[key: string]: string} = {};
    
    styles?.forEach(style => {
      const code = apiForApplyTransform(style, {
        name: inputs.name,
        method: inputs.method,
        endpoint: inputs.endpoint
      });
      newCodes[style.id] = code;
    });

    setGeneratedCodes(newCodes);
    toast.success('코드가 생성되었습니다.');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="flex gap-6 h-full">
        <div className="w-1/2">
          <Card className="border-0 shadow-lg bg-white h-full">
            <CardHeader className="border-b bg-gray-50/50 px-6 py-4">
              <CardTitle className="text-lg font-semibold text-gray-800">
                코드 변환기
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    { name: 'name', label: 'API 이름', placeholder: 'createUser' },
                    { name: 'method', label: '메소드', placeholder: 'GET, POST' },
                    { name: 'endpoint', label: '엔드포인트', placeholder: '/api/users' }
                  ].map(({ name, label, placeholder }) => (
                    <div key={name} className="flex items-center gap-4">
                      <label className="w-28 text-sm font-medium text-gray-600">
                        {label}:
                      </label>
                      <Input
                        name={name}
                        value={inputs[name as keyof TransformInputs]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="flex-1"
                      />
                    </div>
                  ))}
                  
                  <Button 
                    onClick={handleTransform}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    변환
                  </Button>
                </div>

                <div className='flex justify-end'>
                  <IDialogButtonForCreateCodeFormatTransformer />
                </div>

                <div className="space-y-4">
                  {styles?.map(style => (
                    <TransformResponse
                      key={style.id}
                      style={style}
                      generatedCode={generatedCodes[style.id] || ''}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-px bg-gray-200 self-stretch" />

        <div className="w-1/2">
          <ITableForApiNameList
            onSelect={handleApiNameSelect}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>
      </div>
    </div>
  );
}