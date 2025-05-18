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
        // Handle link clicks to open in new tab
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
        // Apply styling to links in the DOM
        const applyLinkStyles = () => {
            const editorLinks = document.querySelectorAll('.editor-container a');
            editorLinks.forEach(link => {
                link.classList.add('text-blue-600', 'underline', 'hover:text-blue-800');
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            });
        };

        // Run initially and periodically
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
        // Function to detect URLs in the text and mark them as links
        const detectUrlsInDom = () => {
            const editorElement = document.querySelector('.editor-container');
            if (!editorElement) return;

            // URL pattern 
            const urlRegex = /(https?:\/\/[^\s]+)/g;

            // Find all text nodes not already in a link
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
                urlRegex.lastIndex = 0; // Reset regex state
            }

            // Process identified text nodes
            textNodesToProcess.forEach(node => {
                if (!node.textContent) return;

                const text = node.textContent;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;

                urlRegex.lastIndex = 0;
                while ((match = urlRegex.exec(text)) !== null) {
                    // Add text before URL
                    if (match.index > lastIndex) {
                        fragment.appendChild(document.createTextNode(
                            text.substring(lastIndex, match.index)
                        ));
                    }

                    // Create link element for URL
                    const url = match[0];
                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = url;
                    link.className = 'detected-url text-blue-600 underline hover:text-blue-800';
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';

                    // Handle link click
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.open(url, '_blank', 'noopener,noreferrer');
                    });

                    fragment.appendChild(link);
                    lastIndex = match.index + url.length;
                }

                // Add remaining text after last URL
                if (lastIndex < text.length) {
                    fragment.appendChild(document.createTextNode(
                        text.substring(lastIndex)
                    ));
                }

                // Replace original node with processed fragment
                if (fragment.childNodes.length > 0 && node.parentNode) {
                    node.parentNode.replaceChild(fragment, node);
                }
            });
        };

        // Run detection
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
            code: 'editor-code',
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
            LinkDecoratorNode, // Add our custom link decorator node
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
                        <ContentEditable className="min-h-[150px] prose prose-sm max-w-none text-black bg-white" />
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* Core link support */}
                <LinkPlugin />

                {/* Auto-linking for text containing URLs */}
                <AutoLinkPlugin matchers={MATCHERS} />

                {/* Enhanced link styling */}
                <EnhanceLinksPlugin />

                {/* Link click handler */}
                <LinkClickHandlerPlugin />

                {/* URL detection in existing text */}
                <UrlDetectionPlugin />

                {/* Code highlighting */}
                <CodeHighlightPlugin />
            </div>

            {/* Global styles for links */}
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
        
        /* Specific styling for code blocks */
        .editor-container pre a,
        .editor-container code a {
          color: #2563eb !important;
          text-decoration: underline !important;
        }
      `}</style>
        </LexicalComposer>
    );
}

export default LexicalContentViewer;
