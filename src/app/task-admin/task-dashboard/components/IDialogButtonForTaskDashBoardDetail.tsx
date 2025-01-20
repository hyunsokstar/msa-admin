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

  console.log("data ch : ", taskDetail);
  console.log("id : ", id);
  
  

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
            "border border-transparent hover:border-gray-200",
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
            <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-black/[0.05] transition-colors duration-300" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-w-none p-0 m-0 rounded-none">
        <div className="flex h-full">
          {/* Left Section (60% width) */}
          <div className="w-[60%] h-full flex flex-col">
            {/* Header Section (10% height) */}
            <div className="h-[10%] flex items-center justify-center bg-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">
                  {title}
                </DialogTitle>
              </DialogHeader>
            </div>
            
            {/* Image Section (70% height) */}
            <div className="h-[70%]">
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  className="object-contain w-full h-full"
                  fill
                  sizes="60vw"
                  priority
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            
            {/* Description Section (20% height) */}
            <div className="h-[20%] bg-orange-50">
              <div className="h-full p-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-wrap overflow-y-auto max-h-[calc(100%-2rem)]">
                  {description || "No description available."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section (40% width) */}
          <div className="w-[40%] h-full bg-white border-l border-gray-200">
            <div className="h-full p-6 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Details</h2>
              
              {/* Task Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Task Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Status: {taskDetail?.status || 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created by: {taskDetail?.created_by?.full_name || 'Loading...'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created at: {taskDetail?.created_at 
                      ? new Date(taskDetail.created_at).toLocaleDateString()
                      : 'Loading...'}
                  </p>
                </div>
              </div>

              {/* Sub Todos Section */}
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-gray-900">Sub Tasks</h3>
                  <button 
                    onClick={handleAddSubTask}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Task
                  </button>
                </div>

                {/* Sub Todos List */}
                <div className="space-y-2 overflow-y-auto max-h-[calc(100%-2rem)]">
                  {isLoading ? (
                    <div className="text-sm text-gray-500">Loading tasks...</div>
                  ) : taskDetail?.sub_todos && taskDetail.sub_todos.length > 0 ? (
                    taskDetail.sub_todos.map((todo) => (
                      <div 
                        key={todo.id} 
                        className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg group"
                      >
                        <Checkbox
                          checked={todo.is_completed}
                          onCheckedChange={(checked) => 
                            handleToggleSubTask(todo.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <span className={cn(
                          "text-sm flex-1",
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
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForTaskDashBoardDetail;