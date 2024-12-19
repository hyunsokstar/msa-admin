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
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
  ImagePlus,
} from "lucide-react";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: (size?: { width: number; height: number }) => void;
}

const fontFamilyOptions = [
  { label: "Default", value: "sans-serif" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "나눔고딕", value: "Nanum Gothic" },
];

const imageSizeOptions = [
  { width: 300, height: 300, label: "300 x 300" },
  { width: 400, height: 400, label: "400 x 400" },
  { width: 500, height: 500, label: "500 x 500" },
  { width: 600, height: 600, label: "600 x 600" },
  { width: 700, height: 700, label: "700 x 700" },
  { width: 800, height: 800, label: "800 x 800" },
  { width: 900, height: 900, label: "900 x 900" },
  { width: 1000, height: 1000, label: "1000 x 1000" },
];

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(15);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);

  useEffect(() => {
    if (!editor) return;
    setFontSize(parseInt(editor.getAttributes("textStyle")?.fontSize || "15", 10));
    setFontFamily(editor.getAttributes("textStyle")?.fontFamily || "sans-serif");
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

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    setFontFamily(selectedFont);
    editor.chain().focus().setFontFamily(selectedFont).run();
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

          <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            className="h-9 rounded-md border border-input bg-background px-3"
          >
            {fontFamilyOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>

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

      {/* Second Row */}
      <div className="flex items-center gap-2 flex-wrap">
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
        </div>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-2">
          <Button type="button" onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </Button>
          <Button type="button" onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </Button>
        </div>

        <Separator orientation="vertical" />

        <div className="flex items-center gap-2">
          <select
            value={`${width}x${height}`}
            onChange={(e) => {
              const [w, h] = e.target.value.split('x').map(Number);
              setWidth(w);
              setHeight(h);
            }}
            className="h-9 rounded-md border border-input bg-background px-3"
          >
            {imageSizeOptions.map((size) => (
              <option key={size.label} value={`${size.width}x${size.height}`}>
                {size.label}
              </option>
            ))}
          </select>
          <Button type="button" onClick={handleImageUpload}>
            <ImagePlus className="mr-1" /> 사이즈
          </Button>
          <Button
            type="button"
            onClick={() => addImage()}
            variant="ghost"
            size="icon"
          >
            <ImagePlus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TiptapToolbar;