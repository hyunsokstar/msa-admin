import React, { useState, useEffect } from 'react';
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
  request_body_schema?: any;
}

interface DialogButtonForPostApiTestProps {
  spec: ApiSpec;
}

export const DialogButtonForPostApiTest = ({ spec }: DialogButtonForPostApiTestProps) => {
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [bearerToken, setBearerToken] = useState('');
  const [requestBodyError, setRequestBodyError] = useState<string | null>(null);

  const formatRequestBody = (schema: any): string => {
    try {
      if (typeof schema === 'string') {
        return schema;
      }
      return JSON.stringify(schema, null, 2);
    } catch (e) {
      console.error('Failed to format request body:', e);
      return schema || '';
    }
  };

  useEffect(() => {
    if (spec.request_body_schema) {
      setRequestBody(formatRequestBody(spec.request_body_schema));
    }
  }, [spec]);

  const validateJson = (value: string): boolean => {
    try {
      if (value) {
        JSON.parse(value);
      }
      setRequestBodyError(null);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        setRequestBodyError(e.message);
      }
      return false;
    }
  };

  const handleTest = async () => {
    if (!validateJson(requestBody)) {
      return;
    }

    setLoading(true);
    try {
      let parsedBody;
      let contentType = 'application/json';
      
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        parsedBody = requestBody;
        contentType = 'application/x-www-form-urlencoded';
      }

      const proxyData = {
        endpoint: spec.endpoint,
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          ...(bearerToken && { 'Authorization': `Bearer ${bearerToken}` })
        },
        body: parsedBody
      };

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proxyData)
      });

      const data = await response.text();
      try {
        const jsonData = JSON.parse(data);
        setResponse(JSON.stringify(jsonData, null, 2));
      } catch {
        setResponse(data);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || '';
    setRequestBody(newValue);
    validateJson(newValue);
  };

  const handleResponseEditorDidMount = (editor: any) => {
    if (response) {
      try {
        const formatted = JSON.stringify(JSON.parse(response), null, 2);
        editor.setValue(formatted);
      } catch (e) {
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
          className="hover:bg-green-100 hover:text-green-600 transition-colors"
        >
          <PlayCircle className="h-4 w-4 mr-2" />
          Test POST
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-none w-[100vw] h-[100vh] bg-white overflow-hidden flex flex-col p-0 m-0 rounded-none">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Badge className="bg-green-500 hover:bg-green-600 transition-colors">
              POST
            </Badge>
            <span className="font-mono text-green-600">
              {spec.endpoint}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Request */}
          <div className="w-1/2 overflow-auto px-6 py-4 space-y-4 border-r">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Bearer Token</h3>
              <div className='flex gap-2'>
                <Input
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="Enter JWT token"
                  className="font-mono bg-gray-50 focus:ring-green-500 flex-1"
                />
                <DialogButtonForAdminLoginAndGetToken 
                  onTokenReceived={setBearerToken} 
                  triggerButtonText="Login to get token" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Request Body</h3>
              <div className="border rounded-md overflow-hidden">
                <MonacoEditor
                  height="calc(100vh - 300px)"
                  language="json"
                  theme="light"
                  value={requestBody}
                  onChange={handleEditorChange}
                  options={{
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
                />
              </div>
              {requestBodyError && (
                <p className="text-sm text-red-500 mt-1">{requestBodyError}</p>
              )}
            </div>
          </div>

          {/* Right Panel - Response */}
          <div className="w-1/2 overflow-auto px-6 py-4 space-y-4 bg-gray-50">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Response</h3>
              <div className="border bg-white rounded-md overflow-hidden">
                <MonacoEditor
                  height="calc(100vh - 200px)"
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
                  onMount={handleResponseEditorDidMount}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <Button
              onClick={handleTest}
              disabled={loading || !!requestBodyError}
              className="w-full bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                'Test POST Request'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButtonForPostApiTest;