// src/components/rich-editor/LexicalEditor/index.tsx
"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $createParagraphNode } from "lexical";

// Import custom nodes and plugins
import { CustomTextNode } from "./CustomTextNode";
import { FontSizePlugin } from "./FontSizePlugin";
import { TextColorPlugin } from "./TextColorPlugin";
import { BackgroundColorPlugin } from "./BackgroundColorPlugin";
import { ImagePlugin } from "./ImagePlugin";
import ImageUploadPlugin from "./ImageUploadPlugin";
import { ImageNode } from "./ImageNode";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import Toolbar from "./ToolBar";

// Import the Toolbar component

// InitialContentPlugin to load content
function InitialContentPlugin({ initialContent }: { initialContent: string }) {
  const [editor] = useLexicalComposerContext();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !initialContent || initialContent.trim() === '') return;

    const timer = setTimeout(() => {
      try {
        const initialState = JSON.parse(initialContent);
        editor.setEditorState(editor.parseEditorState(initialState));
        initializedRef.current = true;
      } catch (error) {
        console.error('Error parsing initial content:', error);
        editor.update(() => {
          const root = $getRoot();
          if (root.getFirstChild() === null) {
            const paragraph = $createParagraphNode();
            root.append(paragraph);
          }
        });
        initializedRef.current = true;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [editor, initialContent]);

  return null;
}

interface Props {
  content: string;
  onChange: (json: string) => void;
  disabled?: boolean;
}

export default function LexicalEditor({
  content,
  onChange,
  disabled = false,
}: Props) {
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

  const initialConfig = {
    namespace: "MyEditor",
    editable: !disabled,
    onError: (error: Error) => console.error(error),
    theme: {},
    nodes: [CustomTextNode, ImageNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* Use the separate Toolbar component */}
      <Toolbar />

      {/* Init content */}
      <InitialContentPlugin initialContent={content} />

      {/* Plugins */}
      <FontSizePlugin />
      <TextColorPlugin />
      <BackgroundColorPlugin />
      <ImagePlugin />
      <ImageUploadPlugin />

      {/* Editor body */}
      <div className="border border-gray-300 rounded relative min-h-[200px] p-3">
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
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