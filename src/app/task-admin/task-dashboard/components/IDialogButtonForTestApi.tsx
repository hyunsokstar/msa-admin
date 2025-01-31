"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import CommonButton2 from "@/components/common/CommonButton2";
import { PlayCircle, Send, X } from "lucide-react";

interface IDialogButtonForTestApiProps {
  apiSpec: TaskApiSpec;
}

const IDialogButtonForTestApi: React.FC<IDialogButtonForTestApiProps> = ({
  apiSpec,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(apiSpec.request_spec || {}, null, 2)
  );
  const [requestHeaders, setRequestHeaders] = useState(
    JSON.stringify(apiSpec.headers || {}, null, 2)
  );

  const handleTest = async () => {
    setIsLoading(true);
    try {
      let headers = {};
      let body;
      let url = apiSpec.endpoint;

      try {
        headers = JSON.parse(requestHeaders);
      } catch (e) {
        console.error('Invalid headers JSON:', e);
      }

      if (apiSpec.method === 'GET' && requestBody) {
        try {
          const params = JSON.parse(requestBody);
          if (params.query_params) {
            const searchParams = new URLSearchParams();
            Object.entries(params.query_params).forEach(([key, value]) => {
              searchParams.append(key, String(value));
            });
            url = `${url}?${searchParams.toString()}`;
          }
        } catch (e) {
          console.error('Invalid query params:', e);
        }
      }

      if (apiSpec.method !== 'GET') {
        try {
          body = JSON.parse(requestBody);
        } catch (e) {
          console.error('Invalid body JSON:', e);
        }
      }

      const requestOptions = {
        method: apiSpec.method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
      };

      console.log('Making request to:', url);
      console.log('Request options:', requestOptions);

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      setResponse({
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: data
      });
    } catch (error) {
      setResponse({
        error: error instanceof Error ? error.message : 'Failed to fetch',
        status: 'Error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const dialogTitle = `Test API - ${apiSpec.method} ${apiSpec.endpoint}`;

  return (
    <>
      <CommonButton2
        variant="ghost"
        icon={<PlayCircle className="h-4 w-4" />}
        className="text-blue-600 hover:text-blue-800"
        onClick={() => setIsOpen(true)}
      >
        Test
      </CommonButton2>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-screen h-screen max-w-none m-0 p-0 rounded-none bg-white">
          <DialogTitle className="sr-only">
            {dialogTitle}
          </DialogTitle>

          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
              <div className="flex items-center gap-2">
                <Badge className={cn("font-mono", getMethodColor(apiSpec.method))}>
                  {apiSpec.method}
                </Badge>
                <span className="font-mono text-sm">{apiSpec.endpoint}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-2 flex-1 divide-x overflow-hidden">
              {/* Request Section */}
              <div className="flex flex-col h-full overflow-hidden bg-white">
                <div className="p-4 text-sm font-medium border-b">Request</div>
                <div className="flex flex-col h-[calc(100%-3.5rem)]">
                  <div className="p-4 flex-1">
                    <div className="h-1/2 pb-2">
                      <Label className="text-sm font-medium mb-2 block">Headers</Label>
                      <Textarea
                        value={requestHeaders}
                        onChange={(e) => setRequestHeaders(e.target.value)}
                        className="font-mono text-sm h-[calc(100%-2rem)] border-gray-200 rounded-lg resize-none"
                        placeholder="{}"
                      />
                    </div>
                    <div className="h-1/2 pt-2">
                      <Label className="text-sm font-medium mb-2 block">
                        {apiSpec.method === 'GET' ? 'Query Parameters' : 'Request Body'}
                      </Label>
                      <Textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="font-mono text-sm h-[calc(100%-2rem)] border-gray-200 rounded-lg resize-none"
                        placeholder="{}"
                      />
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <CommonButton2
                      onClick={handleTest}
                      loading={isLoading}
                      icon={<Send className="h-4 w-4" />}
                      className="w-full"
                    >
                      Send Request
                    </CommonButton2>
                  </div>
                </div>
              </div>

              {/* Response Section */}
              <div className="flex flex-col h-full overflow-hidden bg-gray-50">
                <div className="flex items-center justify-between p-4 text-sm font-medium border-b">
                  <span>Response</span>
                  {response && (
                    <Badge variant={response.status >= 400 ? "destructive" : "default"}>
                      Status: {response.status}
                    </Badge>
                  )}
                </div>

                {response ? (
                  <div className="flex flex-col h-[calc(100%-3.5rem)] p-4">
                    <div className="h-1/2 pb-2">
                      <Label className="text-sm font-medium mb-2 block">Headers</Label>
                      <Textarea
                        value={JSON.stringify(response.headers || {}, null, 2)}
                        readOnly
                        className="font-mono text-sm h-[calc(100%-2rem)] bg-white border-gray-200 rounded-lg resize-none"
                      />
                    </div>
                    <div className="h-1/2 pt-2">
                      <Label className="text-sm font-medium mb-2 block">Response Body</Label>
                      <Textarea
                        value={JSON.stringify(response.body || response.error, null, 2)}
                        readOnly
                        className="font-mono text-sm h-[calc(100%-2rem)] bg-white border-gray-200 rounded-lg resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    No response yet. Click 'Send Request' to test the API.
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IDialogButtonForTestApi;