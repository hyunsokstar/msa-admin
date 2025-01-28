// src/app/task-admin/task-dashboard/components/IDialogButtonForTestApi.tsx
"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import CommonButton2 from "@/components/common/CommonButton2";
import { PlayCircle, Send } from "lucide-react";

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

      // 헤더 파싱
      try {
        headers = JSON.parse(requestHeaders);
      } catch (e) {
        console.error('Invalid headers JSON:', e);
      }

      // GET 요청의 경우 query params 처리
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

      // GET이 아닌 경우 body 처리
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

  const renderTitle = (
    <div className="flex items-center gap-2">
      <Badge className={cn("font-mono", getMethodColor(apiSpec.method))}>
        {apiSpec.method}
      </Badge>
      <span className="font-mono text-sm">{apiSpec.endpoint}</span>
    </div>
  );

  return (
    <CommonDialogButton
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(true)}
      trigger={
        <CommonButton2
          variant="ghost"
          icon={<PlayCircle className="h-4 w-4" />}
          className="text-blue-600 hover:text-blue-800"
        >
          Test
        </CommonButton2>
      }
      title={renderTitle}
    >
      <div className="grid grid-cols-2 h-full divide-x">
        {/* Request Section */}
        <div className="p-6 bg-white">
          <div className="flex flex-col h-full gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Headers</Label>
                <Textarea
                  value={requestHeaders}
                  onChange={(e) => setRequestHeaders(e.target.value)}
                  className="font-mono text-sm h-40 bg-gray-50/50 border-gray-200 rounded-lg"
                  placeholder="{}"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  {apiSpec.method === 'GET' ? 'Query Parameters' : 'Request Body'}
                </Label>
                <Textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="font-mono text-sm h-40 bg-gray-50/50 border-gray-200 rounded-lg"
                  placeholder="{}"
                />
              </div>
            </div>

            <CommonButton2
              onClick={handleTest}
              loading={isLoading}
              icon={<Send className="h-4 w-4" />}
              className="mt-auto"
            >
              Send Request
            </CommonButton2>
          </div>
        </div>

        {/* Response Section */}
        <div className="bg-gray-50/50 p-6">
          <div className="flex flex-col h-full gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Response</h3>
              {response && (
                <Badge variant={response.status >= 400 ? "destructive" : "default"}>
                  Status: {response.status}
                </Badge>
              )}
            </div>

            {response ? (
              <div className="space-y-4 flex-1">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Headers</Label>
                  <Textarea
                    value={JSON.stringify(response.headers || {}, null, 2)}
                    readOnly
                    className="font-mono text-sm h-40 bg-white border-gray-200 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <Label className="text-sm font-medium mb-2 block">Response Body</Label>
                  <Textarea
                    value={JSON.stringify(response.body || response.error, null, 2)}
                    readOnly
                    className="font-mono text-sm h-[calc(100vh-500px)] bg-white border-gray-200 rounded-lg"
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
    </CommonDialogButton>
  );
};

export default IDialogButtonForTestApi;