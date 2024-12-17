// components/dialog/DialogButtonForGetApiTest.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlayCircle } from 'lucide-react';
import DialogButtonForAdminLoginAndGetToken from '@/components/dialog/DialogButtonForAdminLoginAndGetToken';

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlayCircle className="h-4 w-4 mr-2" />
          Test GET
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] w-full bg-white overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Badge className="bg-blue-500">GET</Badge>
            <span className="font-mono">{spec.endpoint}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Bearer Token Input */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Bearer Token</h3>

            <div className='flex gap-2'>
              <Input
                value={bearerToken}
                onChange={(e) => setBearerToken(e.target.value)}
                placeholder="Enter JWT token"
                className="font-mono"
              />
              <DialogButtonForAdminLoginAndGetToken onTokenReceived={setBearerToken} triggerButtonText="Login to get token" />
            </div>
          </div>

          {/* Response Area */}
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
            disabled={loading || !bearerToken}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test GET Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};