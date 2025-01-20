import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import { useApiForDeleteTaskDashboard } from "@/hook/task/useApiForDeleteTaskDashboard";
import { toast } from 'react-toastify';

interface DeleteDialogForTaskProps {
  taskId: string;
  taskTitle: string;
}

const DeleteDialogForTask = ({ taskId, taskTitle }: DeleteDialogForTaskProps) => {
  const { deleteTask, isDeleting } = useApiForDeleteTaskDashboard();

  const handleDelete = async () => {
    try {
      await deleteTask(
        { id: taskId, title: taskTitle },
        {
          onSuccess: () => {
            toast.success(`"${taskTitle}" 태스크가 삭제되었습니다.`, {
              position: "top-right",
              autoClose: 3000,
              icon: <Trash2 className="text-green-500" />,
            });
          },
        }
      );
    } catch (error) {
      toast.error("태스크 삭제 중 오류가 발생했습니다.", {
        position: "top-right",
        autoClose: 5000,
        icon: <AlertCircle className="text-destructive" />,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="
        sm:max-w-[360px]
        bg-white dark:bg-gray-900
        border border-gray-200 dark:border-gray-800
        shadow-lg
      ">
        <DialogHeader className="relative">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-destructive/10 p-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                태스크 삭제
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-gray-100 break-all">"{taskTitle}"</span>
                <br />이 태스크를 삭제하시겠습니까?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:gap-0 border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            className="flex-1 sm:flex-none"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                삭제 중...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                삭제
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialogForTask;