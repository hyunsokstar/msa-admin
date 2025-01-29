"use client";

import React, { useState } from "react";
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
import TaskInformation from "./TaskInformation";
import { useApiForGetTaskDashBoardDetail } from "@/hook/task/useApiForGetTaskDashBoardDetail";
import TabMenu from "./TabMenu";

interface IDialogButtonForTaskDashBoardDetailProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
}

const IDialogButtonForTaskDashBoardDetail: React.FC<IDialogButtonForTaskDashBoardDetailProps> = ({
  id,
  title,
  description,
  imageUrl,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const { data: taskDetail, isLoading } = useApiForGetTaskDashBoardDetail(id, open);

  console.log("taskDetail check: ", taskDetail);

  const getValidImageUrl = (url: string) => {
    console.log("url check: ", url);
    
    try {
      new URL(url);
      return url;
    } catch {
      return "/placeholder-image.jpg";
    }
  };

  const validMainImageUrl = getValidImageUrl(imageUrl);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {/* 왼쪽 영역 (이미지와 설명) */}
          <div className="col-span-6 bg-white flex flex-col">
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
            <div className="p-6 bg-gray-50 border-t min-h-[300px]">
              <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
          </div>

          {/* 오른쪽 영역 (태스크 정보와 탭 메뉴) */}
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