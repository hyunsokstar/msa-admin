'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from 'lucide-react';
import getSupabase from '@/lib/supabaseClient';

type MenuFormData = {
    name: string;
    path: string;
    sort_order: number;
};

interface DialogButtonForAddMenuForParentMenuProps {
    parentId: number | null;
    parentMenuName: string;
    onSuccess?: () => void;  // 메뉴 추가 성공 후 콜백
}

const DialogButtonForAddMenuForParentMenu: React.FC<DialogButtonForAddMenuForParentMenuProps> = ({
    parentId,
    onSuccess,
    parentMenuName
}) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MenuFormData>();

    const onSubmit = async (data: MenuFormData) => {
        const supabase = getSupabase();

        if (!supabase) {
            console.error("Supabase client not initialized");
            return;
        }

        try {
            // 해당 부모 메뉴의 하위 메뉴들 중 최대 sort_order 가져오기
            const { data: maxSortData } = await supabase
                .from('menus')
                .select('sort_order')
                .eq('parent_id', parentId || 0)
                .order('sort_order', { ascending: false })
                .limit(1);

            const newSortOrder = maxSortData && maxSortData.length > 0
                ? maxSortData[0].sort_order + 1
                : 1;

            const { error } = await supabase
                .from('menus')
                .insert({
                    name: data.name,
                    path: data.path,
                    parent_id: parentId,
                    sort_order: data.sort_order || newSortOrder
                });

            if (error) {
                throw error;
            }

            reset();  // 폼 초기화
            onSuccess?.();  // 성공 콜백 실행

            // 성공 메시지 표시
            alert('메뉴가 성공적으로 추가되었습니다.');
        } catch (error) {
            console.error('메뉴 추가 중 오류 발생:', error);
            alert('메뉴 추가 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteMenu = async (menuId: number) => {
        const supabase = getSupabase();

        if (!supabase) {
            console.error("Supabase client not initialized");
            return;
        }

        try {
            const { error } = await supabase
                .from('menus')
                .delete()
                .eq('id', menuId);

            if (error) {
                throw error;
            }

            onSuccess?.();  // 성공 콜백 실행

            // 성공 메시지 표시
            alert('메뉴가 성공적으로 삭제되었습니다.');
        } catch (error) {
            console.error('메뉴 삭제 중 오류 발생:', error);
            alert('메뉴 삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="p-6 bg-white shadow-lg rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        {parentMenuName ? `${parentMenuName} 하위 메뉴 추가` : "최상위 메뉴 추가"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                            메뉴명
                        </label>
                        <Input
                            {...register('name', {
                                required: '메뉴명을 입력해주세요'
                            })}
                            placeholder="메뉴명을 입력하세요"
                            className="w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                            경로
                        </label>
                        <Input
                            {...register('path', {
                                required: '경로를 입력해주세요',
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message: '영문 소문자, 숫자, 하이픈(-)만 사용 가능합니다'
                                }
                            })}
                            placeholder="예: menu-management"
                            className="w-full"
                        />
                        {errors.path && (
                            <p className="text-red-500 text-sm mt-1">{errors.path.message}</p>
                        )}
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                            정렬 순서
                        </label>
                        <Input
                            type="number"
                            {...register('sort_order', {
                                min: {
                                    value: 1,
                                    message: '1 이상의 숫자를 입력해주세요'
                                }
                            })}
                            placeholder="자동으로 설정됩니다"
                            className="w-full"
                        />
                        {errors.sort_order && (
                            <p className="text-red-500 text-sm mt-1">{errors.sort_order.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-5">
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="px-4"
                            >
                                취소
                            </Button>
                        </DialogTrigger>
                        <Button
                            type="submit"
                            className="px-4"
                        >
                            추가
                        </Button>
                    </div>
                </form>
                <div className="flex justify-end gap-3 pt-5">
                    <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteMenu(parentId || 0)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForAddMenuForParentMenu;
