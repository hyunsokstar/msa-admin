import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2, FileImage } from 'lucide-react';
import { FaFigma } from 'react-icons/fa6';
import { User } from '@/types/task/typeForTaskDashboard';
import EditDialogForTask from './EditDialogForTask';
<<<<<<< HEAD
import { cn } from '@/lib/utils';
=======
import DeleteDialogForTask from './DeleteDialogForTask';
>>>>>>> b05463cfcf99b77601f180f6af10ef00d3036af1

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

  const buttonBaseClass = "h-8 w-8 p-1.5 hover:bg-gray-100 rounded-lg";

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
              <AvatarImage src={created_by?.profile_image_url || ''} alt={created_by?.full_name || 'User'} />
              <AvatarFallback>{created_by?.full_name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium flex-1 line-clamp-1">{title}</h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </Card>

      {/* Action Buttons Container */}
      <div 
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2",
          "bg-white rounded-lg p-1",
          "grid grid-cols-2 gap-1",
          "border border-gray-200"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            buttonBaseClass,
            figma_url 
              ? "text-[#1E1E1E] hover:text-[#0E0E0E]" 
              : "text-gray-300 cursor-not-allowed"
          )}
          onClick={(e) => handleAction(e, () => figma_url && window.open(figma_url, '_blank', 'noopener,noreferrer'))}
          disabled={!figma_url}
          title={figma_url ? "피그마에서 보기" : "피그마 링크 없음"}
        >
          <FaFigma className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className={buttonBaseClass}
          onClick={(e) => handleAction(e, () => screen_url && window.open(screen_url, '_blank', 'noopener,noreferrer'))}
          disabled={!screen_url}
          title={screen_url ? "스크린샷 보기" : "스크린샷 없음"}
        >
          {screen_url ? (
            <div className="relative w-5 h-5 rounded-sm overflow-hidden border border-gray-200">
              <Image
                src={screen_url}
                alt="Screen preview"
                className="object-cover"
                fill
                sizes="20px"
                quality={100}
                priority
                unoptimized
              />
            </div>
          ) : (
            <FileImage className="h-4 w-4 text-gray-600" />
          )}
        </Button>

        <EditDialogForTask 
          task={{ id, title, description, screen_url, figma_url, is_archived: false }}
        />

        <Button
          size="icon"
          variant="ghost"
          className={buttonBaseClass}
          onClick={(e) => onDelete && handleAction(e, onDelete)}
        >
          <Trash2 className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}