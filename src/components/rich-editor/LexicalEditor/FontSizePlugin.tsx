// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\FontSizePlugin.tsx
"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getSelection,
    $isRangeSelection,
    createCommand,
    COMMAND_PRIORITY_EDITOR,
    TextNode,
} from "lexical";
import { CustomTextNode } from "./CustomTextNode";
import { useEffect } from "react";

export const FONT_SIZE_COMMAND = createCommand<string>("FONT_SIZE_COMMAND");

export function FontSizePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            FONT_SIZE_COMMAND,
            (size) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return false;

                    const nodes = selection.getNodes();
                    for (const node of nodes) {
                        // 기존 TextNode → CustomTextNode로 변환
                        if (node instanceof TextNode && !(node instanceof CustomTextNode)) {
                            const newNode = new CustomTextNode(node.getTextContent());
                            newNode.setFormat(node.getFormat());
                            newNode.setStyle(node.getStyle());
                            newNode.setFontSize(size);
                            node.replace(newNode);
                        }
                        // 이미 커스텀 노드인 경우
                        else if (node instanceof CustomTextNode) {
                            node.setFontSize(size);
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
