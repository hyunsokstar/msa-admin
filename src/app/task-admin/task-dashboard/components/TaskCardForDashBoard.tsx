import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Trash2, Pencil, FileImage } from "lucide-react";
import { FaFigma } from "react-icons/fa6";
import { User } from "@/types/task/typeForTaskDashboard";
import EditDialogForTask from "./EditDialogForTask";
import { cn } from "@/lib/utils";
import IDialogButtonForTaskDashBoardDetail from "./IDialogButtonForTaskDashBoardDetail";
import DeleteDialogForTask from "./DeleteDialogForTask";

interface Props {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  created_by: User;
  isDragging?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TaskCardForDashBoard({
  id,
  title,
  description,
  screen_url,
  figma_url,
  created_by,
  isDragging,
  onEdit,
  onDelete,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  const handleFigmaClick = (e: React.MouseEvent) => {
    if (figma_url) {
      handleAction(e, () => window.open(figma_url, '_blank', 'noopener,noreferrer'));
    }
  };

  const buttonBaseClass = "w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg";
  const iconBaseClass = "w-4 h-4";

  console.log("created_by : ", created_by);

  return (
    <div className="relative group">
      <Card
        ref={setNodeRef}
        style={style}
        className="p-4 mb-2 bg-white cursor-move hover:shadow-md transition-shadow"
        {...attributes}
        {...listeners}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              
              <AvatarImage src={created_by?.profile_image_url || ""} alt={created_by?.full_name || "User"} />
              <AvatarFallback>{created_by?.full_name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium flex-1 line-clamp-1">{title}</h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </Card>

      <div 
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "bg-white rounded-lg p-1",
          "grid grid-cols-2 gap-1",
          "border border-gray-200 shadow-sm"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Figma Button */}
        <div
          role="button"
          tabIndex={0}
          className={cn(
            buttonBaseClass,
            figma_url 
              ? "text-[#1E1E1E] hover:text-[#0E0E0E] cursor-pointer" 
              : "text-gray-300 cursor-not-allowed"
          )}
          onClick={handleFigmaClick}
          onKeyDown={(e) => e.key === 'Enter' && handleFigmaClick(e as unknown as React.MouseEvent)}
          title={figma_url ? "피그마에서 보기" : "피그마 링크 없음"}
        >
          <FaFigma className={iconBaseClass} />
        </div>

        {/* Screenshot Button */}
        <div className={buttonBaseClass}>
          {screen_url ? (
            <IDialogButtonForTaskDashBoardDetail
              title={title}
              description={description}
              imageUrl={screen_url} 
              id={id}            
              />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <FileImage className={iconBaseClass} />
            </div>
          )}
        </div>

        {/* Edit Button */}
        <div className={buttonBaseClass}>
          <EditDialogForTask 
            task={{ id, title, description, screen_url, figma_url, is_archived: false }}
          />
        </div>

        {/* Delete Button */}
        {/* <div
          role="button"
          tabIndex={0}
          className={buttonBaseClass}
          onClick={(e) => onDelete && handleAction(e, onDelete)}
          onKeyDown={(e) => e.key === 'Enter' && onDelete && handleAction(e as unknown as React.MouseEvent, onDelete)}
        >
          <Trash2 className={iconBaseClass} />
        </div> */}
        <DeleteDialogForTask taskId={id} taskTitle={title}        />

      </div>
    </div>
  );
}