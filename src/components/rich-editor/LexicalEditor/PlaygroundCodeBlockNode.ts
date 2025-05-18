import {
    CodeNode,
    SerializedCodeNode,
} from '@lexical/code';
import { LexicalEditor, SerializedElementNode } from 'lexical';

export type SerializedPlaygroundCodeBlockNode = SerializedCodeNode & {
    type: 'playground-code';
    version: 1;
};

export class PlaygroundCodeBlockNode extends CodeNode {
    static getType(): string {
        return 'playground-code';
    }

    static clone(node: PlaygroundCodeBlockNode): PlaygroundCodeBlockNode {
        return new PlaygroundCodeBlockNode(node.__key); // ✅ key 넘김 필수
    }

    constructor(key?: string) {
        super(undefined, key); // ✅ key를 두 번째 인자로 명시해야 함
    }

    createDOM(): HTMLElement {
        const dom = document.createElement('pre');
        dom.className =
            'bg-gray-100 text-sm font-mono rounded-md p-3 overflow-x-auto whitespace-pre-wrap';
        return dom;
    }

    updateDOM(): boolean {
        return false;
    }

    static importJSON(
        serializedNode: SerializedPlaygroundCodeBlockNode
    ): PlaygroundCodeBlockNode {
        return new PlaygroundCodeBlockNode();
    }

    exportJSON(): SerializedPlaygroundCodeBlockNode {
        return {
            ...super.exportJSON(),
            type: 'playground-code',
            version: 1,
        };
    }
}

export function $createPlaygroundCodeBlockNode(): PlaygroundCodeBlockNode {
    return new PlaygroundCodeBlockNode();
}

export function $isPlaygroundCodeBlockNode(
    node: unknown
): node is PlaygroundCodeBlockNode {
    return node instanceof PlaygroundCodeBlockNode;
}
