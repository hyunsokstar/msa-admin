// src/app/note-collections/page.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Pagination from 'rc-pagination';
import { NoteCollection } from '@/types/typeForNoteCollections';
import 'rc-pagination/assets/index.css';
import { useApiForGetNoteCollections } from '@/hook/useApiForGetNoteCollections';

const NoteCollectionListPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useApiForGetNoteCollections({
    page,
    pageSize,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Note Collections</h1>
      
      {/* Table */}
      <div className="overflow-x-auto">
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
                      <div className="flex-shrink-0 h-8 w-8">
                        <Image
                          src={collection.writer.profile_image_url}
                          alt={collection.writer.full_name || ''}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
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

      {/* Pagination */}
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total {data?.pagination.total} items
          </div>
          <Pagination
            current={page}
            total={data?.pagination.total || 0}
            pageSize={pageSize}
            onChange={handlePageChange}
            className="my-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCollectionListPage;