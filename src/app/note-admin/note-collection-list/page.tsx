"use client";

import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import { useApiForNoteCollections } from '@/hook/notes/useApiForNoteCollections';
import { IDialogButtonForCreateNoteCollection } from '@/components/dialog/IDialogButtonForCreateNoteCollection';
import { ITableForNoteCollectionList } from './_comp/ITableForNoteCollectionList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { ITableForNoteListForSelectedCollection } from './_comp/ITableForNoteListForSelectedCollection';
import 'rc-pagination/assets/index.css';

const NoteCollectionListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const pageSize = 10;

  const { data, isLoading, error } = useApiForNoteCollections({
    page: currentPage,
    pageSize,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Card className="w-96">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-red-600">Error occurred</h2>
              <p className="text-slate-600">Failed to load collections</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="w-full h-full">
        <div className="grid grid-cols-2 h-screen">
          {/* Collections Panel */}
          <div className="p-6 border-r border-slate-200">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Collections
                </h1>
                <IDialogButtonForCreateNoteCollection />
              </div>

              <Card className="flex-1 border-slate-200 shadow-sm">
                <CardContent className="p-0">
                  <ITableForNoteCollectionList
                    data={data}
                    isLoading={isLoading}
                    onCollectionSelect={(id) => setSelectedCollectionId(id)}
                    selectedCollectionId={selectedCollectionId}
                  />
                  <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        Total <span className="font-medium text-slate-700">{data?.pagination.total || 0}</span> items
                      </span>
                      <Pagination
                        current={currentPage}
                        total={data?.pagination.total || 0}
                        pageSize={pageSize}
                        onChange={setCurrentPage}
                        className="rc-pagination-modern"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-slate-900">
                  Notes
                </h1>
                {selectedCollectionId && (
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-900 text-slate-50 hover:bg-slate-900/90 h-10 px-4 py-2">
                    Add Note
                  </button>
                )}
              </div>

              <Card className="flex-1 border-slate-200 shadow-sm">
                <CardContent className="p-0 h-full">
                  {!selectedCollectionId ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6">
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <PlusCircle className="w-10 h-10 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-medium text-slate-900 mb-2">
                        No collection selected
                      </h3>
                      <p className="text-slate-500 max-w-md">
                        Select a collection from the list to view its notes and manage its contents
                      </p>
                    </div>
                  ) : (
                    <ITableForNoteListForSelectedCollection
                      collectionId={selectedCollectionId}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCollectionListPage;