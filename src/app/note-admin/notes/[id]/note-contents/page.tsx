// src/app/Note/[id]/NoteContentsForNotePage.tsx
"use client";

import React, { useState } from 'react';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import { useNoteContents } from '@/hook/notes/useApiForNoteContents';
import ICardForNoteContents from './_comp/ICardForNoteContents';
import IDialogButtonForCreateNoteContents from './_comp/IDialogButtonForCreateNoteContents';

interface Props {
  params: Promise<{
    id: string;
  }>
}

const NoteContentListPageForNote = ({ params }: Props) => {
  const resolvedParams = React.use(params);
  const noteId = resolvedParams.id;
  const { data, isLoading, error } = useNoteContents(noteId);
  
  const [selectedNote, setSelectedNote] = useState<NoteContent | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="flex h-screen bg-gray-100 p-4 gap-4">
      {/* 왼쪽 노트 리스트 (60%) */}
      <div className="w-3/5 overflow-auto">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Note Contents</h1>
          <IDialogButtonForCreateNoteContents noteId={noteId} />
        </div>

          <div className="space-y-2">
            {data?.data.map((content: NoteContent) => (
              <ICardForNoteContents
                key={content.id}
                content={content}
                isSelected={selectedNote?.id === content.id}
                onClick={() => setSelectedNote(content)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 컨트롤 패널 (40%) - 기존 코드와 동일 */}
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
                <button 
                  onClick={() => {
                    // TODO: Implement order change
                  }}
                  className="flex items-center gap-1 px-3 py-2 border rounded hover:bg-gray-50"
                  disabled={selectedNote.order === 1}
                >
                  <ChevronUp size={18} />
                  Move Up
                </button>
                <button 
                  onClick={() => {
                    // TODO: Implement order change
                  }}
                  className="flex items-center gap-1 px-3 py-2 border rounded hover:bg-gray-50"
                  disabled={selectedNote.order === data?.data.length}
                >
                  <ChevronDown size={18} />
                  Move Down
                </button>
                <button 
                  onClick={() => {
                    // TODO: Implement navigation
                  }}
                  className="flex items-center gap-1 px-3 py-2 border rounded hover:bg-gray-50 ml-auto"
                >
                  <ArrowRight size={18} />
                  Go to Note
                </button>
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