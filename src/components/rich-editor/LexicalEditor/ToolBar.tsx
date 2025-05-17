// src/components/rich-editor/LexicalEditor/Toolbar.tsx
"use client";

import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    UNDO_COMMAND,
    REDO_COMMAND,
    CAN_UNDO_COMMAND,
    CAN_REDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL
} from "lexical";
import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
import { Undo, Redo } from "lucide-react";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setCanUndo] = React.useState(false);
    const [canRedo, setCanRedo] = React.useState(false);

    // Register listeners for undo/redo capability changes
    React.useEffect(() => {
        editor.registerCommand(
            CAN_UNDO_COMMAND,
            (payload) => {
                setCanUndo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        editor.registerCommand(
            CAN_REDO_COMMAND,
            (payload) => {
                setCanRedo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor]);

    return (
        <div className="p-2 border-b bg-gray-100 flex items-center space-x-3">
            {/* Undo/Redo buttons */}
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button
                    className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? 'opacity-30 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        editor.dispatchCommand(UNDO_COMMAND, undefined);
                    }}
                    disabled={!canUndo}
                    title="Undo"
                >
                    <Undo className="w-5 h-5" />
                </button>
                <button
                    className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? 'opacity-30 cursor-not-allowed' : ''}`}
                    onClick={() => {
                        editor.dispatchCommand(REDO_COMMAND, undefined);
                    }}
                    disabled={!canRedo}
                    title="Redo"
                >
                    <Redo className="w-5 h-5" />
                </button>
            </div>

            {/* Font size selector */}
            <select
                defaultValue="16px"
                onChange={(e) =>
                    editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)
                }
                className="border rounded p-1 text-sm"
            >
                <option value="12px">12</option>
                <option value="14px">14</option>
                <option value="16px">16</option>
                <option value="18px">18</option>
                <option value="24px">24</option>
                <option value="32px">32</option>
                <option value="64px">64</option>
            </select>

            {/* Text color picker */}
            <label className="inline-flex items-center text-sm">
                글자색:
                <input
                    type="color"
                    defaultValue="#000000"
                    className="ml-1 h-6 w-6 border-none"
                    onChange={(e) =>
                        editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)
                    }
                />
            </label>

            {/* Background color picker */}
            <label className="inline-flex items-center text-sm">
                배경색:
                <input
                    type="color"
                    defaultValue="#ffffff"
                    className="ml-1 h-6 w-6 border-none"
                    onChange={(e) =>
                        editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)
                    }
                />
            </label>
        </div>
    );
}