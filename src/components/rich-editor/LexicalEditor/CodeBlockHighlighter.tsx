"use client";

import { useState } from "react";
import { Editor } from "@tiptap/react";
import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockHighlighterProps {
  editor: Editor;
}

const CodeBlockHighlighter: React.FC<CodeBlockHighlighterProps> = ({ editor }) => {
  const openDialog = () => {
    // 선택된 텍스트를 가져오기
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ");

    // 선택된 텍스트에 코드 마크를 적용하여 배경색만 추가
    editor.chain().focus().toggleMark('code').run();  // 코드 마크를 토글하여 배경색 적용
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={openDialog}
        className="h-8 w-8 p-0"
      >
        <Code className="h-4 w-4" />
      </Button>
    </>
  );
};

export default CodeBlockHighlighter;
