// components/TiptapToolbar.tsx
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  Undo, Redo, ImagePlus, Youtube, Figma
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import FontFamilySelector from "./FontFamilySelector";
import TableActionsPopover from "./TableActionsPopover";
import FontColorSelector from "./FontColorSelector";

interface TiptapToolbarProps {
  editor: Editor | null;
  addImage: () => void;
}

const TiptapToolbar = ({ editor, addImage }: TiptapToolbarProps) => {
  if (!editor) return null;

  const addFigma = () => {
    const figmaUrl = prompt('Figma 파일 URL을 입력하세요:');
    if (figmaUrl && figmaUrl.includes('figma.com')) {
      editor.chain().focus().insertContent({
        type: 'figmaEmbed',
        attrs: { src: figmaUrl }
      }).run();
    } else if (figmaUrl) {
      alert('올바른 Figma URL을 입력해주세요.');
    }
  };

  return (
    <div className="border rounded-md p-2 bg-background">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Text Formatting Group */}
        <div className="flex items-center space-x-1">
          <Button
            type="button"
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="h-8 w-8"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
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
          <FontColorSelector editor={editor} />
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Alignment Controls */}
        <div className="flex items-center space-x-1">
          <Button
            type="button"
            variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="h-8 w-8"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="h-8 w-8"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
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
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            className="h-8 w-8"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            type="button"
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
            type="button"
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
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={addFigma}
            className="h-8"
          >
            <Figma className="h-4 w-4 mr-1" />
            피그마
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TiptapToolbar;