// components/IDialogButtonForCreateCodeReview.tsx
"use client";

import { useState } from "react";
import { X, Save, Plus } from "lucide-react";
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
import CommonButton2 from "@/components/common/CommonButton2";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/useUserStore";
import { useCreateCodeReview } from "@/hook/task/useCreateCodeReview";
import { toast } from "react-toastify";

interface Props {
    taskId: string;
    onSubmit?: (data: { title: string; content: string; }) => void; // optional prop
    isLoading?: boolean;
}

const formSchema = z.object({
    title: z.string().min(1, "제목을 입력해주세요"),
    path: z.string().min(1, "파일 경로를 입력해주세요"),
    content: z.string().min(1, "리뷰 내용을 입력해주세요"),
});

type FormValues = z.infer<typeof formSchema>;

export default function IDialogButtonForCreateCodeReview({ taskId }: Props) {
    const [open, setOpen] = useState(false);
    const user = useUserStore((state) => state.user);
    const { mutate: createCodeReview, isPending } = useCreateCodeReview(taskId);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            path: "",
            content: "",
        },
    });

    const handleCreate = async (data: FormValues) => {
        if (!user?.id) {
            toast.error('사용자 인증이 필요합니다.');
            return;
        }

        createCodeReview({
            ...data,
            writer: user.id,
            order: 0
        }, {
            onSuccess: () => {
                setOpen(false);
                form.reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <CommonButton2
                    variant="primary"
                    icon={<Plus className="h-4 w-4" />}
                >
                    Add Review
                </CommonButton2>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[900px] w-[95vw] min-h-[700px] flex flex-col p-0 gap-0 bg-white">
                <DialogHeader className="shrink-0 px-6 py-4 border-b border-gray-200">
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                        새 코드 리뷰 작성
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
                                            <Label>제목</Label>
                                            <FormControl>
                                                <Input
                                                    placeholder="리뷰 제목을 입력하세요"
                                                    className="h-10 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
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
                                            <Label>파일 경로</Label>
                                            <FormControl>
                                                <Input
                                                    placeholder="파일 경로를 입력하세요"
                                                    className="h-10 bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500"
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
                                        <Label>리뷰 내용</Label>
                                        <FormControl>
                                            <Textarea
                                                placeholder="리뷰 내용을 입력하세요"
                                                className="min-h-[400px] bg-gray-50 border-gray-200 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-sm text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="shrink-0 px-6 py-4 border-t border-gray-200 mt-auto">
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <CommonButton2
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setOpen(false);
                                        form.reset();
                                    }}
                                    icon={<X className="h-4 w-4" />}
                                >
                                    취소
                                </CommonButton2>
                                <CommonButton2
                                    type="submit"
                                    variant="primary"
                                    icon={<Save className="h-4 w-4" />}
                                    disabled={isPending}
                                >
                                    {isPending ? "생성 중..." : "리뷰 생성"}
                                </CommonButton2>
                            </div>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}