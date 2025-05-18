// ✅ plugins/ToggleCodeBlockPlugin.tsx
"use client";

import { useEffect } from "react";
import {
    $getSelection,
    $isRangeSelection,
    ElementNode,
    createCommand,
    COMMAND_PRIORITY_EDITOR,
    $createParagraphNode,
} from "lexical";
import { $createCodeNode } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const TOGGLE_CODE_BLOCK_COMMAND = createCommand("TOGGLE_CODE_BLOCK_COMMAND");

export function ToggleCodeBlockPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            TOGGLE_CODE_BLOCK_COMMAND,
            () => {
                editor.update(() => {
                    const selection = $getSelection();
                    if (!$isRangeSelection(selection)) return false;

                    const nodes = selection.getNodes();
                    const parentBlocks = new Set<ElementNode>();

                    for (const node of nodes) {
                        const parent = node.getTopLevelElementOrThrow();
                        if (parent instanceof ElementNode) {
                            parentBlocks.add(parent);
                        }
                    }

                    parentBlocks.forEach((block) => {
                        if (block.getType() === "code") {
                            const paragraph = $createParagraphNode();
                            paragraph.append(...block.getChildren());
                            block.replace(paragraph);
                        } else {
                            const codeBlock = $createCodeNode("javascript");
                            codeBlock.append(...block.getChildren());
                            block.replace(codeBlock);
                        }
                    });
                });
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}
