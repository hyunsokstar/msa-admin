"use client";

import React, { ChangeEvent } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Highlighter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import "../../../styles/fonts.css";

const fontFamilyOptions = [
  { label: "Default", value: "sans-serif" },
  { label: "Roboto Mono", value: "Roboto Mono" },
  { label: "Noto Sans KR", value: "Noto Sans KR" },
  { label: "Black Han Sans", value: "Black Han Sans" },
  { label: "Cute Font", value: "Cute Font" },
  { label: "Gamja Flower", value: "Gamja Flower" },
  { label: "Nanum Gothic Coding", value: "Nanum Gothic Coding" },
  { label: "Nanum Pen", value: "Nanum Pen" },
];

interface TiptapBubbleMenuProps {
  editor: Editor;
}

const TiptapBubbleMenu: React.FC<TiptapBubbleMenuProps> = ({ editor }) => {
  const [color, setColor] = React.useState("#000000");
  const [fontSize, setFontSize] = React.useState(16);

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value;
    setColor(selectedColor);
    editor.chain().focus().setColor(selectedColor).run();
  };

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(`${size}px`).run();
  };

  const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    editor.chain().focus().setFontFamily(selectedFont).run();
  };

  const applyHighlight = (color: string) => {
    // 형광펜 하이라이트 적용 수정
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const resetFormatting = () => {
    editor.chain().focus().clearNodes().unsetAllMarks().run();
  };

  const fontSizeOptions = Array.from({ length: (68 - 12) / 2 + 1 }, (_, i) => 12 + i * 2);

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="bg-background border shadow-md rounded-lg overflow-visible p-2 bg-white z-50" // z-index 추가
    >
      <div className="flex flex-wrap items-center gap-2">
        {/* Font Size and Color Group */}
        <div className="flex items-center gap-2">
          <select
            value={fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            style={{ width: "60px" }}
          >
            {fontSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-8 h-8 cursor-pointer"
          />

          <select
            onChange={handleFontFamilyChange}
            className="h-8 rounded-md border border-input bg-background px-2 text-sm min-w-[120px]"
          >
            {fontFamilyOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Format Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-8 w-8 p-0"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Highlight Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={editor.isActive('highlight', { color: 'yellow' }) ? "default" : "ghost"}
            size="sm"
            onClick={() => applyHighlight("yellow")}
            className="h-8 w-8 p-0"
          >
            <Highlighter className="h-4 w-4 text-yellow-400" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive('highlight', { color: '#ffcc99' }) ? "default" : "ghost"}
            size="sm"
            onClick={() => applyHighlight("#ffcc99")}
            className="h-8 w-8 p-0"
          >
            <Highlighter className="h-4 w-4 text-orange-400" />
          </Button>
        </div>

        {/* Reset Formatting Button */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={resetFormatting}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        {/* Alignment Buttons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="h-8 w-8 p-0"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="h-8 w-8 p-0"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="h-8 w-8 p-0"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </BubbleMenu>
  );
};

export default TiptapBubbleMenu;