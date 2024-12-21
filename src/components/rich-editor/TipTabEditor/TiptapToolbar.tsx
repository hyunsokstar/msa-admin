"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  ImagePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import FontFamilySelector from "./FontFamilySelector";
import TableActionsPopover from "./TableActionsPopover";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: () => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  const [color, setColor] = useState("#000000");

  if (!editor) return null;

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    editor.chain().focus().setColor(selectedColor).run();
  };

  return (
    <div className="flex flex-col gap-2 border rounded-md p-2 bg-background">
      {/* First Row */}
      <div className="flex items-center gap-2">
        {/* Text Formatting */}
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

        {/* Text Alignment */}
        <div className="flex items-center gap-1">
          <Button
            variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="h-8 w-8"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="h-8 w-8"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
            size="icon"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="h-8 w-8"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Undo and Redo */}
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
      </div>

      {/* Second Row */}
      <div className="flex items-center gap-2">
        {/* Font Options */}
        <div className="flex items-center gap-1">
          <FontSizeAdjuster
            value={16}
            onChange={(size) => editor.chain().focus().setFontSize(`${size}px`).run()}
          />
          <FontFamilySelector editor={editor} />
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Color Picker */}
        <div className="flex items-center">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-8 h-8 cursor-pointer"
          />
          {/* <span className="ml-2">글자색</span> */}
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Add Table */}
        <TableActionsPopover editor={editor} />

        <Separator orientation="vertical" className="h-8" />

        {/* Add Image */}
        <div className="ml-auto">
          <Button variant="secondary" onClick={addImage} className="h-8 px-3">
            <ImagePlus className="h-4 w-4 mr-2" />
            이미지 추가
          </Button>
        </div>

        <div className="ml-auto">
          <Button
            variant="secondary"
            onClick={() => {
              const url = prompt("유튜브 URL을 입력하세요:");
              if (url) {
                editor.chain().focus().setYoutubeVideo({
                  src: url,
                  width: 640, // 기본 너비
                  height: 360, // 기본 높이
                }).run();
              }
            }}
            className="h-8 px-3"
          >
            <ImagePlus className="h-4 w-4 mr-2" />
            유튜브 추가
          </Button>
        </div>

        
      </div>
    </div>
  );
};

export default TiptapToolbar;
