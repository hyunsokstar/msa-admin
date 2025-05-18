// src/components/rich-editor/LexicalEditor/ToolBar.tsx
"use client";

import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    UNDO_COMMAND,
    REDO_COMMAND,
    CAN_UNDO_COMMAND,
    CAN_REDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    SELECTION_CHANGE_COMMAND,
    $getSelection,
    $isRangeSelection,
    FORMAT_TEXT_COMMAND,
    FORMAT_ELEMENT_COMMAND,
    $createParagraphNode,
    $getNodeByKey,
} from "lexical";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
import {
    Undo,
    Redo,
    Bold,
    Italic,
    Underline,
    Code,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Heading1,
    Heading2,
    Terminal,
    ChevronDown,
    HighlighterIcon  // 형광펜 아이콘 추가
} from "lucide-react";
import { $createHeadingNode } from "@lexical/rich-text";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState('javascript');
    const [showCodeDropdown, setShowCodeDropdown] = useState(false);

    // Register listeners for undo/redo and selection changes
    React.useEffect(() => {
        // Undo/Redo state listeners
        const undoListener = editor.registerCommand(
            CAN_UNDO_COMMAND,
            (payload) => {
                setCanUndo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        const redoListener = editor.registerCommand(
            CAN_REDO_COMMAND,
            (payload) => {
                setCanRedo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );

        // Selection change listener to update button states
        const selectionListener = editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                editor.getEditorState().read(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        setIsBold(selection.hasFormat('bold'));
                        setIsItalic(selection.hasFormat('italic'));
                        setIsUnderline(selection.hasFormat('underline'));
                        setIsCode(selection.hasFormat('code'));
                    }
                });
                return false;
            },
            COMMAND_PRIORITY_CRITICAL
        );

        return () => {
            undoListener();
            redoListener();
            selectionListener();
        };
    }, [editor]);

    // 형광펜 기능 추가
    const applyHighlight = (color: string) => {
        editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
    };

    // Format functions
    const insertCodeBlock = (language = 'javascript') => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createCodeNode(language));
            }
        });
        setShowCodeDropdown(false);
    };

    // Helper function to insert headings
    const insertHeading = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(level));
            }
        });
    };

    // 지원하는 코드 언어 목록
    const codeLanguages = [
        'javascript',
        'typescript',
        'html',
        'css',
        'python',
        'java',
        'c',
        'cpp',
        'csharp',
        'php',
        'ruby',
        'go',
        'rust',
        'swift',
        'kotlin',
        'sql'
    ];

    return (
        <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
            {/* Undo/Redo buttons */}
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? 'opacity-30 cursor-not-allowed' : ''}`}
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                    disabled={!canUndo}
                    title="Undo"
                >
                    <Undo className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? 'opacity-30 cursor-not-allowed' : ''}`}
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                    disabled={!canRedo}
                    title="Redo"
                >
                    <Redo className="w-5 h-5" />
                </button>
            </div>

            {/* Text formatting */}
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${isBold ? 'bg-gray-300' : ''}`}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
                    title="Bold"
                >
                    <Bold className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${isItalic ? 'bg-gray-300' : ''}`}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
                    title="Italic"
                >
                    <Italic className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${isUnderline ? 'bg-gray-300' : ''}`}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
                    title="Underline"
                >
                    <Underline className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className={`p-1 rounded hover:bg-gray-200 ${isCode ? 'bg-gray-300' : ''}`}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
                    title="Inline Code"
                >
                    <Code className="w-5 h-5" />
                </button>
            </div>

            {/* 형광펜 버튼 */}
            <div className="relative group mr-2 border-r pr-2">
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200 flex items-center"
                    title="Highlighter"
                >
                    <HighlighterIcon className="w-5 h-5" />
                </button>
                <div className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-wrap bg-white shadow-lg rounded border border-gray-200 p-1 z-10 w-32">
                    {['#FFFF00', '#00FFFF', '#FF00FF', '#ADFF2F', '#FFA500'].map((color) => (
                        <button
                            key={color}
                            type="button"
                            className="w-6 h-6 m-1 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                            onClick={() => applyHighlight(color)}
                            title={`Highlight with ${color}`}
                        />
                    ))}
                </div>
            </div>

            {/* Blocks */}
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => insertHeading('h1')}
                    title="Heading 1"
                >
                    <Heading1 className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => insertHeading('h2')}
                    title="Heading 2"
                >
                    <Heading2 className="w-5 h-5" />
                </button>

                {/* 코드 블록 버튼 (드롭다운 포함) */}
                <div className="relative">
                    <button
                        type="button"
                        className="p-1 rounded hover:bg-gray-200 flex items-center"
                        onClick={() => setShowCodeDropdown(!showCodeDropdown)}
                        title="Code Block"
                    >
                        <Terminal className="w-5 h-5" />
                        <ChevronDown className="w-3 h-3 ml-1" />
                    </button>

                    {showCodeDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
                            <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">
                                언어 선택
                            </div>
                            {codeLanguages.map((lang) => (
                                <button
                                    key={lang}
                                    type="button"
                                    className="block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm"
                                    onClick={() => {
                                        setCodeLanguage(lang);
                                        insertCodeBlock(lang);
                                    }}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Alignment */}
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
                    title="Align Left"
                >
                    <AlignLeft className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
                    title="Align Center"
                >
                    <AlignCenter className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
                    title="Align Right"
                >
                    <AlignRight className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    className="p-1 rounded hover:bg-gray-200"
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')}
                    title="Justify"
                >
                    <AlignJustify className="w-5 h-5" />
                </button>
            </div>

            {/* Font size selector */}
            <select
                className="border rounded p-1 text-sm"
                defaultValue="16px"
                onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}
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
                    onChange={(e) => editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)}
                />
            </label>

            {/* Background color picker */}
            <label className="inline-flex items-center text-sm">
                배경색:
                <input
                    type="color"
                    defaultValue="#ffffff"
                    className="ml-1 h-6 w-6 border-none"
                    onChange={(e) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)}
                />
            </label>
        </div>
    );
}