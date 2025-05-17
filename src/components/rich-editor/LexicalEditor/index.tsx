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

// --- カスタムノード & プラグイン ---
import { CustomTextNode } from "./CustomTextNode";
import { FontSizePlugin, FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TextColorPlugin, TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import {
  BackgroundColorPlugin,
  BACKGROUND_COLOR_COMMAND,
} from "./BackgroundColorPlugin";
import { ImagePlugin } from "./ImagePlugin";
import ImageUploadPlugin from "./ImageUploadPlugin";
import { ImageNode } from "./ImageNode";

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
    onError: (error: Error) => console.error(error),
    theme: {},
    // CustomTextNode と ImageNode を登録
    nodes: [CustomTextNode, ImageNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* Toolbar */}
      <div className="p-2 border-b bg-gray-100 space-x-2 flex items-center">
        <FontSizeSelect />
        <ColorPicker />
        <BackgroundColorPicker />
      </div>

      {/* プラグイン群 */}
      <FontSizePlugin />
      <TextColorPlugin />
      <BackgroundColorPlugin />

      {/* 画像挿入 / アップロード */}
      <ImagePlugin />
      <ImageUploadPlugin />

      {/* エディタ本体 */}
      <div className="border border-gray-300 rounded relative min-h-[200px] p-3">
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={
            <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
              내용을 입력하세요…
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

// 以下 Toolbar コンポーネント群は変更なし
function FontSizeSelect() {
  const [editor] = useLexicalComposerContext();
  return (
    <select
      onChange={(e) =>
        editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)
      }
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

function ColorPicker() {
  const [editor] = useLexicalComposerContext();
  return (
    <label className="inline-flex items-center text-sm">
      글자색:
      <input
        type="color"
        defaultValue="#000000"
        className="ml-1 h-6 w-6 border-none"
        onChange={(e) =>
          editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)
        }
      />
    </label>
  );
}

function BackgroundColorPicker() {
  const [editor] = useLexicalComposerContext();
  return (
    <label className="inline-flex items-center text-sm">
      배경색:
      <input
        type="color"
        defaultValue="#ffffff"
        className="ml-1 h-6 w-6 border-none"
        onChange={(e) =>
          editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)
        }
      />
    </label>
  );
}
