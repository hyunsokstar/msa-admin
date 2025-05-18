"use client";

import {
    DecoratorNode,
    EditorConfig,
    LexicalEditor,
    NodeKey,
    SerializedLexicalNode,
    Spread,
} from "lexical";
import React from "react";
import LinkComponent from "./LinkComponent";

export type SerializedLinkDecoratorNode = Spread<
    {
        url: string;
        rel: string | null;
        target: string | null;
        text: string;
    },
    SerializedLexicalNode
>;

export class LinkDecoratorNode extends DecoratorNode<JSX.Element> {
    __url: string;
    __target: string | null;
    __rel: string | null;
    __text: string;

    static getType(): string {
        return "link-decorator";
    }

    static clone(node: LinkDecoratorNode): LinkDecoratorNode {
        return new LinkDecoratorNode(
            node.__url,
            node.__target,
            node.__rel,
            node.__text,
            node.__key
        );
    }

    static importJSON(serializedNode: SerializedLinkDecoratorNode): LinkDecoratorNode {
        const { url, target, rel, text } = serializedNode;
        return new LinkDecoratorNode(url, target, rel, text);
    }

    exportJSON(): SerializedLinkDecoratorNode {
        return {
            type: "link-decorator",
            version: 1,
            url: this.__url,
            target: this.__target,
            rel: this.__rel,
            text: this.__text,
        };
    }

    constructor(
        url: string,
        target: string | null,
        rel: string | null,
        text: string,
        key?: NodeKey
    ) {
        super(key);
        this.__url = url;
        this.__target = target;
        this.__rel = rel;
        this.__text = text;
    }

    createDOM(config: EditorConfig): HTMLElement {
        const span = document.createElement("span");
        span.className = "link-decorator-node";
        return span;
    }

    updateDOM(): false {
        return false;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
        return (
            <LinkComponent
                href={this.__url}
                target={this.__target || "_blank"}
                rel={this.__rel || "noopener noreferrer"}
            >
                {this.__text}
            </LinkComponent>
        );
    }
}