// C:\Users\terec\msa-admin\src\components\common\CommonDialogButton.tsx
'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CommonDialogButtonProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  title: string | React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const CommonDialogButton: React.FC<CommonDialogButtonProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  title,
  children,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    full: 'sm:max-w-[98vw] w-[98vw] h-[98vh]'
  }

  const contentClass =
    size === 'full'
      ? `${sizeClasses[size]} bg-white p-0 border-none`
      : `${sizeClasses[size]} bg-white`

  const headerClass = size === 'full' ? 'border-b px-6 py-4' : ''

  const bodyClass =
    size === 'full'
      ? 'flex-1 p-6 overflow-y-auto h-[calc(98vh-80px)]'
      : 'flex-1 p-4'

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClass}>
        <DialogHeader className={headerClass}>
          <div className='flex items-center justify-between'>
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className={bodyClass}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default CommonDialogButton
