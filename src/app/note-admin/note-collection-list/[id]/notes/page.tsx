// src/app/note-admin/note-collection-list/[id]/notes/page.tsx
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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error occurred</h2>
          <p className="text-gray-600 mt-2">Failed to load notes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notes</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your notes and their contents</p>
        </div>
        <IDialogButtonForCreateNote collectionId={collectionId} />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
              <TableHead className="w-[250px]">Writer</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[180px]">Created At</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-[100px] ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              data?.data.map((note: Note) => (
                <TableRow key={note.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={note.writer?.profile_image_url} />
                        <AvatarFallback>
                          {note.writer?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {note.writer?.full_name || 'Anonymous'}
                        </span>
                        <span className="text-sm text-slate-500">Writer</span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Link 
                      href={`/note-admin/notes/${note.id}/note-contents`}
                      className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {note.title}
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

                  <TableCell className="text-right space-x-2">
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
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