import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonacoEditor from '@monaco-editor/react';
import { ApiSpec } from '@/api/apiForApiSpec';
import { useApiForUpdateApiSpec } from '@/hook/useApiForUpdateApiSpec';
import { Edit2 } from 'lucide-react';

interface IDialogButtonForUpdateApiSpecProps {
  spec: ApiSpec;
  onSuccess?: () => void;
}

const SERVICE_OPTIONS = [
  { value: 'BOARD', label: '게시판' },
  { value: 'CMS', label: 'CMS' },
  { value: 'LMS', label: 'LMS' },
  { value: 'SHOPPING_MALL', label: '쇼핑몰' },
  { value: 'USER', label: '사용자' }
] as const;

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const IDialogButtonForUpdateApiSpec: React.FC<IDialogButtonForUpdateApiSpecProps> = ({
  spec,
  onSuccess
}) => {
  const [open, setOpen] = useState(false);
  const updateApiSpec = useApiForUpdateApiSpec();
  const [formData, setFormData] = useState<Partial<ApiSpec>>(spec);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const validateJson = (value: string): boolean => {
    try {
      if (value) {
        JSON.parse(value);
      }
      setJsonError(null);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setJsonError(e.message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.request_body_schema) {
      if (!validateJson(formData.request_body_schema)) {
        return;
      }
    }

    updateApiSpec.mutate(
      {
        id: spec.id,
        updates: {
          ...formData,
          request_body_schema: formData.request_body_schema
            ? JSON.parse(formData.request_body_schema)
            : null,
        }
      },
      {
        onSuccess: () => {
          setOpen(false);
          onSuccess?.();
        }
      }
    );
  };

  const handleChange = (field: keyof ApiSpec, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    setFormData(spec);
    setJsonError(null);
    setOpen(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      request_body_schema: value || ''
    }));
    if (value) {
      validateJson(value);
    } else {
      setJsonError(null);
    }
  };

  const getInitialJsonValue = () => {
    if (!spec.request_body_schema) return '';
    try {
      return typeof spec.request_body_schema === 'string'
        ? spec.request_body_schema
        : JSON.stringify(spec.request_body_schema, null, 2);
    } catch {
      return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 font-medium hover:bg-gray-100 focus:ring focus:ring-blue-500 transition-all duration-200"
        >
          <Edit2 className="h-4 w-4" />
          수정
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[98vw] max-h-[98vh] w-full h-full sm:max-w-full sm:max-h-full sm:w-[98vw] sm:h-[98vh] bg-white p-0 shadow-2xl rounded-lg overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b bg-gray-50 sticky top-0 z-10">
          <DialogTitle className="text-lg font-semibold">API 스펙 수정</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row flex-1 h-full overflow-hidden">
          {/* Left Column - Form */}
          <div className="w-full sm:w-1/2 p-6 overflow-y-auto border-r space-y-4">
            <Input
              value={formData.title || ''}
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
                  {HTTP_METHODS.map((method) => (
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
              value={formData.endpoint || ''}
              onChange={(e) => handleChange('endpoint', e.target.value)}
              placeholder="/api/v1/example"
              required
              className="w-full bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                value={formData.category1 || ''}
                onChange={(e) => handleChange('category1', e.target.value)}
                placeholder="카테고리1"
                className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
              />

              <Input
                value={formData.category2 || ''}
                onChange={(e) => handleChange('category2', e.target.value)}
                placeholder="카테고리2"
                className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
              />
            </div>

            <Textarea
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="API 설명"
              className="bg-white border-gray-200 hover:border-gray-300 focus:ring focus:ring-blue-500 transition-colors"
            />

            <div className="space-y-2">
              <div className="h-64 border rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="json"
                  value={getInitialJsonValue()}
                  onChange={handleEditorChange}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: 'off',
                    folding: true,
                    formatOnPaste: true,
                    formatOnType: true,
                    automaticLayout: true,
                    tabSize: 2,
                  }}
                />
              </div>
              {jsonError && (
                <p className="text-sm text-red-500 mt-1">{jsonError}</p>
              )}
            </div>

            <div className="flex items-center">
              <Switch
                id="auth-required-switch"
                checked={!!formData.auth_required}
                onCheckedChange={(checked: boolean) => handleChange('auth_required', checked)}
                className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-200"
              />
              <label htmlFor="auth-required-switch" className="ml-2 text-sm font-medium">인증 필요</label>
            </div>
          </div>

          {/* Right Column - Tabs for Type Definitions */}
          <div className="w-full sm:w-1/2 p-6 bg-gray-50 overflow-hidden flex flex-col">
            <Tabs defaultValue="request" className="flex-1 flex flex-col">
              <TabsList className="flex w-full p-1 bg-white rounded-lg border-2 shadow-sm mb-6 gap-2">
                <TabsTrigger
                  value="request"
                  className="flex-1 py-3 text-sm font-medium rounded-md transition-all duration-200
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white
                    hover:bg-blue-50"
                >
                  Request Type
                </TabsTrigger>
                <TabsTrigger
                  value="response"
                  className="flex-1 py-3 text-sm font-medium rounded-md transition-all duration-200
                    data-[state=active]:bg-blue-600 data-[state=active]:text-white
                    hover:bg-blue-50"
                >
                  Response Type
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 relative">
                <TabsContent value="request" className="absolute inset-0">
                  <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
                    <MonacoEditor
                      height="100%"
                      defaultLanguage="typescript"
                      value={formData.request_type || ''}
                      onChange={(value) => handleChange('request_type', value || '')}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'off',
                        folding: true,
                        formatOnPaste: true,
                        formatOnType: true,
                        automaticLayout: true,
                        tabSize: 2,
                      }}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="response" className="absolute inset-0">
                  <div className="h-full border rounded-lg overflow-hidden bg-white shadow-sm">
                    <MonacoEditor
                      height="100%"
                      defaultLanguage="typescript"
                      value={formData.response_type || ''}
                      onChange={(value) => handleChange('response_type', value || '')}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: 'off',
                        folding: true,
                        formatOnPaste: true,
                        formatOnType: true,
                        automaticLayout: true,
                        tabSize: 2,
                      }}
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        <div className="px-6 py-4 bg-white border-t flex justify-end gap-4 sticky bottom-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateApiSpec.isPending}
            className="min-w-[120px] py-2 px-4 text-sm font-medium bg-white hover:bg-gray-50 border-2 border-gray-300 rounded-lg"
          >
            취소
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={updateApiSpec.isPending || !!jsonError}
            className="min-w-[120px] py-2 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg"
          >
            {updateApiSpec.isPending ? '수정 중...' : '수정'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForUpdateApiSpec;