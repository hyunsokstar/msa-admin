// src/components/dialog/IDialogButtonForCreateNote.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import useApiForCreateNote from '@/hook/notes/useApiForCreateNote';
import { useUserStore } from '@/store/useUserStore';
import { ICreateNoteData, CreateNoteFormData, createNoteSchema } from '@/types/notes/typeForNotes';
import CommonButton from '../common/CommonButton'; // CommonButton import
import { Input } from '@/components/ui/input';

interface Props {
  collectionId: string;
}

export const IDialogButtonForCreateNote = ({ collectionId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = useApiForCreateNote();
  const { user, isAuthenticated } = useUserStore();

  const form = useForm<CreateNoteFormData>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: '',
    },
  });

  const handleDialogOpen = (open: boolean) => {
    if (open && !isAuthenticated) {
      toast.error('로그인이 필요한 기능입니다.');
      return;
    }
    setIsOpen(open);
    if (!open) {
      form.reset();
    }
  };

  const onSubmit = async (data: CreateNoteFormData) => {
    if (!user) {
      toast.error('로그인이 필요한 기능입니다.');
      setIsOpen(false);
      return;
    }

    try {
      const createData: ICreateNoteData = {
        title: data.title,
        collectionId,
        writer: user.id,
      };

      await createMutation.mutateAsync(createData);
      setIsOpen(false);
      form.reset();
      toast.success('노트가 생성되었습니다.');
    } catch (error) {
      console.error('Failed to create note:', error);
      toast.error('노트 생성에 실패했습니다.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <CommonButton 
          variant="default" 
          size="sm" 
          className="bg-primary hover:bg-primary/90"
          startIcon={<Plus className="w-4 h-4" />}
        >
          새 노트
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 dark:bg-gray-800">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            새 노트 작성
          </DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-300 mt-1.5">
            새로운 노트의 제목을 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="px-6 py-4 space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      노트 제목
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="노트 제목을 입력하세요"
                        className="h-9"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 justify-end">
              <CommonButton
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-9"
              >
                취소
              </CommonButton>
              <CommonButton
                type="submit"
                size="sm"
                isLoading={createMutation.isPending}
                loadingText="생성 중..."
                className="h-9"
              >
                생성
              </CommonButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};