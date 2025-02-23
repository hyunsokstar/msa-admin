// components/CodeEditorDialog.tsx
"use client";

import React, { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface CodeEditorDialogProps {
  isOpen: boolean;
  code: string;
  language: string;
  onClose: () => void;
  onApply: (code: string, language: string) => void;
}

const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
];

const CodeEditorDialog: React.FC<CodeEditorDialogProps> = ({
  isOpen,
  code: initialCode,
  language: initialLanguage,
  onClose,
  onApply,
}) => {
  const [editorValue, setEditorValue] = useState(initialCode);
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");

  useEffect(() => {
    setEditorValue(initialCode);
  }, [initialCode]);

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || "");
  };

  const toggleTheme = () => {
    setTheme(theme === "vs-dark" ? "light" : "vs-dark");
  };

  // ESC 키로 다이얼로그 닫기
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg w-[90vw] h-[80vh] p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold">코드 편집</h2>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="언어 선택" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-8 w-8"
            >
              {theme === "vs-dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <MonacoEditor
          height="calc(70vh - 2rem)"
          language={language}
          value={editorValue}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            lineNumbers: "on",
            automaticLayout: true,
            scrollBeyondLastLine: false,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            onClick={() => onApply(editorValue, language)}
          >
            적용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorDialog;