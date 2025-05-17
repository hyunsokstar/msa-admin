// // C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\CustomTextNode.ts
// "use client";

// import {
//     TextNode,
//     EditorConfig,
//     LexicalEditor,
//     Spread,
//     SerializedTextNode,
// } from "lexical";

// export type SerializedCustomTextNode = Spread<
//     {
//         type: "custom-text";
//         version: 1;
//         fontSize: string;
//     },
//     SerializedTextNode
// >;

// export class CustomTextNode extends TextNode {
//     __fontSize: string;

//     constructor(text: string, key?: string, fontSize: string = "16px") {
//         super(text, key);
//         this.__fontSize = fontSize;
//     }

//     static getType(): string {
//         return "custom-text";
//     }

//     static clone(node: CustomTextNode): CustomTextNode {
//         return new CustomTextNode(node.__text, node.__key, node.__fontSize);
//     }

//     createDOM(config: EditorConfig, _editor?: LexicalEditor): HTMLElement {
//         const dom = super.createDOM(config, _editor);
//         dom.style.fontSize = this.__fontSize;
//         return dom;
//     }

//     updateDOM(
//         prevNode: CustomTextNode,
//         dom: HTMLElement,
//         config: EditorConfig
//     ): boolean {
//         if (this.__fontSize !== prevNode.__fontSize) {
//             dom.style.fontSize = this.__fontSize;
//         }

//         // TextNode의 updateDOM 메서드 호출
//         return super.updateDOM(prevNode as unknown as this, dom, config);
//     }

//     static importJSON(serializedNode: SerializedCustomTextNode): CustomTextNode {
//         const node = new CustomTextNode(
//             serializedNode.text,
//             undefined,
//             serializedNode.fontSize
//         );
//         node.setFormat(serializedNode.format);
//         node.setStyle(serializedNode.style);
//         return node;
//     }

//     exportJSON(): SerializedCustomTextNode {
//         return {
//             ...super.exportJSON(),
//             type: "custom-text",
//             fontSize: this.__fontSize,
//             version: 1,
//         };
//     }

//     setFontSize(size: string) {
//         const self = this.getWritable();
//         self.__fontSize = size;
//     }

//     getFontSize(): string {
//         return this.__fontSize;
//     }
// }

// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\CustomTextNode.ts
"use client";

import {
    TextNode,
    EditorConfig,
    LexicalEditor,
    Spread,
    SerializedTextNode,
    NodeKey,
} from "lexical";

export type SerializedCustomTextNode = Spread<
    {
        type: "custom-text";
        version: 1;
        fontSize: string;
        color: string;
        backgroundColor: string;
    },
    SerializedTextNode
>;

export class CustomTextNode extends TextNode {
    __fontSize: string;
    __color: string;
    __backgroundColor: string;

    constructor(
        text: string,
        key?: NodeKey,
        fontSize = "16px",
        color = "#000000",
        backgroundColor = "transparent"
    ) {
        super(text, key);
        this.__fontSize = fontSize;
        this.__color = color;
        this.__backgroundColor = backgroundColor;
    }

    static getType(): string {
        return "custom-text";
    }

    static clone(node: CustomTextNode): CustomTextNode {
        return new this(
            node.__text,
            node.__key,
            node.__fontSize,
            node.__color,
            node.__backgroundColor
        );
    }

    createDOM(config: EditorConfig, _editor?: LexicalEditor): HTMLElement {
        const dom = super.createDOM(config);
        dom.style.fontSize = this.__fontSize;
        dom.style.color = this.__color;
        dom.style.backgroundColor = this.__backgroundColor;
        return dom;
    }

    updateDOM(
        prevNode: CustomTextNode,
        dom: HTMLElement,
        config: EditorConfig
    ): boolean {
        const isUpdated = super.updateDOM(prevNode as unknown as this, dom, config);

        if (this.__fontSize !== prevNode.__fontSize) {
            dom.style.fontSize = this.__fontSize;
        }

        if (this.__color !== prevNode.__color) {
            dom.style.color = this.__color;
        }

        if (this.__backgroundColor !== prevNode.__backgroundColor) {
            dom.style.backgroundColor = this.__backgroundColor;
        }

        return (
            isUpdated ||
            this.__fontSize !== prevNode.__fontSize ||
            this.__color !== prevNode.__color ||
            this.__backgroundColor !== prevNode.__backgroundColor
        );
    }

    static importJSON(serializedNode: SerializedCustomTextNode): CustomTextNode {
        const node = new this(
            serializedNode.text,
            undefined,
            serializedNode.fontSize,
            serializedNode.color,
            serializedNode.backgroundColor
        );
        node.setFormat(serializedNode.format);
        node.setStyle(serializedNode.style);
        if ("detail" in serializedNode) node.setDetail(serializedNode.detail);
        if ("mode" in serializedNode) node.setMode(serializedNode.mode as any);
        return node;
    }

    exportJSON(): SerializedCustomTextNode {
        return {
            ...super.exportJSON(),
            type: "custom-text",
            fontSize: this.__fontSize,
            color: this.__color,
            backgroundColor: this.__backgroundColor,
            version: 1,
        };
    }

    setFontSize(size: string) {
        this.getWritable().__fontSize = size;
    }

    getFontSize(): string {
        return this.getLatest().__fontSize;
    }

    setColor(color: string) {
        this.getWritable().__color = color;
    }

    getColor(): string {
        return this.getLatest().__color;
    }

    setBackgroundColor(color: string) {
        this.getWritable().__backgroundColor = color;
    }

    getBackgroundColor(): string {
        return this.getLatest().__backgroundColor;
    }
}
