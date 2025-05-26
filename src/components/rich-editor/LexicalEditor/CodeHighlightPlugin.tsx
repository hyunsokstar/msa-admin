"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { TextNode, $getRoot, $createTextNode } from "lexical";
import { CodeNode, CodeHighlightNode, registerCodeHighlighting, $isCodeNode } from "@lexical/code";
import { COMMAND_PRIORITY_LOW, $nodesOfType } from "lexical";
import Prism from "prismjs";

// 필요한 PrismJS 언어 로드
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-python";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";

export function CodeHighlightPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // 향상된 Prism 토크나이저
        const enhancedPrismTokenizer = {
            ...Prism,
            defaultLanguage: 'javascript',
            tokenize: (code: string, language?: string) => {
                // 언어 매핑 개선
                const languageMap: { [key: string]: string } = {
                    'js': 'javascript',
                    'ts': 'typescript',
                    'jsx': 'jsx',
                    'tsx': 'tsx',
                    'py': 'python',
                    'html': 'markup',
                    'xml': 'markup',
                };

                const normalizedLanguage = languageMap[language || ''] || language || 'javascript';
                const grammar = Prism.languages[normalizedLanguage] || Prism.languages.javascript;

                try {
                    return Prism.tokenize(code, grammar);
                } catch (error) {
                    console.warn('Prism tokenization failed:', error);
                    return Prism.tokenize(code, Prism.languages.javascript);
                }
            }
        };

        // 기본 코드 하이라이팅 등록
        const unregister = registerCodeHighlighting(editor, enhancedPrismTokenizer);

        // 읽기 전용 모드를 위한 추가 하이라이팅
        const applyReadOnlyHighlighting = () => {
            editor.read(() => {
                const root = $getRoot();
                const codeNodes = $nodesOfType(CodeNode);

                codeNodes.forEach((codeNode) => {
                    if ($isCodeNode(codeNode)) {
                        const language = codeNode.getLanguage() || 'javascript';
                        const code = codeNode.getTextContent();

                        try {
                            // 토큰화
                            const tokens = enhancedPrismTokenizer.tokenize(code, language);

                            // DOM에서 직접 하이라이팅 적용 (읽기 전용 모드용)
                            setTimeout(() => {
                                const codeElements = document.querySelectorAll('.editor-code, .PlaygroundEditorTheme__code');
                                codeElements.forEach((element) => {
                                    if (element.textContent === code) {
                                        applyTokensToElement(element as HTMLElement, tokens);
                                    }
                                });
                            }, 100);
                        } catch (error) {
                            console.warn('Token highlighting failed:', error);
                        }
                    }
                });
            });
        };

        // DOM에 토큰 적용하는 함수
        const applyTokensToElement = (element: HTMLElement, tokens: any[]) => {
            if (!tokens || tokens.length === 0) return;

            let html = '';
            tokens.forEach((token) => {
                if (typeof token === 'string') {
                    html += escapeHtml(token);
                } else if (token.type && token.content) {
                    const className = `token ${token.type}`;
                    html += `<span class="${className}">${escapeHtml(String(token.content))}</span>`;
                }
            });

            if (html) {
                element.innerHTML = html;
            }
        };

        // HTML 이스케이프 함수
        const escapeHtml = (text: string): string => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };

        // 초기 하이라이팅 적용
        setTimeout(applyReadOnlyHighlighting, 500);

        // 주기적으로 하이라이팅 재적용 (읽기 전용 모드에서 DOM 변경 감지)
        const interval = setInterval(applyReadOnlyHighlighting, 2000);

        return () => {
            unregister();
            clearInterval(interval);
        };
    }, [editor]);

    return null;
}