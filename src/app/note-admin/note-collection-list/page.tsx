"use client";

import React, { useState } from 'react';
import Pagination from 'rc-pagination';
import { useApiForNoteCollections } from '@/hook/notes/useApiForNoteCollections';
import { IDialogButtonForCreateNoteCollection } from '@/components/dialog/IDialogButtonForCreateNoteCollection';
import { ITableForNoteCollectionList } from './_comp/ITableForNoteCollectionList';
import { ITableForNoteListForSelectedCollection } from './_comp/ITableForNoteListForSelectedCollection';
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
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
      <div className="flex items-center justify-center h-screen bg-white">
        <Card className="w-96 border-none">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-red-500">오류가 발생했습니다</h2>
              <p className="text-gray-600">컬렉션을 불러오는데 실패했습니다</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white"> {/* min-h-screen 추가 */}
      <div className="flex h-full divide-x divide-gray-100">
        {/* 컬렉션 패널 */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="p-8 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">노트 컬렉션</h1>
                <p className="text-sm text-gray-500 mt-1">
                  전체 {data?.pagination.total || 0}개의 컬렉션
                </p>
              </div>
              <IDialogButtonForCreateNoteCollection />
            </div>
          </div>

          <div className="px-8 pb-8 flex-1 flex flex-col">
            <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col">
              <div className="flex-1 overflow-auto min-h-0">
                <ITableForNoteCollectionList
                  data={data}
                  isLoading={isLoading}
                  onCollectionSelect={(id) => setSelectedCollectionId(id)}
                  selectedCollectionId={selectedCollectionId}
                />
              </div>
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50">
                <span className="text-sm text-gray-500">
                  페이지당 {pageSize}개 항목
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
          </div>
        </div>

        {/* 노트 패널 */}
        <div className="w-1/2 flex flex-col h-full">
          <div className="p-8 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">노트 목록</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedCollectionId ? "선택된 컬렉션의 노트 목록" : "컬렉션을 선택해주세요"}
                </p>
              </div>
              {selectedCollectionId && (
                <button className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-900 h-10 px-4 py-2 transition-colors">
                  노트 추가
                </button>
              )}
            </div>
          </div>

          <div className="px-8 pb-8 flex-1 flex flex-col">
            <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden">
              {!selectedCollectionId ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                    <PlusCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    선택된 컬렉션이 없습니다
                  </h3>
                  <p className="text-sm text-gray-500 max-w-[260px]">
                    왼쪽의 컬렉션 목록에서 컬렉션을 선택하여 노트를 확인하고 관리하세요
                  </p>
                </div>
              ) : (
                <div className="h-full overflow-auto">
                  <ITableForNoteListForSelectedCollection
                    collectionId={selectedCollectionId}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCollectionListPage;