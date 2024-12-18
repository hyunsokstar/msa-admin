"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: () => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

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
      <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()}><Bold /></Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}><Italic /></Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon /></Button>
      <Button type="button" onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough /></Button>

      {/* 글자 색상 */}
      <div className="flex items-center">
        <label>글자색:</label>
        <input type="color" value={textColor} onChange={handleTextColorChange} />
      </div>

      {/* 글자 배경색 */}
      <div className="flex items-center">
        <label>배경색:</label>
        <input type="color" value={bgColor} onChange={handleBgColorChange} />
      </div>

      <Separator orientation="vertical" />

      {/* 정렬 */}
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft /></Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter /></Button>
      <Button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight /></Button>

      {/* 실행 취소 및 다시 실행 */}
      <Button type="button" onClick={() => editor.chain().focus().undo().run()}><Undo /></Button>
      <Button type="button" onClick={() => editor.chain().focus().redo().run()}><Redo /></Button>

      {/* 폰트 크기 */}
      <Select onValueChange={(value) => editor.chain().focus().setFontSize(value).run()} defaultValue="default">
        <SelectTrigger><SelectValue placeholder="기본 크기" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="0.75rem">12px</SelectItem>
          <SelectItem value="0.875rem">14px</SelectItem>
          <SelectItem value="1rem">16px</SelectItem>
          <SelectItem value="1.125rem">18px</SelectItem>
          <SelectItem value="1.25rem">20px</SelectItem>
          <SelectItem value="1.375rem">22px</SelectItem>
          <SelectItem value="1.5rem">24px</SelectItem>
          <SelectItem value="1.625rem">26px</SelectItem>
          <SelectItem value="1.75rem">28px</SelectItem>
          <SelectItem value="1.875rem">30px</SelectItem>
          <SelectItem value="2rem">32px</SelectItem>
          <SelectItem value="2.25rem">36px</SelectItem>
          <SelectItem value="2.5rem">40px</SelectItem>
          <SelectItem value="2.75rem">44px</SelectItem>
          <SelectItem value="3rem">48px</SelectItem>
        </SelectContent>
      </Select>

      {/* 폰트 서체 */}
      <Select onValueChange={(value) => editor.chain().focus().setFontFamily(value).run()} defaultValue="default">
        <SelectTrigger><SelectValue placeholder="기본 서체" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="'Arial', sans-serif">Arial</SelectItem>
          <SelectItem value="'Georgia', serif">Georgia</SelectItem>
          <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
          <SelectItem value="'Courier New', monospace">Courier New</SelectItem>
          <SelectItem value="'Verdana', sans-serif">Verdana</SelectItem>
          <SelectItem value="'Noto Sans KR', sans-serif">Noto Sans KR</SelectItem>
          <SelectItem value="'Nanum Gothic', sans-serif">나눔고딕</SelectItem>
          <SelectItem value="'Nanum Myeongjo', serif">나눔명조</SelectItem>
          <SelectItem value="'Pretendard', sans-serif">프리텐다드</SelectItem>
          <SelectItem value="'Gowun Dodum', sans-serif">고운돋움</SelectItem>
          <SelectItem value="'Gowun Batang', serif">고운바탕</SelectItem>
          <SelectItem value="'Dokdo', cursive">독도체</SelectItem>
        </SelectContent>
      </Select>

      {/* 이미지 추가 */}
      <Button type="button" onClick={addImage}><ImagePlus /> 이미지</Button>
    </div>
  );
};

export default TiptapToolbar;
