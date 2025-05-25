import {
    CodeNode,
    SerializedCodeNode,
} from '@lexical/code';
import { EditorConfig, LexicalEditor, SerializedElementNode } from 'lexical';

declare global {
    interface Window {
        toast?: {
            success: (message: string, options?: any) => void;
            error: (message: string, options?: any) => void;
        };
    }
}

export type SerializedPlaygroundCodeBlockNode = SerializedCodeNode & {
    type: 'playground-code';
    version: 1;
};

export class PlaygroundCodeBlockNode extends CodeNode {
    static getType(): string {
        return 'playground-code';
    }

    static clone(node: PlaygroundCodeBlockNode): PlaygroundCodeBlockNode {
        return new PlaygroundCodeBlockNode(node.__key);
    }

    constructor(key?: string) {
        super(undefined, key);
    }

    createDOM(config: EditorConfig): HTMLElement {
        // 부모 클래스의 DOM 생성 (실제 코드 내용이 들어감)
        const originalElement = super.createDOM(config);

        // 전체 컨테이너 생성
        const container = document.createElement('div');
        container.className = 'relative group bg-gray-100 rounded-md overflow-hidden';

        // 원본 요소에 스타일 추가
        originalElement.className = 'text-sm font-mono p-3 overflow-x-auto whitespace-pre-wrap m-0';

        // 복사 버튼 (겹친 네모 아이콘)
        const copyButton = document.createElement('button');
        copyButton.className =
            'absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white ' +
            'border border-gray-300 rounded opacity-0 group-hover:opacity-100 ' +
            'transition-opacity duration-200 flex items-center justify-center ' +
            'text-gray-600 hover:text-gray-800';
        copyButton.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
        `;
        copyButton.title = '코드 복사';

        // 복사 성공 시 버튼 피드백
        const showSuccessFeedback = () => {
            const originalHTML = copyButton.innerHTML;
            const originalClass = copyButton.className;
            copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
            `;
            copyButton.className = originalClass.replace('text-gray-600', 'text-green-600');

            setTimeout(() => {
                copyButton.innerHTML = originalHTML;
                copyButton.className = originalClass;
            }, 2000);
        };

        // 복사 기능
        copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // DOM에서 실제 코드 텍스트 가져오기 - 줄바꿈 보존
            let codeText = '';

            // 줄바꿈을 보존하는 함수
            function getTextWithLineBreaks(element: HTMLElement): string {
                let text = '';

                function traverse(node: Node) {
                    if (node.nodeType === Node.TEXT_NODE) {
                        text += node.textContent || '';
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node as HTMLElement;

                        // br 태그나 블록 요소의 줄바꿈 처리
                        if (el.tagName === 'BR') {
                            text += '\n';
                        } else if (el.tagName === 'DIV' || el.tagName === 'P') {
                            // div나 p 태그 앞에 줄바꿈 추가 (첫 번째 제외)
                            if (text && !text.endsWith('\n')) {
                                text += '\n';
                            }
                        }

                        // 자식 노드들 순회
                        for (let i = 0; i < node.childNodes.length; i++) {
                            traverse(node.childNodes[i]);
                        }

                        // div나 p 태그 뒤에 줄바꿈 추가
                        if (el.tagName === 'DIV' || el.tagName === 'P') {
                            if (!text.endsWith('\n')) {
                                text += '\n';
                            }
                        }
                    }
                }

                traverse(element);
                return text.replace(/\n+$/, ''); // 마지막 불필요한 줄바꿈 제거
            }

            // 즉시 시도
            const codeElement = originalElement.querySelector('code') || originalElement;
            codeText = getTextWithLineBreaks(codeElement);

            // 만약 비어있다면 잠시 기다린 후 다시 시도
            if (!codeText.trim()) {
                setTimeout(() => {
                    const retryCodeText = getTextWithLineBreaks(codeElement);
                    if (retryCodeText.trim()) {
                        performCopy(retryCodeText);
                        return;
                    }

                    // 여전히 비어있다면 부모 컨테이너에서 시도
                    const allText = getTextWithLineBreaks(container);
                    const cleanText = allText.replace('코드 복사', '').trim();
                    if (cleanText) {
                        performCopy(cleanText);
                    } else {
                        alert('복사할 코드를 찾을 수 없습니다.');
                    }
                }, 100);
                return;
            }

            // 즉시 복사할 텍스트가 있다면 바로 실행
            performCopy(codeText);
        });

        // 실제 복사 수행 함수
        function performCopy(textToCopy: string) {
            console.log('복사할 텍스트:', textToCopy);

            // 현대적인 클립보드 API 사용
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // 성공 시
                    if (typeof window !== 'undefined' && window.toast) {
                        window.toast.success('코드가 복사되었습니다!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                        });
                    } else {
                        alert('코드가 복사되었습니다!');
                    }
                    showSuccessFeedback();
                }).catch((err) => {
                    // 실패 시
                    console.error('클립보드 복사 실패:', err);
                    if (typeof window !== 'undefined' && window.toast) {
                        window.toast.error('복사에 실패했습니다.', {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    } else {
                        alert('복사에 실패했습니다.');
                    }
                });
            } else {
                // 폴백: execCommand 사용 (구형 브라우저 대응)
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        // 실제로 성공한 경우에만 성공 메시지
                        if (typeof window !== 'undefined' && window.toast) {
                            window.toast.success('코드가 복사되었습니다!', {
                                position: "top-right",
                                autoClose: 2000,
                            });
                        } else {
                            alert('코드가 복사되었습니다!');
                        }
                        showSuccessFeedback();
                    } else {
                        // execCommand가 false를 반환한 경우
                        if (typeof window !== 'undefined' && window.toast) {
                            window.toast.error('복사에 실패했습니다.', {
                                position: "top-right",
                                autoClose: 3000,
                            });
                        } else {
                            alert('복사에 실패했습니다.');
                        }
                    }
                } catch (err) {
                    // execCommand에서 예외가 발생한 경우
                    console.error('execCommand 복사 실패:', err);
                    if (typeof window !== 'undefined' && window.toast) {
                        window.toast.error('복사에 실패했습니다.', {
                            position: "top-right",
                            autoClose: 3000,
                        });
                    } else {
                        alert('복사에 실패했습니다.');
                    }
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        }

        // 요소들 조합
        container.appendChild(originalElement);
        container.appendChild(copyButton);

        return container;
    }

    updateDOM(): boolean {
        return false;
    }

    static importJSON(
        serializedNode: SerializedPlaygroundCodeBlockNode
    ): PlaygroundCodeBlockNode {
        return new PlaygroundCodeBlockNode();
    }

    exportJSON(): SerializedPlaygroundCodeBlockNode {
        return {
            ...super.exportJSON(),
            type: 'playground-code',
            version: 1,
        };
    }
}

export function $createPlaygroundCodeBlockNode(): PlaygroundCodeBlockNode {
    return new PlaygroundCodeBlockNode();
}

export function $isPlaygroundCodeBlockNode(
    node: unknown
): node is PlaygroundCodeBlockNode {
    return node instanceof PlaygroundCodeBlockNode;
}