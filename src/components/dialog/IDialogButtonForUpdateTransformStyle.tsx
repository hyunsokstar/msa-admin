// src/components/IDialogButtonForUpdateTransformStyle.tsx
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
import { Textarea } from '@/components/ui/textarea';
import { Pencil } from 'lucide-react';
import { TransformStyle } from '@/types/typeForTransform';
import { useApiForUpdateTransformStyle } from '@/hook/useApiForUpdateTransformStyle';

interface Props {
  style: TransformStyle;
}

const IDialogButtonForUpdateTransformStyle = ({ style }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: style.name,
    trans_format: style.trans_format,
    description: style.description,
    placeholder: style.placeholder,
  });

  const updateMutation = useApiForUpdateTransformStyle();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateMutation.mutateAsync({
        id: style.id,
        data: formData
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
          className="ml-2"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>변환 포맷 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">이름</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">변환 포맷( name, method, endpoint )</label>
            <Textarea
              name="trans_format"
              value={formData.trans_format}
              onChange={handleInputChange}
              rows={9}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">플레이스홀더</label>
            <Input
              name="placeholder"
              value={formData.placeholder}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? '수정 중...' : '수정'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForUpdateTransformStyle;