import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
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
import { useApiForUpdateHeaderNav } from '@/hook/useApiForUpdateHeaderNav';
import { MenuItemType } from '@/api/apiForMenu';

const formSchema = z.object({
    name: z.string().min(1, '메뉴명은 필수입니다'),
    path: z.string().min(1, '경로는 필수입니다'),
});

interface Props {
    menu: MenuItemType;
    onSuccess?: () => void;
}

const IDialogButtonForUpdateNaviMenu: React.FC<Props> = ({ menu, onSuccess }) => {
    const [open, setOpen] = React.useState(false);
    const { mutate: updateMenu, isPending } = useApiForUpdateHeaderNav();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: menu.name,
            path: menu.path,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        updateMenu({
            menuId: menu.id,
            updateData: values
        }, {
            onSuccess: () => {
                setOpen(false);
                onSuccess?.();
                form.reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                >
                    <Pencil className="w-3 h-3 text-gray-400" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle>네비게이션 메뉴 수정</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>메뉴명</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="path"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>경로</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setOpen(false)}
                            >
                                취소
                            </Button>
                            <Button 
                                type="submit"
                                disabled={isPending}
                            >
                                {isPending ? '처리중...' : '수정'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default IDialogButtonForUpdateNaviMenu;