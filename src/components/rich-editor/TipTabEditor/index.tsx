import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
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
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize.configure({ types: ["textStyle"] }),
      FontFamily.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      Image.configure({ inline: true }),
      ResizeImage,
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none max-w-none w-full h-full",
      },
    },
  });

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
    <div className="flex flex-col w-full h-full bg-white">
      {/* 툴바 */}
      <TiptapToolbar editor={editor} addImage={addImage} />
      {/* 에디터 영역 */}
      <div
        className="flex-1 relative overflow-y-auto border-t"
        style={{ minHeight: "300px", maxHeight: "500px" }}
      >
        <EditorContent
          editor={editor}
          className="w-full h-full p-4"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;
