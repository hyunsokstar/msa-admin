// src/components/notes/ICardForNoteContents.tsx
"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NoteContent } from '@/types/notes/typeForNoteContents';
import useApiForDeleteNoteContent from '@/hook/notes/useApiForDeleteNoteContent';
import IDialogButtonForDeleteNoteContents from './IDialogButtonForDeleteNoteContents';
import ICardForUpdateNoteContents from './ICardForUpdateNoteContents';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

// ——— 여기를 이렇게 수정 ———
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ParagraphNode } from 'lexical';
// ————————————————————

import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';

// nodes 폴더가 아니라 LexicalEditor 폴더 바로 아래에 있는 ImageNode
import { ImageNode } from '@/components/rich-editor/LexicalEditor/ImageNode';

import TiptapEditor from '@/components/rich-editor/TibTabEditor';

function isValidLexicalJson(value: string) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' && 'root' in parsed;
  } catch {
    return false;
  }
}

function LexicalContentViewer({ content }: { content: string }) {
  const initialConfig = {
    namespace: 'ReadOnlyViewer',
    theme: {
      paragraph: 'editor-paragraph',
      code: 'editor-code',
    },
    nodes: [
      ParagraphNode,
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
      ImageNode,
    ],
    // ——— 여기 이름도 editorState 로 고칩니다 ———
    editorState: content,
    // —————————————————————————
    editable: false,
    onError: (error: Error) => console.error('Lexical viewer error:', error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] prose prose-sm max-w-none text-black bg-white" />
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </LexicalComposer>
  );
}

interface ICardForNoteContentsProps {
  content: NoteContent;
  isSelected: boolean;
  isUpdateMode?: boolean;
  onClick: () => void;
  onTitleChange?: (value: string) => void;
  onPathChange?: (value: string) => void;
  noteId: string;
  pageNum?: number;
}

const ICardForNoteContents = ({
  content,
  isSelected,
  isUpdateMode = false,
  onClick,
  onTitleChange,
  onPathChange,
  noteId,
  pageNum,
}: ICardForNoteContentsProps) => {
  const { deleteNoteContent } = useApiForDeleteNoteContent({
    noteId,
    pageNum: pageNum ?? 1,
  });

  if (isUpdateMode) {
    return (
      <ICardForUpdateNoteContents
        content={content}
        isSelected={isSelected}
        onClick={onClick}
        pageNum={pageNum}
        noteId={noteId}
      />
    );
  }

  const isLexical = isValidLexicalJson(content.content);

  return (
    <Card
      className={`mb-4 transition-all hover:shadow-md relative bg-white rounded-xl border border-gray-200 ${isSelected ? 'ring-1 ring-blue-400 shadow-md' : 'hover:border-gray-300'
        }`}
      onClick={onClick}
    >
      <CardContent className="p-6 bg-white">
        {/* 상단 UI: 순서, 아바타, 제목/경로 입력, 삭제 버튼 */}
        <div className="flex items-start gap-5 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {content.order}
            </span>
          </div>
          <div className="relative group">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={content.writer?.profile_image_url}
                alt={content.writer?.full_name || '사용자'}
              />
              <AvatarFallback>
                {content.writer?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
              {content.writer?.full_name || '사용자'}
            </div>
          </div>
          <div className="flex-grow grid grid-cols-[1fr,1fr,auto] gap-4 items-center">
            <Input
              value={content.title || ''}
              onChange={(e) => onTitleChange?.(e.target.value)}
              placeholder="제목 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
            <Input
              value={content.path || ''}
              onChange={(e) => onPathChange?.(e.target.value)}
              placeholder="경로 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
            <IDialogButtonForDeleteNoteContents
              contentId={content.id}
              writerEmail={content.writer?.email || ''}
              noteId={noteId}
              pageNum={pageNum}
            />
          </div>
        </div>

        {/* 콘텐츠: Lexical or Tiptap */}
        {isLexical ? (
          <div className="min-h-[180px] p-5 border border-gray-200 rounded-lg bg-white">
            <LexicalContentViewer content={content.content} />
          </div>
        ) : (
          <div className="w-full">
            <TiptapEditor content={content.content} onChange={() => { }} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ICardForNoteContents;
