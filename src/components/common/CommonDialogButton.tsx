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
import { Button } from '@/components/ui/button'

interface CommonDialogButtonProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  title: string | React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  widthPercent?: number
  heightPercent?: number
}

const CommonDialogButton: React.FC<CommonDialogButtonProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  title,
  children,
  size = 'md',
  widthPercent,
  heightPercent
}) => {
  const widthStyle = widthPercent ? `${widthPercent}vw` : undefined
  const heightStyle = heightPercent ? `${heightPercent}vh` : undefined

  const headerClass = size === 'full' ? 'border-b px-6 py-4' : ''
  const bodyClass =
    size === 'full' || heightPercent
      ? 'flex-1 p-6 overflow-y-auto h-[calc(98vh-80px)]'
      : 'flex-1 p-4'

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`bg-white ${size === 'full' ? 'p-0 border-none' : ''}`}
        style={{
          width: widthStyle,
          maxWidth: widthStyle, // ✅ 핵심
          height: heightStyle
        }}
      >
        <DialogHeader className={headerClass}>
          <div className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>
        <div className={bodyClass}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export default CommonDialogButton
