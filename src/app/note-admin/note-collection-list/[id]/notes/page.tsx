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

interface Props {
  params: Promise<{
    id: string;
  }>
}

const NotesListForCollection = ({ params }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  // params를 Promise에서 unwrap
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Notes</h1>
        {/* TODO: Add Create Note Button */}
        <IDialogButtonForCreateNote collectionId={collectionId} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Writer</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((note: Note) => (
              <TableRow key={note.id}>
                <TableCell>{note.id}</TableCell>
                <TableCell>{note.title}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {note.writer?.profile_image_url && (
                      <img
                        src={note.writer.profile_image_url}
                        alt={note.writer.full_name || ''}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <span>{note.writer?.full_name || 'Anonymous'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(note.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(note.updated_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {/* TODO: Add Edit/Delete Buttons */}
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Total {data?.pagination.total} items
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