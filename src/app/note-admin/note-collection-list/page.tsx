// src/app/note-collections/page.tsx
"use client";

import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from 'rc-pagination';
import { NoteCollection } from '@/types/typeForNoteCollections';
import { useApiForNoteCollections } from '@/hook/useApiForNoteCollections';
import { IDialogButtonForCreateNoteCollection } from '@/components/dialog/IDialogButtonForCreateNoteCollection';
import 'rc-pagination/assets/index.css';
import CommonButton from '@/components/common/CommonButton';
import { IDialogButtonForEditNoteCollection } from '@/components/dialog/IDialogButtonForEditNoteCollection';
import { IDialogButtonForDeleteNoteCollection } from '@/components/dialog/IDialogButtonForDeleteNoteCollection';

const NoteCollectionListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useApiForNoteCollections({
    page: currentPage,
    pageSize,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (id: number) => {
    // TODO: 수정 기능 구현
    console.log('Edit:', id);
  };

  const handleDelete = (id: number) => {
    // TODO: 삭제 기능 구현
    console.log('Delete:', id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Note Collections</h1>
        <IDialogButtonForCreateNoteCollection />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Writer</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((collection: NoteCollection) => (
              <TableRow key={collection.id}>
                <TableCell>{collection.id}</TableCell>
                <TableCell>{collection.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {collection.writer?.profile_image_url && (
                      <img
                        src={collection.writer.profile_image_url}
                        alt={collection.writer.full_name || ''}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <span>{collection.writer?.full_name || 'Anonymous'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(collection.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="text-right space-x-2">
                    <IDialogButtonForEditNoteCollection
                      collectionId={collection.id}
                      initialName={collection.name}
                    />

                <IDialogButtonForDeleteNoteCollection
                  collectionId={collection.id}
                  collectionName={collection.name}
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

export default NoteCollectionListPage;