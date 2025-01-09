// src/components/IDialogButtonForUpdateUser.tsx
"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IUser } from "@/types/typeForUser";
import { Pencil } from "lucide-react";
import { useApiForUpdateUser } from "@/hook/useApiForUpdateUser";
import ImageUploader2 from "../file-uploader/ImageUploader2";

const formSchema = z.object({
    full_name: z.string().min(2, "이름은 2글자 이상이어야 합니다.").optional(),
    phone_number: z
        .string()
        .regex(/^\d{2,3}-\d{3,4}-\d{4}$/, "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)")
        .optional(),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    profile_image_url: z.string().optional(),
});

type UpdateUserFormData = z.infer<typeof formSchema>;

interface IDialogButtonForUpdateUserProps {
    user: IUser;
    isCurrentUser: boolean;
}

export default function IDialogButtonForUpdateUser({ user, isCurrentUser }: IDialogButtonForUpdateUserProps) {
    const [open, setOpen] = useState(false);
    const { mutate: updateUser } = useApiForUpdateUser();
    const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(user.profile_image_url || undefined);

    const form = useForm<UpdateUserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: user.full_name || "",
            phone_number: user.phone_number || "",
            email: user.email || "",
            profile_image_url: user.profile_image_url || "",
        },
    });

    const onSubmit = (data: UpdateUserFormData) => {
        const updateData = {
            ...data,
            profile_image_url: profileImageUrl,
        };

        updateUser(
            { id: user.id, updateData },
            {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            }
        );
    };

    const handleImageUpload = (fileUrl: string) => {
        setProfileImageUrl(fileUrl);
        form.setValue('profile_image_url', fileUrl);
    };

    if (!isCurrentUser) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4 mr-1" />
                    수정
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] bg-white">
                <DialogHeader>
                    <DialogTitle>회원 정보 수정</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <FormLabel>프로필 이미지</FormLabel>
                            <ImageUploader2
                                onUploadComplete={handleImageUpload}
                                isUpdate={true}
                                initialImage={user.profile_image_url || undefined}
                            />
                        </div>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>이메일</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="full_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>이름</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>전화번호</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="010-1234-5678" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                취소
                            </Button>
                            <Button type="submit">저장</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}