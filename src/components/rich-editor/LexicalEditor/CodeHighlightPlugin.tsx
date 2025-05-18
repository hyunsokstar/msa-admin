// src/components/rich-editor/LexicalEditor/CodeHighlightPlugin.tsx
"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode } from "lexical";
import { CodeNode, CodeHighlightNode, registerCodeHighlighting } from "@lexical/code";
import { COMMAND_PRIORITY_LOW } from "lexical";
import Prism from "prismjs";

// 필요한 PrismJS 언어 로드
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";

export function CodeHighlightPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Create a wrapper for Prism that satisfies the Tokenizer interface
        const prismTokenizer = {
            ...Prism,
            defaultLanguage: 'javascript',
            tokenize: (code: string, language?: string) => {
                return Prism.tokenize(code, Prism.languages[language || 'javascript'] || Prism.languages.javascript);
            }
        };

        return registerCodeHighlighting(editor, prismTokenizer);
    }, [editor]);

    return null;
}