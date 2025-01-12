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
import { PlusCircle } from "lucide-react";
import Link from 'next/link';
import { IDialogButtonForUpdateNote } from '@/components/dialog/IDialogButtonForUpdateNote';
import { IDialogButtonForDeleteNote } from '@/components/dialog/IDialogButtonForDeleteNote';

interface ITableForNoteListForSelectedCollectionProps {
  collectionId: string;
}

const LoadingSkeleton = () => {
  return Array(5).fill(0).map((_, idx) => (
    <TableRow key={idx} className="animate-in fade-in-50 slide-in-from-top-2">
      <TableCell className="w-[200px]">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </TableCell>
      <TableCell className="min-w-[320px]">
        <div className="flex items-center">
          <Skeleton className="h-4 w-48" />
        </div>
      </TableCell>
      <TableCell className="w-[130px]">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="w-[140px]">
        <div className="flex gap-2 justify-end pr-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner">
          <PlusCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          노트가 없습니다
        </h3>
        <p className="text-sm text-gray-500 max-w-[260px]">
          새로운 노트를 추가해서 컬렉션을 채워보세요
        </p>
      </div>
    </TableCell>
  </TableRow>
);

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
    <div className="space-y-4">
      <Table className="border">
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
            <TableHead className="w-[200px] text-slate-700">Writer</TableHead>
            <TableHead className="min-w-[320px] text-slate-700">Title</TableHead>
            <TableHead className="w-[130px] text-slate-700">Created</TableHead>
            <TableHead className="w-[140px] text-center pr-6 text-slate-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : data?.data.length === 0 ? (
            <EmptyState />
          ) : (
            data?.data.map((note: Note) => (
              <TableRow
                key={note.id}
                className="hover:bg-blue-50/30 transition-colors duration-200"
              >
                <TableCell className="w-[200px]">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                      <AvatarImage src={note.writer?.profile_image_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 font-medium text-sm">
                        {note.writer?.full_name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900 text-sm">
                        {note.writer?.full_name || 'Anonymous'}
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
                    {new Date(note.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </TableCell>

                <TableCell className="w-[140px] pr-2">
                  <div className="flex gap-2 justify-center">
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

      {!isLoading && data?.data && data.data.length > 0 && (
        <div className="flex justify-between items-center bg-slate-50/70 px-4 py-3 border rounded-md">
          <div className="text-sm text-slate-600">
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
      )}
    </div>
  );
};