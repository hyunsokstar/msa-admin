// components/CodeBlockButton.tsx
import { Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import CodeEditorDialog from "./CodeEditorDialog";

interface CodeBlockButtonProps {
    editor: Editor;
}

const CodeBlockButton = ({ editor }: CodeBlockButtonProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        let initialCode = "";

        // 현재 선택된 코드블록이 있다면 그 내용을 가져옴
        if (editor.isActive('codeBlock')) {
            const node = editor.state.selection.$head.parent;
            initialCode = node.textContent;
        } else {
            // 선택된 텍스트가 있다면 그것을 초기 코드로 사용
            initialCode = editor.state.selection.content().content.textContent || "";
        }

        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleApplyCode = (code: string, language: string) => {
        if (editor.isActive('codeBlock')) {
            // 기존 코드블록 업데이트
            editor
                .chain()
                .focus()
                .setCodeBlock({ language })
                .insertContent(code)
                .run();
        } else {
            // 새 코드블록 생성
            editor
                .chain()
                .focus()
                .setCodeBlock({ language })
                .insertContent(code)
                .run();
        }
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button
                type="button"
                variant={editor.isActive('codeBlock') ? "default" : "ghost"}
                size="sm"
                onClick={handleOpenDialog}
                className="h-8 flex items-center gap-1"
            >
                <Code2 className="h-4 w-4" />
                코드
            </Button>

            {isDialogOpen && (
                <CodeEditorDialog
                    isOpen={isDialogOpen}
                    code={editor.isActive('codeBlock') ? editor.state.selection.$head.parent.textContent : ""}
                    language="javascript"
                    onClose={handleCloseDialog}
                    onApply={handleApplyCode}
                />
            )}
        </>
    );
};

export default CodeBlockButton;