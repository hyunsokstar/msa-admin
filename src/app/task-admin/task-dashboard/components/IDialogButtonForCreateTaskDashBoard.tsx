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

const IDialogButtonForCreateTaskDashBoard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog 상태 추가
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    screen_url: "",
    isArchived: false,
    figmaUrl: "",
  });

  const { user, isAuthenticated } = useUserStore();
  const createTaskDashboard = useApiForCreateTaskDashboard();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUploadComplete = (fileUrl: string) => {
    setFormData((prev) => ({ ...prev, screen_url: fileUrl }));
  };

  const handleSubmit = () => {
    if (!user) return;

    createTaskDashboard.mutate(
      {
        title: formData.title,
        description: formData.description,
        screen_url: formData.screen_url,
        isArchived: formData.isArchived,
        figmaUrl: formData.figmaUrl,
        createdBy: user.id,
      },
      {
        onSuccess: () => {
          // 입력 성공 시 Dialog 닫기 및 폼 초기화
          setIsDialogOpen(false);
          setFormData({
            title: "",
            description: "",
            screen_url: "",
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
          className={`bg-blue-500 hover:bg-blue-600 text-white ${
            !isAuthenticated && "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isAuthenticated}
        >
          Create Task Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50 dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Create New Task Dashboard</DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-400">
            Fill out the details below to create a new task dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-gray-900 dark:text-gray-300">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-gray-900 dark:text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="screen_url" className="text-gray-900 dark:text-gray-300">
              Screen URL
            </Label>
            <ImageUploader2 onUploadComplete={handleImageUploadComplete} />
          </div>
          <div>
            <Label htmlFor="figmaUrl" className="text-gray-900 dark:text-gray-300">
              Figma URL
            </Label>
            <Input
              id="figmaUrl"
              name="figmaUrl"
              placeholder="Enter Figma URL"
              value={formData.figmaUrl}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              id="isArchived"
              name="isArchived"
              checked={formData.isArchived}
              onCheckedChange={(checked) => handleCheckboxChange({ target: { name: "isArchived", checked } } as React.ChangeEvent<HTMLInputElement>)}
              className="border-gray-300 dark:border-gray-600"
            />
            <Label htmlFor="isArchived" className="text-gray-900 dark:text-gray-300">
              Is Archived
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsDialogOpen(false)} // 취소 버튼 클릭 시 Dialog 닫기
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            className={`bg-blue-500 hover:bg-blue-600 text-white ${
              !isAuthenticated && "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isAuthenticated}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateTaskDashBoard;
