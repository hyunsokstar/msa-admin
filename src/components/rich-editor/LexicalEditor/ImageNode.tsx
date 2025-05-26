
// // ImageNode.tsx
// "use client";

// import {
//     DecoratorNode,
//     SerializedLexicalNode,
//     NodeKey,
//     $getNodeByKey,
//     KEY_DELETE_COMMAND,
//     KEY_BACKSPACE_COMMAND,
//     COMMAND_PRIORITY_EDITOR,
//     $applyNodeReplacement,
// } from "lexical";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
// import { ResizableBox } from "react-resizable";
// import "react-resizable/css/styles.css";
// import * as React from "react";

// export type SerializedImageNode = {
//     type: "image";
//     version: 1;
//     src: string;
//     width: number;
//     height: number;
// } & SerializedLexicalNode;

// export class ImageNode extends DecoratorNode<JSX.Element> {
//     __src: string;
//     __width: number;
//     __height: number;

//     constructor(src: string, key?: NodeKey, width = 600, height = 400) { // 기본 크기 더 증가
//         super(key);
//         this.__src = src;
//         this.__width = width;
//         this.__height = height;
//     }

//     static getType() {
//         return "image";
//     }

//     static clone(node: ImageNode) {
//         return new ImageNode(
//             node.__src,
//             node.__key,
//             node.__width,
//             node.__height
//         );
//     }

//     exportJSON(): SerializedImageNode {
//         return {
//             ...super.exportJSON(),
//             type: "image",
//             version: 1,
//             src: this.__src,
//             width: this.__width,
//             height: this.__height,
//         };
//     }

//     static importJSON(serialized: SerializedImageNode) {
//         return $applyNodeReplacement(new ImageNode(
//             serialized.src,
//             undefined,
//             serialized.width,
//             serialized.height
//         ));
//     }

//     // Update the node's dimensions
//     updateDimensions(width: number, height: number) {
//         const self = this.getWritable();
//         self.__width = width;
//         self.__height = height;
//         return self;
//     }

//     createDOM(): HTMLElement {
//         return document.createElement("span");
//     }

//     updateDOM(): false {
//         return false;
//     }

//     decorate(): JSX.Element {
//         return (
//             <ResizableImage
//                 nodeKey={this.getKey()}
//                 src={this.__src}
//                 initWidth={this.__width}
//                 initHeight={this.__height}
//             />
//         );
//     }
// }

// type ResizableImageProps = {
//     nodeKey: NodeKey;
//     src: string;
//     initWidth: number;
//     initHeight: number;
// };

// function ResizableImage({
//     nodeKey,
//     src,
//     initWidth,
//     initHeight,
// }: ResizableImageProps) {
//     const [editor] = useLexicalComposerContext();
//     const [isSelected, setSelected, clearSelection] =
//         useLexicalNodeSelection(nodeKey);
//     const [size, setSize] = React.useState({
//         width: initWidth,
//         height: initHeight,
//     });
//     const [isResizing, setIsResizing] = React.useState(false);

//     // Delete/Backspaceキー로 선택된 이미지 삭제
//     React.useEffect(() => {
//         const handler = (e: KeyboardEvent): boolean => {
//             if (isSelected) {
//                 e.preventDefault();
//                 editor.update(() => {
//                     const node = $getNodeByKey(nodeKey);
//                     node?.remove();
//                 });
//                 return true;
//             }
//             return false;
//         };
//         const delUnsub = editor.registerCommand(
//             KEY_DELETE_COMMAND,
//             handler,
//             COMMAND_PRIORITY_EDITOR
//         );
//         const backUnsub = editor.registerCommand(
//             KEY_BACKSPACE_COMMAND,
//             handler,
//             COMMAND_PRIORITY_EDITOR
//         );
//         return () => {
//             delUnsub();
//             backUnsub();
//         };
//     }, [editor, isSelected, nodeKey]);

//     return (
//         <div
//             className={`
//                 relative inline-block my-2 transition-all duration-200
//                 ${isSelected ? 'ring-2 ring-blue-400 shadow-lg' : 'hover:shadow-md'}
//                 ${isResizing ? 'z-10' : ''}
//             `}
//             onClick={(e) => {
//                 e.stopPropagation();
//                 setSelected(true);
//             }}
//             onBlur={() => {
//                 clearSelection();
//             }}
//             style={{
//                 maxWidth: '100%',
//                 cursor: isSelected ? 'move' : 'pointer'
//             }}
//         >
//             <ResizableBox
//                 width={size.width}
//                 height={size.height}
//                 lockAspectRatio={true}
//                 // 모든 모서리와 모든 면에서 리사이즈 가능
//                 resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
//                 minConstraints={[120, 80]} // 최소 크기 조금 증가
//                 maxConstraints={[1400, 1000]} // 최대 크기 증가
//                 onResizeStart={() => {
//                     setIsResizing(true);
//                 }}
//                 onResize={(_e, data) => {
//                     // 실시간으로 크기 변경 (부드러운 리사이징)
//                     const { width, height } = data.size;
//                     setSize({ width, height });
//                 }}
//                 onResizeStop={(_e, data) => {
//                     const { width, height } = data.size;
//                     setIsResizing(false);

//                     // 최종 크기를 노드에 저장
//                     editor.update(() => {
//                         const node = $getNodeByKey(nodeKey);
//                         if (node instanceof ImageNode) {
//                             node.updateDimensions(width, height);
//                         }
//                     });
//                 }}
//                 // 더 부드러운 리사이징을 위한 설정
//                 transformScale={1}
//             >
//                 <div className="relative w-full h-full group">
//                     <img
//                         src={src}
//                         alt="uploaded"
//                         className="w-full h-full object-contain rounded border"
//                         style={{
//                             display: "block",
//                             userSelect: 'none',
//                             pointerEvents: isResizing ? 'none' : 'auto'
//                         }}
//                         draggable={false}
//                     />

//                     {/* 크기 정보 표시 (선택됐을 때만) */}
//                     {isSelected && (
//                         <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded pointer-events-none">
//                             {Math.round(size.width)} × {Math.round(size.height)}
//                         </div>
//                     )}

//                     {/* 리사이즈 중일 때 가이드라인 */}
//                     {isResizing && (
//                         <div className="absolute inset-0 border-2 border-dashed border-blue-400 pointer-events-none" />
//                     )}
//                 </div>
//             </ResizableBox>

//             {/* 선택됐을 때 툴팁 */}
//             {isSelected && !isResizing && (
//                 <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
//                     드래그해서 크기 조절 • Delete로 삭제
//                 </div>
//             )}
//         </div>
//     );
// }

// ImageNode.tsx
"use client";

import {
    DecoratorNode,
    SerializedLexicalNode,
    NodeKey,
    $getNodeByKey,
    KEY_DELETE_COMMAND,
    KEY_BACKSPACE_COMMAND,
    COMMAND_PRIORITY_EDITOR,
    $applyNodeReplacement,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import * as React from "react";

export type SerializedImageNode = {
    type: "image";
    version: 1;
    src: string;
    width: number;
    height: number;
} & SerializedLexicalNode;

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;
    __width: number;
    __height: number;

    constructor(src: string, key?: NodeKey, width = 600, height = 400) { // 기본 크기 더 증가
        super(key);
        this.__src = src;
        this.__width = width;
        this.__height = height;
    }

    static getType() {
        return "image";
    }

    static clone(node: ImageNode) {
        return new ImageNode(
            node.__src,
            node.__key,
            node.__width,
            node.__height
        );
    }

    exportJSON(): SerializedImageNode {
        return {
            ...super.exportJSON(),
            type: "image",
            version: 1,
            src: this.__src,
            width: this.__width,
            height: this.__height,
        };
    }

    static importJSON(serialized: SerializedImageNode) {
        return $applyNodeReplacement(new ImageNode(
            serialized.src,
            undefined,
            serialized.width,
            serialized.height
        ));
    }

    // Update the node's dimensions
    updateDimensions(width: number, height: number) {
        const self = this.getWritable();
        self.__width = width;
        self.__height = height;
        return self;
    }

    createDOM(): HTMLElement {
        return document.createElement("span");
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return (
            <ResizableImage
                nodeKey={this.getKey()}
                src={this.__src}
                initWidth={this.__width}
                initHeight={this.__height}
            />
        );
    }
}

type ResizableImageProps = {
    nodeKey: NodeKey;
    src: string;
    initWidth: number;
    initHeight: number;
};

function ResizableImage({
    nodeKey,
    src,
    initWidth,
    initHeight,
}: ResizableImageProps) {
    const [editor] = useLexicalComposerContext();
    const [isSelected, setSelected, clearSelection] =
        useLexicalNodeSelection(nodeKey);
    const [size, setSize] = React.useState({
        width: initWidth,
        height: initHeight,
    });
    const [isResizing, setIsResizing] = React.useState(false);

    // Delete/Backspaceキー로 선택된 이미지 삭제
    React.useEffect(() => {
        const handler = (e: KeyboardEvent): boolean => {
            if (isSelected) {
                e.preventDefault();
                editor.update(() => {
                    const node = $getNodeByKey(nodeKey);
                    node?.remove();
                });
                return true;
            }
            return false;
        };
        const delUnsub = editor.registerCommand(
            KEY_DELETE_COMMAND,
            handler,
            COMMAND_PRIORITY_EDITOR
        );
        const backUnsub = editor.registerCommand(
            KEY_BACKSPACE_COMMAND,
            handler,
            COMMAND_PRIORITY_EDITOR
        );
        return () => {
            delUnsub();
            backUnsub();
        };
    }, [editor, isSelected, nodeKey]);

    const [isDoubleClicking, setIsDoubleClicking] = React.useState(false);

    // 더블 클릭으로 새 탭에서 이미지 보기
    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        // 시각적 피드백
        setIsDoubleClicking(true);
        setTimeout(() => setIsDoubleClicking(false), 200);

        window.open(src, '_blank', 'noopener,noreferrer');
    };

    return (
        <div
            className={`
                relative inline-block my-2 transition-all duration-200
                ${isSelected ? 'ring-2 ring-blue-400 shadow-lg' : 'hover:shadow-md'}
                ${isResizing ? 'z-10' : ''}
                ${isDoubleClicking ? 'ring-4 ring-green-400 shadow-xl' : ''}
            `}
            onClick={(e) => {
                e.stopPropagation();
                setSelected(true);
            }}
            onDoubleClick={handleDoubleClick}
            onBlur={() => {
                clearSelection();
            }}
            style={{
                maxWidth: '100%',
                cursor: isSelected ? 'move' : 'zoom-in'
            }}
            title="더블 클릭하여 새 탭에서 보기"
        >
            <ResizableBox
                width={size.width}
                height={size.height}
                lockAspectRatio={true}
                // 모든 모서리와 모든 면에서 리사이즈 가능
                resizeHandles={['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']}
                minConstraints={[120, 80]} // 최소 크기 조금 증가
                maxConstraints={[1400, 1000]} // 최대 크기 증가
                // 그리드 스냅 기능 (10px 단위로 조절)
                grid={[10, 10]}
                onResizeStart={() => {
                    setIsResizing(true);
                }}
                onResize={(_e, data) => {
                    // 실시간으로 크기 변경 (부드러운 리사이징)
                    const { width, height } = data.size;
                    setSize({ width, height });
                }}
                onResizeStop={(_e, data) => {
                    const { width, height } = data.size;
                    setIsResizing(false);

                    // 최종 크기를 노드에 저장
                    editor.update(() => {
                        const node = $getNodeByKey(nodeKey);
                        if (node instanceof ImageNode) {
                            node.updateDimensions(width, height);
                        }
                    });
                }}
                // 더 부드러운 리사이징을 위한 설정
                transformScale={1}
            >
                <div className="relative w-full h-full group">
                    <img
                        src={src}
                        alt="uploaded"
                        className="w-full h-full object-contain rounded border"
                        style={{
                            display: "block",
                            userSelect: 'none',
                            pointerEvents: isResizing ? 'none' : 'auto'
                        }}
                        draggable={false}
                    />

                    {/* 크기 정보 표시 (선택됐을 때만) */}
                    {isSelected && (
                        <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded pointer-events-none">
                            {Math.round(size.width)} × {Math.round(size.height)}
                        </div>
                    )}

                    {/* 리사이즈 중일 때 가이드라인 */}
                    {isResizing && (
                        <div className="absolute inset-0 border-2 border-dashed border-blue-400 pointer-events-none" />
                    )}
                </div>
            </ResizableBox>

            {/* 선택됐을 때 툴팁 */}
            {isSelected && !isResizing && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                    드래그해서 크기 조절 • 더블클릭으로 새탭보기 • Delete로 삭제
                </div>
            )}
        </div>
    );
}