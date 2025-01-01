"use client";

import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

interface CodeEditorDialogProps {
  isOpen: boolean;
  code: string;
  onClose: () => void;
  onApply: (updatedCode: string) => void;
}

const CodeEditorDialog: React.FC<CodeEditorDialogProps> = ({
  isOpen,
  code,
  onClose,
  onApply,
}) => {
  const [editorValue, setEditorValue] = useState(code);

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || "");
  };

  // 다이어로그가 열릴 때만 렌더링
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[90vw] h-[80vh] p-4 max-w-3xl mx-auto">
        <div className="text-lg font-bold mb-4">Edit Code</div>
        <MonacoEditor
          height="70vh"
          defaultLanguage="javascript"
          value={editorValue}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => onApply(editorValue)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorDialog;
