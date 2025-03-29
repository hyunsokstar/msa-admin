"use client";

import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";

interface FontColorSelectorProps {
  editor: Editor;
}

const colorOptions = [
  { label: "Default", value: "black" },
  { label: "Red", value: "#FF0000" },
  { label: "Blue", value: "#0000FF" },
  { label: "Green", value: "#008000" },
  { label: "Purple", value: "#800080" },
  { label: "Orange", value: "#FFA500" },
  { label: "Pink", value: "#FFC0CB" },
  { label: "Brown", value: "#A52A2A" },
  { label: "Gray", value: "#808080" },
  { label: "Cyan", value: "#00FFFF" },
];

const FontColorSelector: React.FC<FontColorSelectorProps> = ({ editor }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    editor.chain().focus().setColor(color).run();
  };

  const currentColor = editor.getAttributes('textStyle').color || '#000000';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1 border-dashed"
          style={{ color: currentColor }}
        >
          <Palette className="h-4 w-4" />
          <div 
            className="rounded-sm w-4 h-4 border" 
            style={{ backgroundColor: currentColor || selectedColor }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <div className="font-medium text-sm">색상 선택</div>
          <div className="grid grid-cols-5 gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                className="w-8 h-8 rounded-md border overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
                style={{ backgroundColor: option.value }}
                onClick={() => handleColorSelect(option.value)}
                title={option.label}
              />
            ))}
          </div>
          <div>
            <label className="text-xs font-medium mb-1 block">커스텀 색상</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorSelect(e.target.value)}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontColorSelector;