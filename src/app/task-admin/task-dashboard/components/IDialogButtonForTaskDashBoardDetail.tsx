"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FileImage, PlusCircle, Clock, User, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useApiForGetTaskSubTodoList } from "@/hook/task/useApiForGetTaskSubTodoList";

interface IDialogButtonForTaskDashBoardDetailProps {
  id: string;
  title: string;
  description: string | null;
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
  const { data: taskDetail, isLoading } = useApiForGetTaskSubTodoList(id);

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

      <DialogContent className="w-screen h-[calc(100vh-2rem)] max-w-none p-0 mx-0 mb-0 mt-0 rounded-lg bg-gray-50 shadow-xl">
        <div className="grid grid-cols-5 gap-0 h-[calc(100%-2rem)]">
          {/* Left Section */}
          <div className="col-span-3 bg-white flex flex-col">
            <DialogHeader className="py-4 px-0 border-b">
              <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            </DialogHeader>

            <div className="flex-1 grid grid-rows-1 grid-cols-6">
              {/* Main Image */}
              <div className="col-span-5 relative p-4">
                <Image
                  src={validMainImageUrl}
                  alt={title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Thumbnails */}
              <div className="col-span-1 border-l bg-gray-50 p-auto space-y-3 overflow-y-auto p-5">
                {taskDetail?.ref_images && taskDetail.ref_images.length > 0 ? (
                  taskDetail.ref_images.map((image, index) => (
                    <button
                      key={image.id}
                      className="w-full aspect-square relative rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <Image
                        src={getValidImageUrl(image.image_url)}
                        alt={`Reference ${index + 1}`}
                        className="object-cover"
                        fill
                      />
                    </button>
                  ))
                ) : (
                  <div className="text-xs text-gray-500 text-center">
                    No reference images
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-sm text-gray-600">
                {description || "No description available."}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="col-span-2 bg-gray-50 border-l flex flex-col gap-4 p-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Task Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="font-medium">{taskDetail?.status || "Loading..."}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created by</span>
                  <span className="font-medium">
                    {taskDetail?.created_by?.full_name || "Loading..."}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Created at</span>
                  <span className="font-medium">
                    {taskDetail?.created_at
                      ? new Date(taskDetail.created_at).toLocaleDateString()
                      : "Loading..."}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">Sub Tasks</h3>
                <button className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700">
                  <PlusCircle className="w-4 h-4" />
                  Add Task
                </button>
              </div>

              <div className="space-y-2">
                {isLoading ? (
                  <div className="text-sm text-gray-500">Loading tasks...</div>
                ) : taskDetail?.sub_todos && taskDetail.sub_todos.length > 0 ? (
                  taskDetail.sub_todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <Checkbox checked={todo.is_completed} className="mt-0.5" />
                      <span
                        className={cn(
                          "text-sm text-gray-700",
                          todo.is_completed && "text-gray-400 line-through"
                        )}
                      >
                        {todo.content}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No tasks added yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForTaskDashBoardDetail;
