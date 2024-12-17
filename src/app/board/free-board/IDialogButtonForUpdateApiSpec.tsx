import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Edit2 } from 'lucide-react';
import { ApiSpec } from '@/api/apiForApiSpec';
import { useApiForUpdateApiSpec } from '@/hook/useApiForUpdateApiSpec';

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
];

export const IDialogButtonForUpdateApiSpec: React.FC<IDialogButtonForUpdateApiSpecProps> = ({ 
  spec,
  onSuccess 
}) => {
  const [open, setOpen] = useState(false);
  const updateApiSpec = useApiForUpdateApiSpec();
  const [formData, setFormData] = useState<Partial<ApiSpec>>(spec);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiSpec.mutate(
      { 
        id: spec.id, 
        updates: formData 
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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="h-4 w-4 mr-2" />
          수정
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-5xl bg-white">
        <DialogHeader>
          <DialogTitle>API 스펙 수정</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">제목</label>
            <Input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="API 제목"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">서비스</label>
            <RadioGroup
              value={formData.service_name}
              onValueChange={(value) => handleChange('service_name', value)}
              className="grid grid-cols-3 gap-4"
            >
              {SERVICE_OPTIONS.map((service) => (
                <div key={service.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={service.value} id={service.value} />
                  <Label htmlFor={service.value}>{service.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">HTTP 메소드</label>
              <Select
                value={formData.method}
                onValueChange={(value) => handleChange('method', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">엔드포인트</label>
              <Input
                value={formData.endpoint}
                onChange={(e) => handleChange('endpoint', e.target.value)}
                placeholder="/api/v1/example"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">카테고리1</label>
              <Input
                value={formData.category1}
                onChange={(e) => handleChange('category1', e.target.value)}
                placeholder="카테고리1"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">카테고리2</label>
              <Input
                value={formData.category2}
                onChange={(e) => handleChange('category2', e.target.value)}
                placeholder="카테고리2"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="API 설명"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Request Body 스키마</label>
            <Textarea
              value={formData.request_body_schema ? JSON.stringify(formData.request_body_schema, null, 2) : ''}
              onChange={(e) => {
                try {
                  const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                  handleChange('request_body_schema', parsed);
                } catch (error) {
                  handleChange('request_body_schema', e.target.value);
                }
              }}
              placeholder="Request body schema in JSON format"
              rows={5}
              className="font-mono"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.auth_required}
              onCheckedChange={(checked: boolean) => handleChange('auth_required', checked)}
            />
            <label className="text-sm font-medium">인증 필요</label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={updateApiSpec.isPending}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={updateApiSpec.isPending}
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