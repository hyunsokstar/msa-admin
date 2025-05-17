// src/components/rich-editor/LexicalEditor/DirectStylePlugin.tsx
"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import {
    createCommand,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_EDITOR,
} from "lexical";
import { $patchStyleText } from "@lexical/selection";

// 이 커맨드로 스타일 명령을 전달합니다.
export const STYLE_COMMAND = createCommand<Record<string, string>>(
    "STYLE_COMMAND"
);

export default function DirectStylePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // STYLE_COMMAND 수신 시 선택 영역에 인라인 스타일을 패치
        return editor.registerCommand(
            STYLE_COMMAND,
            (style) => {
                editor.update(() => {
                    const sel = $getSelection();
                    if ($isRangeSelection(sel)) {
                        $patchStyleText(sel, style);
                    }
                });
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}
