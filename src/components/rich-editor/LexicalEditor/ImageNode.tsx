// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\nodes\ImageNode.tsx
"use client";

import { DecoratorNode, SerializedLexicalNode, NodeKey } from "lexical";
import * as React from "react";

export type SerializedImageNode = {
    type: "image";
    version: 1;
    src: string;
} & SerializedLexicalNode;

export class ImageNode extends DecoratorNode<JSX.Element> {
    __src: string;

    constructor(src: string, key?: NodeKey) {
        super(key);
        this.__src = src;
    }

    static getType(): string {
        return "image";
    }

    static clone(node: ImageNode): ImageNode {
        return new ImageNode(node.__src, node.__key);
    }

    createDOM(): HTMLElement {
        const span = document.createElement("span");
        return span;
    }

    decorate(): JSX.Element {
        return (
            <img
                src={this.__src}
                alt="uploaded"
                className="max-w-full my-4 rounded shadow"
            />
        );
    }

    static importJSON(serializedNode: SerializedImageNode): ImageNode {
        return new ImageNode(serializedNode.src);
    }

    exportJSON(): SerializedImageNode {
        return {
            ...super.exportJSON(),
            type: "image",
            version: 1 as const,
            src: this.__src,
        };
    }
}
