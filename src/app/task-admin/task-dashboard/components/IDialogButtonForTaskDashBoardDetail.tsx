"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FileImage, PlusCircle } from "lucide-react";
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
  className
}) => {
  const { data: taskDetail, isLoading } = useApiForGetTaskSubTodoList(id);

  const handleAddSubTask = () => {
    // TODO: Implement add task functionality
  };

  const handleToggleSubTask = (subTodoId: string, currentStatus: boolean) => {
    // TODO: Implement toggle functionality
  };

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
          <div className="relative w-full h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 32px) 100vw"
              className="object-cover transition-transform group-hover:scale-105 duration-300"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-none bg-white p-1">
        <div className="flex">
          <div className="w-3/5 h-full flex flex-col bg-white">
            <div className="px-8 border-b">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold mb-2 py-3">
                  {title}
                </DialogTitle>
              </DialogHeader>
            </div>

            <div className="flex flex-1 overflow-hidden">
              <div className="w-4/5 border-r bg-white">
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="w-1/5 p-6 bg-gray-50 overflow-y-auto">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Images</h3>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      className="w-full aspect-square relative rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover"
                        fill
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t overflow-y-auto flex-1">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description || "No description available."}
              </p>
            </div>
          </div>

          <div className="w-2/5 h-full bg-gray-50 border-l">
            <div className="h-full p-8 flex flex-col gap-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Task Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status</span>
                    <span className="font-medium">{taskDetail?.status || 'Loading...'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created by</span>
                    <span className="font-medium">{taskDetail?.created_by?.full_name || 'Loading...'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Created at</span>
                    <span className="font-medium">
                      {taskDetail?.created_at 
                        ? new Date(taskDetail.created_at).toLocaleDateString()
                        : 'Loading...'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-medium text-gray-700">Sub Tasks</h3>
                  <button 
                    onClick={handleAddSubTask}
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700"
                  >
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
                        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg group"
                      >
                        <Checkbox
                          checked={todo.is_completed}
                          onCheckedChange={(checked) => 
                            handleToggleSubTask(todo.id, checked as boolean)
                          }
                          className="mt-0.5"
                        />
                        <span className={cn(
                          "text-sm text-gray-700",
                          todo.is_completed && "text-gray-400 line-through"
                        )}>
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
        </div>

        <div className="bottom-0 absolute w-full h-10 bg-gray-50">
          하단 영역
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForTaskDashBoardDetail;
