"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  addImage: (size: { width: number; height: number }) => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  const [selectedSize, setSelectedSize] = useState({ width: 300, height: 200 });

  const imageSizes = [
    { label: "Small", width: 150, height: 100 },
    { label: "Medium", width: 300, height: 200 },
    { label: "Large", width: 600, height: 400 },
    { label: "X-Large", width: 900, height: 600 },
    { label: "Original", width: 0, height: 0 }, // Original size
  ];

  const handleSizeSelect = (size: { width: number; height: number }) => {
    setSelectedSize(size);
  };

  if (!editor) return null;

  return (
    <div className="flex items-center gap-2 border rounded-md p-2 bg-background">
      <div className="flex items-center gap-2">
        {imageSizes.map((size) => (
          <Button
            key={size.label}
            onClick={() => handleSizeSelect(size)}
            className={`${
              selectedSize.width === size.width && selectedSize.height === size.height
                ? "bg-blue-500 text-white"
                : ""
            }`}
          >
            {size.label}
          </Button>
        ))}
      </div>
      <Separator orientation="vertical" />
      <Button type="button" onClick={() => addImage(selectedSize)}>
        <ImagePlus /> 이미지
      </Button>
    </div>
  );
};

export default TiptapToolbar;