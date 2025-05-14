"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { PaintBucket, Bold, Italic, Underline as UnderlineIcon, Strikethrough, Undo, Redo, ImagePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

      <div className="flex items-center">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-8 cursor-pointer"
        />
        <span className="ml-2">글자색</span>
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

      <div className="ml-auto">
        <Button variant="secondary" onClick={addImage} className="h-8 px-3">
          <ImagePlus className="h-4 w-4 mr-2" />
          이미지 추가
        </Button>
      </div>
    </div>
  );
};

export default TiptapToolbar;
