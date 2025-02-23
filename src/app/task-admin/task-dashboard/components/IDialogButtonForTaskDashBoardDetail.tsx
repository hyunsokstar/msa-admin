"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ThumbnailList from "./ThumbnailList";
import TaskInformation from "./TaskInformation";
import { useApiForGetTaskDashBoardDetail } from "@/hook/task/useApiForGetTaskDashBoardDetail";
import TabMenu from "./TabMenu";
import { TaskDetail } from "@/types/task/typeForTaskDetail";

interface IDialogButtonForTaskDashBoardDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  taskDetail?: TaskDetail; // 새로 추가
}

const IDialogButtonForTaskDashBoardDetail: React.FC<IDialogButtonForTaskDashBoardDetailProps> = ({
  id,
  title,
  description,
  imageUrl,
  className,
  defaultOpen = false,
  onOpenChange,
  taskDetail: initialTaskDetail, // 페이지에서 전달받은 데이터
}) => {
  const [open, setOpen] = useState(defaultOpen);

  // 페이지에서 전달받은 데이터가 있으면 그것을 사용하고, 없으면 API 호출
  const { data: fetchedTaskDetail, isLoading } = useApiForGetTaskDashBoardDetail(
    id,
    open && !initialTaskDetail
  );

  const taskDetail = initialTaskDetail || fetchedTaskDetail;

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const getValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return url;
    } catch {
      return "/placeholder-image.jpg";
    }
  };

  const validMainImageUrl = getValidImageUrl(imageUrl);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "w-full h-full cursor-pointer focus:outline-none relative",
            "overflow-hidden rounded-lg group",
            "ring-offset-background transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2",
            "border border-gray-100 hover:border-gray-200 bg-white",
            className
          )}
        >
          <Image
            src={validMainImageUrl}
            alt={title}
            fill
            sizes="(max-width: 32px) 100vw"
            className="object-cover transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
        </button>
      </DialogTrigger>

      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 rounded-none bg-gray-50 shadow-none">
        <div className="grid grid-cols-12 gap-0 h-full">
          <div className="col-span-6 bg-white flex flex-col">
            <DialogHeader className="py-4 px-2 border-b relative">
              {defaultOpen && (
                <button
                  onClick={() => handleOpenChange(false)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <DialogTitle className="text-xl font-semibold text-center">
                {taskDetail?.title || title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 grid grid-rows-1 grid-cols-6">
              <div className="col-span-5 relative p-4">
                <Image
                  src={validMainImageUrl}
                  alt={taskDetail?.title || title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
              <ThumbnailList
                taskId={id}
                images={taskDetail?.ref_images || null}
                getValidImageUrl={getValidImageUrl}
              />
            </div>
            <div className="p-6 bg-gray-50 border-t min-h-[300px]">
              <p className="text-sm text-gray-600 leading-relaxed">
                {taskDetail?.description || description}
              </p>
            </div>
          </div>

          <div className="col-span-6 bg-gray-50 border-l flex flex-col gap-4 p-6">
            <TaskInformation
              status={taskDetail?.status || null}
              createdBy={taskDetail?.created_by?.full_name || null}
              createdAt={
                taskDetail?.created_at
                  ? new Date(taskDetail.created_at).toLocaleDateString()
                  : null
              }
            />
            {open && taskDetail && <TabMenu taskDetail={taskDetail} isLoading={isLoading} />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForTaskDashBoardDetail;