// C:\Users\terec\msa-admin\src\app\note-admin\note-collection-list\[id]\notes\page.tsx
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
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Note } from '@/types/notes/typeForNotes';
import { useApiForGetNotesForNoteCollection } from '@/hook/notes/useApiForGetNotesForNoteCollection';
import { IDialogButtonForCreateNote } from '@/components/dialog/IDialogButtonForCreateNote';
import { IDialogButtonForUpdateNote } from '@/components/dialog/IDialogButtonForUpdateNote';
import { IDialogButtonForDeleteNote } from '@/components/dialog/IDialogButtonForDeleteNote';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from 'next/link';

interface Props {
  params: Promise<{
    id: string;
  }>
}

const LoadingSkeleton = () => {
  return Array(5).fill(0).map((_, idx) => (
    <TableRow key={idx} className="animate-in fade-in-50 slide-in-from-top-2 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px] bg-gradient-to-r from-slate-200 to-slate-100" />
            <Skeleton className="h-3 w-[80px] bg-gradient-to-r from-slate-100 to-slate-50" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
          <Skeleton className="h-3 w-[180px] bg-gradient-to-r from-slate-100 to-slate-50" />
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px] bg-gradient-to-r from-slate-200 to-slate-100" />
          <Skeleton className="h-3 w-[100px] bg-gradient-to-r from-slate-100 to-slate-50" />
        </div>
      </TableCell>
      <TableCell>
        <div className="flex justify-end gap-2">
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-slate-200 to-slate-100" />
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-slate-200 to-slate-100" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

const NotesListForCollection = ({ params }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const resolvedParams = React.use(params);
  const collectionId = resolvedParams.id;

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
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-3 animate-in fade-in-50">
          <h2 className="text-2xl font-bold text-red-600">Error occurred</h2>
          <p className="text-gray-600">Failed to load notes</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="flex justify-between items-center animate-in fade-in-50 duration-500">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Notes
          </h1>
          <p className="text-sm text-slate-500">
            Manage your notes and their contents
          </p>
        </div>
        <IDialogButtonForCreateNote collectionId={collectionId} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:border-slate-800 overflow-hidden transition-all duration-200 hover:shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 dark:bg-slate-800/50">
              <TableHead className="w-[250px] font-semibold">Writer</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="w-[180px] font-semibold">Created At</TableHead>
              <TableHead className="w-[120px] text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : (
              data?.data.map((note: Note, index: number) => (
                <TableRow 
                  key={note.id} 
                  className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="border-2 border-white shadow-sm">
                        <AvatarImage src={note.writer?.profile_image_url} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                          {note.writer?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                          {note.writer?.full_name || 'Anonymous'}
                        </span>
                        <span className="text-sm text-slate-500">Writer</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Link 
                      href={`/note-admin/notes/${note.id}/note-contents`}
                      className="inline-block font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <div className="line-clamp-2">{note.title}</div>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <time className="text-slate-500 text-sm">
                      {new Date(note.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-md">
        <div className="text-sm text-slate-500">
          Total <span className="font-medium text-slate-900 dark:text-slate-100">{data?.pagination.total}</span> items
        </div>
        <Pagination
          current={currentPage}
          total={data?.pagination.total || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          className="my-4"
        />
      </div>
    </div>
  );
};

export default NotesListForCollection;