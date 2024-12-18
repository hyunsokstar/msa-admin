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
    if (fontSize === "default") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(fontSize).run();
    }
  };

  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = event.target.value;
    if (fontFamily === "default") {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(fontFamily).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 border-b p-4 bg-gray-50 rounded-lg shadow-md">
      {/* Bold Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
          editor.isActive("bold")
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Bold
      </button>

      {/* Italic Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
          editor.isActive("italic")
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Italic
      </button>

      {/* Font Size Select */}
      <select
        onChange={handleFontSizeChange}
        value={editor.getAttributes("textStyle").fontSize || "default"}
        className="px-4 py-2 rounded-md border bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition"
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

      {/* Font Family Select */}
      <select
        onChange={handleFontFamilyChange}
        className="px-4 py-2 rounded-md border bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition"
      >
        <option value="default">기본 글꼴</option>
        <option value="Noto Sans, sans-serif">Noto Sans</option>
        <option value="Roboto, sans-serif">Roboto</option>
        <option value="Nanum Gothic, sans-serif">나눔 고딕</option>
        <option value="Nanum Myeongjo, serif">나눔 명조</option>
        <option value="Arial, sans-serif">Arial</option>
        <option value="Courier New, monospace">Courier New</option>
        <option value="Georgia, serif">Georgia</option>
        <option value="Times New Roman, serif">Times New Roman</option>
        <option value="Verdana, sans-serif">Verdana</option>
        <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
      </select>

      {/* Image Upload Button */}
      <button
        type="button"
        onClick={addImage}
        className="px-4 py-2 rounded-md border text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        이미지 업로드
      </button>
    </div>
  );
};

export default TiptapToolbar;
