"use client";

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from 'rc-pagination';
import { Note } from '@/types/notes/typeForNotes';
import { useApiForGetNotesForNoteCollection } from '@/hook/notes/useApiForGetNotesForNoteCollection';
import { IDialogButtonForCreateNote } from '@/components/dialog/IDialogButtonForCreateNote';
import { IDialogButtonForUpdateNote } from '@/components/dialog/IDialogButtonForUpdateNote';
import { IDialogButtonForDeleteNote } from '@/components/dialog/IDialogButtonForDeleteNote';
import Link from 'next/link';

interface ITableForNoteListForSelectedCollectionProps {
  collectionId: string;
}

const LoadingSkeleton = () => {
  return Array(5).fill(0).map((_, idx) => (
    <TableRow key={idx} className="animate-in fade-in-50 slide-in-from-top-2">
      <TableCell className="text-center">
        <div className="flex items-center gap-3 justify-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-3 w-[180px]" />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="inline-flex gap-2 justify-center">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

export const ITableForNoteListForSelectedCollection: React.FC<ITableForNoteListForSelectedCollectionProps> = ({
  collectionId
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useApiForGetNotesForNoteCollection({
    collectionId,
    page: currentPage,
    pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">Failed to load notes</div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[250px] text-center">Writer</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="w-[180px] text-center">Created At</TableHead>
              <TableHead className="w-[120px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              data?.data.map((note: Note) => (
                <TableRow
                  key={note.id}
                  className="group hover:bg-slate-50/50 transition-colors duration-200"
                >
                  <TableCell className="text-center">
                    <div className="flex items-center gap-3 justify-center">
                      <Avatar className="border border-slate-200 shadow-sm">
                        <AvatarImage src={note.writer?.profile_image_url || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600">
                          {note.writer?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-center">
                        <span className="font-medium text-slate-900">
                          {note.writer?.full_name || 'Anonymous'}
                        </span>
                        <span className="text-sm text-slate-500">Writer</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    <Link 
                      href={`/note-admin/notes/${note.id}/note-contents`}
                      className="inline-block font-medium text-slate-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      <div className="line-clamp-2 hover:underline cursor-pointer">
                        {note.title}
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="text-center">
                    <time className="text-sm text-slate-500">
                      {new Date(note.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IDialogButtonForUpdateNote
                        noteId={note.id}
                        initialTitle={note.title}
                        collectionId={collectionId}
                      />
                      <IDialogButtonForDeleteNote
                        noteId={note.id}
                        noteTitle={note.title}
                        collectionId={collectionId}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-500">
            Total <span className="font-medium text-slate-900">{data?.pagination.total || 0}</span> notes
          </div>
          <Pagination
            current={currentPage}
            total={data?.pagination.total || 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            className="rc-pagination-modern"
          />
        </div>
      </div>
    </div>
  );
};