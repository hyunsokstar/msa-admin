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
  Undo,
  Redo,
  ImagePlus,
  Link as LinkIcon,
  Video as VideoIcon
} from "lucide-react";
import { Editor } from "@tiptap/react";
import React, { useState } from "react";
import FontSizeAdjuster from "./FontSizeAdjuster";
import FontFamilySelector from "./FontFamilySelector";

interface TiptapToolbarProps {
  editor: Editor;
  addImage?: (props: { width: number; height: number }) => void;
  addResizableImage?: () => void;
  addVideo?: () => void;
  addLink?: () => void;
}

export const TiptapToolbar = ({ 
  editor, 
  addImage, 
  addResizableImage, 
  addVideo, 
  addLink 
}: TiptapToolbarProps) => {
  const [fontSize, setFontSize] = useState(15);
  const [imageWidth, setImageWidth] = useState(300);
  const [imageHeight, setImageHeight] = useState(300);

  if (!editor) return null;

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
          
          <Separator orientation="vertical" />
          <Button type="button" onClick={addLink}>
            <LinkIcon />
          </Button>
          <Button type="button" onClick={addVideo}>
            <VideoIcon />
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

      {/* Second Row: Font Options */}
      <div className="flex items-center gap-2">
        <FontFamilySelector editor={editor} />
        <FontSizeAdjuster
          value={fontSize}
          onChange={(newSize) => {
            setFontSize(newSize);
            editor.chain().focus().setFontSize(`${newSize}px`).run();
          }}
        />
      </div>
    </div>
  );
};