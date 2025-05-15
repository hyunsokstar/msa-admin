"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import React from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

const TiptapEditor = ({
  content,
  onChange,
  disabled = false,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      ResizeImage.configure({
        // 이미지 리사이징 관련 설정
        // keepAspectRatio: true, // 종횡비 유지
      }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none",
        style: "padding: 1rem;",
      },
    },
  });

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
            editor
              .chain()
              .focus()
              .setImage({ src: imageUrl })
              .run();
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };

    fileInput.click();
  };

  const uploadImageToS3 = async (file: File): Promise<string | null> => {
    try {
      const metadataResponse = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!metadataResponse.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { presignedUrl, fileUrl } = await metadataResponse.json();

      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      return fileUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  return (
    <div className="border rounded-md">
      <div className="border-b p-2">
        <button
          type="button"
          onClick={addImage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          이미지 업로드
        </button>
      </div>
      <div className="min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;