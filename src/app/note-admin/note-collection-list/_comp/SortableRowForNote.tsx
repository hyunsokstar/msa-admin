// components/notes/SortableRowForNote.tsx
"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { IDialogButtonForUpdateNote } from "@/components/dialog/IDialogButtonForUpdateNote";
import { IDialogButtonForDeleteNote } from "@/components/dialog/IDialogButtonForDeleteNote";
import { Note } from "@/types/notes/typeForNotes";

// dnd-kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 순서 번호 대신 아이콘 대신 순서 번호를 출력
interface SortableRowForNoteProps {
  note: Note;
  collectionId: string;
  orderNumber: number;
}

export const SortableRowForNote: React.FC<SortableRowForNoteProps> = ({
  note,
  collectionId,
  orderNumber,
}) => {
  // useSortable로 드래그/드롭에 필요한 값 가져오기
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id });

  // transform을 style로 변환
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : undefined,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="hover:bg-blue-50/30 transition-colors duration-200"
    >
      {/* 순서 번호 출력용 셀 (버튼으로 감싸서 드래그 가능) */}
      <TableCell className="text-center w-[40px]">
        <button
          className="p-1 text-slate-400 hover:text-slate-600"
          {...attributes}
          {...listeners}
        >
          {orderNumber}
        </button>
      </TableCell>

      <TableCell className="w-[200px]">
        <div className="flex items-center gap-2">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={note.writer?.profile_image_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium text-sm">
              {note.writer?.full_name?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-slate-900 text-sm">
              {note.writer?.full_name || "Anonymous"}
            </div>
            <div className="text-xs text-slate-500">Writer</div>
          </div>
        </div>
      </TableCell>

      <TableCell className="min-w-[320px]">
        <Link
          href={`/note-admin/notes/${note.id}/note-contents`}
          className="block text-slate-900 hover:text-blue-600 transition-colors duration-200"
        >
          <div className="line-clamp-2 hover:underline font-medium">
            {note.title}
          </div>
        </Link>
      </TableCell>

      <TableCell className="w-[130px]">
        <time className="text-sm text-slate-600">
          {new Date(note.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </TableCell>

      <TableCell className="w-[140px] pr-2">
        <div className="flex gap-2 justify-center">
          <IDialogButtonForUpdateNote
            noteId={note.id}
            initialTitle={note.title}
            collectionId={collectionId}
            writerEmail={note.writer?.email || ""}
          />
          <IDialogButtonForDeleteNote
            noteId={note.id}
            noteTitle={note.title}
            collectionId={collectionId}
            writerEmail={note.writer?.email || ""}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};
