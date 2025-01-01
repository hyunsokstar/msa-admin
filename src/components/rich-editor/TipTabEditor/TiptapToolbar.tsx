import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, ImagePlus, Youtube
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
    <div className="border rounded-md p-2 bg-background">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Text Formatting Group */}
        <div className="flex items-center space-x-1">
          <Button
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-8 w-8"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("strike") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className="h-8 w-8"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Font Controls */}
        <div className="flex items-center space-x-2">
          <FontSizeAdjuster
            value={16}
            onChange={(size) => editor.chain().focus().setFontSize(`${size}px`).run()}
          />
          <FontFamilySelector editor={editor} />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-8 h-8 cursor-pointer"
            title="텍스트 색상"
          />
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Alignment Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="h-8 w-8"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="h-8 w-8"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="h-8 w-8"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* History Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            className="h-8 w-8"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            className="h-8 w-8"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Table Controls */}
        <TableActionsPopover editor={editor} />

        {/* Media Controls */}
        <div className="flex items-center space-x-2 ml-auto">
          <Button type="button" variant="secondary" size="sm" onClick={addImage} className="h-8">
            <ImagePlus className="h-4 w-4 mr-1" />
            이미지
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              const url = prompt("유튜브 URL을 입력하세요:");
              if (url) {
                editor.chain().focus().setYoutubeVideo({
                  src: url,
                  width: 640,
                  height: 360,
                }).run();
              }
            }}
            className="h-8"
          >
            <Youtube className="h-4 w-4 mr-1" />
            유튜브
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TiptapToolbar;