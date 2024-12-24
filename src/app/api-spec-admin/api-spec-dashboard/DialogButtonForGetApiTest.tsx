import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlayCircle, Loader2 } from 'lucide-react';
import DialogButtonForAdminLoginAndGetToken from '@/components/dialog/DialogButtonForAdminLoginAndGetToken';
import MonacoEditor from '@monaco-editor/react';

interface ApiSpec {
  id: string;
  endpoint: string;
  method: string;
  service_name?: string;
  description?: string;
}

interface DialogButtonForGetApiTestProps {
  spec: ApiSpec;
}

export const DialogButtonForGetApiTest = ({ spec }: DialogButtonForGetApiTestProps) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [bearerToken, setBearerToken] = useState('');

  const handleTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: spec.endpoint,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        })
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorDidMount = (editor: any) => {
    // 에디터가 마운트된 후 포매팅 적용
    if (response) {
      try {
        const formatted = JSON.stringify(JSON.parse(response), null, 2);
        editor.setValue(formatted);
      } catch (e) {
        // JSON 파싱 에러 시 원본 텍스트 유지
        editor.setValue(response);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="hover:bg-blue-100 hover:text-blue-600 transition-colors"
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          Test GET
        </Button>
      </DialogTrigger>

<DialogContent 
  className="
    max-w-none w-[100vw] h-[100vh] 
    bg-white overflow-hidden flex flex-col 
    p-0 m-0 rounded-none
  "
  // 꽉 찬 화면을 위해 기본 padding과 margin 제거
>
  <DialogHeader className="px-6 py-4 border-b">
    <DialogTitle className="flex items-center gap-2">
      <Badge className="bg-blue-500 hover:bg-blue-600 transition-colors">
        GET
      </Badge>
      <span className="font-mono text-blue-600">
        {spec.endpoint}
      </span>
    </DialogTitle>
  </DialogHeader>

  <div className="flex-1 overflow-auto px-6 py-4 space-y-4">
    {/* Bearer Token Input */}
    <div className="max-w-5xl mx-auto space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Bearer Token</h3>
      <div className='flex gap-2'>
        <Input
          value={bearerToken}
          onChange={(e) => setBearerToken(e.target.value)}
          placeholder="Enter JWT token"
          className="font-mono bg-gray-50 focus:ring-blue-500 flex-1"
        />
        <DialogButtonForAdminLoginAndGetToken 
          onTokenReceived={setBearerToken} 
          triggerButtonText="Login to get token" 
        />
      </div>
    </div>

    {/* Response Area with Monaco Editor */}
    <div className="max-w-5xl mx-auto space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Response</h3>
      <div className="border rounded-md overflow-hidden">
        <MonacoEditor
          height="calc(100vh - 300px)"  // 화면 높이에 맞춰 조정
          language="json"
          theme="light"
          value={response || '// Response will appear here...'}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'off',
            folding: true,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderLineHighlight: 'none',
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            padding: { top: 8, bottom: 8 },
            tabSize: 2,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  </div>

  <div className="px-6 py-4 border-t bg-gray-50">
    <div className="max-w-5xl mx-auto">
      <Button
        onClick={handleTest}
        disabled={loading || !bearerToken}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          'Test GET Request'
        )}
      </Button>
    </div>
  </div>
</DialogContent>
    </Dialog>
  );
};

export default DialogButtonForGetApiTest;