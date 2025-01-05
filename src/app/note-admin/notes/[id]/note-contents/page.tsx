// src/app/Note/[id]/NoteContentsForNotePage.tsx
"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowRight, Edit2 } from 'lucide-react';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import ICardForNoteContents from './_comp/ICardForNoteContents';
import IDialogButtonForCreateNoteContents from './_comp/IDialogButtonForCreateNoteContents';
import { useApiForGetNoteContents } from '@/hook/notes/useApiForGetNoteContents';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{
    id: string;
  }>
}

const NoteContentListPageForNote = ({ params }: Props) => {
  const searchParams = useSearchParams();
  const resolvedParams = React.use(params);
  const noteId = resolvedParams.id;
  
  const pageNum = Math.max(1, Number(searchParams.get('pageNum')) || 1);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState<NoteContent | null>(null);

  const { data, isLoading, error } = useApiForGetNoteContents({
    noteId,
    pageNum
  });

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600">Error occurred</h2>
        <p className="text-gray-600 mt-2">Failed to load note contents</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">
      {/* 왼쪽 노트 리스트 (60%) */}
      <div className="w-3/5 overflow-auto">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Note Contents</h1>
              <Button
                variant={isUpdateMode ? "secondary" : "outline"}
                onClick={() => setIsUpdateMode(!isUpdateMode)}
                className="flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                {isUpdateMode ? '수정 모드 끄기' : '수정 모드'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">Page {pageNum}</p>
              <IDialogButtonForCreateNoteContents noteId={noteId} pageNum={pageNum}/>
            </div>
          </div>

          <div className="space-y-2">
            {data?.data.map((content: NoteContent) => (
              <ICardForNoteContents
                key={content.id}
                content={content}
                isSelected={selectedNote?.id === content.id}
                isUpdateMode={isUpdateMode}
                onClick={() => setSelectedNote(content)}
                noteId={noteId}
                pageNum={pageNum}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 컨트롤 패널 (40%) */}
      <div className="w-2/5">
        <div className="bg-white rounded-lg shadow-md p-6 h-full">
          <h2 className="text-xl font-bold mb-4">Note Controls</h2>
          
          {selectedNote ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <h3 className="font-semibold mb-2">Selected Note</h3>
                <p>Page: {selectedNote.page}</p>
                <p>Title: {selectedNote.title}</p>
                <p>Path: {selectedNote.path}</p>
                <p>Current Order: {selectedNote.order}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(selectedNote.created_at).toLocaleString()}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // TODO: Implement order change
                    console.log('Move up clicked');
                  }}
                  disabled={selectedNote.order === 1}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronUp className="h-4 w-4" />
                  Move Up
                </Button>
                <Button
                  onClick={() => {
                    // TODO: Implement order change
                    console.log('Move down clicked');
                  }}
                  disabled={selectedNote.order === data?.data.length}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronDown className="h-4 w-4" />
                  Move Down
                </Button>
                <Button
                  onClick={() => {
                    // TODO: Implement navigation
                    console.log('Navigate to note clicked');
                  }}
                  variant="outline"
                  className="flex items-center gap-2 ml-auto"
                >
                  <ArrowRight className="h-4 w-4" />
                  Go to Note
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              Select a note from the list to see details and controls
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteContentListPageForNote;