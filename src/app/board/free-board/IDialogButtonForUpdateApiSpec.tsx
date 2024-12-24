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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edit2 } from 'lucide-react';
import { ApiSpec } from '@/api/apiForApiSpec';
import { useApiForUpdateApiSpec } from '@/hook/useApiForUpdateApiSpec';
import MonacoEditor from '@monaco-editor/react';
import { cn } from "@/lib/utils";

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
    
    // Validate JSON before submitting
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

  // Format JSON string for initial editor value
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
          variant="ghost" 
          size="sm"
          className="hover:bg-gray-100"
        >
          <Edit2 className="h-4 w-4 mr-2" />
          수정
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">API 스펙 수정</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>제목</Label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="API 제목"
              className="border-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>서비스</Label>
            <RadioGroup
              value={formData.service_name}
              onValueChange={(value) => handleChange('service_name', value)}
              className="grid grid-cols-3 gap-4"
            >
              {SERVICE_OPTIONS.map((service) => (
                <div key={service.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={service.value} id={service.value} />
                  <Label 
                    htmlFor={service.value}
                    className="text-sm text-gray-700"
                  >
                    {service.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>HTTP 메소드</Label>
              <Select
                value={formData.method}
                onValueChange={(value) => handleChange('method', value)}
              >
                <SelectTrigger className="w-full border border-gray-300 bg-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20">
                  <SelectValue placeholder="HTTP 메소드 선택" className="text-gray-500" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md">
                  {HTTP_METHODS.map((method) => (
                    <SelectItem 
                      key={method} 
                      value={method}
                      className={cn(
                        "py-2.5 pl-3 pr-9 text-sm font-medium cursor-pointer transition-colors",
                        "hover:bg-gray-50 hover:text-blue-600",
                        "focus:bg-gray-50 focus:text-blue-600",
                        "data-[selected]:bg-blue-50 data-[selected]:text-blue-600",
                        formData.method === method && "bg-blue-50 text-blue-600"
                      )}
                    >
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>엔드포인트</Label>
              <Input
                value={formData.endpoint}
                onChange={(e) => handleChange('endpoint', e.target.value)}
                placeholder="/api/v1/example"
                className="border-gray-300"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>카테고리1</Label>
              <Input
                value={formData.category1}
                onChange={(e) => handleChange('category1', e.target.value)}
                placeholder="카테고리1"
                className="border-gray-300"
              />
            </div>
            
            <div className="space-y-2">
              <Label>카테고리2</Label>
              <Input
                value={formData.category2}
                onChange={(e) => handleChange('category2', e.target.value)}
                placeholder="카테고리2"
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>설명</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="API 설명"
              className="border-gray-300 min-h-[80px]"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Request Body 스키마</Label>
            <div className="border rounded-md border-gray-300">
              <MonacoEditor
                height="200px"
                language="json"
                theme="light"
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

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.auth_required}
              onCheckedChange={(checked: boolean) => handleChange('auth_required', checked)}
            />
            <Label className="text-sm">인증 필요</Label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={updateApiSpec.isPending}
              className="border-gray-300"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={updateApiSpec.isPending || !!jsonError}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateApiSpec.isPending ? '수정 중...' : '수정'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForUpdateApiSpec;