'use client';

import { Tldraw, exportToBlob } from 'tldraw';
import 'tldraw/tldraw.css';
import { useCallback, useRef } from 'react';

function TldrawWithButtons() {
    const editorRef = useRef<any>(null);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '900px', // 고정된 높이 설정
                border: '1px solid #ddd',
                borderRadius: '4px',
                overflow: 'hidden', // 오버플로우 처리
            }}
        >
            <div style={{
                flex: 1,
                minHeight: 0, // flexbox 오버플로우 버그 수정
            }}>
                <Tldraw
                    onMount={(editor) => {
                        editorRef.current = editor;
                    }}
                />
            </div>
            <div style={{
                padding: '10px',
                background: 'white',
                borderTop: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
            }}>
                <EditorContent editorRef={editorRef} />
            </div>
        </div>
    );
}

function EditorContent({ editorRef }: { editorRef: React.RefObject<any> }) {
    const handleExport = useCallback(async () => {
        const editor = editorRef.current;
        if (!editor) return;

        const shapeIds = editor.getCurrentPageShapeIds();
        if (shapeIds.size === 0) {
            alert('캔버스에 도형이 없습니다.');
            return;
        }

        const blob = await exportToBlob({
            editor,
            ids: [...shapeIds],
            format: 'png',
            opts: { background: false },
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'canvas-image.png';
        link.click();
    }, [editorRef]);

    const handleSend = useCallback(async () => {
        const editor = editorRef.current;
        if (!editor) return;

        const shapeIds = editor.getCurrentPageShapeIds();
        if (shapeIds.size === 0) {
            alert('캔버스에 도형이 없습니다.');
            return;
        }

        const blob = await exportToBlob({
            editor,
            ids: [...shapeIds],
            format: 'png',
            opts: { background: false },
        });

        const formData = new FormData();
        formData.append('image', blob, 'canvas-image.png');

        try {
            const response = await fetch('https://your-server.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('이미지가 성공적으로 전송되었습니다.');
            } else {
                alert('이미지 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('전송 중 오류 발생:', error);
            alert('이미지 전송 중 오류가 발생했습니다.');
        }
    }, [editorRef]);

    return (
        <>
            <button
                onClick={handleExport}
                style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                }}
            >
                이미지 다운로드
            </button>
            <button
                onClick={handleSend}
                style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                }}
            >
                이미지 전송
            </button>
        </>
    );
}

export default function ImageCommentComponent() {
    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <TldrawWithButtons />
        </div>
    );
}
