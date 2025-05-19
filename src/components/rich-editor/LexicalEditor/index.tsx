// // src/components/rich-editor/LexicalEditor/index.tsx
// "use client";

// import React, { useCallback, useRef, useEffect } from "react";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { $getRoot, $createParagraphNode } from "lexical";

// import { CodeNode, CodeHighlightNode } from "@lexical/code";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin";

// import { CustomTextNode } from "./CustomTextNode";
// import { FontSizePlugin } from "./FontSizePlugin";
// import { TextColorPlugin } from "./TextColorPlugin";
// import { BackgroundColorPlugin } from "./BackgroundColorPlugin";
// import { ImagePlugin } from "./ImagePlugin";
// import ImageUploadPlugin from "./ImageUploadPlugin";
// import { ImageNode } from "./ImageNode";
// import Toolbar from "./ToolBar";
// import { CodeHighlightPlugin } from "./CodeHighlightPlugin";
// import { codeHighlightTheme } from "./codeHighlightTheme";

// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { PlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
// import { AutoLinkNode, LinkNode } from "@lexical/link";
// import { LinkDecoratorNode } from "./LinkDecoratorNode";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import NodeKeyAttributesPlugin from "./decorator/NodeKeyAttributesPlugin";
// import SimpleDraggableBlockPlugin from "./plugin/SimpleDraggableBlockPlugin";

// function InitialContentPlugin({ initialContent }: { initialContent: string }) {
//   const [editor] = useLexicalComposerContext();
//   const initializedRef = useRef(false);

//   useEffect(() => {
//     if (initializedRef.current || !initialContent || initialContent.trim() === '') return;

//     queueMicrotask(() => {
//       try {
//         const initialState = JSON.parse(initialContent);
//         editor.setEditorState(editor.parseEditorState(initialState));
//       } catch (error) {
//         console.error('Error parsing initial content:', error);
//         editor.update(() => {
//           const root = $getRoot();
//           if (root.getFirstChild() === null) {
//             root.append($createParagraphNode());
//           }
//         });
//       }
//       initializedRef.current = true;
//     });
//   }, [editor, initialContent]);

//   return null;
// }

// interface Props {
//   content: string;
//   onChange: (json: string) => void;
//   disabled?: boolean;
// }

// export default function LexicalEditor({ content, onChange, disabled = false }: Props) {
//   const historyRef = useRef<any>(null);
//   const isInitialMount = useRef(true);

//   const handleChange = useCallback(
//     (editorState: any) => {
//       if (isInitialMount.current) {
//         isInitialMount.current = false;
//         return;
//       }
//       editorState.read(() => {
//         onChange(JSON.stringify(editorState.toJSON()));
//       });
//     },
//     [onChange]
//   );

//   useEffect(() => {
//     // 고유 ID를 가진 스타일 태그 사용
//     const styleId = 'lexical-editor-styles';
//     let style = document.getElementById(styleId) as HTMLStyleElement;

//     // 스타일 태그가 없으면 생성
//     if (!style) {
//       style = document.createElement('style');
//       style.id = styleId;
//       style.innerHTML = `
//       .editor-content-area {
//         max-height: calc(80vh - 200px);
//         overflow-y: auto;
//         position: relative;
//         padding-bottom: 30px; /* 버튼과 콘텐츠 사이 여백 확보 */
//         padding-left: 0px; /* 왼쪽 여백 추가 */
//       }

//       .ContentEditable__root {
//         position: relative;
//         padding: 8px 16px 8px 60px; /* 왼쪽 패딩 증가 */
//         min-height: 150px;
//         line-height: 1.5;
//         outline: none;
//       }

//       /* 줄 간격 조정 */
//       .ContentEditable__root p {
//         margin-bottom: 0.5em;
//         position: relative;
//         margin-left: 20px; /* 텍스트 왼쪽 여백 추가 */
//       }
//       .ContentEditable__root h1 {
//         margin-top: 0.8em;
//         margin-bottom: 0.5em;
//         margin-left: 20px; /* 텍스트 왼쪽 여백 추가 */
//       }
//       .ContentEditable__root h2 {
//         margin-top: 0.7em;
//         margin-bottom: 0.5em;
//         margin-left: 20px; /* 텍스트 왼쪽 여백 추가 */
//       }

//       /* 코드 블록 스타일 개선 */
//       .ContentEditable__root pre {
//         padding: 0.8em;
//         margin: 0.8em 0 0.8em 20px; /* 왼쪽 여백 추가 */
//         border-radius: 6px;
//       }

//       /* 목록 항목 간격 */
//       .ContentEditable__root ul,
//       .ContentEditable__root ol {
//         margin-left: 20px; /* 목록 왼쪽 여백 추가 */
//       }

//       .ContentEditable__root ul li,
//       .ContentEditable__root ol li {
//         margin-bottom: 0.3em;
//       }

//       /* 버튼 스타일 */
//       .draggable-block-menu {
//         transition: opacity 0.2s ease;
//       }

//       .draggable-block-menu:hover {
//         opacity: 1 !important;
//       }

//       /* 버튼 호버 효과 */
//       .add-block-button:hover,
//       .move-up-button:hover,
//       .move-down-button:hover {
//         background: #e6f0ff !important;
//         color: #3b82f6 !important;
//         border-color: #3b82f6 !important;
//       }

//       /* 왼쪽 여백 스타일 */
//       .editor-left-margin {
//         transition: background-color 0.3s;
//         position: absolute;
//         left: 0;
//         width: 10px; /* 여백 너비 설정 */
//         height: 100%;
//         background-color: #fafafa;
//       }

//       .editor-left-margin:hover {
//         background-color: #f0f0f0;
//       }

//       /* 선택된 노드 스타일 */
//       [data-lexical-node-key].selected {
//         background-color: rgba(59, 130, 246, 0.05);
//       }

//       /* 플레이스홀더 개선 */
//       .editor-placeholder {
//         color: #aaa;
//         overflow: hidden;
//         position: absolute;
//         text-overflow: ellipsis;
//         top: 8px;
//         left: 80px; /* 왼쪽 위치 조정 */
//         font-size: 15px;
//         user-select: none;
//         display: inline-block;
//         pointer-events: none;
//       }

//       /* 툴바 고정 위치 설정 */
//       .toolbar-container {
//         position: sticky;
//         top: 0;
//         z-index: 10;
//         background-color: white;
//         border-bottom: 1px solid #e5e7eb;
//         box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
//       }
//     `;
//       document.head.appendChild(style);
//     }

//     // 언마운트될 때 안전하게 제거
//     return () => {
//       const styleToRemove = document.getElementById(styleId);
//       if (styleToRemove && styleToRemove.parentNode === document.head) {
//         document.head.removeChild(styleToRemove);
//       }
//     };
//   }, []);

//   const initialConfig = {
//     namespace: "MyEditor",
//     editable: !disabled,
//     onError: (error: Error) => console.error(error),
//     theme: codeHighlightTheme,
//     nodes: [
//       CustomTextNode,
//       ImageNode,
//       CodeNode,
//       CodeHighlightNode,
//       HeadingNode,
//       QuoteNode,
//       ListNode,
//       ListItemNode,
//       PlaygroundCodeBlockNode,
//       LinkNode,
//       AutoLinkNode,
//       LinkDecoratorNode
//     ],
//   };

//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       <div className="toolbar-container sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
//         <Toolbar />
//       </div>

//       <InitialContentPlugin initialContent={content} />

//       <FontSizePlugin />
//       <TextColorPlugin />
//       <BackgroundColorPlugin />
//       <ImagePlugin />
//       <ImageUploadPlugin />
//       <CodeHighlightPlugin />
//       <ListPlugin />
//       <NodeKeyAttributesPlugin />
//       <SimpleDraggableBlockPlugin />

//       <div className="border border-gray-300 rounded relative min-h-[200px] editor-content-area">
//         <RichTextPlugin
//           contentEditable={
//             <ContentEditable className="outline-none prose prose-sm max-w-none ContentEditable__root" />
//           }
//           placeholder={
//             <div className="editor-placeholder">
//               내용을 입력하세요...
//             </div>
//           }
//           ErrorBoundary={LexicalErrorBoundary}
//         />
//         <HistoryPlugin externalHistoryState={historyRef.current} />
//         <OnChangePlugin onChange={handleChange} />
//         <AutoFocusPlugin />
//       </div>
//     </LexicalComposer>
//   );
// }

// src/components/rich-editor/LexicalEditor/index.tsx
"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $createParagraphNode } from "lexical";

import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { CustomTextNode } from "./CustomTextNode";
import { FontSizePlugin } from "./FontSizePlugin";
import { TextColorPlugin } from "./TextColorPlugin";
import { BackgroundColorPlugin } from "./BackgroundColorPlugin";
import { ImagePlugin } from "./ImagePlugin";
import ImageUploadPlugin from "./ImageUploadPlugin";
import { ImageNode } from "./ImageNode";
import Toolbar from "./ToolBar";
import { CodeHighlightPlugin } from "./CodeHighlightPlugin";
import { codeHighlightTheme } from "./codeHighlightTheme";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PlaygroundCodeBlockNode } from "./PlaygroundCodeBlockNode";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkDecoratorNode } from "./LinkDecoratorNode";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import NodeKeyAttributesPlugin from "./decorator/NodeKeyAttributesPlugin";
import SimpleDraggableBlockPlugin from "./plugin/SimpleDraggableBlockPlugin";

function InitialContentPlugin({ initialContent }: { initialContent: string }) {
  const [editor] = useLexicalComposerContext();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !initialContent || initialContent.trim() === '') return;

    queueMicrotask(() => {
      try {
        const initialState = JSON.parse(initialContent);
        editor.setEditorState(editor.parseEditorState(initialState));
      } catch (error) {
        console.error('Error parsing initial content:', error);
        editor.update(() => {
          const root = $getRoot();
          if (root.getFirstChild() === null) {
            root.append($createParagraphNode());
          }
        });
      }
      initializedRef.current = true;
    });
  }, [editor, initialContent]);

  return null;
}

interface Props {
  content: string;
  onChange: (json: string) => void;
  disabled?: boolean;
}

export default function LexicalEditor({ content, onChange, disabled = false }: Props) {
  const historyRef = useRef<any>(null);
  const isInitialMount = useRef(true);

  const handleChange = useCallback(
    (editorState: any) => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
      }
      editorState.read(() => {
        onChange(JSON.stringify(editorState.toJSON()));
      });
    },
    [onChange]
  );

  useEffect(() => {
    // 고유 ID를 가진 스타일 태그 사용
    const styleId = 'lexical-editor-styles';
    let style = document.getElementById(styleId) as HTMLStyleElement;

    // 스타일 태그가 없으면 생성
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
      .editor-content-area {
        max-height: calc(80vh - 200px);
        overflow-y: auto;
        position: relative;
        padding-bottom: 30px; /* 버튼과 콘텐츠 사이 여백 확보 */
        padding-left: 0px; /* 왼쪽 여백 */
      }
      
      .ContentEditable__root {
        position: relative;
        padding: 8px 16px 8px 40px; /* 왼쪽 패딩 */
        min-height: 150px;
        line-height: 1.5;
        outline: none;
      }
      
      /* 줄 간격 조정 */
      .ContentEditable__root p {
        margin-bottom: 0.5em;
        position: relative;
        margin-left: 20px; /* 텍스트 왼쪽 여백 */
      }
      .ContentEditable__root h1 {
        margin-top: 0.8em;
        margin-bottom: 0.5em;
        margin-left: 20px; /* 텍스트 왼쪽 여백 */
      }
      .ContentEditable__root h2 {
        margin-top: 0.7em;
        margin-bottom: 0.5em;
        margin-left: 20px; /* 텍스트 왼쪽 여백 */
      }
      
      /* 코드 블록 스타일 개선 */
      .ContentEditable__root pre {
        padding: 0.8em;
        margin: 0.8em 0 0.8em 20px; /* 왼쪽 여백 */
        border-radius: 6px;
      }
      
      /* 목록 항목 간격 */
      .ContentEditable__root ul,
      .ContentEditable__root ol {
        margin-left: 20px; /* 목록 왼쪽 여백 */
      }
      
      .ContentEditable__root ul li,
      .ContentEditable__root ol li {
        margin-bottom: 0.3em;
      }
      
      /* 버튼 스타일 */
      .draggable-block-menu {
        transition: opacity 0.2s ease;
      }
      
      .draggable-block-menu:hover {
        opacity: 1 !important;
      }
      
      /* 버튼 호버 효과 */
      .add-block-button:hover,
      .drag-handle-button:hover {
        background: #e6f0ff !important;
        color: #3b82f6 !important;
        border-color: #3b82f6 !important;
      }
      
      /* 왼쪽 여백 스타일 */
      .editor-left-margin {
        transition: background-color 0.3s;
        position: absolute;
        left: 0;
        width: 10px; /* 여백 너비 설정 */
        height: 100%;
        background-color: #fafafa;
      }
      
      .editor-left-margin:hover {
        background-color: #f0f0f0;
      }
      
      /* 선택된 노드 스타일 */
      [data-lexical-node-key].selected {
        background-color: rgba(59, 130, 246, 0.05);
      }
      
      /* 드래그 중인 노드 스타일 */
      [data-lexical-node-key].dragging {
        opacity: 0.5 !important;
        background-color: rgba(59, 130, 246, 0.05) !important;
        outline: 1px dashed #3b82f6 !important;
      }
      
      /* 드롭 라인 스타일 */
      .editor-drop-line {
        position: absolute;
        left: 0;
        right: 0;
        height: 3px;
        background-color: #3b82f6;
        z-index: 30;
        pointer-events: none;
        box-shadow: 0 1px 3px rgba(59, 130, 246, 0.7);
      }
      
      /* 플레이스홀더 개선 */
      .editor-placeholder {
        color: #aaa;
        overflow: hidden;
        position: absolute;
        text-overflow: ellipsis;
        top: 8px;
        left: 60px; /* 왼쪽 위치 조정 */
        font-size: 15px;
        user-select: none;
        display: inline-block;
        pointer-events: none;
      }
      
      /* 툴바 고정 위치 설정 */
      .toolbar-container {
        position: sticky;
        top: 0;
        z-index: 10;
        background-color: white;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    `;
      document.head.appendChild(style);
    }

    // 언마운트될 때 안전하게 제거
    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove && styleToRemove.parentNode === document.head) {
        document.head.removeChild(styleToRemove);
      }
    };
  }, []);

  const initialConfig = {
    namespace: "MyEditor",
    editable: !disabled,
    onError: (error: Error) => console.error(error),
    theme: codeHighlightTheme,
    nodes: [
      CustomTextNode,
      ImageNode,
      CodeNode,
      CodeHighlightNode,
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      PlaygroundCodeBlockNode,
      LinkNode,
      AutoLinkNode,
      LinkDecoratorNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="toolbar-container sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
        <Toolbar />
      </div>

      <InitialContentPlugin initialContent={content} />

      <FontSizePlugin />
      <TextColorPlugin />
      <BackgroundColorPlugin />
      <ImagePlugin />
      <ImageUploadPlugin />
      <CodeHighlightPlugin />
      <ListPlugin />
      <NodeKeyAttributesPlugin />
      <SimpleDraggableBlockPlugin />

      <div className="border border-gray-300 rounded relative min-h-[200px] editor-content-area">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none prose prose-sm max-w-none ContentEditable__root" />
          }
          placeholder={
            <div className="editor-placeholder">
              내용을 입력하세요...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin externalHistoryState={historyRef.current} />
        <OnChangePlugin onChange={handleChange} />
        <AutoFocusPlugin />
      </div>
    </LexicalComposer>
  );
}