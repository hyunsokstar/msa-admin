// ✅ components/ITableForNoteListForSelectedCollectionWithDnd.tsx
'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Pagination from 'rc-pagination'
import { Note } from '@/types/notes/typeForNotes'
import { useApiForGetNotesForNoteCollection } from '@/hook/notes/useApiForGetNotesForNoteCollection'
import { SkeletonForNoteListTable } from './SkeletonForNoteListTable'
import { NoteTableEmptyState } from './NoteTableEmptyState'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableRowForNote } from './SortableRowForNote'
import { useApiForUpdateNoteOrder } from '@/hook/notes/useApiForUpdateNoteOrder'

interface Props {
  collectionId: string
  currentNoteId?: string
  onClickNote?: (noteId: string, noteTitle: string) => void
  onCloseDialog?: () => void
}

export const ITableForNoteListForSelectedCollectionWithDnd: React.FC<Props> = ({
  collectionId,
  currentNoteId,
  onClickNote,
  onCloseDialog
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data, isLoading, error } = useApiForGetNotesForNoteCollection({
    collectionId,
    page: currentPage,
    pageSize
  })

  const [notes, setNotes] = useState<Note[]>([])
  const { mutate: updateNoteOrder } = useApiForUpdateNoteOrder()

  useEffect(() => {
    if (data?.data) setNotes(data.data)
  }, [data])

  const handlePageChange = (page: number) => setCurrentPage(page)

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setNotes(prev => {
      const oldIndex = prev.findIndex(item => item.id === active.id)
      const newIndex = prev.findIndex(item => item.id === over.id)
      const newOrder = arrayMove(prev, oldIndex, newIndex)

      updateNoteOrder(
        newOrder.map((note, idx) => ({ id: note.id, order: idx + 1 }))
      )

      return newOrder
    })
  }

  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        노트를 불러오는데 실패했습니다
      </div>
    )

  return (
    <div className="space-y-4">
      <DndContext onDragEnd={handleDragEnd}>
        <Table className="border">
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[40px] text-center">번호</TableHead>
              <TableHead className="w-[200px]">Writer</TableHead>
              <TableHead className="min-w-[320px]">Title</TableHead>
              <TableHead className="w-[130px]">Created</TableHead>
              <TableHead className="w-[140px] text-center pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <SkeletonForNoteListTable />
            ) : notes.length === 0 ? (
              <NoteTableEmptyState />
            ) : (
              <SortableContext
                items={notes.map(n => n.id)}
                strategy={verticalListSortingStrategy}
              >
                {notes.map((note, idx) => (
                  <SortableRowForNote
                    key={note.id}
                    note={note}
                    collectionId={collectionId}
                    orderNumber={idx + 1}
                    currentNoteId={currentNoteId || ''}
                    onCloseDialog={onCloseDialog}
                    onClickNote={onClickNote}
                  />
                ))}
              </SortableContext>
            )}
          </TableBody>
        </Table>
      </DndContext>

      {!isLoading && notes.length > 0 && (
        <div className="flex justify-between items-center bg-slate-50/70 px-4 py-3 border rounded-md">
          <div className="text-sm">
            Total <span className="font-medium">{data?.pagination.total || 0}</span> notes
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
  )
}

// ✅ c