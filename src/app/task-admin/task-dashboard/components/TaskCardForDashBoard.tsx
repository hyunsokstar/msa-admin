import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { User } from '@/types/task/typeForTaskDashboard';

interface Props {
  id: string;
  title: string;
  description: string | null;
  screen_url: string | null;
  figma_url: string | null;
  created_by: User;
  isDragging?: boolean;
}

export function TaskCardForDashBoard({
  id,
  title,
  description,
  screen_url,
  figma_url,
  created_by,
  isDragging
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

  const handleFigmaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (figma_url) {
      window.open(figma_url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (screen_url) {
      window.open(screen_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative">
      <Card
        ref={setNodeRef}
        style={style}
        className="p-4 mb-2 bg-white cursor-move hover:shadow-md transition-shadow"
        {...attributes}
        {...listeners}
      >
        <div className="flex flex-col gap-3">
          {/* Avatar and Title Row */}
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={created_by?.profile_image_url || ''} alt={created_by?.full_name || 'User'} />
              <AvatarFallback>{created_by?.full_name?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium flex-1 line-clamp-1">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        </div>
      </Card>

      {/* Links and Image - Outside of draggable area */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {figma_url && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 p-2 hover:bg-gray-100 rounded-full"
            onClick={handleFigmaClick}
          >
            <ExternalLink className="h-4 w-4 text-gray-600" />
          </Button>
        )}
        
        {screen_url && (
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full overflow-hidden"
            onClick={handleScreenClick}
          >
            <div className="relative h-full w-full">
              <Image
                src={screen_url}
                alt="Screen preview"
                className="object-cover"
                fill
                sizes="32px"
              />
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}