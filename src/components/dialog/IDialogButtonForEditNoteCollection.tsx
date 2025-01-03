// src/components/dialog/IDialogButtonForEditNoteCollection.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, X } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';
import { z } from 'zod';
import { useApiForUpdateNoteCollection } from '@/hook/useApiForUpdateNoteCollection';

const updateNoteCollectionSchema = z.object({
  name: z.string()
    .min(1, '컬렉션 이름은 필수입니다.')
    .max(100, '컬렉션 이름은 100자를 초과할 수 없습니다.')
});

type UpdateNoteCollectionFormData = z.infer<typeof updateNoteCollectionSchema>;

interface IDialogButtonForEditNoteCollectionProps {
  collectionId: number;
  initialName: string;
}

export const IDialogButtonForEditNoteCollection = ({
  collectionId,
  initialName,
}: IDialogButtonForEditNoteCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateMutation = useApiForUpdateNoteCollection();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateNoteCollectionFormData>({
    resolver: zodResolver(updateNoteCollectionSchema),
    defaultValues: {
      name: initialName
    }
  });

  const onSubmit = async (formData: UpdateNoteCollectionFormData) => {
    try {
      await updateMutation.mutateAsync({
        id: collectionId,
        data: {
          name: formData.name
        }
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update note collection:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          size="icon"
          variant="ghost"
          className="h-8 w-8 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Pencil className="h-4 w-4" />
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader className="relative pb-4 border-b">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            노트 컬렉션 수정
          </DialogTitle>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
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
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              취소
            </CommonButton>
            <CommonButton
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
            >
              {updateMutation.isPending ? '수정 중...' : '수정'}
            </CommonButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};