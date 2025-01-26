import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CommonAlertDialogProps {
  title: string;
  description: string;
  triggerContent?: React.ReactNode;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

import React, { useEffect } from "react";

export const CommonAlertDialog: React.FC<CommonAlertDialogProps> = ({
  title,
  description,
  triggerContent,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onConfirm]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerContent}
      </AlertDialogTrigger>
      <AlertDialogOverlay className="bg-slate-900/40" />
      <AlertDialogContent className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-medium text-slate-900">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-red-500 hover:bg-red-600 text-white transition-colors"
            onClick={onConfirm}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};