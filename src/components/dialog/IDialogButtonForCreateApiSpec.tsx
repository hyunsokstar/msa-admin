    import React, { useState } from 'react';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Textarea } from "@/components/ui/textarea";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import { Switch } from "@/components/ui/switch";
    import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
    import { Label } from "@/components/ui/label";
    import { PlusCircle } from 'lucide-react';
    import { ApiSpec } from '@/api/apiForApiSpec';
    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { toast } from 'react-toastify';
    import { addApiSpec } from '@/api/apiForApiSpec';

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
    request_body_schema: any;
    }

    const SERVICE_OPTIONS = [
    { value: 'CMS', label: 'CMS' },
    { value: 'LMS', label: 'LMS' },
    { value: 'SHOPPING_MALL', label: '쇼핑몰' },
    { value: 'USER', label: '사용자' },
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
    request_body_schema: null
    };

    // API Hook with improved error handling
    const useApiForCreateApiSpec = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiSpec[], Error, Partial<ApiSpec>>({
        mutationFn: async (apiSpecData: Partial<ApiSpec>) => {
        try {
            const result = await addApiSpec(apiSpecData);
            if (!result) {
            throw new Error('API 스펙 생성에 실패했습니다.');
            }
            return result;
        } catch (error) {
            if (error instanceof Error) {
            throw error;
            }
            throw new Error('API 스펙 생성 중 오류가 발생했습니다.');
        }
        },
        onSuccess: () => {
        toast.success('API 스펙이 성공적으로 생성되었습니다.');
        queryClient.invalidateQueries({
            queryKey: ['apiSpecs'],
        });
        },
        onError: (error: Error) => {
        toast.error(error.message);
        }
    });
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

    const handleChange = (field: keyof IFormData, value: string | boolean) => {
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
            <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            {triggerButtonText}
            </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-5xl bg-white">
            <DialogHeader>
            <DialogTitle>API 스펙 추가</DialogTitle>
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

            <div className="grid grid-cols-1 gap-4">
                
                <div className="space-y-2">
                    <label className="text-sm font-medium">HTTP 메소드</label>
                    <Select
                        value={formData.method}
                        onValueChange={(value) => handleChange('method', value)}
                    >
                        <SelectTrigger className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <SelectValue placeholder="메소드를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
                        {['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map((method) => (
                            <SelectItem
                            key={method}
                            value={method}
                            className="hover:bg-gray-100 cursor-pointer px-3 py-2 text-sm text-gray-700 data-[state=checked]:bg-blue-100 data-[state=checked]:text-blue-600"
                            >
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
                    value={formData.request_body_schema || ''}
                    onChange={(e) => handleChange('request_body_schema', e.target.value)}
                    placeholder="Request body schema in JSON format"
                    rows={5}
                    className="font-mono whitespace-pre-wrap" // whitespace-pre-wrap 추가
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
                disabled={createApiSpec.isPending}
                >
                취소
                </Button>
                <Button
                type="submit"
                disabled={createApiSpec.isPending}
                >
                {createApiSpec.isPending ? '생성 중...' : '생성'}
                </Button>
            </div>
            </form>
        </DialogContent>
        </Dialog>
    );
    };

    export default IDialogButtonForCreateApiSpec;