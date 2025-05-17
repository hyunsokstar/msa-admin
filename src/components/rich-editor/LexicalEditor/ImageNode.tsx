// // C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\nodes\ImageNode.tsx
// "use client";

// import { DecoratorNode, SerializedLexicalNode, NodeKey } from "lexical";
// import * as React from "react";

// export type SerializedImageNode = {
//     type: "image";
//     version: 1;
//     src: string;
// } & SerializedLexicalNode;

// export class ImageNode extends DecoratorNode<JSX.Element> {
//     __src: string;

//     constructor(src: string, key?: NodeKey) {
//         super(key);
//         this.__src = src;
//     }

//     static getType(): string {
//         return "image";
//     }

//     static clone(node: ImageNode): ImageNode {
//         return new ImageNode(node.__src, node.__key);
//     }

//     createDOM(): HTMLElement {
//         const span = document.createElement("span");
//         return span;
//     }

//     decorate(): JSX.Element {
//         return (
//             <img
//                 src={this.__src}
//                 alt="uploaded"
//                 className="max-w-full my-4 rounded shadow"
//             />
//         );
//     }

//     static importJSON(serializedNode: SerializedImageNode): ImageNode {
//         return new ImageNode(serializedNode.src);
//     }

//     exportJSON(): SerializedImageNode {
//         return {
//             ...super.exportJSON(),
//             type: "image",
//             version: 1 as const,
//             src: this.__src,
//         };
//     }
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

    constructor(src: string, key?: NodeKey, width = 300, height = 200) {
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

    // React decorate() のみで描画するのでネイティブDOMパッチ不要
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

    // Delete/Backspaceキーで選択中の画像を削除
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

    return (
        <div
            className={
                "relative inline-block " +
                (isSelected ? "ring-2 ring-blue-400" : "")
            }
            onClick={(e) => {
                e.stopPropagation();
                setSelected(true);
            }}
            onBlur={() => {
                clearSelection();
            }}
        >
            <ResizableBox
                width={size.width}
                height={size.height}
                lockAspectRatio={true}
                resizeHandles={["se"]}
                onResizeStop={(_e, data) => {
                    const { width, height } = data.size;
                    // (1) 見た目を変える state 更新
                    setSize({ width, height });

                    // (2) 直接ノードのプロパティを更新する (置換ではなく)
                    editor.update(() => {
                        const node = $getNodeByKey(nodeKey);
                        if (node instanceof ImageNode) {
                            node.updateDimensions(width, height);
                        }
                    });
                }}
            >
                <img
                    src={src}
                    alt="uploaded"
                    style={{ width: "100%", height: "100%", display: "block" }}
                />
            </ResizableBox>
        </div>
    );
}