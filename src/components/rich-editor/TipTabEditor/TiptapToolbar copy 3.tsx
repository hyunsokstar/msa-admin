"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FontSizeAdjuster from "./FontSizeAdjuster";
import {
  Roboto,
  Open_Sans,
  Lato,
  Montserrat,
} from "next/font/google"; // 영어 폰트
import {
  Nanum_Gothic,
  Nanum_Myeongjo,
  Nanum_Pen_Script,
  Dokdo,
  Gaegu,
  Hi_Melody,
  Single_Day,
  Poor_Story,
  Yeon_Sung,
  Jua,
} from "next/font/google"; // 한글 폰트
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

// Google Fonts 로드
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"] });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400", "700"] });
const nanumMyeongjo = Nanum_Myeongjo({ subsets: ["latin"], weight: ["400", "700"] });
const nanumPenScript = Nanum_Pen_Script({ subsets: ["latin"], weight: ["400"] });
const dokdo = Dokdo({ subsets: ["latin"], weight: ["400"] });
const gaegu = Gaegu({ subsets: ["latin"], weight: ["400", "700"] });
const hiMelody = Hi_Melody({ subsets: ["latin"], weight: ["400"] });
const singleDay = Single_Day({ weight: ["400"] });
const poorStory = Poor_Story({ subsets: ["latin"], weight: ["400"] });
const yeonSung = Yeon_Sung({ subsets: ["latin"], weight: ["400"] });
const jua = Jua({ subsets: ["latin"], weight: ["400"] });

// 폰트 옵션
const fontFamilyOptions = [
  { label: "Default", value: "sans-serif", className: "" },
  { label: "Roboto", value: "Roboto", className: roboto.className },
  { label: "Open Sans", value: "Open Sans", className: openSans.className },
  { label: "Lato", value: "Lato", className: lato.className },
  { label: "Montserrat", value: "Montserrat", className: montserrat.className },
  { label: "나눔고딕", value: "Nanum Gothic", className: nanumGothic.className },
  { label: "나눔명조", value: "Nanum Myeongjo", className: nanumMyeongjo.className },
  { label: "나눔손글씨", value: "Nanum Pen Script", className: nanumPenScript.className },
  { label: "독도체", value: "Dokdo", className: dokdo.className },
  { label: "가을체", value: "Gaegu", className: gaegu.className },
  { label: "Hi Melody", value: "Hi Melody", className: hiMelody.className },
  { label: "Single Day", value: "Single Day", className: singleDay.className },
  { label: "Poor Story", value: "Poor Story", className: poorStory.className },
  { label: "Yeon Sung", value: "Yeon Sung", className: yeonSung.className },
  { label: "Jua", value: "Jua", className: jua.className },
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

interface TiptapToolbarProps {
  editor: Editor;
  addImage: ({ width, height }: { width: number; height: number }) => void;
}

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
    const selectedFontClass = fontFamilyOptions.find((font) => font.value === selectedFont)?.className;

    setFontFamily(selectedFont);
    editor.chain().focus().setFontFamily(selectedFont).run();

    // 적용할 폰트 클래스 설정
    const editorContainer = document.getElementById("editor-container");
    if (editorContainer) {
      editorContainer.className = `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none w-full h-full ${selectedFontClass}`;
    }
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
    </div>
  );
};

export default TiptapToolbar;
