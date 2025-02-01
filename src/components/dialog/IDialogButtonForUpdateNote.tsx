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
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { z } from 'zod';
import { useApiForUpdateNote } from '@/hook/notes/useApiForUpdateNote';
import { useUserStore } from '@/store/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import CommonButton from '../common/CommonButton';

const updateNoteSchema = z.object({
  title: z.string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자를 초과할 수 없습니다.'),
});

type UpdateNoteFormData = z.infer<typeof updateNoteSchema>;

interface Props {
  collectionId: string;
  noteId: number;
  initialTitle: string;
  writerEmail: string;
}

export const IDialogButtonForUpdateNote = ({
  collectionId,
  noteId,
  initialTitle,
  writerEmail
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUserStore(state => state.user);
  const queryClient = useQueryClient();
  const updateMutation = useApiForUpdateNote();

  // 권한 체크 로직
  const isAuthenticated = !!user;
  const isAuthorized = user?.email === writerEmail || user?.is_admin;

  const form = useForm<UpdateNoteFormData>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

  // 툴팁 메시지 결정
  const getTooltipMessage = () => {
    if (!isAuthenticated) return '로그인이 필요합니다';
    if (!isAuthorized) return '수정 권한이 없습니다';
    return '';
  };

  const onSubmit = async (data: UpdateNoteFormData) => {
    try {
      await updateMutation.mutateAsync({
        collectionId,
        noteId,
        data: {
          title: data.title,
        },
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const isDisabled = !isAuthenticated || !isAuthorized || updateMutation.isPending;

  return (
    <div className="relative group">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CommonButton
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${isDisabled
                ? 'text-slate-400 cursor-not-allowed'
                : 'text-slate-700 hover:text-slate-900'
              }`}
            disabled={isDisabled}
          >
            <Pencil className="h-4 w-4" />
          </CommonButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-50 dark:bg-gray-800">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
              노트 수정
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-300 mt-1.5">
              노트의 제목을 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-6 py-4">
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
                        {...field}
                        placeholder="노트 제목을 입력하세요"
                        className="h-9"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
                  isLoading={updateMutation.isPending}
                  loadingText="수정 중..."
                  className="h-9"
                >
                  수정
                </CommonButton>
              </DialogFooter>
            </form>
          </Form>
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