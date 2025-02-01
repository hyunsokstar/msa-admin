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
import { TaskDashboardForUpdate } from "@/types/task/typeForTaskDashboard";
import { useApiForUpdateTask } from "@/hook/task/useApiForUpdateTask";
import ImageUploader2 from "@/components/file-uploader/ImageUploader2";
import { toast } from 'react-toastify';
import { Edit } from "lucide-react";

interface EditDialogProps {
  task: TaskDashboardForUpdate;
}

const EditDialogForTask = ({ task }: EditDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(task);
  const updateTask = useApiForUpdateTask();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_archived: checked }));
  };

  const handleImageUploadComplete = (fileUrl: string) => {
    setFormData((prev) => ({ ...prev, screen_url: fileUrl }));
  };

  const handleSubmit = async () => {
    try {
      await updateTask.mutateAsync(formData);
      toast.success('Task updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsDialogOpen(false);
    } catch (error) {
      toast.error('Failed to update task. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Update error:', error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 p-2 hover:bg-gray-100 rounded-lg"
        >
          <Edit className="h-4 w-4 text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-50 dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Edit Task</DialogTitle>
          <DialogDescription className="text-gray-700 dark:text-gray-400">
            Modify the details of the task below.
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
              value={formData.description ?? ""}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="screen_url" className="text-gray-900 dark:text-gray-300">
              Screen URL
            </Label>
            <ImageUploader2
              onUploadComplete={handleImageUploadComplete}
              initialImage={formData.screen_url ?? ""}
              isUpdate={true}
            />
          </div>
          <div>
            <Label htmlFor="figma_url" className="text-gray-900 dark:text-gray-300">
              Figma URL
            </Label>
            <Input
              id="figma_url"
              name="figma_url"
              placeholder="Enter Figma URL"
              value={formData.figma_url ?? ""}
              onChange={handleInputChange}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center gap-4">
            <Checkbox
              id="is_archived"
              checked={formData.is_archived ?? false}
              onCheckedChange={handleCheckboxChange}
              className="border-gray-300 dark:border-gray-600"
            />
            <Label htmlFor="is_archived" className="text-gray-900 dark:text-gray-300">
              Is Archived
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsDialogOpen(false)}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            disabled={updateTask.isPending}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {updateTask.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogForTask;