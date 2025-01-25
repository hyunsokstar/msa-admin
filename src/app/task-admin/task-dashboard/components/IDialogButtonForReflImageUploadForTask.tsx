import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import MultiImageUploader from "@/components/file-uploader/MultiImageUploader";
import { useApiForCreateReferenceImageForTask } from "@/hook/task/useApiForCreateReferenceImageForTask";

interface IDialogButtonForReflImageUploadForTaskProps {
  taskId: string;
  title?: string;
  maxFiles?: number;
}

const IDialogButtonForReflImageUploadForTask: React.FC<IDialogButtonForReflImageUploadForTaskProps> = ({
  taskId,
  title = "",
  maxFiles = 5
}) => {
  const uploadMutation = useApiForCreateReferenceImageForTask(taskId);

  const handleUploadComplete = async (fileUrls: string[]) => {
    console.log('Uploaded image URLs:', fileUrls);
    // TODO: Handle the uploaded image URLs as needed

    try {
      await uploadMutation.mutateAsync(fileUrls);
    } catch (error) {
      console.error('Failed to upload images:', error);
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2" size="sm">
          <PlusCircle className="w-4 h-4" />
          {title}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-screen max-w-lg rounded-lg shadow-lg p-6 bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Upload Reference Images
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <MultiImageUploader
            onUploadComplete={handleUploadComplete}
            maxFiles={maxFiles}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForReflImageUploadForTask;