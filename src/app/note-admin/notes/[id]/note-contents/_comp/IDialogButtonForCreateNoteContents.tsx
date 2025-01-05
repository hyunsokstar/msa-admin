// src/app/Note/[id]/_comp/IDialogButtonForCreateNoteContents.tsx
"use client";

import { useState } from "react";
import { Plus, X, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import TiptapEditor from "@/components/rich-editor/TipTabEditor";
import CommonButton from "@/components/common/CommonButton";
import { useCreateNoteContent } from "@/hook/notes/useApiForCreateNoteContents";
import { useUserStore } from '@/store/useUserStore';
import { toast } from "react-toastify";
import { useApiForGetNoteContents } from "@/hook/notes/useApiForGetNoteContents";

interface Props {
  noteId: string;
  pageNum?: number;
}

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  path: z.string().min(1, "경로를 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

export default function IDialogButtonForCreateNoteContents({ noteId, pageNum }: Props) {
  const { user, isAuthenticated } = useUserStore();
  const [open, setOpen] = useState(false);
  const createMutation = useCreateNoteContent();
  const { data: noteContents } = useApiForGetNoteContents({noteId, pageNum});

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      path: "",
      content: "",
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isAuthenticated) {
      toast.error('로그인이 필요합니다.');
      return;
    }
    setOpen(newOpen);
  };

  const handleCreate = async (data: FormValues) => {
    try {
      if (!user) {
        toast.error('로그인이 필요합니다.');
        return;
      }

      const maxOrder = noteContents?.data?.reduce((max, content) => 
        Math.max(max, content.order || 0), 0) ?? 0;

      await createMutation.mutateAsync({
        noteId,
        data: {
          title: data.title,
          content: data.content,
          page: 1,
          order: maxOrder + 1,
          path: data.path,
          writer: user.id,
        }
      });

      toast.success('노트가 성공적으로 생성되었습니다.');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('노트 생성에 실패했습니다.');
      console.error('Failed to create note content:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <CommonButton
          variant="default"
          size="sm"
          className="transition-all duration-200 ease-in-out hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          노트 추가
        </CommonButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[900px] w-[95vw] min-h-[700px] flex flex-col p-0 gap-0 bg-white dark:bg-slate-900">
        <DialogHeader className="shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            새 노트 작성
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="flex flex-col h-full">
            <div className="px-6 py-4 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="제목을 입력하세요"
                          className="h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="path"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="경로를 입력하세요"
                          className="h-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <div className="h-[500px] overflow-y-auto">
                          <TiptapEditor
                            content={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="shrink-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 mt-auto">
              <div className="grid grid-cols-2 gap-4 w-full">
                <CommonButton
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-base hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                >
                  <X className="h-5 w-5 mr-2" />
                  취소
                </CommonButton>
                <CommonButton
                  type="submit"
                  className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700"
                  isLoading={createMutation.isPending}
                  loadingText="생성 중..."
                >
                  <Save className="h-5 w-5 mr-2" />
                  {createMutation.isPending ? '생성 중...' : '노트 생성'}
                </CommonButton>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}