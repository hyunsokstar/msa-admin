"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
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
  Table as TableIcon,
  ImagePlus,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import FontSizeAdjuster from "./FontSizeAdjuster";
import FontFamilySelector from "./FontFamilySelector";

interface TiptapToolbarProps {
  editor: Editor;
  addImage?: (props: { width: number; height: number }) => void;
  addResizableImage?: () => void;
}

export const TiptapToolbar = ({ editor, addImage, addResizableImage }: TiptapToolbarProps) => {
  const [fontSize, setFontSize] = useState(15);
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(300);

  if (!editor) return null;

  const handleInsertTable = () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  const handleAddColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const handleAddColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const handleDeleteColumn = () => editor.chain().focus().deleteColumn().run();
  const handleAddRowBefore = () => editor.chain().focus().addRowBefore().run();
  const handleAddRowAfter = () => editor.chain().focus().addRowAfter().run();
  const handleDeleteRow = () => editor.chain().focus().deleteRow().run();
  const handleDeleteTable = () => editor.chain().focus().deleteTable().run();

  return (
    <div className="flex flex-col gap-2 border rounded-md p-2 bg-background">
      {/* First Row: Text Formatting, Alignment, and Images */}
      <div className="flex items-center gap-2 justify-between">
        {/* Left Section: Text Formatting and Alignment */}
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
          <Button type="button" onClick={() => editor.chain().focus().undo().run()}>
            <Undo />
          </Button>
          <Button type="button" onClick={() => editor.chain().focus().redo().run()}>
            <Redo />
          </Button>
        </div>

        {/* Right Section: Image Inputs and Buttons */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={imageWidth}
            onChange={(e) => setImageWidth(Number(e.target.value))}
            placeholder="Width"
            className="w-20 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={imageHeight}
            onChange={(e) => setImageHeight(Number(e.target.value))}
            placeholder="Height"
            className="w-20 px-2 py-1 border rounded"
          />
          <Button
            type="button"
            onClick={() => addImage?.({ width: imageWidth, height: imageHeight })}
          >
            <ImagePlus /> 이미지(맞춤)
          </Button>
          <Button type="button" onClick={addResizableImage}>
            <ImagePlus /> 이미지(리사이즈)
          </Button>
        </div>
      </div>

      {/* Second Row: Font Options and Table */}
      <div className="flex items-center gap-2">
        <FontFamilySelector editor={editor} />
        <FontSizeAdjuster
          value={fontSize}
          onChange={(newSize) => {
            setFontSize(newSize);
            editor.chain().focus().setFontSize(`${newSize}px`).run();
          }}
        />
        <Separator orientation="vertical" />

        {/* Table Actions */}
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button">
              <TableIcon /> 테이블
            </Button>
          </PopoverTrigger>
          <PopoverContent className="absolute right-0 w-64 p-2 flex flex-wrap gap-2 bg-white shadow-md border rounded-md">
            <Button variant="ghost" type="button" onClick={handleInsertTable} className="hover:bg-gray-100">
              테이블 추가
            </Button>
            <Button variant="ghost" type="button" onClick={handleAddColumnBefore} className="hover:bg-gray-100">
              열 추가 (앞)
            </Button>
            <Button variant="ghost" type="button" onClick={handleAddColumnAfter} className="hover:bg-gray-100">
              열 추가 (뒤)
            </Button>
            <Button variant="ghost" type="button" onClick={handleDeleteColumn} className="hover:bg-gray-100">
              열 삭제
            </Button>
            <Button variant="ghost" type="button" onClick={handleAddRowBefore} className="hover:bg-gray-100">
              행 추가 (위)
            </Button>
            <Button variant="ghost" type="button" onClick={handleAddRowAfter} className="hover:bg-gray-100">
              행 추가 (아래)
            </Button>
            <Button variant="ghost" type="button" onClick={handleDeleteRow} className="hover:bg-gray-100">
              행 삭제
            </Button>
            <Button variant="ghost" type="button" onClick={handleDeleteTable} className="hover:bg-gray-100">
              테이블 삭제
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
