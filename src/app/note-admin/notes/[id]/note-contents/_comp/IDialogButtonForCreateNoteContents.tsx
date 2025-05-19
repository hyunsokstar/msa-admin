// src/app/Note/[id]/_comp/IDialogButtonForCreateNoteContents.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, X, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import LexicalEditor from "@/components/rich-editor/LexicalEditor";
import CommonButton from "@/components/common/CommonButton";
import { useCreateNoteContent } from "@/hook/notes/useApiForCreateNoteContents";
import { useUserStore } from '@/store/useUserStore';
import { toast } from "react-toastify";
import { useApiForGetNoteContents } from "@/hook/notes/useApiForGetNoteContents";
import ICommonDialog from "@/components/common/ICommonDialog";

interface Props {
  noteId: string;
  pageNum: number;
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
  const [forceUpdate, setForceUpdate] = useState(0);
  const createMutation = useCreateNoteContent();
  const { data: noteContents } = useApiForGetNoteContents({ noteId, pageNum });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      path: "",
      content: "",
    },
  });

  // 다이얼로그가 열릴 때 강제 업데이트
  useEffect(() => {
    if (open) {
      const timers = [100, 300, 500, 800, 1200, 2000].map((delay) => {
        return setTimeout(() => {
          setForceUpdate(prev => prev + 1);
        }, delay);
      });

      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [open]);

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
          page: pageNum,
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

  // 푸터 컴포넌트
  const DialogFooter = (
    <div className="grid grid-cols-2 gap-4 w-full mt-6 sticky bottom-0 bg-white dark:bg-gray-900 py-4 border-t border-gray-200 dark:border-gray-800">
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
        onClick={form.handleSubmit(handleCreate)}
      >
        <Save className="h-5 w-5 mr-2" />
        {createMutation.isPending ? '생성 중...' : '노트 생성'}
      </CommonButton>
    </div>
  );

  return (
    <>
      <CommonButton
        variant="default"
        size="sm"
        className="transition-all duration-200 ease-in-out hover:scale-105"
        onClick={() => handleOpenChange(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        노트 추가
      </CommonButton>

      <ICommonDialog
        isOpen={open}
        onClose={handleOpenChange}
        title={`새 노트 내용 작성 (페이지 ${pageNum})`}
        width="full"
        maxWidth="max-w-[95vw]" // 최대 너비 증가
        footer={DialogFooter}
      >
        <Form {...form}>
          <form className="flex flex-col h-full">
            <div className="flex flex-col gap-4">
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
                      <div className="relative h-[calc(80vh-200px)] mb-16"> {/* 높이 증가 및 하단 여백 추가 */}
                        <div className="absolute inset-0 pl-12 overflow-visible">
                          <LexicalEditor
                            content={field.value}
                            onChange={field.onChange}
                            key={`editor-${forceUpdate}`} // 강제 리렌더링용 키
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </ICommonDialog>
    </>
  );
}