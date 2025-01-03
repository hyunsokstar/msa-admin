import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const CommonButton = ({
  variant = 'default',
  size = 'default',
  isLoading = false,
  loadingText,
  startIcon,
  endIcon,
  className,
  children,
  disabled,
  ...props
}: CommonButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative inline-flex items-center gap-2",
        "transition-all duration-200",
        "border border-gray-300 dark:border-gray-700", // 미묘한 테두리 추가
        isLoading && "cursor-not-allowed",
        {
          "hover:bg-gray-100 dark:hover:bg-gray-800": variant === 'default' || variant === 'secondary',
          "hover:bg-red-600 dark:hover:bg-red-700 hover:text-white": variant === 'destructive', // Destructive 버튼 호버 개선
          "hover:bg-gray-200 dark:hover:bg-gray-700": variant === 'outline',
          "hover:underline": variant === 'link',
        },
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </Button>
  );
};

export default CommonButton;