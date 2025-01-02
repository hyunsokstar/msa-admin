// components/menu/MenuManagementForm.tsx
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { CreateMenuDto } from '@/types/typeForMenu';
import useApiForCreateMenu from '@/hook/useApiForCreateMenu';

type MenuFormData = {
    name: string;
    path: string;
    parent_id: string;
    sort_order: number;
};

const MenuManagementForm: React.FC = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<MenuFormData>();
    const createMenuMutation = useApiForCreateMenu();

    const onSubmit = async (data: MenuFormData) => {
        try {
            const menuData: CreateMenuDto = {
                name: data.name,
                path: data.path,
                parent_id: data.parent_id === 'null' ? null : parseInt(data.parent_id),
                sort_order: data.sort_order
            };

            await createMenuMutation.mutateAsync(menuData);
            reset();
            setOpen(false); // Dialog 닫기
        } catch (error) {
            console.error('메뉴 생성 실패:', error);
        }
    };

    const handleDialogClose = () => {
        reset(); // 폼 초기화
        setOpen(false);
    };

    // ... 나머지 코드는 동일

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                    메뉴 추가
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white shadow-lg border-0 sm:max-w-[500px]">
                {/* ... 폼 내용은 동일 ... */}
                <div className="mt-6 flex justify-end space-x-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="text-gray-600 hover:text-gray-800"
                        disabled={createMenuMutation.isPending}
                        onClick={handleDialogClose}
                    >
                        취소
                    </Button>
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        disabled={createMenuMutation.isPending}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {createMenuMutation.isPending ? '저장 중...' : '저장'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MenuManagementForm;