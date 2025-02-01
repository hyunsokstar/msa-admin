import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, X } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
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
  writerEmail: string;
}

export const IDialogButtonForEditNoteCollection = ({
  collectionId,
  initialName,
  writerEmail,
}: IDialogButtonForEditNoteCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();
  const updateMutation = useApiForUpdateNoteCollection();

  // 권한 체크 로직
  const isAuthenticated = !!user;
  const isAuthorized = user?.email === writerEmail || user?.is_admin;
  const isDisabled = !isAuthenticated || !isAuthorized || updateMutation.isPending;

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

  // 툴팁 메시지 결정
  const getTooltipMessage = () => {
    if (!isAuthenticated) return '로그인이 필요합니다';
    if (!isAuthorized) return '수정 권한이 없습니다';
    return '';
  };

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
    <div className="relative group">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CommonButton
            size="icon"
            variant="ghost"
            className={`h-8 w-8 ${isDisabled
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 hover:text-slate-900 hover:bg-gray-200'
              }`}
            disabled={isDisabled}
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
                className={`w-full ${errors.name
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
      {isDisabled && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded 
          opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          {getTooltipMessage()}
        </div>
      )}
    </div>
  );
};