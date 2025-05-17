// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\index.tsx
"use client";

import React, { useCallback, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// Custom Text Node & Plugins
import { CustomTextNode } from "./CustomTextNode";
import { FontSizePlugin, FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TextColorPlugin, TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import { BackgroundColorPlugin, BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";

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

  const handleChange = useCallback(
    (editorState: any) => {
      editorState.read(() => {
        onChange(JSON.stringify(editorState.toJSON()));
      });
    },
    [onChange]
  );

  const initialConfig = {
    namespace: "MyEditor",
    editable: !disabled,
    onError: (err: Error) => console.error(err),
    theme: {},
    nodes: [CustomTextNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="p-2 border-b bg-gray-100 space-x-2 flex items-center">
        <FontSizeSelect />
        <ColorPicker />
        <BackgroundColorPicker />
      </div>

      <FontSizePlugin />
      <TextColorPlugin />
      <BackgroundColorPlugin />

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

// 폰트 크기 선택
function FontSizeSelect() {
  const [editor] = useLexicalComposerContext();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontSize = e.target.value;
    editor.dispatchCommand(FONT_SIZE_COMMAND, fontSize);
  };

  return (
    <select
      onChange={onChange}
      defaultValue="16px"
      className="border rounded p-1 text-sm"
    >
      <option value="12px">12</option>
      <option value="14px">14</option>
      <option value="16px">16</option>
      <option value="18px">18</option>
      <option value="24px">24</option>
      <option value="32px">32</option>
      <option value="64px">64</option>
    </select>
  );
}

// 글자 색상 선택
function ColorPicker() {
  const [editor] = useLexicalComposerContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    editor.dispatchCommand(TEXT_COLOR_COMMAND, color);
  };

  return (
    <label className="inline-flex items-center text-sm">
      글자색:
      <input
        type="color"
        onChange={onChange}
        className="ml-1 h-6 w-6 border-none"
        defaultValue="#000000"
      />
    </label>
  );
}

// 배경 색상 선택
function BackgroundColorPicker() {
  const [editor] = useLexicalComposerContext();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
  };

  return (
    <label className="inline-flex items-center text-sm">
      배경색:
      <input
        type="color"
        onChange={onChange}
        className="ml-1 h-6 w-6 border-none"
        defaultValue="#ffffff"
      />
    </label>
  );
}
