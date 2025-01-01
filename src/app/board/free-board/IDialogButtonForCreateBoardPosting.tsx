"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle, Save } from "lucide-react";
import useApiForCreateFreeBoard from "@/hook/useApiForCreateFreeBoard";
import TiptapEditor from "@/components/rich-editor/TipTabEditor";

const formSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

const IDialogButtonForCreateBoardPosting: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const createPost = useApiForCreateFreeBoard();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    createPost.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
      onError: (error) => {
        console.error('게시글 생성 실패:', error);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          type="button"
          variant="default"
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          새 글 작성
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-5xl w-[95vw] h-[90vh] p-0 rounded-xl shadow-xl flex flex-col overflow-hidden">
        <DialogHeader className="px-6 py-3 border-b bg-white shrink-0">
          <DialogTitle>게시글 작성</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="px-6 py-3 border-b shrink-0">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="제목을 입력하세요"
                        className="h-10 text-lg px-4 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        {...field}
                        disabled={createPost.isPending}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 mt-1 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <FormControl>
                      <div className="flex-1 min-h-0">
                        <TiptapEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 px-6 mt-1 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="px-6 py-3 border-t bg-gray-50 mt-auto shrink-0">
              <div className="flex justify-end gap-3 w-full">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[100px] hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setOpen(false)}
                  disabled={createPost.isPending}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  className="min-w-[100px] bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                  disabled={createPost.isPending}
                >
                  {createPost.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      저장 중...
                    </div>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      저장
                    </>
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateBoardPosting;