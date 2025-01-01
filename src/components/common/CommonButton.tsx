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
  borderColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'none';
  defaultHoverColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  hoverStyle?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    scale?: boolean;
  };
  children: React.ReactNode;
}

const getBorderColorClass = (color: CommonButtonProps['borderColor']) => {
  switch (color) {
    case 'primary':
      return 'border-blue-500';
    case 'secondary':
      return 'border-gray-500';
    case 'success':
      return 'border-green-500';
    case 'danger':
      return 'border-red-500';
    case 'warning':
      return 'border-yellow-500';
    case 'info':
      return 'border-sky-500';
    case 'none':
      return 'border-transparent';
    default:
      return 'border-transparent';
  }
};

const getDefaultHoverClass = (color: CommonButtonProps['defaultHoverColor']) => {
  switch (color) {
    case 'primary':
      return 'hover:bg-blue-500/90';
    case 'secondary':
      return 'hover:bg-gray-500/90';
    case 'success':
      return 'hover:bg-green-500/90';
    case 'danger':
      return 'hover:bg-red-500/90';
    case 'warning':
      return 'hover:bg-yellow-500/90';
    case 'info':
      return 'hover:bg-sky-500/90';
    default:
      return 'hover:bg-primary/90';
  }
};

const CommonButton = ({
  variant = 'default',
  size = 'default',
  isLoading = false,
  loadingText,
  startIcon,
  endIcon,
  className,
  borderColor = 'none',
  defaultHoverColor,
  hoverStyle,
  children,
  disabled,
  ...props
}: CommonButtonProps) => {
  const getHoverClasses = () => {
    if (hoverStyle) {
      const classes = [];
      if (hoverStyle.backgroundColor) {
        classes.push(`hover:bg-${hoverStyle.backgroundColor}`);
      }
      if (hoverStyle.borderColor) {
        classes.push(`hover:border-${hoverStyle.borderColor}`);
      }
      if (hoverStyle.textColor) {
        classes.push(`hover:text-${hoverStyle.textColor}`);
      }
      if (hoverStyle.scale !== false) {
        classes.push('active:scale-95');
      }
      return classes.join(' ');
    }
    
    return getDefaultHoverClass(defaultHoverColor);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "relative inline-flex items-center gap-2",
        "transition-all duration-200",
        "border",
        getBorderColorClass(borderColor),
        getHoverClasses(),
        isLoading && "cursor-not-allowed",
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