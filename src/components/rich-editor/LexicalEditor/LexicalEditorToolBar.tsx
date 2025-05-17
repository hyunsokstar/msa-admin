// src/components/rich-editor/LexicalEditor/LexicalEditorToolBar.tsx
"use client";

import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_TEXT_COMMAND,
} from "lexical";
import {
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from "@lexical/list";

import { Button } from "@/components/ui/button";

export default function LexicalEditorToolBar() {
    const [editor] = useLexicalComposerContext();

    return (
        <div className="flex gap-2 p-2 border-b border-gray-200 bg-gray-50">
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
            >
                Bold
            </Button>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
            >
                Italic
            </Button>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
            >
                Underline
            </Button>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
            >
                • List
            </Button>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
            >
                1. List
            </Button>
            <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
            >
                Remove List
            </Button>
        </div>
    );
}