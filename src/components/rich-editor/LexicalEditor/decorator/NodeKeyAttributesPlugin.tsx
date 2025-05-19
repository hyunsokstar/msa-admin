// src/components/rich-editor/LexicalEditor/decorator/NodeKeyAttributesPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ParagraphNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";

/**
 * 이 플러그인은 모든 블록 레벨 노드들에 data-lexical-node-key 속성을 추가합니다.
 * 이를 통해 드래그 핸들에서 각 노드를 식별할 수 있습니다.
 */
export function NodeKeyAttributesPlugin(): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // DOM 변경을 감지하여 NodeKey 속성을 추가하는 함수
        const addNodeKeyAttributes = () => {
            const rootElement = editor.getRootElement();
            if (!rootElement) return;

            // 모든 블록 요소 선택
            const blockElements = rootElement.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, li, pre");

            // 각 요소에 data-lexical-node-key 속성 추가
            blockElements.forEach((element) => {
                // 요소에 이미 data-lexical-node-key가 있는지 확인
                if (!element.hasAttribute("data-lexical-node-key")) {
                    // Lexical이 사용하는 다양한 속성 이름을 확인
                    const nodeKey =
                        element.getAttribute("data-lexical-key") ||
                        element.getAttribute("data-lexical-editor-key") ||
                        element.getAttribute("data-lexical-node");

                    if (nodeKey) {
                        element.setAttribute("data-lexical-node-key", nodeKey);
                    }
                }
            });
        };

        // 각 구체적인 노드 타입에 대한 변환 등록
        const transforms = [
            editor.registerNodeTransform(ParagraphNode, (node) => {
                const nodeKey = node.getKey();
                const domElement = editor.getElementByKey(nodeKey);
                if (domElement) {
                    domElement.setAttribute("data-lexical-node-key", nodeKey);
                }
            }),
            editor.registerNodeTransform(HeadingNode, (node) => {
                const nodeKey = node.getKey();
                const domElement = editor.getElementByKey(nodeKey);
                if (domElement) {
                    domElement.setAttribute("data-lexical-node-key", nodeKey);
                }
            }),
            editor.registerNodeTransform(ListNode, (node) => {
                const nodeKey = node.getKey();
                const domElement = editor.getElementByKey(nodeKey);
                if (domElement) {
                    domElement.setAttribute("data-lexical-node-key", nodeKey);
                }
            }),
            editor.registerNodeTransform(ListItemNode, (node) => {
                const nodeKey = node.getKey();
                const domElement = editor.getElementByKey(nodeKey);
                if (domElement) {
                    domElement.setAttribute("data-lexical-node-key", nodeKey);
                }
            }),
            editor.registerNodeTransform(CodeNode, (node) => {
                const nodeKey = node.getKey();
                const domElement = editor.getElementByKey(nodeKey);
                if (domElement) {
                    domElement.setAttribute("data-lexical-node-key", nodeKey);
                }
            })
        ];

        // 초기 설정
        addNodeKeyAttributes();

        // DOM 변경을 감지하여 속성 추가 (MutationObserver 사용)
        const rootElement = editor.getRootElement();
        if (rootElement) {
            const observer = new MutationObserver(() => {
                requestAnimationFrame(addNodeKeyAttributes);
            });

            observer.observe(rootElement, {
                childList: true,
                subtree: true,
                attributes: false,
                characterData: false
            });

            // 정기적으로 속성 업데이트 (추가 안전장치)
            const intervalId = setInterval(addNodeKeyAttributes, 1000);

            return () => {
                // 안전하게 정리
                try {
                    transforms.forEach(removeTransform => removeTransform());
                    observer.disconnect();
                    clearInterval(intervalId);
                } catch (error) {
                    console.error("Error cleaning up NodeKeyAttributesPlugin:", error);
                }
            };
        }

        return () => {
            try {
                transforms.forEach(removeTransform => removeTransform());
            } catch (error) {
                console.error("Error removing transforms:", error);
            }
        };
    }, [editor]);

    return null;
}

export default NodeKeyAttributesPlugin;