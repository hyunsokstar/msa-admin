import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CommonButton from '@/components/common/CommonButton';

interface DialogButtonProps {
  parentId: string;
  parentName: string;
}

export const DialogButtonForCreateDevSpecForProfilePage = ({ parentId, parentName }: DialogButtonProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add node to parent:', { parentId, name });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="ghost"
          size="icon"
          className="h-6 w-6 min-w-[24px] bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Plus className="h-3 w-3 text-gray-500" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{parentName}에 새 항목 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="새 항목 이름을 입력하세요"
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
              추가
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};