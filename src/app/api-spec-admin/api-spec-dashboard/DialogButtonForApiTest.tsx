// components/dialog/DialogButtonForApiTest.tsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { PlayCircle } from 'lucide-react';

interface ApiSpec {
  id: string;
  endpoint: string;
  method: string;
  service_name?: string;
  description?: string;
  request_body_schema?: any;
}

interface DialogButtonForApiTestProps {
  spec: ApiSpec;
}

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET': return 'bg-blue-500';
    case 'POST': return 'bg-green-500';
    case 'PUT': return 'bg-yellow-500';
    case 'DELETE': return 'bg-red-500';
    case 'PATCH': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};

export const DialogButtonForApiTest = ({ spec }: DialogButtonForApiTestProps) => {
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (spec.endpoint.includes('/auth/login')) {
      const defaultBody = {
        userId: "admin",
        password: "Admin123"
      };
      setRequestBody(JSON.stringify(defaultBody, null, 2));
    } else if (spec.request_body_schema) {
      try {
        const schema = typeof spec.request_body_schema === 'string' 
          ? JSON.parse(spec.request_body_schema)
          : spec.request_body_schema;
        setRequestBody(JSON.stringify(schema.example || {}, null, 2));
      } catch (e) {
        console.error('Failed to parse request body schema:', e);
      }
    }
  }, [spec]);

  const handleTest = async () => {
    setLoading(true);
    try {
      const endpoint = spec.endpoint;
      
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          endpoint: endpoint,
          method: spec.method,
          body: spec.method !== 'GET' ? JSON.parse(requestBody) : undefined
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlayCircle className="h-4 w-4 mr-2" />
          Test
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] w-full bg-white overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge className={getMethodColor(spec.method)}>
              {spec.method}
            </Badge>
            <span className="font-mono">{spec.endpoint}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {spec.method !== 'GET' && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Request Body</h3>
              <Textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                placeholder="Enter request body in JSON format"
                className="font-mono min-h-[200px]"
                rows={8}
              />
            </div>
          )}

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
            {loading ? 'Testing...' : 'Test API'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};