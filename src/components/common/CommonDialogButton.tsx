// src/components/common/CommonDialogButton.tsx
"use client";

import React from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import CommonButton2 from "./CommonButton2";
import { X } from "lucide-react";

interface CommonDialogButtonProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    trigger: React.ReactNode;
    title: string | React.ReactNode;
    children: React.ReactNode;
}

const CommonDialogButton: React.FC<CommonDialogButtonProps> = ({
    isOpen,
    onClose,
    onOpen,
    trigger,
    title,
    children,
}) => {
    return (
        <>
            <div onClick={onOpen}>{trigger}</div>

            <Transition show={isOpen}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 z-50" />
                </TransitionChild>

                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="flex min-h-full items-center justify-center">
                            <div className="w-screen h-screen bg-white">
                                <div className="flex flex-col h-full">
                                    {/* Header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-sm sticky top-0">
                                        <div className="flex-1">{title}</div>
                                        <CommonButton2
                                            variant="ghost"
                                            onClick={onClose}
                                            className="ml-auto p-2"
                                            icon={<X className="h-4 w-4" />}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 overflow-auto">
                                        {children}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Transition>
        </>
    );
};

export default CommonDialogButton;