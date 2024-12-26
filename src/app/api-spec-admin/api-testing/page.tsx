"use client";

import React from 'react';
import type { Key } from 'react';
import ReactDataGrid from 'react-data-grid';
import { SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useApiForDashboard } from '@/hook/useApiForDashboard';

type TestStatus = 'loading' | 'success' | 'error' | undefined;

interface RowData {
  id: string | number;
  service_name: string;
  title: string;
  method: string;
  endpoint: string;
  request_body_schema: string;
}

interface TestResult {
  id: string | number;
  service_name: string;
  title: string;
  method: string;
  status: TestStatus;
  time?: string;
  timestamp: string;
}

function ApiTesting() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;
  const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<Key>>(new Set());
  const [testResults, setTestResults] = React.useState<Record<string, TestStatus>>({});
  const [testTimes, setTestTimes] = React.useState<Record<string, string | undefined>>({});
  const [isTestRunning, setIsTestRunning] = React.useState(false);
  const [testResultsList, setTestResultsList] = React.useState<TestResult[]>([]);
  const { data, isLoading, isError } = useApiForDashboard();

  const columns = [
    SelectColumn,
    { key: 'service_name', name: 'Service Name', width: 150 },
    { key: 'title', name: 'Title', width: 200 },
    { key: 'method', name: 'Method', width: 100 },
    { key: 'endpoint', name: 'Endpoint', width: 250 },
    { key: 'request_body_schema', name: 'Request Body Schema', width: 300 }
  ];

  const getCurrentPageData = () => {
    if (!data?.specs) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.specs.slice(startIndex, endIndex).map((spec) => ({
      ...spec,
      id: spec.id
    }));
  };

  const handleSelectedRowsChange = (newSelectedRows: ReadonlySet<Key>) => {
    setSelectedRows(newSelectedRows);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTestSelectedRows = async () => {
    if (!data?.specs || selectedRows.size === 0) return;

    setIsTestRunning(true);
    const updatedResults = { ...testResults };
    const updatedTimes = { ...testTimes };
    const newTestResults: TestResult[] = [];

    for (const rowId of selectedRows) {
      const key = rowId.toString();
      const rowData = data.specs.find((spec) => spec.id === rowId);

      if (!rowData) continue;

      updatedResults[key] = 'loading';
      setTestResults({ ...updatedResults });

      const startTime = performance.now();
      try {
        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: rowData.endpoint,
            method: rowData.method,
            body: rowData.request_body_schema,
          }),
        });

        const status = response.ok ? 'success' : 'error';
        updatedResults[key] = status;
        const endTime = performance.now();
        const timeSpent = (endTime - startTime).toFixed(2);
        updatedTimes[key] = timeSpent;

        newTestResults.push({
          id: rowData.id,
          service_name: rowData.service_name,
          title: rowData.title,
          method: rowData.method,
          status,
          time: timeSpent,
          timestamp: new Date().toLocaleTimeString()
        });
      } catch (error) {
        updatedResults[key] = 'error';
        newTestResults.push({
          id: rowData.id,
          service_name: rowData.service_name,
          title: rowData.title,
          method: rowData.method,
          status: 'error',
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }

    setTestResults({ ...updatedResults });
    setTestTimes({ ...updatedTimes });
    setTestResultsList([...newTestResults, ...testResultsList]);
    setIsTestRunning(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-96 text-destructive">Error loading data</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>API Specifications</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Selected: {selectedRows.size}
              </span>
              <Button 
                onClick={handleTestSelectedRows}
                className="relative inline-flex items-center gap-2 transition-all hover:bg-primary/90 active:scale-95"
                disabled={selectedRows.size === 0 || isTestRunning}
              >
                {isTestRunning && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Run Test
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[500px] border rounded-lg overflow-hidden">
            <ReactDataGrid
              columns={columns}
              rows={getCurrentPageData()}
              rowHeight={50}
              className="rdg-light h-full"
              selectedRows={selectedRows}
              onSelectedRowsChange={handleSelectedRowsChange}
              rowKeyGetter={(row) => (row as RowData).id}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={data?.specs?.length || 0}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              className="custom-pagination"
            />
          </div>
        </CardContent>
      </Card>

      {testResultsList.length > 0 && (
        <Card className="shadow-md border-2">
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testResultsList.map((result, index) => (
                    <tr key={`${result.id}-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.service_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {result.method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          {result.status === 'success' ? (
                            <div className="flex items-center text-green-600 gap-1">
                              <CheckCircle className="h-4 w-4" />
                              <span>Success</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600 gap-1">
                              <XCircle className="h-4 w-4" />
                              <span>Failed</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{result.time} ms</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ApiTesting;