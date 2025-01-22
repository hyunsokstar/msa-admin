"use client";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useUserStore } from "@/store/useUserStore";
import ImageUploader2 from "@/components/file-uploader/ImageUploader2";
import useApiForCreateTaskDashboard from "@/hook/task/useApiForCreateTaskDashboard";
import { cn } from "@/lib/utils";

interface TaskDashboardFormData {
  title: string;
  description: string;
  coverUrl: string;
  isArchived: boolean;
  figmaUrl: string;
}

const TaskDashboardDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TaskDashboardFormData>({
    title: "",
    description: "",
    coverUrl: "",
    isArchived: false,
    figmaUrl: "",
  });

  const { user, isAuthenticated } = useUserStore();
  const createTaskDashboard = useApiForCreateTaskDashboard();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isArchived: checked }));
  };

  const handleImageUploadComplete = (fileUrl: string) => {
    setFormData((prev) => ({ ...prev, coverUrl: fileUrl }));
  };

  const handleSubmit = () => {
    if (!user) return;

    createTaskDashboard.mutate(
      {
        title: formData.title,
        description: formData.description,
        coverUrl: formData.coverUrl,
        isArchived: formData.isArchived,
        figmaUrl: formData.figmaUrl,
        createdBy: user.id,
      },
      {
        onSuccess: () => {
          setIsDialogOpen(false);
          setFormData({
            title: "",
            description: "",
            coverUrl: "",
            isArchived: false,
            figmaUrl: "",
          });
        },
      }
    );
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className={cn(
            "w-8 h-8 p-0 flex items-center justify-center",
            "bg-blue-500 hover:bg-blue-600 text-white",
            !isAuthenticated && "opacity-50 cursor-not-allowed"
          )}
          disabled={!isAuthenticated}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14"/>
          </svg>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-6xl w-full h-[80vh] p-0 bg-white dark:bg-gray-800">
        <div className="flex h-full">
          {/* 이미지 미리보기 영역 */}
          <div className="w-1/2 h-full bg-gray-100 dark:bg-gray-900 p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              태스크 미리보기
            </h3>
            <div className="flex-1 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg">
              {formData.coverUrl ? (
                <img 
                  src={formData.coverUrl} 
                  alt="태스크 미리보기" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-gray-400 dark:text-gray-500">
                  이미지가 없습니다
                </div>
              )}
            </div>
            <div className="mt-4">
              <ImageUploader2 
                onUploadComplete={handleImageUploadComplete}
              />
            </div>
          </div>

          {/* 태스크 정보 입력 영역 */}
          <div className="w-1/2 h-full p-6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                업무 추가
              </DialogTitle>
              <DialogDescription className="text-gray-700 dark:text-gray-400">
                아래 양식을 작성해 주세요!
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div>
                <Label htmlFor="title" className="text-gray-900 dark:text-gray-300 text-sm font-medium">
                  제목
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-gray-900 dark:text-gray-300 text-sm font-medium">
                  설명
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="설명을 입력하세요"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="figmaUrl" className="text-gray-900 dark:text-gray-300 text-sm font-medium">
                  피그마 URL
                </Label>
                <Input
                  id="figmaUrl"
                  name="figmaUrl"
                  placeholder="피그마 URL을 입력하세요"
                  value={formData.figmaUrl}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isArchived"
                  checked={formData.isArchived}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label 
                  htmlFor="isArchived" 
                  className="text-gray-900 dark:text-gray-300 text-sm font-medium"
                >
                  태스크 보관처리
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-8">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="mr-2"
              >
                취소
              </Button>
              <Button
                variant="default"
                onClick={handleSubmit}
                className={cn(
                  "bg-blue-500 hover:bg-blue-600 text-white",
                  !isAuthenticated && "opacity-50 cursor-not-allowed"
                )}
                disabled={!isAuthenticated}
              >
                태스크 생성
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDashboardDialog;