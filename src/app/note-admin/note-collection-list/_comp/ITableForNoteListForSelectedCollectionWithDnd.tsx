// components/notes/ITableForNoteListForSelectedCollectionWithDnd.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "rc-pagination";
import { Note } from "@/types/notes/typeForNotes";
import { useApiForGetNotesForNoteCollection } from "@/hook/notes/useApiForGetNotesForNoteCollection";
import { SkeletonForNoteListTable } from "./SkeletonForNoteListTable";
import { NoteTableEmptyState } from "./NoteTableEmptyState";

// dnd-kit 관련
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableRowForNote } from "./SortableRowForNote";
import { useApiForUpdateNoteOrder } from "@/hook/notes/useApiForUpdateNoteOrder";

interface ITableForNoteListForSelectedCollectionProps {
  collectionId: string;
}

export const ITableForNoteListForSelectedCollectionWithDnd: React.FC<
  ITableForNoteListForSelectedCollectionProps
> = ({ collectionId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useApiForGetNotesForNoteCollection({
    collectionId,
    page: currentPage,
    pageSize,
  });

  const [notes, setNotes] = useState<Note[]>([]);

  const { mutate: updateNoteOrder } = useApiForUpdateNoteOrder();

  useEffect(() => {
    if (data?.data) {
      setNotes(data.data);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setNotes((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(prev, oldIndex, newIndex);

      // 서버에 순서 업데이트
      const itemsToUpdate = newOrder.map((note, index) => ({
        id: note.id,
        order: index + 1, // 순서 번호를 1부터 시작
      }));
      updateNoteOrder(itemsToUpdate);

      return newOrder;
    });
  };

  if (error) {
    return <div className="p-6 text-center text-red-600">노트를 불러오는데 실패했습니다</div>;
  }

  return (
    <div className="space-y-4">
      <DndContext onDragEnd={handleDragEnd}>
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[40px] text-slate-700 text-center">번호</TableHead>
              <TableHead className="w-[200px] text-slate-700">Writer</TableHead>
              <TableHead className="min-w-[320px] text-slate-700">Title</TableHead>
              <TableHead className="w-[130px] text-slate-700">Created</TableHead>
              <TableHead className="w-[140px] text-center pr-6 text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <SkeletonForNoteListTable />
            ) : notes.length === 0 ? (
              <NoteTableEmptyState />
            ) : (
              <SortableContext
                items={notes.map((n) => n.id)}
                strategy={verticalListSortingStrategy}
              >
                {notes.map((note, index) => (
                  <SortableRowForNote
                    key={note.id}
                    note={note}
                    collectionId={collectionId}
                    orderNumber={index + 1}
                  />
                ))}
              </SortableContext>
            )}
          </TableBody>
        </Table>
      </DndContext>

      {!isLoading && notes.length > 0 && (
        <div className="flex justify-between items-center bg-slate-50/70 px-4 py-3 border rounded-md">
          <div className="text-sm text-slate-600">
            Total{" "}
            <span className="font-medium text-slate-900">
              {data?.pagination.total || 0}
            </span>{" "}
            notes
          </div>
          <Pagination
            current={currentPage}
            total={data?.pagination.total || 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            className="rc-pagination-modern"
          />
        </div>
      )}
    </div>
  );
};
