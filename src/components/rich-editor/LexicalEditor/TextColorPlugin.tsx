// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\TextColorPlugin.tsx
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
    $getNodeByKey,
    $createRangeSelection,
    $setSelection,
} from "lexical";
import { CustomTextNode } from "./CustomTextNode";

export const TEXT_COLOR_COMMAND = createCommand<string>("TEXT_COLOR_COMMAND");

function applyStyleAndRestoreSelection(
    editor: LexicalEditor,
    color: string
) {
    editor.update(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) {
            return;
        }

        const anchorNodeKey = selection.anchor.key;
        const anchorOffset = selection.anchor.offset;
        const focusNodeKey = selection.focus.key;
        const focusOffset = selection.focus.offset;

        const selectedNodes = selection.getNodes();
        const newNodesMap = new Map<string, TextNode>(); // Map from original node key to the new/modified node

        for (const Snode of selectedNodes) {
            if ($isTextNode(Snode)) {
                const originalKey = Snode.getKey();
                let targetNode: CustomTextNode;

                if (Snode instanceof CustomTextNode) {
                    targetNode = Snode.getWritable() as CustomTextNode;
                } else {
                    const newCustomNode = new CustomTextNode(Snode.getTextContent(), undefined, Snode.getStyle().includes('font-size:') ? Snode.getStyle().split('font-size:')[1].split(';')[0].trim() : '16px'); // 기존 폰트 크기 유지 시도
                    newCustomNode.setFormat(Snode.getFormat());
                    newCustomNode.setStyle(Snode.getStyle());
                    Snode.replace(newCustomNode);
                    targetNode = newCustomNode;
                }
                targetNode.setColor(color);
                newNodesMap.set(originalKey, targetNode);
            }
        }

        let newAnchorNode = newNodesMap.get(anchorNodeKey) || $getNodeByKey<TextNode>(anchorNodeKey);
        let newFocusNode = newNodesMap.get(focusNodeKey) || $getNodeByKey<TextNode>(focusNodeKey);

        if (newAnchorNode && newFocusNode && $isTextNode(newAnchorNode) && $isTextNode(newFocusNode)) {
            const newSelection = $createRangeSelection();
            const safeAnchorOffset = Math.min(anchorOffset, newAnchorNode.getTextContentSize());
            const safeFocusOffset = Math.min(focusOffset, newFocusNode.getTextContentSize());

            newSelection.anchor.set(newAnchorNode.getKey(), safeAnchorOffset, 'text');
            newSelection.focus.set(newFocusNode.getKey(), safeFocusOffset, 'text');
            $setSelection(newSelection);
        } else if (newAnchorNode && $isTextNode(newAnchorNode)) {
            const newSelection = $createRangeSelection();
            const safeAnchorOffset = Math.min(anchorOffset, newAnchorNode.getTextContentSize());
            newSelection.anchor.set(newAnchorNode.getKey(), safeAnchorOffset, 'text');
            newSelection.focus.set(newAnchorNode.getKey(), safeAnchorOffset, 'text');
            $setSelection(newSelection);
        } else if (newFocusNode && $isTextNode(newFocusNode)) {
            const newSelection = $createRangeSelection();
            const safeFocusOffset = Math.min(focusOffset, newFocusNode.getTextContentSize());
            newSelection.anchor.set(newFocusNode.getKey(), safeFocusOffset, 'text');
            newSelection.focus.set(newFocusNode.getKey(), safeFocusOffset, 'text');
            $setSelection(newSelection);
        } else {
            console.warn("Lexical Editor: Failed to restore selection after text color change.");
        }
    });
}

export function TextColorPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([CustomTextNode])) {
            throw new Error('TextColorPlugin: CustomTextNode not registered on editor');
        }

        return editor.registerCommand(
            TEXT_COLOR_COMMAND,
            (payload: string) => {
                applyStyleAndRestoreSelection(editor, payload);
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}