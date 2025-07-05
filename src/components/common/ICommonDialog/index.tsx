"use client";

import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ICommonDialogProps {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    hideCloseButton?: boolean;
}

export default function ICommonDialog({
    isOpen,
    onClose,
    title,
    children,
    footer,
    hideCloseButton = false,
}: ICommonDialogProps) {
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
                    <div className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                {/* 풀사이즈 다이얼로그 */}
                <div className="fixed inset-0 overflow-hidden z-[101]">
                    <div className="w-screen h-screen text-left text-gray-900 dark:text-white bg-white dark:bg-slate-900 flex flex-col">
                        {/* 헤더 */}
                        <div className="shrink-0 px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <HeadlessDialog.Title className="text-2xl font-bold">
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

                        {/* 본문 영역 */}
                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {children}
                            {footer && <div className="h-20" />} {/* 푸터 공간 확보 */}
                        </div>

                        {/* 푸터 */}
                        {footer && (
                            <div className="shrink-0 px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900 sticky bottom-0 z-10">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </HeadlessDialog>
        </Transition>
    );
}
