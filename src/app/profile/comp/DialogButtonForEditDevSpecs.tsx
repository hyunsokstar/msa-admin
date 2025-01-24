import { useState } from 'react';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PersonalDevSpec } from '@/types/typeForProfile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CommonButton from '@/components/common/CommonButton';

interface DialogButtonProps {
  spec?: PersonalDevSpec;
}

export const DialogButtonForEditDevSpecs = ({ spec }: DialogButtonProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(spec?.name ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API 호출 로직
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="outline"
          size="icon"
          className="h-8 w-8 min-w-[32px] bg-white"
        >
          <Pencil className="h-4 w-4 text-gray-500" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{spec ? '개발 스펙 수정' : '새 개발 스펙 추가'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="스펙 이름을 입력하세요"
              className="bg-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <CommonButton
              type="button" 
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-white"
            >
              취소
            </CommonButton>
            <CommonButton
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {spec ? '수정' : '추가'}
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};