// src/app/Note/[id]/_comp/SortableNoteContentList.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter, 
  DragEndEvent, 
  DragStartEvent, 
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { 
  SortableContext, 
  arrayMove, 
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import { SortableItemForNoteContentList } from './SortableItemForNoteContentList';
import { useApiForUpdateNoteContentOrder } from '@/hook/notes/useApiForUpdateNoteContentOrder';

interface SortableNoteListProps {
  contents: NoteContent[];
  selectedNoteId: string | null;
  setSelectedNote: (note: NoteContent) => void;
  onDelete: (contentId: string) => void;
  isDeletingId?: string;
  noteId: string;  // 추가
  pageNum: number; // 추가
}

const SortableNoteList = ({
  contents,
  selectedNoteId,
  setSelectedNote,
  onDelete,
  isDeletingId,
  noteId,
  pageNum
}: SortableNoteListProps) => {
  const [items, setItems] = useState(contents);
  const [activeId, setActiveId] = useState<string | null>(null);
  const updateOrderMutation = useApiForUpdateNoteContentOrder(noteId, pageNum);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setItems(contents);
  }, [contents]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);

      // API를 통해 순서 업데이트
      const orderUpdates = newItems.map((item, index) => ({
        id: item.id,
        order: index + 1,
      }));

      try {
        await updateOrderMutation.mutateAsync(orderUpdates);
      } catch (error) {
        // 에러 발생 시 원래 상태로 복구
        setItems(contents);
      }
    }
  };

  const activeItem = items.find(item => activeId ? item.id.toString() === activeId : false);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={items.map(item => item.id)} 
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 p-2">
          {items.map((content) => (
            <SortableItemForNoteContentList
              key={content.id}
              content={content}
              isSelected={selectedNoteId === content.id.toString()}
              onClick={() => setSelectedNote(content)}
              onDelete={onDelete}
              isDeleting={isDeletingId === content.id.toString()}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId && activeItem ? (
          <SortableItemForNoteContentList
            content={activeItem}
            isSelected={selectedNoteId === activeItem.id.toString()}
            onClick={() => {}}
            onDelete={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SortableNoteList;