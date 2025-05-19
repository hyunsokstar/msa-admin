
// // src/components/rich-editor/LexicalEditor/plugin/SimpleDraggableBlockPlugin.tsx
// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//     $createParagraphNode,
//     $getNodeByKey,
//     COMMAND_PRIORITY_HIGH,
//     SELECTION_CHANGE_COMMAND,
// } from "lexical";

// export function SimpleDraggableBlockPlugin(): null {
//     const [editor] = useLexicalComposerContext();
//     const [blockElements, setBlockElements] = useState<Array<{ key: string, elem: HTMLElement, rect: DOMRect }>>([]);
//     const rootRef = useRef<HTMLElement | null>(null);
//     const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
//     const controlsContainerRef = useRef<HTMLDivElement | null>(null);

//     // 에디터 루트 요소 참조 저장
//     useEffect(() => {
//         editor.registerRootListener((rootElement, prevRootElement) => {
//             if (rootElement !== null) {
//                 rootRef.current = rootElement;
//                 console.log("Root element registered", rootElement);
//             }
//         });
//     }, [editor]);

//     // 블록 요소들 찾기
//     const updateBlockElements = useCallback(() => {
//         const rootElement = editor.getRootElement();
//         if (!rootElement) {
//             console.warn("Root element not found when updating block elements");
//             return;
//         }

//         const blocks: Array<{ key: string, elem: HTMLElement, rect: DOMRect }> = [];
//         const blockNodeElements = rootElement.querySelectorAll("[data-lexical-node-key]");

//         blockNodeElements.forEach((elem) => {
//             if (elem instanceof HTMLElement) {
//                 const key = elem.getAttribute("data-lexical-node-key");
//                 if (key) {
//                     const rect = elem.getBoundingClientRect();
//                     blocks.push({ key, elem, rect });
//                 }
//             }
//         });

//         setBlockElements(blocks);
//     }, [editor]);

//     // DOM 변경 감지 및 블록 요소 업데이트
//     useEffect(() => {
//         const rootElement = editor.getRootElement();
//         if (!rootElement) return;

//         // 초기 업데이트
//         setTimeout(updateBlockElements, 100);

//         // DOM 변경 감지
//         const observer = new MutationObserver(() => {
//             requestAnimationFrame(updateBlockElements);
//         });

//         observer.observe(rootElement, {
//             childList: true,
//             subtree: true,
//             attributes: true,
//             characterData: true,
//         });

//         // 스크롤 및 리사이즈 이벤트
//         rootElement.addEventListener("scroll", updateBlockElements);
//         window.addEventListener("resize", updateBlockElements);

//         // 에디터 컨테이너의 스크롤 이벤트 리스너 추가
//         const editorContainer = rootElement.closest('.editor-content-area');
//         if (editorContainer) {
//             editorContainer.addEventListener("scroll", updateBlockElements);
//         }

//         // 정기적 업데이트 (안전장치)
//         const intervalId = setInterval(updateBlockElements, 2000);

//         return () => {
//             observer.disconnect();
//             rootElement.removeEventListener("scroll", updateBlockElements);
//             if (editorContainer) {
//                 editorContainer.removeEventListener("scroll", updateBlockElements);
//             }
//             window.removeEventListener("resize", updateBlockElements);
//             clearInterval(intervalId);
//         };
//     }, [editor, updateBlockElements]);

//     // 새 단락 추가 함수
//     const insertNewParagraph = useCallback((nodeKey: string, e: MouseEvent) => {
//         // 이벤트 전파 중지
//         e.stopPropagation();
//         e.preventDefault();

//         editor.update(() => {
//             const node = $getNodeByKey(nodeKey);
//             if (!node) return;

//             const paragraph = $createParagraphNode();
//             node.insertAfter(paragraph);
//             paragraph.select();
//         });
//     }, [editor]);

//     // 노드 위로 이동
//     const moveNodeUp = useCallback((nodeKey: string, e: MouseEvent) => {
//         // 이벤트 전파 중지
//         e.stopPropagation();
//         e.preventDefault();

//         editor.update(() => {
//             const node = $getNodeByKey(nodeKey);
//             if (!node) return;

//             const prevSibling = node.getPreviousSibling();
//             if (prevSibling) {
//                 prevSibling.insertBefore(node);
//             }
//         });
//     }, [editor]);

//     // 노드 아래로 이동
//     const moveNodeDown = useCallback((nodeKey: string, e: MouseEvent) => {
//         // 이벤트 전파 중지
//         e.stopPropagation();
//         e.preventDefault();

//         editor.update(() => {
//             const node = $getNodeByKey(nodeKey);
//             if (!node) return;

//             const nextSibling = node.getNextSibling();
//             if (nextSibling) {
//                 nextSibling.insertAfter(node);
//             }
//         });
//     }, [editor]);

//     // 선택 변경 모니터링
//     useEffect(() => {
//         return editor.registerCommand(
//             SELECTION_CHANGE_COMMAND,
//             (selection) => {
//                 // Type guard: check if selection has getNodes method
//                 if (typeof (selection as any)?.getNodes === "function") {
//                     const nodes = (selection as any).getNodes();
//                     const selectedNode = nodes[0];
//                     if (selectedNode) {
//                         const nodeKey = selectedNode.getKey();
//                         setSelectedNodeKey(nodeKey);
//                     } else {
//                         setSelectedNodeKey(null);
//                     }
//                 } else {
//                     setSelectedNodeKey(null);
//                 }
//                 return false;
//             },
//             COMMAND_PRIORITY_HIGH
//         );
//     }, [editor]);

//     // 컨트롤 컨테이너 생성 및 관리
//     useEffect(() => {
//         if (!rootRef.current) return;

//         // 드래그 컨트롤을 담을 컨테이너 생성
//         const container = document.createElement('div');
//         container.className = 'lexical-drag-controls-container';
//         container.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: visible; pointer-events: none; z-index: 9;'; // Z-index 낮춤

//         // 에디터 컨테이너에 추가
//         const editorContainer = rootRef.current.closest('.editor-content-area') || rootRef.current.parentElement;
//         if (editorContainer) {
//             (editorContainer as HTMLElement).style.position = 'relative';
//             editorContainer.appendChild(container);
//             controlsContainerRef.current = container;
//         }

//         return () => {
//             // 안전하게 제거
//             if (container.parentNode) {
//                 try {
//                     container.parentNode.removeChild(container);
//                 } catch (e) {
//                     console.error("Error removing control container:", e);
//                 }
//             }
//         };
//     }, []);

//     // 드래그 컨트롤 렌더링 함수
//     const renderDragControls = useCallback(() => {
//         const container = controlsContainerRef.current;
//         if (!container || !rootRef.current) return;

//         // 기존 컨트롤 제거
//         while (container.firstChild) {
//             container.removeChild(container.firstChild);
//         }

//         // 새 컨트롤 추가
//         blockElements.forEach(({ key, rect, elem }) => {
//             const rootRect = rootRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
//             const editorContainer = rootRef.current?.closest('.editor-content-area');

//             // 스크롤 위치 고려
//             const scrollTop = editorContainer ? (editorContainer as HTMLElement).scrollTop : 0;

//             // 위치 계산
//             let offsetTop = rect.top - rootRect.top + scrollTop;

//             const controlElement = document.createElement('div');
//             controlElement.className = 'draggable-block-menu';
//             controlElement.dataset.nodeKey = key;
//             controlElement.style.cssText = `
//                 position: absolute;
//                 top: ${offsetTop}px;
//                 left: 8px; /* 왼쪽 위치 변경: 0 → 8px */
//                 display: flex;
//                 align-items: center;
//                 gap: 2px;
//                 pointer-events: auto;
//                 z-index: 5;
//                 opacity: ${selectedNodeKey === key ? 0.85 : 0.5};
//                 background: rgba(255,255,255,0.85);
//                 padding: 2px;
//                 border-radius: 3px;
//             `;

//             // 추가 버튼 생성
//             const addButton = document.createElement('button');
//             addButton.type = 'button';
//             addButton.className = 'add-block-button';
//             addButton.title = '새 단락 추가';
//             addButton.style.cssText = `
//                 width: 18px;
//                 height: 18px;
//                 background: #f0f0f0;
//                 border: 1px solid #ccc;
//                 border-radius: 3px;
//                 padding: 0;
//                 cursor: pointer;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 color: #333;
//                 font-size: 10px;
//             `;
//             addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

//             // stopPropagation 및 preventDefault 추가
//             addButton.onclick = (e) => {
//                 insertNewParagraph(key, e as unknown as MouseEvent);
//             };

//             // 위로 이동 버튼
//             const upButton = document.createElement('button');
//             upButton.className = 'move-up-button';
//             upButton.title = '위로 이동';
//             upButton.style.cssText = `
//                 width: 18px;
//                 height: 18px;
//                 background: #f0f0f0;
//                 border: 1px solid #ccc;
//                 border-radius: 3px;
//                 padding: 0;
//                 cursor: pointer;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 color: #333;
//                 font-size: 10px;
//             `;
//             upButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;

//             // stopPropagation 및 preventDefault 추가
//             upButton.onclick = (e) => {
//                 moveNodeUp(key, e as unknown as MouseEvent);
//             };

//             // 아래로 이동 버튼
//             const downButton = document.createElement('button');
//             downButton.className = 'move-down-button';
//             downButton.title = '아래로 이동';
//             downButton.style.cssText = `
//                 width: 18px;
//                 height: 18px;
//                 background: #f0f0f0;
//                 border: 1px solid #ccc;
//                 border-radius: 3px;
//                 padding: 0;
//                 cursor: pointer;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 color: #333;
//                 font-size: 10px;
//             `;
//             downButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

//             // stopPropagation 및 preventDefault 추가
//             downButton.onclick = (e) => {
//                 moveNodeDown(key, e as unknown as MouseEvent);
//             };

//             // 이벤트 버블링 방지를 위한 컨테이너 이벤트 핸들러
//             controlElement.onclick = (e) => {
//                 e.stopPropagation();
//             };

//             // 마우스 오버 이벤트 처리
//             controlElement.onmouseenter = () => {
//                 controlElement.style.opacity = '1';
//             };
//             controlElement.onmouseleave = () => {
//                 if (selectedNodeKey !== key) {
//                     controlElement.style.opacity = '0.5';
//                 }
//             };

//             // 요소들 추가
//             controlElement.appendChild(addButton);
//             controlElement.appendChild(upButton);
//             controlElement.appendChild(downButton);
//             container.appendChild(controlElement);
//         });
//     }, [blockElements, rootRef.current, selectedNodeKey, insertNewParagraph, moveNodeUp, moveNodeDown]);

//     // 블록 요소가 변경될 때마다 컨트롤 다시 렌더링
//     useEffect(() => {
//         renderDragControls();
//     }, [blockElements, renderDragControls, selectedNodeKey]);

//     // null 반환
//     return null;
// }

// export default SimpleDraggableBlockPlugin;

// src/components/rich-editor/LexicalEditor/plugin/SimpleDraggableBlockPlugin.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $createParagraphNode,
    $getNodeByKey,
    COMMAND_PRIORITY_HIGH,
    SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export function SimpleDraggableBlockPlugin(): null {
    const [editor] = useLexicalComposerContext();
    const [blockElements, setBlockElements] = useState<Array<{ key: string, elem: HTMLElement, rect: DOMRect }>>([]);
    const rootRef = useRef<HTMLElement | null>(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState<string | null>(null);
    const controlsContainerRef = useRef<HTMLDivElement | null>(null);
    const dragLineRef = useRef<HTMLDivElement | null>(null);

    // DND 상태
    const [activeId, setActiveId] = useState<string | null>(null);

    // 센서 설정
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px 이상 드래그해야 활성화
            },
        }),
        useSensor(KeyboardSensor)
    );

    // 에디터 루트 요소 참조 저장
    useEffect(() => {
        editor.registerRootListener((rootElement, prevRootElement) => {
            if (rootElement !== null) {
                rootRef.current = rootElement;
            }
        });
    }, [editor]);

    // 블록 요소들 찾기
    const updateBlockElements = useCallback(() => {
        const rootElement = editor.getRootElement();
        if (!rootElement) return;

        const blocks: Array<{ key: string, elem: HTMLElement, rect: DOMRect }> = [];
        const blockNodeElements = rootElement.querySelectorAll("[data-lexical-node-key]");

        blockNodeElements.forEach((elem) => {
            if (elem instanceof HTMLElement) {
                const key = elem.getAttribute("data-lexical-node-key");
                if (key) {
                    const rect = elem.getBoundingClientRect();
                    blocks.push({ key, elem, rect });
                }
            }
        });

        setBlockElements(blocks);
    }, [editor]);

    // DOM 변경 감지 및 블록 요소 업데이트
    useEffect(() => {
        const rootElement = editor.getRootElement();
        if (!rootElement) return;

        // 초기 업데이트
        setTimeout(updateBlockElements, 100);

        // DOM 변경 감지
        const observer = new MutationObserver(() => {
            requestAnimationFrame(updateBlockElements);
        });

        observer.observe(rootElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true,
        });

        // 스크롤 및 리사이즈 이벤트
        rootElement.addEventListener("scroll", updateBlockElements);
        window.addEventListener("resize", updateBlockElements);

        // 에디터 컨테이너의 스크롤 이벤트 리스너 추가
        const editorContainer = rootElement.closest('.editor-content-area');
        if (editorContainer) {
            editorContainer.addEventListener("scroll", updateBlockElements);
        }

        return () => {
            observer.disconnect();
            rootElement.removeEventListener("scroll", updateBlockElements);
            if (editorContainer) {
                editorContainer.removeEventListener("scroll", updateBlockElements);
            }
            window.removeEventListener("resize", updateBlockElements);
        };
    }, [editor, updateBlockElements]);

    // 새 단락 추가 함수
    const insertNewParagraph = useCallback((nodeKey: string, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (!node) return;

            const paragraph = $createParagraphNode();
            node.insertAfter(paragraph);
            paragraph.select();
        });
    }, [editor]);

    // 드래그 시작 핸들러
    const handleDragStart = useCallback((event: any) => {
        const { active } = event;
        setActiveId(active.id);

        // 드래그 중인 노드에 스타일 추가
        const nodeElem = blockElements.find(item => item.key === active.id)?.elem;
        if (nodeElem) {
            nodeElem.classList.add('dragging');
        }
    }, [blockElements]);

    // 드래그 중 핸들러
    const handleDragOver = useCallback((event: any) => {
        const { active, over } = event;

        if (!active || !over || active.id === over.id) return;

        // 드롭 위치 계산 (상단/하단)
        const overElement = blockElements.find(item => item.key === over.id)?.elem;
        if (!overElement) return;

        const overRect = overElement.getBoundingClientRect();
        const overCenter = overRect.top + overRect.height / 2;
        const position = event.y < overCenter ? 'top' : 'bottom';

        // 드롭 라인 표시
        const line = dragLineRef.current;
        if (line) {
            const editorContainer = rootRef.current?.closest('.editor-content-area');
            if (editorContainer) {
                const containerRect = editorContainer.getBoundingClientRect();
                const scrollTop = editorContainer.scrollTop;

                const lineTop = position === 'top'
                    ? overRect.top - containerRect.top + scrollTop
                    : overRect.bottom - containerRect.top + scrollTop;

                line.style.top = `${lineTop}px`;
                line.style.display = 'block';
            }
        }
    }, [blockElements]);

    // 드래그 종료 핸들러
    const handleDragEnd = useCallback((event: any) => {
        const { active, over } = event;

        // 드래그 스타일 제거
        const nodeElem = blockElements.find(item => item.key === active.id)?.elem;
        if (nodeElem) {
            nodeElem.classList.remove('dragging');
        }

        // 드롭 라인 숨기기
        if (dragLineRef.current) {
            dragLineRef.current.style.display = 'none';
        }

        // 드롭 위치가 없으면 종료
        if (!over) {
            setActiveId(null);
            return;
        }

        // 같은 위치면 종료
        if (active.id === over.id) {
            setActiveId(null);
            return;
        }

        // 드롭 위치 계산 (상단/하단)
        const overElement = blockElements.find(item => item.key === over.id)?.elem;
        if (!overElement) {
            setActiveId(null);
            return;
        }

        const overRect = overElement.getBoundingClientRect();
        const overCenter = overRect.top + overRect.height / 2;
        const position = event.y < overCenter ? 'top' : 'bottom';

        // 실제 노드 이동 처리
        editor.update(() => {
            const sourceNode = $getNodeByKey(active.id);
            const targetNode = $getNodeByKey(over.id);

            if (sourceNode && targetNode) {
                if (position === 'top') {
                    targetNode.insertBefore(sourceNode);
                } else {
                    targetNode.insertAfter(sourceNode);
                }
            }
        });

        setActiveId(null);
        // 업데이트 후 블록 요소 다시 가져오기
        setTimeout(updateBlockElements, 0);
    }, [blockElements, editor, updateBlockElements]);

    // 드래그 취소 핸들러
    const handleDragCancel = useCallback(() => {
        // 드래그 스타일 제거
        const nodeElem = blockElements.find(item => item.key === activeId)?.elem;
        if (nodeElem) {
            nodeElem.classList.remove('dragging');
        }

        // 드롭 라인 숨기기
        if (dragLineRef.current) {
            dragLineRef.current.style.display = 'none';
        }

        setActiveId(null);
    }, [activeId, blockElements]);

    // 선택 변경 모니터링
    useEffect(() => {
        return editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            (selection) => {
                // Type guard: check if selection has getNodes method
                if (typeof (selection as any)?.getNodes === "function") {
                    const nodes = (selection as any).getNodes();
                    const selectedNode = nodes[0];
                    if (selectedNode) {
                        const nodeKey = selectedNode.getKey();
                        setSelectedNodeKey(nodeKey);
                    } else {
                        setSelectedNodeKey(null);
                    }
                } else {
                    setSelectedNodeKey(null);
                }
                return false;
            },
            COMMAND_PRIORITY_HIGH
        );
    }, [editor]);

    // 컨트롤 컨테이너 생성 및 관리
    useEffect(() => {
        if (!rootRef.current) return;

        // 드래그 컨트롤을 담을 컨테이너 생성
        const container = document.createElement('div');
        container.className = 'lexical-drag-controls-container';
        container.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; overflow: visible; pointer-events: none; z-index: 9;';

        // 드롭 라인 생성
        const line = document.createElement('div');
        line.className = 'editor-drop-line';
        line.style.cssText = 'display: none;';

        // 에디터 컨테이너에 추가
        const editorContainer = rootRef.current.closest('.editor-content-area') || rootRef.current.parentElement;
        if (editorContainer) {
            (editorContainer as HTMLElement).style.position = 'relative';
            editorContainer.appendChild(container);
            editorContainer.appendChild(line);
            controlsContainerRef.current = container;
            dragLineRef.current = line;
        }

        return () => {
            // 안전하게 제거
            if (container.parentNode) {
                try {
                    container.parentNode.removeChild(container);
                } catch (e) {
                    console.error("Error removing control container:", e);
                }
            }

            if (line.parentNode) {
                try {
                    line.parentNode.removeChild(line);
                } catch (e) {
                    console.error("Error removing drag line:", e);
                }
            }
        };
    }, []);

    // 드래그 컨트롤 렌더링 함수
    const renderDragControls = useCallback(() => {
        const container = controlsContainerRef.current;
        if (!container || !rootRef.current) return;

        // 기존 컨트롤 제거
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // 새 컨트롤 추가
        blockElements.forEach(({ key, rect, elem }) => {
            const rootRect = rootRef.current?.getBoundingClientRect() || { top: 0, left: 0 };
            const editorContainer = rootRef.current?.closest('.editor-content-area');

            // 스크롤 위치 고려
            const scrollTop = editorContainer ? (editorContainer as HTMLElement).scrollTop : 0;

            // 위치 계산
            let offsetTop = rect.top - rootRect.top + scrollTop;

            const controlElement = document.createElement('div');
            controlElement.className = 'draggable-block-menu';
            controlElement.dataset.nodeKey = key;
            controlElement.style.cssText = `
                position: absolute;
                top: ${offsetTop}px;
                left: 8px;
                display: flex;
                align-items: center;
                gap: 2px;
                pointer-events: auto;
                z-index: 5;
                opacity: ${selectedNodeKey === key ? 0.85 : 0.5};
                background: rgba(255,255,255,0.85);
                padding: 2px;
                border-radius: 3px;
            `;

            // 추가 버튼 생성
            const addButton = document.createElement('button');
            addButton.type = 'button';
            addButton.className = 'add-block-button';
            addButton.title = '새 단락 추가';
            addButton.style.cssText = `
                width: 18px;
                height: 18px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 0;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
                font-size: 10px;
            `;
            addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

            // 드래그 핸들 버튼 생성
            const dragHandleButton = document.createElement('button');
            dragHandleButton.className = 'drag-handle-button';
            dragHandleButton.title = '드래그하여 이동';
            dragHandleButton.style.cssText = `
                width: 18px;
                height: 18px;
                background: #f0f0f0;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 0;
                cursor: grab;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #333;
                font-size: 10px;
            `;

            // 6점 그리드 아이콘
            dragHandleButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="9" cy="6" r="2" />
                    <circle cx="9" cy="12" r="2" />
                    <circle cx="9" cy="18" r="2" />
                    <circle cx="15" cy="6" r="2" />
                    <circle cx="15" cy="12" r="2" />
                    <circle cx="15" cy="18" r="2" />
                </svg>
            `;

            // 이벤트 핸들러 추가
            addButton.onclick = (e) => {
                insertNewParagraph(key, e as unknown as React.MouseEvent);
            };

            // dnd-kit과 통합할 데이터 속성 추가
            dragHandleButton.setAttribute('data-dnd-handle', 'true');
            dragHandleButton.setAttribute('data-node-key', key);

            // 마우스 이벤트 처리
            controlElement.onmouseenter = () => {
                controlElement.style.opacity = '1';
            };

            controlElement.onmouseleave = () => {
                if (selectedNodeKey !== key && key !== activeId) {
                    controlElement.style.opacity = '0.5';
                }
            };

            // 요소들 추가
            controlElement.appendChild(addButton);
            controlElement.appendChild(dragHandleButton);
            container.appendChild(controlElement);

            // dnd-kit 통합을 위한 이벤트 위임
            dragHandleButton.addEventListener('mousedown', (e) => {
                // 다른 이벤트 중지
                e.stopPropagation();

                // DND Context에 드래그 시작 알림
                const dragStartEvent = new CustomEvent('lexicalDragStart', {
                    detail: { nodeKey: key, originalEvent: e }
                });
                document.dispatchEvent(dragStartEvent);
            });
        });

    }, [blockElements, insertNewParagraph, rootRef, selectedNodeKey, activeId]);

    // DND 이벤트 핸들러 등록
    useEffect(() => {
        const handleLexicalDragStart = (e: any) => {
            const { nodeKey, originalEvent } = e.detail;

            // dnd-kit에 드래그 시작 알림
            const dragStartEvent = {
                active: { id: nodeKey },
                x: originalEvent.clientX,
                y: originalEvent.clientY
            };

            handleDragStart(dragStartEvent);

            // 드래그 이동 이벤트 리스너 추가
            const mouseMoveHandler = (moveEvent: MouseEvent) => {
                const dragOverEvent: {
                    active: { id: string },
                    over: { id: string } | null,
                    x: number,
                    y: number
                } = {
                    active: { id: nodeKey },
                    over: null,
                    x: moveEvent.clientX,
                    y: moveEvent.clientY
                };

                // 마우스 위치에 있는 블록 찾기
                for (const { key, elem, rect } of blockElements) {
                    if (key === nodeKey) continue;

                    if (
                        moveEvent.clientY >= rect.top &&
                        moveEvent.clientY <= rect.bottom
                    ) {
                        dragOverEvent.over = { id: key };
                        break;
                    }
                }

                handleDragOver(dragOverEvent);
            };

            // 드래그 종료 이벤트 리스너 추가
            const mouseUpHandler = (upEvent: MouseEvent) => {
                const dragEndEvent: {
                    active: { id: string },
                    over: { id: string } | null,
                    x: number,
                    y: number
                } = {
                    active: { id: nodeKey },
                    over: null,
                    x: upEvent.clientX,
                    y: upEvent.clientY
                };

                // 마우스 위치에 있는 블록 찾기
                for (const { key, elem, rect } of blockElements) {
                    if (key === nodeKey) continue;

                    if (
                        upEvent.clientY >= rect.top &&
                        upEvent.clientY <= rect.bottom
                    ) {
                        dragEndEvent.over = { id: key };
                        break;
                    }
                }

                handleDragEnd(dragEndEvent);

                // 이벤트 리스너 제거
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
            };

            // 취소 이벤트 리스너 추가
            const keyDownHandler = (keyEvent: KeyboardEvent) => {
                if (keyEvent.key === 'Escape') {
                    handleDragCancel();
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                    document.removeEventListener('keydown', keyDownHandler);
                }
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
            document.addEventListener('keydown', keyDownHandler);
        };

        document.addEventListener('lexicalDragStart', handleLexicalDragStart);

        return () => {
            document.removeEventListener('lexicalDragStart', handleLexicalDragStart);
        };
    }, [blockElements, handleDragStart, handleDragOver, handleDragEnd, handleDragCancel]);

    // 블록 요소가 변경될 때마다 컨트롤 다시 렌더링
    useEffect(() => {
        renderDragControls();
    }, [blockElements, renderDragControls, selectedNodeKey, activeId]);

    // null 반환
    return null;
}

export default SimpleDraggableBlockPlugin;