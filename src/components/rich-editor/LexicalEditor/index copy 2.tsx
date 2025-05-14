"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Image as TiptapImage } from "@tiptap/extension-image";
import ResizeImage from "tiptap-extension-resize-image";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { FontSize } from "./extensions/FontSize";
import { FontFamily } from "./extensions/FontFamily";
import { FontColor } from "./extensions/FontColor";
import Video from "./extensions/Video";
import Youtube from "@tiptap/extension-youtube";
import TiptapBubbleMenu from './TiptapBubbleMenu';
import Paragraph from '@tiptap/extension-paragraph';
import HardBreak from '@tiptap/extension-hard-break';
import Text from '@tiptap/extension-text';
import Document from '@tiptap/extension-document';
import { FigmaEmbed } from './extensions/FigmaEmbed';
import React, { useState } from "react";
import TiptapToolbar from "./TiptapToolbar";
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
// import CustomPasteHandler from "./CustomPasteHandler";
import CodeBlock from "@tiptap/extension-code-block";

// 화이트스페이스 보존을 위한 사용자 지정 확장
const PreserveWhitespace = Extension.create({
  name: 'preserveWhitespace',

  addGlobalAttributes() {
    return [
      {
        types: ['codeBlock'],
        attributes: {
          preserveWhitespace: {
            default: 'pre',
            parseHTML: () => 'pre',
            renderHTML: () => ({ style: 'white-space: pre !important;' }),
          },
        },
      },
    ];
  },
});

// 코드 블록 노드 장식을 위한 플러그인
const WhitespacePreservePlugin = new Plugin({
  key: new PluginKey('whitespacePreserve'),
  props: {
    decorations(state) {
      const { doc } = state;
      const decorations = [];

      doc.descendants((node, pos) => {
        if (node.type.name === 'codeBlock') {
          decorations.push(
            Decoration.node(pos, pos + node.nodeSize, {
              style: 'white-space: pre !important; tab-size: 2;'
            })
          );
        }
      });

      return DecorationSet.create(doc, decorations);
    },
  },
});

const uploadImageToS3 = async (file: File): Promise<string | null> => {
  try {
    const metadataResponse = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!metadataResponse.ok) throw new Error("Failed to get presigned URL from server");

    const { presignedUrl, fileUrl } = await metadataResponse.json();

    await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    return fileUrl;
  } catch (error) {
    console.error("Error during image upload process:", error);
    return null;
  }
};

const ImagePasteHandler = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event, slice) => {
            const items = event.clipboardData?.items;
            if (!items) return false;

            for (const item of items) {
              if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
                if (file) {
                  view.dom.dispatchEvent(new CustomEvent("image-upload-start"));
                  uploadImageToS3(file).then(imageUrl => {
                    view.dom.dispatchEvent(new CustomEvent("image-upload-end"));
                    if (imageUrl) {
                      // 이미지 URL을 사용하여 이미지 노드 삽입
                      const { state } = view;
                      const pos = state.selection.from;
                      const node = state.schema.nodes.image.create({ src: imageUrl });
                      const transaction = state.tr.insert(pos, node);
                      view.dispatch(transaction);
                    }
                  });
                  return true;
                }
              }
            }
            return false;
          },
        },
      }),
    ];
  },
});

// 사용자 정의 코드 블록 확장
const CustomCodeBlock = CodeBlock.extend({
  addKeyboardShortcuts() {
    return {
      ...this.parent?.(),
      Tab: ({ editor }) => {
        if (editor.isActive('codeBlock')) {
          editor.commands.insertContent('\t');
          return true;
        }
        return false;
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste(view, event) {
            if (!view.state.selection.$from.parent.type.spec.code) {
              return false;
            }

            const text = event.clipboardData?.getData('text/plain');
            if (text) {
              view.dispatch(view.state.tr.insertText(text));
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  disabled?: boolean;
}

const TiptapEditor = ({ content, onChange, disabled = false }: TiptapEditorProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      HardBreak,
      TextStyle,
      FontColor,
      Highlight.configure({ multicolor: true }),
      FontSize.configure({ types: ["textStyle"] }),
      FontFamily.configure({ types: ["textStyle"], defaultFamily: "sans-serif" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      ImagePasteHandler.configure({ inline: true }),
      ResizeImage.configure({ allowBase64: false }),
      HorizontalRule,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-blue-500 hover:underline",
          rel: "noopener noreferrer nofollow",
          target: "_blank",
        },
      }),
      Video,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Youtube.configure({
        controls: true,
        nocookie: true,
        width: 640,
        height: 360,
      }),
      FigmaEmbed,
      // 화이트스페이스 보존 확장
      PreserveWhitespace,
      // 플러그인 추가 확장
      Extension.create({
        name: 'whitespacePlugin',
        addProseMirrorPlugins() {
          return [WhitespacePreservePlugin];
        },
      }),
      // 커스텀 코드 블록 확장
      CustomCodeBlock.configure({
        HTMLAttributes: {
          class: 'code-block',
          preserveWhitespace: 'pre',
        },
        languageClassPrefix: 'language-',
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
      }),
    ],
    content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("📌 저장할 HTML:", html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: "w-full min-h-[300px] p-4 focus:outline-none border border-gray-200 rounded-md prose-pre:whitespace-pre",
      },
      transformPastedText: (text) => text, // 붙여넣은 텍스트 그대로 유지
      transformPastedHTML: (html) => html, // 붙여넣은 HTML 그대로 유지
      handlePaste: (view, event, slice) => {
        const { state } = view;
        const { selection } = state;
        const { $from } = selection;

        // 코드 블록 내에서 붙여넣기
        if ($from.parent.type.spec.code) {
          const text = event.clipboardData?.getData('text/plain');
          if (text) {
            view.dispatch(state.tr.insertText(text));
            return true;
          }
        }

        return false;
      },
      handleKeyDown: (view, event) => {
        // 코드 블록 내에서 탭 처리
        if (event.key === 'Tab' && view.state.selection.$from.parent.type.spec.code) {
          event.preventDefault();
          view.dispatch(view.state.tr.insertText('\t'));
          return true;
        }

        return false;
      },
    },
  });

  const addImage = (size?: { width: number; height: number }) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (file) {
        try {
          const imageUrl = await uploadImageToS3(file);
          if (imageUrl && editor) {
            const attributes = size
              ? {
                src: imageUrl,
                width: size.width,
                height: size.height,
                style: `width: ${size.width}px; height: ${size.height}px;`,
              }
              : { src: imageUrl };

            editor.commands.setImage(attributes);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    };

    fileInput.click();
  };

  React.useEffect(() => {
    if (!editor) return;

    const handleUploadStart = () => setIsUploading(true);
    const handleUploadEnd = () => setIsUploading(false);

    editor.view.dom.addEventListener("image-upload-start", handleUploadStart);
    editor.view.dom.addEventListener("image-upload-end", handleUploadEnd);

    return () => {
      editor.view.dom.removeEventListener("image-upload-start", handleUploadStart);
      editor.view.dom.removeEventListener("image-upload-end", handleUploadEnd);
    };
  }, [editor]);

  // CSS 스타일 추가
  React.useEffect(() => {
    // 코드 블록 스타일링을 위한 스타일 요소 생성
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .ProseMirror pre {
        white-space: pre !important;
        tab-size: 2;
      }
      .ProseMirror code {
        white-space: pre !important;
        font-family: monospace;
      }
      .code-block {
        white-space: pre !important;
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        background-color: #f5f5f5;
        padding: 1em;
        border-radius: 4px;
        tab-size: 2;
        -moz-tab-size: 2;
      }
    `;

    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-220px)] bg-white shadow-md rounded-md relative">
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center text-gray-700 font-semibold text-lg z-50">
          이미지 업로드 중...
        </div>
      )}

      {editor && (
        <>
          <TiptapToolbar editor={editor} addImage={addImage} />
          <TiptapBubbleMenu editor={editor} />
        </>
      )}
      <div
        className="flex-1 relative border-t bg-white overflow-y-auto rounded-b-md"
        onClick={() => editor?.commands.focus()}
      >
        <EditorContent
          editor={editor}
          className="w-full h-full p-4 [&_.ProseMirror]:caret-blue-500 [&_.ProseMirror]:caret-2 [&_.editor-image]:outline-2 [&_.editor-image]:outline-transparent hover:[&_.editor-image]:outline-blue-500 [&_.ProseMirror_pre]:whitespace-pre [&_.ProseMirror_code]:whitespace-pre"
        />
      </div>
    </div>
  );
};

export default TiptapEditor;