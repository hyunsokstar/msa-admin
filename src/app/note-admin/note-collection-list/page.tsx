'use client';

import React, { useState } from 'react';
import { useApiForNoteCollections } from '@/hook/notes/useApiForNoteCollections';
import { IDialogButtonForCreateNoteCollection } from '@/components/dialog/IDialogButtonForCreateNoteCollection';
import { ITableForNoteCollectionList } from './_comp/ITableForNoteCollectionList';
import { ITableForNoteListForSelectedCollection } from './_comp/ITableForNoteListForSelectedCollection';
import { NotebookPen, Book } from "lucide-react";
import CommonButton from '@/components/common/CommonButton';
import { IDialogButtonForCreateNote } from '@/components/dialog/IDialogButtonForCreateNote';
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
        <div className="text-center space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-2xl font-bold text-red-500">오류가 발생했습니다</h2>
          <p className="text-gray-600">컬렉션을 불러오는데 실패했습니다</p>
          <CommonButton 
            variant="outline"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            다시 시도
          </CommonButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="flex h-full w-full gap-10">
        {/* 컬렉션 패널 */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200">
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

            <div className="flex-1 overflow-auto min-h-0 p-6">
              <ITableForNoteCollectionList
                data={data}
                isLoading={isLoading}
                onCollectionSelect={(id) => setSelectedCollectionId(id)}
                selectedCollectionId={selectedCollectionId}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
              />
            </div>
          </div>
        </div>

        {/* 노트 패널 */}
        <div className="w-1/2 flex flex-col">
          <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {!selectedCollectionId ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner">
                  <NotebookPen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  선택된 컬렉션이 없습니다
                </h3>
                <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                  왼쪽의 컬렉션 목록에서 컬렉션을 선택하여 노트를 확인하고 관리하세요
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">노트 목록</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        선택된 컬렉션의 노트 목록
                      </p>
                    </div>
                    <div className="flex gap-4 items-center">
                      {data?.pages && data.pages.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Book className="h-4 w-4 text-slate-500" />
                          <div className="flex gap-1.5">
                            {data.pages.map((pageNum) => (
                              <CommonButton
                                key={pageNum}
                                variant="outline"
                                size="sm"
                                className="h-7 min-w-[28px] px-2 py-1 text-xs font-normal bg-white hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm transition-all"
                              >
                                {pageNum}
                              </CommonButton>
                            ))}
                          </div>
                        </div>
                      )}
                      <IDialogButtonForCreateNote collectionId={selectedCollectionId} />
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-auto min-h-0 p-6">
                  <ITableForNoteListForSelectedCollection
                    collectionId={selectedCollectionId}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCollectionListPage;

/* 스타일 추가 */
<style jsx global>{`
.hoverable-table tr {
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.hoverable-table tr:hover {
  background-color: #f0f9ff; /* 부드러운 파란색 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: scale(1.02); /* 살짝 확대 */
  z-index: 1;
}

.hoverable-table tr td {
  transition: color 0.2s ease;
}

.hoverable-table tr:hover td {
  color: #2563eb; /* 파란색 강조 */
}
`}</style>
