'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, X } from 'lucide-react';
import Editor from '@monaco-editor/react';
import useApiForCreateApiSpec from '@/hook/useApiForCreateApiSpec';
import { ApiSpec } from '@/types/typeForApiSpec';

interface IDialogButtonForCreateApiSpecProps {
  onSuccess?: () => void;
  triggerButtonText?: string;
}

interface IFormData extends Partial<ApiSpec> {
  title: string;
  method: string;
  endpoint: string;
  description: string;
  category1: string;
  category2: string;
  auth_required: boolean;
  request_body_schema: string;
  request_type: string;
  response_type: string;
}

const INITIAL_FORM_DATA: IFormData = {
  title: '',
  method: 'GET',
  endpoint: '',
  description: '',
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
        <Button
          size="sm"
          variant="outline"
          className="gap-2 font-medium bg-white hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4" />
          {triggerButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="fixed inset-0 flex flex-col w-full h-full max-w-[98vw] max-h-[98vh] bg-white p-0 shadow-2xl rounded-lg overflow-hidden"
        aria-labelledby="dialog-title"
      >
        {/* Modal Header */}
        <DialogHeader className="px-6 py-4 border-b bg-white sticky top-0 z-50 flex justify-between items-center">
          <DialogTitle id="dialog-title" className="text-xl font-semibold text-gray-900">
            API 스펙 추가
          </DialogTitle>
          <button onClick={handleCancel} className="text-gray-600 hover:text-gray-900">
            <X className="w-6 h-6" />
          </button>
        </DialogHeader>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col sm:flex-row h-full overflow-hidden">
          {/* Left Column - Form */}
          <div className="w-full sm:w-1/2 p-6 overflow-y-auto border-r space-y-5">
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="API 제목"
              required
            />

            <Select value={formData.method} onValueChange={(value) => handleChange('method', value)}>
              <SelectTrigger>
                <SelectValue placeholder="HTTP 메소드 선택" />
              </SelectTrigger>
              <SelectContent>
                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
                  <SelectItem key={method} value={method}>{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              value={formData.endpoint}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              placeholder="/api/v1/example"
              required
            />

            <Label className="text-sm font-medium">Request Body Schema</Label>
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

            <div className="flex items-center justify-between py-4">
              <Label>인증 필요 여부</Label>
              <Switch
                checked={formData.auth_required}
                onCheckedChange={(checked) => handleChange('auth_required', checked)}
              />
            </div>
          </div>

          {/* Right Column - Type Definitions */}
          <div className="w-full sm:w-1/2 p-6 bg-gray-50 overflow-y-auto">
            <Tabs defaultValue="request" className="h-full flex flex-col">
              <TabsList className="flex w-full p-1 bg-white rounded-lg border-2 shadow-sm mb-6 gap-2">
                <TabsTrigger value="request">Request Type</TabsTrigger>
                <TabsTrigger value="response">Response Type</TabsTrigger>
              </TabsList>

              <TabsContent value="request">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={formData.request_type}
                  onChange={(value) => handleChange('request_type', value)}
                  options={EDITOR_OPTIONS}
                  theme="vs-light"
                />
              </TabsContent>

              <TabsContent value="response">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  value={formData.response_type}
                  onChange={(value) => handleChange('response_type', value)}
                  options={EDITOR_OPTIONS}
                  theme="vs-light"
                />
              </TabsContent>
            </Tabs>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-white border-t flex justify-end gap-4">
          <Button variant="outline" onClick={handleCancel}>취소</Button>
          <Button type="submit" onClick={handleSubmit} disabled={createApiSpec.isPending}>
            {createApiSpec.isPending ? '생성 중...' : '생성'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateApiSpec;
