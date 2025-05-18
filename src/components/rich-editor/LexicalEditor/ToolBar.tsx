// src/components/rich-editor/LexicalEditor/ToolBar.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
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
    $createTextNode,
    $insertNodes,
} from "lexical";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
import {
    Undo, Redo, Bold, Italic, Underline, Code, AlignLeft,
    AlignCenter, AlignRight, Heading1, Heading2, Terminal,
    ChevronDown, HighlighterIcon, Type, ImageIcon, Link2
} from "lucide-react";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createPlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
import { uploadFileToS3 } from "./uploadHelpers";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";

export default function Toolbar() {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isCode, setIsCode] = useState(false);
    const [codeLanguage, setCodeLanguage] = useState("javascript");
    const [showCodeDropdown, setShowCodeDropdown] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const undo = editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false; }, COMMAND_PRIORITY_CRITICAL);
        const redo = editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false; }, COMMAND_PRIORITY_CRITICAL);
        const selection = editor.registerCommand(
            SELECTION_CHANGE_COMMAND,
            () => {
                editor.getEditorState().read(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        setIsBold(selection.hasFormat("bold"));
                        setIsItalic(selection.hasFormat("italic"));
                        setIsUnderline(selection.hasFormat("underline"));
                        setIsCode(selection.hasFormat("code"));
                    }
                });
                return false;
            },
            COMMAND_PRIORITY_CRITICAL
        );
        return () => { undo(); redo(); selection(); };
    }, [editor]);

    const applyHighlight = (color: string) => {
        editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
    };

    const insertCodeBlock = (language = "javascript") => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createCodeNode(language));
            }
        });
        setShowCodeDropdown(false);
    };

    const insertPlaygroundBlock = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createPlaygroundCodeBlockNode());
            }
        });
    };

    const insertHeading = (level: "h1" | "h2") => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                $setBlocksType(selection, () => $createHeadingNode(level));
            }
        });
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = await uploadFileToS3(file);
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
        }
    };

    const insertLink = () => {
        const url = prompt("링크 URL을 입력하세요");
        if (!url) return;
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection) && !selection.isCollapsed()) {
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target: "_blank" });
            } else {
                const textNode = $createTextNode(url);
                textNode.setFormat("underline");
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target: "_blank" });
                $insertNodes([textNode]);
            }
        });
    };

    const codeLanguages = ["javascript", "typescript", "html", "css", "python"];

    return (
        <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button type="button" className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? "opacity-30" : ""}`} disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}><Undo className="w-5 h-5" /></button>
                <button type="button" className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? "opacity-30" : ""}`} disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><Redo className="w-5 h-5" /></button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <div className="relative">
                    <button type="button" className="p-1 rounded hover:bg-gray-200 flex items-center bg-blue-50 border border-blue-200" onClick={() => setShowCodeDropdown(!showCodeDropdown)}>
                        <Terminal className="w-5 h-5 text-blue-600" />
                        <span className="ml-1 text-xs text-blue-700 font-medium">{codeLanguage}</span>
                        <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
                    </button>
                    {showCodeDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
                            <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">언어 선택</div>
                            {codeLanguages.map((lang) => (
                                <button type="button" key={lang} className={`block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm ${lang === codeLanguage ? "bg-blue-50 font-medium" : ""}`} onClick={() => { setCodeLanguage(lang); insertCodeBlock(lang); }}>
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <button type="button" className="p-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-200" onClick={insertPlaygroundBlock}>Playground Block</button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button type="button" onClick={() => insertHeading("h1")}><Heading1 className="w-5 h-5" /></button>
                <button type="button" onClick={() => insertHeading("h2")}><Heading2 className="w-5 h-5" /></button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} className={isBold ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Bold className="w-5 h-5" /></button>
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} className={isItalic ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Italic className="w-5 h-5" /></button>
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} className={isUnderline ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Underline className="w-5 h-5" /></button>
                <button type="button" onClick={insertLink} className="p-1 rounded hover:bg-gray-200"><Link2 className="w-5 h-5" /></button>
            </div>

            <div className="mr-2 border-r pr-2">
                <button type="button" className="p-1 rounded hover:bg-yellow-100 border border-yellow-300 bg-yellow-50 text-yellow-700" onClick={() => applyHighlight("#FFFF00")} title="형광펜">
                    <HighlighterIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}><AlignLeft className="w-5 h-5" /></button>
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}><AlignCenter className="w-5 h-5" /></button>
                <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}><AlignRight className="w-5 h-5" /></button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="flex items-center">
                    <Type className="w-4 h-4 mr-1 text-gray-500" />
                    <select className="border rounded p-1 text-sm" defaultValue="16px" onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}>
                        <option value="12px">12</option>
                        <option value="14px">14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="24px">24</option>
                        <option value="32px">32</option>
                    </select>
                </div>
                <label className="inline-flex items-center text-sm">글자색:
                    <input type="color" defaultValue="#000000" className="ml-1 h-6 w-6 border-none" onChange={(e) => editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)} />
                </label>
                <label className="inline-flex items-center text-sm">배경색:
                    <input type="color" defaultValue="#ffffff" className="ml-1 h-6 w-6 border-none" onChange={(e) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)} />
                </label>
            </div>

            <div className="ml-2">
                <button
                    type="button"
                    className="p-1 rounded border border-gray-300 bg-white hover:bg-gray-100 text-sm flex items-center"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImageIcon className="w-5 h-5 mr-1 text-gray-700" /> 이미지 업로드
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </div>
        </div>
    );
}
