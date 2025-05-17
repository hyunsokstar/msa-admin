// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\ImageUploadPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { uploadFileToS3 } from "./uploadHelpers";

export default function ImageUploadPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const root = editor.getRootElement();
        if (!root) return;

        const handlePaste = async (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of Array.from(items)) {
                if (item.type.startsWith("image/")) {
                    const file = item.getAsFile();
                    if (!file) return;
                    try {
                        const url = await uploadFileToS3(file);
                        editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
                    } catch (err) {
                        console.error("이미지 업로드 오류:", err);
                    }
                    e.preventDefault();
                    break;
                }
            }
        };

        const handleDrop = async (e: DragEvent) => {
            e.preventDefault();
            const file = e.dataTransfer?.files[0];
            if (file?.type.startsWith("image/")) {
                try {
                    const url = await uploadFileToS3(file);
                    editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
                } catch (err) {
                    console.error("이미지 업로드 오류:", err);
                }
            }
        };

        root.addEventListener("paste", handlePaste as any);
        root.addEventListener("drop", handleDrop as any);
        root.addEventListener("dragover", (e) => e.preventDefault());

        return () => {
            root.removeEventListener("paste", handlePaste as any);
            root.removeEventListener("drop", handleDrop as any);
            root.removeEventListener("dragover", (e) => e.preventDefault());
        };
    }, [editor]);

    return null;
}