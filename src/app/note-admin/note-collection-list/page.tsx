// src/app/note-collections/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Pagination from 'rc-pagination';
import { NoteCollection } from '@/types/typeForNoteCollections';
import 'rc-pagination/assets/index.css';
import { useApiForNoteCollections } from '@/hook/useApiForNoteCollections';
import { IDialogButtonForCreateNoteCollection } from '@/components/dialog/IDialogButtonForCreateNoteCollection';

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="p-4">
      
      <div className="overflow-x-auto">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Note Collections</h1>
        <IDialogButtonForCreateNoteCollection />
      </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Writer</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.data.map((collection: NoteCollection) => (
              <tr key={collection.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{collection.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{collection.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {collection.writer?.profile_image_url && (
                      <img
                        src={collection.writer.profile_image_url}
                        alt={collection.writer.full_name || ''}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <div className="text-sm text-gray-900">
                      {collection.writer?.full_name || 'Anonymous'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(collection.created_at).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(collection.updated_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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