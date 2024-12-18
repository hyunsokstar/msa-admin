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
    <div className="flex flex-wrap gap-3 border-b p-3 bg-yellow-50 rounded-lg">
      {/* Bold Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-2 rounded-full border transition transform hover:scale-110 ${
          editor.isActive("bold") ? "bg-blue-200 text-blue-700" : "bg-gray-100"
        }`}
      >
        🅱️ Bold
      </button>

      {/* Italic Button */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-2 rounded-full border transition transform hover:scale-110 ${
          editor.isActive("italic") ? "bg-pink-200 text-pink-700" : "bg-gray-100"
        }`}
      >
        ✨ Italic
      </button>

      {/* Font Size Select */}
      <select
        onChange={handleFontSizeChange}
        value={editor.getAttributes("textStyle").fontSize || "default"}
        className="px-3 py-2 rounded-full border bg-white shadow-md hover:shadow-lg transition transform hover:scale-105"
      >
        <option value="default">📏 기본 크기</option>
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
        className="px-3 py-2 rounded-full border bg-white shadow-md hover:shadow-lg transition transform hover:scale-105"
      >
        <option value="default">🅰️ 기본 글꼴</option>
        <option value="Noto Sans, sans-serif">🖋 Noto Sans</option>
        <option value="Roboto, sans-serif">✏️ Roboto</option>
        <option value="Nanum Gothic, sans-serif">📘 나눔 고딕</option>
        <option value="Nanum Myeongjo, serif">📖 나눔 명조</option>
        <option value="Arial, sans-serif">✒️ Arial</option>
        <option value="Courier New, monospace">🗒 Courier New</option>
        <option value="Georgia, serif">📜 Georgia</option>
        <option value="Times New Roman, serif">📰 Times New Roman</option>
        <option value="Verdana, sans-serif">🧸 Verdana</option>
        <option value="Trebuchet MS, sans-serif">🚀 Trebuchet MS</option>
      </select>

      {/* Image Upload Button */}
      <button
        type="button"
        onClick={addImage}
        className="px-3 py-2 rounded-full border bg-yellow-200 text-yellow-700 hover:bg-yellow-300 hover:text-yellow-800 transition transform hover:scale-110"
      >
        🖼️ 이미지 업로드
      </button>
    </div>
  );
};

export default TiptapToolbar;
