// src/components/rich-editor/LexicalEditor/plugin/LineControlsPlugin.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getRoot,
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    COMMAND_PRIORITY_LOW,
    DRAGOVER_COMMAND,
    DROP_COMMAND,
    LexicalEditor,
    $getNodeByKey,
    NodeKey,
    COMMAND_PRIORITY_HIGH,
    DRAGSTART_COMMAND,  // DRAG_START_COMMAND가 아닌 DRAGSTART_COMMAND 사용
    SELECTION_CHANGE_COMMAND,
    NodeSelection,
    RangeSelection,
} from "lexical";
import { Plus, GripVertical } from "lucide-react";
import { createPortal } from "react-dom";

// 드래그 데이터 타입 정의
interface DragData {
    sourceNodeKey: string;
    sourceEditor: LexicalEditor;
}

export function LineControlsPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();
    const blockControlsRef = useRef<Record<string, HTMLElement>>({});
    const controlsContainerRef = useRef<HTMLDivElement | null>(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState<NodeKey | null>(null);
    const [controlsState, setControlsState] = useState<{ [key: string]: { top: string, nodeKey: string } }>({});

    // 선택된 노드 추적
    useEffect(() => {
        return editor.registerCommand<
            RangeSelection | NodeSelection | null
        >(
            SELECTION_CHANGE_COMMAND,
            (selection) => {
                if ($isRangeSelection(selection)) {
                    const node = selection.anchor.getNode();
                    const parentBlock = node.getParent();

                    if (parentBlock) {
                        const parentKey = parentBlock.getKey();
                        setSelectedNodeKey(parentKey);
                    } else {
                        setSelectedNodeKey(null);
                    }
                }
                return false;
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    // DOM 업데이트 감지하여 핸들 위치 업데이트
    useEffect(() => {
        function updateBlockControls() {
            editor.getEditorState().read(() => {
                const rootElement = editor.getRootElement();
                if (!rootElement) return;

                const containerDiv = controlsContainerRef.current;
                if (!containerDiv) return;

                // 에디터 내의 모든 블록 엘리먼트 찾기
                const childNodes = rootElement.querySelectorAll("p, h1, h2, h3, h4, h5, h6, ul, ol, pre");
                const controls: Record<string, HTMLElement> = {};
                const newControlsState: { [key: string]: { top: string, nodeKey: string } } = {};

                // 디버깅 - 찾은 노드 수 로깅
                console.log(`Found ${childNodes.length} block elements`);

                // 각 블록 엘리먼트에 대해 컨트롤 생성
                childNodes.forEach((blockElement, index) => {
                    // 노드 키 찾기 (data-lexical-node-key 또는 다른 속성)
                    const nodeKey = blockElement.getAttribute("data-lexical-node-key") ||
                        blockElement.getAttribute("data-lexical-key") ||
                        blockElement.getAttribute("data-lexical-node");

                    // 디버깅 - 키 로깅
                    if (nodeKey) {
                        console.log(`Element ${index}, tag: ${blockElement.tagName}, key: ${nodeKey}`);
                    } else {
                        console.log(`Element ${index}, tag: ${blockElement.tagName}, NO KEY FOUND`);
                    }

                    if (!nodeKey) return; // 노드 키가 없으면 건너뜀

                    const key = `block-${index}`;

                    if (!blockControlsRef.current[key]) {
                        const controlDiv = document.createElement("div");
                        controlDiv.className = "lexical-line-control";
                        controlDiv.style.position = "absolute";
                        controlDiv.style.left = "-40px"; // 왼쪽에 배치
                        controlDiv.dataset.key = key;

                        controls[key] = controlDiv;
                        containerDiv.appendChild(controlDiv);
                    } else {
                        controls[key] = blockControlsRef.current[key];
                    }

                    // 위치 업데이트
                    const rect = blockElement.getBoundingClientRect();
                    const editorRect = rootElement.getBoundingClientRect();

                    const controlElement = controls[key];
                    const topPosition = `${rect.top - editorRect.top + rootElement.scrollTop}px`;
                    controlElement.style.top = topPosition;
                    controlElement.style.zIndex = "10"; // z-index 추가

                    controlElement.dataset.nodeKey = nodeKey;

                    newControlsState[key] = {
                        top: topPosition,
                        nodeKey: nodeKey
                    };
                });

                // 기존에 있지만 더 이상 필요없는 컨트롤 제거
                Object.keys(blockControlsRef.current).forEach(key => {
                    if (!controls[key] && blockControlsRef.current[key]) {
                        containerDiv.removeChild(blockControlsRef.current[key]);
                    }
                });

                blockControlsRef.current = controls;

                // 컨트롤 상태 업데이트 및 로깅
                setControlsState(newControlsState);
                console.log(`Updated ${Object.keys(newControlsState).length} control states`);
            });
        }

        // 초기 업데이트 및 스크롤/리사이즈 이벤트에 대한 리스너 추가
        updateBlockControls();
        const rootElement = editor.getRootElement();
        if (rootElement) {
            rootElement.addEventListener("scroll", updateBlockControls);
            window.addEventListener("resize", updateBlockControls);

            // MutationObserver를 사용하여 DOM 변경 감지
            const observer = new MutationObserver(() => {
                requestAnimationFrame(updateBlockControls);
            });

            observer.observe(rootElement, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });

            return () => {
                rootElement.removeEventListener("scroll", updateBlockControls);
                window.removeEventListener("resize", updateBlockControls);
                observer.disconnect();
            };
        }
    }, [editor]); // blockControls 의존성 제거

    // 드래그 시작 명령 처리
    useEffect(() => {
        return editor.registerCommand(
            DRAGSTART_COMMAND,  // DRAGSTART_COMMAND 사용 (올바른 API)
            (event) => {
                const dataTransfer = event.dataTransfer;
                if (!dataTransfer || !event.target) return false;

                // 드래그 대상이 핸들인지 확인
                const target = event.target as HTMLElement;
                if (!target.closest(".lexical-drag-handle")) return false;

                const control = target.closest(".lexical-line-control-wrapper");
                if (!control) {
                    console.log("No control wrapper found");
                    return false;
                }

                // 데이터셋에서 노드 키 가져오기 시도
                const nodeKey = control.getAttribute("data-node-key");
                if (!nodeKey) {
                    console.log("No node key in control");
                    return false;
                }

                console.log(`Drag started for node: ${nodeKey}`);

                // 드래그 데이터 설정
                const dragData: DragData = {
                    sourceNodeKey: nodeKey,
                    sourceEditor: editor,
                };

                dataTransfer.setData("application/x-lexical-drag", JSON.stringify(dragData));
                dataTransfer.effectAllowed = "move";
                return true; // 이벤트 처리됨을 나타냄
            },
            COMMAND_PRIORITY_HIGH
        );
    }, [editor]);

    // 드래그 오버 명령 처리
    useEffect(() => {
        return editor.registerCommand(
            DRAGOVER_COMMAND,
            (event) => {
                // 드래그 데이터 확인
                const dataTransfer = event.dataTransfer;
                if (!dataTransfer) return false;

                try {
                    // 브라우저에 따라 이 시점에서 getData가 불가능할 수 있음
                    const dragData = dataTransfer.getData("application/x-lexical-drag");
                    if (!dragData) return false;

                    event.preventDefault();
                    return true;
                } catch (e) {
                    // Firefox 등 일부 브라우저에서는 dragover 이벤트에서 getData를 호출하면 오류 발생
                    // 그냥 true를 반환하여 드롭을 허용
                    event.preventDefault();
                    return true;
                }
            },
            COMMAND_PRIORITY_LOW
        );
    }, [editor]);

    // 드롭 명령 처리
    useEffect(() => {
        return editor.registerCommand(
            DROP_COMMAND,
            (event) => {
                const dataTransfer = event.dataTransfer;
                if (!dataTransfer) return false;

                try {
                    const dragData = dataTransfer.getData("application/x-lexical-drag");
                    if (!dragData) return false;

                    event.preventDefault();

                    const { sourceNodeKey, sourceEditor } = JSON.parse(dragData) as DragData;
                    if (sourceEditor !== editor) return false;

                    console.log(`Drop event for source node: ${sourceNodeKey}`);

                    // 드롭 대상 위치 파악
                    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
                    if (!targetElement) {
                        console.log("No target element at drop point");
                        return false;
                    }

                    const targetNodeKey = targetElement.closest("[data-lexical-node-key]")?.getAttribute("data-lexical-node-key");
                    if (!targetNodeKey) {
                        console.log("Target element has no node key");
                        return false;
                    }

                    if (targetNodeKey === sourceNodeKey) {
                        console.log("Cannot drop onto self");
                        return false;
                    }

                    console.log(`Dropping onto target node: ${targetNodeKey}`);

                    // 노드 순서 변경
                    editor.update(() => {
                        const sourceNode = $getNodeByKey(sourceNodeKey);
                        const targetNode = $getNodeByKey(targetNodeKey);

                        if (!sourceNode) {
                            console.log(`Source node ${sourceNodeKey} not found`);
                            return;
                        }

                        if (!targetNode) {
                            console.log(`Target node ${targetNodeKey} not found`);
                            return;
                        }

                        // 소스 노드를 타겟 노드 앞에 삽입
                        const shouldInsertAfter = event.clientY > targetElement.getBoundingClientRect().top + (targetElement.getBoundingClientRect().height / 2);

                        console.log(`Inserting ${shouldInsertAfter ? 'after' : 'before'} target`);

                        if (shouldInsertAfter) {
                            targetNode.insertAfter(sourceNode);
                        } else {
                            targetNode.insertBefore(sourceNode);
                        }
                    });

                    return true;
                } catch (e) {
                    console.error("Error during drop handling:", e);
                    return false;
                }
            },
            COMMAND_PRIORITY_HIGH
        );
    }, [editor]);

    // 새 단락 추가 함수
    const insertNewParagraph = (nodeKey: string) => {
        editor.update(() => {
            const node = $getNodeByKey(nodeKey);
            if (!node) {
                console.log(`Cannot insert paragraph: node ${nodeKey} not found`);
                return;
            }

            const newParagraph = $createParagraphNode();
            node.insertAfter(newParagraph);
            newParagraph.select();
            console.log(`New paragraph inserted after node ${nodeKey}`);
        });
    };

    // 컨트롤 렌더링
    return (
        <>
            <div
                ref={controlsContainerRef}
                className="lexical-line-controls-container"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                    zIndex: 9
                }}
            />
            {createPortal(
                <>
                    {Object.entries(controlsState).map(([key, data]) => {
                        const nodeKey = data.nodeKey;
                        const isSelected = nodeKey === selectedNodeKey;

                        return (
                            <div
                                key={key}
                                style={{
                                    position: "absolute",
                                    top: data.top,
                                    left: "-40px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    pointerEvents: "auto",
                                    opacity: isSelected ? 1 : 0.5,
                                    zIndex: 100  // 높은 z-index 설정
                                }}
                                className="lexical-line-control-wrapper"
                                data-node-key={nodeKey}  // 노드 키를 div에 직접 추가
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.opacity = "1";
                                }}
                                onMouseLeave={(e) => {
                                    if (nodeKey !== selectedNodeKey) {
                                        (e.currentTarget as HTMLElement).style.opacity = "0.5";
                                    }
                                }}
                            >
                                <button
                                    type="button"
                                    className="lexical-add-button"
                                    onClick={() => nodeKey && insertNewParagraph(nodeKey)}
                                    title="새 단락 추가"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#aaa",
                                    }}
                                >
                                    <Plus size={14} />
                                </button>
                                <div
                                    className="lexical-drag-handle"
                                    draggable
                                    title="드래그하여 이동"
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        cursor: "grab",
                                        color: "#aaa",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <GripVertical size={14} />
                                </div>
                            </div>
                        );
                    })}
                </>,
                document.body
            )}
        </>
    );
}

export default LineControlsPlugin;