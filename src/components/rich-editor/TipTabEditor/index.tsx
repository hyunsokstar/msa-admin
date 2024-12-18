// components/TiptapEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import ResizeImage from "tiptap-extension-resize-image";
import { FontSize } from "./extensions/FontSize";
import React from "react";
import TiptapToolbar from "./TiptapToolbar";
import { FontFamily } from "./extensions/FontFamily";

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
    TextStyle,
    FontSize.configure({
      types: ["textStyle"],
    }),
    FontFamily.configure({
      types: ["textStyle"],
    }),
    Image.configure({
      inline: true,
    }),
    ResizeImage,
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
      <TiptapToolbar editor={editor} addImage={addImage} />
      <div className="min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapEditor;