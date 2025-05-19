// src/components/rich-editor/LexicalEditor/decorator/NodeKeyDecorator.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

/**
 * 이 플러그인은 모든 블록 레벨 노드들에 data-lexical-node-key 속성을 추가합니다.
 * 이를 통해 드래그 핸들에서 각 노드를 식별할 수 있습니다.
 */
export function NodeKeyDecorator(): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // DOM 변경을 감지하여 NodeKey 속성을 추가하는 함수
        const addNodeKeyAttributes = () => {
            const rootElement = editor.getRootElement();
            if (!rootElement) return;

            // 모든 블록 요소 선택
            const blockElements = rootElement.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, li, pre");

            // 디버깅: 찾은 요소 수 로깅
            console.log(`NodeKeyDecorator: Found ${blockElements.length} block elements`);

            // 각 요소에 data-lexical-node-key 속성 추가
            blockElements.forEach((element, index) => {
                // Lexical이 사용하는 여러 속성 이름 확인
                const nodeKey =
                    element.getAttribute("data-lexical-node-key") ||
                    element.getAttribute("data-lexical-key") ||
                    element.getAttribute("data-lexical-editor-key") ||
                    element.getAttribute("data-lexical-node");

                if (nodeKey) {
                    element.setAttribute("data-lexical-node-key", nodeKey);
                    console.log(`NodeKeyDecorator: Element ${index}, tag: ${element.tagName}, key: ${nodeKey}`);
                } else {
                    console.log(`NodeKeyDecorator: Element ${index}, tag: ${element.tagName}, NO KEY FOUND`);

                    // 디버깅: 요소의 모든 속성 출력
                    const attributes = Array.from(element.attributes)
                        .map(attr => `${attr.name}="${attr.value}"`)
                        .join(", ");
                    console.log(`  Attributes: ${attributes || "none"}`);
                }
            });

            // 디버깅: 루트 요소의 모든 자식 요소 출력
            console.log("All children elements of root:");
            Array.from(rootElement.children).forEach((child, i) => {
                console.log(`Child ${i}: ${child.tagName}, class: ${child.className}, id: ${child.id}`);
            });
        };

        // 초기 설정 - 약간 지연시켜 Lexical이 DOM을 구성할 시간을 줌
        setTimeout(addNodeKeyAttributes, 500);

        // DOM 변경을 감지하여 속성 추가 (MutationObserver 사용)
        const rootElement = editor.getRootElement();
        if (rootElement) {
            const observer = new MutationObserver(() => {
                requestAnimationFrame(addNodeKeyAttributes);
            });

            observer.observe(rootElement, {
                childList: true,
                subtree: true,
                attributes: true
            });

            // 정기적으로 속성 업데이트 (추가 안전장치)
            const intervalId = setInterval(addNodeKeyAttributes, 2000);

            return () => {
                observer.disconnect();
                clearInterval(intervalId);
            };
        }
    }, [editor]);

    return null;
}

export default NodeKeyDecorator;