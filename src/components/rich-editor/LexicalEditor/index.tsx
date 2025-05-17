// src/components/rich-editor/LexicalEditor.tsx
"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import LexicalEditorToolBar from "@/components/rich-editor/LexicalEditor/LexicalEditorToolBar";
import styles from './editor.module.css';

function Placeholder() {
  return <div className={styles['editor-placeholder']}>내용을 입력하세요...</div>;
}

function EditorInitializerPlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    try {
      const parsedState = editor.parseEditorState(content);
      editor.setEditorState(parsedState);
    } catch (err) {
      console.error("EditorInitializerPlugin parse error:", err);
    }
  }, [editor, content]);

  return null;
}

interface LexicalEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

export default function LexicalEditor({
  content = "",
  onChange,
  disabled = false
}: LexicalEditorProps) {
  const initialConfig = {
    namespace: "MyEditor",
    theme: {
      paragraph: styles['editor-paragraph'],
      code: styles['editor-code'],
      heading: {
        h1: styles['editor-heading-h1'],
        h2: styles['editor-heading-h2'],
        h3: styles['editor-heading-h3'],
      },
      text: {
        bold: styles['editor-text-bold'],
        italic: styles['editor-text-italic'],
        underline: styles['editor-text-underline'],
      },
    },
    onError: (error: Error) => console.error("Lexical editor error:", error),
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editable: !disabled,
  };

  const handleEditorChange = (state: any) => {
    try {
      state.read(() => {
        const json = JSON.stringify(state);
        onChange(json);
      });
    } catch (error) {
      console.error("Failed to process editor change:", error);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className={styles['editor-container']}>
        <LexicalEditorToolBar />
        <div className={styles['editor-inner']}>
          <EditorInitializerPlugin content={content} />
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles['editor-input']} />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={handleEditorChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
