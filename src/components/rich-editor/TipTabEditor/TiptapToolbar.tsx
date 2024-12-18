
"use client";

import React from "react";
import { Editor } from "@tiptap/react";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: () => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  if (!editor) return null;

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontSize = event.target.value;
    if (fontSize === 'default') {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(fontSize).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 border-b p-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded-md border ${
          editor.isActive('bold') ? 'bg-blue-200' : 'bg-gray-200'
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded-md border ${
          editor.isActive('italic') ? 'bg-blue-200' : 'bg-gray-200'
        }`}
      >
        Italic
      </button>
      <select
        onChange={handleFontSizeChange}
        value={editor.getAttributes('textStyle').fontSize || 'default'}
        className="px-2 py-1 rounded-md border bg-gray-200"
      >
        <option value="default">기본 크기</option>
        <option value="0.75rem">12px</option>
        <option value="0.875rem">14px</option>
        <option value="1rem">16px</option>
        <option value="1.125rem">18px</option>
        <option value="1.25rem">20px</option>
        <option value="1.5rem">24px</option>
        <option value="1.875rem">30px</option>
        <option value="2rem">32px</option>
        <option value="2.25rem">36px</option>
        <option value="2.5rem">40px</option>
        <option value="3rem">48px</option>
      </select>
      <button
        onClick={addImage}
        className="px-2 py-1 rounded-md border bg-blue-500 text-white hover:bg-blue-600"
      >
        이미지 업로드
      </button>
    </div>
  );
};

export default TiptapToolbar;