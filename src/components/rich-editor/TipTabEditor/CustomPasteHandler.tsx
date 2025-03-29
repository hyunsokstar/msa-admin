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
  
              const text = clipboardData.getData("text/plain");
              const html = clipboardData.getData("text/html");
  
              // ✅ [1] 들여쓰기 or 탭이 있는 경우만 코드 블록으로 처리
              if (text.startsWith("    ") || text.includes("\t")) {
                event.preventDefault();
  
                const { tr } = view.state;
                const { selection } = view.state;
                const node = view.state.schema.nodes.codeBlock.create({}, view.state.schema.text(text));
                const transaction = tr.replaceSelectionWith(node);
  
                view.dispatch(transaction);
                return true;
              }
  
              // ✅ [2] <pre> 또는 <code>가 포함된 경우만 처리 (그 외는 기본 붙여넣기)
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
  
              // ✅ 그 외는 Tiptap 기본 붙여넣기 처리 (스타일 유지됨)
              return false;
            },
          },
        }),
      ];
    },
  });
  

export default CustomPasteHandler;
