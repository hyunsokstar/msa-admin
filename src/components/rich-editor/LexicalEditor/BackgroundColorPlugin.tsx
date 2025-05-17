// src/components/rich-editor/LexicalEditor/FontColorPlugin.tsx
"use client";

import {
    $getSelection,
    $isRangeSelection,
    createCommand,
    COMMAND_PRIORITY_EDITOR,
    TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CustomTextNode } from "./CustomTextNode";
import { useEffect } from "react";

export const FONT_COLOR_COMMAND = createCommand<string>("FONT_COLOR_COMMAND");

export function FontColorPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            FONT_COLOR_COMMAND,
            (color) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return false;

                    const nodes = selection.getNodes();
                    for (const node of nodes) {
                        if (node instanceof TextNode && !(node instanceof CustomTextNode)) {
                            const newNode = new CustomTextNode(node.getTextContent());
                            newNode.setFormat(node.getFormat());
                            newNode.setStyle(node.getStyle());
                            newNode.setColor(color); // ✅ 이 메서드가 CustomTextNode에 있어야 함
                            node.replace(newNode);
                        } else if (node instanceof CustomTextNode) {
                            node.setColor(color); // ✅ 여기서도 마찬가지
                        }
                    }
                });
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}
