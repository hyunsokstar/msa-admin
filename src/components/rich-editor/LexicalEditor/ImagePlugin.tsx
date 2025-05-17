// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\ImagePlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createCommand, COMMAND_PRIORITY_EDITOR, $insertNodes } from "lexical";
import { ImageNode } from "./ImageNode";

export const INSERT_IMAGE_COMMAND = createCommand<string>("INSERT_IMAGE_COMMAND");

export function ImagePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            INSERT_IMAGE_COMMAND,
            (src: string) => {
                editor.update(() => {
                    $insertNodes([new ImageNode(src)]);
                });
                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}