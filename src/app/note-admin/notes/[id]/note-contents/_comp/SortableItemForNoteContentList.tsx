"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import IDialogButtonForDeleteNoteContents from './IDialogButtonForDeleteNoteContents';
import { useUserStore } from '@/store/useUserStore';
import type { CSSProperties } from 'react';

interface SortableItemProps {
  content: NoteContent;
  isSelected: boolean;
  onClick?: () => void;
  noteId: string;
  pageNum?: number;
  isDragging?: boolean;
}

export function SortableItemForNoteContentList({
  content,
  isSelected,
  onClick,
  noteId,
  pageNum,
  isDragging: isOverlayDragging
}: SortableItemProps) {
  const user = useUserStore(state => state.user);
  const isAuthenticated = !!user;
  const isAuthorized = user?.email === content.writer?.email || user?.is_admin;
  const canDrag = isAuthenticated && isAuthorized;

  // DragOverlay에서는 useSortable을 사용하지 않음
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = !isOverlayDragging ? useSortable({
    id: content.id,
    disabled: !canDrag
  }) : {
      attributes: {},
      listeners: {},
      setNodeRef: null,
      transform: null,
      transition: null,
      isDragging: false
    };

  const style: CSSProperties | undefined = !isOverlayDragging ? {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    zIndex: isDragging ? 2 : 1,
  } : undefined;

  const draggingState = isDragging || isOverlayDragging;

  return (
    <div
      ref={setNodeRef || undefined}
      style={style}
      className={`group flex items-center gap-2 p-3 transition-all
        border rounded-lg
        ${draggingState ? 'shadow-lg bg-white opacity-90' : ''}
        ${isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'}`}
    >
      {!isOverlayDragging && canDrag && (
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      )}

      {!isOverlayDragging && !canDrag && (
        <div className="p-1 cursor-not-allowed">
          <GripVertical className="h-4 w-4 text-gray-300" />
        </div>
      )}

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

      {!isOverlayDragging && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <IDialogButtonForDeleteNoteContents
            contentId={content.id}
            writerEmail={content.writer?.email || ''}
            noteId={noteId}
            pageNum={pageNum}
          />
        </div>
      )}
    </div>
  );
}