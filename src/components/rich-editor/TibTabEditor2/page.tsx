"use client";

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import Image from 'next/image';

const FigmaPreviewComponent = ({ node }: { node: any }) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const { src } = node.attrs;
  
  const fileId = src.split('/').pop();
  const previewUrl = `https://www.figma.com/file/${fileId}`;

  return (
    <NodeViewWrapper>
      <div className="border rounded-lg overflow-hidden my-4">
        {!showEmbed ? (
          <div className="relative">
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <button
                onClick={() => setShowEmbed(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Figma 파일 보기
              </button>
            </div>
            <a 
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 text-sm text-blue-500 hover:text-blue-600 bg-white px-2 py-1 rounded shadow"
            >
              Figma에서 열기
            </a>
          </div>
        ) : (
          <div className="relative">
            <iframe
              width="100%"
              height="600"
              src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(src)}`}
              allowFullScreen
              className="border-0"
            />
            <button
              onClick={() => setShowEmbed(false)}
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
            >
              <span className="sr-only">닫기</span>
              ✕
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};

const FigmaEmbed = Node.create({
  name: 'figmaEmbed',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-figma-embed]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-figma-embed': '', ...HTMLAttributes }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FigmaPreviewComponent);
  },
});

interface TiptapEditor2Props {
  initialContent?: string;
  onChange?: (html: string) => void;
}

const TiptapEditor2: React.FC<TiptapEditor2Props> = ({ 
  initialContent = '', 
  onChange 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'my-2',
          },
        },
      }),
      FigmaEmbed,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  const addFigma = () => {
    const figmaUrl = prompt('Figma 파일 URL을 입력하세요:');
    if (figmaUrl && figmaUrl.includes('figma.com')) {
      editor?.chain().focus().insertContent({
        type: 'figmaEmbed',
        attrs: { src: figmaUrl }
      }).run();
    } else if (figmaUrl) {
      alert('올바른 Figma URL을 입력해주세요.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-2 bg-gray-50 flex gap-2 shrink-0">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded hover:bg-gray-200 ${
            editor?.isActive('bold') ? 'bg-gray-200' : ''
          }`}
        >
          굵게
        </button>
        <button
          onClick={addFigma}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          Figma 삽입
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        <EditorContent 
          editor={editor} 
          className="h-full prose prose-sm sm:prose lg:prose-lg max-w-none"
        />
      </div>
    </div>
  );
};

export default TiptapEditor2;