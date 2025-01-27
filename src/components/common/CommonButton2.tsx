import React, { useState } from 'react';
import { PlusCircle, Trash2, Save } from "lucide-react";
import { Transition } from '@headlessui/react';
import { cn } from "@/lib/utils";

interface CommonButton2Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'ghost';
    loading?: boolean;
    icon?: React.ReactNode;
}

const CommonButton2: React.FC<CommonButton2Props> = ({
    variant = 'primary',
    loading = false,
    icon,
    className,
    children,
    disabled,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 focus:ring-blue-500",
        danger: "border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700 focus:ring-red-500",
        ghost: "border-gray-200 bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 focus:ring-gray-500"
    };

    return (
        <button
            className={cn(
                baseStyles,
                variants[variant],
                loading && "opacity-70 cursor-not-allowed",
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {children}
                </>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </button>
    );
};

export default CommonButton2;