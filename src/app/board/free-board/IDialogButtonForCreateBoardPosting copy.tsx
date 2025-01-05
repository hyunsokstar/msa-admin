// src/app/Note/[id]/_comp/IDialogButtonForCreateNoteContents.tsx
"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
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
import { useApiForGetNoteContents } from "@/hook/notes/useApiForGetNoteContents";

interface Props {
  noteId: string;
}

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  path: z.string().min(1, "경로를 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

export default function IDialogButtonForCreateNoteContents({ noteId }: Props) {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateNoteContent();
  const { data: noteContents } = useApiForGetNoteContents(noteId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      path: "",
      content: "",
    },
  });

  // order의 최대값 계산
  const maxOrder = useMemo(() => {
    if (!noteContents || !Array.isArray(noteContents)) return 0;
    return noteContents.reduce((max, content) => Math.max(max, content.order), 0);
  }, [noteContents]);

  const handleCreate = async (data: FormValues) => {
    try {
      await createMutation.mutateAsync({
        noteId,
        data: {
          title: data.title,
          content: data.content,
          page: 1, // 페이지는 동적으로 변경 가능
          order: maxOrder + 1, // 기존 order 최대값 + 1
          path: data.path,
        }
      });

      setOpen(false);
      form.reset(); // 폼 리셋
    } catch (error) {
      console.error('Failed to create note content:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CommonButton
          size="sm"
          startIcon={<Plus className="h-4 w-4" />}
        >
          Add Note
        </CommonButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[80%] max-h-[80vh] overflow-y-auto bg-white dark:bg-slate-900">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-slate-50">Create New Note Content</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-slate-900 dark:text-slate-50">Title</Label>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter title"
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="path" className="text-slate-900 dark:text-slate-50">Path</Label>
                <FormField
                  control={form.control}
                  name="path"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter path"
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content" className="text-slate-900 dark:text-slate-50">Content</Label>
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="bg-slate-100 dark:bg-slate-800">
              <CommonButton
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset(); // 폼 리셋
                }}
              >
                Cancel
              </CommonButton>
              <CommonButton
                type="submit"
                isLoading={createMutation.isPending}
                loadingText="Creating..."
              >
                Create
              </CommonButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}