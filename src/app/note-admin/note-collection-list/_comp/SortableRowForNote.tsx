// ✅ components/notes/SortableRowForNote.tsx
'use client'

import { TableCell, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { IDialogButtonForUpdateNote } from '@/components/dialog/IDialogButtonForUpdateNote'
import { IDialogButtonForDeleteNote } from '@/components/dialog/IDialogButtonForDeleteNote'
import { Note } from '@/types/notes/typeForNotes'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SortableRowForNoteProps {
  note: Note
  collectionId: string
  orderNumber: number
  currentNoteId: string
  onCloseDialog?: () => void
  onClickNote?: (noteId: string, noteTitle: string) => void
}

export const SortableRowForNote: React.FC<SortableRowForNoteProps> = ({
  note,
  collectionId,
  orderNumber,
  currentNoteId,
  onCloseDialog,
  onClickNote
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: note.id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1
  }

  const isCurrent = note.id.toString() === currentNoteId
  const encodedTitle = encodeURIComponent(note.title)
  const writerName = note.writer?.full_name || 'Anonymous'
  const writerInitial = writerName.charAt(0)

  const handleClickLink = () => {
    if (onClickNote) {
      onClickNote(note.id.toString(), note.title)
    } else if (onCloseDialog) {
      onCloseDialog()
    }
  }

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn('transition-colors duration-200 hover:bg-blue-50/30')}
    >
      <TableCell className={cn('w-[40px] text-center', isCurrent && 'bg-yellow-100')}>
        <button
          type="button"
          className="flex items-center justify-center gap-1 p-1 text-slate-400 hover:text-slate-600"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
          <span>{orderNumber}</span>
        </button>
      </TableCell>

      <TableCell className={cn('w-[200px]', isCurrent && 'bg-yellow-100')}>
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={note.writer?.profile_image_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium text-sm">
              {writerInitial}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-slate-900">{writerName}</div>
            <div className="text-xs text-slate-500">Writer</div>
          </div>
        </div>
      </TableCell>

      <TableCell className={cn('min-w-[320px]', isCurrent && 'bg-yellow-100')}>
        <Link
          href={`/note-admin/notes/${note.id}/note-contents?collectionId=${collectionId}&noteTitle=${encodedTitle}`}
          className="block font-medium text-slate-900 transition-colors duration-200 hover:text-blue-600"
          onClick={handleClickLink}
        >
          <div className="line-clamp-2 hover:underline flex items-center justify-between">
            <span>{note.title}</span>
            {isCurrent && (
              <span className="ml-2 text-sm text-yellow-600" title="현재 노트">📌</span>
            )}
          </div>
        </Link>
      </TableCell>

      <TableCell className={cn('w-[130px]', isCurrent && 'bg-yellow-100')}>
        <time
          dateTime={note.created_at}
          className="text-sm text-slate-600"
        >
          {new Date(note.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
      </TableCell>

      <TableCell className={cn('w-[140px] pr-2', isCurrent && 'bg-yellow-100')}>
        <div className="flex justify-center gap-2">
          <IDialogButtonForUpdateNote
            noteId={note.id}
            initialTitle={note.title}
            collectionId={collectionId}
            writerEmail={note.writer?.email || ''}
          />
          <IDialogButtonForDeleteNote
            noteId={note.id}
            noteTitle={note.title}
            collectionId={collectionId}
            writerEmail={note.writer?.email || ''}
          />
        </div>
      </TableCell>
    </TableRow>
  )
}
