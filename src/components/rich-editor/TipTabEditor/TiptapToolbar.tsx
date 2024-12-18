"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
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
  if (!editor) return null;

  const handleFontSizeChange = (value: string) => {
    if (value === "default") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  const handleFontFamilyChange = (value: string) => {
    if (value === "default") {
      editor.chain().focus().unsetFontFamily().run();
    } else {
      editor.chain().focus().setFontFamily(value).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border rounded-md p-2 bg-background">
      <div className="flex items-center gap-1">
        <Button
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8"
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive("strike") ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="h-8 w-8"
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="h-8 w-8"
        >
          <HighlighterIcon className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive({ textAlign: 'left' }) ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="h-8 w-8"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive({ textAlign: 'center' }) ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="h-8 w-8"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant={editor.isActive({ textAlign: 'right' }) ? "default" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="h-8 w-8"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          className="h-8 w-8"
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          className="h-8 w-8"
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-8" />

      <div className="flex items-center gap-2">
        <Select
          onValueChange={handleFontSizeChange}
          defaultValue="default"
        >
          <SelectTrigger className="w-[110px] h-8">
            <SelectValue placeholder="글자 크기" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">기본 크기</SelectItem>
            <SelectItem value="0.875rem">14px</SelectItem>
            <SelectItem value="1rem">16px</SelectItem>
            <SelectItem value="1.125rem">18px</SelectItem>
            <SelectItem value="1.25rem">20px</SelectItem>
            <SelectItem value="1.5rem">24px</SelectItem>
            <SelectItem value="1.875rem">30px</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={handleFontFamilyChange}
          defaultValue="default"
        >
          <SelectTrigger className="w-[130px] h-8">
            <SelectValue placeholder="글꼴" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">기본 서체</SelectItem>
            <SelectItem value="'Noto Sans KR', sans-serif">Noto Sans</SelectItem>
            <SelectItem value="'Nanum Gothic', sans-serif">나눔고딕</SelectItem>
            <SelectItem value="'Nanum Myeongjo', serif">나눔명조</SelectItem>
            <SelectItem value="'Pretendard', sans-serif">프리텐다드</SelectItem>
            <SelectItem value="Arial, sans-serif">Arial</SelectItem>
            <SelectItem value="Georgia, serif">Georgia</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="ml-auto">
        <Button
          variant="secondary"
          onClick={addImage}
          className="h-8 px-3"
        >
          <ImagePlus className="h-4 w-4 mr-2" />
          이미지
        </Button>
      </div>
    </div>
  );
};

export default TiptapToolbar;