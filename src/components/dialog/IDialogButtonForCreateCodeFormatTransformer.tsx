import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useApiForCreateCodeTransformFormat } from '@/hook/useApiForCreateCodeTransformFormat';
import MonacoEditor from '@monaco-editor/react';

interface FormState {
  name: string;
  trans_format: string;
  description: string;
  placeholder: string;
}

const IDialogButtonForCreateCodeFormatTransformer = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    trans_format: '',
    description: '',
    placeholder: '',
  });

  const createMutation = useApiForCreateCodeTransformFormat();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, trans_format: value || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync(formData);
      setFormData({
        name: '',
        trans_format: '',
        description: '',
        placeholder: '',
      });
      setOpen(false);
    } catch (error) {
      // 에러는 mutation에서 처리됨
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-2 mr-2" />
          변환 포맷 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>새 변환 포맷 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">이름</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Request Type"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">변환 포맷 (name, method, endpoint)</label>
            <MonacoEditor
              height="150px"
              language="typescript"
              value={formData.trans_format}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="요청 타입 정의"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">플레이스홀더</label>
            <Input
              name="placeholder"
              value={formData.placeholder}
              onChange={handleInputChange}
              placeholder="createUser"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? '생성 중...' : '생성'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateCodeFormatTransformer;
