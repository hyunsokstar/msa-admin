// src/components/rich-editor/TibTabEditor/index.tsx
"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm min-h-[150px] p-4 border border-gray-200 rounded-md bg-white focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
}
