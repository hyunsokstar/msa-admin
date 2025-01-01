"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from '@tiptap/core'
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Image as TiptapImage } from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { FontSize } from "./extensions/FontSize";
import { FontFamily } from "./extensions/FontFamily";
import Video from "./extensions/Video";
import Youtube from "@tiptap/extension-youtube";
import TiptapBubbleMenu from './TiptapBubbleMenu';
import Paragraph from '@tiptap/extension-paragraph';
import HardBreak from '@tiptap/extension-hard-break';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';

import React from "react";
import TiptapToolbar from "./TiptapToolbar";

const EnterKeyExtension = Extension.create({
  name: 'enterKey',
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        editor.commands.insertContent('<br />')
        return true
      },
    }
  },
})

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

const TiptapEditor = ({ content, onChange, disabled = false }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      HardBreak,
      EnterKeyExtension,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      FontSize.configure({ types: ["textStyle"] }),
      FontFamily.configure({ types: ["textStyle"], defaultFamily: "sans-serif" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TiptapImage.configure({ 
        inline: true,
        HTMLAttributes: {
          style: 'margin: 0 4px; padding: 0 4px; vertical-align: middle;',
          class: 'editor-image',
        }
      }),
      ResizeImage.configure({ 
        allowBase64: true,
        HTMLAttributes: {
          style: 'margin: 0 4px; padding: 0 4px; vertical-align: middle;',
          class: 'editor-image',
        }
      }),
      HorizontalRule,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Video,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
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

  const addImage = (size?: { width: number; height: number }) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          const imageUrl = await uploadImageToS3(file);
          if (imageUrl && editor) {
            const attributes = size
              ? {
                  src: imageUrl,
                  width: size.width,
                  height: size.height,
                  style: `width: ${size.width}px; height: ${size.height}px;`,
                }
              : { 
                  src: imageUrl
                };
            editor.commands.setImage(attributes);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!metadataResponse.ok) throw new Error("Failed to get presigned URL from server");

      const { presignedUrl, fileUrl } = await metadataResponse.json();

      await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      return fileUrl;
    } catch (error) {
      console.error("Error during image upload process:", error);
      return null;
    }
  };

  const addVideo = () => {
    const url = prompt("Please enter the video URL:");
    if (url && editor) {
      editor.chain().focus().setVideo({ src: url }).run();
    }
  };

  const addLink = () => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-220px)] bg-white shadow-md rounded-md">
      {editor && (
        <>
          <TiptapToolbar
            editor={editor}
            addImage={addImage}
          />
          <TiptapBubbleMenu editor={editor} />
        </>
      )}
      <div
        className="flex-1 relative border-t bg-white overflow-y-auto rounded-b-md"
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent 
          editor={editor} 
          className="w-full h-full p-4 [&_.ProseMirror]:caret-blue-500 [&_.ProseMirror]:caret-2 [&_.editor-image]:outline-2 [&_.editor-image]:outline-transparent hover:[&_.editor-image]:outline-blue-500" 
        />
      </div>
    </div>
  );
};

export default TiptapEditor;