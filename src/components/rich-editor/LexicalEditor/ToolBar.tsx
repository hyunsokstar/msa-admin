// // src/components/rich-editor/LexicalEditor/ToolBar.tsx
// "use client";

// import React, { useState, useEffect, useRef } from "react";
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
//     $createTextNode,
//     $insertNodes,
// } from "lexical";
// import { $createCodeNode } from "@lexical/code";
// import { $setBlocksType } from "@lexical/selection";
// import { FONT_SIZE_COMMAND } from "./FontSizePlugin";
// import { TEXT_COLOR_COMMAND } from "./TextColorPlugin";
// import { BACKGROUND_COLOR_COMMAND } from "./BackgroundColorPlugin";
// import {
//     Undo, Redo, Bold, Italic, Underline, Code, AlignLeft,
//     AlignCenter, AlignRight, Heading1, Heading2, Terminal,
//     ChevronDown, HighlighterIcon, Type, ImageIcon, Link2
// } from "lucide-react";
// import { $createHeadingNode } from "@lexical/rich-text";
// import { $createPlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
// import { uploadFileToS3 } from "./uploadHelpers";
// import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
// import { TOGGLE_LINK_COMMAND } from "@lexical/link";
// import ColorPicker from "./ColorPicker";

// // ColorPicker 컴포넌트 정의 (같은 파일 내에 포함시키거나 별도 파일로 분리 가능)
// // 별도 파일로 분리했다면 이 부분은 제거하고 import 문만 사용

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
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         const undo = editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false; }, COMMAND_PRIORITY_CRITICAL);
//         const redo = editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false; }, COMMAND_PRIORITY_CRITICAL);
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
//         return () => { undo(); redo(); selection(); };
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

//     const insertPlaygroundBlock = () => {
//         editor.update(() => {
//             const selection = $getSelection();
//             if ($isRangeSelection(selection)) {
//                 $setBlocksType(selection, () => $createPlaygroundCodeBlockNode());
//             }
//         });
//     };

//     const insertHeading = (level: "h1" | "h2") => {
//         editor.update(() => {
//             const selection = $getSelection();
//             if ($isRangeSelection(selection)) {
//                 $setBlocksType(selection, () => $createHeadingNode(level));
//             }
//         });
//     };

//     const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             const url = await uploadFileToS3(file);
//             editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
//         }
//     };

//     const insertLink = () => {
//         const url = prompt("링크 URL을 입력하세요");
//         if (!url) return;
//         editor.update(() => {
//             const selection = $getSelection();
//             if ($isRangeSelection(selection) && !selection.isCollapsed()) {
//                 editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target: "_blank" });
//             } else {
//                 const textNode = $createTextNode(url);
//                 textNode.setFormat("underline");
//                 editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target: "_blank" });
//                 $insertNodes([textNode]);
//             }
//         });
//     };

//     const codeLanguages = ["javascript", "typescript", "html", "css", "python"];

//     return (
//         <div className="p-2 border-b bg-gray-100 flex items-center space-x-2 flex-wrap">
//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button type="button" className={`p-1 rounded hover:bg-gray-200 ${!canUndo ? "opacity-30" : ""}`} disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}><Undo className="w-5 h-5" /></button>
//                 <button type="button" className={`p-1 rounded hover:bg-gray-200 ${!canRedo ? "opacity-30" : ""}`} disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}><Redo className="w-5 h-5" /></button>
//             </div>

//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <div className="relative">
//                     <button type="button" className="p-1 rounded hover:bg-gray-200 flex items-center bg-blue-50 border border-blue-200" onClick={() => setShowCodeDropdown(!showCodeDropdown)}>
//                         <Terminal className="w-5 h-5 text-blue-600" />
//                         <span className="ml-1 text-xs text-blue-700 font-medium">{codeLanguage}</span>
//                         <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
//                     </button>
//                     {showCodeDropdown && (
//                         <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-48 overflow-y-auto z-10 w-40">
//                             <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">언어 선택</div>
//                             {codeLanguages.map((lang) => (
//                                 <button type="button" key={lang} className={`block w-full text-left px-3 py-1.5 hover:bg-gray-100 text-sm ${lang === codeLanguage ? "bg-blue-50 font-medium" : ""}`} onClick={() => { setCodeLanguage(lang); insertCodeBlock(lang); }}>
//                                     {lang}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//                 <button type="button" className="p-1 rounded border border-gray-300 text-gray-700 hover:bg-gray-200" onClick={insertPlaygroundBlock}>Playground Block</button>
//             </div>

//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button type="button" onClick={() => insertHeading("h1")}><Heading1 className="w-5 h-5" /></button>
//                 <button type="button" onClick={() => insertHeading("h2")}><Heading2 className="w-5 h-5" /></button>
//             </div>

//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} className={isBold ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Bold className="w-5 h-5" /></button>
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} className={isItalic ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Italic className="w-5 h-5" /></button>
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} className={isUnderline ? "bg-gray-300 p-1 rounded" : "p-1 rounded hover:bg-gray-200"}><Underline className="w-5 h-5" /></button>
//                 <button type="button" onClick={insertLink} className="p-1 rounded hover:bg-gray-200"><Link2 className="w-5 h-5" /></button>
//             </div>

//             <div className="mr-2 border-r pr-2">
//                 <button type="button" className="p-1 rounded hover:bg-yellow-100 border border-yellow-300 bg-yellow-50 text-yellow-700" onClick={() => applyHighlight("#FFFF00")} title="형광펜">
//                     <HighlighterIcon className="w-5 h-5" />
//                 </button>
//             </div>

//             <div className="flex space-x-1 mr-2 border-r pr-2">
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}><AlignLeft className="w-5 h-5" /></button>
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}><AlignCenter className="w-5 h-5" /></button>
//                 <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}><AlignRight className="w-5 h-5" /></button>
//             </div>

//             <div className="flex items-center space-x-2">
//                 <div className="flex items-center">
//                     <Type className="w-4 h-4 mr-1 text-gray-500" />
//                     <select className="border rounded p-1 text-sm" defaultValue="16px" onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}>
//                         <option value="12px">12</option>
//                         <option value="14px">14</option>
//                         <option value="16px">16</option>
//                         <option value="18px">18</option>
//                         <option value="20px">20</option>
//                         <option value="22px">22</option>
//                         <option value="24px">24</option>
//                         <option value="26px">26</option>
//                         <option value="28px">28</option>
//                         <option value="30px">30</option>
//                         <option value="32px">32</option>
//                         <option value="34px">34</option>
//                         <option value="36px">36</option>
//                     </select>
//                 </div>

//                 {/* 기존 색상 선택기를 ColorPicker 컴포넌트로 교체 */}
//                 <div className="flex items-center space-x-2">
//                     <ColorPicker
//                         initialColor="#000000"
//                         onChange={(color) => editor.dispatchCommand(TEXT_COLOR_COMMAND, color)}
//                         label="글자색"
//                     />
//                     <ColorPicker
//                         initialColor="#ffffff"
//                         onChange={(color) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color)}
//                         label="배경색"
//                     />
//                 </div>
//             </div>

//             <div className="ml-2">
//                 <button
//                     type="button"
//                     className="p-1 rounded border border-gray-300 bg-white hover:bg-gray-100 text-sm flex items-center"
//                     onClick={() => fileInputRef.current?.click()}
//                 >
//                     <ImageIcon className="w-5 h-5 mr-1 text-gray-700" /> 이미지 업로드
//                 </button>
//                 <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImageUpload}
//                 />
//             </div>
//         </div>
//     );
// }

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
    ChevronDown, HighlighterIcon, Type, ImageIcon, Link2,
    Eraser
} from "lucide-react";
import { $createHeadingNode } from "@lexical/rich-text";
import { $createPlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
import { uploadFileToS3 } from "./uploadHelpers";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import ColorPicker from "./ColorPicker";

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

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = await uploadFileToS3(file);
            editor.dispatchCommand(INSERT_IMAGE_COMMAND, url);
        }
    };

    const insertLink = () => {
        const url = prompt("URL 입력");
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

    // 버튼 스타일 간소화 - 공통 스타일
    const buttonBaseStyle = "p-1.5 rounded hover:bg-gray-200 transition-colors";
    const buttonActiveStyle = "bg-gray-300";
    const buttonIconStyle = "w-4 h-4";
    const sectionStyle = "flex space-x-1.5 mr-3 border-r pr-3"; // 섹션 간격 증가

    return (
        <div className="p-2 border-b bg-gray-100 flex flex-col gap-2">
            {/* 첫 번째 행 */}
            <div className="flex items-center space-x-3 flex-wrap">
                {/* 실행취소/다시실행 */}
                <div className={sectionStyle}>
                    <button type="button" className={`${buttonBaseStyle} ${!canUndo ? "opacity-30" : ""}`} disabled={!canUndo}
                        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} title="실행취소">
                        <Undo className={buttonIconStyle} />
                    </button>
                    <button type="button" className={`${buttonBaseStyle} ${!canRedo ? "opacity-30" : ""}`} disabled={!canRedo}
                        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} title="다시실행">
                        <Redo className={buttonIconStyle} />
                    </button>
                </div>

                {/* 코드 블록 */}
                <div className={sectionStyle}>
                    <div className="relative">
                        <button type="button" className={`${buttonBaseStyle} bg-blue-50 border border-blue-200 flex items-center`}
                            onClick={() => setShowCodeDropdown(!showCodeDropdown)} title="코드 블록">
                            <Terminal className={`${buttonIconStyle} text-blue-600`} />
                            <span className="ml-1 text-xs text-blue-700">{codeLanguage}</span>
                            <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />
                        </button>
                        {showCodeDropdown && (
                            <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded border border-gray-200 max-h-40 overflow-y-auto z-10 w-32">
                                <div className="sticky top-0 bg-gray-100 p-1 text-xs font-medium border-b">언어</div>
                                {codeLanguages.map((lang) => (
                                    <button type="button" key={lang}
                                        className={`block w-full text-left px-2 py-1 hover:bg-gray-100 text-xs ${lang === codeLanguage ? "bg-blue-50 font-medium" : ""}`}
                                        onClick={() => { setCodeLanguage(lang); insertCodeBlock(lang); }}>
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button type="button" className={`${buttonBaseStyle} text-xs border border-gray-300`}
                        onClick={insertPlaygroundBlock} title="실행 블록">
                        코드 블록
                    </button>
                </div>

                {/* 헤딩 */}
                <div className={sectionStyle}>
                    <button type="button" onClick={() => insertHeading("h1")} title="제목 1" className={buttonBaseStyle}>
                        <Heading1 className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={() => insertHeading("h2")} title="제목 2" className={buttonBaseStyle}>
                        <Heading2 className={buttonIconStyle} />
                    </button>
                </div>

                {/* 서식 */}
                <div className={sectionStyle}>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
                        className={`${buttonBaseStyle} ${isBold ? buttonActiveStyle : ""}`} title="굵게">
                        <Bold className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                        className={`${buttonBaseStyle} ${isItalic ? buttonActiveStyle : ""}`} title="기울임">
                        <Italic className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                        className={`${buttonBaseStyle} ${isUnderline ? buttonActiveStyle : ""}`} title="밑줄">
                        <Underline className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={insertLink} className={buttonBaseStyle} title="링크">
                        <Link2 className={buttonIconStyle} />
                    </button>
                </div>

                {/* 형광펜 - 독립 버튼으로 변경 */}
                {/* 형광펜 - 통일된 디자인 */}
                <div className={sectionStyle}>
                    <button type="button"
                        className={`${buttonBaseStyle} text-yellow-700`}
                        style={{ backgroundColor: "#FFFFCC", borderColor: "#FFEB3B" }}
                        onClick={() => applyHighlight("#FFFF00")}
                        title="노란 형광펜">
                        <HighlighterIcon className={buttonIconStyle} />
                    </button>
                    <button type="button"
                        className={`${buttonBaseStyle} text-orange-700`}
                        style={{ backgroundColor: "#FFE0B2", borderColor: "#FF9800" }}
                        onClick={() => applyHighlight("#FFB74D")}
                        title="주황 형광펜">
                        <HighlighterIcon className={buttonIconStyle} />
                    </button>
                    <button type="button"
                        className={`${buttonBaseStyle} text-gray-400 border border-gray-300`}
                        style={{ backgroundColor: "#FFFFFF" }}
                        onClick={() => applyHighlight("transparent")}
                        title="형광펜 지우기">
                        <HighlighterIcon className={buttonIconStyle} />
                    </button>
                </div>

                {/* 정렬 */}
                <div className={sectionStyle}>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
                        className={buttonBaseStyle} title="왼쪽 정렬">
                        <AlignLeft className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
                        className={buttonBaseStyle} title="가운데 정렬">
                        <AlignCenter className={buttonIconStyle} />
                    </button>
                    <button type="button" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
                        className={buttonBaseStyle} title="오른쪽 정렬">
                        <AlignRight className={buttonIconStyle} />
                    </button>
                </div>
            </div>

            {/* 두 번째 행 */}
            <div className="flex items-center space-x-3">
                {/* 글자 크기 및 색상 */}
                <div className="flex items-center space-x-3 mr-3 border-r pr-3">
                    <div className="flex items-center">
                        <Type className="w-3.5 h-3.5 mr-1 text-gray-500" />
                        <select className="border rounded p-1 text-xs" defaultValue="16px"
                            onChange={(e) => editor.dispatchCommand(FONT_SIZE_COMMAND, e.target.value)}>
                            <option value="12px">12</option>
                            <option value="14px">14</option>
                            <option value="16px">16</option>
                            <option value="18px">18</option>
                            <option value="20px">20</option>
                            <option value="24px">24</option>
                            <option value="30px">30</option>
                            <option value="36px">36</option>
                        </select>
                    </div>
                </div>

                {/* 색상 선택기 */}
                <div className="flex items-center space-x-2 mr-4 border-r pr-3">
                    <ColorPicker
                        initialColor="#000000"
                        onChange={(color) => editor.dispatchCommand(TEXT_COLOR_COMMAND, color)}
                        label="색상"
                    />
                    <ColorPicker
                        initialColor="#ffffff"
                        onChange={(color) => editor.dispatchCommand(BACKGROUND_COLOR_COMMAND, color)}
                        label="배경"
                    />
                </div>

                {/* 이미지 업로드 */}
                <div>
                    <button
                        type="button"
                        className={`${buttonBaseStyle} border border-gray-300 bg-white text-xs flex items-center`}
                        onClick={() => fileInputRef.current?.click()}
                        title="이미지 업로드"
                    >
                        <ImageIcon className="w-4 h-4 mr-1 text-gray-700" /> 이미지
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
        </div>
    );
}