// src/components/IDialogButtonForCreateNoteCollection.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import { createNoteCollectionSchema, CreateNoteCollectionFormData } from '@/types/typeForNoteCollections';
import useApiForCreateNoteCollection from '@/hook/notes/useApiForCreateNoteCollection';
import { useUserStore } from '@/store/useUserStore';

export const IDialogButtonForCreateNoteCollection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = useApiForCreateNoteCollection();
  const { user, isAuthenticated } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateNoteCollectionFormData>({
    resolver: zodResolver(createNoteCollectionSchema)
  });

  const handleDialogOpen = (open: boolean) => {
    if (open && !isAuthenticated) {
      toast.error('로그인이 필요한 기능입니다.');
      return;
    }
    setIsOpen(open);
  };

  const onSubmit = async (data: CreateNoteCollectionFormData) => {
    if (!user) {
      toast.error('로그인이 필요한 기능입니다.');
      setIsOpen(false);
      return;
    }

    try {
      await createMutation.mutateAsync({
        name: data.name,
        writer: user.id
      });
      setIsOpen(false);
      reset();
      // toast.success('노트 컬렉션이 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('Failed to create note collection:', error);
      toast.error('노트 컬렉션 생성에 실패했습니다.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          + 새 노트 컬렉션
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader className="relative pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            새 노트 컬렉션 만들기
          </DialogTitle>
          {/* <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button> */}
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label 
              htmlFor="name" 
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              컬렉션 이름
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="컬렉션 이름을 입력하세요"
              className={`w-full ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              } rounded-md shadow-sm`}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {createMutation.isPending ? '생성 중...' : '생성'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};