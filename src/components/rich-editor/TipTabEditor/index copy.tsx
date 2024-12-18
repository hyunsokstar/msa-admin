"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color"; // 글자 색상 기능
import Highlight from "@tiptap/extension-highlight"; // 글자 배경색 기능
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import { FontSize } from "./extensions/FontSize";
import { FontFamily } from "./extensions/FontFamily";
import React from "react";
import TiptapToolbar from "./TiptapToolbar";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

const TiptapEditor = ({ content, onChange, disabled = false }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color, // 글자 색상 기능
      Highlight.configure({ multicolor: true }), // 글자 배경색 기능
      FontSize.configure({ types: ["textStyle"] }), // 폰트 크기
      FontFamily.configure({ types: ["textStyle"] }), // 폰트 서체
      TextAlign.configure({ types: ["heading", "paragraph"] }), // 텍스트 정렬
      Underline, // 밑줄
      Image.configure({ inline: true }), // 이미지
      ResizeImage, // 이미지 리사이즈
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm focus:outline-none max-w-none",
      },
    },
  });

  const uploadImageToS3 = async (file: File): Promise<string | null> => {
    // 이미지 업로드 로직 (S3 연동)
    return null; // Implement your S3 upload logic here and return the uploaded image URL
  };

  const addImage = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          const imageUrl = await uploadImageToS3(file);
          if (imageUrl && editor) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };

    fileInput.click();
  };

  return (
    <div className="border rounded-md">
      <TiptapToolbar editor={editor} addImage={addImage} />
      <EditorContent
        editor={editor}
        className="overflow-y-auto px-4 py-3"
        style={{ minHeight: "15em", resize: "vertical" }}
      />
    </div>
  );
};

export default TiptapEditor;
