// // src/components/rich-editor/LexicalEditor/index.tsx
// "use client";

// import React, { useCallback, useRef, useEffect } from "react";
// import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
// import { ContentEditable } from "@lexical/react/LexicalContentEditable";
// import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
// import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
// import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
// import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
// import { $getRoot, $createParagraphNode } from "lexical";

// // 수정된 임포트
// import { CodeNode, CodeHighlightNode } from "@lexical/code";
// import { ListNode, ListItemNode } from "@lexical/list";
// import { HeadingNode, QuoteNode } from "@lexical/rich-text";
// import { ListPlugin } from "@lexical/react/LexicalListPlugin"; // 리스트 플러그인 유지

// // 커스텀 노드 및 플러그인 임포트
// import { CustomTextNode } from "./CustomTextNode";
// import { FontSizePlugin } from "./FontSizePlugin";
// import { TextColorPlugin } from "./TextColorPlugin";
// import { BackgroundColorPlugin } from "./BackgroundColorPlugin";
// import { ImagePlugin } from "./ImagePlugin";
// import ImageUploadPlugin from "./ImageUploadPlugin";
// import { ImageNode } from "./ImageNode";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// import Toolbar from "./ToolBar";
// import { CodeHighlightPlugin } from "./CodeHighlightPlugin";

// // 초기 콘텐츠 로드 플러그인
// function InitialContentPlugin({ initialContent }: { initialContent: string }) {
//   const [editor] = useLexicalComposerContext();
//   const initializedRef = useRef(false);

//   useEffect(() => {
//     if (initializedRef.current || !initialContent || initialContent.trim() === '') return;

//     const timer = setTimeout(() => {
//       try {
//         const initialState = JSON.parse(initialContent);
//         editor.setEditorState(editor.parseEditorState(initialState));
//         initializedRef.current = true;
//       } catch (error) {
//         console.error('Error parsing initial content:', error);
//         editor.update(() => {
//           const root = $getRoot();
//           if (root.getFirstChild() === null) {
//             const paragraph = $createParagraphNode();
//             root.append(paragraph);
//           }
//         });
//         initializedRef.current = true;
//       }
//     }, 50);

//     return () => clearTimeout(timer);
//   }, [editor, initialContent]);

//   return null;
// }

// interface Props {
//   content: string;
//   onChange: (json: string) => void;
//   disabled?: boolean;
// }

// export default function LexicalEditor({
//   content,
//   onChange,
//   disabled = false,
// }: Props) {
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

//   const initialConfig = {
//     namespace: "MyEditor",
//     editable: !disabled,
//     onError: (error: Error) => console.error(error),
//     theme: {
//       code: "bg-gray-100 font-mono p-2 rounded my-2",
//       codeHighlight: {
//         atrule: 'text-blue-500',
//         attr: 'text-blue-500',
//         boolean: 'text-red-500',
//         builtin: 'text-green-500',
//         cdata: 'text-gray-500',
//         char: 'text-green-500',
//         class: 'text-blue-500',
//         'class-name': 'text-blue-500',
//         comment: 'text-gray-500 italic',
//         constant: 'text-purple-500',
//         deleted: 'text-red-500',
//         doctype: 'text-gray-500',
//         entity: 'text-yellow-500',
//         function: 'text-green-500',
//         important: 'text-red-500',
//         inserted: 'text-green-500',
//         keyword: 'text-purple-500',
//         namespace: 'text-yellow-500',
//         number: 'text-red-500',
//         operator: 'text-purple-500',
//         prolog: 'text-gray-500',
//         property: 'text-blue-500',
//         punctuation: 'text-gray-500',
//         regex: 'text-yellow-500',
//         selector: 'text-blue-500',
//         string: 'text-green-500',
//         symbol: 'text-purple-500',
//         tag: 'text-blue-500',
//         url: 'text-blue-500',
//         variable: 'text-yellow-500',
//       },
//     },
//     nodes: [
//       CustomTextNode,
//       ImageNode,
//       CodeNode,
//       CodeHighlightNode,
//       HeadingNode,
//       QuoteNode,
//       ListNode,
//       ListItemNode
//     ],
//   };

//   return (
//     <LexicalComposer initialConfig={initialConfig}>
//       {/* 툴바 컴포넌트 */}
//       <div className="toolbar-container" key="toolbar-container">
//         <Toolbar />
//       </div>

//       {/* 초기 컨텐츠 */}
//       <InitialContentPlugin initialContent={content} />

//       {/* 플러그인 */}
//       <FontSizePlugin />
//       <TextColorPlugin />
//       <BackgroundColorPlugin />
//       <ImagePlugin />
//       <ImageUploadPlugin />
//       <CodeHighlightPlugin />
//       <ListPlugin /> {/* 리스트 플러그인 유지 (필요하므로) */}

//       {/* 에디터 본문 */}
//       <div className="border border-gray-300 rounded relative min-h-[200px] p-3">
//         <RichTextPlugin
//           contentEditable={<ContentEditable className="outline-none prose prose-sm max-w-none" />}
//           placeholder={
//             <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
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
import { LexicalComposer } from "@lexical/react/LexicalComposer";
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
    const style = document.createElement('style');
    style.innerHTML = `
      .editor-content-area {
        max-height: 500px;
        overflow-y: auto;
        position: relative;
        scroll-padding-top: 24px;
      }
      .editor-content-area::before {
        content: '';
        display: block;
        height: 32px;
      }
      .ContentEditable__root {
        padding: 24px 12px 12px 12px;
        min-height: 200px;
        scroll-margin-top: 24px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
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
      PlaygroundCodeBlockNode
    ],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="toolbar-container sticky top-0 z-10 bg-gray-100">
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

      <div className="border border-gray-300 rounded relative min-h-[200px] editor-content-area">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none prose prose-sm max-w-none ContentEditable__root" />
          }
          placeholder={
            <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
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
