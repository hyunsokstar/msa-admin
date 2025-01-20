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
import ImageUploaderForEdit from "@/components/file-uploader/ImageUploaderForEdit";

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageUploadComplete = (updatedImage: string | null) => {
    setFormData((prev) => ({ ...prev, screen_url: updatedImage }));
  };

  const handleSubmit = () => {
    updateTask.mutate(formData);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-gray-100">
          Edit
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
            <ImageUploaderForEdit
              initialImage={formData.screen_url ?? ""}
              onUpdateImage={handleImageUploadComplete}
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
              id="isArchived"
              name="isArchived"
              checked={formData.is_archived ?? false}
              onCheckedChange={(checked) =>
                handleCheckboxChange({ target: { name: "isArchived", checked } } as React.ChangeEvent<HTMLInputElement>)
              }
              className="border-gray-300 dark:border-gray-600"
            />
            <Label htmlFor="isArchived" className="text-gray-900 dark:text-gray-300">
              Is Archived
            </Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsDialogOpen(false)} className="bg-gray-200 dark:bg-gray-700">
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogForTask;
