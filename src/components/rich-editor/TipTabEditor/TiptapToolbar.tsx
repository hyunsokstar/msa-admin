"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  HighlighterIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  ImagePlus,
} from "lucide-react";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: () => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(15);

  // 에디터 상태를 동기화하는 useEffect
  useEffect(() => {
    if (!editor) return;

    setFontSize(parseInt(editor.getAttributes("textStyle")?.fontSize || "15", 10));
  }, [editor?.state]);

  if (!editor) return null;

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setTextColor(selectedColor);
    editor.chain().focus().setColor(selectedColor).run();
  };

  const handleBgColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setBgColor(selectedColor);
    editor.chain().focus().toggleHighlight({ color: selectedColor }).run();
  };

  return (
    <div className="flex items-center gap-2 border rounded-md p-2 bg-background">
      {/* 텍스트 포맷팅 */}
      <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough />
      </Button>
      <Separator orientation="vertical" />
      {/* 글자 색상 */}
      <div className="flex items-center">
        <label className="text-sm mr-1">글자색:</label>
        <input type="color" value={textColor} onChange={handleTextColorChange} className="w-6 h-6 border p-0" />
      </div>
      {/* 배경색 */}
      <div className="flex items-center">
        <label className="text-sm mr-1">배경색:</label>
        <input type="color" value={bgColor} onChange={handleBgColorChange} className="w-6 h-6 border p-0" />
      </div>
      <Separator orientation="vertical" />
      {/* 글씨 크기 */}
      <FontSizeAdjuster
        value={fontSize}
        onChange={(newSize) => {
          setFontSize(newSize);
          editor.chain().focus().setFontSize(`${newSize}px`).run();
        }}
      />
      <Separator orientation="vertical" />
      {/* 정렬 */}
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
        <AlignLeft />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
        <AlignCenter />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
        <AlignRight />
      </Button>
      <Separator orientation="vertical" />
      {/* 실행 취소 및 다시 실행 */}
      <Button type="button" onClick={() => editor.chain().focus().undo().run()}>
        <Undo />
      </Button>
      <Button type="button" onClick={() => editor.chain().focus().redo().run()}>
        <Redo />
      </Button>
      <Separator orientation="vertical" />
      {/* 이미지 추가 */}
      <Button type="button" onClick={addImage}>
        <ImagePlus /> 이미지
      </Button>
    </div>
  );
};

export default TiptapToolbar;
