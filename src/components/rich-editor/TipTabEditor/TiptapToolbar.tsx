"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import FontFamilySelector from "./FontFamilySelector";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ImagePlus,
} from "lucide-react";

interface TiptapToolbarProps {
  editor: Editor;
  addImage: ({ width, height }: { width: number; height: number }) => void;
  addResizableImage: () => void;
}

const TiptapToolbar = ({ editor, addImage, addResizableImage }: TiptapToolbarProps) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(15);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

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

  const handleImageUpload = () => {
    if (width > 0 && height > 0) {
      addImage({ width, height });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-background">
      {/* First Row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
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

          {/* Font Family Selector */}
          <FontFamilySelector editor={editor} />

          <FontSizeAdjuster
            value={fontSize}
            onChange={(newSize) => {
              setFontSize(newSize);
              editor.chain().focus().setFontSize(`${newSize}px`).run();
            }}
          />
        </div>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <label className="text-sm">글자색:</label>
            <input type="color" value={textColor} onChange={handleTextColorChange} className="w-6 h-6 border p-0" />
          </div>
          <div className="flex items-center gap-1">
            <label className="text-sm">배경색:</label>
            <input type="color" value={bgColor} onChange={handleBgColorChange} className="w-6 h-6 border p-0" />
          </div>
        </div>
      </div>
      <Separator orientation="horizontal" />
      {/* Second Row */}
      <div className="flex items-center gap-2">
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <AlignJustify />
        </Button>
        <Separator orientation="vertical" />
        <Button type="button" onClick={() => editor.chain().focus().undo().run()}>
          <Undo />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().redo().run()}>
          <Redo />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            placeholder="Width"
            className="w-20 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            placeholder="Height"
            className="w-20 px-2 py-1 border rounded"
          />
          <Button type="button" onClick={handleImageUpload}>
            <ImagePlus /> 이미지(맞춤)
          </Button>
          <Button type="button" onClick={addResizableImage}>
            <ImagePlus /> 이미지 (리사이즈)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TiptapToolbar;
