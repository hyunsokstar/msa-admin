"use client";

import React from "react";

interface IDialogButtonForTaskDashBoardDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ThumbnailList from "./ThumbnailList";
import SubTasks from "./SubTasks";
import TaskInformation from "./TaskInformation";
import { useApiForGetTaskDashBoardDetail } from "@/hook/task/useApiForGetTaskDashBoardDetail";

const IDialogButtonForTaskDashBoardDetail: React.FC<IDialogButtonForTaskDashBoardDetailProps> = ({
  id,
  title,
  description,
  imageUrl,
  className,
}) => {
  const { data: taskDetail, isLoading } = useApiForGetTaskDashBoardDetail(id);

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
    <Dialog>
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
        <div className="grid grid-cols-5 gap-0 h-full">
          {/* Left Section */}
          <div className="col-span-3 bg-white flex flex-col">
            <DialogHeader className="py-4 px-2 border-b">
              <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            </DialogHeader>
            <div className="flex-1 grid grid-rows-1 grid-cols-6">
              <div className="col-span-5 relative p-4">
                <Image
                  src={validMainImageUrl}
                  alt={title}
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
            <div className="p-4 bg-gray-50 border-t">
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 bg-gray-50 border-l flex flex-col gap-4 p-6">
            <TaskInformation
              status={taskDetail?.status || null}
              createdBy={taskDetail?.created_by?.full_name || null}
              createdAt={
                taskDetail?.created_at
                  ? new Date(taskDetail.created_at).toLocaleDateString()
                  : null
              }
            />
            <SubTasks isLoading={isLoading} subTodos={taskDetail?.sub_todos || null} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForTaskDashBoardDetail;
