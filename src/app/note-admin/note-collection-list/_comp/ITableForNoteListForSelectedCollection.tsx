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
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
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
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
            <TableHead className="w-[300px]">Writer</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[180px]">Created</TableHead>
            <TableHead className="w-[100px] text-right">Actions</TableHead>
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
                className="group hover:bg-blue-50/30 transition-colors duration-200"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="border-2 border-white shadow-sm">
                      <AvatarImage src={note.writer?.profile_image_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                        {note.writer?.full_name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-slate-900">
                        {note.writer?.full_name || 'Anonymous'}
                      </div>
                      <div className="text-sm text-slate-500">Writer</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/note-admin/notes/${note.id}/note-contents`}
                      className="block font-medium text-slate-900 group-hover:text-blue-600 transition-colors duration-200"
                    >
                      <div className="line-clamp-2 hover:underline cursor-pointer">
                        {note.title}
                      </div>
                    </Link>
                  </div>
                </TableCell>

                <TableCell>
                  <time className="text-sm text-slate-500">
                    {new Date(note.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </TableCell>

                <TableCell>
                  <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
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
        <div className="flex justify-between items-center bg-gray-50 -mx-6 px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Total <span className="font-medium text-gray-900">{data?.pagination.total || 0}</span> notes
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