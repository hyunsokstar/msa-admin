// src/components/rich-editor/LexicalEditor/decorator/NodeKeyAttributesPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isElementNode, ElementNode } from "lexical";

/**
 * 이 플러그인은 모든 블록 레벨 노드들에 data-lexical-node-key 속성을 추가합니다.
 * 이를 통해 드래그 핸들에서 각 노드를 식별할 수 있습니다.
 */
export function NodeKeyAttributesPlugin(): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // 노드 트랜스폼 등록 - 노드가 생성될 때마다 data-lexical-node-key 속성 추가
        return editor.registerNodeTransform(ElementNode, (node) => {
            const nodeKey = node.getKey();
            const domElement = editor.getElementByKey(nodeKey);
            if (domElement) {
                domElement.setAttribute("data-lexical-node-key", nodeKey);
            }
        });
    }, [editor]);

    return null;
}

export default NodeKeyAttributesPlugin;