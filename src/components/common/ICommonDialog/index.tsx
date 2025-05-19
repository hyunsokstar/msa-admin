// src/components/common/ICommonDialog.tsx
"use client";

import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import { X } from 'lucide-react';

interface ICommonDialogProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    width?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    maxWidth?: string; // 새로 추가된 prop
    hideCloseButton?: boolean;
}

export default function ICommonDialog({
    isOpen,
    onClose,
    title,
    children,
    footer,
    width = 'lg',
    maxWidth, // 새로운 prop 사용
    hideCloseButton = false,
}: ICommonDialogProps) {
    // 너비에 따른 클래스 매핑
    const widthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-[98vw] w-[1200px]', // 더 넓게 조정
    };

    // maxWidth가 제공되면 그것을 사용, 아니면 기본 widthClasses 사용
    const widthClass = maxWidth || widthClasses[width];

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <HeadlessDialog as="div" className="relative z-[100]" onClose={onClose}>
                {/* 배경 오버레이 */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                {/* 전체 다이얼로그 컨테이너 */}
                <div className="fixed inset-0 overflow-hidden">
                    <div className="flex min-h-full items-center justify-center p-2 md:p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <HeadlessDialog.Panel
                                className={`w-full ${widthClass} h-[90vh] transform rounded-lg bg-white dark:bg-slate-900 text-left align-middle shadow-xl transition-all flex flex-col`}
                            >
                                {/* 헤더 */}
                                <div className="shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 z-20 bg-white dark:bg-slate-900">
                                    <HeadlessDialog.Title as="h3" className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {title}
                                    </HeadlessDialog.Title>

                                    {!hideCloseButton && (
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            onClick={() => onClose(false)}
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    )}
                                </div>

                                {/* 컨텐츠 영역 - 오버플로우 허용, 푸터를 위한 패딩 바텀 추가 */}
                                <div className="flex-1 px-6 py-4 overflow-y-auto relative">
                                    {children}
                                    {/* 푸터 공간을 위한 여백 */}
                                    {footer && <div className="h-16"></div>}
                                </div>

                                {/* 푸터 (존재하는 경우) - sticky로 변경 */}
                                {footer && (
                                    <div className="shrink-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 sticky bottom-0 z-10">
                                        {footer}
                                    </div>
                                )}
                            </HeadlessDialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </HeadlessDialog>
        </Transition>
    );
}