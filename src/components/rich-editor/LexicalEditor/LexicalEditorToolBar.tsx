// src/components/rich-editor/LexicalEditor/LexicalEditorToolBar.tsx
"use client";

import React, { useCallback } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import { Button } from "@/components/ui/button";
import { STYLE_COMMAND } from "./DirectStylePlugin";

export default function LexicalEditorToolBar() {
    const [editor] = useLexicalComposerContext();

    // 글자 크기
    const onFontSizeChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            editor.dispatchCommand(STYLE_COMMAND, { fontSize: e.target.value });
        },
        [editor]
    );

    // 글자색
    const onTextColorChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            editor.dispatchCommand(STYLE_COMMAND, { color: e.target.value });
        },
        [editor]
    );

    // 배경색
    const onBgColorChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            editor.dispatchCommand(STYLE_COMMAND, {
                backgroundColor: e.target.value,
            });
        },
        [editor]
    );

    // 형광펜 (highlight)
    const onHighlightClick = useCallback(() => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
    }, [editor]);

    return (
        <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
            {/* 글자 크기 */}
            <select
                defaultValue="16px"
                className="border rounded p-1 text-sm"
                onChange={onFontSizeChange}
            >
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="24px">24</option>
                <option value="32px">32</option>
            </select>

            {/* 글자색 */}
            <div className="flex items-center">
                <span className="text-xs mr-1">글자색:</span>
                <input
                    type="color"
                    className="w-6 h-6 p-0 border"
                    onChange={onTextColorChange}
                    title="Text Color"
                />
            </div>

            {/* 배경색 */}
            <div className="flex items-center">
                <span className="text-xs mr-1">배경색:</span>
                <input
                    type="color"
                    defaultValue="#ffff00"
                    className="w-6 h-6 p-0 border"
                    onChange={onBgColorChange}
                    title="Background Color"
                />
            </div>

            {/* 형광펜 */}
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onHighlightClick}
                className="bg-yellow-100 hover:bg-yellow-200 text-gray-800"
            >
                형광펜
            </Button>
        </div>
    );
}
