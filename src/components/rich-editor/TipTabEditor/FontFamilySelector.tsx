"use client";

import React from "react";
import { Editor } from "@tiptap/react";
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
  { label: "하이 멜로디", value: "Hi Melody", className: hiMelody.className },
  { label: "싱글 데이", value: "Single Day", className: singleDay.className },
  { label: "시골 이야기", value: "Poor Story", className: poorStory.className },
  { label: "윤성체", value: "Yeon Sung", className: yeonSung.className },
  { label: "주아체", value: "Jua", className: jua.className },
];

interface FontFamilySelectorProps {
  editor: Editor;
}

const FontFamilySelector = ({ editor }: FontFamilySelectorProps) => {
  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFont = e.target.value;
    const selectedFontClass = fontFamilyOptions.find((font) => font.value === selectedFont)?.className;

    editor.chain().focus().setFontFamily(selectedFont).run();

    const editorContainer = document.getElementById("editor-container");
    if (editorContainer) {
      editorContainer.className = `prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none w-full h-full ${selectedFontClass}`;
    }
  };

  return (
    <select
      onChange={handleFontFamilyChange}
      className="h-9 rounded-md border border-input bg-background px-3"
    >
      {fontFamilyOptions.map((font) => (
        <option key={font.value} value={font.value}>
          {font.label}
        </option>
      ))}
    </select>
  );
};

export default FontFamilySelector;
