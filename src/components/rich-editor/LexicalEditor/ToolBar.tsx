// // // src/components/rich-editor/LexicalEditor/ToolBar.tsx
// // "use client";

// // import React, { useState } from "react";
// // import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// // import {
// //     UNDO_COMMAND,
// //     REDO_COMMAND,
// //     CAN_UNDO_COMMAND,
// //     CAN_REDO_COMMAND,
// //     COMMAND_PRIORITY_CRITICAL,
// //     SELECTION_CHANGE_COMMAND,
// //     $getSelection,
// //     $isRangeSelection,
// //     FORMAT_TEXT_COMMAND,
// //     FORMAT_ELEMENT_COMMAND,
// //     $createParagraphNode,
// //     $getNodeByKey,
// // } from "lexical";
// // import { $createCodeNode } from "@lexical/code";
// // import { $setBlocksType } from "@lexical/selection";
// // import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
// // import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
// // import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
// // import {
// //     Undo,
// //     Redo,
// //     Bold,
// //     Italic,
// //     Underline,
// //     Code,
// //     AlignLeft,
// //     AlignCenter,
// //     AlignRight,
// //     AlignJustify,
// //     Heading1,
// //     Heading2,
// //     Terminal,
// //     ChevronDown,
// //     HighlighterIcon,
// //     Type
// // } from "lucide-react";
// // import { $createHeadingNode } from "@lexical/rich-text";

// // export default function Toolbar() {
// //     const [editor] = useLexicalComposerContext();
// //     const [canUndo, setCanUndo] = useState(false);
// //     const [canRedo, setCanRedo] = useState(false);
// //     const [isBold, setIsBold] = useState(false);
// //     const [isItalic, setIsItalic] = useState(false);
// //     const [isUnderline, setIsUnderline] = useState(false);
// //     const [isCode, setIsCode] = useState(false);
// //     const [codeLanguage, setCodeLanguage] = useState('javascript');
// //     const [showCodeDropdown, setShowCodeDropdown] = useState(false);

// //     // Register listeners for undo/redo and selection changes
// //     React.useEffect(() => {
// //         // Undo/Redo state listeners
// //         const undoListener = editor.registerCommand(
// //             CAN_UNDO_COMMAND,
// //             (payload) => {
// //                 setCanUndo(payload);
// //                 return false;
// //             },
// //             COMMAND_PRIORITY_CRITICAL,
// //         );

// //         const redoListener = editor.registerCommand(
// //             CAN_REDO_COMMAND,
// //             (payload) => {
// //                 setCanRedo(payload);
// //                 return false;
// //             },
// //             COMMAND_PRIORITY_CRITICAL,
// //         );

// //         // Selection change listener to update button states
// //         const selectionListener = editor.registerCommand(
// //             SELECTION_CHANGE_COMMAND,
// //             () => {
// //                 editor.getEditorState().read(() => {
// //                     const selection = $getSelection();
// //                     if ($isRangeSelection(selection)) {
// //                         setIsBold(selection.hasFormat('bold'));
// //                         setIsItalic(selection.hasFormat('italic'));
// //                         setIsUnderline(selection.hasFormat('underline'));
// //                         setIsCode(selection.hasFormat('code'));
// //                     }
// //                 });
// //                 return false;
// //             },
// //             COMMAND_PRIORITY_CRITICAL
// //         );

// //         return () => {
// //             undoListener();
// //             redoListener();
// //             selectionListener();
// //         };
// //     }, [editor]);

// //     // 형광펜 기능 추가
// //     const applyHighlight = (color: string) => {
// //         editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
// //     };

// //     // Format functions
// //     const insertCodeBlock = (language = 'javascript') => {
// //         editor.update(() => {
// //             const selection = $getSelection();
// //             if ($isRangeSelection(selection)) {
// //                 $setBlocksType(selection, () => $createCodeNode(language));
// //             }
// //         });
// //         setShowCodeDropdown(false);
// //     };

// //     // Helper function to insert headings
// //     const insertHeading = (level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
// //         editor.update(() => {
// //             const selection = $getSelection();
// //             if ($isRangeSelection(selection)) {
// //                 $setBlocksType(selection, () => $createHeadingNode(level));
// //             }
// //         });
// //     };

// //     // 지원하는 코드 언어 목록
// //     const codeLanguages = [
// //         'javascript',
// //         'typescript',
// //         'html',
// //         'css',
// //         'python',
// //         'java',
// //         'c',
// //         'cpp',
// //         'csharp',
// //         'php',
// //         'ruby',
// //         'go',
// //         'rust',
// //         'swift',
// //         'kotlin',
// //         'sql'
// //     ];

// //     return (
// //         <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
// //             {/* Undo/Redo buttons */}
// //             <div className="flex space-x-1 mr-2 border-r pr-2">
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? 'opacity-30 cursor-not-allowed' : ''}`}
// //                     onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
// //                     disabled={!canUndo}
// //                     title="실행취소"
// //                 >
// //                     <Undo className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? 'opacity-30 cursor-not-allowed' : ''}`}
// //                     onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
// //                     disabled={!canRedo}
// //                     title="다시실행"
// //                 >
// //                     <Redo className="w-5 h-5" />
// //                 </button>
// //             </div>

// //             {/* 코드 관련 (개발자 노트에서 가장 중요) */}
// //             <div className="flex space-x-1 mr-2 border-r pr-2">
// //                 {/* 인라인 코드 버튼 */}
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${isCode ? 'bg-gray-300' : ''}`}
// //                     onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
// //                     title="인라인 코드"
// //                 >
// //                     <Code className="w-5 h-5" />
// //                 </button>

// //                 {/* 코드 블록 버튼 (드롭다운 포함) */}
// //                 <div className="relative">
// //                     <button
// //                         type="button"
// //                         className="p-1 rounded hover:bg-gray-200 flex items-center bg-blue-50 border border-blue-200"
// //                         onClick={() => setShowCodeDropdown(!showCodeDropdown)}
// //                         title="코드 블록"
// //                     >
// //                         <Terminal className="w-5 h-5 text-blue-600" />
// //                         <span className="ml-1 text-xs text-blue-700 font-medium">{codeLanguage}</span>
// //                         <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
// //                     </button>

// //                     {showCodeDropdown && (
// //                         <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
// //                             <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">
// //                                 언어 선택
// //                             </div>
// //                             {codeLanguages.map((lang) => (
// //                                 <button
// //                                     key={lang}
// //                                     type="button"
// //                                     className={`block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm ${lang === codeLanguage ? 'bg-blue-50 font-medium' : ''}`}
// //                                     onClick={() => {
// //                                         setCodeLanguage(lang);
// //                                         insertCodeBlock(lang);
// //                                     }}
// //                                 >
// //                                     {lang}
// //                                 </button>
// //                             ))}
// //                         </div>
// //                     )}
// //                 </div>
// //             </div>

// //             {/* 헤딩 (제목) */}
// //             <div className="flex space-x-1 mr-2 border-r pr-2">
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200"
// //                     onClick={() => insertHeading('h1')}
// //                     title="큰 제목"
// //                 >
// //                     <Heading1 className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200"
// //                     onClick={() => insertHeading('h2')}
// //                     title="중간 제목"
// //                 >
// //                     <Heading2 className="w-5 h-5" />
// //                 </button>
// //             </div>

// //             {/* 텍스트 포맷팅 */}
// //             <div className="flex space-x-1 mr-2 border-r pr-2">
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${isBold ? 'bg-gray-300' : ''}`}
// //                     onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
// //                     title="굵게"
// //                 >
// //                     <Bold className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${isItalic ? 'bg-gray-300' : ''}`}
// //                     onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
// //                     title="기울임"
// //                 >
// //                     <Italic className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className={`p-1 rounded hover:bg-gray-200 ${isUnderline ? 'bg-gray-300' : ''}`}
// //                     onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
// //                     title="밑줄"
// //                 >
// //                     <Underline className="w-5 h-5" />
// //                 </button>
// //             </div>

// //             {/* 형광펜 버튼 */}
// //             <div className="relative group mr-2 border-r pr-2">
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200 flex items-center"
// //                     title="형광펜"
// //                 >
// //                     <HighlighterIcon className="w-5 h-5" />
// //                 </button>
// //                 <div className="absolute top-full left-0 mt-1 hidden group-hover:flex flex-wrap bg-white shadow-lg rounded border border-gray-200 p-1 z-10 w-32">
// //                     {['#FFFF00', '#00FFFF', '#FF00FF', '#ADFF2F', '#FFA500'].map((color) => (
// //                         <button
// //                             key={color}
// //                             type="button"
// //                             className="w-6 h-6 m-1 rounded-full border border-gray-300"
// //                             style={{ backgroundColor: color }}
// //                             onClick={() => applyHighlight(color)}
// //                             title={`${color} 형광펜`}
// //                         />
// //                     ))}
// //                 </div>
// //             </div>

// //             {/* 정렬 */}
// //             <div className="flex space-x-1 mr-2 border-r pr-2">
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200"
// //                     onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
// //                     title="왼쪽 정렬"
// //                 >
// //                     <AlignLeft className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200"
// //                     onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
// //                     title="가운데 정렬"
// //                 >
// //                     <AlignCenter className="w-5 h-5" />
// //                 </button>
// //                 <button
// //                     type="button"
// //                     className="p-1 rounded hover:bg-gray-200"
// //                     onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
// //                     title="오른쪽 정렬"
// //                 >
// //                     <AlignRight className="w-5 h-5" />
// //                 </button>
// //             </div>

// //             {/* 스타일링 옵션 */}
// //             <div className="flex items-center space-x-2">
// //                 {/* 폰트 사이즈 */}
// //                 <div className="flex items-center">
// //                     <Type className="w-4 h-4 mr-1 text-gray-500" />
// //                     <select
// //                         className="border rounded p-1 text-sm"
// //                         defaultValue="16px"
// //                         onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}
// //                     >
// //                         <option value="12px">12</option>
// //                         <option value="14px">14</option>
// //                         <option value="16px">16</option>
// //                         <option value="18px">18</option>
// //                         <option value="24px">24</option>
// //                         <option value="32px">32</option>
// //                     </select>
// //                 </div>

// //                 {/* 텍스트 색상 */}
// //                 <label className="inline-flex items-center text-sm">
// //                     글자색:
// //                     <input
// //                         type="color"
// //                         defaultValue="#000000"
// //                         className="ml-1 h-6 w-6 border-none"
// //                         onChange={(e) => editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)}
// //                     />
// //                 </label>

// //                 {/* 배경 색상 */}
// //                 <label className="inline-flex items-center text-sm">
// //                     배경색:
// //                     <input
// //                         type="color"
// //                         defaultValue="#ffffff"
// //                         className="ml-1 h-6 w-6 border-none"
// //                         onChange={(e) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)}
// //                     />
// //                 </label>
// //             </div>
// //         </div>
// //     );
// // }

// // src/components/rich-editor/LexicalEditor/ToolBar.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//     UNDO_COMMAND,
//     REDO_COMMAND,
//     CAN_UNDO_COMMAND,
//     CAN_REDO_COMMAND,
//     COMMAND_PRIORITY_CRITICAL,
//     SELECTION_CHANGE_COMMAND,
//     $getSelection,
//     $isRangeSelection,
//     FORMAT_TEXT_COMMAND,
//     FORMAT_ELEMENT_COMMAND,
// } from "lexical";
// import { $createCodeNode } from "@lexical/code";
// import { $setBlocksType } from "@lexical/selection";
// import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
// import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
// import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
// import {
//     Undo, Redo, Bold, Italic, Underline, Code, AlignLeft,
//     AlignCenter, AlignRight, Heading1, Heading2, Terminal,
//     ChevronDown, HighlighterIcon, Type
// } from "lucide-react";
// import { $createHeadingNode } from "@lexical/rich-text";
// import { TOGGLE_CODE_BLOCK_COMMAND } from "./ToggleCodeBlockPlugin";

// export default function Toolbar() {
//     const [editor] = useLexicalComposerContext();
//     const [canUndo, setCanUndo] = useState(false);
//     const [canRedo, setCanRedo] = useState(false);
//     const [isBold, setIsBold] = useState(false);
//     const [isItalic, setIsItalic] = useState(false);
//     const [isUnderline, setIsUnderline] = useState(false);
//     const [isCode, setIsCode] = useState(false);
//     const [codeLanguage, setCodeLanguage] = useState("javascript");
//     const [showCodeDropdown, setShowCodeDropdown] = useState(false);

//     useEffect(() => {
//         const undo = editor.registerCommand(
//             CAN_UNDO_COMMAND,
//             (payload) => {
//                 setCanUndo(payload);
//                 return false;
//             },
//             COMMAND_PRIORITY_CRITICAL
//         );
//         const redo = editor.registerCommand(
//             CAN_REDO_COMMAND,
//             (payload) => {
//                 setCanRedo(payload);
//                 return false;
//             },
//             COMMAND_PRIORITY_CRITICAL
//         );
//         const selection = editor.registerCommand(
//             SELECTION_CHANGE_COMMAND,
//             () => {
//                 editor.getEditorState().read(() => {
//                     const selection = $getSelection();
//                     if ($isRangeSelection(selection)) {
//                         setIsBold(selection.hasFormat("bold"));
//                         setIsItalic(selection.hasFormat("italic"));
//                         setIsUnderline(selection.hasFormat("underline"));
//                         setIsCode(selection.hasFormat("code"));
//                     }
//                 });
//                 return false;
//             },
//             COMMAND_PRIORITY_CRITICAL
//         );
//         return () => {
//             undo();
//             redo();
//             selection();
//         };
//     }, [editor]);

//     const applyHighlight = (color: string) => {
//         editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color);
//     };

//     const insertCodeBlock = (language = "javascript") => {
//         editor.update(() => {
//             const selection = $getSelection();
//             if ($isRangeSelection(selection)) {
//                 $setBlocksType(selection, () => $createCodeNode(language));
//             }
//         });
//         setShowCodeDropdown(false);
//     };

//     const insertHeading = (level: "h1" | "h2") => {
//         editor.update(() => {
//             const selection = $getSelection();
//             if ($isRangeSelection(selection)) {
//                 $setBlocksType(selection, () => $createHeadingNode(level));
//             }
//         });
//     };

//     const codeLanguages = [
//         "javascript", "typescript", "html", "css", "python", "java", "c", "cpp", "csharp", "php", "ruby", "go", "rust", "swift", "kotlin", "sql",
//     ];

//     return (
//         <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
//             {/* Undo/Redo */}
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? "opacity-30" : ""}`} disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}><Undo className="w-5 h-5" /></button>
//                 <button className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? "opacity-30" : ""}`} disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><Redo className="w-5 h-5" /></button>
//             </div>

//             {/* 인라인 코드 / 코드 블럭 토글 */}
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button className={`p-1 rounded hover:bg-gray-200 ${isCode ? "bg-gray-300" : ""}`} onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}><Code className="w-5 h-5" /></button>

//                 <button className="p-1 rounded hover:bg-blue-100 border text-blue-700 text-xs font-semibold border-blue-300" onClick={() => editor.dispatchCommand(TOGGLE_CODE_BLOCK_COMMAND, undefined)}>
//                     <Terminal className="w-4 h-4 inline mr-1" />
//                     토글
//                 </button>

//                 <div className="relative">
//                     <button className="p-1 rounded hover:bg-gray-200 flex items-center bg-blue-50 border border-blue-200" onClick={() => setShowCodeDropdown(!showCodeDropdown)}>
//                         <Terminal className="w-5 h-5 text-blue-600" />
//                         <span className="ml-1 text-xs text-blue-700 font-medium">{codeLanguage}</span>
//                         <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
//                     </button>
//                     {showCodeDropdown && (
//                         <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
//                             <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">언어 선택</div>
//                             {codeLanguages.map((lang) => (
//                                 <button key={lang} className={`block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm ${lang === codeLanguage ? "bg-blue-50 font-medium" : ""}`} onClick={() => { setCodeLanguage(lang); insertCodeBlock(lang); }}>
//                                     {lang}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Headings */}
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button onClick={() => insertHeading("h1")}><Heading1 className="w-5 h-5" /></button>
//                 <button onClick={() => insertHeading("h2")}><Heading2 className="w-5 h-5" /></button>
//             </div>

//             {/* Bold/Italic/Underline */}
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} className={isBold ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Bold className="w-5 h-5" /></button>
//                 <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} className={isItalic ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Italic className="w-5 h-5" /></button>
//                 <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} className={isUnderline ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Underline className="w-5 h-5" /></button>
//             </div>

//             {/* Highlight - 노란색만 */}
//             <div className="mr-2 border-r pr-2">
//                 <button
//                     type="button"
//                     className="p-1 rounded hover:bg-yellow-100 border border-yellow-300 bg-yellow-50 text-yellow-700"
//                     onClick={() => applyHighlight("#FFFF00")}
//                     title="형광펜"
//                 >
//                     <HighlighterIcon className="w-5 h-5" />
//                 </button>
//             </div>

//             {/* Align */}
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}><AlignLeft className="w-5 h-5" /></button>
//                 <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}><AlignCenter className="w-5 h-5" /></button>
//                 <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}><AlignRight className="w-5 h-5" /></button>
//             </div>

//             {/* Font size, color, background */}
//             <div className="flex items-center space-x-2">
//                 <div className="flex items-center">
//                     <Type className="w-4 h-4 mr-1 text-gray-500" />
//                     <select className="border rounded p-1 text-sm" defaultValue="16px" onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}>
//                         <option value="12px">12</option>
//                         <option value="14px">14</option>
//                         <option value="16px">16</option>
//                         <option value="18px">18</option>
//                         <option value="24px">24</option>
//                         <option value="32px">32</option>
//                     </select>
//                 </div>
//                 <label className="inline-flex items-center text-sm">글자색:
//                     <input type="color" defaultValue="#000000" className="ml-1 h-6 w-6 border-none" onChange={(e) => editor.dispatchCommand(TEXT_COLOR_COMMAND, e.target.value)} />
//                 </label>
//                 <label className="inline-flex items-center text-sm">배경색:
//                     <input type="color" defaultValue="#ffffff" className="ml-1 h-6 w-6 border-none" onChange={(e) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, e.target.value)} />
//                 </label>
//             </div>
//         </div>
//     );
// }

// src/components/rich-editor/LexicalEditor/ToolBar.tsx
"use client";

import React, { useState, useEffect } from "react";
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
} from "lexical";
import { $createCodeNode } from "@lexical/code";
import { $setBlocksType } from "@lexical/selection";
import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
import {
    Undo, Redo, Bold, Italic, Underline, Code, AlignLeft,
    AlignCenter, AlignRight, Heading1, Heading2, Terminal,
    ChevronDown, HighlighterIcon, Type
} from "lucide-react";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createPlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";

// Playground 코드 블록 노드

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
        return () => {
            undo();
            redo();
            selection();
        };
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

    const codeLanguages = ["javascript", "typescript", "html", "css", "python"];

    return (
        <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? "opacity-30" : ""}`} disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}><Undo className="w-5 h-5" /></button>
                <button className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? "opacity-30" : ""}`} disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><Redo className="w-5 h-5" /></button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <div className="relative">
                    <button className="p-1 rounded hover:bg-gray-200 flex items-center bg-blue-50 border border-blue-200" onClick={() => setShowCodeDropdown(!showCodeDropdown)}>
                        <Terminal className="w-5 h-5 text-blue-600" />
                        <span className="ml-1 text-xs text-blue-700 font-medium">{codeLanguage}</span>
                        <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
                    </button>
                    {showCodeDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
                            <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">언어 선택</div>
                            {codeLanguages.map((lang) => (
                                <button key={lang} className={`block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm ${lang === codeLanguage ? "bg-blue-50 font-medium" : ""}`} onClick={() => { setCodeLanguage(lang); insertCodeBlock(lang); }}>
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="p-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-200" onClick={insertPlaygroundBlock}>
                    Playground Block
                </button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button onClick={() => insertHeading("h1")}><Heading1 className="w-5 h-5" /></button>
                <button onClick={() => insertHeading("h2")}><Heading2 className="w-5 h-5" /></button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} className={isBold ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Bold className="w-5 h-5" /></button>
                <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} className={isItalic ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Italic className="w-5 h-5" /></button>
                <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} className={isUnderline ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Underline className="w-5 h-5" /></button>
            </div>

            <div className="mr-2 border-r pr-2">
                <button type="button" className="p-1 rounded hover:bg-yellow-100 border border-yellow-300 bg-yellow-50 text-yellow-700" onClick={() => applyHighlight("#FFFF00")} title="형광펜">
                    <HighlighterIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="flex space-x-1 mr-2 border-r pr-2">
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}><AlignLeft className="w-5 h-5" /></button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}><AlignCenter className="w-5 h-5" /></button>
                <button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}><AlignRight className="w-5 h-5" /></button>
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
        </div>
    );
}
