

// src/components/rich-editor/LexicalEditor/index.tsx
"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $createParagraphNode } from "lexical";

import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { CustomTextNode } from "./CustomTextNode";
import { FontSizePlugin } from "./FontSizePlugin";
import { TextColorPlugin } from "./TextColorPlugin";
import { BackgroundColorPlugin } from "./BackgroundColorPlugin";
import { ImagePlugin } from "./ImagePlugin";
import ImageUploadPlugin from "./ImageUploadPlugin";
import { ImageNode } from "./ImageNode";
import Toolbar from "./ToolBar";
import { CodeHighlightPlugin } from "./CodeHighlightPlugin";
import { codeHighlightTheme } from "./codeHighlightTheme";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkDecoratorNode } from "./LinkDecoratorNode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

function InitialContentPlugin({ initialContent }: { initialContent: string }) {
  const [editor] = useLexicalComposerContext();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !initialContent || initialContent.trim() === '') return;

    queueMicrotask(() => {
      try {
        const initialState = JSON.parse(initialContent);
        editor.setEditorState(editor.parseEditorState(initialState));
      } catch (error) {
        console.error('Error parsing initial content:', error);
        editor.update(() => {
          const root = $getRoot();
          if (root.getFirstChild() === null) {
            root.append($createParagraphNode());
          }
        });
      }
      initializedRef.current = true;
    });
  }, [editor, initialContent]);

  return null;
}

interface Props {
  content: string;
  onChange: (json: string) => void;
  disabled?: boolean;
}

export default function LexicalEditor({ content, onChange, disabled = false }: Props) {
  const historyRef = useRef<any>(null);
  const isInitialMount = useRef(true);

  const handleChange = useCallback(
    (editorState: any) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      editorState.read(() => {
        onChange(JSON.stringify(editorState.toJSON()));
      });
    },
    [onChange]
  );

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .editor-content-area {
        max-height: 500px;
        overflow-y: auto;
        position: relative;
        scroll-padding-top: 24px;
      }
      .editor-content-area::before {
        content: '';
        display: block;
        height: 32px;
      }
      .ContentEditable__root {
        padding: 24px 16px 16px 16px;
        min-height: 200px;
        scroll-margin-top: 24px;
        line-height: 1.8;
      }
      /* 줄 간격 조정 - 더 크게 */
      .ContentEditable__root p {
        margin-bottom: 1.2em;
      }
      .ContentEditable__root h1 {
        margin-top: 1.8em;
        margin-bottom: 1em;
      }
      .ContentEditable__root h2 {
        margin-top: 1.5em;
        margin-bottom: 0.8em;
      }
      /* 코드 블록 스타일 개선 */
      .ContentEditable__root pre {
        padding: 1em;
        margin: 1.2em 0;
        border-radius: 6px;
      }
      /* 목록 항목 간격 */
      .ContentEditable__root ul li,
      .ContentEditable__root ol li {
        margin-bottom: 0.5em;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const initialConfig = {
    namespace: "MyEditor",
    editable: !disabled,
    onError: (error: Error) => console.error(error),
    theme: codeHighlightTheme,
    nodes: [
      CustomTextNode,
      ImageNode,
      CodeNode,
      CodeHighlightNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      PlaygroundCodeBlockNode,
      LinkNode,
      AutoLinkNode,
      LinkDecoratorNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="toolbar-container sticky top-0 z-10 bg-gray-100">
        <Toolbar />
      </div>

      <InitialContentPlugin initialContent={content} />

      <FontSizePlugin />
      <TextColorPlugin />
      <BackgroundColorPlugin />
      <ImagePlugin />
      <ImageUploadPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />

      <div className="border border-gray-300 rounded relative min-h-[200px] editor-content-area">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none prose prose-sm max-w-none ContentEditable__root" />
          }
          placeholder={
            <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
              내용을 입력하세요...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin externalHistoryState={historyRef.current} />
        <OnChangePlugin onChange={handleChange} />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}