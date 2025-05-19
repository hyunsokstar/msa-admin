"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    $getRoot,
    $createTextNode,
    $getSelection,
    $createParagraphNode,
    $isElementNode,
    ElementNode
} from 'lexical';
import { Zap } from 'lucide-react';

interface Props {
    className?: string;
}

const IDialogButtonForQuestionFromCurrentTextForLexicalEditor: React.FC<Props> = ({ className }) => {
    const [editor] = useLexicalComposerContext();
    const [isOpen, setIsOpen] = useState(false);
    const [currentText, setCurrentText] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 에디터 텍스트 가져오기
    useEffect(() => {
        if (isOpen) {
            editor.getEditorState().read(() => {
                let text = '';

                // root의 모든 노드를 순회하며 텍스트 추출
                const root = $getRoot();
                root.getChildren().forEach(node => {
                    if (node.getType() === 'paragraph') {
                        // Use getChildren() only on ElementNode types
                        if ($isElementNode(node)) {
                            node.getChildren().forEach(child => {
                                if (child.getType() === 'text') {
                                    // @ts-ignore - getTextContent는 존재하지만 타입이 정확하지 않을 수 있음
                                    text += child.getTextContent();
                                }
                            });
                        }
                        text += '\n';
                    }
                });

                setCurrentText(text);
            });
        }
    }, [isOpen, editor]);

    // AI에 질문하는 함수
    const handleSubmit = async (e?: React.FormEvent) => {
        // 폼 submit 이벤트가 있으면 기본 동작 방지
        if (e) {
            e.preventDefault();
        }

        if (!question.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            // Claude API 사용
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'claude-3-sonnet-20240229', // Claude 모델 사용
                    messages: [
                        {
                            role: 'system',
                            content: '당신은 도움이 되는 AI 어시스턴트입니다. 사용자가 제공한 컨텍스트를 기반으로 질문에 답변해 주세요.'
                        },
                        {
                            role: 'user',
                            content: `컨텍스트:\n${currentText}\n\n질문:\n${question}`
                        }
                    ]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'AI 응답을 가져오는 중 오류가 발생했습니다.');
            }

            const data = await response.json();
            setAnswer(data.content || '응답을 받지 못했습니다.');
        } catch (error: any) {
            console.error('AI 요청 중 오류:', error);
            setError(error.message || '죄송합니다. 오류가 발생했습니다. 다시 시도해 주세요.');
            setAnswer('');
        } finally {
            setIsLoading(false);
        }
    };

    // 에디터에 답변 삽입 - 한 줄 띄우고 삽입하는 버전
    const insertAnswerToEditor = () => {
        if (!answer) return;

        editor.update(() => {
            const selection = $getSelection();

            if (selection && !selection.isCollapsed()) {
                // 선택된 영역이 있으면 해당 영역을 대체하고 줄바꿈 추가
                selection.insertText("\n\n" + answer);
            } else {
                // 선택된 영역이 없거나 커서만 있는 경우
                const root = $getRoot();

                // 마지막 텍스트 노드를 찾거나 생성
                const lastChild = root.getLastChild();
                if (lastChild) {
                    // 항상 새 단락을 생성하여 한 줄 띄우기 효과 주기
                    const paragraph = $createParagraphNode();
                    const textNode = $createTextNode(answer);
                    paragraph.append(textNode);
                    lastChild.insertAfter(paragraph);
                } else {
                    // 에디터가 비어있는 경우
                    const paragraph = $createParagraphNode();
                    const textNode = $createTextNode(answer);
                    paragraph.append(textNode);
                    root.append(paragraph);
                }
            }
        });

        setIsOpen(false);
    };

    // 엔터 키 처리 함수
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Ctrl + Enter 또는 Cmd + Enter로 제출
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            handleSubmit();
        }
    };

    // 버튼 스타일
    const buttonBaseStyle = "p-1.5 rounded hover:bg-gray-200 transition-colors border";

    return (
        <>
            {/* AI 버튼 */}
            <button
                type="button"
                className={`${buttonBaseStyle} border-purple-300 bg-purple-50 text-xs flex items-center ${className}`}
                onClick={() => setIsOpen(true)}
                title="AI 질문하기"
            >
                <Zap className="w-4 h-4 mr-1 text-purple-600" /> AI
            </button>

            {/* 모달 (중앙 배치 모달) */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div
                        ref={modalRef}
                        className="relative flex flex-col bg-white overflow-hidden rounded-lg shadow-xl"
                        style={{
                            width: '85%',
                            height: '85%',
                            maxWidth: '1200px',
                            maxHeight: '800px',
                        }}
                    >
                        {/* 헤더 */}
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-lg font-semibold">AI 질문하기 (Claude)</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* 컨텐츠 영역 - 좌우 분할 */}
                        <div className="flex-1 flex overflow-hidden">
                            {/* 왼쪽: 현재 텍스트 + 질문 입력 영역 */}
                            <div className="w-1/2 border-r p-4 overflow-auto flex flex-col">
                                <h3 className="font-medium mb-3 text-gray-700">현재 텍스트</h3>
                                <div className="bg-gray-50 p-3 rounded flex-1 overflow-auto whitespace-pre-wrap mb-4">
                                    {currentText || '에디터에 내용이 없습니다.'}
                                </div>

                                {/* 질문 입력 영역 */}
                                <div className="mt-2">
                                    <h3 className="font-medium mb-2 text-gray-700">질문</h3>
                                    <textarea
                                        ref={textareaRef}
                                        className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                                        rows={5}
                                        placeholder="AI에게 질문하기... (Ctrl+Enter로 제출)"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        disabled={isLoading}
                                    ></textarea>
                                    <div className="mt-2 flex justify-end">
                                        <button
                                            type="button"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                            onClick={() => handleSubmit()}
                                            disabled={isLoading || !question.trim()}
                                        >
                                            {isLoading ? '처리 중...' : '질문하기'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 오른쪽: AI 응답 영역 */}
                            <div className="w-1/2 p-4 overflow-auto flex flex-col">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-medium text-gray-700">AI 응답</h3>
                                    {answer && (
                                        <button
                                            type="button"
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                            onClick={insertAnswerToEditor}
                                        >
                                            에디터에 삽입
                                        </button>
                                    )}
                                </div>
                                <div className="bg-blue-50 p-4 rounded flex-1 overflow-auto">
                                    {isLoading ? (
                                        <div className="flex justify-center items-center h-full">
                                            <span className="animate-pulse">AI가 응답을 생성 중입니다...</span>
                                        </div>
                                    ) : error ? (
                                        <div className="text-red-600 whitespace-pre-wrap p-3">
                                            {error}
                                        </div>
                                    ) : answer ? (
                                        <div className="whitespace-pre-wrap">{answer}</div>
                                    ) : (
                                        <div className="text-gray-500 flex items-center justify-center h-full">
                                            질문을 입력하시면 AI가 응답을 생성합니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IDialogButtonForQuestionFromCurrentTextForLexicalEditor;