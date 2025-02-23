import { Plugin } from "@tiptap/pm/state";
import CodeBlock from "@tiptap/extension-code-block";

const CustomPasteHandler = CodeBlock.extend({
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handlePaste: (view, event) => {
                        const clipboardData = event.clipboardData;
                        if (!clipboardData) return false;

                        const text = clipboardData.getData("text/plain"); // 일반 텍스트 복사
                        const html = clipboardData.getData("text/html"); // HTML 복사

                        // 📌 ✅ 들여쓰기 포함된 경우 <pre><code>로 감싸서 삽입
                        if (text.startsWith("    ") || text.includes("\t")) {
                            event.preventDefault();

                            const { tr } = view.state;
                            const { selection } = view.state;

                            const node = view.state.schema.nodes.codeBlock.create({}, view.state.schema.text(text));
                            const transaction = tr.replaceSelectionWith(node);

                            view.dispatch(transaction);
                            return true;
                        }

                        // 📌 ✅ HTML 복사 시 <pre> 또는 <code>가 포함되어 있다면 <codeBlock>으로 변환
                        if (html.includes("<pre") || html.includes("<code")) {
                            event.preventDefault();

                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, "text/html");
                            const preTag = doc.querySelector("pre");

                            if (preTag) {
                                const codeText = preTag.innerText;

                                const { tr } = view.state;
                                const { selection } = view.state;

                                const node = view.state.schema.nodes.codeBlock.create({}, view.state.schema.text(codeText));
                                const transaction = tr.replaceSelectionWith(node);

                                view.dispatch(transaction);
                                return true;
                            }
                        }

                        return false;
                    },
                },
            }),
        ];
    },
});

export default CustomPasteHandler;
