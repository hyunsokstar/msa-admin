// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\BackgroundColorPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    createCommand,
    COMMAND_PRIORITY_EDITOR,
    LexicalEditor,
    TextNode,
} from "lexical";
import { CustomTextNode } from "./CustomTextNode";

export const BACKGROUND_COLOR_COMMAND = createCommand<string>("BACKGROUND_COLOR_COMMAND");

function applyBackgroundColor(editor: LexicalEditor, color: string) {
    editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const nodes = selection.getNodes();
        for (const node of nodes) {
            if ($isTextNode(node)) {
                let target: CustomTextNode;
                if (node instanceof CustomTextNode) {
                    target = node.getWritable();
                } else {
                    const newNode = new CustomTextNode(
                        node.getTextContent(),
                        undefined,
                        "16px",
                        "#000000",
                        color
                    );
                    newNode.setFormat(node.getFormat());
                    newNode.setStyle(node.getStyle());
                    node.replace(newNode);
                    target = newNode;
                }
                target.setBackgroundColor(color);
            }
        }
    });
}

export function BackgroundColorPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([CustomTextNode])) {
            throw new Error("BackgroundColorPlugin: CustomTextNode not registered");
        }

        return editor.registerCommand(
            BACKGROUND_COLOR_COMMAND,
            (color: string) => {
                applyBackgroundColor(editor, color);
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}
