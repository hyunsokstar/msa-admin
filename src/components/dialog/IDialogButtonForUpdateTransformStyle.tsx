// 파일 경로: /src/components/IDialogButtonForUpdateTransformStyle.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil } from 'lucide-react';
import { TransformStyle } from '@/types/typeForTransform';
import { useApiForUpdateTransformStyle } from '@/hook/useApiForUpdateTransformStyle';
import MonacoEditor from '@monaco-editor/react';

interface Props {
  style: TransformStyle;
}

const IDialogButtonForUpdateTransformStyle = ({ style }: Props) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: style.name,
    trans_format: style.trans_format,
    description: style.description,
    placeholder: style.placeholder,
  });

  const updateMutation = useApiForUpdateTransformStyle();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (value: string | undefined) => {
    setFormData(prev => ({ ...prev, trans_format: value || '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        id: style.id,
        data: formData,
      });
      setOpen(false);
    } catch (error) {
      // 에러는 mutation에서 처리됨
    }
  };

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    fontSize: 14,
    lineHeight: 21,
    padding: { top: 8, bottom: 8 },
    folding: false,
    lineNumbers: 'off' as 'off',
    glyphMargin: false,
    wordWrap: 'on' as 'on',
    renderLineHighlight: 'none' as 'none',
    occurrencesHighlight: 'off' as 'off',
    selectionHighlight: false,
    links: false,
    renderValidationDecorations: 'off' as 'off', // 오류 표시 제거
    quickSuggestions: false,
    suggestOnTriggerCharacters: false,
    acceptSuggestionOnEnter: 'off' as 'off',
    tabCompletion: 'off' as 'off',
    snippetSuggestions: 'none' as 'none',
    wordBasedSuggestions: 'off' as 'off',
    parameterHints: { enabled: false },
    formatOnType: false,
    formatOnPaste: false,
    guides: { indentation: false },
    colorDecorators: false,
  };

  const handleEditorWillMount = (monaco: any) => {
    // TypeScript 언어 서비스 설정 비활성화
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
      noSuggestionDiagnostics: true,
    });

    // TypeScript 컴파일러 옵션 설정
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      noLib: true,
      allowNonTsExtensions: true,
      strict: false,
      checkJs: false, // JS 코드에서도 오류 체크 안 하도록 설정
    });

    // 기본 라이브러리 로딩 비활성화
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    // 커스텀 테마 정의
    monaco.editor.defineTheme('customTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#f9fafb',
        'editorLineNumber.foreground': '#00000000',
        'editorLineNumber.activeForeground': '#00000000',
        'editor.lineHighlightBackground': '#00000000',
        'editor.lineHighlightBorder': '#00000000',
        'editorError.foreground': '#00000000', // 오류 표시 제거
        'editorWarning.foreground': '#00000000', // 경고 표시 제거
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>변환 포맷 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">이름</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              변환 포맷 (name, method, endpoint)
            </label>
            <div className="border rounded-md overflow-hidden">
              <MonacoEditor
                height="200px"
                language="typescript"
                value={formData.trans_format}
                onChange={handleCodeChange}
                options={editorOptions}
                beforeMount={handleEditorWillMount}
                theme="customTheme"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">설명</label>
            <Input
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">플레이스홀더</label>
            <Input
              name="placeholder"
              value={formData.placeholder}
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? '수정 중...' : '수정'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForUpdateTransformStyle;
