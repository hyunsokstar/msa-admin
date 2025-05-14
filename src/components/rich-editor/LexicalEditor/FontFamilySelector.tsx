"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import '../../../styles/fonts.css';

const fontFamilyOptions = [
  { label: "Default", value: "sans-serif", className: "" },
  // 영문 폰트
  { label: "Roboto Mono", value: "Roboto Mono", className: "font-roboto-mono" },
  // 한글 폰트
  { label: "Noto Sans KR", value: "Noto Sans KR", className: "font-noto-sans-kr" },
  { label: "Black Han Sans", value: "Black Han Sans", className: "font-black-han-sans" },
  { label: "Cute Font", value: "Cute Font", className: "font-cute" },
  { label: "Gamja Flower", value: "Gamja Flower", className: "font-gamja" },
  { label: "나눔고딕코딩", value: "Nanum Gothic Coding", className: "font-nanum-gothic-coding" },
  { label: "나눔손글씨", value: "Nanum Pen", className: "font-nanum-pen" }
];

interface FontFamilySelectorProps {
  editor: Editor;
}

const FontFamilySelector = ({ editor }: FontFamilySelectorProps) => {
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    const selectedFontClass = fontFamilyOptions.find(
      (font) => font.value === selectedFont
    )?.className;

    editor.chain().focus().setFontFamily(selectedFont).run();

    const editorContainer = document.getElementById("editor-container");
    if (editorContainer) {
      editorContainer.className = `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none w-full h-full ${selectedFontClass}`;
    }
  };

  return (
    <select
      onChange={handleFontFamilyChange}
      className="h-9 rounded-md border border-input bg-background px-3"
    >
      {fontFamilyOptions.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
};

export default FontFamilySelector;