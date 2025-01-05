// src/components/dialog/IDialogButtonForUpdateNote.tsx
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
}

export const IDialogButtonForUpdateNote = ({ 
  collectionId,
  noteId,
  initialTitle 
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateMutation = useApiForUpdateNote();

  const form = useForm<UpdateNoteFormData>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      title: initialTitle,
    },
  });

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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-slate-700 hover:text-slate-900"
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
  );
};