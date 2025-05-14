// plugins/ToolbarPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list";
import { $createCodeNode } from "@lexical/code";
import { $wrapNodes } from "@lexical/selection";
import { $createHeadingNode } from "@lexical/rich-text";
import React from "react";

export default function ToolbarPlugin(): JSX.Element {
    const [editor] = useLexicalComposerContext();

    const insertCodeBlock = () => {
        editor.update(() => {
            const codeNode = $createCodeNode();
            $wrapNodes(codeNode);
        });
    };

    return (
        <div className="toolbar">
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                className="toolbar-item"
            >
                B
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                className="toolbar-item"
            >
                I
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                className="toolbar-item"
            >
                U
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
                className="toolbar-item"
            >
                ←
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                className="toolbar-item"
            >
                ↔
            </button>
            <button
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                className="toolbar-item"
            >
                →
            </button>
            <button
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                className="toolbar-item"
            >
                • UL
            </button>
            <button
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                className="toolbar-item"
            >
                1. OL
            </button>
            <button onClick={insertCodeBlock} className="toolbar-item">
                &lt;/&gt;
            </button>
            <button
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                className="toolbar-item"
            >
                ↩
            </button>
            <button
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                className="toolbar-item"
            >
                ↪
            </button>
        </div>
    );
}