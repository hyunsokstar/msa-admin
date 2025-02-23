// components/rich-editor/FormattedEditorContent.tsx
import React, { useCallback, forwardRef } from 'react';
import { EditorContent, EditorContentProps } from '@tiptap/react';
import { Node as ProseMirrorNode } from 'prosemirror-model';

interface CodeFormatterProps extends Omit<EditorContentProps, 'ref'> {
    className?: string;
}

const CodeFormatter = forwardRef<HTMLDivElement, CodeFormatterProps>((props, ref) => {
    const { editor, ...rest } = props;

    // 커스텀 paste 핸들러 추가
    React.useEffect(() => {
        if (!editor) return;

        // 붙여넣기 이벤트 핸들러
        const handlePaste = (event: ClipboardEvent) => {
            if (!editor.isActive('codeBlock')) return;

            event.preventDefault();
            const text = event.clipboardData?.getData('text/plain');
            if (!text) return;

            // 들여쓰기 및 공백 유지
            const formattedText = text
                .split('\n')
                .map(line => line)
                .join('\n');

            const { tr } = editor.view.state;
            const pos = editor.view.state.selection.from;

            editor.view.dispatch(tr.insertText(formattedText, pos));
        };

        // 에디터에 붙여넣기 이벤트 리스너 추가
        const editorElement = editor.view.dom;
        editorElement.addEventListener('paste', handlePaste);

        return () => {
            editorElement.removeEventListener('paste', handlePaste);
        };
    }, [editor]);

    // CodeBlock 노드 렌더링 커스터마이징
    React.useEffect(() => {
        if (!editor) return;

        editor.view.setProps({
            nodeViews: {
                codeBlock: (node: ProseMirrorNode) => {
                    const dom = document.createElement('pre');
                    const code = document.createElement('code');

                    // VS Code 스타일 적용
                    dom.classList.add(
                        'bg-[#1e1e1e]', // VS Code 다크 테마 배경색
                        'text-[#d4d4d4]', // VS Code 기본 텍스트 색상
                        'p-4',
                        'rounded-md',
                        'overflow-x-auto',
                        'font-mono',
                        'text-sm',
                        'leading-relaxed',
                        'whitespace-pre',
                        'tabSize-4'
                    );

                    code.textContent = node.textContent;
                    dom.appendChild(code);

                    return {
                        dom,
                        contentDOM: code,
                        update: (updatedNode: ProseMirrorNode) => {
                            if (updatedNode.type !== node.type) return false;
                            code.textContent = updatedNode.textContent;
                            return true;
                        },
                    };
                },
            },
        });
    }, [editor]);

    return <EditorContent ref={ref} editor={editor} {...rest} />;
});

CodeFormatter.displayName = 'CodeFormatter';

export default CodeFormatter;