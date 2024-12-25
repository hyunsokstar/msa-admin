'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ApiSpec } from '@/api/apiForApiSpec';
import useApiForCreateApiSpec from '@/hook/useApiForCreateApiSpec';

interface IDialogButtonForCreateApiSpecProps {
  onSuccess?: () => void;
  triggerButtonText?: string;
}

interface IFormData extends Partial<ApiSpec> {
  title: string;
  method: string;
  endpoint: string;
  description: string;
  service_name: string;
  category1: string;
  category2: string;
  auth_required: boolean;
  request_body_schema: string;
  request_type: string;
  response_type: string;
}

const SERVICE_OPTIONS = [
  { value: 'CMS', label: 'CMS' },
  { value: 'LMS', label: 'LMS' },
  { value: 'SHOPPING_MALL', label: '쇼핑몰' },
  { value: 'USER', label: 'User' },
  { value: 'BOARD', label: '게시판' }
];

const INITIAL_FORM_DATA: IFormData = {
  title: '',
  method: 'GET',
  endpoint: '',
  description: '',
  service_name: 'USER',
  category1: '',
  category2: '',
  auth_required: false,
  request_body_schema: '{\n  \n}',
  request_type: 'interface IRequest {\n  \n}',
  response_type: 'interface IResponse {\n  \n}'
};

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  lineNumbers: "on" as const,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  fontSize: 14,
  tabSize: 2,
  fontFamily: "'JetBrains Mono', Consolas, 'Courier New', monospace",
  renderLineHighlight: 'all' as 'all',
  roundedSelection: true,
  padding: { top: 10, bottom: 10 },
};

export const IDialogButtonForCreateApiSpec: React.FC<IDialogButtonForCreateApiSpecProps> = ({ 
  onSuccess,
  triggerButtonText = "API 스펙 추가" 
}) => {
  const [open, setOpen] = useState(false);
  const createApiSpec = useApiForCreateApiSpec();
  const [formData, setFormData] = useState<IFormData>(INITIAL_FORM_DATA);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createApiSpec.mutate(formData, {
      onSuccess: () => {
        setFormData(INITIAL_FORM_DATA);
        setOpen(false);
        onSuccess?.();
      }
    });
  };

  const handleChange = (field: keyof IFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setFormData(INITIAL_FORM_DATA);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2 font-medium hover:bg-gray-100 focus:ring focus:ring-blue-500 transition-all duration-200">
          <PlusCircle className="h-4 w-4" />
          {triggerButtonText}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-[90vw] w-full h-[90vh] bg-white p-0 rounded-lg shadow-lg">
        <DialogHeader className="px-6 py-3 border-b bg-gray-50">
          <DialogTitle className="text-lg font-semibold">API 스펙 추가</DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 h-full overflow-hidden">
          {/* Left Column - Form */}
          <div className="w-1/2 p-6 overflow-y-auto border-r space-y-4">
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="API 제목"
              required
              className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
            />

            <div className="grid grid-cols-2 gap-4">
              <Select
                value={formData.service_name}
                onValueChange={(value) => handleChange('service_name', value)}
              >
                <SelectTrigger className="w-full bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors">
                  <SelectValue placeholder="서비스 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {SERVICE_OPTIONS.map((service) => (
                    <SelectItem 
                      key={service.value} 
                      value={service.value}
                      className="hover:bg-gray-100 cursor-pointer focus:bg-gray-100"
                    >
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.method}
                onValueChange={(value) => handleChange('method', value)}
              >
                <SelectTrigger className="w-full bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors">
                  <SelectValue placeholder="HTTP 메소드 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
                    <SelectItem 
                      key={method} 
                      value={method}
                      className="hover:bg-gray-100 cursor-pointer focus:bg-gray-100"
                    >
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              value={formData.endpoint}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              placeholder="/api/v1/example"
              required
              className="w-full bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                value={formData.category1}
                onChange={(e) => handleChange('category1', e.target.value)}
                placeholder="카테고리1"
                className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
              />
              
              <Input
                value={formData.category2}
                onChange={(e) => handleChange('category2', e.target.value)}
                placeholder="카테고리2"
                className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
              />
            </div>

            <Input
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="API 설명"
              className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
            />

            <div className="space-y-2">
              <div className="h-64 border rounded-lg overflow-hidden">
                <Editor
                  height="100%"
                  defaultLanguage="json"
                  value={formData.request_body_schema}
                  onChange={(value) => handleChange('request_body_schema', value)}
                  options={EDITOR_OPTIONS}
                  theme="vs-light"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Switch
                checked={formData.auth_required}
                onCheckedChange={(checked: boolean) => handleChange('auth_required', checked)}
                className="data-[state=checked]:bg-blue-600 focus:ring focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium">인증 필요</span>
            </div>
          </div>

          {/* Right Column - Type Definitions */}
          <div className="w-1/2 p-6 bg-gray-50 overflow-hidden flex flex-col">
            <Tabs defaultValue="request" className="flex-1 flex flex-col">
              <TabsList className="flex w-full p-1 bg-gray-200 rounded-lg border shadow-sm mb-6 gap-2">
                <TabsTrigger 
                  value="request" 
                  className="flex-1 py-3 text-sm font-medium rounded-md transition-all duration-200
                    data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm
                    hover:bg-gray-50"
                >
                  Request Type
                </TabsTrigger>
                <TabsTrigger 
                  value="response" 
                  className="flex-1 py-3 text-sm font-medium rounded-md transition-all duration-200
                    data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm
                    hover:bg-gray-50"
                >
                  Response Type
                </TabsTrigger>
              </TabsList>

              <TabsContent value="request" className="flex-1">
                <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    value={formData.request_type}
                    onChange={(value) => handleChange('request_type', value)}
                    options={EDITOR_OPTIONS}
                    theme="vs-light"
                  />
                </div>
              </TabsContent>

              <TabsContent value="response" className="flex-1">
                <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
                  <Editor
                    height="100%"
                    defaultLanguage="typescript"
                    value={formData.response_type}
                    onChange={(value) => handleChange('response_type', value)}
                    options={EDITOR_OPTIONS}
                    theme="vs-light"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-white border-t shadow-[0_-1px_2px_rgba(0,0,0,0.1)]">
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={createApiSpec.isPending}
              className="min-w-[120px] py-4 px-6 text-base font-medium bg-white hover:bg-gray-50 transition-all duration-200 border-gray-300"
            >
              취소
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={createApiSpec.isPending}
              className="min-w-[120px] py-4 px-6 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {createApiSpec.isPending ? '생성 중...' : '생성'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateApiSpec;
