'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';

type MenuFormData = {
    name: string;
    path: string;
    parent_id: string;
    sort_order: number;
};

const MenuManagementForm: React.FC = () => {
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<MenuFormData>();

    const onSubmit = (data: MenuFormData) => {
        console.log(data);
    };

    const topLevelMenus = [
        { id: '1', name: '학습 콘텐츠 관리' },
        { id: '2', name: '쇼핑몰 관리' },
        { id: '3', name: '게시판 관리' },
        { id: '4', name: '선생님 관리' },
        { id: '5', name: '과목 관리' },
        { id: '6', name: '커리큘럼 관리' },
    ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                    메뉴 추가
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white shadow-lg border-0 sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">메뉴 관리</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                메뉴명
                            </label>
                            <Input
                                {...register('name', { required: '메뉴명을 입력해주세요' })}
                                className="w-full"
                                placeholder="메뉴명을 입력하세요"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                경로
                            </label>
                            <Input
                                {...register('path', { required: '경로를 입력해주세요' })}
                                className="w-full"
                                placeholder="예: teacher-admin"
                            />
                            {errors.path && (
                                <p className="text-red-500 text-sm mt-1">{errors.path.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                상위 메뉴
                            </label>
                            <ScrollArea className="h-[200px] w-full rounded-md border border-gray-200 p-4">
                                <RadioGroup
                                    onValueChange={(value) => setValue('parent_id', value)}
                                    className="space-y-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="null" id="null" />
                                        <Label
                                            htmlFor="null"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            상위 메뉴 없음
                                        </Label>
                                    </div>
                                    {topLevelMenus.map((menu) => (
                                        <div key={menu.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={menu.id} id={menu.id} />
                                            <Label
                                                htmlFor={menu.id}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {menu.name}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </ScrollArea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                정렬 순서
                            </label>
                            <Input
                                type="number"
                                {...register('sort_order', {
                                    required: '정렬 순서를 입력해주세요',
                                    min: { value: 1, message: '1 이상의 숫자를 입력해주세요' }
                                })}
                                className="w-full"
                                placeholder="1"
                            />
                            {errors.sort_order && (
                                <p className="text-red-500 text-sm mt-1">{errors.sort_order.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="text-gray-600 hover:text-gray-800"
                            >
                                취소
                            </Button>
                        </DialogTrigger>
                        <Button
                            type="submit"
                            className="bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                            저장
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default MenuManagementForm;