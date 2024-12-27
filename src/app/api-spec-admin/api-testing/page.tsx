"use client";

import React from 'react';
import type { Key } from 'react';
import ReactDataGrid from 'react-data-grid';
import { SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, XCircle, Clock, X } from "lucide-react";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useApiForDashboard } from '@/hook/useApiForDashboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TestStatus = 'loading' | 'success' | 'error' | undefined;
type HttpMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

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
  const [selectedMethod, setSelectedMethod] = React.useState<HttpMethod>('ALL');
  const pageSize = 10;
  const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<Key>>(new Set());
  const [testResults, setTestResults] = React.useState<Record<string, TestStatus>>({});
  const [testTimes, setTestTimes] = React.useState<Record<string, string | undefined>>({});
  const [isTestRunning, setIsTestRunning] = React.useState(false);
  const [testResultsList, setTestResultsList] = React.useState<TestResult[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false);
  const { data, isLoading, isError } = useApiForDashboard();

  const columns = [
    SelectColumn,
    { key: 'service_name', name: 'Service Name', width: 150 },
    { key: 'title', name: 'Title', width: 200 },
    { key: 'method', name: 'Method', width: 100 },
    { key: 'endpoint', name: 'Endpoint', width: 250 },
    { key: 'request_body_schema', name: 'Request Body Schema', width: 300 }
  ];

  const getFilteredData = () => {
    if (!data?.specs) return [];
    return data.specs.filter(spec => 
      selectedMethod === 'ALL' || spec.method === selectedMethod
    );
  };

  const getCurrentPageData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex).map((spec) => ({
      ...spec,
      id: spec.id
    }));
  };

  const handleSelectedRowsChange = (newSelectedRows: ReadonlySet<Key>) => {
    setSelectedRows(newSelectedRows);
  };

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value as HttpMethod);
    setCurrentPage(1); // Reset to first page when filter changes
    setSelectedRows(new Set()); // Clear selection when filter changes
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
          service_name: rowData.service_name ?? 'Unknown Service',
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
          service_name: rowData.service_name ?? 'Unknown Service',
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
    setIsResultModalOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-96 text-destructive">Error loading data</div>;
  }

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-2">
        <CardHeader>
          <div className="flex flex-col gap-4">
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
            <div className="flex items-center gap-4">
              <Label>HTTP Method:</Label>
              <RadioGroup
                value={selectedMethod}
                onValueChange={handleMethodChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ALL" id="all" />
                  <Label htmlFor="all">ALL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="GET" id="get" />
                  <Label htmlFor="get">GET</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="POST" id="post" />
                  <Label htmlFor="post">POST</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PUT" id="put" />
                  <Label htmlFor="put">PUT</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PATCH" id="patch" />
                  <Label htmlFor="patch">PATCH</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="DELETE" id="delete" />
                  <Label htmlFor="delete">DELETE</Label>
                </div>
              </RadioGroup>
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
              total={filteredData.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              className="custom-pagination"
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className="max-w-full w-full h-full max-h-screen flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Test Results</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 p-0"
              onClick={() => setIsResultModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApiTesting;