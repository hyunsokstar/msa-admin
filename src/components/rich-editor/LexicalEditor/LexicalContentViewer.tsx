"use client";

import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ParagraphNode, $getRoot } from 'lexical';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// Import custom components
import { ImageNode } from '@/components/rich-editor/LexicalEditor/ImageNode';
import { CustomTextNode } from '@/components/rich-editor/LexicalEditor/CustomTextNode';
import { PlaygroundCodeBlockNode } from '@/components/rich-editor/LexicalEditor/PlaygroundCodeBlockNode';
import { CodeHighlightPlugin } from '@/components/rich-editor/LexicalEditor/CodeHighlightPlugin';
import { LinkDecoratorNode } from './LinkDecoratorNode';

// URL matcher configuration for auto-linking
const URL_MATCHER = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const MATCHERS = [
    (text: string) => {
        const match = URL_MATCHER.exec(text);
        if (match === null) {
            return null;
        }
        const fullMatch = match[0];
        return {
            index: match.index,
            length: fullMatch.length,
            text: fullMatch,
            url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
            attributes: { target: '_blank', rel: 'noopener noreferrer' }
        };
    }
];

// Link click handling plugin
function LinkClickHandlerPlugin() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') {
                e.preventDefault();
                const href = target.getAttribute('href');
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return null;
}

// Link styling enhancement plugin
function EnhanceLinksPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const applyLinkStyles = () => {
            const editorLinks = document.querySelectorAll('.editor-container a');
            editorLinks.forEach(link => {
                link.classList.add('text-blue-600', 'underline', 'hover:text-blue-800');
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        };

        applyLinkStyles();
        const interval = setInterval(applyLinkStyles, 500);

        return () => {
            clearInterval(interval);
        };
    }, [editor]);

    return null;
}

// URL detection and transformation plugin
function UrlDetectionPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const detectUrlsInDom = () => {
            const editorElement = document.querySelector('.editor-container');
            if (!editorElement) return;

            const urlRegex = /(https?:\/\/[^\s]+)/g;

            const walker = document.createTreeWalker(
                editorElement,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        return node.parentElement?.tagName !== 'A'
                            ? NodeFilter.FILTER_ACCEPT
                            : NodeFilter.FILTER_REJECT;
                    }
                }
            );

            const textNodesToProcess = [];
            let textNode;
            while (textNode = walker.nextNode()) {
                if (urlRegex.test(textNode.textContent || '')) {
                    textNodesToProcess.push(textNode);
                }
                urlRegex.lastIndex = 0;
            }

            textNodesToProcess.forEach(node => {
                if (!node.textContent) return;

                const text = node.textContent;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;

                urlRegex.lastIndex = 0;
                while ((match = urlRegex.exec(text)) !== null) {
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(
                            text.substring(lastIndex, match.index)
                        ));
                    }

                    const url = match[0];
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = url;
                    link.className = 'detected-url text-blue-600 underline hover:text-blue-800';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';

                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.open(url, '_blank', 'noopener,noreferrer');
                    });

                    fragment.appendChild(link);
                    lastIndex = match.index + url.length;
                }

                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(
                        text.substring(lastIndex)
                    ));
                }

                if (fragment.childNodes.length > 0 && node.parentNode) {
                    node.parentNode.replaceChild(fragment, node);
                }
            });
        };

        detectUrlsInDom();
        const intervalId = setInterval(detectUrlsInDom, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [editor]);

    return null;
}

function LexicalContentViewer({ content }: { content: string }) {
    const initialConfig = {
        namespace: 'ReadOnlyViewer',
        theme: {
            paragraph: 'editor-paragraph',
            // 코드 하이라이팅 테마 추가
            code: 'editor-code bg-gray-100 px-1 py-0.5 rounded text-sm font-mono',
            codeHighlight: {
                atrule: 'token-atrule text-purple-600',
                attr: 'token-attr text-blue-600',
                boolean: 'token-boolean text-orange-600',
                builtin: 'token-builtin text-purple-600',
                cdata: 'token-cdata text-gray-600',
                char: 'token-char text-green-600',
                class: 'token-class text-blue-600',
                'class-name': 'token-class-name text-blue-600',
                comment: 'token-comment text-gray-500 italic',
                constant: 'token-constant text-orange-600',
                deleted: 'token-deleted text-red-600',
                doctype: 'token-doctype text-gray-600',
                entity: 'token-entity text-orange-600',
                function: 'token-function text-blue-600',
                important: 'token-important text-red-600 font-bold',
                inserted: 'token-inserted text-green-600',
                keyword: 'token-keyword text-purple-600 font-semibold',
                namespace: 'token-namespace text-purple-600',
                number: 'token-number text-orange-600',
                operator: 'token-operator text-gray-700',
                prolog: 'token-prolog text-gray-600',
                property: 'token-property text-blue-600',
                punctuation: 'token-punctuation text-gray-600',
                regex: 'token-regex text-green-600',
                selector: 'token-selector text-green-600',
                string: 'token-string text-green-600',
                symbol: 'token-symbol text-orange-600',
                tag: 'token-tag text-red-600',
                url: 'token-url text-blue-600',
                variable: 'token-variable text-orange-600',
            },
            // 코드 블록 테마
            playground: {
                codeBlock: 'editor-code-block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto',
            },
            link: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
        },
        nodes: [
            CustomTextNode,
            ParagraphNode,
            HeadingNode,
            ListNode,
            ListItemNode,
            QuoteNode,
            CodeNode,
            CodeHighlightNode,
            PlaygroundCodeBlockNode,
            TableNode,
            TableCellNode,
            TableRowNode,
            AutoLinkNode,
            LinkNode,
            ImageNode,
            LinkDecoratorNode,
        ],
        editorState: content,
        editable: false,
        onError: (error: Error) => console.error('Lexical viewer error:', error),
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="min-h-[150px] prose prose-sm max-w-none focus:outline-none" />
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />

                <LinkPlugin />
                <AutoLinkPlugin matchers={MATCHERS} />
                <EnhanceLinksPlugin />
                <LinkClickHandlerPlugin />
                <UrlDetectionPlugin />
                <CodeHighlightPlugin />
            </div>

            {/* 전역 스타일 - 코드 하이라이팅 포함 */}
            <style jsx global>{`
                .editor-container a {
                    color: #2563eb;
                    text-decoration: underline;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                
                .editor-container a:hover {
                    color: #1d4ed8;
                }
                
                /* 코드 블록 스타일링 */
                .editor-container .editor-code-block {
                    background-color: #1f2937;
                    color: #f9fafb;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 0.875rem;
                    line-height: 1.5;
                    margin: 1rem 0;
                }
                
                /* 인라인 코드 스타일링 */
                .editor-container .editor-code {
                    background-color: #f3f4f6;
                    color: #374151;
                    padding: 0.125rem 0.25rem;
                    border-radius: 0.25rem;
                    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                    font-size: 0.875rem;
                }
                
                /* 토큰 스타일링 */
                .editor-container .token-comment {
                    color: #6b7280;
                    font-style: italic;
                }
                
                .editor-container .token-keyword {
                    color: #8b5cf6;
                    font-weight: 600;
                }
                
                .editor-container .token-string {
                    color: #10b981;
                }
                
                .editor-container .token-number {
                    color: #f59e0b;
                }
                
                .editor-container .token-function {
                    color: #3b82f6;
                }
                
                .editor-container .token-operator {
                    color: #6b7280;
                }
                
                .editor-container .token-punctuation {
                    color: #6b7280;
                }
                
                .editor-container .token-property {
                    color: #3b82f6;
                }
                
                .editor-container .token-class-name {
                    color: #3b82f6;
                }
                
                .editor-container .token-tag {
                    color: #ef4444;
                }
                
                .editor-container .token-attr {
                    color: #3b82f6;
                }
                
                .editor-container .token-boolean {
                    color: #f59e0b;
                }
                
                .editor-container .token-constant {
                    color: #f59e0b;
                }
                
                .editor-container .token-variable {
                    color: #f59e0b;
                }
                
                /* 코드 블록 내 링크 스타일 */
                .editor-container pre a,
                .editor-container code a {
                    color: #60a5fa !important;
                    text-decoration: underline !important;
                }
                
                /* 다크 테마 코드 블록 내 토큰들 */
                .editor-container .editor-code-block .token-comment {
                    color: #9ca3af;
                }
                
                .editor-container .editor-code-block .token-keyword {
                    color: #c084fc;
                }
                
                .editor-container .editor-code-block .token-string {
                    color: #34d399;
                }
                
                .editor-container .editor-code-block .token-number {
                    color: #fbbf24;
                }
                
                .editor-container .editor-code-block .token-function {
                    color: #60a5fa;
                }
            `}</style>
        </LexicalComposer>
    );
}

export default LexicalContentViewer;