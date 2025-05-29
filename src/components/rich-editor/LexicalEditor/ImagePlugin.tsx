// // C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\ImagePlugin.tsx
// "use client";

// import { useEffect } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { createCommand, COMMAND_PRIORITY_EDITOR, $insertNodes } from "lexical";
// import { ImageNode } from "./ImageNode";

// export const INSERT_IMAGE_COMMAND = createCommand<string>("INSERT_IMAGE_COMMAND");

// export function ImagePlugin() {
//     const [editor] = useLexicalComposerContext();

//     useEffect(() => {
//         return editor.registerCommand(
//             INSERT_IMAGE_COMMAND,
//             (src: string) => {
//                 editor.update(() => {
//                     $insertNodes([new ImageNode(src)]);
//                 });
//                 return true;
//             },
//             COMMAND_PRIORITY_EDITOR
//         );
//     }, [editor]);

//     return null;
// }

// ImagePlugin.tsx
"use client";

import { useEffect } from "react";
import {
    $createParagraphNode,
    $insertNodes,
    $isRootOrShadowRoot,
    COMMAND_PRIORITY_EDITOR,
    createCommand,
    LexicalCommand,
} from "lexical";
import { $wrapNodeInElement } from "@lexical/utils";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ImageUploadData } from "./ImageUploadPlugin";
import { ImageNode } from "./ImageNode";

// 두 가지 타입을 모두 지원하도록 수정
export const INSERT_IMAGE_COMMAND: LexicalCommand<string | ImageUploadData> = createCommand();

export default function ImagePlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNode(ImageNode)) {
            throw new Error("ImagePlugin: ImageNode가 등록되지 않았습니다.");
        }

        return editor.registerCommand<string | ImageUploadData>(
            INSERT_IMAGE_COMMAND,
            (payload) => {
                let src: string;
                let width: number = 600; // 기본 크기 증가
                let height: number = 400;

                // payload가 문자열(URL)인지 객체(ImageUploadData)인지 확인
                if (typeof payload === 'string') {
                    src = payload;
                    // 문자열인 경우 기본 크기 사용
                } else {
                    src = payload.src;
                    width = payload.width;
                    height = payload.height;
                }

                const imageNode = new ImageNode(src, undefined, width, height);

                $insertNodes([imageNode]);
                if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                    $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
                }

                return true;
            },
            COMMAND_PRIORITY_EDITOR
        );
    }, [editor]);

    return null;
}