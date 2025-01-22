import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CommonButton from "@/components/common/CommonButton";
import { Trash2, AlertCircle, X } from "lucide-react";
import { useApiForDeleteTaskDashboard } from "@/hook/task/useApiForDeleteTaskDashboard";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeleteDialogForTaskProps {
  taskId: string;
  taskTitle: string;
}

const DeleteDialogForTask = ({ taskId, taskTitle }: DeleteDialogForTaskProps) => {
  const { deleteTask, isDeleting } = useApiForDeleteTaskDashboard();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(
        { id: taskId, title: taskTitle },
        {
          onSuccess: () => {
            setIsOpen(false);
            toast.success(
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-white" />
                <span>{`"${taskTitle}" 태스크가 삭제되었습니다.`}</span>
              </div>,
              {
                position: "bottom-right",
                autoClose: 3000,
                className: "bg-green-500 text-white",
                progressClassName: "bg-white/30",
                closeButton: false,
                icon: false,
              }
            );
          },
        }
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-white" />
          <span>태스크 삭제 중 오류가 발생했습니다.</span>
        </div>,
        {
          position: "bottom-right",
          autoClose: 5000,
          className: "bg-red-500 text-white",
          progressClassName: "bg-white/30",
          closeButton: false,
          icon: false,
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 p-0",
            "hover:bg-destructive/10 hover:text-destructive",
            "focus:ring-2 focus:ring-destructive/20",
            "active:scale-95"
          )}
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">태스크 삭제</span>
        </CommonButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] p-0 gap-0 rounded-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-900"
        >
          <DialogHeader className="p-6 pb-0">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-destructive/10 p-2.5">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 pt-1">
                <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  태스크 삭제
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-medium text-gray-900 dark:text-white break-all">
                    "{taskTitle}"
                  </span>
                  <br />
                  태스크를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <DialogFooter className="flex gap-2 p-6 border-t border-gray-100 dark:border-gray-800">
            <CommonButton
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              취소
            </CommonButton>
            <CommonButton
              variant="destructive"
              size="lg"
              className="flex-1"
              onClick={handleDelete}
              isLoading={isDeleting}
              loadingText="삭제 중..."
              startIcon={<Trash2 className="h-4 w-4" />}
            >
              삭제
            </CommonButton>
          </DialogFooter>
        </motion.div>

        <CommonButton
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8 p-1.5 text-gray-400 
            hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </CommonButton>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogForTask;