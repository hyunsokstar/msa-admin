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
    console.log("Image upload completed:", fileUrl);
    setFormData((prev) => ({ ...prev, coverUrl: fileUrl }));
  };

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await createTaskDashboard.mutateAsync({
        title: formData.title,
        description: formData.description,
        coverUrl: formData.coverUrl,
        isArchived: formData.isArchived,
        figmaUrl: formData.figmaUrl,
        createdBy: user.id,
      });

      setIsDialogOpen(false);
      setFormData({
        title: "",
        description: "",
        coverUrl: "",
        isArchived: false,
        figmaUrl: "",
      });
    } catch (error) {
      console.error("Task dashboard creation failed:", error);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
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
            <path d="M12 5v14M5 12h14" />
          </svg>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-w-full w-screen h-screen p-0 bg-white dark:bg-gray-800 border-0 rounded-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          transform: 'none'
        }}
      >
        {/* 헤더 - 닫기 버튼 포함 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              업무 추가
            </DialogTitle>
            <DialogDescription className="text-gray-700 dark:text-gray-400 mt-1">
              아래 양식을 작성해 주세요!
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex flex-1 h-full overflow-hidden">
          {/* 이미지 미리보기 영역 */}
          <div className="w-1/2 h-full bg-gray-50 dark:bg-gray-900 p-8 flex flex-col">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              태스크 미리보기
            </h3>
            <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 min-h-0">
              {formData.coverUrl ? (
                <img
                  src={formData.coverUrl}
                  alt="태스크 미리보기"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400 dark:text-gray-500"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    이미지를 업로드해주세요
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6">
              <ImageUploader2
                onUploadComplete={handleImageUploadComplete}
                initialImage={formData.coverUrl}
                isUpdate={false}
              />
            </div>
          </div>

          {/* 태스크 정보 입력 영역 */}
          <div className="w-1/2 h-full flex flex-col">
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="space-y-8 max-w-2xl">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-gray-900 dark:text-gray-300 text-base font-semibold block mb-3"
                  >
                    제목 *
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="태스크 제목을 입력하세요"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="text-base h-12"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="description"
                    className="text-gray-900 dark:text-gray-300 text-base font-semibold block mb-3"
                  >
                    설명
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="태스크에 대한 상세한 설명을 입력하세요"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="text-base min-h-[180px] resize-none"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="figmaUrl"
                    className="text-gray-900 dark:text-gray-300 text-base font-semibold block mb-3"
                  >
                    피그마 URL
                  </Label>
                  <Input
                    id="figmaUrl"
                    name="figmaUrl"
                    placeholder="https://www.figma.com/..."
                    value={formData.figmaUrl}
                    onChange={handleInputChange}
                    className="text-base h-12"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Checkbox
                    id="isArchived"
                    checked={formData.isArchived}
                    onCheckedChange={handleCheckboxChange}
                    className="h-5 w-5"
                  />
                  <Label
                    htmlFor="isArchived"
                    className="text-gray-900 dark:text-gray-300 text-base font-medium cursor-pointer"
                  >
                    태스크를 보관함으로 이동
                  </Label>
                </div>
              </div>
            </div>

            {/* Footer - 액션 버튼들 */}
            <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="px-8 py-3 text-base h-auto"
                  size="lg"
                >
                  취소
                </Button>
                <Button
                  variant="default"
                  onClick={handleSubmit}
                  className={cn(
                    "px-8 py-3 text-base h-auto",
                    "bg-blue-500 hover:bg-blue-600 text-white",
                    !isAuthenticated && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!isAuthenticated || !formData.title.trim()}
                  size="lg"
                >
                  태스크 생성
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDashboardDialog;