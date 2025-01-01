// components/toolbar/CodeBlockToggleButton.tsx
"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockToggleButtonProps {
  editor: Editor;
}

const CodeBlockToggleButton: React.FC<CodeBlockToggleButtonProps> = ({ editor }) => {
  const isActive = editor.isActive("codeBlock");

  return (
    <Button
      type="button"
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      className="h-8 w-8"
    >
      <Code className="h-4 w-4" />
    </Button>
  );
};

export default CodeBlockToggleButton;
