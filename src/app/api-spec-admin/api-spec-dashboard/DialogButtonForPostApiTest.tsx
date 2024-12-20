import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlayCircle } from 'lucide-react';
import DialogButtonForAdminLoginAndGetToken from '@/components/dialog/DialogButtonForAdminLoginAndGetToken';

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
    if (spec.endpoint.includes('/auth/login')) {
      setRequestBody('userId=admin&password=Abc12345');
    } else if (spec.request_body_schema) {
      setRequestBody(formatRequestBody(spec.request_body_schema));
    }
  }, [spec]);

  const handleTest = async () => {
    setLoading(true);
    try {
      // requestBody가 JSON 형식인지 확인
      let parsedBody;
      let contentType = 'application/json';
      
      try {
        // JSON parsing 시도
        parsedBody = JSON.parse(requestBody);
      } catch (e) {
        // JSON parsing이 실패하면 form-urlencoded로 간주
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

      console.log('Sending request:', proxyData);  // 디버깅용 로그

      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proxyData)
      });

      const data = await response.text();
      try {
        // JSON 파싱 시도
        const jsonData = JSON.parse(data);
        setResponse(JSON.stringify(jsonData, null, 2));
      } catch {
        // 텍스트 응답인 경우
        setResponse(data);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed to fetch'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlayCircle className="h-4 w-4 mr-2" />
          Test POST
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] w-full bg-white overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge className="bg-green-500">POST</Badge>
            <span className="font-mono">{spec.endpoint}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="flex gap-2 space-y-2">
            <h3 className="text-sm font-medium">Token (Option)</h3>
            <Input
              value={bearerToken}
              onChange={(e) => setBearerToken(e.target.value)}
              placeholder="Enter JWT token"
              className="font-mono"
            />
            <DialogButtonForAdminLoginAndGetToken 
              onTokenReceived={setBearerToken} 
              triggerButtonText="Login to get token" 
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Request Body</h3>
            <Textarea
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              placeholder="Enter request body"
              className="font-mono min-h-[200px]"
              rows={8}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Response</h3>
            <div className="border rounded-md p-4 bg-gray-50 min-h-[300px] max-h-[500px] overflow-auto font-mono text-sm whitespace-pre">
              {response || 'Response will appear here...'}
            </div>
          </div>
        </div>

        <div className="p-6 border-t">
          <Button 
            onClick={handleTest} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test POST Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButtonForPostApiTest;