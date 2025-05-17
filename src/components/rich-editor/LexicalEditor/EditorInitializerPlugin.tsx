"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getRoot, $createParagraphNode } from "lexical";

export default function EditorInitializerPlugin({ content }: { content: string }) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        try {
            const parsedState = editor.parseEditorState(content);

            // ✅ 두 번째 인자에는 옵션 객체만 전달
            editor.setEditorState(parsedState, { tag: "init" });

            // ✅ 상태 적용 후 업데이트 (콜백 아님!)
            editor.update(() => {
                const root = $getRoot();
                if (root.getChildrenSize() === 0) {
                    root.append($createParagraphNode());
                }
            });
        } catch (err) {
            console.error("EditorInitializerPlugin parse error:", err);
        }
    }, [editor, content]);

    return null;
}
