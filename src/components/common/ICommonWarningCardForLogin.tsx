import React from 'react';
import { AlertCircle, LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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

const CommonButton: React.FC<CommonButtonProps> = ({
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
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium",
        "transition-all duration-200",
        "border border-gray-300 dark:border-gray-700",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90": variant === 'default',
          "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === 'destructive',
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === 'secondary',
          "border-2 hover:bg-gray-100 dark:hover:bg-gray-800": variant === 'outline',
          "hover:underline": variant === 'link',
          "px-3 py-1 text-sm": size === 'sm',
          "px-6 py-3 text-lg": size === 'lg',
          "p-2": size === 'icon',
        },
        isLoading && "cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="animate-spin">⌛</span>
          {loadingText || children}
        </>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </button>
  );
};

interface ICommonWarningCardProps {
  title: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
  buttonProps?: Partial<CommonButtonProps>;
  className?: string;
  variant?: 'warning' | 'error' | 'info' | 'success';
}

const ICommonWarningCard: React.FC<ICommonWarningCardProps> = ({
  title,
  message,
  buttonText,
  onButtonClick,
  icon = <AlertCircle className="w-12 h-12 text-yellow-500" />,
  buttonProps = {},
  className = '',
  variant = 'warning',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return {
          iconColor: 'text-red-500',
          borderColor: 'border-red-200',
          shadowColor: 'shadow-red-100',
        };
      case 'success':
        return {
          iconColor: 'text-green-500',
          borderColor: 'border-green-200',
          shadowColor: 'shadow-green-100',
        };
      case 'info':
        return {
          iconColor: 'text-blue-500',
          borderColor: 'border-blue-200',
          shadowColor: 'shadow-blue-100',
        };
      default:
        return {
          iconColor: 'text-yellow-500',
          borderColor: 'border-yellow-200',
          shadowColor: 'shadow-yellow-100',
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card 
        className={cn(
          "w-full max-w-md",
          "border-2",
          "shadow-lg",
          "transform transition-all duration-300 hover:scale-[1.01]",
          variantStyles.borderColor,
          variantStyles.shadowColor,
          className
        )}
      >
        <CardHeader className="text-center pb-2">
          <div className={cn(
            "flex justify-center mb-4",
            "transform transition-all duration-300 hover:scale-110",
            variantStyles.iconColor
          )}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-gray-600 dark:text-gray-300 text-lg text-center leading-relaxed">
            {message}
          </p>
          {buttonText && onButtonClick && (
            <CommonButton
              onClick={onButtonClick}
              className="w-full max-w-sm"
              size="lg"
              {...buttonProps}
            >
              {buttonText}
            </CommonButton>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ICommonWarningCard;