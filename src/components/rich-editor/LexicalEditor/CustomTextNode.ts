// C:\Users\terec\msa-admin\src\components\rich-editor\LexicalEditor\CustomTextNode.ts
"use client";

import {
    TextNode,
    EditorConfig,
    LexicalEditor,
    Spread,
    SerializedTextNode,
} from "lexical";

export type SerializedCustomTextNode = Spread<
    {
        type: "custom-text";
        version: 1;
        fontSize: string;
    },
    SerializedTextNode
>;

export class CustomTextNode extends TextNode {
    __fontSize: string;

    constructor(text: string, key?: string, fontSize: string = "16px") {
        super(text, key);
        this.__fontSize = fontSize;
    }

    static getType(): string {
        return "custom-text";
    }

    static clone(node: CustomTextNode): CustomTextNode {
        return new CustomTextNode(node.__text, node.__key, node.__fontSize);
    }

    createDOM(config: EditorConfig, _editor?: LexicalEditor): HTMLElement {
        const dom = super.createDOM(config, _editor);
        dom.style.fontSize = this.__fontSize;
        return dom;
    }

    updateDOM(
        prevNode: CustomTextNode,
        dom: HTMLElement,
        config: EditorConfig
    ): boolean {
        if (this.__fontSize !== prevNode.__fontSize) {
            dom.style.fontSize = this.__fontSize;
        }
        return super.updateDOM(prevNode, dom, config);
    }

    static importJSON(serializedNode: SerializedCustomTextNode): CustomTextNode {
        const node = new CustomTextNode(
            serializedNode.text,
            undefined,
            serializedNode.fontSize
        );
        node.setFormat(serializedNode.format);
        node.setStyle(serializedNode.style);
        return node;
    }

    exportJSON(): SerializedCustomTextNode {
        return {
            ...super.exportJSON(),
            type: "custom-text",
            fontSize: this.__fontSize,
            version: 1,
        };
    }

    setFontSize(size: string) {
        const self = this.getWritable();
        self.__fontSize = size;
    }

    getFontSize(): string {
        return this.__fontSize;
    }
}
