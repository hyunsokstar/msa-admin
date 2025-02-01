"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import IDialogButtonForDeleteNoteContents from './IDialogButtonForDeleteNoteContents';

interface SortableItemProps {
  content: NoteContent;
  isSelected: boolean;
  onClick: () => void;
  noteId: string;
  pageNum?: number;
}

export function SortableItemForNoteContentList({
  content,
  isSelected,
  onClick,
  noteId,
  pageNum
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: content.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 p-3 transition-all
        border rounded-lg
        ${isDragging ? 'shadow-lg bg-white opacity-90' : ''}
        ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div
        className="flex-1 flex items-center gap-3 cursor-pointer"
        onClick={onClick}
      >
        <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100/80 font-medium text-gray-600">
          {content.order}
        </span>
        <div className="min-w-0">
          <p className="font-medium text-gray-700 truncate">
            {content.title}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {content.path}
          </p>
        </div>
      </div>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <IDialogButtonForDeleteNoteContents
          contentId={content.id}
          writerEmail={content.writer?.email || ''}
          noteId={noteId}
          pageNum={pageNum}
        />
      </div>
    </div>
  );
}